import { CosmosClient } from '@azure/cosmos';
import { env } from '$env/dynamic/private';

const endpoint = env.COSMOSDB_ENDPOINT ?? '' ;
const key = env.COSMOSDB_KEY ?? '';

export const cosmosdb = new CosmosClient({ endpoint, key });