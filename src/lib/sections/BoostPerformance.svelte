<script>
    import FluctuationsButton from '$lib/svgButtons/FluctuationsButton.svelte';
    import InefficiencyButton from '$lib/svgButtons/InefficiencyButton.svelte';
    import LimitationsButton from '$lib/svgButtons/LimitationsButton.svelte';
    import FrustrationButton from '$lib/svgButtons/FrustrationButton.svelte';
</script>

<div class="flex flex-col pt-[70px] pb-[70px] wrapper sm:pt-[20px] sm:pb-[60px]">
    <div class="subtitle-3 text-center text-[#A1A5B2_!important]">Engage, Retain, Win!</div>
    <div class="title-2 text-center">Boost Your Performance</div>

    <div
        class="card-container flex flex-row items-end justify-end gap-x-[30px] p-[10px] mt-[-27.5px] md:gap-x-[17px] md:p-[0] gap-x-[20px]"
    >
        <div class="card-item">
            <div
                class="text-center card w-[233px] h-[211px] md:w-[145px] md:h-[142px] sm:w-[73px] sm:h-[63px] title-2"
            >
                <div>+20%</div>
            </div>
            <div class="flex flex-col items-center subcard">
                <div>
                    <FluctuationsButton />
                </div>
                <div class="subtitle-2">Fluctuations</div>
                <div class="text-center p-2">
                    Activity drops depending on the day of the week and month?
                </div>
            </div>
        </div>

        <div class="card-item">
            <div
                class="text-center card w-[233px] h-[275px] title-2 md:w-[145px] md:h-[182px] sm:w-[73px] sm:h-[86px]"
            >
                <div>+30%</div>
            </div>
            <div class="flex flex-col items-center subcard">
                <div>
                    <InefficiencyButton />
                </div>
                <div class="subtitle-2">Inefficiency</div>
                <div class="text-center p-2">Low traffic payback and ugly retention cohort?</div>
            </div>
        </div>

        <div class="card-item">
            <div
                class="text-center card w-[233px] h-[211px] title-2 md:w-[145px] md:h-[142px] sm:w-[73px] sm:h-[63px]"
            >
                <div>+20%</div>
            </div>
            <div class="flex flex-col items-center subcard">
                <div>
                    <LimitationsButton />
                </div>
                <div class="subtitle-2">Limitations</div>
                <div class="text-center p-2">
                    Missing realtime tools to retain players and extend sessions?
                </div>
            </div>
        </div>

        <div class="card-item">
            <div
                class="text-center card w-[233px] h-[335px] title-2 md:w-[145px] md:h-[220px] sm:w-[73px] sm:h-[105px]"
            >
                <div>+45%</div>
            </div>
            <div class="flex flex-col items-center subcard">
                <div>
                    <FrustrationButton />
                </div>
                <div class="subtitle-2">Frustration</div>
                <div class="text-center p-2">
                    Tired of your casino platform limited functionality?
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card-item {
        position: relative;
    }
    .card-container {
        height: 610px;
    }

    .card {
        position: absolute;
        bottom: 0;
        height: 410px;

        background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
        border-radius: 35px;
        z-index: 1;

        &:last-child {
            background-color: #dcd9fc;
        }

        &.title-2 {
            font-size: 48px;
        }
    }

    .card-item {
        &:nth-child(2) .card {
            background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
            height: 473px;
        }
        &:nth-child(4) .card {
            background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
            height: 542px;
        }
        &:nth-child(3) .card,
        &:nth-child(1) .card {
            background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);

            & div {
                padding-top: 71px;
            }
        }

        &:nth-child(2) .card div {
            padding-top: 135px;
        }

        &:nth-last-child(1) .card {
            & div {
                padding-top: 203px;
            }
        }
    }

    .subcard {
        position: relative;
        z-index: 2;
        width: 233px;
        height: 263px;

        background: linear-gradient(180deg, #181d4d 0%, #273182 100%);
        border-radius: 30px;

        div:nth-child(1) {
            padding-top: 55px;
        }

        div:nth-child(2) {
            padding-top: 25px;
        }

        div:nth-child(3) {
            padding: 15px 15px 0 15px;
        }
    }

    @media (max-width: 1072px) {
        .card-container {
            height: 540px;
        }
        .card-item {
            font-weight: 200;
            .card {
                border-radius: 20px;
            }

            &:nth-child(2) .card {
                background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
                height: 416px;
            }

            &:nth-child(4) .card {
                background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
                height: 460px;
            }

            &:nth-child(3) .card,
            &:nth-child(1) .card {
                background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
                height: 377px;

                & div {
                    padding-top: 71px;
                }
            }
        }
        .card-item {
            &:nth-child(1) .card div,
            &:nth-child(3) .card div {
                padding-top: 60px;
                font-size: 32px;
                line-height: 1.2;
            }

            &:nth-child(2) .card div {
                padding-top: 98px;
                font-size: 32px;
                line-height: 1.2;
            }

            &:nth-child(4) .card div {
                padding-top: 141px;
                font-size: 32px;
                line-height: 1.2;
            }
        }
        .subcard {
            width: 146px;
            height: 282px;
            border-radius: 18px;
            transform: translateY(10px);

            div:nth-child(1) {
                padding-top: 40px;
            }

            div:nth-child(2) {
                padding-top: 15px;
            }

            div:nth-child(3) {
                padding-top: 10px;
            }
        }
    }

    @media (max-width: 600px) {
        .wrapper {
            background: var(--background);
        }
        .card-container {
            height: 260px;
        }
        .card {
            border-radius: 10px;
            height: 206px;
            bottom: -40px;
        }
        .card-item {
            &:nth-child(2) .card {
                height: 226px;
              border-radius: 10px;
            }

            &:nth-child(4) .card {
                height: 247px;
              border-radius: 10px;
            }
            &:nth-child(3) .card,
            &:nth-child(1) .card {
                background: linear-gradient(180deg, #202266 0%, #9f76ff 67.5%);
                height: 206px;
              border-radius: 10px;

                & div {
                    padding-top: 71px;
                }
            }
        }

        .card-item {
            &:nth-child(1) .card div,
            &:nth-child(3) .card div {
                padding-top: 15px;
                font-size: 16px;
                line-height: 1.2;
            }

            &:nth-child(2) .card div {
                padding-top: 37.5px;
                font-size: 16px;
                line-height: 1.2;
            }

            &:nth-child(4) .card div {
                padding-top: 53px;
                font-size: 16px;
                line-height: 1.2;
            }
        }
        .subcard {
            width: 73px;
            height: 162px;
            border-radius: 10px;
            transform: translateY(40px);

            div:nth-child(1) {
                padding-top: 10px;
            }

            div:nth-child(2) {
                font-size: 10px;
                padding-top: 10px;
            }

            div:nth-child(3) {
                padding: 10px 0 0 0;
                font-size: 10px;
                line-height: 1.3;
            }
        }
    }
</style>
