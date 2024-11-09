<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>

<img
    loading="lazy"
    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Bank.png?auto=format"
    alt="Piggy bank image"
/>

<style>
    img {
        position: absolute;
        top: 0px;
        left: 30px;
    }

    @media (max-width: 1072px) {
        svg {
            display: none;
        }

        img {
            position: relative;
            left: 50vw;
            margin-bottom: -25%;
            transform: translateX(-50%);
            top: -10%;

        }
    }

    @media (max-width: 600px) {
        svg {
            display: none;
        }

        img {
            position: relative;

            left: 50vw;
            margin-bottom: -5%;
            transform: translateX(-50%);
            width: 80vw;
            top: -30%;
        }
    }
</style>
