<script>
    import { MetaTags } from 'svelte-meta-tags';
    import {base} from "$app/paths";
</script>

<MetaTags
        title="Plug 2 Win (P2W) - Gamification for iGaming"
        titleTemplate="%s | Boost Player Engagement"
        description="Plug 2 Win (P2W) is a gamification tool for iGaming businesses, designed to boost key metrics like player engagement, retention, and revenue growth. Discover its impact today!"
        canonical="https://moonwin.com"
        openGraph={{
    url: 'https://plug2win-landing.vercel.app/',
    title: 'Plug 2 Win (P2W) - Gamification for iGaming | Boost Player Engagement',
    description: 'Plug 2 Win (P2W) is a gamification tool for iGaming businesses, designed to boost key metrics like player engagement, retention, and revenue growth. Discover its impact today!',
    images: [
      {
        url: `${base}/Favicon_Logo_darkBg.png`,
        width: 143,
        height: 33,
        alt: 'P2w company logo '
      },
      {
        url: `${base}/android-chrome-192x192.png`,
        width: 900,
        height: 800,
        alt: 'P2w company logo '
      },
      { url: `${base}/android-chrome-192x192.png`, },
      { url: `${base}/android-chrome-192x192.png`, }
    ],
    siteName: 'https://plug2win-landing.vercel.app'
  }}
        twitter={{
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
    title: 'Plug 2 Win (P2W) - Gamification for iGaming',
    description: 'Plug 2 Win (P2W) is a gamification tool for iGaming businesses, designed to boost key metrics like player engagement, retention, and revenue growth. Discover its impact today!',
    image: `${base}/Favicon_Logo_darkBg.png`,
    imageAlt: 'P2W company logo '
  }}
        facebook={{
    appId: '1234567890'
  }}
/>