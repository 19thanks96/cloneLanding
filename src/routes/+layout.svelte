<script lang="ts">
    import Header from '$lib/sections/Header.svelte';
    import '../app.css';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import MetaTags from '$lib/sections/MetaTags.svelte';
    import CenterEllipse from '$lib/images/CenterEllipse.svelte';
    import Subtrack from '$lib/images/Subtrack.svelte';
    let loaded = false;

    if (browser) {
        window.plug2winExternalUserId = '1133';
        window.plug2winApiKey = 'landing';
        window.isLocalEnv = true;
    }
    onMount(() => {
        loaded = true;
    });
</script>

<svelte:head>
    {#if loaded}
        <script src="p2w-adapter.bundle.staging.js"></script>
    {/if}
</svelte:head>

<MetaTags />

<div class="app">
    <Header />
    <div class="ellipse_wrapper">
        <Subtrack />
    </div>
    <main>
        <slot />
    </main>
    <div class="center_ellipse_wrapper">
        <CenterEllipse />
    </div>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (max-width: 1072px) {
        main {
            overflow: hidden;
            padding: 0;
        }
        footer {
            padding: 12px 0;
        }
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }

    .ellipse_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200vh;
        overflow: hidden;
        pointer-events: none;
        z-index: -222;
    }

    .center_ellipse_wrapper {
        position: absolute;
        top: 3150px;

        width: 100%;
        z-index: -222;
        height: 300vh;
        overflow: hidden;
        pointer-events: none;
    }
	@media (max-width: 1072px) {
		.center_ellipse_wrapper {
			height: 1622px;
            top: 5580px;
		}
	}

    @media (max-width: 600px) {
        .center_ellipse_wrapper {
            height: 1622px;
            top: 3270px;
        }
    }
</style>
