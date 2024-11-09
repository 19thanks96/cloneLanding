<script lang="ts">
    import DmFrame from '$lib/images/DmFrame.svelte';
    import PbFrame from '$lib/images/PbFrame.svelte';
    import ScFrame from '$lib/images/ScFrame.svelte';
    import AdminFrame from '$lib/images/AdminFrame.svelte';
    import LiveOpsFrame from '$lib/images/LiveOpsFrame.svelte';
    import NotificationFrame from '$lib/images/NotificationFrame.svelte';
    import GamificationHighlightConnector from '$lib/images/GamificationHighlightConnector.svelte';
</script>

<div class="wrapper pt-[53px] pb-[135px] md:pb-[75px] sm:pt-[20px] sm:pb-[50px]">
    <div class="subtitle-3 text-center text-[#A1A5B2_!important]">Empower Your Platform</div>
    <div class="title-2 text-center">Gamification Platform</div>
    <div class="flex flex-col gap-[50px]">
        <div
            class="flex flex-row pt-[40px] md:flex-col sm:pt-[10px] md:gap-[48px] md:pb-[64px] sm:pb-[8px]"
        >
            <div class="relative w-[611px] h-[526px] md:h-full sm:h-full">
                <DmFrame />
                <GamificationHighlightConnector rotate={315}/>
            </div>
            <div
                class="w-1/2 h-[526px] md:w-full md:text-center md:h-[276px] sm:h-auto pt-[60px] sm:pt-[0px]"
            >
                <div
                    class="relative flex items-start justify-center flex-col pl-[20px] gap-[30px] pt-[50px] md:px-[50px] sm:pt-[0] sm:gap-[10px] sm:px-[50px]"
                >
                    <div class="title-3 text-center md:m-auto">Missions</div>
                    <div
                        class="subtitle-2 leading-[1.5_!important] w-[450px] md:w-full description"
                    >
                        Give your players new reasons to come back with engaging missions. Our
                        system allows you to create a variety of mission types—from deposits and
                        bets to wins and turnover, and much more. Easily customize tasks that keep
                        players interested, boost their engagement, and drive higher revenue. Enable
                        missions and turn the gaming experience into an exciting journey with
                        rewards for achievements!
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex flex-row md:flex-col-reverse pt-[10px] md:gap-[48px] md:pb-[64px] sm:pb-[8px]"
        >
            <div class="w-1/2 h-[526px] md:h-[276px] md:w-full sm:h-auto">
                <div
                    class="relative flex items-start justify-center flex-col pl-[40px] md:px-[50px] gap-[30px] pt-[110px] sm:pt-[0] sm:gap-[10px] sm:px-[50px]"
                >
                    <div class="title-3 text-center md:m-auto">Piggy Bank</div>
                    <div
                        class="subtitle-2 leading-[1.5_!important] w-[450px] md:w-full md:text-center description"
                    >
                        Boost player engagement with the Piggy Bank feature. Players can deposit
                        their accumulated in-game coins to grow them in the bank. The more coins
                        they set aside, the greater the final reward! This mechanic encourages
                        players to participate regularly, allowing them to turn their savings into
                        valuable prizes
                    </div>
                </div>
            </div>
            <div class="w-[611px] h-[526px] relative md:h-full sm:h-full">
                <PbFrame />
                <GamificationHighlightConnector rotate={45}  isRight={true}/>
            </div>
        </div>

        <div class="flex flex-row md:flex-col pt-[0px] md:gap-[48px] md:pb-[64px] sm:pb-[12px]">
            <div class="w-[611px] h-[526px] relative md:h-full sm:h-full">
                <ScFrame />
            </div>
            <div class="w-1/2 h-[526px] pt-[60px] md:h-[276px] md:w-full sm:h-auto sm:pt-[10px]">
                <div
                    class="relative flex items-start justify-center flex-col pl-[20px] md:px-[50px] gap-[30px] pt-[50px] sm:pt-[0] sm:gap-[10px] sm:px-[50px]"
                >
                    <div class="title-3 text-center md:m-auto">Scratch Cards</div>
                    <div
                        class="subtitle-2 leading-[1.5_!important] w-[450px] md:w-full md:text-center description"
                    >
                        Add a thrill of excitement with the scratch card feature. Your users can
                        purchase scratch cards to participate in an exciting lottery with a chance
                        to win valuable rewards. This mechanic boosts engagement, encouraging
                        players to return again and again in hopes of a lucky win. Enable scratch
                        cards and offer your users an engaging gaming experience!
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex flex-row mt-[-17px] mb-[-125px] md:mt-[10px] gap-[70px] md:flex-col md:mb-[100px] md:gap-[50px] sm:mb-[50px] sm:mt-[-40px] sm:gap-[32px]"
        >
            <div class="flex flex-col h-[614px] w-full gap-y-[25px] md:h-auto sm:gap-y-[8px]">
                <img
                    class="mx-auto sm:w-[63px]"
                    src="https://p2w.imgix.net/resources/landing/Avatar.png?auto=format"
                    alt="Tutorial Avatar"
                />
                <div class="title-3 text-center sm:pt-[12px]">Player Tutorial</div>
                <div class="body-1 text-center pt-[10px] px-[15px] md:px-[75px]">
                    Guide new users with an animated character tutorial. Step-by-step, it explains
                    rules and features, making onboarding simple and engaging. The character helps
                    players quickly get comfortable and start playing with confidence!
                </div>
            </div>
            <div class="flex flex-col h-[614px] w-full gap-y-[20px] md:h-auto sm:gap-y-[15px]">
                <div class=" pt-[20px] sm:pl-[0]">
                    <img
                        class="mx-auto sm:w-[63px]"
                        src="https://p2w.imgix.net/resources/landing/Widget.png?auto=format"
                        alt="Widget Image"
                    />
                </div>
                <div class="title-3 text-center">Realtime Widget</div>
                <div class="body-1 text-center pt-[15px] px-[15px] sm:pt-[5px] md:px-[75px]">
                    Motivate players to reach their goals with a real-time widget that displays
                    their mission progress. The widget provides instant feedback, allowing players
                    to see how close they are to rewards and encouraging active participation
                </div>
            </div>
        </div>
    </div>

    <div class="subtitle-3 text-center">Empower Your Platform</div>
    <div class="title-2 text-center pt-[5px]">AI based LiveOps Platform</div>
    <div class="flex flex-col gap-[50px] sm:gap-[10px]">
        <div class="flex flex-row pt-[30px] md:flex-col md:pt-[50px] sm:pt-[10px]">
            <div class="relative w-[611px] h-[526px] md:h-full sm:h-full md:w-full sm:w-full">
                <AdminFrame />
                <GamificationHighlightConnector rotate={315} />
            </div>
            <div class="w-1/2 h-[526px] pt-[80px] md:w-full md:h-[226px] sm:pt-[20px] sm:h-[100px]">
                <div
                    class="relative flex items-start justify-center flex-col pl-[20px] gap-[30px] md:px-[50px] pt-[135px] md:pt-[55px] sm:pt-[0] sm:gap-[12px]"
                >
                    <div class="title-3 text-center md:m-auto">Admin</div>
                    <div
                        class="subtitle-2 leading-[1.5_!important] w-[450px] md:w-full md:text-center description md:px-[50px] sm:px-[0]"
                    >
                        Fully featured management and monitoring web app to operate gamification
                        mechanics
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row md:flex-col-reverse pt-[20px]">
            <div class="w-1/2 h-[526px] md:h-[226px] md:w-full sm:h-auto pt-[70px] sm:pt-[50px]">
                <div
                    class="relative flex items-start justify-center flex-col pl-[20px] md:px-[50px] gap-[30px] pt-[120px] md:pt-[55px] sm:pt-[10px] sm:gap-[12px]"
                >
                    <div class="title-3 text-center md:m-auto">LiveOps System</div>
                    <div
                        class="body-1 leading-[1.5_!important] w-[450px] text-left md:w-auto md:text-center description md:px-[50px] sm:px-[0]"
                    >
                        Ability to setup customizable pop-ups and gamification mechanic rules on
                        various player events
                    </div>
                </div>
            </div>
            <div class="relative w-[611px] h-[526px] md:h-full sm:h-full md:w-full sm:w-full">
                <LiveOpsFrame />
                <GamificationHighlightConnector rotate={45}  isRight={true}/>
            </div>
        </div>

        <div class="flex flex-row md:flex-col">
            <div class="relative w-[611px] h-[526px] md:h-full sm:h-full md:w-full sm:w-full">
                <NotificationFrame />
            </div>
            <div class="w-1/2 h-[526px] md:w-full md:h-[306px] sm:h-[100px] pt-[70px] sm:pt-[30px]">
                <div
                    class="relative flex items-start justify-center flex-col pl-[20px] md:px-[100px] gap-[30px] pt-[125px] md:pt-[55px] sm:pt-[0] sm:px-[0] sm:gap-[12px]"
                >
                    <div class="title-3 text-center md:m-auto">Notification Module</div>
                    <div class="body-1 w-[440px] md:w-full md:text-center description sm:px-[20px]">
                        A system for interacting with the player using pop-up windows, push,
                        notifications, sms, email, voicemail
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row mt-[5px] gap-[48px] md:flex-col sm:pt-[12px] sm:gap-[24px]">
            <div class="flex flex-col h-[363px] w-full gap-y-[25px] sm:gap-y-[24px] sm:h-auto">
                <div class="  ">
                    <img
                        class="mx-auto sm:w-[80px]"
                        src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Analitic.png?auto=format"
                        alt="Tutorial Avatar"
                    />
                </div>
                <div
                    class="w-[514px] h-[162px] md:h-[140px] flex flex-col items-center justify-between md:w-full sm:h-auto"
                >
                    <div class="title-3 text-center">Realtime Analytics</div>
                    <div
                        class="body-2 text-center px-[25px] w-[467px] md:w-full sm:pt-[20px] sm:px-[30px]"
                    >
                        Advanced feature to see your customers behavior just in time they perform to
                        be on the edge
                    </div>
                </div>
            </div>
            <div
                class="flex flex-col h-[363px] w-full gap-y-[25px] sm:pt-[20px] sm:gap-y-[24px] sm:h-auto"
            >
                <div class=" ">
                    <img
                        class="mx-auto sm:w-[80px]"
                        src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Segmentation.png?auto=format"
                        alt="Widget Image"
                    />
                </div>
                <div
                    class="w-[514px] h-[162px] md:h-[150px] flex flex-col items-center justify-between md:w-full sm:h-auto"
                >
                    <div class="title-3 text-center">Granular Segmentation</div>
                    <div
                        class="body-2 text-center px-[23.5px] w-[467px] md:w-full sm:pt-[10px] sm:px-[30px]"
                    >
                        Ability to segment players by wide variety of parameters such as LTV,
                        balance, signup date, dep/bet parameters, geo, etc.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="css">
    .description {
        font-weight: 500;
        color: #c3c8d9;
    }
</style>
