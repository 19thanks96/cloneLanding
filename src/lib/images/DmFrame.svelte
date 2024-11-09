<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>


<img
    loading="lazy"
    style=""
    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Daily.png?auto=format"
    alt="Daily mission image"
/>
<style>
    img {
        position: absolute;
        top: -3px;
        left: 11px;
    }

    @media (max-width: 1072px) {
        svg {
            display: none;
        }

        img {
            position: relative;
            top: -40%;
            left: 50vw;
            margin-bottom: -25%;
            transform: translateX(-50%);
        }
    }

    @media (max-width: 600px) {
        svg {
            display: none;
        }

        img {
            position: relative;
            margin-bottom: -5%;
            width: 80vw;
            height: auto;
            top: -5%;
            left: 50vw;
            transform: translateX(-50%);
        }
    }
</style>
