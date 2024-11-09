<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>

<img
    loading="lazy"
    style=""
    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Admin.png?auto=format"
    alt="Admin image"
/>

<style>
    img {
        position: absolute;
        top: -0px;
        left: -12px;
        max-width: max-content;
    }
    @media (max-width: 1072px) {
        img {
            position: relative;
            top: -55px;
            left: 50vw;
            transform: translateX(-50%);
            margin-bottom: -30%;
        }
    }
    @media (max-width: 600px) {
        img {
            width: 305px;
            top: 0;
            left: 50%;
            margin-bottom: -10%;
        }
    }
</style>
