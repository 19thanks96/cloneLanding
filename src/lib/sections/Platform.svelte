<script lang="ts">
    import { browser } from '$app/environment';

    const images = ['https://p2w.imgix.net/resources/landing/slotImage/game icon.png?auto=format'];
    let i = 1;
    while (i <= 23) {
        images.push(
            `https://p2w.imgix.net/resources/landing/slotImage/game icon-${i}.png?auto=format`
        );
        i++;
    }
</script>

<div class="w-full pb-[135px] md:h-auto sm:pb-[20px] additional-bubble">
    <h2 class="subtitle-3 text-center">Empower Your Platform</h2>
    <h1 class="title-2 pt-[5px] text-center">Touch it</h1>

    <div class="mt-[48px] h-[200vh] md:h-auto md:mt-[30px]" style="">
        <div class="sticky-casino">
            <div class="flex flex-row-reverse w-full h-full">
                <div class="flex flex-col w-[226px] pt-[10px] sitebar h-full md:hidden">
                    <img
                        src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/top.png?auto=format"
                        alt="head casino"
                    />
                    <div class="px-[16px] pt-[25px]">
                        <img
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element.png?auto=format"
                            alt="Sitebar"
                        />
                        <img
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-1.png?auto=format"
                            alt="Sitebar"
                        />

                        <div class="flex flex-wrap flex-col gap-[5px]">
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-2.png?auto=format"
                                alt="Sitebar"
                            />
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-3.png?auto=format"
                                alt="Sitebar"
                            />
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-4.png?auto=format"
                                alt="Sitebar"
                            />
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-5.png?auto=format"
                                alt="Sitebar"
                            />
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Sitebar element-6.png?auto=format"
                                alt="Sitebar"
                            />
                        </div>
                    </div>
                </div>
                <div class="w-[-webkit-fill-available] h-[auto] overflow-hidden">
                    <div
                        class="md:!flex flex-col w-full pt-[10px] h-[64px] searchbar mt-[-1px] !hidden"
                    >
                        <img
                            class="translate-y-[20%] logo sm:w-[55px]"
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/top.png?auto=format"
                            width="90px"
                            alt=""
                        />
                        <img
                            class="translate-y-[-41.5%] sm:hidden"
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/top.png?auto=format"
                            width="300px"
                            alt=""
                        />
                        <img
                            class="translate-y-[-22.5%] sm:hidden"
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/top.png?auto=format"
                            width="300px"
                            alt=""
                        />
                    </div>
                    <div class="banner flex justify-center items-center">
                        <img
                            src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/banner.png?auto=format"
                            alt="banner"
                        />
                    </div>
                    <div class="searchbar-wrapper flex justify-center items-center">
                        <div class="searchbar rounded-[20px]">
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Game category.png?auto=format"
                                alt=""
                            />
                            <img
                                class="sm:hidden"
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Game category-1.png?auto=format"
                                alt=""
                            />
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Game category-2.png?auto=format"
                                alt=""
                            />
                            <img
                                class="sm:hidden"
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Game category-3.png?auto=format"
                                alt=""
                            />
                            <img
                                class="absolute right-[16px]"
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Search & Providers.png?auto=format"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="slots-bg w-full">
                        <div class="slot-wrapper">
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Left-3.png?auto=format"
                                alt=""
                            />
                            <div
                                class=" flex flex-row flex-wrap gap-[15px] md:justify-around sm:justify-around"
                            >
                                {#if images.length >= 1}
                                    {#each images as image}
                                        <img src={image} alt={image} />
                                    {/each}
                                {/if}
                            </div>
                        </div>

                        <div class="slot-wrapper">
                            <img
                                src="https://p2w.imgix.net/resources/landing/fakeCasinoElements/Left-2.png?auto=format"
                                alt=""
                            />
                            <div class=" flex flex-row flex-wrap gap-[15px]">
                                {#if images.length >= 1}
                                    {@const imagesSort = images.sort(() => Math.random() - 0.5)}
                                    {#each imagesSort as image}
                                        <img src={image} alt={image} />
                                    {/each}
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .sticky-casino {
        position: sticky;
        /*position: relative;*/

        top: 64px;
        bottom: 0;
        overflow: hidden;
        background-color: #1a1a31;
        height: auto;
        width: 100%;

        & > div {
            height: calc(100vh - 64px);
        }
    }

    .sitebar {
        box-sizing: border-box;
        background: #1a1a31;
        border-right: 1px solid #333355;

        /* Inside auto layout */
        flex: none;
        order: 2;
        flex-grow: 0;
        z-index: 2;
    }

    .banner {
        height: 390px;

        /* Background/-main */
        background: #141423;
    }

    .searchbar-wrapper {
        height: 93px;
        background: #141423;
    }

    .searchbar {
        position: relative;
        box-sizing: border-box;

        /* Auto layout */
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        gap: 16px;

        width: 80%;
        height: 77px;

        /* Background/-primary */
        background: #1a1a31;
        /* Dividers & Strokes */
        border: 1px solid #333355;
        /*border-radius: 20px;*/

        /* Inside auto layout */
        flex: none;
        order: 0;
        align-self: stretch;
        flex-grow: 0;
        max-width: 1358px;
        margin: auto;
    }

    .slots-bg {
        background: #141423;
        padding-bottom: 40px;
    }

    .slot-wrapper {
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 13px;
        gap: 16px;

        width: 1358px;

        /* Background/-primary */
        background: #1a1a31;
        /* Dividers & Strokes */
        border: 1px solid #333355;
        border-radius: 20px;
        margin: auto;
    }

    @media (max-width: 1072px) {
        .slot-wrapper {
            width: 100%;

            img {
                max-width: 20vw;
            }
        }

        .searchbar {
            width: 100%;
            overflow: hidden;
        }
        .banner {
            height: 210px;
        }
    }
    @media (max-width: 600px) {
        .searchbar {
            height: 52px;
            width: calc(100% + 2px);
            margin: 0 -1px;
            border-radius: 0px;

        }
        .searchbar img:not(.logo) {
            max-height: 30px;
        }
        .searchbar-wrapper {
            height: 50px;
        }
        .banner {
            height: 110px;
        }
        .slot-wrapper {
            margin-bottom: 10px;
            border-radius: 0;
            width: calc(100% + 2px);
            margin: 0 -1px;
        }
        .slot-wrapper img {
            width: 100px;
        }
    }
</style>
