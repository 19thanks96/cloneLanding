<script lang="ts">
    import GamificationHighlightElement from '$lib/images/GamificationHighlightElement.svelte';
</script>
<GamificationHighlightElement/>

<img
    loading="lazy"

    src="https://p2w.imgix.net/resources/landing/UpdatedImg/Img_Lng_Scratch.png?auto=format"
    alt="Daily mission image"
/>

<style>
    img {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    @media (max-width: 1072px) {

        img {
            position: relative;
            left: 50vw;
            margin-bottom: -25%;
            transform: translateX(-50%);
            top: -10%;

        }
    }

    @media (max-width: 600px) {


        img {
            position: relative;
            left: 50vw;
            margin-bottom: -5%;
            transform: translateX(-50%);
            width: 80vw;
            top: -20%;
        }
    }
</style>
