import {cosmosdb} from "../../../infrastructure/cosmosdb";

const database = cosmosdb.database('p2w-landing')
const container = database.container('inquiries')


export async function POST({request,getClientAddress}){
    try{
        const data = await request.json()

        const clientIp = getClientAddress();

        const now = new Date();
        const oneMinuteAgo = new Date(now.getTime() - 60 * 1000).toISOString();

        const querySpec = {
            query: `
                SELECT VALUE COUNT(1) 
                FROM c 
                WHERE c.ipAddress = @ipAddress AND c.date >= @oneMinuteAgo
            `,
            parameters: [
                { name: '@ipAddress', value: clientIp },
                { name: '@oneMinuteAgo', value: oneMinuteAgo }
            ]
        };

        const { resources } = await container.items.query(querySpec).fetchAll();
        const requestCount = resources[0] || 0;

        if (requestCount >= 2) {
            return new Response(
                JSON.stringify({
                    error: 'Limit exceeded'
                }),
                {
                    status: 429,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }


        await container.items.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            company:data.company,
            ipAddress:clientIp,
            date:new Date()
        })

        return new Response(JSON.stringify({ message: 'Data successfully send' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }catch (error) {

        return new Response(JSON.stringify({ error: 'Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


}