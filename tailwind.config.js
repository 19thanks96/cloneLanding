/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const pxToVw = (px) => (px / 1919) * 100;
const pxToVh = (px) => (px / 945) * 100;
const pxToBigVh = (px) => (px / 1080) * 100;

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        fontFamily: {
            ChangaOne: ['Changa One'],
            PassionOne: ['Passion One'],
            arial: ['Arial']
        },

        screens: {
            land: { raw: '(orientation: landscape)' },
            port: { raw: '(orientation: portrait)' },

            xs: '300px',
            xsL: { raw: '(orientation: landscape) and (min-width: 300px)' },
            xsP: { raw: '(orientation: portrait) and (min-width: 300px)' },

            smP: { raw: '(orientation: portrait) and (min-width: 330px)' },

            md: { raw: '(max-width: 1072px)' },
            sm: { raw: '(max-width: 600px)' },

            lg: '1024px',
            lgL: { raw: '(orientation: landscape) and (min-width: 1024px)' },
            lgP: { raw: '(orientation: portrait) and (min-width: 1024px)' },

            xl: '1280px',
            xlL: { raw: '(orientation: landscape) and (min-width: 1280px)' },
            xlP: { raw: '(orientation: portrait) and (min-width: 1280px)' },

            '2xl': '1536px',
            '2xlL': { raw: '(orientation: landscape) and (min-width: 1536px)' },
            '2xlP': { raw: '(orientation: portrait) and (min-width: 1536px)' }
        }
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vwFont: (px) => ({
                        fontSize: pxToVw(px) + 'vw'
                    })
                },
                { values: theme('vwFont') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vwWidth: (px) => ({
                        width: pxToVw(px) + 'vw'
                    })
                },
                { values: theme('vwWidth') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vwHeight: (px) => ({
                        height: pxToVw(px) + 'vw'
                    })
                },
                { values: theme('vwHeight') }
            );
        }),

        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhFont: (px) => ({
                        fontSize: pxToVh(px) + 'vh'
                    })
                },
                { values: theme('vhFont') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhWidth: (px) => ({
                        width: pxToVh(px) + 'vh'
                    })
                },
                { values: theme('vhWidth') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhHeight: (px) => ({
                        height: pxToVh(px) + 'vh'
                    })
                },
                { values: theme('vhHeight') }
            );
        }),

        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhBigFont: (px) => ({
                        fontSize: pxToBigVh(px) + 'vh'
                    })
                },
                { values: theme('vhBigFont') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhBigWidth: (px) => ({
                        width: pxToBigVh(px) + 'vh'
                    })
                },
                { values: theme('vhBigWidth') }
            );
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    vhBigHeight: (px) => ({
                        height: pxToBigVh(px) + 'vh'
                    })
                },
                { values: theme('vhBigHeight') }
            );
        })
    ]
};
