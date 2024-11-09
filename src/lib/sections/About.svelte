<script lang="ts">
    const accordionItems = [
        {
            title: 'Platform-Agnostic Solution',
            answer: 'Casino platform-agnostic solution (need only player event streaming and casinos and game development products and retaining traffic to them bonus API)'
        },
        {
            title: 'Intuitive UI',
            answer: 'Friendly and intuitive UI based on many years of experience in operating casinos and game development products and retaining traffic to them'
        },
        {
            title: 'Custom Interfaces',
            answer: 'Ability to create custom interfaces / missions / mini-games for end users by request'
        },
        {
            title: 'Realtime Tracking',
            answer: 'Realtime engine that allows the player and operator to track progress instantly after the action has been taken'
        },
        {
            title: 'Multi-Currency Support',
            answer: 'Support for multi-currencies/languages brands'
        },
        {
            title: 'Fast Go-Live',
            answer: 'Time to go live is less than 2 working weeks (in case of all necessary accesses provision)'
        }
    ];
</script>

<div class="w-full pb-[100px] sm:pb-[30px] sm:pt-[30px]">
    <h2 class="subtitle-3 text-center">Your Questions Answered</h2>
    <h1 class="title-2 pt-[5px] text-center">More about the Product</h1>

    <div class="flex flex-col gap-[15px] pt-[50px] sm:pt-[25px]">
        {#each accordionItems as accordionItem}
            <div class="accrodion-card w-full">
                <div class="accrodion-card-body w-full">
                    <div
                        class="accrodion-card-title flex flex-row items-center justify-between w-full"
                    >
                        <div class="subtitle-2">
                            {accordionItem.title}
                        </div>
                        <div role="button" tabindex="0"
                            class="cursor-pointer"
                            on:click={() => {
                                accordionItem.isOpen = !accordionItem.isOpen;
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-chevron-down transition-[1s_ease] {accordionItem.isOpen
                                    ? ''
                                    : 'rotate-180'}  sm:w-[16px] sm:h-[16px]"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                    {#if !accordionItem.isOpen}
                        <div class="body-2 pt-[16px] pr-[16px] md:mb-[5px] sm:mb-[2px] sm:pt-[8px]">
                            {accordionItem.answer}
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .accrodion-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 20px 24px 24px;
        gap: 16px;
        width: 1073px;
        max-height: 144px;
        background: rgba(144, 162, 254, 0.1);
        border: 1px solid rgba(131, 143, 255, 0.2);
        box-shadow: inset 0px 0px 76px rgba(130, 158, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 12px;
    }

    @media (max-width: 1072px) {
        .accrodion-card {
            margin: 0 40px;
            width: auto;
            min-width: calc(100vw - 80px);
            max-height: fit-content;
        }
    }
    @media (max-width: 600px) {
        .accrodion-card {
            margin: 0 20px;
            width: auto;
            min-width: calc(100vw - 40px);
          padding: 10px 12px 12px;
          gap: 8px;
          border-radius: 8px;
        }
    }
</style>
