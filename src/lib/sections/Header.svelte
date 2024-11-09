<script lang="ts">
    import { page } from '$app/stores';
    import logo from '$lib/images/svelte-logo.svg';
    import github from '$lib/images/github.svg';
    import { onMount } from 'svelte';

    onMount(() => {
        const burgerBtn = document.getElementById('burgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                document.getElementById('burgerBtn')?.classList.toggle('active');
                document.body.querySelector('nav')?.classList.toggle('active'); // Toggle visibility of the mobile menu
            });
        }

        document.querySelectorAll('nav a').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const section = document.querySelector(`#${this.getAttribute('data-section')}`);
                if (section) {
                    const popravka = screen.width > 768 ? 100 : 25
                    const sectionTop =
                        section.getBoundingClientRect().top + window.pageYOffset - popravka; // 50px offset
                    window.scrollTo({ top: sectionTop, behavior: 'smooth' });
                }
            });
        });

        // Optionally, you can update the aria-current dynamically based on the visible section.
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            let currentSection = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const popravka = screen.width > 768 ? 550 : 50
                if (window.scrollY >= sectionTop - popravka) {
                    currentSection = section.getAttribute('id');
                }
            });

            document.querySelectorAll('nav a').forEach((link) => {
                if (link.getAttribute('data-section') === currentSection) {
                    link.parentElement.setAttribute('aria-current', 'page');
                } else {
                    link.parentElement.removeAttribute('aria-current');
                }
            });
        });
    });
</script>

<header>
    <div class="hidden md:block mobile-burger my-auto">
        <button class="burger-icon" id="burgerBtn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    <div class="corner flex justify-between items-center">
        <span class=" flex justify-between items-center"
            ><img class="cube-logo" src="i_company_logo.png" alt="company logo" /></span
        >

        <img
            class="text-logo"
            height="100%"
            src="https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/landing/UpdatedImg/Img_Lng_Logo.png"
            alt="full company Logo text"
        />
    </div>
    <nav>
        <ul>
            <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                <a href="#home" data-section="home">Home</a>
            </li>
            <li aria-current={$page.url.pathname === '/features' ? 'page' : undefined}>
                <a href="#features" data-section="features">Features</a>
            </li>
            <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                <a href="#demo" data-section="demo">Demo</a>
            </li>
            <li aria-current={$page.url.pathname === '/FAQ' ? 'page' : undefined}>
                <a href="#FAQ" data-section="FAQ">FAQ</a>
            </li>
            <li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
                <a href="#contact" data-section="contact">Contact</a>
            </li>
        </ul>
    </nav>


    <div></div>
</header>

<style lang="scss">
    header {
        position: fixed;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        backdrop-filter: blur(25px);
        padding-top: 15px;
        z-index: 11;
        border-bottom: 0.1px solid rgb(255, 255, 255, 0.1);
    }

    .corner {
        width: auto;
        height: 3em;
        position: absolute;
        left: 22.8%;
        top: 50%;
        transform: translate(0%, -50%);
        font-family: 'Inter' sans-serif;
        font-style: italic;
        font-size: 20px;
        font-weight: 900;
        line-height: 1;
        display: flex;
        color: #ffffff;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .corner .cube-logo {
        display: none;
        width: 2em;
        height: 2em;
        object-fit: contain;
        padding-left: 10px;
    }

    .corner .text-logo {
        padding-left: 10px;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: transparent;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
        gap: 48px;
    }

    li {
        position: relative;
        height: 100%;
        width: 100%;
        font-weight: 400;
        display: flex;
        justify-content: center;
    }

    li[aria-current='page'] {
        /*text-transform: uppercase;*/
        font-weight: 700;
        background-color: transparent;
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        //padding: 0 0.5rem;
        /* text-transform: uppercase; */
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
        font-family: 'Inter';
        font-style: normal;
        /*font-weight: 400;*/
        font-size: 13px;
        line-height: 1;
        color: #dcd9fc;
        padding-bottom: 7px;
        text-transform: uppercase;
    }

    a:hover {
        color: #a59cff;
        font-weight: 700;
    }
    @media (max-width: 1600px) {
      .corner{
        left: 10%;
      }
    }
    @media (max-width: 1072px) {
        .burger-icon {
            display: inline-block;
            cursor: pointer;
            padding-left: 10px;
        }

        .burger-icon span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: rgba(163, 169, 211, 1);
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
            transform: rotate(360deg);
        }
        .mobile-burger .active span:nth-child(1) {
            transform: translateY(7.75px) rotate(405deg);
        }

        .mobile-burger .active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-burger .active span:nth-child(3) {
            transform: translateY(-7.75px) rotate(315deg);
        }

        .mobile-menu {
            position: absolute;
            top: 50px;
            left: 0;
            right: 0;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu ul {
            list-style: none;
            padding: 0;
        }

        .mobile-menu ul li {
            margin-bottom: 10px;
        }

        .mobile-menu ul li a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }

        header {
            position: fixed;
            width: 100vw;
            display: flex;
            justify-content: space-between;
            backdrop-filter: blur(25px);
            padding-top: 5px;
            z-index: 11;
            border-bottom: 0.1px solid rgb(255, 255, 255, 0.1);
            height: 64px;
        }

        .corner {
            width: auto;
            height: 3em;
            position: absolute;
            left: 6.5%;
            top: 50%;
            transform: translate(0%, -50%);
            font-family: 'Inter' sans-serif;
            font-style: italic;
            font-size: 18px;
            font-weight: 900;
            line-height: 1;
            display: flex;
            color: #ffffff;
        }

        .corner a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .corner .cube-logo {
            width: 2em;
            height: 2em;
            object-fit: contain;
            padding-left: 5px;
        }

        ul {
            gap: 0;
        }

        nav {
            display: flex;
            justify-content: center;
            --background: transparent;
            left: 50%;
            position: absolute;
            top: 60px;
            flex-direction: column;
            height: 200px;
            width: 100%;
            transition: 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        nav.active {
            transform: translateX(-50%);
        }

        nav:not(.active) {
            transform: translateX(-150%);
            background-color: rgba(17, 17, 38, 0);
        }

        nav:not(.active) ul {
            opacity: 0;
            transition: opacity 0.5s linear;
        }

        svg {
            width: 2em;
            height: 3em;
            display: block;
        }

        path {
            fill: var(--background);
        }

        ul {
            position: relative;
            padding: 0;
            margin: 0;
            height: 3em;
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
            background: var(--background);
            background-size: contain;
            opacity: 1;
            flex-direction: column;
        }

        li {
            position: relative;
            height: 100%;
            font-weight: 400;
            line-height: 2;
            display: flex;
            justify-content: center;

            background-color: rgba(17, 17, 38, 0.95);
        }

        li[aria-current='page'] {
            /*text-transform: uppercase;*/
            font-weight: 900;
            background-color: rgba(48, 48, 116, 0.9);
        }

        nav a {
            display: flex;
            height: 40px;
            align-items: center;
            /* text-transform: uppercase; */
            letter-spacing: 0.1em;
            text-decoration: none;
            transition: color 0.2s linear;
            font-family: 'Inter';
            font-style: normal;
            /*font-weight: 400;*/
            font-size: 16px;
            line-height: 26px;
            color: #dcd9fc;
            padding-bottom: 7px;
            text-transform: uppercase;
        }

        a:hover {
            color: var(--color-text-2);
        }
    }

    @media (max-width: 600px) {
        .corner {
            left: 12.5%;
        }
        nav {
            height: 175px;

            & a {
                height: 35px;
                font-size: 11px;
            }
        }
        ul {
            gap: 0;
        }
    }
</style>
