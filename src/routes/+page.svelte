<script>
    import GamifyEnchance from '$lib/sections/GamifyEnchance.svelte';
    import BoostPerformance from '$lib/sections/BoostPerformance.svelte';
    import Gamification from '$lib/sections/Gamification.svelte';
    import Platform from '$lib/sections/Platform.svelte';
    import About from '$lib/sections/About.svelte';
    import Contact from '$lib/sections/Contact.svelte';
</script>

<section id="home">
    <GamifyEnchance />
</section>
<section class="full boost-bg">
    <BoostPerformance />
</section>
<section id="features">
    <Gamification />
</section>
<section id="demo" class="full">
    <Platform />
</section>
<section id="FAQ">
    <About />
</section>
<section id="contact" class="full relative">
    <Contact />
</section>

<style lang="scss">
    .boost-bg {
        background: radial-gradient(38.1% 9.97% at 50% 101.89%, #272f9c 0%, rgba(7, 8, 22, 0) 100%),
            linear-gradient(90deg, rgba(7, 8, 22, 0) 0%, #0f112e 50%, rgba(7, 8, 22, 0) 100%);
        backdrop-filter: blur(20px);
    }
    section:not(.full) {
        max-width: 1072px;
        margin: auto;
    }
    section.full {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #contact {
      overflow: hidden;
    }
    @media (max-width: 1072px) {
        section:not(.full) {
            max-width: 100%;
            margin: auto;
        }
        section.full {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
