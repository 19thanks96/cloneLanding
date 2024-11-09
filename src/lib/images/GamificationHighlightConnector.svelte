<script lang="ts">
    import { onMount } from 'svelte';

    export let rotate: number = 0;
    export let isRight: boolean = false;
    onMount(() => {
        let isMd = screen.width <= 1072;
        if ((rotate < 180) && isMd) {
            rotate = 200;
            console.log('a')
            return;
        }
        if ((rotate > 180) && isMd) {
            rotate = 330;
            console.log('b')

            return;
        }
    });
</script>

<svg
    style=" transform: rotate({rotate}deg);  --isRight:{isRight ? 1 : 0}"
    class={`absolute ${rotate > 180 ? 'left-[50%] md:left-[40%] sm:left-[20%]' : 'left-[25%] md:left-[50%]'} rotate-[var(--rotate)]`}
    width="456"
    height="925"
    viewBox="0 0 456 925"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g filter="url(#filter0_f_513_92213)">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M176.975 161.243C147.41 175.222 145.134 212.794 155.903 243.672C177.373 305.237 190.03 380.924 190.03 462.749C190.03 544.288 177.461 619.731 156.128 681.178C145.384 712.126 147.767 749.771 177.445 763.642C192.575 770.714 209.457 774.665 227.261 774.665C245.913 774.665 263.552 770.33 279.225 762.612C308.186 748.351 310.315 711.355 299.749 680.851C278.484 619.463 265.961 544.143 265.961 462.749C265.961 381.07 278.572 305.508 299.972 244.003C310.561 213.569 308.537 176.646 279.691 162.284C263.901 154.422 246.098 150 227.261 150C209.272 150 192.225 154.033 176.975 161.243Z"
            fill="#211D71"
        />
    </g>
    <defs>
        <filter
            id="filter0_f_513_92213"
            x="0"
            y="0.00012207"
            width="455.846"
            height="924.665"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_513_92213" />
        </filter>
    </defs>
</svg>

<style>
    svg {
        position: absolute;
        z-index: -1;


    }
    @media (max-width: 1072px) {
        svg {

            position: absolute;
            transform-origin: center center;
        }
    }
    @media (max-width: 600px) {
        svg {

        width: 100px;
            height: 300%;
        }
    }
</style>
