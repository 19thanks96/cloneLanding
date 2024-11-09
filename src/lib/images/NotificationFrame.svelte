<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>

<img
    loading="lazy"
    style=""
    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Nitification.png?auto=format"
    alt="Admin image"
/>

<style>
    img {
        position: absolute;
        top: -50px;
        left: -54px;
        max-width: max-content;
    }
    @media (max-width: 1072px) {
        svg {
            display: none;
        }
        img {
            position: relative;
            left: 50vw;
            transform: translateX(-50%);
            margin-bottom: -15%;
        }
    }
    @media (max-width: 600px) {
        img {
            width: 255px;
            top: -25px;

            left: 50vw;
            transform: translateX(-50%);
            margin-bottom: -5%;
        }
    }
</style>
