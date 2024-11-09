<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
    import { onMount } from 'svelte';
    let isIos: boolean | undefined;
    onMount(() => {
        isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    });
</script>

<svg
    class="subtract-big"
    style=""
    viewBox="0 0 1920 1473"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g filter="url(#filter0_f_2015_21796)">
        <path
            d="M-6 334.549C2.23995 333.406 10.5604 332.238 18.9618 331.047C814.745 218.227 1172.15 570.877 1459.26 854.162L1459.26 854.163C1616.15 1008.96 1752.04 1143.04 1927 1169.15V89.8904C1771.25 176.83 1559.25 244.773 1272.26 257.7C769.96 280.326 531.386 132.319 348.004 18.5524C226.039 -57.1128 128.488 -117.632 -6 -102.73V334.549Z"
            fill="url(#paint0_linear_2015_21796)"
        />
    </g>
    {#if isIos === false}
        <foreignObject
            x="90%"
            y="90%"
            width="90%"
            height="90%"
            style="    x: 51%;
    y: -51%;
    z-index: -1;
    rotate: 25deg;"
        >
            <GamificationHighlightElement />
        </foreignObject>

        <foreignObject x="80%" y="30%" width="90%" height="90%">
            <iframe
                title="right-top"
                class="right-top-iframe"
                src="https://my.spline.design/blobright-8732b7af911fb6986ad8a993b52678d5/"
                frameborder="0"
                width="100%"
                height="120%"
            ></iframe>
        </foreignObject>
    {/if}

    <defs>
        <filter
            id="filter0_f_2015_21796"
            x="-309.4"
            y="-408.4"
            width="2539.8"
            height="1880.95"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="151.7" result="effect1_foregroundBlur_2015_21796" />
        </filter>
        <linearGradient
            id="paint0_linear_2015_21796"
            x1="-127.755"
            y1="-6.91797"
            x2="2348.32"
            y2="817.007"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#4338DC" stop-opacity="0.5" />
            <stop offset="0.485" stop-color="#2E23C6" stop-opacity="0.29" />
            <stop offset="1" stop-color="#4A2FD3" stop-opacity="0.2" />
        </linearGradient>
    </defs>
</svg>

<svg
    style=""
    class="subtract-small"
    viewBox="0 0 720 1473"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g filter="url(#filter0_f_2015_10526)">
        <path
            d="M0.000976562 334.549C3.07018 333.406 6.16935 332.238 9.2987 331.047C305.71 218.227 438.838 570.877 545.779 854.162L545.779 854.163C604.216 1008.96 654.833 1143.04 720.001 1169.15V89.8904C661.988 176.83 583.024 244.773 476.126 257.7C289.029 280.326 200.165 132.319 131.86 18.5524C86.4302 -57.1128 50.0947 -117.632 0.000976562 -102.73V334.549Z"
            fill="url(#paint0_linear_2015_10526)"
        />
    </g>
    {#if isIos === false}
        <foreignObject
            x="90%"
            y="90%"
            width="90%"
            height="90%"
            style="    x: 51%;
    y: -51%;
    z-index: -1;
    rotate: 25deg;"
        >
            <GamificationHighlightElement />
        </foreignObject>

        <foreignObject x="80%" y="30%" width="90%" height="90%">
            <iframe
                title="right-top"
                class="right-top-iframe"
                src="https://my.spline.design/blobright-8732b7af911fb6986ad8a993b52678d5/"
                frameborder="0"
                width="100%"
                height="120%"
            ></iframe>
        </foreignObject>
    {/if}
    <defs>
        <filter
            id="filter0_f_2015_10526"
            x="-303.399"
            y="-408.4"
            width="1326.8"
            height="1880.95"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
        >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="151.7" result="effect1_foregroundBlur_2015_10526" />
        </filter>
        <linearGradient
            id="paint0_linear_2015_10526"
            x1="-45.3499"
            y1="-6.91797"
            x2="963.554"
            y2="118.129"
            gradientUnits="userSpaceOnUse"
        >
            <stop stop-color="#4338DC" stop-opacity="0.5" />
            <stop offset="0.485" stop-color="#2E23C6" stop-opacity="0.29" />
            <stop offset="1" stop-color="#4A2FD3" stop-opacity="0.2" />
        </linearGradient>
    </defs>
</svg>

<div class="left-top-wrapper">
    <GamificationHighlightElement />
    <iframe
        title="left-top-iframe"
        src="https://my.spline.design/animateblobtutorialcopycopy-af2ff7223cc113b4dc090a8701ed6234/"
        frameborder="0"
        width="100%"
        height="100%"
        class="left-top-iframe"
    >
    </iframe>
</div>

<style lang="scss">
    .subtract-big {
        width: 100%;
        position: absolute;
        z-index: -1;
        top: -8.25%;
    }
    .subtract-small {
        display: none;
    }
    .left-top-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 539px;
        aspect-ratio: 1/1;
        transform: translate(20%, 10%);
    }
    .left-top-wrapper {
        position: absolute;
        width: 539px;
        aspect-ratio: 1/1;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%) rotate(180deg);
    }

    .right-top-iframe {
        width: 600px;
        height: 600px;
    }

    @media (max-width: 1072px) {
        .subtract-big {
            display: none;
        }
        .subtract-small {
            width: 100%;
            position: absolute;
            z-index: -1;
            top: -11%;
            display: block;
        }
    }
    @media (max-width: 600px) {
        .subtract-small {
            top: -8.25%;
        }
    }
</style>
