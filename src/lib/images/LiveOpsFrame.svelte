<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>

<img
    loading="lazy"
    style=""
    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_LiveOps.png?auto=format"
    alt="Live ops image"
/>

<style>
    img {
        position: absolute;
        top: 0px;
        left: 0px;
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
            margin-bottom: -20%;
        }
    }
    @media (max-width: 600px) {
        img {
            width: 305px;
            top: -0px;
            left: 50vw;
            transform: translateX(-50%);
            margin-bottom: -15%;
        }
    }
</style>
