<script>
    import TurnoverButton from '$lib/svgButtons/TurnoverButton.svelte';
    import ARPUButton from '$lib/svgButtons/ARPUButton.svelte';
    import DepositorsButton from '$lib/svgButtons/DepositorsButton.svelte';
    import CasinoBuck from '$lib/logos/CasinoBuck.svelte';
    import Moonwin from '$lib/logos/Moonwin.svelte';
    import Gslot from '$lib/logos/Gslot.svelte';
    import RockWin from '$lib/logos/RockWin.svelte';
    import SkyCrown from '$lib/logos/SkyCrown.svelte';
    import Gioo from '$lib/logos/Gioo.svelte';
</script>

<div
    class="flex flex-col gap-y-[30px] pb-[70px] pt-[65px] md:pb-[30px] md:gap-y-[25px] md:pt-[100px] sm:pt-[80px]"
>
    <h1
        class="title-1 text-center pt-[90px] max-w-[796px] mx-auto md:text-left md:pt-[0] md:mx-[40px] main-title-text sm:mx-[20px]"
    >
        Gamify Enhance Plug to Win
    </h1>
    <h2
        class="subtitle-3 text-center max-w-[650px] mx-auto leading-[30px_!important] md:text-left md:pt-[0] md:mx-[40px] md:leading-[1] sm:leading-[1.2_!important] sm:mx-[20px]"
    >
        Unlock your casino's potential with our innovative solutions that boost turnover, enhance
        Average Revenue Per User, and minimize one-time depositors.
    </h2>
    <div class="sm:px-[50px]">
        <div class="title-2 text-center pt-[55px] max-w-[650px] mx-auto sm:pt-[0px] pb-[50px] md:pb-[0] sm:pb-[0]">
            Improve Metrics with Ease
        </div>

        <div
            class="flex flex-row gap-[57px] md:flex-col md:justify-center md:items-center sm:gap-[0px]"
        >
            <div class="w-[343px] pt-[5px] md:w-full md:pt-[32px] sm:pt-[16px]">
                <div class="w-[303px] flex items-center justify-center md:w-full">
                    <TurnoverButton />
                </div>

                <div
                    class="subtitle-2 pt-[20px] text-center w-[310px] md:w-full md:pt-[20px] sm:pt-[10px]"
                >
                    <span> Turnover up to </span>
                    <span class="subtitle-percent"> 40% </span>
                </div>

                <div class="subtitle-3 pt-[12px] w-[310px]  text-center md:w-full md:px-[150px]  sm:px-[5px]">
                    Increase turnover by 40% with engaging game mechanics that attract and retain users. Turn visitors into loyal customers!
                </div>
            </div>
            <div class="w-[343px] pt-[5px]  md:w-full md:pt-[32px] sm:pt-[16px]">
                <div class="w-[303px] flex items-center justify-center md:w-full">
                    <ARPUButton />
                </div>

                <div class="subtitle-2 pt-[20px] text-center w-[310px] md:w-full md:pt-[20px] sm:pt-[10px]">
                    <span> APRU up to </span>
                    <span class="subtitle-percent"> 30% </span>
                </div>

                <div class="subtitle-3 pt-[12px] w-[310px] text-center md:w-full md:px-[150px] sm:px-[5px]">
                    Boost average revenue per user by 30% with personalized incentives that encourage higher spending.
                </div>
            </div>
            <div class="w-[343px] pt-[5px] md:w-full md:pt-[32px] sm:pt-[16px]">
                <div class="w-[303px] flex items-center justify-center md:w-full">
                    <DepositorsButton />
                </div>

                <div class="subtitle-2 pt-[20px] text-center w-[310px] md:w-full md:pt-[20px] sm:pt-[10px] ">
                    <span> Onetime depositors up to </span>
                    <span class="subtitle-percent"> 50% </span>
                </div>

                <div class="subtitle-3 pt-[12px] w-[310px] text-center md:w-full md:px-[150px]  sm:px-[5px]">
                    Grow first-time deposits by 50% with engaging rewards that motivate new users to take their first step.
                </div>
            </div>
        </div>
    </div>

    <div
        class="text-center title-4 pt-[105px] md:px-[40px] md:pt-[60px] sm:pt-[30px] text-[#C3C8D9_!important]"
    >
        Follow companies leading next-gen player experiences
    </div>
    <div
        class=" mask-darkness pt-[25px] w-[1381px] relative
        sm:pt-[10px]"
    >
        <div class="carousel-container">
            <div
                class="carousel flex flex-row gap-[65px] left-1/2 md:flex-wrap md:w-[100vw] md:gap-y-[65px] md:gap-x-[40px] md:justify-between sm:gap-x-[10px] sm:gap-y-[10px]"
            >
                <Gioo />
                <CasinoBuck />
                <Moonwin />
                <Gslot />
                <RockWin />
                <SkyCrown />
                <span class="sm:hidden md:hidden">

                <Gioo />
                </span>
            </div>
        </div>
    </div>
</div>

<style>
    .main-title-text {
        background: linear-gradient(90deg, #ffffff 0%, #c2c9dd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        line-height: 1.2;
    }
    .subtitle-3 {
        font-weight: 500;
    }
    .subtitle-percent {
        font-weight: 900;
        font-size: 24px;
        line-height: 28px;
    }
    .mask-darkness {
        mask: radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 80%);
    }
    .carousel-container {
        overflow: hidden;
        width: 100%;
        position: relative;
    }

    .carousel {
        animation: scroll 6s linear infinite;
    }

    @keyframes scroll {
        from {
            transform: translateX(calc(90% ));
        }
        to {
            transform: translateX(calc(-90% ));
        }
    }
    @media (max-width: 1072px) {
        .mask-darkness {
            mask: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 1) 0%,
                rgba(0, 0, 0, 0) 100%
            );
        }
        .subtitle-percent,
        .subtitle-2 {
            font-weight:500;
            font-size: 20px;
            line-height: 1.2;
        }
        .subtitle-percent{
            font-weight: 900;
        }

    }
    @media (max-width: 600px) {
        .mask-darkness {
            mask: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 1) 0%,
                rgba(0, 0, 0, 0) 100%
            );
            row-gap: 25px;
            column-gap: 0;
            & svg {
                max-width: 90px;
                height: 28px;
            }
        }
        .subtitle-percent,
        .subtitle-2 {
            font-weight: 700;
            font-size: 14px;
            line-height: 1;
        }
        .subtitle-3 {
            font-weight: 300;
        }
    }
</style>
