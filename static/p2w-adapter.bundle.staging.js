(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["p2w-adapter"] = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var src = {};

	var adapter = {exports: {}};

	//create bubble container
	const createBubbleButton = (isAddedAnimation) => {
	    const bubbleButton = document.createElement('button');
	    bubbleButton.style.zIndex = '1049';// '99999';
	    bubbleButton.classList.add('p2w-moon-action-button');
	    bubbleButton.id = 'p2w-bubble';
	    if (isAddedAnimation) {
	        bubbleButton.classList.add('p2w-bubble-animation');
	    }
	    return bubbleButton;
	};

	// const createBubbleHtmlElements = (bubbleButton, hostUrl, locale, availableAndRedDots) => {
	//
	//
	//     let bubbleMechanicsElements = [storeIconContainer, pbIcon, dmIcon]
	//
	//     return {bubbleButton, bubbleMechanicsElements}
	// }


	const createRedDotsForBubble = () => {
	    const redCircleAlert = document.createElement('div');
	    redCircleAlert.classList.add('p2w-red-circle-alert');
	    return redCircleAlert;
	};


	const appendBubbleElementsInBubble = (bubbleButton, locale, hostUrl, availableMechanics, redDots, onOpenIframe, userId) => {
	    //create buttons in bubble
	    const buttonContainer = document.createElement('button');
	    buttonContainer.classList.add('p2w-moon-action-button');
	    buttonContainer.classList.add('p2w-yellow-block');
	    buttonContainer.style.zIndex = '-1';

	    const bubbleImageContainer = document.createElement('div');
	    bubbleImageContainer.classList.add('p2w-inside-button-img');


	    const content = document.createElement('div');
	    content.classList.add('p2w-content');

	    const collapseIconContainer = document.createElement('div');
	    collapseIconContainer.classList.add('p2w-collapse-btn');
	    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	        collapseIconContainer.classList.add('p2w-top');
	    } else {
	        collapseIconContainer.classList.add('p2w-bottom');
	    }

	    content.appendChild(collapseIconContainer);


	    const storeIconContainer = document.createElement('div');
	    storeIconContainer.classList.add('p2w-link-store');
	    storeIconContainer.dataset.link = hostUrl + `/store?lang=${locale?.toLowerCase() ?? 'en'}&userId=${userId}&hash=${Math.random().toString(36).slice(2, 7)}`;


	    const pbIconContainer = document.createElement('div');
	    pbIconContainer.classList.add('p2w-link-pb');
	    pbIconContainer.dataset.link = hostUrl + `/pb?lang=${locale?.toLowerCase() ?? 'en'}&userId=${userId}&hash=${Math.random().toString(36).slice(2, 7)}`;

	    const empty = document.createElement('div');
	    empty.classList.add('p2w-empty');

	    const dmIconContainer = document.createElement('div');
	    dmIconContainer.classList.add('p2w-link-dm');
	    dmIconContainer.dataset.link = hostUrl + `/dm?lang=${locale?.toLowerCase() ?? 'en'}&userId=${userId}&hash=${Math.random().toString(36).slice(2, 7)}`;

	    let redDotForDm = document.createElement('div');
	    let redDotForPb = document.createElement('div');
	    let redDotForStore = document.createElement('div');

	    redDotForDm.classList.add('p2w-red-Dot');
	    redDotForPb.classList.add('p2w-red-Dot');
	    redDotForStore.classList.add('p2w-red-Dot');


	    let bubbleElements = [];

	    if (availableMechanics?.isMgAvailable) {
	        content.appendChild(dmIconContainer);
	        if (redDots.dmRed) {
	            dmIconContainer.appendChild(redDotForDm);
	        }
	        bubbleElements.push(dmIconContainer);

	    }

	    if (availableMechanics?.isPbAvailable) {
	        content.appendChild(pbIconContainer);
	        if (redDots.pbRed) {
	            pbIconContainer.appendChild(redDotForPb);
	        }
	        bubbleElements.push(pbIconContainer);

	    }

	    if (availableMechanics?.isStoreAvailable) {
	        if (redDots.storeRed) {
	            storeIconContainer.appendChild(redDotForStore);
	        }
	        content.appendChild(storeIconContainer);
	        bubbleElements.push(storeIconContainer);
	    }


	    content.appendChild(empty);
	    bubbleButton.appendChild(bubbleImageContainer);
	    bubbleButton.appendChild(buttonContainer);

	    if (redDots && Object.values(redDots).some(el => el)) {
	        bubbleButton.appendChild(createRedDotsForBubble());
	    }

	    bubbleButton.appendChild(content);

	    bubbleElements.forEach((el) => {
	        el.onclick = (e) => {
	            const button = document.querySelector('.p2w-moon-action-button');
	            if (button && button.classList.contains('p2w_active')) {
	                button.classList.remove('p2w_active');
	            }
	            e.stopPropagation();
	            onOpenIframe(el.dataset.link);
	        };
	    });
	};

	const setExpandBubbleHandler = (button, bubbleHandler) => {
	    button.onclick = (event) => {
	        bubbleHandler(button);
	    };
	};


	const hideBubbleContentAfterClickWithoutBubble = () => {
	    document.addEventListener('click', function (event) {
	        if (!event.target.closest('.p2w-moon-action-button')) {
	            const button = document.querySelector('.p2w-moon-action-button');
	            if (button) button?.classList?.remove('p2w_active');
	        }
	    });
	};


	const mobileDraggableBubble = (button,trackEvent,apiKey,externalId) => {
	    button.addEventListener('touchmove', function (event) {
	        const isOpenedIframe = button.classList.contains('p2w-opened-iframe');
	        if (!isOpenedIframe && !button.disabled) {
	            event.preventDefault();
	            const touchX = event.changedTouches[0].clientX - button.offsetWidth / 2;
	            const touchY = event.changedTouches[0].clientY + button.offsetHeight / 2;
	            if (touchY > button.offsetHeight * 1.25 && touchY < window.innerHeight - button.offsetHeight * 0.25) {
	                button.style.bottom = (touchY - window.innerHeight) * -1 + 'px';
	            }
	            if (touchX > button.offsetWidth * 0.25 && touchX < window.innerWidth - button.offsetWidth * 1.25) {
	                button.style.left = (touchX) + 'px';
	            }
	            if (window.innerHeight / 2 < (touchY - window.innerHeight) * -1) {
	                updateBubbleContentPositionToBottom();
	            } else {
	                updateBubbleContentPositionToTop();
	            }
	        }
	    });

	    button.addEventListener('touchend',() => {
	       trackEvent(apiKey, externalId, 'bubbleChangePosition');
	    });
	};
	const updateBubbleContentPositionToBottom = () => {
	    const content = document.querySelector('.p2w-content');
	    const collapseBtn = document.querySelector('.p2w-collapse-btn');
	    const moonActionButton = document.querySelector('.p2w-red-circle-alert');

	    if (content) {
	        content.style.top = '5%';
	        content.style.bottom = '';
	        content.style.flexDirection = 'column-reverse';
	    }

	    if (moonActionButton) {
	        moonActionButton.classList.add('p2w-top');
	        moonActionButton.classList.remove('p2w-bottom');
	    }

	    if (collapseBtn) {
	        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	            collapseBtn.classList.remove('p2w-top');
	            collapseBtn.classList.add('p2w-bottom');
	        } else {
	            collapseBtn.classList.add('p2w-top');
	            collapseBtn.classList.remove('p2w-bottom');
	        }
	    }
	};


	const updateBubbleContentPositionToTop = () => {
	    const content = document.querySelector('.p2w-content');
	    const collapseBtn = document.querySelector('.p2w-collapse-btn');
	    const moonActionButton = document.querySelector('.p2w-red-circle-alert');

	    if (content) {
	        content.style.bottom = '5%';
	        content.style.top = '';
	        content.style.flexDirection = 'column';
	    }

	    if (moonActionButton) {
	        moonActionButton.classList.remove('p2w-top');
	        moonActionButton.classList.add('p2w-bottom');
	    }

	    if (collapseBtn) {
	        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	            collapseBtn.classList.add('p2w-top');
	            collapseBtn.classList.remove('p2w-bottom');
	        } else {
	            collapseBtn.classList.remove('p2w-top');
	            collapseBtn.classList.add('p2w-bottom');
	        }
	    }

	};

	const moveBubbleToIframe = (isDesktopOrientation, iframePositions, savePositionToLs = false) => {
	    const bubble = document.querySelector('#p2w-bubble');
	    const bubblePositions = bubble.getBoundingClientRect();
	    updateBubbleContentPositionToTop();
	    const indentationInVwByOrientation = !isDesktopOrientation ? 0.02037 : 0.0119792;
	    bubble.classList.add('p2w-opened-iframe');

	    if (bubble && bubblePositions) {
	        if (iframePositions && iframePositions.width > 0) {
	            if (savePositionToLs) {
	                window.localStorage.setItem('bubblePositions', JSON.stringify(bubblePositions));
	            }
	            if (!isDesktopOrientation) {
	                bubble.style.bottom = iframePositions.top + (iframePositions.width * indentationInVwByOrientation) + 'px';
	                bubble.style.left = iframePositions.width - (bubblePositions.width + iframePositions.left + iframePositions.width * indentationInVwByOrientation) + 'px';
	            }
	        }
	    }
	};

	const removeBubbleToLocalStoragePosition = () => {
	    const bubblePositions = JSON.parse(window.localStorage.getItem('bubblePositions'));
	    const bubble = document?.querySelector('#p2w-bubble');
	    if (bubble && bubblePositions) {
	        bubble.style.bottom = window.innerHeight - bubblePositions.bottom + 'px';
	        bubble.style.left = bubblePositions.left + 'px';
	        bubble.style.transform = 'none';
	        bubble.style.transition = 'none';
	    }
	};

	const getBubbleCssStyles = (calculatedExpandedBubbleHeight) => `
@keyframes heartBeatBubble {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
}
     

       #p2w-bubble {
         position: absolute;
         // animation-timing-function: ease-in-out;
         // transform-origin: bottom center;
         // animation-name: fedoraTipNorm;
         // animation-duration: 5s;
       }

            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
                transform: translate3d(0,0,0);
                }
                40%, 43% {
                transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
                transform: translate3d(0, -30px, 0);
                }
                70% {
                transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
                transform: translate3d(0, -15px, 0);
                }
                90% {
                transform: translate3d(0,-4px,0);
                }
            }
            @keyframes zoomInDown {
                0% {
                opacity: 0;
                transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
                animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
                }
                60% {
                opacity: 1;
                transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
                animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
                }
            }
            .p2w-moon-action-button {
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/bubble-bg.png') center center no-repeat;
                background-size: contain;
               
                border: none;
                cursor: pointer;
                transition: none;
            }
            
            .p2w-yellow-block,
            .p2w-moon-action-button {
                width: 35px;
                height: 35px;
            }


            @media screen and (min-width: 374px) {
                .p2w-yellow-block,
                .p2w-moon-action-button {
                    width: 40px;
                    height: 40px;
                }
            }

            @media screen and (min-width: 1280px) {
                .p2w-yellow-block,
                .p2w-moon-action-button {
                    width: 45px;
                    height: 45px;
                }
            }

            @media screen and (min-width: 1535px) {
                .p2w-yellow-block,
                .p2w-moon-action-button {
                        width: 6.25vh;
                        height: 6.25vh;
                }
            }


            #p2w-bubble{
                left: 92.5vw;
                bottom: 9.5vh;
            }
            .p2w-bubble-animation{
                animation: zoomInDown 1s;
            }
            .p2w-yellow-block {
                position: absolute;
                bottom: 0px;
                right: 0px;
               
                border: none;
                cursor: pointer;
                transition: none;
            }
            @media (orientation: portrait) {
                #p2w-bubble{
                    left: 85vw;
                    bottom: 11vh;
                }
            }
            
            .p2w-inside-button-img{
                background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/bubble-icon.png') center center no-repeat;
                background-size: cover;
                width: 100%;
                height: 100%;
                position: absolute;
                transition: transform 0.3s ease;
            }
            @media (hover: hover) {
                button .p2w-inside-button-img:hover {
                    transform: scale(1.15);
                }
                button:disabled .p2w-inside-button-img {
                    transform: scale(1);
                }
            }
            .p2w-red-circle-alert{
                background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/alert.png') center center no-repeat;
                background-size: contain;
                width: 30%;
                height: 30%;
                position: absolute;
                top: -10%;
                right: -10%;
                transition: transform 0.3s ease;
                justify-self: flex-end;
                align-self: flex-start;
                transition: all 0.5s;
            }
            .p2w-red-Dot{
                background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/alert.png') center center no-repeat;
                background-size: contain;
                width: 30%;
                height: 0%;
                position: absolute;
                top: -10%;
                right: -10%;
                transition: transform 0.3s ease;
                justify-self: flex-end;
                align-self: flex-start;
                transition: all 0.5s;
            }
            .p2w-moon-action-button.p2w_active .p2w-red-Dot{
                height: 30%;
                transition: all 0.75s;
            }
            .p2w-content{
                position: absolute;
                width: 98%;
                height: 0%;
                display: flex;
                flex-direction: column;
                background: #1E2026;
                border-radius: 2vh;
                bottom: 5%;
                z-index: -2;
                filter: drop-shadow(rgba(0, 0, 0, 0.5) 0px 7.5px 3.75px);
                box-shadow: inset -1.5px -1.5px 0px rgba(153, 249, 249, 0.15), inset 1.5px 1.5px 0px rgba(255, 255, 255, 0.15);
            }
            .p2w-collapse-btn{
                width: 100%;
                flex: 1;
                transform: scale(0.75) rotate(180deg);
                background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/collapse-icon.png') center center no-repeat;
            }

             .p2w-collapse-btn.p2w-bottom{
                transform: scale(0.75) rotate(180deg);
            }
            .p2w-collapse-btn.p2w-top{
                transform: scale(0.75) rotate(0deg);
            }
            .p2w-link-dm, .p2w-link-pb, .p2w-link-store{
                width: 100%;
                flex: 1;
                transform: scale(0.75);
                background-size: contain;
            }
            .p2w-empty{
                flex: 1;
            }

            .p2w-link-pb{
            background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/pb-icon.png')center center no-repeat;
            background-size: contain;
            }
            .p2w-link-dm{
            background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/dm-icon.png')center center no-repeat;
            background-size: contain
            }
            .p2w-link-store{
            background: url('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/bubble-dev/store-icon.png')center center no-repeat;
            background-size: contain

            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .p2w-content {
                height: 50%;
                transition: height 0.35s cubic-bezier(0.4, 0, 1, 1);
            }
            .p2w-moon-action-button.p2w_active .p2w-content {
                height: ${calculatedExpandedBubbleHeight}%;
            }

            .p2w-moon-action-button.p2w_active .p2w-collapse-btn{
               
                transition: transform 0.75s;
                transition-delay: 0.5s;
            }
            .p2w-moon-action-button.p2w_active .p2w-collapse-btn.p2w-bottom{
                transform: scale(0.75) rotate(180deg);
            }
            .p2w-moon-action-button.p2w_active .p2w-collapse-btn.p2w-top{
                transform: scale(0.75) rotate(0deg);
            }
            .p2w-moon-action-button.p2w_active .p2w-red-circle-alert{

                height: 0;
                transition: all 0.75s;
            }
            @media (hover: hover) {

                .p2w-moon-action-button .p2w-content > div:hover {

                    background-color: grey;
                    border-radius: 2vh;
                    scale: 1.3332;
                    transition: all 0.5s;
                }
 

                .p2w-moon-action-button  div.p2w-collapse-btn:hover {
                    transition: none;
                    transition-delay: none;
                }
            }
            @media (hover: none) {
                .p2w-moon-action-button  div.p2w-collapse-btn:hover {

                    transition: none;
                    transition-delay: none;
                }
            }
            @media (orientation: portrait) {
                .p2w-content{
                    border-radius: 2vw;
                }
                @media (hover: hover) {
                    .p2w-moon-action-button .p2w-content > div:hover {
                        border-radius: 2vw;
                    }
                }
                @media (hover: none) {
                    .p2w-moon-action-button .p2w-content > div.p2w-collapse-btn:hover {
                        border-radius: 2vw;
                    }
                }
            }
            
            .p2w-opened-iframe {
                z-index: 99999 !important;
            }
        }`;

	const uiHelper = {
	    mobileDraggableBubble,
	    hideBubbleContentAfterClickWithoutBubble,
	    setExpandBubbleHandler,
	    getBubbleCssStyles,
	    removeBubbleToLocalStoragePosition,
	    moveBubbleToIframe,
	    createBubbleButton,
	    appendBubbleElementsInBubble,
	    createRedDotsForBubble
	};

	var uiHelper$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		uiHelper: uiHelper
	});

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** Error thrown when an HTTP request fails. */
	class HttpError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
	     *
	     * @param {string} errorMessage A descriptive error message.
	     * @param {number} statusCode The HTTP status code represented by this error.
	     */
	    constructor(errorMessage, statusCode) {
	        const trueProto = new.target.prototype;
	        super(`${errorMessage}: Status code '${statusCode}'`);
	        this.statusCode = statusCode;
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when a timeout elapses. */
	class TimeoutError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
	     *
	     * @param {string} errorMessage A descriptive error message.
	     */
	    constructor(errorMessage = "A timeout occurred.") {
	        const trueProto = new.target.prototype;
	        super(errorMessage);
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when an action is aborted. */
	class AbortError extends Error {
	    /** Constructs a new instance of {@link AbortError}.
	     *
	     * @param {string} errorMessage A descriptive error message.
	     */
	    constructor(errorMessage = "An abort occurred.") {
	        const trueProto = new.target.prototype;
	        super(errorMessage);
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when the selected transport is unsupported by the browser. */
	/** @private */
	class UnsupportedTransportError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
	     *
	     * @param {string} message A descriptive error message.
	     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
	     */
	    constructor(message, transport) {
	        const trueProto = new.target.prototype;
	        super(message);
	        this.transport = transport;
	        this.errorType = 'UnsupportedTransportError';
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when the selected transport is disabled by the browser. */
	/** @private */
	class DisabledTransportError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
	     *
	     * @param {string} message A descriptive error message.
	     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
	     */
	    constructor(message, transport) {
	        const trueProto = new.target.prototype;
	        super(message);
	        this.transport = transport;
	        this.errorType = 'DisabledTransportError';
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when the selected transport cannot be started. */
	/** @private */
	class FailedToStartTransportError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
	     *
	     * @param {string} message A descriptive error message.
	     * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
	     */
	    constructor(message, transport) {
	        const trueProto = new.target.prototype;
	        super(message);
	        this.transport = transport;
	        this.errorType = 'FailedToStartTransportError';
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when the negotiation with the server failed to complete. */
	/** @private */
	class FailedToNegotiateWithServerError extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
	     *
	     * @param {string} message A descriptive error message.
	     */
	    constructor(message) {
	        const trueProto = new.target.prototype;
	        super(message);
	        this.errorType = 'FailedToNegotiateWithServerError';
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}
	/** Error thrown when multiple errors have occurred. */
	/** @private */
	class AggregateErrors extends Error {
	    /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
	     *
	     * @param {string} message A descriptive error message.
	     * @param {Error[]} innerErrors The collection of errors this error is aggregating.
	     */
	    constructor(message, innerErrors) {
	        const trueProto = new.target.prototype;
	        super(message);
	        this.innerErrors = innerErrors;
	        // Workaround issue in Typescript compiler
	        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
	        this.__proto__ = trueProto;
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** Represents an HTTP response. */
	class HttpResponse {
	    constructor(statusCode, statusText, content) {
	        this.statusCode = statusCode;
	        this.statusText = statusText;
	        this.content = content;
	    }
	}
	/** Abstraction over an HTTP client.
	 *
	 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
	 */
	class HttpClient {
	    get(url, options) {
	        return this.send({
	            ...options,
	            method: "GET",
	            url,
	        });
	    }
	    post(url, options) {
	        return this.send({
	            ...options,
	            method: "POST",
	            url,
	        });
	    }
	    delete(url, options) {
	        return this.send({
	            ...options,
	            method: "DELETE",
	            url,
	        });
	    }
	    /** Gets all cookies that apply to the specified URL.
	     *
	     * @param url The URL that the cookies are valid for.
	     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
	     */
	    // @ts-ignore
	    getCookieString(url) {
	        return "";
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
	/** Indicates the severity of a log message.
	 *
	 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
	 */
	var LogLevel;
	(function (LogLevel) {
	    /** Log level for very low severity diagnostic messages. */
	    LogLevel[LogLevel["Trace"] = 0] = "Trace";
	    /** Log level for low severity diagnostic messages. */
	    LogLevel[LogLevel["Debug"] = 1] = "Debug";
	    /** Log level for informational diagnostic messages. */
	    LogLevel[LogLevel["Information"] = 2] = "Information";
	    /** Log level for diagnostic messages that indicate a non-fatal problem. */
	    LogLevel[LogLevel["Warning"] = 3] = "Warning";
	    /** Log level for diagnostic messages that indicate a failure in the current operation. */
	    LogLevel[LogLevel["Error"] = 4] = "Error";
	    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
	    LogLevel[LogLevel["Critical"] = 5] = "Critical";
	    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
	    LogLevel[LogLevel["None"] = 6] = "None";
	})(LogLevel || (LogLevel = {}));

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** A logger that does nothing when log messages are sent to it. */
	class NullLogger {
	    constructor() { }
	    /** @inheritDoc */
	    // eslint-disable-next-line
	    log(_logLevel, _message) {
	    }
	}
	/** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
	NullLogger.instance = new NullLogger();

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// Version token that will be replaced by the prepack command
	/** The version of the SignalR client. */
	const VERSION = "8.0.0";
	/** @private */
	class Arg {
	    static isRequired(val, name) {
	        if (val === null || val === undefined) {
	            throw new Error(`The '${name}' argument is required.`);
	        }
	    }
	    static isNotEmpty(val, name) {
	        if (!val || val.match(/^\s*$/)) {
	            throw new Error(`The '${name}' argument should not be empty.`);
	        }
	    }
	    static isIn(val, values, name) {
	        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
	        if (!(val in values)) {
	            throw new Error(`Unknown ${name} value: ${val}.`);
	        }
	    }
	}
	/** @private */
	class Platform {
	    // react-native has a window but no document so we should check both
	    static get isBrowser() {
	        return !Platform.isNode && typeof window === "object" && typeof window.document === "object";
	    }
	    // WebWorkers don't have a window object so the isBrowser check would fail
	    static get isWebWorker() {
	        return !Platform.isNode && typeof self === "object" && "importScripts" in self;
	    }
	    // react-native has a window but no document
	    static get isReactNative() {
	        return !Platform.isNode && typeof window === "object" && typeof window.document === "undefined";
	    }
	    // Node apps shouldn't have a window object, but WebWorkers don't either
	    // so we need to check for both WebWorker and window
	    static get isNode() {
	        return typeof process !== "undefined" && process.release && process.release.name === "node";
	    }
	}
	/** @private */
	function getDataDetail(data, includeContent) {
	    let detail = "";
	    if (isArrayBuffer(data)) {
	        detail = `Binary data of length ${data.byteLength}`;
	        if (includeContent) {
	            detail += `. Content: '${formatArrayBuffer(data)}'`;
	        }
	    }
	    else if (typeof data === "string") {
	        detail = `String data of length ${data.length}`;
	        if (includeContent) {
	            detail += `. Content: '${data}'`;
	        }
	    }
	    return detail;
	}
	/** @private */
	function formatArrayBuffer(data) {
	    const view = new Uint8Array(data);
	    // Uint8Array.map only supports returning another Uint8Array?
	    let str = "";
	    view.forEach((num) => {
	        const pad = num < 16 ? "0" : "";
	        str += `0x${pad}${num.toString(16)} `;
	    });
	    // Trim of trailing space.
	    return str.substr(0, str.length - 1);
	}
	// Also in signalr-protocol-msgpack/Utils.ts
	/** @private */
	function isArrayBuffer(val) {
	    return val && typeof ArrayBuffer !== "undefined" &&
	        (val instanceof ArrayBuffer ||
	            // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
	            (val.constructor && val.constructor.name === "ArrayBuffer"));
	}
	/** @private */
	async function sendMessage(logger, transportName, httpClient, url, content, options) {
	    const headers = {};
	    const [name, value] = getUserAgentHeader();
	    headers[name] = value;
	    logger.log(LogLevel.Trace, `(${transportName} transport) sending data. ${getDataDetail(content, options.logMessageContent)}.`);
	    const responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
	    const response = await httpClient.post(url, {
	        content,
	        headers: { ...headers, ...options.headers },
	        responseType,
	        timeout: options.timeout,
	        withCredentials: options.withCredentials,
	    });
	    logger.log(LogLevel.Trace, `(${transportName} transport) request complete. Response status: ${response.statusCode}.`);
	}
	/** @private */
	function createLogger(logger) {
	    if (logger === undefined) {
	        return new ConsoleLogger(LogLevel.Information);
	    }
	    if (logger === null) {
	        return NullLogger.instance;
	    }
	    if (logger.log !== undefined) {
	        return logger;
	    }
	    return new ConsoleLogger(logger);
	}
	/** @private */
	class SubjectSubscription {
	    constructor(subject, observer) {
	        this._subject = subject;
	        this._observer = observer;
	    }
	    dispose() {
	        const index = this._subject.observers.indexOf(this._observer);
	        if (index > -1) {
	            this._subject.observers.splice(index, 1);
	        }
	        if (this._subject.observers.length === 0 && this._subject.cancelCallback) {
	            this._subject.cancelCallback().catch((_) => { });
	        }
	    }
	}
	/** @private */
	class ConsoleLogger {
	    constructor(minimumLogLevel) {
	        this._minLevel = minimumLogLevel;
	        this.out = console;
	    }
	    log(logLevel, message) {
	        if (logLevel >= this._minLevel) {
	            const msg = `[${new Date().toISOString()}] ${LogLevel[logLevel]}: ${message}`;
	            switch (logLevel) {
	                case LogLevel.Critical:
	                case LogLevel.Error:
	                    this.out.error(msg);
	                    break;
	                case LogLevel.Warning:
	                    this.out.warn(msg);
	                    break;
	                case LogLevel.Information:
	                    this.out.info(msg);
	                    break;
	                default:
	                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
	                    this.out.log(msg);
	                    break;
	            }
	        }
	    }
	}
	/** @private */
	function getUserAgentHeader() {
	    let userAgentHeaderName = "X-SignalR-User-Agent";
	    if (Platform.isNode) {
	        userAgentHeaderName = "User-Agent";
	    }
	    return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
	}
	/** @private */
	function constructUserAgent(version, os, runtime, runtimeVersion) {
	    // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
	    let userAgent = "Microsoft SignalR/";
	    const majorAndMinor = version.split(".");
	    userAgent += `${majorAndMinor[0]}.${majorAndMinor[1]}`;
	    userAgent += ` (${version}; `;
	    if (os && os !== "") {
	        userAgent += `${os}; `;
	    }
	    else {
	        userAgent += "Unknown OS; ";
	    }
	    userAgent += `${runtime}`;
	    if (runtimeVersion) {
	        userAgent += `; ${runtimeVersion}`;
	    }
	    else {
	        userAgent += "; Unknown Runtime Version";
	    }
	    userAgent += ")";
	    return userAgent;
	}
	// eslint-disable-next-line spaced-comment
	 function getOsName() {
	    if (Platform.isNode) {
	        switch (process.platform) {
	            case "win32":
	                return "Windows NT";
	            case "darwin":
	                return "macOS";
	            case "linux":
	                return "Linux";
	            default:
	                return process.platform;
	        }
	    }
	    else {
	        return "";
	    }
	}
	// eslint-disable-next-line spaced-comment
	 function getRuntimeVersion() {
	    if (Platform.isNode) {
	        return process.versions.node;
	    }
	    return undefined;
	}
	function getRuntime() {
	    if (Platform.isNode) {
	        return "NodeJS";
	    }
	    else {
	        return "Browser";
	    }
	}
	/** @private */
	function getErrorString(e) {
	    if (e.stack) {
	        return e.stack;
	    }
	    else if (e.message) {
	        return e.message;
	    }
	    return `${e}`;
	}
	/** @private */
	function getGlobalThis() {
	    // globalThis is semi-new and not available in Node until v12
	    if (typeof globalThis !== "undefined") {
	        return globalThis;
	    }
	    if (typeof self !== "undefined") {
	        return self;
	    }
	    if (typeof window !== "undefined") {
	        return window;
	    }
	    if (typeof global !== "undefined") {
	        return global;
	    }
	    throw new Error("could not find global");
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	function configureFetch(obj) {
	    // Node added a fetch implementation to the global scope starting in v18.
	    // We need to add a cookie jar in node to be able to share cookies with WebSocket
	    if (typeof fetch === "undefined" || Platform.isNode) {
	        // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
	        // eslint-disable-next-line @typescript-eslint/no-var-requires
	        obj._jar = new (require("tough-cookie")).CookieJar();
	        if (typeof fetch === "undefined") {
	            // eslint-disable-next-line @typescript-eslint/no-var-requires
	            obj._fetchType = require("node-fetch");
	        }
	        else {
	            // Use fetch from Node if available
	            obj._fetchType = fetch;
	        }
	        // node-fetch doesn't have a nice API for getting and setting cookies
	        // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
	        // eslint-disable-next-line @typescript-eslint/no-var-requires
	        obj._fetchType = require("fetch-cookie")(obj._fetchType, obj._jar);
	        return true;
	    }
	    return false;
	}
	/** @private */
	function configureAbortController(obj) {
	    if (typeof AbortController === "undefined") {
	        // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
	        obj._abortControllerType = require("abort-controller");
	        return true;
	    }
	    return false;
	}
	/** @private */
	function getWS() {
	    return require("ws");
	}
	/** @private */
	function getEventSource() {
	    return require("eventsource");
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	class FetchHttpClient extends HttpClient {
	    constructor(logger) {
	        super();
	        this._logger = logger;
	        // This is how you do "reference" arguments
	        const fetchObj = { _fetchType: undefined, _jar: undefined };
	        if (configureFetch(fetchObj)) {
	            this._fetchType = fetchObj._fetchType;
	            this._jar = fetchObj._jar;
	        }
	        else {
	            this._fetchType = fetch.bind(getGlobalThis());
	        }
	        this._abortControllerType = AbortController;
	        const abortObj = { _abortControllerType: this._abortControllerType };
	        if (configureAbortController(abortObj)) {
	            this._abortControllerType = abortObj._abortControllerType;
	        }
	    }
	    /** @inheritDoc */
	    async send(request) {
	        // Check that abort was not signaled before calling send
	        if (request.abortSignal && request.abortSignal.aborted) {
	            throw new AbortError();
	        }
	        if (!request.method) {
	            throw new Error("No method defined.");
	        }
	        if (!request.url) {
	            throw new Error("No url defined.");
	        }
	        const abortController = new this._abortControllerType();
	        let error;
	        // Hook our abortSignal into the abort controller
	        if (request.abortSignal) {
	            request.abortSignal.onabort = () => {
	                abortController.abort();
	                error = new AbortError();
	            };
	        }
	        // If a timeout has been passed in, setup a timeout to call abort
	        // Type needs to be any to fit window.setTimeout and NodeJS.setTimeout
	        let timeoutId = null;
	        if (request.timeout) {
	            const msTimeout = request.timeout;
	            timeoutId = setTimeout(() => {
	                abortController.abort();
	                this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
	                error = new TimeoutError();
	            }, msTimeout);
	        }
	        if (request.content === "") {
	            request.content = undefined;
	        }
	        if (request.content) {
	            // Explicitly setting the Content-Type header for React Native on Android platform.
	            request.headers = request.headers || {};
	            if (isArrayBuffer(request.content)) {
	                request.headers["Content-Type"] = "application/octet-stream";
	            }
	            else {
	                request.headers["Content-Type"] = "text/plain;charset=UTF-8";
	            }
	        }
	        let response;
	        try {
	            response = await this._fetchType(request.url, {
	                body: request.content,
	                cache: "no-cache",
	                credentials: request.withCredentials === true ? "include" : "same-origin",
	                headers: {
	                    "X-Requested-With": "XMLHttpRequest",
	                    ...request.headers,
	                },
	                method: request.method,
	                mode: "cors",
	                redirect: "follow",
	                signal: abortController.signal,
	            });
	        }
	        catch (e) {
	            if (error) {
	                throw error;
	            }
	            this._logger.log(LogLevel.Warning, `Error from HTTP request. ${e}.`);
	            throw e;
	        }
	        finally {
	            if (timeoutId) {
	                clearTimeout(timeoutId);
	            }
	            if (request.abortSignal) {
	                request.abortSignal.onabort = null;
	            }
	        }
	        if (!response.ok) {
	            const errorMessage = await deserializeContent(response, "text");
	            throw new HttpError(errorMessage || response.statusText, response.status);
	        }
	        const content = deserializeContent(response, request.responseType);
	        const payload = await content;
	        return new HttpResponse(response.status, response.statusText, payload);
	    }
	    getCookieString(url) {
	        let cookies = "";
	        if (Platform.isNode && this._jar) {
	            // @ts-ignore: unused variable
	            this._jar.getCookies(url, (e, c) => cookies = c.join("; "));
	        }
	        return cookies;
	    }
	}
	function deserializeContent(response, responseType) {
	    let content;
	    switch (responseType) {
	        case "arraybuffer":
	            content = response.arrayBuffer();
	            break;
	        case "text":
	            content = response.text();
	            break;
	        case "blob":
	        case "document":
	        case "json":
	            throw new Error(`${responseType} is not supported.`);
	        default:
	            content = response.text();
	            break;
	    }
	    return content;
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	class XhrHttpClient extends HttpClient {
	    constructor(logger) {
	        super();
	        this._logger = logger;
	    }
	    /** @inheritDoc */
	    send(request) {
	        // Check that abort was not signaled before calling send
	        if (request.abortSignal && request.abortSignal.aborted) {
	            return Promise.reject(new AbortError());
	        }
	        if (!request.method) {
	            return Promise.reject(new Error("No method defined."));
	        }
	        if (!request.url) {
	            return Promise.reject(new Error("No url defined."));
	        }
	        return new Promise((resolve, reject) => {
	            const xhr = new XMLHttpRequest();
	            xhr.open(request.method, request.url, true);
	            xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
	            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	            if (request.content === "") {
	                request.content = undefined;
	            }
	            if (request.content) {
	                // Explicitly setting the Content-Type header for React Native on Android platform.
	                if (isArrayBuffer(request.content)) {
	                    xhr.setRequestHeader("Content-Type", "application/octet-stream");
	                }
	                else {
	                    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	                }
	            }
	            const headers = request.headers;
	            if (headers) {
	                Object.keys(headers)
	                    .forEach((header) => {
	                    xhr.setRequestHeader(header, headers[header]);
	                });
	            }
	            if (request.responseType) {
	                xhr.responseType = request.responseType;
	            }
	            if (request.abortSignal) {
	                request.abortSignal.onabort = () => {
	                    xhr.abort();
	                    reject(new AbortError());
	                };
	            }
	            if (request.timeout) {
	                xhr.timeout = request.timeout;
	            }
	            xhr.onload = () => {
	                if (request.abortSignal) {
	                    request.abortSignal.onabort = null;
	                }
	                if (xhr.status >= 200 && xhr.status < 300) {
	                    resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
	                }
	                else {
	                    reject(new HttpError(xhr.response || xhr.responseText || xhr.statusText, xhr.status));
	                }
	            };
	            xhr.onerror = () => {
	                this._logger.log(LogLevel.Warning, `Error from HTTP request. ${xhr.status}: ${xhr.statusText}.`);
	                reject(new HttpError(xhr.statusText, xhr.status));
	            };
	            xhr.ontimeout = () => {
	                this._logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
	                reject(new TimeoutError());
	            };
	            xhr.send(request.content);
	        });
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** Default implementation of {@link @microsoft/signalr.HttpClient}. */
	class DefaultHttpClient extends HttpClient {
	    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
	    constructor(logger) {
	        super();
	        if (typeof fetch !== "undefined" || Platform.isNode) {
	            this._httpClient = new FetchHttpClient(logger);
	        }
	        else if (typeof XMLHttpRequest !== "undefined") {
	            this._httpClient = new XhrHttpClient(logger);
	        }
	        else {
	            throw new Error("No usable HttpClient found.");
	        }
	    }
	    /** @inheritDoc */
	    send(request) {
	        // Check that abort was not signaled before calling send
	        if (request.abortSignal && request.abortSignal.aborted) {
	            return Promise.reject(new AbortError());
	        }
	        if (!request.method) {
	            return Promise.reject(new Error("No method defined."));
	        }
	        if (!request.url) {
	            return Promise.reject(new Error("No url defined."));
	        }
	        return this._httpClient.send(request);
	    }
	    getCookieString(url) {
	        return this._httpClient.getCookieString(url);
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// Not exported from index
	/** @private */
	class TextMessageFormat {
	    static write(output) {
	        return `${output}${TextMessageFormat.RecordSeparator}`;
	    }
	    static parse(input) {
	        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
	            throw new Error("Message is incomplete.");
	        }
	        const messages = input.split(TextMessageFormat.RecordSeparator);
	        messages.pop();
	        return messages;
	    }
	}
	TextMessageFormat.RecordSeparatorCode = 0x1e;
	TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	class HandshakeProtocol {
	    // Handshake request is always JSON
	    writeHandshakeRequest(handshakeRequest) {
	        return TextMessageFormat.write(JSON.stringify(handshakeRequest));
	    }
	    parseHandshakeResponse(data) {
	        let messageData;
	        let remainingData;
	        if (isArrayBuffer(data)) {
	            // Format is binary but still need to read JSON text from handshake response
	            const binaryData = new Uint8Array(data);
	            const separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
	            if (separatorIndex === -1) {
	                throw new Error("Message is incomplete.");
	            }
	            // content before separator is handshake response
	            // optional content after is additional messages
	            const responseLength = separatorIndex + 1;
	            messageData = String.fromCharCode.apply(null, Array.prototype.slice.call(binaryData.slice(0, responseLength)));
	            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
	        }
	        else {
	            const textData = data;
	            const separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
	            if (separatorIndex === -1) {
	                throw new Error("Message is incomplete.");
	            }
	            // content before separator is handshake response
	            // optional content after is additional messages
	            const responseLength = separatorIndex + 1;
	            messageData = textData.substring(0, responseLength);
	            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
	        }
	        // At this point we should have just the single handshake message
	        const messages = TextMessageFormat.parse(messageData);
	        const response = JSON.parse(messages[0]);
	        if (response.type) {
	            throw new Error("Expected a handshake response from the server.");
	        }
	        const responseMessage = response;
	        // multiple messages could have arrived with handshake
	        // return additional data to be parsed as usual, or null if all parsed
	        return [remainingData, responseMessage];
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** Defines the type of a Hub Message. */
	var MessageType;
	(function (MessageType) {
	    /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
	    MessageType[MessageType["Invocation"] = 1] = "Invocation";
	    /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
	    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
	    /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
	    MessageType[MessageType["Completion"] = 3] = "Completion";
	    /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
	    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
	    /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
	    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
	    /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
	    MessageType[MessageType["Ping"] = 6] = "Ping";
	    /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
	    MessageType[MessageType["Close"] = 7] = "Close";
	    MessageType[MessageType["Ack"] = 8] = "Ack";
	    MessageType[MessageType["Sequence"] = 9] = "Sequence";
	})(MessageType || (MessageType = {}));

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** Stream implementation to stream items to the server. */
	class Subject {
	    constructor() {
	        this.observers = [];
	    }
	    next(item) {
	        for (const observer of this.observers) {
	            observer.next(item);
	        }
	    }
	    error(err) {
	        for (const observer of this.observers) {
	            if (observer.error) {
	                observer.error(err);
	            }
	        }
	    }
	    complete() {
	        for (const observer of this.observers) {
	            if (observer.complete) {
	                observer.complete();
	            }
	        }
	    }
	    subscribe(observer) {
	        this.observers.push(observer);
	        return new SubjectSubscription(this, observer);
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	class MessageBuffer {
	    constructor(protocol, connection, bufferSize) {
	        this._bufferSize = 100000;
	        this._messages = [];
	        this._totalMessageCount = 0;
	        this._waitForSequenceMessage = false;
	        // Message IDs start at 1 and always increment by 1
	        this._nextReceivingSequenceId = 1;
	        this._latestReceivedSequenceId = 0;
	        this._bufferedByteCount = 0;
	        this._reconnectInProgress = false;
	        this._protocol = protocol;
	        this._connection = connection;
	        this._bufferSize = bufferSize;
	    }
	    async _send(message) {
	        const serializedMessage = this._protocol.writeMessage(message);
	        let backpressurePromise = Promise.resolve();
	        // Only count invocation messages. Acks, pings, etc. don't need to be resent on reconnect
	        if (this._isInvocationMessage(message)) {
	            this._totalMessageCount++;
	            let backpressurePromiseResolver = () => { };
	            let backpressurePromiseRejector = () => { };
	            if (isArrayBuffer(serializedMessage)) {
	                this._bufferedByteCount += serializedMessage.byteLength;
	            }
	            else {
	                this._bufferedByteCount += serializedMessage.length;
	            }
	            if (this._bufferedByteCount >= this._bufferSize) {
	                backpressurePromise = new Promise((resolve, reject) => {
	                    backpressurePromiseResolver = resolve;
	                    backpressurePromiseRejector = reject;
	                });
	            }
	            this._messages.push(new BufferedItem(serializedMessage, this._totalMessageCount, backpressurePromiseResolver, backpressurePromiseRejector));
	        }
	        try {
	            // If this is set it means we are reconnecting or resending
	            // We don't want to send on a disconnected connection
	            // And we don't want to send if resend is running since that would mean sending
	            // this message twice
	            if (!this._reconnectInProgress) {
	                await this._connection.send(serializedMessage);
	            }
	        }
	        catch {
	            this._disconnected();
	        }
	        await backpressurePromise;
	    }
	    _ack(ackMessage) {
	        let newestAckedMessage = -1;
	        // Find index of newest message being acked
	        for (let index = 0; index < this._messages.length; index++) {
	            const element = this._messages[index];
	            if (element._id <= ackMessage.sequenceId) {
	                newestAckedMessage = index;
	                if (isArrayBuffer(element._message)) {
	                    this._bufferedByteCount -= element._message.byteLength;
	                }
	                else {
	                    this._bufferedByteCount -= element._message.length;
	                }
	                // resolve items that have already been sent and acked
	                element._resolver();
	            }
	            else if (this._bufferedByteCount < this._bufferSize) {
	                // resolve items that now fall under the buffer limit but haven't been acked
	                element._resolver();
	            }
	            else {
	                break;
	            }
	        }
	        if (newestAckedMessage !== -1) {
	            // We're removing everything including the message pointed to, so add 1
	            this._messages = this._messages.slice(newestAckedMessage + 1);
	        }
	    }
	    _shouldProcessMessage(message) {
	        if (this._waitForSequenceMessage) {
	            if (message.type !== MessageType.Sequence) {
	                return false;
	            }
	            else {
	                this._waitForSequenceMessage = false;
	                return true;
	            }
	        }
	        // No special processing for acks, pings, etc.
	        if (!this._isInvocationMessage(message)) {
	            return true;
	        }
	        const currentId = this._nextReceivingSequenceId;
	        this._nextReceivingSequenceId++;
	        if (currentId <= this._latestReceivedSequenceId) {
	            if (currentId === this._latestReceivedSequenceId) {
	                // Should only hit this if we just reconnected and the server is sending
	                // Messages it has buffered, which would mean it hasn't seen an Ack for these messages
	                this._ackTimer();
	            }
	            // Ignore, this is a duplicate message
	            return false;
	        }
	        this._latestReceivedSequenceId = currentId;
	        // Only start the timer for sending an Ack message when we have a message to ack. This also conveniently solves
	        // timer throttling by not having a recursive timer, and by starting the timer via a network call (recv)
	        this._ackTimer();
	        return true;
	    }
	    _resetSequence(message) {
	        if (message.sequenceId > this._nextReceivingSequenceId) {
	            // eslint-disable-next-line @typescript-eslint/no-floating-promises
	            this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));
	            return;
	        }
	        this._nextReceivingSequenceId = message.sequenceId;
	    }
	    _disconnected() {
	        this._reconnectInProgress = true;
	        this._waitForSequenceMessage = true;
	    }
	    async _resend() {
	        const sequenceId = this._messages.length !== 0
	            ? this._messages[0]._id
	            : this._totalMessageCount + 1;
	        await this._connection.send(this._protocol.writeMessage({ type: MessageType.Sequence, sequenceId }));
	        // Get a local variable to the _messages, just in case messages are acked while resending
	        // Which would slice the _messages array (which creates a new copy)
	        const messages = this._messages;
	        for (const element of messages) {
	            await this._connection.send(element._message);
	        }
	        this._reconnectInProgress = false;
	    }
	    _dispose(error) {
	        error !== null && error !== void 0 ? error : (error = new Error("Unable to reconnect to server."));
	        // Unblock backpressure if any
	        for (const element of this._messages) {
	            element._rejector(error);
	        }
	    }
	    _isInvocationMessage(message) {
	        // There is no way to check if something implements an interface.
	        // So we individually check the messages in a switch statement.
	        // To make sure we don't miss any message types we rely on the compiler
	        // seeing the function returns a value and it will do the
	        // exhaustive check for us on the switch statement, since we don't use 'case default'
	        switch (message.type) {
	            case MessageType.Invocation:
	            case MessageType.StreamItem:
	            case MessageType.Completion:
	            case MessageType.StreamInvocation:
	            case MessageType.CancelInvocation:
	                return true;
	            case MessageType.Close:
	            case MessageType.Sequence:
	            case MessageType.Ping:
	            case MessageType.Ack:
	                return false;
	        }
	    }
	    _ackTimer() {
	        if (this._ackTimerHandle === undefined) {
	            this._ackTimerHandle = setTimeout(async () => {
	                try {
	                    if (!this._reconnectInProgress) {
	                        await this._connection.send(this._protocol.writeMessage({ type: MessageType.Ack, sequenceId: this._latestReceivedSequenceId }));
	                    }
	                    // Ignore errors, that means the connection is closed and we don't care about the Ack message anymore.
	                }
	                catch { }
	                clearTimeout(this._ackTimerHandle);
	                this._ackTimerHandle = undefined;
	                // 1 second delay so we don't spam Ack messages if there are many messages being received at once.
	            }, 1000);
	        }
	    }
	}
	class BufferedItem {
	    constructor(message, id, resolver, rejector) {
	        this._message = message;
	        this._id = id;
	        this._resolver = resolver;
	        this._rejector = rejector;
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	const DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
	const DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
	const DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE = 100000;
	/** Describes the current state of the {@link HubConnection} to the server. */
	var HubConnectionState;
	(function (HubConnectionState) {
	    /** The hub connection is disconnected. */
	    HubConnectionState["Disconnected"] = "Disconnected";
	    /** The hub connection is connecting. */
	    HubConnectionState["Connecting"] = "Connecting";
	    /** The hub connection is connected. */
	    HubConnectionState["Connected"] = "Connected";
	    /** The hub connection is disconnecting. */
	    HubConnectionState["Disconnecting"] = "Disconnecting";
	    /** The hub connection is reconnecting. */
	    HubConnectionState["Reconnecting"] = "Reconnecting";
	})(HubConnectionState || (HubConnectionState = {}));
	/** Represents a connection to a SignalR Hub. */
	class HubConnection {
	    /** @internal */
	    // Using a public static factory method means we can have a private constructor and an _internal_
	    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
	    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
	    // public parameter-less constructor.
	    static create(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
	        return new HubConnection(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize);
	    }
	    constructor(connection, logger, protocol, reconnectPolicy, serverTimeoutInMilliseconds, keepAliveIntervalInMilliseconds, statefulReconnectBufferSize) {
	        this._nextKeepAlive = 0;
	        this._freezeEventListener = () => {
	            this._logger.log(LogLevel.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
	        };
	        Arg.isRequired(connection, "connection");
	        Arg.isRequired(logger, "logger");
	        Arg.isRequired(protocol, "protocol");
	        this.serverTimeoutInMilliseconds = serverTimeoutInMilliseconds !== null && serverTimeoutInMilliseconds !== void 0 ? serverTimeoutInMilliseconds : DEFAULT_TIMEOUT_IN_MS;
	        this.keepAliveIntervalInMilliseconds = keepAliveIntervalInMilliseconds !== null && keepAliveIntervalInMilliseconds !== void 0 ? keepAliveIntervalInMilliseconds : DEFAULT_PING_INTERVAL_IN_MS;
	        this._statefulReconnectBufferSize = statefulReconnectBufferSize !== null && statefulReconnectBufferSize !== void 0 ? statefulReconnectBufferSize : DEFAULT_STATEFUL_RECONNECT_BUFFER_SIZE;
	        this._logger = logger;
	        this._protocol = protocol;
	        this.connection = connection;
	        this._reconnectPolicy = reconnectPolicy;
	        this._handshakeProtocol = new HandshakeProtocol();
	        this.connection.onreceive = (data) => this._processIncomingData(data);
	        this.connection.onclose = (error) => this._connectionClosed(error);
	        this._callbacks = {};
	        this._methods = {};
	        this._closedCallbacks = [];
	        this._reconnectingCallbacks = [];
	        this._reconnectedCallbacks = [];
	        this._invocationId = 0;
	        this._receivedHandshakeResponse = false;
	        this._connectionState = HubConnectionState.Disconnected;
	        this._connectionStarted = false;
	        this._cachedPingMessage = this._protocol.writeMessage({ type: MessageType.Ping });
	    }
	    /** Indicates the state of the {@link HubConnection} to the server. */
	    get state() {
	        return this._connectionState;
	    }
	    /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
	     *  in the disconnected state or if the negotiation step was skipped.
	     */
	    get connectionId() {
	        return this.connection ? (this.connection.connectionId || null) : null;
	    }
	    /** Indicates the url of the {@link HubConnection} to the server. */
	    get baseUrl() {
	        return this.connection.baseUrl || "";
	    }
	    /**
	     * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
	     * Reconnecting states.
	     * @param {string} url The url to connect to.
	     */
	    set baseUrl(url) {
	        if (this._connectionState !== HubConnectionState.Disconnected && this._connectionState !== HubConnectionState.Reconnecting) {
	            throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
	        }
	        if (!url) {
	            throw new Error("The HubConnection url must be a valid url.");
	        }
	        this.connection.baseUrl = url;
	    }
	    /** Starts the connection.
	     *
	     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
	     */
	    start() {
	        this._startPromise = this._startWithStateTransitions();
	        return this._startPromise;
	    }
	    async _startWithStateTransitions() {
	        if (this._connectionState !== HubConnectionState.Disconnected) {
	            return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
	        }
	        this._connectionState = HubConnectionState.Connecting;
	        this._logger.log(LogLevel.Debug, "Starting HubConnection.");
	        try {
	            await this._startInternal();
	            if (Platform.isBrowser) {
	                // Log when the browser freezes the tab so users know why their connection unexpectedly stopped working
	                window.document.addEventListener("freeze", this._freezeEventListener);
	            }
	            this._connectionState = HubConnectionState.Connected;
	            this._connectionStarted = true;
	            this._logger.log(LogLevel.Debug, "HubConnection connected successfully.");
	        }
	        catch (e) {
	            this._connectionState = HubConnectionState.Disconnected;
	            this._logger.log(LogLevel.Debug, `HubConnection failed to start successfully because of error '${e}'.`);
	            return Promise.reject(e);
	        }
	    }
	    async _startInternal() {
	        this._stopDuringStartError = undefined;
	        this._receivedHandshakeResponse = false;
	        // Set up the promise before any connection is (re)started otherwise it could race with received messages
	        const handshakePromise = new Promise((resolve, reject) => {
	            this._handshakeResolver = resolve;
	            this._handshakeRejecter = reject;
	        });
	        await this.connection.start(this._protocol.transferFormat);
	        try {
	            let version = this._protocol.version;
	            if (!this.connection.features.reconnect) {
	                // Stateful Reconnect starts with HubProtocol version 2, newer clients connecting to older servers will fail to connect due to
	                // the handshake only supporting version 1, so we will try to send version 1 during the handshake to keep old servers working.
	                version = 1;
	            }
	            const handshakeRequest = {
	                protocol: this._protocol.name,
	                version,
	            };
	            this._logger.log(LogLevel.Debug, "Sending handshake request.");
	            await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(handshakeRequest));
	            this._logger.log(LogLevel.Information, `Using HubProtocol '${this._protocol.name}'.`);
	            // defensively cleanup timeout in case we receive a message from the server before we finish start
	            this._cleanupTimeout();
	            this._resetTimeoutPeriod();
	            this._resetKeepAliveInterval();
	            await handshakePromise;
	            // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
	            // being rejected on close, because this continuation can run after both the handshake completed successfully
	            // and the connection was closed.
	            if (this._stopDuringStartError) {
	                // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
	                // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
	                // will cause the calling continuation to get scheduled to run later.
	                // eslint-disable-next-line @typescript-eslint/no-throw-literal
	                throw this._stopDuringStartError;
	            }
	            const useStatefulReconnect = this.connection.features.reconnect || false;
	            if (useStatefulReconnect) {
	                this._messageBuffer = new MessageBuffer(this._protocol, this.connection, this._statefulReconnectBufferSize);
	                this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer);
	                this.connection.features.resend = () => {
	                    if (this._messageBuffer) {
	                        return this._messageBuffer._resend();
	                    }
	                };
	            }
	            if (!this.connection.features.inherentKeepAlive) {
	                await this._sendMessage(this._cachedPingMessage);
	            }
	        }
	        catch (e) {
	            this._logger.log(LogLevel.Debug, `Hub handshake failed with error '${e}' during start(). Stopping HubConnection.`);
	            this._cleanupTimeout();
	            this._cleanupPingTimer();
	            // HttpConnection.stop() should not complete until after the onclose callback is invoked.
	            // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
	            await this.connection.stop(e);
	            throw e;
	        }
	    }
	    /** Stops the connection.
	     *
	     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
	     */
	    async stop() {
	        // Capture the start promise before the connection might be restarted in an onclose callback.
	        const startPromise = this._startPromise;
	        this.connection.features.reconnect = false;
	        this._stopPromise = this._stopInternal();
	        await this._stopPromise;
	        try {
	            // Awaiting undefined continues immediately
	            await startPromise;
	        }
	        catch (e) {
	            // This exception is returned to the user as a rejected Promise from the start method.
	        }
	    }
	    _stopInternal(error) {
	        if (this._connectionState === HubConnectionState.Disconnected) {
	            this._logger.log(LogLevel.Debug, `Call to HubConnection.stop(${error}) ignored because it is already in the disconnected state.`);
	            return Promise.resolve();
	        }
	        if (this._connectionState === HubConnectionState.Disconnecting) {
	            this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
	            return this._stopPromise;
	        }
	        const state = this._connectionState;
	        this._connectionState = HubConnectionState.Disconnecting;
	        this._logger.log(LogLevel.Debug, "Stopping HubConnection.");
	        if (this._reconnectDelayHandle) {
	            // We're in a reconnect delay which means the underlying connection is currently already stopped.
	            // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
	            // fire the onclose callbacks.
	            this._logger.log(LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
	            clearTimeout(this._reconnectDelayHandle);
	            this._reconnectDelayHandle = undefined;
	            this._completeClose();
	            return Promise.resolve();
	        }
	        if (state === HubConnectionState.Connected) {
	            // eslint-disable-next-line @typescript-eslint/no-floating-promises
	            this._sendCloseMessage();
	        }
	        this._cleanupTimeout();
	        this._cleanupPingTimer();
	        this._stopDuringStartError = error || new AbortError("The connection was stopped before the hub handshake could complete.");
	        // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
	        // or the onclose callback is invoked. The onclose callback will transition the HubConnection
	        // to the disconnected state if need be before HttpConnection.stop() completes.
	        return this.connection.stop(error);
	    }
	    async _sendCloseMessage() {
	        try {
	            await this._sendWithProtocol(this._createCloseMessage());
	        }
	        catch {
	            // Ignore, this is a best effort attempt to let the server know the client closed gracefully.
	        }
	    }
	    /** Invokes a streaming hub method on the server using the specified name and arguments.
	     *
	     * @typeparam T The type of the items returned by the server.
	     * @param {string} methodName The name of the server method to invoke.
	     * @param {any[]} args The arguments used to invoke the server method.
	     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
	     */
	    stream(methodName, ...args) {
	        const [streams, streamIds] = this._replaceStreamingParams(args);
	        const invocationDescriptor = this._createStreamInvocation(methodName, args, streamIds);
	        // eslint-disable-next-line prefer-const
	        let promiseQueue;
	        const subject = new Subject();
	        subject.cancelCallback = () => {
	            const cancelInvocation = this._createCancelInvocation(invocationDescriptor.invocationId);
	            delete this._callbacks[invocationDescriptor.invocationId];
	            return promiseQueue.then(() => {
	                return this._sendWithProtocol(cancelInvocation);
	            });
	        };
	        this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
	            if (error) {
	                subject.error(error);
	                return;
	            }
	            else if (invocationEvent) {
	                // invocationEvent will not be null when an error is not passed to the callback
	                if (invocationEvent.type === MessageType.Completion) {
	                    if (invocationEvent.error) {
	                        subject.error(new Error(invocationEvent.error));
	                    }
	                    else {
	                        subject.complete();
	                    }
	                }
	                else {
	                    subject.next((invocationEvent.item));
	                }
	            }
	        };
	        promiseQueue = this._sendWithProtocol(invocationDescriptor)
	            .catch((e) => {
	            subject.error(e);
	            delete this._callbacks[invocationDescriptor.invocationId];
	        });
	        this._launchStreams(streams, promiseQueue);
	        return subject;
	    }
	    _sendMessage(message) {
	        this._resetKeepAliveInterval();
	        return this.connection.send(message);
	    }
	    /**
	     * Sends a js object to the server.
	     * @param message The js object to serialize and send.
	     */
	    _sendWithProtocol(message) {
	        if (this._messageBuffer) {
	            return this._messageBuffer._send(message);
	        }
	        else {
	            return this._sendMessage(this._protocol.writeMessage(message));
	        }
	    }
	    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
	     *
	     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
	     * be processing the invocation.
	     *
	     * @param {string} methodName The name of the server method to invoke.
	     * @param {any[]} args The arguments used to invoke the server method.
	     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
	     */
	    send(methodName, ...args) {
	        const [streams, streamIds] = this._replaceStreamingParams(args);
	        const sendPromise = this._sendWithProtocol(this._createInvocation(methodName, args, true, streamIds));
	        this._launchStreams(streams, sendPromise);
	        return sendPromise;
	    }
	    /** Invokes a hub method on the server using the specified name and arguments.
	     *
	     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
	     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
	     * resolving the Promise.
	     *
	     * @typeparam T The expected return type.
	     * @param {string} methodName The name of the server method to invoke.
	     * @param {any[]} args The arguments used to invoke the server method.
	     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
	     */
	    invoke(methodName, ...args) {
	        const [streams, streamIds] = this._replaceStreamingParams(args);
	        const invocationDescriptor = this._createInvocation(methodName, args, false, streamIds);
	        const p = new Promise((resolve, reject) => {
	            // invocationId will always have a value for a non-blocking invocation
	            this._callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
	                if (error) {
	                    reject(error);
	                    return;
	                }
	                else if (invocationEvent) {
	                    // invocationEvent will not be null when an error is not passed to the callback
	                    if (invocationEvent.type === MessageType.Completion) {
	                        if (invocationEvent.error) {
	                            reject(new Error(invocationEvent.error));
	                        }
	                        else {
	                            resolve(invocationEvent.result);
	                        }
	                    }
	                    else {
	                        reject(new Error(`Unexpected message type: ${invocationEvent.type}`));
	                    }
	                }
	            };
	            const promiseQueue = this._sendWithProtocol(invocationDescriptor)
	                .catch((e) => {
	                reject(e);
	                // invocationId will always have a value for a non-blocking invocation
	                delete this._callbacks[invocationDescriptor.invocationId];
	            });
	            this._launchStreams(streams, promiseQueue);
	        });
	        return p;
	    }
	    on(methodName, newMethod) {
	        if (!methodName || !newMethod) {
	            return;
	        }
	        methodName = methodName.toLowerCase();
	        if (!this._methods[methodName]) {
	            this._methods[methodName] = [];
	        }
	        // Preventing adding the same handler multiple times.
	        if (this._methods[methodName].indexOf(newMethod) !== -1) {
	            return;
	        }
	        this._methods[methodName].push(newMethod);
	    }
	    off(methodName, method) {
	        if (!methodName) {
	            return;
	        }
	        methodName = methodName.toLowerCase();
	        const handlers = this._methods[methodName];
	        if (!handlers) {
	            return;
	        }
	        if (method) {
	            const removeIdx = handlers.indexOf(method);
	            if (removeIdx !== -1) {
	                handlers.splice(removeIdx, 1);
	                if (handlers.length === 0) {
	                    delete this._methods[methodName];
	                }
	            }
	        }
	        else {
	            delete this._methods[methodName];
	        }
	    }
	    /** Registers a handler that will be invoked when the connection is closed.
	     *
	     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
	     */
	    onclose(callback) {
	        if (callback) {
	            this._closedCallbacks.push(callback);
	        }
	    }
	    /** Registers a handler that will be invoked when the connection starts reconnecting.
	     *
	     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
	     */
	    onreconnecting(callback) {
	        if (callback) {
	            this._reconnectingCallbacks.push(callback);
	        }
	    }
	    /** Registers a handler that will be invoked when the connection successfully reconnects.
	     *
	     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
	     */
	    onreconnected(callback) {
	        if (callback) {
	            this._reconnectedCallbacks.push(callback);
	        }
	    }
	    _processIncomingData(data) {
	        this._cleanupTimeout();
	        if (!this._receivedHandshakeResponse) {
	            data = this._processHandshakeResponse(data);
	            this._receivedHandshakeResponse = true;
	        }
	        // Data may have all been read when processing handshake response
	        if (data) {
	            // Parse the messages
	            const messages = this._protocol.parseMessages(data, this._logger);
	            for (const message of messages) {
	                if (this._messageBuffer && !this._messageBuffer._shouldProcessMessage(message)) {
	                    // Don't process the message, we are either waiting for a SequenceMessage or received a duplicate message
	                    continue;
	                }
	                switch (message.type) {
	                    case MessageType.Invocation:
	                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
	                        this._invokeClientMethod(message);
	                        break;
	                    case MessageType.StreamItem:
	                    case MessageType.Completion: {
	                        const callback = this._callbacks[message.invocationId];
	                        if (callback) {
	                            if (message.type === MessageType.Completion) {
	                                delete this._callbacks[message.invocationId];
	                            }
	                            try {
	                                callback(message);
	                            }
	                            catch (e) {
	                                this._logger.log(LogLevel.Error, `Stream callback threw error: ${getErrorString(e)}`);
	                            }
	                        }
	                        break;
	                    }
	                    case MessageType.Ping:
	                        // Don't care about pings
	                        break;
	                    case MessageType.Close: {
	                        this._logger.log(LogLevel.Information, "Close message received from server.");
	                        const error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
	                        if (message.allowReconnect === true) {
	                            // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
	                            // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
	                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
	                            this.connection.stop(error);
	                        }
	                        else {
	                            // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
	                            this._stopPromise = this._stopInternal(error);
	                        }
	                        break;
	                    }
	                    case MessageType.Ack:
	                        if (this._messageBuffer) {
	                            this._messageBuffer._ack(message);
	                        }
	                        break;
	                    case MessageType.Sequence:
	                        if (this._messageBuffer) {
	                            this._messageBuffer._resetSequence(message);
	                        }
	                        break;
	                    default:
	                        this._logger.log(LogLevel.Warning, `Invalid message type: ${message.type}.`);
	                        break;
	                }
	            }
	        }
	        this._resetTimeoutPeriod();
	    }
	    _processHandshakeResponse(data) {
	        let responseMessage;
	        let remainingData;
	        try {
	            [remainingData, responseMessage] = this._handshakeProtocol.parseHandshakeResponse(data);
	        }
	        catch (e) {
	            const message = "Error parsing handshake response: " + e;
	            this._logger.log(LogLevel.Error, message);
	            const error = new Error(message);
	            this._handshakeRejecter(error);
	            throw error;
	        }
	        if (responseMessage.error) {
	            const message = "Server returned handshake error: " + responseMessage.error;
	            this._logger.log(LogLevel.Error, message);
	            const error = new Error(message);
	            this._handshakeRejecter(error);
	            throw error;
	        }
	        else {
	            this._logger.log(LogLevel.Debug, "Server handshake complete.");
	        }
	        this._handshakeResolver();
	        return remainingData;
	    }
	    _resetKeepAliveInterval() {
	        if (this.connection.features.inherentKeepAlive) {
	            return;
	        }
	        // Set the time we want the next keep alive to be sent
	        // Timer will be setup on next message receive
	        this._nextKeepAlive = new Date().getTime() + this.keepAliveIntervalInMilliseconds;
	        this._cleanupPingTimer();
	    }
	    _resetTimeoutPeriod() {
	        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
	            // Set the timeout timer
	            this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
	            // Set keepAlive timer if there isn't one
	            if (this._pingServerHandle === undefined) {
	                let nextPing = this._nextKeepAlive - new Date().getTime();
	                if (nextPing < 0) {
	                    nextPing = 0;
	                }
	                // The timer needs to be set from a networking callback to avoid Chrome timer throttling from causing timers to run once a minute
	                this._pingServerHandle = setTimeout(async () => {
	                    if (this._connectionState === HubConnectionState.Connected) {
	                        try {
	                            await this._sendMessage(this._cachedPingMessage);
	                        }
	                        catch {
	                            // We don't care about the error. It should be seen elsewhere in the client.
	                            // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
	                            this._cleanupPingTimer();
	                        }
	                    }
	                }, nextPing);
	            }
	        }
	    }
	    // eslint-disable-next-line @typescript-eslint/naming-convention
	    serverTimeout() {
	        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
	        // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
	        // eslint-disable-next-line @typescript-eslint/no-floating-promises
	        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
	    }
	    async _invokeClientMethod(invocationMessage) {
	        const methodName = invocationMessage.target.toLowerCase();
	        const methods = this._methods[methodName];
	        if (!methods) {
	            this._logger.log(LogLevel.Warning, `No client method with the name '${methodName}' found.`);
	            // No handlers provided by client but the server is expecting a response still, so we send an error
	            if (invocationMessage.invocationId) {
	                this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
	                await this._sendWithProtocol(this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null));
	            }
	            return;
	        }
	        // Avoid issues with handlers removing themselves thus modifying the list while iterating through it
	        const methodsCopy = methods.slice();
	        // Server expects a response
	        const expectsResponse = invocationMessage.invocationId ? true : false;
	        // We preserve the last result or exception but still call all handlers
	        let res;
	        let exception;
	        let completionMessage;
	        for (const m of methodsCopy) {
	            try {
	                const prevRes = res;
	                res = await m.apply(this, invocationMessage.arguments);
	                if (expectsResponse && res && prevRes) {
	                    this._logger.log(LogLevel.Error, `Multiple results provided for '${methodName}'. Sending error to server.`);
	                    completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `Client provided multiple results.`, null);
	                }
	                // Ignore exception if we got a result after, the exception will be logged
	                exception = undefined;
	            }
	            catch (e) {
	                exception = e;
	                this._logger.log(LogLevel.Error, `A callback for the method '${methodName}' threw error '${e}'.`);
	            }
	        }
	        if (completionMessage) {
	            await this._sendWithProtocol(completionMessage);
	        }
	        else if (expectsResponse) {
	            // If there is an exception that means either no result was given or a handler after a result threw
	            if (exception) {
	                completionMessage = this._createCompletionMessage(invocationMessage.invocationId, `${exception}`, null);
	            }
	            else if (res !== undefined) {
	                completionMessage = this._createCompletionMessage(invocationMessage.invocationId, null, res);
	            }
	            else {
	                this._logger.log(LogLevel.Warning, `No result given for '${methodName}' method and invocation ID '${invocationMessage.invocationId}'.`);
	                // Client didn't provide a result or throw from a handler, server expects a response so we send an error
	                completionMessage = this._createCompletionMessage(invocationMessage.invocationId, "Client didn't provide a result.", null);
	            }
	            await this._sendWithProtocol(completionMessage);
	        }
	        else {
	            if (res) {
	                this._logger.log(LogLevel.Error, `Result given for '${methodName}' method but server is not expecting a result.`);
	            }
	        }
	    }
	    _connectionClosed(error) {
	        this._logger.log(LogLevel.Debug, `HubConnection.connectionClosed(${error}) called while in state ${this._connectionState}.`);
	        // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
	        this._stopDuringStartError = this._stopDuringStartError || error || new AbortError("The underlying connection was closed before the hub handshake could complete.");
	        // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
	        // If it has already completed, this should just noop.
	        if (this._handshakeResolver) {
	            this._handshakeResolver();
	        }
	        this._cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
	        this._cleanupTimeout();
	        this._cleanupPingTimer();
	        if (this._connectionState === HubConnectionState.Disconnecting) {
	            this._completeClose(error);
	        }
	        else if (this._connectionState === HubConnectionState.Connected && this._reconnectPolicy) {
	            // eslint-disable-next-line @typescript-eslint/no-floating-promises
	            this._reconnect(error);
	        }
	        else if (this._connectionState === HubConnectionState.Connected) {
	            this._completeClose(error);
	        }
	        // If none of the above if conditions were true were called the HubConnection must be in either:
	        // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
	        // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
	        //    and potentially continue the reconnect() loop.
	        // 3. The Disconnected state in which case we're already done.
	    }
	    _completeClose(error) {
	        if (this._connectionStarted) {
	            this._connectionState = HubConnectionState.Disconnected;
	            this._connectionStarted = false;
	            if (this._messageBuffer) {
	                this._messageBuffer._dispose(error !== null && error !== void 0 ? error : new Error("Connection closed."));
	                this._messageBuffer = undefined;
	            }
	            if (Platform.isBrowser) {
	                window.document.removeEventListener("freeze", this._freezeEventListener);
	            }
	            try {
	                this._closedCallbacks.forEach((c) => c.apply(this, [error]));
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Error, `An onclose callback called with error '${error}' threw error '${e}'.`);
	            }
	        }
	    }
	    async _reconnect(error) {
	        const reconnectStartTime = Date.now();
	        let previousReconnectAttempts = 0;
	        let retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
	        let nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
	        if (nextRetryDelay === null) {
	            this._logger.log(LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
	            this._completeClose(error);
	            return;
	        }
	        this._connectionState = HubConnectionState.Reconnecting;
	        if (error) {
	            this._logger.log(LogLevel.Information, `Connection reconnecting because of error '${error}'.`);
	        }
	        else {
	            this._logger.log(LogLevel.Information, "Connection reconnecting.");
	        }
	        if (this._reconnectingCallbacks.length !== 0) {
	            try {
	                this._reconnectingCallbacks.forEach((c) => c.apply(this, [error]));
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Error, `An onreconnecting callback called with error '${error}' threw error '${e}'.`);
	            }
	            // Exit early if an onreconnecting callback called connection.stop().
	            if (this._connectionState !== HubConnectionState.Reconnecting) {
	                this._logger.log(LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
	                return;
	            }
	        }
	        while (nextRetryDelay !== null) {
	            this._logger.log(LogLevel.Information, `Reconnect attempt number ${previousReconnectAttempts} will start in ${nextRetryDelay} ms.`);
	            await new Promise((resolve) => {
	                this._reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
	            });
	            this._reconnectDelayHandle = undefined;
	            if (this._connectionState !== HubConnectionState.Reconnecting) {
	                this._logger.log(LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
	                return;
	            }
	            try {
	                await this._startInternal();
	                this._connectionState = HubConnectionState.Connected;
	                this._logger.log(LogLevel.Information, "HubConnection reconnected successfully.");
	                if (this._reconnectedCallbacks.length !== 0) {
	                    try {
	                        this._reconnectedCallbacks.forEach((c) => c.apply(this, [this.connection.connectionId]));
	                    }
	                    catch (e) {
	                        this._logger.log(LogLevel.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${e}'.`);
	                    }
	                }
	                return;
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Information, `Reconnect attempt failed because of error '${e}'.`);
	                if (this._connectionState !== HubConnectionState.Reconnecting) {
	                    this._logger.log(LogLevel.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`);
	                    // The TypeScript compiler thinks that connectionState must be Connected here. The TypeScript compiler is wrong.
	                    if (this._connectionState === HubConnectionState.Disconnecting) {
	                        this._completeClose();
	                    }
	                    return;
	                }
	                retryError = e instanceof Error ? e : new Error(e.toString());
	                nextRetryDelay = this._getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
	            }
	        }
	        this._logger.log(LogLevel.Information, `Reconnect retries have been exhausted after ${Date.now() - reconnectStartTime} ms and ${previousReconnectAttempts} failed attempts. Connection disconnecting.`);
	        this._completeClose();
	    }
	    _getNextRetryDelay(previousRetryCount, elapsedMilliseconds, retryReason) {
	        try {
	            return this._reconnectPolicy.nextRetryDelayInMilliseconds({
	                elapsedMilliseconds,
	                previousRetryCount,
	                retryReason,
	            });
	        }
	        catch (e) {
	            this._logger.log(LogLevel.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${previousRetryCount}, ${elapsedMilliseconds}) threw error '${e}'.`);
	            return null;
	        }
	    }
	    _cancelCallbacksWithError(error) {
	        const callbacks = this._callbacks;
	        this._callbacks = {};
	        Object.keys(callbacks)
	            .forEach((key) => {
	            const callback = callbacks[key];
	            try {
	                callback(null, error);
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Error, `Stream 'error' callback called with '${error}' threw error: ${getErrorString(e)}`);
	            }
	        });
	    }
	    _cleanupPingTimer() {
	        if (this._pingServerHandle) {
	            clearTimeout(this._pingServerHandle);
	            this._pingServerHandle = undefined;
	        }
	    }
	    _cleanupTimeout() {
	        if (this._timeoutHandle) {
	            clearTimeout(this._timeoutHandle);
	        }
	    }
	    _createInvocation(methodName, args, nonblocking, streamIds) {
	        if (nonblocking) {
	            if (streamIds.length !== 0) {
	                return {
	                    arguments: args,
	                    streamIds,
	                    target: methodName,
	                    type: MessageType.Invocation,
	                };
	            }
	            else {
	                return {
	                    arguments: args,
	                    target: methodName,
	                    type: MessageType.Invocation,
	                };
	            }
	        }
	        else {
	            const invocationId = this._invocationId;
	            this._invocationId++;
	            if (streamIds.length !== 0) {
	                return {
	                    arguments: args,
	                    invocationId: invocationId.toString(),
	                    streamIds,
	                    target: methodName,
	                    type: MessageType.Invocation,
	                };
	            }
	            else {
	                return {
	                    arguments: args,
	                    invocationId: invocationId.toString(),
	                    target: methodName,
	                    type: MessageType.Invocation,
	                };
	            }
	        }
	    }
	    _launchStreams(streams, promiseQueue) {
	        if (streams.length === 0) {
	            return;
	        }
	        // Synchronize stream data so they arrive in-order on the server
	        if (!promiseQueue) {
	            promiseQueue = Promise.resolve();
	        }
	        // We want to iterate over the keys, since the keys are the stream ids
	        // eslint-disable-next-line guard-for-in
	        for (const streamId in streams) {
	            streams[streamId].subscribe({
	                complete: () => {
	                    promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId)));
	                },
	                error: (err) => {
	                    let message;
	                    if (err instanceof Error) {
	                        message = err.message;
	                    }
	                    else if (err && err.toString) {
	                        message = err.toString();
	                    }
	                    else {
	                        message = "Unknown error";
	                    }
	                    promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createCompletionMessage(streamId, message)));
	                },
	                next: (item) => {
	                    promiseQueue = promiseQueue.then(() => this._sendWithProtocol(this._createStreamItemMessage(streamId, item)));
	                },
	            });
	        }
	    }
	    _replaceStreamingParams(args) {
	        const streams = [];
	        const streamIds = [];
	        for (let i = 0; i < args.length; i++) {
	            const argument = args[i];
	            if (this._isObservable(argument)) {
	                const streamId = this._invocationId;
	                this._invocationId++;
	                // Store the stream for later use
	                streams[streamId] = argument;
	                streamIds.push(streamId.toString());
	                // remove stream from args
	                args.splice(i, 1);
	            }
	        }
	        return [streams, streamIds];
	    }
	    _isObservable(arg) {
	        // This allows other stream implementations to just work (like rxjs)
	        return arg && arg.subscribe && typeof arg.subscribe === "function";
	    }
	    _createStreamInvocation(methodName, args, streamIds) {
	        const invocationId = this._invocationId;
	        this._invocationId++;
	        if (streamIds.length !== 0) {
	            return {
	                arguments: args,
	                invocationId: invocationId.toString(),
	                streamIds,
	                target: methodName,
	                type: MessageType.StreamInvocation,
	            };
	        }
	        else {
	            return {
	                arguments: args,
	                invocationId: invocationId.toString(),
	                target: methodName,
	                type: MessageType.StreamInvocation,
	            };
	        }
	    }
	    _createCancelInvocation(id) {
	        return {
	            invocationId: id,
	            type: MessageType.CancelInvocation,
	        };
	    }
	    _createStreamItemMessage(id, item) {
	        return {
	            invocationId: id,
	            item,
	            type: MessageType.StreamItem,
	        };
	    }
	    _createCompletionMessage(id, error, result) {
	        if (error) {
	            return {
	                error,
	                invocationId: id,
	                type: MessageType.Completion,
	            };
	        }
	        return {
	            invocationId: id,
	            result,
	            type: MessageType.Completion,
	        };
	    }
	    _createCloseMessage() {
	        return { type: MessageType.Close };
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// 0, 2, 10, 30 second delays before reconnect attempts.
	const DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
	/** @private */
	class DefaultReconnectPolicy {
	    constructor(retryDelays) {
	        this._retryDelays = retryDelays !== undefined ? [...retryDelays, null] : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
	    }
	    nextRetryDelayInMilliseconds(retryContext) {
	        return this._retryDelays[retryContext.previousRetryCount];
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	class HeaderNames {
	}
	HeaderNames.Authorization = "Authorization";
	HeaderNames.Cookie = "Cookie";

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	class AccessTokenHttpClient extends HttpClient {
	    constructor(innerClient, accessTokenFactory) {
	        super();
	        this._innerClient = innerClient;
	        this._accessTokenFactory = accessTokenFactory;
	    }
	    async send(request) {
	        let allowRetry = true;
	        if (this._accessTokenFactory && (!this._accessToken || (request.url && request.url.indexOf("/negotiate?") > 0))) {
	            // don't retry if the request is a negotiate or if we just got a potentially new token from the access token factory
	            allowRetry = false;
	            this._accessToken = await this._accessTokenFactory();
	        }
	        this._setAuthorizationHeader(request);
	        const response = await this._innerClient.send(request);
	        if (allowRetry && response.statusCode === 401 && this._accessTokenFactory) {
	            this._accessToken = await this._accessTokenFactory();
	            this._setAuthorizationHeader(request);
	            return await this._innerClient.send(request);
	        }
	        return response;
	    }
	    _setAuthorizationHeader(request) {
	        if (!request.headers) {
	            request.headers = {};
	        }
	        if (this._accessToken) {
	            request.headers[HeaderNames.Authorization] = `Bearer ${this._accessToken}`;
	        }
	        // don't remove the header if there isn't an access token factory, the user manually added the header in this case
	        else if (this._accessTokenFactory) {
	            if (request.headers[HeaderNames.Authorization]) {
	                delete request.headers[HeaderNames.Authorization];
	            }
	        }
	    }
	    getCookieString(url) {
	        return this._innerClient.getCookieString(url);
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
	/** Specifies a specific HTTP transport type. */
	var HttpTransportType;
	(function (HttpTransportType) {
	    /** Specifies no transport preference. */
	    HttpTransportType[HttpTransportType["None"] = 0] = "None";
	    /** Specifies the WebSockets transport. */
	    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
	    /** Specifies the Server-Sent Events transport. */
	    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
	    /** Specifies the Long Polling transport. */
	    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
	})(HttpTransportType || (HttpTransportType = {}));
	/** Specifies the transfer format for a connection. */
	var TransferFormat;
	(function (TransferFormat) {
	    /** Specifies that only text data will be transmitted over the connection. */
	    TransferFormat[TransferFormat["Text"] = 1] = "Text";
	    /** Specifies that binary data will be transmitted over the connection. */
	    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
	})(TransferFormat || (TransferFormat = {}));

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
	// We don't actually ever use the API being polyfilled, we always use the polyfill because
	// it's a very new API right now.
	// Not exported from index.
	/** @private */
	let AbortController$1 = class AbortController {
	    constructor() {
	        this._isAborted = false;
	        this.onabort = null;
	    }
	    abort() {
	        if (!this._isAborted) {
	            this._isAborted = true;
	            if (this.onabort) {
	                this.onabort();
	            }
	        }
	    }
	    get signal() {
	        return this;
	    }
	    get aborted() {
	        return this._isAborted;
	    }
	};

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	// Not exported from 'index', this type is internal.
	/** @private */
	class LongPollingTransport {
	    // This is an internal type, not exported from 'index' so this is really just internal.
	    get pollAborted() {
	        return this._pollAbort.aborted;
	    }
	    constructor(httpClient, logger, options) {
	        this._httpClient = httpClient;
	        this._logger = logger;
	        this._pollAbort = new AbortController$1();
	        this._options = options;
	        this._running = false;
	        this.onreceive = null;
	        this.onclose = null;
	    }
	    async connect(url, transferFormat) {
	        Arg.isRequired(url, "url");
	        Arg.isRequired(transferFormat, "transferFormat");
	        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
	        this._url = url;
	        this._logger.log(LogLevel.Trace, "(LongPolling transport) Connecting.");
	        // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
	        if (transferFormat === TransferFormat.Binary &&
	            (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
	            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
	        }
	        const [name, value] = getUserAgentHeader();
	        const headers = { [name]: value, ...this._options.headers };
	        const pollOptions = {
	            abortSignal: this._pollAbort.signal,
	            headers,
	            timeout: 100000,
	            withCredentials: this._options.withCredentials,
	        };
	        if (transferFormat === TransferFormat.Binary) {
	            pollOptions.responseType = "arraybuffer";
	        }
	        // Make initial long polling request
	        // Server uses first long polling request to finish initializing connection and it returns without data
	        const pollUrl = `${url}&_=${Date.now()}`;
	        this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
	        const response = await this._httpClient.get(pollUrl, pollOptions);
	        if (response.statusCode !== 200) {
	            this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
	            // Mark running as false so that the poll immediately ends and runs the close logic
	            this._closeError = new HttpError(response.statusText || "", response.statusCode);
	            this._running = false;
	        }
	        else {
	            this._running = true;
	        }
	        this._receiving = this._poll(this._url, pollOptions);
	    }
	    async _poll(url, pollOptions) {
	        try {
	            while (this._running) {
	                try {
	                    const pollUrl = `${url}&_=${Date.now()}`;
	                    this._logger.log(LogLevel.Trace, `(LongPolling transport) polling: ${pollUrl}.`);
	                    const response = await this._httpClient.get(pollUrl, pollOptions);
	                    if (response.statusCode === 204) {
	                        this._logger.log(LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
	                        this._running = false;
	                    }
	                    else if (response.statusCode !== 200) {
	                        this._logger.log(LogLevel.Error, `(LongPolling transport) Unexpected response code: ${response.statusCode}.`);
	                        // Unexpected status code
	                        this._closeError = new HttpError(response.statusText || "", response.statusCode);
	                        this._running = false;
	                    }
	                    else {
	                        // Process the response
	                        if (response.content) {
	                            this._logger.log(LogLevel.Trace, `(LongPolling transport) data received. ${getDataDetail(response.content, this._options.logMessageContent)}.`);
	                            if (this.onreceive) {
	                                this.onreceive(response.content);
	                            }
	                        }
	                        else {
	                            // This is another way timeout manifest.
	                            this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
	                        }
	                    }
	                }
	                catch (e) {
	                    if (!this._running) {
	                        // Log but disregard errors that occur after stopping
	                        this._logger.log(LogLevel.Trace, `(LongPolling transport) Poll errored after shutdown: ${e.message}`);
	                    }
	                    else {
	                        if (e instanceof TimeoutError) {
	                            // Ignore timeouts and reissue the poll.
	                            this._logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
	                        }
	                        else {
	                            // Close the connection with the error as the result.
	                            this._closeError = e;
	                            this._running = false;
	                        }
	                    }
	                }
	            }
	        }
	        finally {
	            this._logger.log(LogLevel.Trace, "(LongPolling transport) Polling complete.");
	            // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
	            // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
	            if (!this.pollAborted) {
	                this._raiseOnClose();
	            }
	        }
	    }
	    async send(data) {
	        if (!this._running) {
	            return Promise.reject(new Error("Cannot send until the transport is connected"));
	        }
	        return sendMessage(this._logger, "LongPolling", this._httpClient, this._url, data, this._options);
	    }
	    async stop() {
	        this._logger.log(LogLevel.Trace, "(LongPolling transport) Stopping polling.");
	        // Tell receiving loop to stop, abort any current request, and then wait for it to finish
	        this._running = false;
	        this._pollAbort.abort();
	        try {
	            await this._receiving;
	            // Send DELETE to clean up long polling on the server
	            this._logger.log(LogLevel.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
	            const headers = {};
	            const [name, value] = getUserAgentHeader();
	            headers[name] = value;
	            const deleteOptions = {
	                headers: { ...headers, ...this._options.headers },
	                timeout: this._options.timeout,
	                withCredentials: this._options.withCredentials,
	            };
	            let error;
	            try {
	                await this._httpClient.delete(this._url, deleteOptions);
	            }
	            catch (err) {
	                error = err;
	            }
	            if (error) {
	                if (error instanceof HttpError) {
	                    if (error.statusCode === 404) {
	                        this._logger.log(LogLevel.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.");
	                    }
	                    else {
	                        this._logger.log(LogLevel.Trace, `(LongPolling transport) Error sending a DELETE request: ${error}`);
	                    }
	                }
	            }
	            else {
	                this._logger.log(LogLevel.Trace, "(LongPolling transport) DELETE request accepted.");
	            }
	        }
	        finally {
	            this._logger.log(LogLevel.Trace, "(LongPolling transport) Stop finished.");
	            // Raise close event here instead of in polling
	            // It needs to happen after the DELETE request is sent
	            this._raiseOnClose();
	        }
	    }
	    _raiseOnClose() {
	        if (this.onclose) {
	            let logMessage = "(LongPolling transport) Firing onclose event.";
	            if (this._closeError) {
	                logMessage += " Error: " + this._closeError;
	            }
	            this._logger.log(LogLevel.Trace, logMessage);
	            this.onclose(this._closeError);
	        }
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	class ServerSentEventsTransport {
	    constructor(httpClient, accessToken, logger, options) {
	        this._httpClient = httpClient;
	        this._accessToken = accessToken;
	        this._logger = logger;
	        this._options = options;
	        this.onreceive = null;
	        this.onclose = null;
	    }
	    async connect(url, transferFormat) {
	        Arg.isRequired(url, "url");
	        Arg.isRequired(transferFormat, "transferFormat");
	        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
	        this._logger.log(LogLevel.Trace, "(SSE transport) Connecting.");
	        // set url before accessTokenFactory because this._url is only for send and we set the auth header instead of the query string for send
	        this._url = url;
	        if (this._accessToken) {
	            url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`;
	        }
	        return new Promise((resolve, reject) => {
	            let opened = false;
	            if (transferFormat !== TransferFormat.Text) {
	                reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
	                return;
	            }
	            let eventSource;
	            if (Platform.isBrowser || Platform.isWebWorker) {
	                eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials });
	            }
	            else {
	                // Non-browser passes cookies via the dictionary
	                const cookies = this._httpClient.getCookieString(url);
	                const headers = {};
	                headers.Cookie = cookies;
	                const [name, value] = getUserAgentHeader();
	                headers[name] = value;
	                eventSource = new this._options.EventSource(url, { withCredentials: this._options.withCredentials, headers: { ...headers, ...this._options.headers } });
	            }
	            try {
	                eventSource.onmessage = (e) => {
	                    if (this.onreceive) {
	                        try {
	                            this._logger.log(LogLevel.Trace, `(SSE transport) data received. ${getDataDetail(e.data, this._options.logMessageContent)}.`);
	                            this.onreceive(e.data);
	                        }
	                        catch (error) {
	                            this._close(error);
	                            return;
	                        }
	                    }
	                };
	                // @ts-ignore: not using event on purpose
	                eventSource.onerror = (e) => {
	                    // EventSource doesn't give any useful information about server side closes.
	                    if (opened) {
	                        this._close();
	                    }
	                    else {
	                        reject(new Error("EventSource failed to connect. The connection could not be found on the server,"
	                            + " either the connection ID is not present on the server, or a proxy is refusing/buffering the connection."
	                            + " If you have multiple servers check that sticky sessions are enabled."));
	                    }
	                };
	                eventSource.onopen = () => {
	                    this._logger.log(LogLevel.Information, `SSE connected to ${this._url}`);
	                    this._eventSource = eventSource;
	                    opened = true;
	                    resolve();
	                };
	            }
	            catch (e) {
	                reject(e);
	                return;
	            }
	        });
	    }
	    async send(data) {
	        if (!this._eventSource) {
	            return Promise.reject(new Error("Cannot send until the transport is connected"));
	        }
	        return sendMessage(this._logger, "SSE", this._httpClient, this._url, data, this._options);
	    }
	    stop() {
	        this._close();
	        return Promise.resolve();
	    }
	    _close(e) {
	        if (this._eventSource) {
	            this._eventSource.close();
	            this._eventSource = undefined;
	            if (this.onclose) {
	                this.onclose(e);
	            }
	        }
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	/** @private */
	class WebSocketTransport {
	    constructor(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
	        this._logger = logger;
	        this._accessTokenFactory = accessTokenFactory;
	        this._logMessageContent = logMessageContent;
	        this._webSocketConstructor = webSocketConstructor;
	        this._httpClient = httpClient;
	        this.onreceive = null;
	        this.onclose = null;
	        this._headers = headers;
	    }
	    async connect(url, transferFormat) {
	        Arg.isRequired(url, "url");
	        Arg.isRequired(transferFormat, "transferFormat");
	        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
	        this._logger.log(LogLevel.Trace, "(WebSockets transport) Connecting.");
	        let token;
	        if (this._accessTokenFactory) {
	            token = await this._accessTokenFactory();
	        }
	        return new Promise((resolve, reject) => {
	            url = url.replace(/^http/, "ws");
	            let webSocket;
	            const cookies = this._httpClient.getCookieString(url);
	            let opened = false;
	            if (Platform.isNode || Platform.isReactNative) {
	                const headers = {};
	                const [name, value] = getUserAgentHeader();
	                headers[name] = value;
	                if (token) {
	                    headers[HeaderNames.Authorization] = `Bearer ${token}`;
	                }
	                if (cookies) {
	                    headers[HeaderNames.Cookie] = cookies;
	                }
	                // Only pass headers when in non-browser environments
	                webSocket = new this._webSocketConstructor(url, undefined, {
	                    headers: { ...headers, ...this._headers },
	                });
	            }
	            else {
	                if (token) {
	                    url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
	                }
	            }
	            if (!webSocket) {
	                // Chrome is not happy with passing 'undefined' as protocol
	                webSocket = new this._webSocketConstructor(url);
	            }
	            if (transferFormat === TransferFormat.Binary) {
	                webSocket.binaryType = "arraybuffer";
	            }
	            webSocket.onopen = (_event) => {
	                this._logger.log(LogLevel.Information, `WebSocket connected to ${url}.`);
	                this._webSocket = webSocket;
	                opened = true;
	                resolve();
	            };
	            webSocket.onerror = (event) => {
	                let error = null;
	                // ErrorEvent is a browser only type we need to check if the type exists before using it
	                if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
	                    error = event.error;
	                }
	                else {
	                    error = "There was an error with the transport";
	                }
	                this._logger.log(LogLevel.Information, `(WebSockets transport) ${error}.`);
	            };
	            webSocket.onmessage = (message) => {
	                this._logger.log(LogLevel.Trace, `(WebSockets transport) data received. ${getDataDetail(message.data, this._logMessageContent)}.`);
	                if (this.onreceive) {
	                    try {
	                        this.onreceive(message.data);
	                    }
	                    catch (error) {
	                        this._close(error);
	                        return;
	                    }
	                }
	            };
	            webSocket.onclose = (event) => {
	                // Don't call close handler if connection was never established
	                // We'll reject the connect call instead
	                if (opened) {
	                    this._close(event);
	                }
	                else {
	                    let error = null;
	                    // ErrorEvent is a browser only type we need to check if the type exists before using it
	                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
	                        error = event.error;
	                    }
	                    else {
	                        error = "WebSocket failed to connect. The connection could not be found on the server,"
	                            + " either the endpoint may not be a SignalR endpoint,"
	                            + " the connection ID is not present on the server, or there is a proxy blocking WebSockets."
	                            + " If you have multiple servers check that sticky sessions are enabled.";
	                    }
	                    reject(new Error(error));
	                }
	            };
	        });
	    }
	    send(data) {
	        if (this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN) {
	            this._logger.log(LogLevel.Trace, `(WebSockets transport) sending data. ${getDataDetail(data, this._logMessageContent)}.`);
	            this._webSocket.send(data);
	            return Promise.resolve();
	        }
	        return Promise.reject("WebSocket is not in the OPEN state");
	    }
	    stop() {
	        if (this._webSocket) {
	            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
	            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
	            this._close(undefined);
	        }
	        return Promise.resolve();
	    }
	    _close(event) {
	        // webSocket will be null if the transport did not start successfully
	        if (this._webSocket) {
	            // Clear websocket handlers because we are considering the socket closed now
	            this._webSocket.onclose = () => { };
	            this._webSocket.onmessage = () => { };
	            this._webSocket.onerror = () => { };
	            this._webSocket.close();
	            this._webSocket = undefined;
	        }
	        this._logger.log(LogLevel.Trace, "(WebSockets transport) socket closed.");
	        if (this.onclose) {
	            if (this._isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
	                this.onclose(new Error(`WebSocket closed with status code: ${event.code} (${event.reason || "no reason given"}).`));
	            }
	            else if (event instanceof Error) {
	                this.onclose(event);
	            }
	            else {
	                this.onclose();
	            }
	        }
	    }
	    _isCloseEvent(event) {
	        return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	const MAX_REDIRECTS = 100;
	/** @private */
	class HttpConnection {
	    constructor(url, options = {}) {
	        this._stopPromiseResolver = () => { };
	        this.features = {};
	        this._negotiateVersion = 1;
	        Arg.isRequired(url, "url");
	        this._logger = createLogger(options.logger);
	        this.baseUrl = this._resolveUrl(url);
	        options = options || {};
	        options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
	        if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
	            options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
	        }
	        else {
	            throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
	        }
	        options.timeout = options.timeout === undefined ? 100 * 1000 : options.timeout;
	        let webSocketModule = null;
	        let eventSourceModule = null;
	        if (Platform.isNode && typeof require !== "undefined") {
	            webSocketModule = getWS();
	            eventSourceModule = getEventSource();
	        }
	        if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
	            options.WebSocket = WebSocket;
	        }
	        else if (Platform.isNode && !options.WebSocket) {
	            if (webSocketModule) {
	                options.WebSocket = webSocketModule;
	            }
	        }
	        if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
	            options.EventSource = EventSource;
	        }
	        else if (Platform.isNode && !options.EventSource) {
	            if (typeof eventSourceModule !== "undefined") {
	                options.EventSource = eventSourceModule;
	            }
	        }
	        this._httpClient = new AccessTokenHttpClient(options.httpClient || new DefaultHttpClient(this._logger), options.accessTokenFactory);
	        this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
	        this._connectionStarted = false;
	        this._options = options;
	        this.onreceive = null;
	        this.onclose = null;
	    }
	    async start(transferFormat) {
	        transferFormat = transferFormat || TransferFormat.Binary;
	        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
	        this._logger.log(LogLevel.Debug, `Starting connection with transfer format '${TransferFormat[transferFormat]}'.`);
	        if (this._connectionState !== "Disconnected" /* ConnectionState.Disconnected */) {
	            return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
	        }
	        this._connectionState = "Connecting" /* ConnectionState.Connecting */;
	        this._startInternalPromise = this._startInternal(transferFormat);
	        await this._startInternalPromise;
	        // The TypeScript compiler thinks that connectionState must be Connecting here. The TypeScript compiler is wrong.
	        if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
	            // stop() was called and transitioned the client into the Disconnecting state.
	            const message = "Failed to start the HttpConnection before stop() was called.";
	            this._logger.log(LogLevel.Error, message);
	            // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
	            await this._stopPromise;
	            return Promise.reject(new AbortError(message));
	        }
	        else if (this._connectionState !== "Connected" /* ConnectionState.Connected */) {
	            // stop() was called and transitioned the client into the Disconnecting state.
	            const message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
	            this._logger.log(LogLevel.Error, message);
	            return Promise.reject(new AbortError(message));
	        }
	        this._connectionStarted = true;
	    }
	    send(data) {
	        if (this._connectionState !== "Connected" /* ConnectionState.Connected */) {
	            return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
	        }
	        if (!this._sendQueue) {
	            this._sendQueue = new TransportSendQueue(this.transport);
	        }
	        // Transport will not be null if state is connected
	        return this._sendQueue.send(data);
	    }
	    async stop(error) {
	        if (this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
	            this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnected state.`);
	            return Promise.resolve();
	        }
	        if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
	            this._logger.log(LogLevel.Debug, `Call to HttpConnection.stop(${error}) ignored because the connection is already in the disconnecting state.`);
	            return this._stopPromise;
	        }
	        this._connectionState = "Disconnecting" /* ConnectionState.Disconnecting */;
	        this._stopPromise = new Promise((resolve) => {
	            // Don't complete stop() until stopConnection() completes.
	            this._stopPromiseResolver = resolve;
	        });
	        // stopInternal should never throw so just observe it.
	        await this._stopInternal(error);
	        await this._stopPromise;
	    }
	    async _stopInternal(error) {
	        // Set error as soon as possible otherwise there is a race between
	        // the transport closing and providing an error and the error from a close message
	        // We would prefer the close message error.
	        this._stopError = error;
	        try {
	            await this._startInternalPromise;
	        }
	        catch (e) {
	            // This exception is returned to the user as a rejected Promise from the start method.
	        }
	        // The transport's onclose will trigger stopConnection which will run our onclose event.
	        // The transport should always be set if currently connected. If it wasn't set, it's likely because
	        // stop was called during start() and start() failed.
	        if (this.transport) {
	            try {
	                await this.transport.stop();
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Error, `HttpConnection.transport.stop() threw error '${e}'.`);
	                this._stopConnection();
	            }
	            this.transport = undefined;
	        }
	        else {
	            this._logger.log(LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
	        }
	    }
	    async _startInternal(transferFormat) {
	        // Store the original base url and the access token factory since they may change
	        // as part of negotiating
	        let url = this.baseUrl;
	        this._accessTokenFactory = this._options.accessTokenFactory;
	        this._httpClient._accessTokenFactory = this._accessTokenFactory;
	        try {
	            if (this._options.skipNegotiation) {
	                if (this._options.transport === HttpTransportType.WebSockets) {
	                    // No need to add a connection ID in this case
	                    this.transport = this._constructTransport(HttpTransportType.WebSockets);
	                    // We should just call connect directly in this case.
	                    // No fallback or negotiate in this case.
	                    await this._startTransport(url, transferFormat);
	                }
	                else {
	                    throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
	                }
	            }
	            else {
	                let negotiateResponse = null;
	                let redirects = 0;
	                do {
	                    negotiateResponse = await this._getNegotiationResponse(url);
	                    // the user tries to stop the connection when it is being started
	                    if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */ || this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
	                        throw new AbortError("The connection was stopped during negotiation.");
	                    }
	                    if (negotiateResponse.error) {
	                        throw new Error(negotiateResponse.error);
	                    }
	                    if (negotiateResponse.ProtocolVersion) {
	                        throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
	                    }
	                    if (negotiateResponse.url) {
	                        url = negotiateResponse.url;
	                    }
	                    if (negotiateResponse.accessToken) {
	                        // Replace the current access token factory with one that uses
	                        // the returned access token
	                        const accessToken = negotiateResponse.accessToken;
	                        this._accessTokenFactory = () => accessToken;
	                        // set the factory to undefined so the AccessTokenHttpClient won't retry with the same token, since we know it won't change until a connection restart
	                        this._httpClient._accessToken = accessToken;
	                        this._httpClient._accessTokenFactory = undefined;
	                    }
	                    redirects++;
	                } while (negotiateResponse.url && redirects < MAX_REDIRECTS);
	                if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
	                    throw new Error("Negotiate redirection limit exceeded.");
	                }
	                await this._createTransport(url, this._options.transport, negotiateResponse, transferFormat);
	            }
	            if (this.transport instanceof LongPollingTransport) {
	                this.features.inherentKeepAlive = true;
	            }
	            if (this._connectionState === "Connecting" /* ConnectionState.Connecting */) {
	                // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
	                // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
	                this._logger.log(LogLevel.Debug, "The HttpConnection connected successfully.");
	                this._connectionState = "Connected" /* ConnectionState.Connected */;
	            }
	            // stop() is waiting on us via this.startInternalPromise so keep this.transport around so it can clean up.
	            // This is the only case startInternal can exit in neither the connected nor disconnected state because stopConnection()
	            // will transition to the disconnected state. start() will wait for the transition using the stopPromise.
	        }
	        catch (e) {
	            this._logger.log(LogLevel.Error, "Failed to start the connection: " + e);
	            this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
	            this.transport = undefined;
	            // if start fails, any active calls to stop assume that start will complete the stop promise
	            this._stopPromiseResolver();
	            return Promise.reject(e);
	        }
	    }
	    async _getNegotiationResponse(url) {
	        const headers = {};
	        const [name, value] = getUserAgentHeader();
	        headers[name] = value;
	        const negotiateUrl = this._resolveNegotiateUrl(url);
	        this._logger.log(LogLevel.Debug, `Sending negotiation request: ${negotiateUrl}.`);
	        try {
	            const response = await this._httpClient.post(negotiateUrl, {
	                content: "",
	                headers: { ...headers, ...this._options.headers },
	                timeout: this._options.timeout,
	                withCredentials: this._options.withCredentials,
	            });
	            if (response.statusCode !== 200) {
	                return Promise.reject(new Error(`Unexpected status code returned from negotiate '${response.statusCode}'`));
	            }
	            const negotiateResponse = JSON.parse(response.content);
	            if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
	                // Negotiate version 0 doesn't use connectionToken
	                // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
	                negotiateResponse.connectionToken = negotiateResponse.connectionId;
	            }
	            if (negotiateResponse.useStatefulReconnect && this._options._useStatefulReconnect !== true) {
	                return Promise.reject(new FailedToNegotiateWithServerError("Client didn't negotiate Stateful Reconnect but the server did."));
	            }
	            return negotiateResponse;
	        }
	        catch (e) {
	            let errorMessage = "Failed to complete negotiation with the server: " + e;
	            if (e instanceof HttpError) {
	                if (e.statusCode === 404) {
	                    errorMessage = errorMessage + " Either this is not a SignalR endpoint or there is a proxy blocking the connection.";
	                }
	            }
	            this._logger.log(LogLevel.Error, errorMessage);
	            return Promise.reject(new FailedToNegotiateWithServerError(errorMessage));
	        }
	    }
	    _createConnectUrl(url, connectionToken) {
	        if (!connectionToken) {
	            return url;
	        }
	        return url + (url.indexOf("?") === -1 ? "?" : "&") + `id=${connectionToken}`;
	    }
	    async _createTransport(url, requestedTransport, negotiateResponse, requestedTransferFormat) {
	        let connectUrl = this._createConnectUrl(url, negotiateResponse.connectionToken);
	        if (this._isITransport(requestedTransport)) {
	            this._logger.log(LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
	            this.transport = requestedTransport;
	            await this._startTransport(connectUrl, requestedTransferFormat);
	            this.connectionId = negotiateResponse.connectionId;
	            return;
	        }
	        const transportExceptions = [];
	        const transports = negotiateResponse.availableTransports || [];
	        let negotiate = negotiateResponse;
	        for (const endpoint of transports) {
	            const transportOrError = this._resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, (negotiate === null || negotiate === void 0 ? void 0 : negotiate.useStatefulReconnect) === true);
	            if (transportOrError instanceof Error) {
	                // Store the error and continue, we don't want to cause a re-negotiate in these cases
	                transportExceptions.push(`${endpoint.transport} failed:`);
	                transportExceptions.push(transportOrError);
	            }
	            else if (this._isITransport(transportOrError)) {
	                this.transport = transportOrError;
	                if (!negotiate) {
	                    try {
	                        negotiate = await this._getNegotiationResponse(url);
	                    }
	                    catch (ex) {
	                        return Promise.reject(ex);
	                    }
	                    connectUrl = this._createConnectUrl(url, negotiate.connectionToken);
	                }
	                try {
	                    await this._startTransport(connectUrl, requestedTransferFormat);
	                    this.connectionId = negotiate.connectionId;
	                    return;
	                }
	                catch (ex) {
	                    this._logger.log(LogLevel.Error, `Failed to start the transport '${endpoint.transport}': ${ex}`);
	                    negotiate = undefined;
	                    transportExceptions.push(new FailedToStartTransportError(`${endpoint.transport} failed: ${ex}`, HttpTransportType[endpoint.transport]));
	                    if (this._connectionState !== "Connecting" /* ConnectionState.Connecting */) {
	                        const message = "Failed to select transport before stop() was called.";
	                        this._logger.log(LogLevel.Debug, message);
	                        return Promise.reject(new AbortError(message));
	                    }
	                }
	            }
	        }
	        if (transportExceptions.length > 0) {
	            return Promise.reject(new AggregateErrors(`Unable to connect to the server with any of the available transports. ${transportExceptions.join(" ")}`, transportExceptions));
	        }
	        return Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
	    }
	    _constructTransport(transport) {
	        switch (transport) {
	            case HttpTransportType.WebSockets:
	                if (!this._options.WebSocket) {
	                    throw new Error("'WebSocket' is not supported in your environment.");
	                }
	                return new WebSocketTransport(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
	            case HttpTransportType.ServerSentEvents:
	                if (!this._options.EventSource) {
	                    throw new Error("'EventSource' is not supported in your environment.");
	                }
	                return new ServerSentEventsTransport(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
	            case HttpTransportType.LongPolling:
	                return new LongPollingTransport(this._httpClient, this._logger, this._options);
	            default:
	                throw new Error(`Unknown transport: ${transport}.`);
	        }
	    }
	    _startTransport(url, transferFormat) {
	        this.transport.onreceive = this.onreceive;
	        if (this.features.reconnect) {
	            this.transport.onclose = async (e) => {
	                let callStop = false;
	                if (this.features.reconnect) {
	                    try {
	                        this.features.disconnected();
	                        await this.transport.connect(url, transferFormat);
	                        await this.features.resend();
	                    }
	                    catch {
	                        callStop = true;
	                    }
	                }
	                else {
	                    this._stopConnection(e);
	                    return;
	                }
	                if (callStop) {
	                    this._stopConnection(e);
	                }
	            };
	        }
	        else {
	            this.transport.onclose = (e) => this._stopConnection(e);
	        }
	        return this.transport.connect(url, transferFormat);
	    }
	    _resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat, useStatefulReconnect) {
	        const transport = HttpTransportType[endpoint.transport];
	        if (transport === null || transport === undefined) {
	            this._logger.log(LogLevel.Debug, `Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
	            return new Error(`Skipping transport '${endpoint.transport}' because it is not supported by this client.`);
	        }
	        else {
	            if (transportMatches(requestedTransport, transport)) {
	                const transferFormats = endpoint.transferFormats.map((s) => TransferFormat[s]);
	                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
	                    if ((transport === HttpTransportType.WebSockets && !this._options.WebSocket) ||
	                        (transport === HttpTransportType.ServerSentEvents && !this._options.EventSource)) {
	                        this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it is not supported in your environment.'`);
	                        return new UnsupportedTransportError(`'${HttpTransportType[transport]}' is not supported in your environment.`, transport);
	                    }
	                    else {
	                        this._logger.log(LogLevel.Debug, `Selecting transport '${HttpTransportType[transport]}'.`);
	                        try {
	                            this.features.reconnect = transport === HttpTransportType.WebSockets ? useStatefulReconnect : undefined;
	                            return this._constructTransport(transport);
	                        }
	                        catch (ex) {
	                            return ex;
	                        }
	                    }
	                }
	                else {
	                    this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it does not support the requested transfer format '${TransferFormat[requestedTransferFormat]}'.`);
	                    return new Error(`'${HttpTransportType[transport]}' does not support ${TransferFormat[requestedTransferFormat]}.`);
	                }
	            }
	            else {
	                this._logger.log(LogLevel.Debug, `Skipping transport '${HttpTransportType[transport]}' because it was disabled by the client.`);
	                return new DisabledTransportError(`'${HttpTransportType[transport]}' is disabled by the client.`, transport);
	            }
	        }
	    }
	    _isITransport(transport) {
	        return transport && typeof (transport) === "object" && "connect" in transport;
	    }
	    _stopConnection(error) {
	        this._logger.log(LogLevel.Debug, `HttpConnection.stopConnection(${error}) called while in state ${this._connectionState}.`);
	        this.transport = undefined;
	        // If we have a stopError, it takes precedence over the error from the transport
	        error = this._stopError || error;
	        this._stopError = undefined;
	        if (this._connectionState === "Disconnected" /* ConnectionState.Disconnected */) {
	            this._logger.log(LogLevel.Debug, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is already in the disconnected state.`);
	            return;
	        }
	        if (this._connectionState === "Connecting" /* ConnectionState.Connecting */) {
	            this._logger.log(LogLevel.Warning, `Call to HttpConnection.stopConnection(${error}) was ignored because the connection is still in the connecting state.`);
	            throw new Error(`HttpConnection.stopConnection(${error}) was called while the connection is still in the connecting state.`);
	        }
	        if (this._connectionState === "Disconnecting" /* ConnectionState.Disconnecting */) {
	            // A call to stop() induced this call to stopConnection and needs to be completed.
	            // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
	            this._stopPromiseResolver();
	        }
	        if (error) {
	            this._logger.log(LogLevel.Error, `Connection disconnected with error '${error}'.`);
	        }
	        else {
	            this._logger.log(LogLevel.Information, "Connection disconnected.");
	        }
	        if (this._sendQueue) {
	            this._sendQueue.stop().catch((e) => {
	                this._logger.log(LogLevel.Error, `TransportSendQueue.stop() threw error '${e}'.`);
	            });
	            this._sendQueue = undefined;
	        }
	        this.connectionId = undefined;
	        this._connectionState = "Disconnected" /* ConnectionState.Disconnected */;
	        if (this._connectionStarted) {
	            this._connectionStarted = false;
	            try {
	                if (this.onclose) {
	                    this.onclose(error);
	                }
	            }
	            catch (e) {
	                this._logger.log(LogLevel.Error, `HttpConnection.onclose(${error}) threw error '${e}'.`);
	            }
	        }
	    }
	    _resolveUrl(url) {
	        // startsWith is not supported in IE
	        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
	            return url;
	        }
	        if (!Platform.isBrowser) {
	            throw new Error(`Cannot resolve '${url}'.`);
	        }
	        // Setting the url to the href propery of an anchor tag handles normalization
	        // for us. There are 3 main cases.
	        // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
	        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
	        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
	        const aTag = window.document.createElement("a");
	        aTag.href = url;
	        this._logger.log(LogLevel.Information, `Normalizing '${url}' to '${aTag.href}'.`);
	        return aTag.href;
	    }
	    _resolveNegotiateUrl(url) {
	        const negotiateUrl = new URL(url);
	        if (negotiateUrl.pathname.endsWith('/')) {
	            negotiateUrl.pathname += "negotiate";
	        }
	        else {
	            negotiateUrl.pathname += "/negotiate";
	        }
	        const searchParams = new URLSearchParams(negotiateUrl.searchParams);
	        if (!searchParams.has("negotiateVersion")) {
	            searchParams.append("negotiateVersion", this._negotiateVersion.toString());
	        }
	        if (searchParams.has("useStatefulReconnect")) {
	            if (searchParams.get("useStatefulReconnect") === "true") {
	                this._options._useStatefulReconnect = true;
	            }
	        }
	        else if (this._options._useStatefulReconnect === true) {
	            searchParams.append("useStatefulReconnect", "true");
	        }
	        negotiateUrl.search = searchParams.toString();
	        return negotiateUrl.toString();
	    }
	}
	function transportMatches(requestedTransport, actualTransport) {
	    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
	}
	/** @private */
	class TransportSendQueue {
	    constructor(_transport) {
	        this._transport = _transport;
	        this._buffer = [];
	        this._executing = true;
	        this._sendBufferedData = new PromiseSource();
	        this._transportResult = new PromiseSource();
	        this._sendLoopPromise = this._sendLoop();
	    }
	    send(data) {
	        this._bufferData(data);
	        if (!this._transportResult) {
	            this._transportResult = new PromiseSource();
	        }
	        return this._transportResult.promise;
	    }
	    stop() {
	        this._executing = false;
	        this._sendBufferedData.resolve();
	        return this._sendLoopPromise;
	    }
	    _bufferData(data) {
	        if (this._buffer.length && typeof (this._buffer[0]) !== typeof (data)) {
	            throw new Error(`Expected data to be of type ${typeof (this._buffer)} but was of type ${typeof (data)}`);
	        }
	        this._buffer.push(data);
	        this._sendBufferedData.resolve();
	    }
	    async _sendLoop() {
	        while (true) {
	            await this._sendBufferedData.promise;
	            if (!this._executing) {
	                if (this._transportResult) {
	                    this._transportResult.reject("Connection stopped.");
	                }
	                break;
	            }
	            this._sendBufferedData = new PromiseSource();
	            const transportResult = this._transportResult;
	            this._transportResult = undefined;
	            const data = typeof (this._buffer[0]) === "string" ?
	                this._buffer.join("") :
	                TransportSendQueue._concatBuffers(this._buffer);
	            this._buffer.length = 0;
	            try {
	                await this._transport.send(data);
	                transportResult.resolve();
	            }
	            catch (error) {
	                transportResult.reject(error);
	            }
	        }
	    }
	    static _concatBuffers(arrayBuffers) {
	        const totalLength = arrayBuffers.map((b) => b.byteLength).reduce((a, b) => a + b);
	        const result = new Uint8Array(totalLength);
	        let offset = 0;
	        for (const item of arrayBuffers) {
	            result.set(new Uint8Array(item), offset);
	            offset += item.byteLength;
	        }
	        return result.buffer;
	    }
	}
	class PromiseSource {
	    constructor() {
	        this.promise = new Promise((resolve, reject) => [this._resolver, this._rejecter] = [resolve, reject]);
	    }
	    resolve() {
	        this._resolver();
	    }
	    reject(reason) {
	        this._rejecter(reason);
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	const JSON_HUB_PROTOCOL_NAME = "json";
	/** Implements the JSON Hub Protocol. */
	class JsonHubProtocol {
	    constructor() {
	        /** @inheritDoc */
	        this.name = JSON_HUB_PROTOCOL_NAME;
	        /** @inheritDoc */
	        this.version = 2;
	        /** @inheritDoc */
	        this.transferFormat = TransferFormat.Text;
	    }
	    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
	     *
	     * @param {string} input A string containing the serialized representation.
	     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
	     */
	    parseMessages(input, logger) {
	        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
	        if (typeof input !== "string") {
	            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
	        }
	        if (!input) {
	            return [];
	        }
	        if (logger === null) {
	            logger = NullLogger.instance;
	        }
	        // Parse the messages
	        const messages = TextMessageFormat.parse(input);
	        const hubMessages = [];
	        for (const message of messages) {
	            const parsedMessage = JSON.parse(message);
	            if (typeof parsedMessage.type !== "number") {
	                throw new Error("Invalid payload.");
	            }
	            switch (parsedMessage.type) {
	                case MessageType.Invocation:
	                    this._isInvocationMessage(parsedMessage);
	                    break;
	                case MessageType.StreamItem:
	                    this._isStreamItemMessage(parsedMessage);
	                    break;
	                case MessageType.Completion:
	                    this._isCompletionMessage(parsedMessage);
	                    break;
	                case MessageType.Ping:
	                    // Single value, no need to validate
	                    break;
	                case MessageType.Close:
	                    // All optional values, no need to validate
	                    break;
	                case MessageType.Ack:
	                    this._isAckMessage(parsedMessage);
	                    break;
	                case MessageType.Sequence:
	                    this._isSequenceMessage(parsedMessage);
	                    break;
	                default:
	                    // Future protocol changes can add message types, old clients can ignore them
	                    logger.log(LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
	                    continue;
	            }
	            hubMessages.push(parsedMessage);
	        }
	        return hubMessages;
	    }
	    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
	     *
	     * @param {HubMessage} message The message to write.
	     * @returns {string} A string containing the serialized representation of the message.
	     */
	    writeMessage(message) {
	        return TextMessageFormat.write(JSON.stringify(message));
	    }
	    _isInvocationMessage(message) {
	        this._assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
	        if (message.invocationId !== undefined) {
	            this._assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
	        }
	    }
	    _isStreamItemMessage(message) {
	        this._assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
	        if (message.item === undefined) {
	            throw new Error("Invalid payload for StreamItem message.");
	        }
	    }
	    _isCompletionMessage(message) {
	        if (message.result && message.error) {
	            throw new Error("Invalid payload for Completion message.");
	        }
	        if (!message.result && message.error) {
	            this._assertNotEmptyString(message.error, "Invalid payload for Completion message.");
	        }
	        this._assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
	    }
	    _isAckMessage(message) {
	        if (typeof message.sequenceId !== 'number') {
	            throw new Error("Invalid SequenceId for Ack message.");
	        }
	    }
	    _isSequenceMessage(message) {
	        if (typeof message.sequenceId !== 'number') {
	            throw new Error("Invalid SequenceId for Sequence message.");
	        }
	    }
	    _assertNotEmptyString(value, errorMessage) {
	        if (typeof value !== "string" || value === "") {
	            throw new Error(errorMessage);
	        }
	    }
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.
	const LogLevelNameMapping = {
	    trace: LogLevel.Trace,
	    debug: LogLevel.Debug,
	    info: LogLevel.Information,
	    information: LogLevel.Information,
	    warn: LogLevel.Warning,
	    warning: LogLevel.Warning,
	    error: LogLevel.Error,
	    critical: LogLevel.Critical,
	    none: LogLevel.None,
	};
	function parseLogLevel(name) {
	    // Case-insensitive matching via lower-casing
	    // Yes, I know case-folding is a complicated problem in Unicode, but we only support
	    // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
	    const mapping = LogLevelNameMapping[name.toLowerCase()];
	    if (typeof mapping !== "undefined") {
	        return mapping;
	    }
	    else {
	        throw new Error(`Unknown log level: ${name}`);
	    }
	}
	/** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
	class HubConnectionBuilder {
	    configureLogging(logging) {
	        Arg.isRequired(logging, "logging");
	        if (isLogger(logging)) {
	            this.logger = logging;
	        }
	        else if (typeof logging === "string") {
	            const logLevel = parseLogLevel(logging);
	            this.logger = new ConsoleLogger(logLevel);
	        }
	        else {
	            this.logger = new ConsoleLogger(logging);
	        }
	        return this;
	    }
	    withUrl(url, transportTypeOrOptions) {
	        Arg.isRequired(url, "url");
	        Arg.isNotEmpty(url, "url");
	        this.url = url;
	        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
	        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
	        if (typeof transportTypeOrOptions === "object") {
	            this.httpConnectionOptions = { ...this.httpConnectionOptions, ...transportTypeOrOptions };
	        }
	        else {
	            this.httpConnectionOptions = {
	                ...this.httpConnectionOptions,
	                transport: transportTypeOrOptions,
	            };
	        }
	        return this;
	    }
	    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
	     *
	     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
	     */
	    withHubProtocol(protocol) {
	        Arg.isRequired(protocol, "protocol");
	        this.protocol = protocol;
	        return this;
	    }
	    withAutomaticReconnect(retryDelaysOrReconnectPolicy) {
	        if (this.reconnectPolicy) {
	            throw new Error("A reconnectPolicy has already been set.");
	        }
	        if (!retryDelaysOrReconnectPolicy) {
	            this.reconnectPolicy = new DefaultReconnectPolicy();
	        }
	        else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
	            this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
	        }
	        else {
	            this.reconnectPolicy = retryDelaysOrReconnectPolicy;
	        }
	        return this;
	    }
	    /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
	     *
	     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
	     */
	    withServerTimeout(milliseconds) {
	        Arg.isRequired(milliseconds, "milliseconds");
	        this._serverTimeoutInMilliseconds = milliseconds;
	        return this;
	    }
	    /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
	     *
	     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
	     */
	    withKeepAliveInterval(milliseconds) {
	        Arg.isRequired(milliseconds, "milliseconds");
	        this._keepAliveIntervalInMilliseconds = milliseconds;
	        return this;
	    }
	    /** Enables and configures options for the Stateful Reconnect feature.
	     *
	     * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
	     */
	    withStatefulReconnect(options) {
	        if (this.httpConnectionOptions === undefined) {
	            this.httpConnectionOptions = {};
	        }
	        this.httpConnectionOptions._useStatefulReconnect = true;
	        this._statefulReconnectBufferSize = options === null || options === void 0 ? void 0 : options.bufferSize;
	        return this;
	    }
	    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
	     *
	     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
	     */
	    build() {
	        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
	        // provided to configureLogger
	        const httpConnectionOptions = this.httpConnectionOptions || {};
	        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
	        if (httpConnectionOptions.logger === undefined) {
	            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
	            httpConnectionOptions.logger = this.logger;
	        }
	        // Now create the connection
	        if (!this.url) {
	            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
	        }
	        const connection = new HttpConnection(this.url, httpConnectionOptions);
	        return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
	    }
	}
	function isLogger(logger) {
	    return logger.log !== undefined;
	}

	// Licensed to the .NET Foundation under one or more agreements.
	// The .NET Foundation licenses this file to you under the MIT license.

	var esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		AbortError: AbortError,
		DefaultHttpClient: DefaultHttpClient,
		HttpClient: HttpClient,
		HttpError: HttpError,
		HttpResponse: HttpResponse,
		get HttpTransportType () { return HttpTransportType; },
		HubConnection: HubConnection,
		HubConnectionBuilder: HubConnectionBuilder,
		get HubConnectionState () { return HubConnectionState; },
		JsonHubProtocol: JsonHubProtocol,
		get LogLevel () { return LogLevel; },
		get MessageType () { return MessageType; },
		NullLogger: NullLogger,
		Subject: Subject,
		TimeoutError: TimeoutError,
		get TransferFormat () { return TransferFormat; },
		VERSION: VERSION
	});

	class BasePayload {
	    apiKey;
	    userId;
	    geoOrigin;
	    geoCurrent;
	    segments;
	    locale;
	    currency;

	    constructor(apiKey, userId, geoOrigin, geoCurrent, segments, currency, locale) {
	        this.apiKey = apiKey;
	        this.userId = userId;
	        this.geoOrigin = geoOrigin;
	        this.geoCurrent = geoCurrent;
	        this.segments = segments ? segments : [];
	        this.currency = currency;
	        this.locale = locale;
	    }
	}

	class InitPayload extends BasePayload {}

	class TrackActionPayload extends BasePayload {
	    action;
	    itemId;

	    constructor(apiKey, userId, geoOrigin, geoCurrent, segments, currency, locale, action, itemId) {
	        super(apiKey, userId, geoOrigin, geoCurrent, segments, currency, locale);

	        this.action = action;
	        this.itemId = itemId;
	    }
	}

	const models = {
	    InitPayload,
	    TrackActionPayload
	};

	var models$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		models: models
	});

	var communicationService;
	var hasRequiredCommunicationService;

	function requireCommunicationService () {
		if (hasRequiredCommunicationService) return communicationService;
		hasRequiredCommunicationService = 1;
		const signalR = esm;
		const {models} = models$1;

		class P2WCommunicationService {

		    static getInstance() {
		        if (!P2WCommunicationService.instance) {
		            P2WCommunicationService.instance = new P2WCommunicationService();
		        }

		        return P2WCommunicationService.instance;
		    }

		    constructor() {
		    }

		    initWssCommunication = (isLocalEnv, onBeforeConnect, userData, srUrl,
		                            onInitReceived,
		                            onPiggyHoldResponseReceived,
		                            onPiggyClaimResponseReceived,
		                            onMissionProgressReceived,
		                            onMissionClaimReceived,
		                            onOfferBoughtResponseReceived,
		                            onWidgetMinBetWarning
		    ) => {
		        onBeforeConnect();

		        if (!isLocalEnv) {
		            const connection = new signalR.HubConnectionBuilder()
		                .withAutomaticReconnect()
		                .withKeepAliveInterval(4000)
		                .withUrl(srUrl, {withCredentials: false})
		                .build();

		            connection.on("initHook", data => {
		                console.log('init triggered; data: ' + JSON.stringify(data));
		                console.log(data);

		                try {
		                    onInitReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from init::: ' + e);
		                }
		            });

		            connection.on("pbHoldHook", data => {
		                console.log('pbHoldHook triggered; data: ' + JSON.stringify(data));

		                try {
		                    onPiggyHoldResponseReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from pbHoldHook::: ' + e);
		                }
		            });

		            connection.on("pbClaimHook", data => {
		                console.log('pbClaimHook triggered; data: ' + JSON.stringify(data));

		                try {
		                    onPiggyClaimResponseReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from pbClaimHook::: ' + e);
		                }
		            });

		            connection.on("missionProgressHook", data => {
		                console.log('missionProgressHook triggered; data: ' + JSON.stringify(data));

		                try {
		                    onMissionProgressReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from missionProgressHook::: ' + e);
		                }
		            });

		            connection.on("missionClaimHook", data => {
		                console.log('missionClaimHook triggered; data: ' + JSON.stringify(data));

		                try {
		                    onMissionClaimReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from missionClaimHook::: ' + e);
		                }
		            });


		            connection.on("offerBoughtHook", data => {
		                console.log('offerBoughtHook triggered; data: ' + JSON.stringify(data));

		                try {
		                    onOfferBoughtResponseReceived(data);
		                } catch (e) {
		                    console.log('error receiving data from offerBoughtHook::: ' + e);
		                }
		            });

		            connection.on('widgetMinBetWarningHook',data =>{
		                try{
		                    onWidgetMinBetWarning(data);
		                }catch (e){
		                    console.log('error receiving data from widgetMinBetWarning::: ' + e);
		                }
		            });

		            connection.on("openWindowHook", data => {
		                console.log('message triggered; data: ' + JSON.stringify(data));
		                console.log(data);

		                // if (data.data === 'open') this.buildIframe();
		            });



		            console.log('sending to init: ', JSON.stringify(userData));
		            connection.start()
		                .then(() => {
		                    this.sendInit(connection, userData);
		                });



		            connection.onreconnected(() => {
		                console.log('RECONNECTED!!!');
		                this.sendInit(connection, userData);
		            });

		            return connection;
		        }
		    }

		    composeInitPayload = (userData) =>
		        new models.InitPayload(userData.apiKey, userData.userId, userData.geoOrigin, userData.geoCurrent, userData.segments, userData.currency, userData.locale)

		    sendInit = (connection, data) => {
		        const initPayload = this.composeInitPayload(data);
		        connection.invoke("init", initPayload)
		            .then(() => console.log(`sent init request with payload: ${JSON.stringify(initPayload)}`));
		    }

		    initIframeCommunication = (onLoad, onReady, onRedirect, onExit, onOpenInternalIframePopup, onHideInternalIframePopup, onTrack, onPbHold, onPbClaim, onMissionClaim, onOfferClaim, onOfferAnimation, onTutorialProgress, onSetTutorialCoordinates, hideTutorialHints) => {
		        window.addEventListener("message", (e) => {
		            const data = e.data;

		            try {
		                const {type, message} = data;

		                switch (type) {
		                    case "appLoaded":
		                        onLoad(message);
		                        break;
		                    case "appReady":
		                        onReady();
		                        break;
		                    case "redirect":
		                        if (message) onRedirect(message);
		                        break;
		                    case "exit":
		                        if (message) onExit(message);
		                        break;
		                    case 'openPopup':
		                        if (message) onOpenInternalIframePopup(message);
		                        break;
		                    case 'hidePopup':
		                        if (message) onHideInternalIframePopup(message);
		                        break;
		                    case "track":
		                        if (message) onTrack(message);
		                        break;
		                    case "pbHold":
		                        if (message) onPbHold(message);
		                        break;
		                    case "pbClaim":
		                        if (message) onPbClaim(message);
		                        break;
		                    case "missionClaim":
		                        if (message) onMissionClaim(message);
		                        break;
		                    case "offerClaim":
		                        if (message) onOfferClaim(message);
		                        break;
		                    case "offerAnimation":
		                        if (message) onOfferAnimation(message);
		                        break;
		                    case "tutorialProgress":
		                        if (message) onTutorialProgress(message);
		                        break;
		                    case 'setTutorialCoordinates':
		                        if (message) onSetTutorialCoordinates(message);
		                        break;
		                    case 'hideTutorialHints':
		                        hideTutorialHints();
		                        break;
		                }
		            } catch (e) {
		                console.log('something went wrong on message: ', JSON.stringify(e));
		            }
		        });
		    }

		    sendMessageToClient = (payload) => {
		        const parentWindow = document.getElementById('p2w-iframe')?.contentWindow;

		        if (parentWindow) {
		            parentWindow.postMessage(payload, "*");
		        }
		    }
		}

		communicationService = P2WCommunicationService;
		// export const P2WCommunicationService = {
		//     initWssCommunication,
		//     initIframeCommunication,
		//     sendMessageToClient
		// }
		return communicationService;
	}

	const styleTrailAnimations = () => {

	    const styleElement = document.createElement('style');
	    styleElement.textContent = `
        :root {
            --glow-rgb: 255, 215, 0;
        }
    
        .p2w-glow-point {
            position: absolute;
            box-shadow: 0rem 0rem 1.2rem 0.6rem rgb(var(--glow-rgb));
            animation-duration: 600ms;
            animation-fill-mode: forwards;
            pointer-events: none;
            z-index: 9999999;
        }
    
        .p2w-star {
            position: absolute;
            z-index: 2;
            color: white;
            font-size: 1rem;
            animation-duration: 1500ms;
            animation-fill-mode: forwards;
            pointer-events: none;
            z-index: 9999999;
            
        }
    
        @keyframes fall-1 {
            0% {
                transform: translate(0px, 0px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(0.25);
            opacity: 0;
        }
        
            5% {
                transform: translate(10px, -10px) rotateX(45deg) rotateY(30deg) rotateZ(0deg) scale(1);
                opacity: 1;
            }
        
            100% {
                transform: translate(25px, 200px) rotateX(180deg) rotateY(270deg) rotateZ(90deg) scale(1);
                opacity: 0;
            }
        }
    
        @keyframes fall-2 {
            0% {
                    transform: translate(0px, 0px) rotateX(-20deg) rotateY(10deg) scale(0.25);
                opacity: 0;
            }
        
            10% {
                transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg) scale(1);
                opacity: 1;
            }
        
            100% {
                transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(0.25);
                opacity: 0;
            }
        }
    
        @keyframes fall-3 {
            0% {
                transform: translate(0px, 0px) rotateX(0deg) rotateY(45deg) scale(0.5);
                opacity: 0;
            }
        
            15% {
                transform: translate(7px, 5px) rotateX(0deg) rotateY(45deg) scale(1);
                opacity: 1;
            }
        
            100% {
                transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes decreaseGlow {
            0%{
                box-shadow: 0rem 0rem 1.8rem 0.9rem rgb(var(--glow-rgb));
            }
           
            100%{
                box-shadow: 0rem 0rem 0rem 0rem rgb(var(--glow-rgb));
            }
        }
    `;
	    document.head.appendChild(styleElement);


	};

	const trailAnimation = () => {

	    let start = new Date().getTime();

	    const originPosition = {x: 0, y: 0};

	    const last = {
	        starTimestamp: start,
	        starPosition: originPosition,
	        mousePosition: originPosition
	    };

	    const config = {
	        starAnimationDuration: 500,
	        minimumTimeBetweenStars: 50,
	        minimumDistanceBetweenStars: 350,
	        glowDuration: 250,
	        maximumGlowPointSpacing: 10,
	        colors: ["255,215,0", "184,216,231"],
	        sizes: ["2.4rem", "2rem", "1.6rem"],
	        animations: ["fall-1", "fall-2", "fall-3"]
	    };

	    let count = 0;

	    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
	        selectRandom = items => items[rand(0, items.length - 1)];

	    const withUnit = (value, unit) => `${value}${unit}`,
	        px = value => withUnit(value, "px"),
	        ms = value => withUnit(value, "ms");

	    const calcDistance = (a, b) => {
	        const diffX = b.x - a.x,
	            diffY = b.y - a.y;

	        return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	    };

	    const calcElapsedTime = (start, end) => end - start;

	    const appendElement = element => document.body.appendChild(element),
	        removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

	    const createStar = position => {
	        const star = document.createElement("span"),
	            color = selectRandom(config.colors);

	        star.className = "p2w-star fa-solid fa-sparkle";

	        star.style.left = px(position.x);
	        star.style.top = px(position.y);
	        star.style.fontSize = selectRandom(config.sizes);
	        star.style.color = `rgb(${color})`;
	        star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
	        star.style.animationName = config.animations[count++ % 3];
	        star.style.starAnimationDuration = ms(config.starAnimationDuration);
	        // star.innerHTML = '&#9733;';
	        // if (count % 3 === 0) {
	        //     star.innerHTML = '🪙';
	        // } else {
	        //     star.innerHTML = '★';
	        // }
	        if (count % 3 === 0) {
	                star.innerHTML = '★';
	        } else if (count % 2 === 0) {
	            star.innerHTML = '✦';
	        } else {
	            star.innerHTML = '💵';
	        }

	        appendElement(star);

	        removeElement(star, config.starAnimationDuration);
	    };

	    const createGlowPoint = position => {
	        const glow = document.createElement("div");

	        glow.className = "p2w-glow-point";

	        glow.style.left = px(position.x);
	        glow.style.top = px(position.y);
	        glow.style.animationName = 'decreaseGlow';
	        appendElement(glow);

	        removeElement(glow, config.glowDuration);
	    };

	    const determinePointQuantity = distance => Math.max(
	        Math.floor(distance / config.maximumGlowPointSpacing),
	        1
	    );

	    const createGlow = (last, current) => {

	        const distance = calcDistance(last, current),
	            quantity = determinePointQuantity(distance);

	        const dx = (current.x - last.x) / quantity,
	            dy = (current.y - last.y) / quantity;

	        Array.from(Array(quantity)).forEach((_, index) => {
	            const x = last.x + dx * index,
	                y = last.y + dy * index,
	                w = 0.12 * index,
	                h = 0.6 * index;
	            createGlowPoint({x, y, w, h});
	        });
	    };

	    const updateLastStar = position => {
	        last.starTimestamp = new Date().getTime();

	        last.starPosition = position;
	    };

	    const updateLastMousePosition = position => last.mousePosition = position;

	    const adjustLastMousePosition = position => {
	        if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
	            last.mousePosition = position;
	        }
	    };

	    const handleOnMove = e => {
	        const mousePosition = {x: e.clientX, y: e.clientY};

	        adjustLastMousePosition(mousePosition);

	        const now = new Date().getTime(),
	            hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
	            hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

	        if (hasMovedFarEnough || hasBeenLongEnough) {
	            createStar(mousePosition);

	            updateLastStar(mousePosition);
	        }

	        createGlow(last.mousePosition, mousePosition);

	        updateLastMousePosition(mousePosition);
	    };


	    const elementWithTrail = document.querySelector('#offerAnimationDiv');
	    const addAnimation = () => {
	        let positionsToAnimate = elementWithTrail.getBoundingClientRect();


	        let dataPosition = {
	            clientX: positionsToAnimate.left + positionsToAnimate.width / 2,
	            clientY: positionsToAnimate.top + positionsToAnimate.height / 2
	        };
	        if (positionsToAnimate.x !== 0) {
	            handleOnMove(dataPosition);
	            requestAnimationFrame(() =>
	                addAnimation()
	            );
	        }
	    };
	    requestAnimationFrame(() =>
	        addAnimation()
	    );
	};

	const uiHelperAnimate = {trailAnimation, styleTrailAnimations};

	var uiHelperAnimate$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		uiHelperAnimate: uiHelperAnimate
	});

	const addTutorialStyles = (localStyles) => {
	    const styleElement = document.createElement('style');
	    if (localStyles) {
	        styleElement.classList.add('p2w-local-tutorial-styles');
	        styleElement.textContent = localStyles;
	    } else {
	        styleElement.textContent = tutorialStyles;
	        styleElement.classList.add('p2w-glob-tutorial-styles');

	    }
	    document.head.appendChild(styleElement);
	};

	const isDesktop = screen.width > screen.height;

	const calculateHintPositionInPercent = (positionInFigmaWeb, positionInFigmaMob) => {
	    if (isDesktop) {
	        return {
	            x: positionInFigmaWeb.x / 1919 * 100,
	            y: positionInFigmaWeb.y / 915 * 100,
	            width: positionInFigmaMob.width,
	        };
	    } else {
	        return {
	            x: positionInFigmaMob.x / 1080 * 100,
	            y: positionInFigmaMob.y / 1920 * 100,
	            ...(positionInFigmaMob.width && {width: positionInFigmaMob.width / 1080 * 100}),
	        }
	    }
	};

	const showHand = (position, rotateAngle, pointingAnimation, appearanceAnimation, zIndex = '199999') => {
	    const hand = document.createElement('img');
	    hand.style.zIndex = zIndex;
	    hand.src = 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/tutorial/tutorial_hand.png';
	    hand.id = 'p2w-hand';
	    hand.style.position = 'fixed';

	    hand.style.opacity = position.opacity ? `${position.opacity / 100}` : '1';
	    let handStyles;
	    if(position.isBubbleHand) {
	         handStyles = `
            #p2w-hand {
                 right: 3vw !important;
                 bottom: 3.2vh !important;
            }
            @media (min-width: 1980px) {
                 #p2w-hand {
                     right: 3.5vw !important;
                     bottom: 3.2vh !important;
                 }
            }
            
             @media (orientation: portrait) {
                 #p2w-hand {
                     right: 2.5vw !important;
                     bottom: 5vh !important;
                 }
             }
        `;
	    } else {
	        handStyles = `
            #p2w-hand {
                left: calc(${position.x}px + ${position.width / 2}px - 1.875vw);
                top: ${position.y + 'px'};
            }
            @media (orientation: portrait) {
                #p2w-hand {
                    left: calc(${position.x}px + ${position.width / 2}px - 6.99vw);
                    top: ${position.y + 'px'};
                }
            }
        `;
	    }
	    addTutorialStyles(handStyles);

	    hand.style.pointerEvents = 'none';
	    hand.style.transform = `rotate(${rotateAngle}deg) translate(-21%, 65%)`;

	    const wrapperAnimation = document.createElement('div');
	    wrapperAnimation.style.zIndex = zIndex;
	    wrapperAnimation.classList.add('p2w-wrapper-animation-circle');
	    wrapperAnimation.style.position = 'fixed';

	    if(!position.isBubbleHand) {
	        wrapperAnimation.style.top = position.y + 'px';
	        wrapperAnimation.style.left = position.x + 'px';
	        wrapperAnimation.style.height = position.height + 'px';
	        wrapperAnimation.style.aspectRatio = '1/1';
	    }

	    wrapperAnimation.style.pointerEvents = 'none';

	    if (pointingAnimation) {
	        const firstCircleAnimation = document.createElement('img');
	        firstCircleAnimation.src = 'https://p2w.imgix.net/resources/client/tutorial/Subtract.svg?auto=compress&auto=format';
	        firstCircleAnimation.className = 'p2w-circle-after-hand';
	        firstCircleAnimation.style.position = 'absolute';

	        firstCircleAnimation.style.height = '100%';
	        firstCircleAnimation.style.pointerEvents = 'none';
	        firstCircleAnimation.style.scale = '0';

	        const secondCircleAnimationWithDelay = document.createElement('img');
	        secondCircleAnimationWithDelay.src = 'https://p2w.imgix.net/resources/client/tutorial/Subtract.svg?auto=compress&auto=format';
	        secondCircleAnimationWithDelay.className = 'p2w-circle-after-hand';
	        secondCircleAnimationWithDelay.style.position = 'absolute';

	        secondCircleAnimationWithDelay.style.height = '100%';
	        secondCircleAnimationWithDelay.style.pointerEvents = 'none';
	        secondCircleAnimationWithDelay.style.scale = '0';


	        const pointingAnimationStyles = `
            @keyframes hinge {
                0% {  transform: rotate(${rotateAngle}deg) translate(-21%, 140%);animation-timing-function: ease-in-out; opacity: ${position.opacity ? position.opacity / 100 : '1'};}  
                25%, 75% { transform: rotate(${rotateAngle}deg) translate(-21%, 100%); animation-timing-function: ease-in-out; opacity: ${position.opacity ? position.opacity / 100 : '1'};}  
                50% {  transform: rotate(${rotateAngle}deg) translate(-21%, 140%); animation-timing-function: ease-in-out; opacity: ${position.opacity ? position.opacity / 100 : '1'};} 
                // 80% { transform: rotate(${rotateAngle}deg) translate(-21%, 140%);   animation-timing-function: ease-in-out; opacity: ${position.opacity ? position.opacity / 100 : '1'};} 
                100% { transform: rotate(${rotateAngle}deg) translate(-21%, 140%);  animation-timing-function: ease-in-out;opacity: ${position.opacity ? position.opacity / 100 : '1'};}
            }
            
            @keyframes circleBlow {
                0% {scale:0;      transform-origin: center center;  animation-timing-function: linear; } 
                22% {scale:0; opacity: 1;        transform-origin: center center;  animation-timing-function: linear; } 
                32% {scale:1; opacity: 1;        transform-origin: center center;   animation-timing-function: linear; }
                
                47% {scale:2; opacity: 0;        transform-origin: center center;   animation-timing-function: linear; }
                48% {scale: 0; opacity: 0;        transform-origin: center center;   }
                72% {scale:0; opacity: 1;       transform-origin: center center;   animation-timing-function: linear; } 
                82% {scale:1; opacity: 1;        transform-origin: center center;   animation-timing-function: linear; }
                
                97% {scale:2;  opacity: 0;       transform-origin: center center;  animation-timing-function: linear; } 
                100% {scale:0; opacity: 0;       transform-origin: center center;  } 
            }
            
            
            `;
	        let circlePosition;
	        if(position.isBubbleHand) {
	            circlePosition = `
            .p2w-wrapper-animation-circle {
                left: 92.5vw !important;
                bottom: 9.5vh !important;
                width: 6.25vh !important;
                height: 6.25vh !important;
            }
             @media (min-width: 1980px) {
                .p2w-wrapper-animation-circle {
                    right: 4vw !important;
                }
            }
            @media (orientation: portrait) {
                    .p2w-wrapper-animation-circle{
                        left: 85vw !important;
                        bottom: 11vh !important;
                        width: 10vw  !important;
                        height: 10vw  !important;
                    }
            }
            
            `;
	        } else {
	            circlePosition = `
            .p2w-wrapper-animation-circle{
                
                width: ${position.width ? position.width + 'px' : '3.5vw'};
                height: ${position.height ? position.height + 'px' : '3.5vw'};
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            @media (orientation: portrait) {
                    .p2w-wrapper-animation-circle{
                        width: ${position.width ? position.width + 'px' : '20vw'};
                        height: ${position.height ? position.height + 'px' : '20vw'};
                    }
            }
            
            `;
	        }

	        firstCircleAnimation.style.animation = 'circleBlow 3s cubic-bezier(0, 0, 0, 1)  infinite';
	        secondCircleAnimationWithDelay.style.animation = 'circleBlow 3s cubic-bezier(0, 0, 0, 1)  infinite';
	        secondCircleAnimationWithDelay.style.animationDelay = '0.3s';

	        hand.classList.add('p2w-hand-pointing-animation');
	        wrapperAnimation.append(firstCircleAnimation);
	        wrapperAnimation.appendChild(secondCircleAnimationWithDelay);
	        addTutorialStyles(pointingAnimationStyles);
	        addTutorialStyles(circlePosition);
	    }
	    if (appearanceAnimation) {
	        hand.classList.add('p2w-hand-appearanceAnimation');
	    }

	    document.body.appendChild(wrapperAnimation);
	    document.body.appendChild(hand);
	};

	const hideHand = () => {
	    const hand = document.querySelector('#p2w-hand');
	    const circleAnimation = document.querySelector('.p2w-wrapper-animation-circle');
	    if (hand) {
	        document.body.removeChild(hand);
	    }
	    if (circleAnimation) {
	        document.body.removeChild(circleAnimation);
	    }
	};

	const isHandOnScreen = () => {
	    const hand = document.querySelector('#p2w-hand');
	    if(hand) {
	        return hand.getBoundingClientRect()
	    }
	    return null
	};


	const showHandIfTutorialExist = () => {
	    addTutorialStyles();
	    const bubble = document.getElementById('p2w-bubble');
	    if (bubble) {
	        setTimeout(() => {
	            const positions = {
	                x: bubble.getBoundingClientRect().left,
	                y: bubble.getBoundingClientRect().top,
	                width: bubble.getBoundingClientRect().width,
	                height: bubble.getBoundingClientRect().height,
	                isBubbleHand: true
	            };

	            if (!window.location.href.includes('/game/')) {
	                showHand(positions, 170, true, true, '1049');
	            }
	        }, 1000);
	    }
	};

	const showWelcomeTutorial = (buttonText, exitHandler, letsGoHandler) => {
	    const welcomeTutorial = document.createElement('div');
	    welcomeTutorial.classList.add('p2w-welcomeTutorial');
	    welcomeTutorial.style.position = 'fixed';
	    welcomeTutorial.style.top = '0px';
	    welcomeTutorial.style.left = '0px';
	    welcomeTutorial.style.width = '100%';
	    welcomeTutorial.style.height = '100%';
	    welcomeTutorial.style.display = 'flex';
	    welcomeTutorial.style.alignItems = 'center';
	    welcomeTutorial.style.justifyContent = 'center';
	    welcomeTutorial.style.background = 'radial-gradient(56.26% 50% at 50% 50%, rgba(40, 113, 223, 0.95) 7.4%, rgba(5, 17, 40, 0.9) 94.4%)';
	    welcomeTutorial.style.backdropFilter = 'blur(30px)';
	    welcomeTutorial.style.opacity = '1';

	    welcomeTutorial.style.zIndex = '1100';

	    welcomeTutorial.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
	    welcomeTutorial.style.backdropFilter = 'blur(10px)';
	    const starsBackgroundTutorial = document.createElement('div');

	    starsBackgroundTutorial.classList.add('stars-background-tutorial');
	    starsBackgroundTutorial.style.width = '100%';
	    starsBackgroundTutorial.style.height = '100%';
	    starsBackgroundTutorial.style.position = 'relative';
	    starsBackgroundTutorial.style.backgroundImage = 'url(https://p2w.imgix.net/resources/client/tutorial/Fx_Cmn_Overlay_Blue.png?auto=compress&auto=format)';


	    starsBackgroundTutorial.style.backgroundRepeat = 'no-repeat';
	    starsBackgroundTutorial.style.backgroundPosition = 'center';
	    starsBackgroundTutorial.style.display = 'flex';
	    starsBackgroundTutorial.style.alignItems = 'center';
	    starsBackgroundTutorial.style.justifyContent = 'center';

	    const exitButton = document.createElement('button');
	    exitButton.style.backgroundImage = 'url(https://p2w.imgix.net/resources/client/tutorial/Vnt_Btn_Cmn.svg?auto=compress&auto=format)';
	    exitButton.classList.add('p2w-exitButton-tutorial');
	    exitButton.style.position = 'absolute';

	    exitButton.addEventListener('click', exitHandler);
	    exitButton.style.border = 'none';
	    exitButton.style.backgroundSize = '100% 100%';
	    exitButton.style.backgroundRepeat = 'no-repeat';
	    exitButton.style.backgroundColor = 'transparent';
	    exitButton.style.cursor = 'pointer';

	    const greetingImage = document.createElement('img');

	    greetingImage.classList.add('p2w-greeting-image-tutorial');

	    greetingImage.style.height = '50%';
	    greetingImage.style.aspectRatio = '1/1';
	    greetingImage.src = `https://p2w.imgix.net/resources/client/tutorial/Banner1.png?auto=compress&auto=format`;

	    const textParts = ['Get Ready', 'to', 'Win!'];


	    const createStyledDiv = (text, index) => {

	        const divElement = document.createElement('div');
	        divElement.classList.add('p2w-greeting-text');
	        divElement.innerText = text;

	        divElement.style.fontFamily = "'Fira Sans'";
	        divElement.style.fontStyle = 'normal';
	        divElement.style.fontWeight = '900';
	        divElement.style.lineHeight = '1';
	        divElement.style.background = 'linear-gradient(181.3deg, #FFFF71 30.91%, #FCE000 46.39%, #FCE000 51.6%, #F2B40D 52.06%, #F5CF18 63.15%)';
	        divElement.style.webkitBackgroundClip = 'text';
	        divElement.style.webkitTextFillColor = 'transparent';
	        divElement.style.backgroundClip = 'text';
	        divElement.style.textFillColor = 'transparent';
	        divElement.style.transform = 'matrix(0.99, -0.14, 0, 1, 0, 0)';
	        if(index === 2) {
	            divElement.style.transform = `matrix(0.99, -0.14, 0, 1, ${isDesktop ? '-12' : '-10'}, 0)`;
	        }
	        divElement.style.position = 'absolute';
	        divElement.style.textAlign = 'center';
	        if (isDesktop) {
	            divElement.style.width = '22.5%';
	            if(index !== 1) {
	                divElement.style.fontSize = '3.698vw';
	            } else {
	                divElement.style.fontSize = '2.969vw';
	            }
	                divElement.style.filter = 'drop-shadow(0px 0.245vw 0px #AA330E)';

	        } else {
	            divElement.style.width = '70%';
	            if(index !== 1) {
	                divElement.style.fontSize = '13.889vw';
	            } else {
	                divElement.style.fontSize = '11.111vw';
	            }
	            divElement.style.filter = 'drop-shadow(0px 0.926vw 0px #AA330E)';
	        }


	        return divElement;
	    };


	    textParts.forEach((text, index) => {
	        const styledDiv = createStyledDiv(text, index);
	        const initialPercentsWithScreenMode = isDesktop ? 44.5 : 44;
	        const MultiplierWithScreenMode = isDesktop ? 5 : 5.5;
	        styledDiv.style.top = `${initialPercentsWithScreenMode + (index * ((index === 1 ? 1 : 0) + MultiplierWithScreenMode))}%`;
	        styledDiv.style.zIndex = `${5 - index}`;
	        starsBackgroundTutorial.appendChild(styledDiv);
	    });

	    const goButton = document.createElement('button');
	    goButton.id = 'step1WelcomeButton';
	    goButton.style.backgroundImage = 'url(https://p2w.imgix.net/resources/client/tutorial/Btn_Cmn_M_Green_Up.svg?auto=compress&auto=format)';

	    goButton.classList.add('p2w-caption-btn-tutorial');
	    goButton.style.position = 'absolute';
	    goButton.style.transform = 'translateX(-50%)';


	    goButton.style.border = 'none';
	    goButton.style.backgroundSize = '100% 100%';
	    goButton.style.backgroundRepeat = 'no-repeat';
	    goButton.style.backgroundColor = 'transparent';
	    goButton.style.display = 'flex';
	    goButton.style.alignItems = 'center';
	    goButton.style.justifyContent = 'center';

	    goButton.style.fontFamily = 'Fira Sans';
	    goButton.style.fontStyle = 'normal';
	    goButton.style.fontWeight = '900';
	    goButton.style.textAlign = 'center';
	    goButton.style.color = '#FFFFF7';
	    goButton.style.webkitTextStroke = 'thin #017416';
	    goButton.style.cursor = 'pointer';
	    goButton.innerText = buttonText;
	    goButton.addEventListener('click', letsGoHandler);

	    starsBackgroundTutorial.appendChild(goButton);
	    starsBackgroundTutorial.appendChild(exitButton);
	    starsBackgroundTutorial.appendChild(greetingImage);

	    welcomeTutorial.appendChild(starsBackgroundTutorial);
	    document.body.appendChild(welcomeTutorial);
	};

	const hideWelcomeTutorial = () => {
	    const welcomeTutorial = document.querySelector('.p2w-welcomeTutorial');
	    document.body.removeChild(welcomeTutorial);
	};

	const isWelcomeTutorialScreenOpen = () => {
	    const welcomeTutorial = document.querySelector('.p2w-welcomeTutorial');
	    return !!welcomeTutorial
	};


	const showHint = (hintText, position, withCharacter, arrowSide, arrowPositionInPercent, buttonCaption, buttonHandler) => {
	    const hintTextElement = document.createElement('div');
	    hintTextElement.classList.add('p2w-hint-tutorial');
	    hintTextElement.style.position = 'fixed';
	    hintTextElement.style.top = position.y + '%';
	    hintTextElement.style.left = position.x + '%';


	    const handStyles = `
        .p2w-hint-tutorial{
            width : ${position.width ? position.width + '%' : '14vw'};
            z-index: 99999999;

        }
        @media (orientation: portrait) {
            .p2w-hint-tutorial{
                width : ${position.width ? position.width + '%' : '57.222vw'};

                z-index:999999999;
            }
        }
        `;
	    addTutorialStyles(handStyles);


	    const hintTextDiv = document.createElement('div');
	    hintTextDiv.classList.add('p2w-hint-text');
	    hintTextDiv.id = 'p2w-hint-text';

	    hintTextDiv.style.width = '100%';
	    hintTextDiv.style.zIndex = '999999999';
	    hintTextDiv.style.color = '#6C717E';

	    hintTextDiv.style.background = '#E7F0F4';

	    hintTextDiv.style.position = 'relative';
	    hintTextDiv.style.display = 'flex';
	    hintTextDiv.style.justifyContent = 'center';
	    hintTextDiv.style.alignItems = 'flex-end';
	    hintTextDiv.style.flexDirection = 'column';

	    hintTextDiv.innerText = `${hintText}`;

	    const avatarWrapperTutorial = document.createElement('div');
	    avatarWrapperTutorial.classList.add('p2w-avatar-wrapper-tutorial');

	    avatarWrapperTutorial.style.position = 'absolute';
	    avatarWrapperTutorial.style.width = 'calc(100% )';
	    avatarWrapperTutorial.style.height = 'calc(100% )';
	    avatarWrapperTutorial.style.pointerEvents = 'none';
	    avatarWrapperTutorial.style.top = '0';
	    avatarWrapperTutorial.style.left = '0';

	    let arrowHintStyles;
	    switch (arrowSide) {
	        case 'left':
	            arrowHintStyles = `
                .p2w-hint-text:after {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 1.042vw 1.042vw 1.042vw 0;
                    border-color: transparent #E7F0F4;
                    display: block;
                    height: 0;
                    z-index: 1;
                    margin-top: -1.042vw;
                    left: -0.942vw;
                    top: ${arrowPositionInPercent}%;
                }
                
                .p2w-hint-text:before {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 1.094vw 1.094vw 1.094vw 0;
                    border-color: transparent #000000;
                    display: block;
                    height: 0;
                    z-index: 0;
                    margin-top: -1.094vw;
                    left: -1.198vw;
                    top: ${arrowPositionInPercent}%;
                }
                
                @media (orientation: portrait) {
                    .p2w-hint-text:after {
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 2.778vw 2.778vw 2.778vw 0;
                        border-color: transparent #E7F0F4;
                        display: block;
                        height: 0;
                        z-index: 1;
                        margin-top: -2.778vw;
                        left: -2.578vw;
                        top: ${arrowPositionInPercent}%;
                    }
                    
                    .p2w-hint-text:before {
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 3.056vw 3.056vw 3.056vw 0;
                        border-color: transparent #000000;
                        display: block;
                        height: 0;
                        z-index: 0;
                        margin-top: -3.056vw;
                        left: -3.426vw;
                        top: ${arrowPositionInPercent}%;
                    }
                }
            `;
	            break
	        case 'right':

	            arrowHintStyles = `
               .p2w-hint-text:after {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 1.042vw 0 1.042vw 1.042vw;
                    border-color: transparent transparent transparent #E7F0F4;
                    display: block;
                    height: 0;
                    z-index: 1;
                    margin-top: -1.042vw;
                    right: -0.942vw;
                    top: ${arrowPositionInPercent}%;
               }
                
                .p2w-hint-text:before {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 1.094vw 0 1.094vw 1.094vw;
                    border-color: transparent transparent transparent #000000;
                    display: block;
                    height: 0;
                    z-index: 0;
                    margin-top: -1.094vw;
                    right: -1.198vw;
                    top: ${arrowPositionInPercent}%;
                }
                
                @media (orientation: portrait) {
                    .p2w-hint-text:after {
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 2.778vw 0 2.778vw 2.778vw;
                        border-color: transparent transparent transparent #E7F0F4;
                        display: block;
                        height: 0;
                        z-index: 1;
                        margin-top: -2.778vw;
                        right: -2.578vw;
                        top:${arrowPositionInPercent}%;
                    }
                    
                    .p2w-hint-text:before {
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 3.056vw 0 3.056vw 3.056vw;
                        border-color: transparent transparent transparent #000000;
                        display: block;
                        height: 0;
                        z-index: 0;
                        margin-top: -3.056vw;
                        right: -3.426vw;
                        top: ${arrowPositionInPercent}%;
                    }
                }

            `;
	            break
	        case 'bottom':

	            arrowHintStyles = `
                .p2w-hint-text:after {
                content: '';
                position: absolute;
                border-style: solid;
                border-width: 1.342vw 1.342vw 0;
                border-color: #E7F0F4 transparent transparent;
                display: block;
                width: 0;
                z-index: 1;
                margin-top: -1.342vw;
                bottom: -0.842vw;
                left: ${arrowPositionInPercent}%;
                transform: translateX(-50%);
            }
            
            .p2w-hint-text:before {
                content: '';
                position: absolute;
                border-style: solid;
                border-width: 1.394vw 1.394vw 0;
                border-color: #000000 transparent transparent;
                display: block;
                width: 0;
                z-index: 0;
                margin-top: -1.394vw;
                bottom: -1.398vw;
                left: ${arrowPositionInPercent}%;
                transform: translateX(-50%);
            }
            
            @media (orientation: portrait) {
                .p2w-hint-text:after {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 3.278vw 3.278vw 0;
                    border-color: #E7F0F4 transparent transparent;
                    display: block;
                    width: 0;
                    z-index: 1;
                    margin-top: -3.278vw;
                    bottom: -2.478vw;
                    left: ${arrowPositionInPercent}%;
                    transform: translateX(-50%);
                }
                
                .p2w-hint-text:before {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 3.556vw 3.556vw 0;
                    border-color: #000000 transparent transparent;
                    display: block;
                    width: 0;
                    z-index: 0;
                    margin-top: -3.556vw;
                    bottom: -3.826vw;
                    left: ${arrowPositionInPercent}%;
                    transform: translateX(-50%);
                }
            }

            `;
	            break
	        case 'top':

	            arrowHintStyles = `
                .p2w-hint-text:after{
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 0 1.042vw 1.042vw;
                    border-color: #E7F0F4 transparent;
                    display: block;
                    width: 0;
                    z-index: 1;
                    margin-left: -1.042vw;
                    top: -0.942vw;
                    left:${arrowPositionInPercent}%;
                }
                
                .p2w-hint-text:before
                {
                    content: '';
                    position: absolute;
                    border-style: solid;
                    border-width: 0 1.094vw 1.094vw;
                    border-color: #000000 transparent;
                    display: block;
                    width: 0;
                    z-index: 0;
                    margin-left: -1.094vw;
                    top: -1.098vw;
                    left: ${arrowPositionInPercent}%;
                }
               
                @media (orientation: portrait) {
                    .p2w-hint-text:after{
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 0 2.778vw 2.778vw;
                        border-color: #E7F0F4 transparent;
                        display: block;
                        width: 0;
                        z-index: 1;
                        margin-left: -2.778vw;
                        top: -2.578vw;
                        left: ${arrowPositionInPercent}%;
                    }
                    
                    .p2w-hint-text:before
                    {
                        content: '';
                        position: absolute;
                        border-style: solid;
                        border-width: 0 3.056vw 3.056vw;
                        border-color: #000000 transparent;
                        display: block;
                        width: 0;
                        z-index: 0;
                        margin-left: -3.056vw;
                        top: -3.326vw;
                        left: ${arrowPositionInPercent}%;
                    }
                }
            `;
	            break;
	        default:
	            console.error('Invalid arrowSide value');
	    }

	    addTutorialStyles(arrowHintStyles);

	    if (withCharacter) {
	        const characterElement = document.createElement('img');
	        characterElement.classList.add('p2w-character-hints-tutorial');
	        characterElement.style.zIndex = '99999999';
	        characterElement.style.position = 'absolute';

	        if (isDesktop) {
	            characterElement.src = 'https://p2w.imgix.net/resources/client/tutorial/npc1.png?auto=compress&auto=format';
	            // characterElement.style.width = '20.365vw';
	            // characterElement.style.height = '32.76vw';
	            characterElement.style.aspectRatio = '9/16;';
	        } else {
	            characterElement.src = 'https://p2w.imgix.net/resources/client/tutorial/Avatar2.png?auto=compress&auto=format';
	            characterElement.style.width = '23.704vw';
	            characterElement.style.height = '25.37vw';
	        }


	        characterElement.style.backgroundRepeat = 'no-repeat';
	        characterElement.style.pointerEvents = 'none';

	        switch (arrowSide) {
	            case 'left':
	                if (isDesktop) {
	                    characterElement.style.top = '60%';
	                    characterElement.style.left = '-109%';
	                    characterElement.style.scale =  '1.5';
	                } else {
	                    characterElement.style.top = '-15%';
	                    characterElement.style.left = '-45%';
	                }
	                break;
	            case 'right':


	                break;
	            case 'bottom':


	                break;
	            case 'top':

	                break;
	            default:
	                console.error('Invalid arrowSide value');
	        }

	        hintTextElement.appendChild(characterElement);
	    }

	    if (buttonCaption && buttonHandler) {
	        const button = document.createElement('button');
	        button.style = `
          -webkit-text-stroke-width: thin;
          -webkit-text-stroke-color: #017416;
          text-shadow: 0px 0.1em #017416;
          cursor:pointer;
          overflow: hidden;
          position: relative;
          font-family: 'Fira Sans', sans-serif;
          font-weight: bold;
          color: #E2E8F0;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(180deg, #28D323 1%, #16BC34 52.5%, #31F02D 100%);
          box-shadow: 0 0.2vw 0.2vw rgba(0, 0, 0, 0.25), inset 0 -0.2vw 0.2vw rgba(25, 158, 38, 0.5), inset -0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0px 0.2vw 0.2vw rgba(25, 158, 38, 0.5);
          border:none;
          
    `;
	        button.className = 'p2w-button-in-text-tutorial p2w-green-button';


	        const innerDiv1 = document.createElement('div');
	        innerDiv1.style = `
  position: absolute;
  height: 50%;
  left: 2%;
  top: 8.5%;
  width: 96%;
  border-radius: 16px;
  background: linear-gradient(180deg, #9CF99A 0%, #46F352 54%, #40E25F 100%);
`;

	// Create the second inner div element
	        const innerDiv2 = document.createElement('div');
	        innerDiv2.style = `
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
        `;
	        innerDiv2.textContent = buttonCaption;


	        button.appendChild(innerDiv1);
	        button.appendChild(innerDiv2);


	        button.addEventListener('click', buttonHandler);
	        hintTextDiv.appendChild(button);
	    } else {
	        hintTextDiv.classList.add('p2w-hint-text-without-button');
	    }
	    hintTextDiv.appendChild(avatarWrapperTutorial);
	    hintTextElement.prepend(hintTextDiv);
	    document.body.appendChild(hintTextElement);


	};
	const resetLocalTutorialStyles = (withGlobal) => {
	    let styles = document.querySelectorAll('.p2w-local-tutorial-styles');
	    styles.forEach(style => style.remove());
	    if (withGlobal) {
	        let global = document.querySelectorAll('.p2w-glob-tutorial-styles');
	        if (global) {
	            global.forEach(style => style.remove());
	        }
	    }
	};

	const hideTutorialHints = () => {
	    uiTutorialHelper.hideHint();
	    uiTutorialHelper.hideHand();
	    resetLocalTutorialStyles();
	};

	const hideHint = () => {
	    const hintTutorial = document.querySelector('.p2w-hint-tutorial');
	    if (hintTutorial) {
	        document.body.removeChild(hintTutorial);
	    }
	};

	const isHintOnScreen = () => {
	    const welcomeTutorial = document.querySelector('.p2w-hint-tutorial');
	    return !!welcomeTutorial
	};


	const tutorialStyles = `
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6TF0.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin-ext */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf6TF0.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    
    @keyframes zoomIn {
      0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
      }
    
      50% {
        opacity: 1;
      }
    }
    
    @keyframes fadeInLeft {
        0% {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
        }
        
        100% {
        opacity: 1;
        transform: none;
        }
    }
    
    .p2w-character-hints-tutorial{
        animation: fadeInLeft 0.5s forwards;
    }

    
    #p2w-hand{
        width: 3.75vw;
        height: 6.302vw;
    }
    
    .p2w-hand-pointing-animation{
        animation: hinge 3s ease infinite;
    }
    
    // .p2w-hand-appearanceAnimation {
    //   animation: fadeIn 1.5s ease;
    // }
    
    .p2w-hint-text {
        opacity: 0;
        animation: fadeIn 1.5s ease 0.4s forwards;
     
    }
    
     .p2w-greeting-text{
        animation: fadeIn 3s ease;
     }
    
    .stars-background-tutorial{
        background-size : 42% 87%;
        animation: fadeIn 4s ease;
    }
    
    .p2w-greeting-image-tutorial{
        animation: zoomIn 1.5s ease;
    
    }
    
    .p2w-exitButton-tutorial{
        // top : 11.5%;
        // right : 37.3%;
        // width : 1.823vw;
        // height : 1.823vw;
    }
    
    .p2w-green-button {
        border-radius: 1vh !important;
        background: linear-gradient(180deg, #28D323 1%, #16BC34 52.5%, #31F02D 100%);
        box-shadow: 0 0.2vw 0.2vw rgba(0, 0, 0, 0.25), inset 0 -0.2vw 0.2vw rgba(25, 158, 38, 0.5), inset -0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0.2vw 0px 0.2vw rgba(25, 158, 38, 0.5), inset 0px 0.2vw 0.2vw rgba(25, 158, 38, 0.5);
    }
    
    .p2w-caption-btn-tutorial{
        bottom : 5%;
        left : 50%;
        width : 13.802vw;
        height : 3.542vw;
        font-size : 1.458vw;
        text-shadow: 0px 0.092vw 0px #017416
    }
    
    .p2w-hint-text{
        color: #E7F0F4;
        font-size: 1.042vw;
        font-family: Fira Sans;
        font-weight: 700;
        word-wrap: break-word;
        padding: 0.642vw;
        box-shadow : 0px 0.3vw 0px black;
        border-radius : 1.296vw; 
        border: 0.188vw solid black;  
    }
    
    
    .p2w-hint-text-without-button.p2w-hint-text{
        padding: 1.8vw;
    }
    .p2w-arrow-hint-img-tutorial{
        height: 1.5vw;
    }
 
    .p2w-button-in-text-tutorial{
        width : 6.5vw;
        height : 2.3vw;
        margin-top : 2.083vw;
        font-size : 0.833vw;
        text-shadow : 0px 0.149vw 0.099vw #017416;
        border-image-slice: 66 fill;
        border-image-width: 4vw;
        border-image-outset: 0vw;
        border-image-repeat: stretch;
        
    }
    
    .p2w-hand-pointing-animation{
        animation: hinge 3s ease infinite;
    }
    
    @media (orientation: portrait) {
        .p2w-green-button {
          border-radius: 1.25vh !important;
          background: linear-gradient(180deg, #28D323 1%, #16BC34 52.5%, #31F02D 100%);
          box-shadow: 0px 0.469vw 0.313vw rgba(0, 0, 0, 0.25), inset 0px -0.313vw 0.313vw rgba(25, 158, 38, 0.5), inset -0.313vw 0px 0.313vw rgba(25, 158, 38, 0.5), inset 0.313vw 0px 0.313vw rgba(25, 158, 38, 0.5), inset 0px 0.313vw 0.313vw rgba(25, 158, 38, 0.5);
        }
        #p2w-hand{
            width: 13.981vw;
            height: 23.519vw;
        }
        .stars-background-tutorial{
            background-size : 155% 87%;
        }
        .p2w-exitButton-tutorial{
            top : 13.5%;
            right : 3%;
            width : 6.852vw;
            height : 6.852vw;
        }
        .p2w-caption-btn-tutorial{
            bottom : 5.5%;
            left : 50%;
            width : 50.556vw;
            height : 12vw;
            font-size : 4.352vw;
            text-shadow: 0px 0.34vw 0px #017416
        }
        .p2w-hint-text{
            font-size: 3.889vw;
            padding: 2vw;
            box-shadow : 0px 0.5vw 0px black;
            border: 0.463vw solid black;
            border-radius: 2.593vw;
        }
        .p2w-arrow-hint-img-tutorial{
            height : 3vw;
        }
        
    
        .p2w-button-in-text-tutorial{
            width : 23.704vw;
            height : 7.778vw;
            margin-bottom : 1.852vw;
            font-size : 3.148vw;
            text-shadow : 0px 0.556vw 0.37vw #017416;
        }
    }
`;

	const uiTutorialHelper = {
	    addTutorialStyles,
	    showHand, hideHand, isHandOnScreen,
	    showWelcomeTutorial, hideWelcomeTutorial, isWelcomeTutorialScreenOpen,
	    showHint, hideHint, isHintOnScreen, hideTutorialHints,
	    calculateHintPositionInPercent, isDesktop, resetLocalTutorialStyles,
	    showHandIfTutorialExist
	};

	var uiHelper_tutorial = /*#__PURE__*/Object.freeze({
		__proto__: null,
		uiTutorialHelper: uiTutorialHelper
	});

	var communicationServiceExports = requireCommunicationService();
	var P2WCommunicationService = /*@__PURE__*/getDefaultExportFromCjs(communicationServiceExports);

	// import Adapter from "./adapter.js";

	class TutorialService {

	    dmClaimButton;
	    claimRewardDmButton;
	    holdPbButton;
	    pbClaimButton;
	    increasePbButton;
	    claimRewardPbButton;
	    offerElement;
	    sorePopUpBuyButton;
	    sorePopUpClaimButton;
	    adapterService;


	    static getInstance(adapter) {
	        if (!TutorialService.instance) {
	            TutorialService.instance = new TutorialService(adapter);
	        }
	        return TutorialService.instance;
	    }


	    setTutorialCoordinates(apiData, element, coordinates) {
	        switch (element) {
	            case 'dmClaimButton': {
	                this.dmClaimButton = coordinates;
	                break;
	            }
	            case 'claimRewardDmButton' : {
	                this.claimRewardDmButton = coordinates;
	                this.showStep5();
	                break;
	            }
	            case'holdPbButton': {
	                this.holdPbButton = coordinates;
	                this.showStep8(apiData);
	                break;
	            }
	            case 'increasePbButton': {
	                this.increasePbButton = coordinates;
	                this.showStep7();
	                break;
	            }
	            case 'pbClaimButton': {
	                this.pbClaimButton = coordinates;
	                this.showStep9();
	                break;
	            }
	            case 'claimRewardPbButton': {
	                this.claimRewardPbButton = coordinates;
	                this.showStep10();
	                break
	            }
	            case 'offerElement': {
	                this.offerElement = coordinates;
	                this.showStep12();
	                break
	            }
	            case 'sorePopUpBuyButton': {
	                this.sorePopUpBuyButton = coordinates;
	                this.showStep13();
	                break;
	            }
	            case 'sorePopUpClaimButton': {
	                this.sorePopUpClaimButton = coordinates;
	                this.showStep14();
	                break;
	            }
	        }
	    }

	    constructor(adapter) {
	        this.adapterService = adapter;
	    }

	    showStep1() {
	        //welcome screen
	        uiTutorialHelper.resetLocalTutorialStyles();
	        uiTutorialHelper.hideHand();
	        this.adapterService.hideBubbleInShadows();
	        this.adapterService.blockCasinoScroll();
	        uiTutorialHelper.showWelcomeTutorial(this.adapterService.apiData?.tutorial?.welcomeS1Cta, () => {
	            uiTutorialHelper.hideWelcomeTutorial();
	            uiTutorialHelper.hideTutorialHints();
	            this.adapterService.resetShadowsOverBubble();
	            this.adapterService.increaseTutorialStep({step: 0});
	            this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorCloseWelcomeScreen');
	            this.adapterService.unblockScroll();
	        }, () => {
	            uiTutorialHelper.hideWelcomeTutorial();
	            uiTutorialHelper.hideTutorialHints();
	            this.adapterService.increaseTutorialStep({step: 0});
	            this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorWelcomeScreenButton');
	            this.showStep2();
	        });
	        setTimeout(() => {
	            const step1WelcomeButton = document.getElementById('step1WelcomeButton');
	            if (step1WelcomeButton) {
	                const positionsButton = step1WelcomeButton.getBoundingClientRect();
	                uiTutorialHelper.showHand({
	                    x: positionsButton.x,
	                    y: positionsButton.y,
	                    width: positionsButton.width,
	                    height: positionsButton.height,
	                }, uiTutorialHelper.isDesktop ? 170 : 120, true, true);
	            }

	            uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.welcomeS1Popup, uiTutorialHelper.calculateHintPositionInPercent({
	                x: 708,
	                y: 215
	            }, {x: 374, y: 1186,},), true, 'left', 50);
	        }, 1000);
	    }

	    showStep2() {
	        this.adapterService.hideBubbleInShadows();
	        uiTutorialHelper.hideTutorialHints();
	        const dmSrc = this.adapterService.clientUri + `/dm?lang=${this.adapterService.userData?.locale ?? 'en'}&userId=${this.adapterService.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
	        this.adapterService.buildIframe(dmSrc);
	        // let interval = setInterval(() => {
	        //     if (this.adapterService.isIframeOpened) {
	        //         const communicationService = P2WCommunicationService.getInstance();
	        //         communicationService.sendMessageToClient({type: 'tutorial', message: 'dmStep1'});
	        //         setTimeout(() => {
	        //             uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.dmS1Popup, uiTutorialHelper.calculateHintPositionInPercent({
	        //                 x: 708,
	        //                 y: 200
	        //             }, {
	        //                 x: 374,
	        //                 y: 1186,
	        //             }), !uiTutorialHelper.isDesktop, 'left', uiTutorialHelper.isDesktop ? 50 : 25, 'Continue', () => {
	        //                 uiTutorialHelper.hideHint();
	        //                 this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorDmS1ContinueButton')
	        //                 this.showStep3();
	        //             });
	        //         }, 1000);
	        //
	        //         clearInterval(interval);
	        //     }
	        // }, 500)


	    }


	    showStep3() {
	        // uiTutorialHelper.hideTutorialHints()
	        // //select timer on the dm
	        // const communicationService = P2WCommunicationService.getInstance();
	        // setTimeout(() => {
	        //     communicationService.sendMessageToClient({type: 'tutorial', message:'dmStep2'});
	        //     uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.dmS2Popup, uiTutorialHelper.calculateHintPositionInPercent({
	        //         x: 812,
	        //         y: 610,
	        //         width: 294
	        //     }, {
	        //         x: 374,
	        //         y: 1186,
	        //     }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'bottom' : 'left', uiTutorialHelper.isDesktop ? 50 : 25, 'Continue', () => {
	        //         uiTutorialHelper.hideHint();
	        //         this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorDmS2ContinueButton')
	        //         this.showStep4();
	        //     });
	        // }, 1000);
	    }

	    showStep4() {
	        // uiTutorialHelper.hideTutorialHints()
	        // //select mission on the dm
	        // const communicationService = P2WCommunicationService.getInstance();
	        // setTimeout(() => {
	        //     communicationService.sendMessageToClient({type: 'tutorial', message:'dmStep3'});
	        //     if (this.dmClaimButton) {
	        //         uiTutorialHelper.showHand({
	        //             x: this.dmClaimButton?.x,
	        //             y: this.dmClaimButton?.y,
	        //             width: this.dmClaimButton.width,
	        //             height: this.dmClaimButton.height
	        //         }, 170, true, true);
	        //     }
	        //     uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.dmS3Popup, uiTutorialHelper.calculateHintPositionInPercent({
	        //         x: 812,
	        //         y: 370,
	        //         width: 294
	        //     }, {
	        //         x: 374,
	        //         y: 1186,
	        //     }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'top' : 'left', uiTutorialHelper.isDesktop ? 80 : 25);
	        // }, 1000);
	    }

	    showStep5() {
	        uiTutorialHelper.hideTutorialHints();
	        if (this.claimRewardDmButton) {
	            uiTutorialHelper.showHand({
	                x: this.claimRewardDmButton?.x,
	                y: this.claimRewardDmButton?.y,
	                width: this.claimRewardDmButton?.width,
	                height: this.claimRewardDmButton?.height,
	                opacity: 50,
	            }, 180, true, true);
	        }
	    }

	    showStep6() {
	        uiTutorialHelper.hideTutorialHints();
	        const pbSrc = this.adapterService.clientUri + `/pb?lang=${this.adapterService.userData?.locale ?? 'en'}&userId=${this.adapterService.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
	        const communicationService = P2WCommunicationService.getInstance();
	        this.adapterService.buildIframe(pbSrc);
	        this.adapterService.iframe.addEventListener('openIframe', () => {
	            communicationService.sendMessageToClient({type: 'tutorial', message: 'initPb' });
	            uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.welcomePbPopup, uiTutorialHelper.calculateHintPositionInPercent({
	                x: 710,
	                y: 195,
	                width: 295
	            }, {
	                x: 374,
	                y: 636,
	            }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 50 : 25, this.adapterService.apiData?.tutorial?.welcomePbCta, () => {
	                uiTutorialHelper.hideTutorialHints();
	                this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorPbWelcomeScreenButton');
	                communicationService.sendMessageToClient({type: 'tutorial', message: 'pbStep1'});
	            });
	        }, {once: true});
	    }


	    showStep7() {
	        uiTutorialHelper.hideTutorialHints();
	        const communicationService = P2WCommunicationService.getInstance();
	        communicationService.sendMessageToClient({type: 'tutorial', message: 'pbStep2'});
	        uiTutorialHelper.showHand({
	            x: this.increasePbButton?.x,
	            y: this.increasePbButton?.y,
	            width: this.increasePbButton?.width,
	            height: this.increasePbButton?.height,
	        }, 170, true, true);
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.pbS1Popup, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 710,
	            y: 195,
	            width: 295
	        }, {
	            x: 374,
	            y: 636,
	        }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 50 : 50);
	    }

	    showStep8() {
	        uiTutorialHelper.hideTutorialHints();
	        const communicationService = P2WCommunicationService.getInstance();
	        communicationService.sendMessageToClient({type: 'tutorial', message: 'pbStep3'});
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.pbS2Popup, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 710,
	            y: 195,
	            width: 295
	        }, {
	            x: 374,
	            y: 636,
	        }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 50 : 50);
	        uiTutorialHelper.showHand({
	            x: this.holdPbButton?.x,
	            y: this.holdPbButton?.y,
	            width: this.holdPbButton?.width,
	            height: this.holdPbButton?.height,
	        }, 170, true, true);
	    }

	    showStep9() {
	        uiTutorialHelper.hideTutorialHints();
	        const communicationService = P2WCommunicationService.getInstance();
	        communicationService.sendMessageToClient({type: 'tutorial', message: 'pbStep4'});
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.pbS3Popup, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 710,
	            y: 195,
	            width: 295
	        }, {
	            x: 374,
	            y: 636,
	        }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 40 : 50);
	        uiTutorialHelper.showHand({
	            x: this.pbClaimButton?.x,
	            y: this.pbClaimButton?.y,
	            width: this.pbClaimButton?.width,
	            height: this.pbClaimButton?.height,
	        }, 170, true, true);
	    }

	    showStep10() {
	        // uiTutorialHelper.hideTutorialHints()
	        // uiTutorialHelper.addTutorialStyles()
	        if (this.claimRewardPbButton) {
	            uiTutorialHelper.showHand({
	                x: this.claimRewardPbButton?.x,
	                y: this.claimRewardPbButton?.y,
	                width: this.claimRewardPbButton?.width,
	                height: this.claimRewardPbButton?.height,
	                opacity: 50,
	            }, 170, true, true);
	        }
	    }

	    showStep11() {
	        // uiTutorialHelper.hideTutorialHints()
	        uiTutorialHelper.addTutorialStyles();
	        const storeSrc = this.adapterService.clientUri + `/store?lang=${this.adapterService.userData?.locale ?? 'en'}&userId=${this.adapterService.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
	        this.adapterService.buildIframe(storeSrc);
	        this.adapterService.iframe.addEventListener('openIframe', () => {
	            const communicationService = P2WCommunicationService.getInstance();
	            communicationService.sendMessageToClient({type: 'tutorial', message:'offerStep1'});
	        }, {once: true});
	    }

	    showStep12() {
	        uiTutorialHelper.hideTutorialHints();
	        uiTutorialHelper.showHand({
	            x: this.offerElement?.x,
	            y: this.offerElement?.y,
	            width: this.offerElement?.width,
	            height: this.offerElement?.height,
	        }, 170, true, true);
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.welcomeSorePopup, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 912,
	            y: 290,
	            width: 295
	        }, {
	            x: 374,
	            y: 1183,
	        }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 50 : 50);

	    }

	    showStep13() {
	        uiTutorialHelper.hideTutorialHints();
	        // uiTutorialHelper.showHand({
	        //     x: this.sorePopUpBuyButton?.x,
	        //     y: this.sorePopUpBuyButton?.y,
	        //     width: this.sorePopUpBuyButton?.width,
	        //     height: this.sorePopUpBuyButton?.height,
	        //     opacity: 50
	        // }, 170, true, true);
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.storeS1Popup, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 811,
	            y: 60,
	            width: 295
	        }, {
	            x: 364,
	            y: 123,
	        }), !uiTutorialHelper.isDesktop, uiTutorialHelper.isDesktop ? 'bottom' : 'left', uiTutorialHelper.isDesktop ? 50 : 50);
	    }

	    showStep14() {
	        uiTutorialHelper.hideTutorialHints();
	        this.adapterService.apiData.general.balance = this.adapterService.apiData.store.offers[0].price;
	        this.adapterService.apiData.tutorial.step = 100;

	        const communicationService = P2WCommunicationService.getInstance();
	        communicationService.sendMessageToClient({
	            type: 'offerClaim',
	            message: {
	                store:  this.adapterService.apiData.store.offers[0],
	                general: this.adapterService.apiData.general,
	                result: {success: true},
	                type: 'offerClaim',
	            },
	            result: {success: true},
	        });
	    }


	    showStep15() {
	        uiTutorialHelper.hideTutorialHints();
	        let bell = document.querySelector('.notification-center__button');
	        let handleBellClick;
	        if (bell) {
	            const positionBell = bell.getBoundingClientRect();
	            handleBellClick = (e) => {
	                this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorOfferS3BellButton');
	                uiTutorialHelper.hideTutorialHints();
	                bell.removeEventListener('click', handleBellClick);
	            };
	            bell.addEventListener('click', handleBellClick);
	            uiTutorialHelper.showHand({
	                x: positionBell?.x,
	                y: positionBell?.y,
	                width: positionBell?.width,
	                height: positionBell?.height,
	            }, 70, true, true);
	        }

	        const handleDocumentClick = () => {
	            uiTutorialHelper.hideTutorialHints();
	            this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'clickTutorOfferS3Away');
	            document.removeEventListener('click', handleDocumentClick);
	        };
	        document.addEventListener('click', handleDocumentClick);
	        uiTutorialHelper.showHint(this.adapterService.apiData?.tutorial?.endStorePopUp, uiTutorialHelper.calculateHintPositionInPercent({
	            x: 1074,
	            y: 48,
	            width: 295
	        }, {
	            x: 364,
	            y: 507,
	        }), true, uiTutorialHelper.isDesktop ? 'left' : 'left', uiTutorialHelper.isDesktop ? 50 : 50);

	        setTimeout(() => {
	            uiTutorialHelper.hideTutorialHints();
	            document?.removeEventListener('click', handleDocumentClick);
	            bell?.removeEventListener('click', handleBellClick);
	        }, 6000);
	    }
	}

	const getScriptCode = (userId) => "var initOpts = {\n" +
	    `    projectKey: "${"UvRL2VJUYPOAqO9l97ui"}",
` +
	    `    ingestPoint: "${"https://or.getmoon.win/ingestz"}",
` +
	    "    crossdomain: {enabled: true},\n" +
	    "    captureIFrames: true,\n" +
	    "    defaultInputMode: 2,\n" +
	    "    obscureTextNumbers: false,\n" +
	    "    obscureTextEmails: true,\n" +
	    "  };\n" +
	    `  var startOpts = { userID: "${userId}-casino" };
` +
	    "  (function(A,s,a,y,e,r){\n" +
	    "    r=window.OpenReplay=[e,r,y,[s-1, e]];\n" +
	    "    s=document.createElement('script');s.src=A;s.async=!a;\n" +
	    "    document.getElementsByTagName('head')[0].appendChild(s);\n" +
	    "    r.start=function(v){r.push([0])};\n" +
	    "    r.stop=function(v){r.push([1])};\n" +
	    "    r.setUserID=function(id){r.push([2,id])};\n" +
	    "    r.setUserAnonymousID=function(id){r.push([3,id])};\n" +
	    "    r.setMetadata=function(k,v){r.push([4,k,v])};\n" +
	    "    r.event=function(k,p,i){r.push([5,k,p,i])};\n" +
	    "    r.issue=function(k,p){r.push([6,k,p])};\n" +
	    "    r.isActive=function(){return false};\n" +
	    "    r.getSessionToken=function(){};\n" +
	    "  })(\"//static.openreplay.com/14.0.1/openreplay.js\",1,0,initOpts,startOpts);";

	const setupOpenReplay = (userId) => {
	    var script = document.createElement("script");
	    script.innerHTML = getScriptCode(userId);
	    document.head.appendChild(script);
	};

	const trackingHelper = {setupOpenReplay};

	var tracking_helper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		trackingHelper: trackingHelper
	});

	const addWidgetStyles = (localStyles) => {
	    const styleElement = document.createElement('style');
	    styleElement.classList.add('p2w-widget-styles');
	    if (localStyles) {
	        styleElement.classList.add('p2w-widget-local-styles');
	        styleElement.textContent = localStyles;
	    } else {
	        styleElement.textContent = widgetStyles;
	    }
	    document.head.appendChild(styleElement);
	};


	const createWidget = (isAddedAnimation, progressStatus, widgetIconUrl, adapterService, dmSrc, widgetCollectTitle, isFirstShow) => {
	    const widgetContainer = document.createElement('button');
	    widgetContainer.classList.add('p2w-widget');
	    widgetContainer.id = 'p2w-widget';
	    if (isAddedAnimation) {
	        widgetContainer.classList.add('p2w-widget-animation');
	    }

	    setWidgetToLocalStoragePosition(widgetContainer);
	    createWidgetElements(widgetContainer, progressStatus, widgetIconUrl);
	    let wrapper = document.querySelector('#contact');
	    if(wrapper) {
	        wrapper.appendChild(widgetContainer);
	    } else {
	        widgetContainer.style.position = 'fixed';
	        document.body.appendChild(widgetContainer);
	    }
	    setProgress(isFirstShow ? 0 : progressStatus?.progress, progressStatus?.maxProgress, adapterService, dmSrc, widgetCollectTitle, false);
	};


	const createWidgetElements = (widgetButton, {progress, maxProgress}, iconUrl) => {

	    const widgetBody = document.createElement('div');
	    widgetBody.classList.add('p2w-local-widget-arrow-hint');
	    // widgetBody.classList.add('p2w-widget-arrow-first-show')
	    widgetBody.style.animation = 'none';
	    widgetBody.style.width = '0';

	    widgetBody.innerHTML += `
        <svg class="p2w-widget-container-arrow" viewBox="0 0 963 226" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-outside-1_3001_104" maskUnits="userSpaceOnUse" x="0" y="0" width="963" height="226" fill="black">
                <rect fill="white" width="963" height="226"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M78 4C66.9543 4 58 12.9543 58 24V68H24C12.9543 68 4 76.9543 4 88V138C4 149.046 12.9543 158 24 158H58V202C58 213.046 66.9543 222 78 222H959V4H78Z"/>
            </mask>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M78 4C66.9543 4 58 12.9543 58 24V68H24C12.9543 68 4 76.9543 4 88V138C4 149.046 12.9543 158 24 158H58V202C58 213.046 66.9543 222 78 222H959V4H78Z" fill="black" fill-opacity="0.8"/>
            <path d="M58 68V72H62V68H58ZM58 158H62V154H58V158ZM959 222V226H963V222H959ZM959 4H963V0H959V4ZM62 24C62 15.1634 69.1634 8 78 8V0C64.7452 0 54 10.7452 54 24H62ZM62 68V24H54V68H62ZM24 72H58V64H24V72ZM8 88C8 79.1634 15.1634 72 24 72V64C10.7452 64 0 74.7452 0 88H8ZM8 138V88H0V138H8ZM24 154C15.1634 154 8 146.837 8 138H0C0 151.255 10.7452 162 24 162V154ZM58 154H24V162H58V154ZM62 202V158H54V202H62ZM78 218C69.1634 218 62 210.837 62 202H54C54 215.255 64.7452 226 78 226V218ZM959 218H78V226H959V218ZM955 4V222H963V4H955ZM78 8H959V0H78V8Z" fill="white" fill-opacity="0.25" mask="url(#path-1-outside-1_3001_104)"/>
            <path class=" p2w-arrow" style="pointer-events: none;" fill-rule="evenodd" clip-rule="evenodd" d="M35.9134 111.671C35.9334 111.801 35.9634 111.931 35.9834 112.061C35.9934 112.201 35.9934 112.351 35.9934 112.501C35.9934 112.651 35.9934 112.791 35.9834 112.941C35.9734 113.071 35.9434 113.201 35.9134 113.331C35.8834 113.491 35.8534 113.651 35.8034 113.811C35.7734 113.921 35.7234 114.021 35.6834 114.121C35.6134 114.301 35.5334 114.481 35.4434 114.651C35.4234 114.681 35.4134 114.721 35.4034 114.751L24.4034 133.761C23.1634 135.911 20.4134 136.641 18.2534 135.401C16.0934 134.161 15.3634 131.411 16.6034 129.271L26.3034 112.511L16.6134 95.7412C15.3734 93.5912 16.1134 90.8412 18.2634 89.6012C20.4134 88.3612 23.1734 89.1012 24.4134 91.2512L35.4134 110.261C35.4134 110.261 35.4434 110.321 35.4534 110.361C35.5434 110.531 35.6234 110.711 35.6934 110.891C35.7334 110.991 35.7734 111.101 35.8134 111.201C35.8634 111.361 35.8934 111.521 35.9234 111.681L35.9134 111.671Z" fill="#FAFA28"/>
            <rect class="handleClickArrow" style="cursor: pointer; pointer-events: all;"  width="80" height="92" x="4" y="68" rx="20" ry="20" fill="none" />
            <rect class="widgetInfoBody" style="pointer-events: all;" width="920" height="220" x="55" y="4" rx="20" ry="20" fill="none" />
        </svg>
    `;

	    const bodyTextWrapper = document.createElement('div');
	    bodyTextWrapper.classList.add('p2w-local-widget-arrow-hint-text-wrapper');

	    const bodyTextInner = document.createElement('div');
	    bodyTextInner.classList.add('p2w-local-widget-arrow-hint-text');

	    bodyTextWrapper.appendChild(bodyTextInner);
	    widgetBody.appendChild(bodyTextWrapper);
	    widgetButton.appendChild(widgetBody);


	    const widgetElements = document.createElement('div');
	    widgetElements.classList.add('p2w-widget-wrapper-progress-counter');
	    widgetElements.style.opacity = '0';

	    let svgAnimation = document.createElement('object');
	    svgAnimation.type = 'image/svg+xml';
	    svgAnimation.data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg class="p2w-progress-svg" viewBox="0 0 222 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M28 8H194C205.05 8 214 16.95 214 28V42C214 53.05 205.05 62 194 62H28C16.95 62 8 53.05 8 42L8 28C8 16.95 16.95 8 28 8Z"
                  fill="#090728" fill-opacity="0.8"/>
            <g filter="url(#filter0_ii_1710_10345)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M194 68H28C13.64 68 2 56.36 2 42V28C2 13.64 13.64 2 28 2H194C208.36 2 220 13.64 220 28V42C220 56.36 208.36 68 194 68ZM214 28C214 16.95 205.05 8 194 8H28C16.95 8 8 16.95 8 28V42C8 53.05 16.95 62 28 62H194C205.05 62 214 53.05 214 42V28Z"
                      fill="url(#paint0_linear_1710_10345)"/>
            </g>
            <path d="M28 69H194C208.912 69 221 56.9123 221 42V28C221 13.0877 208.912 1 194 1H28C13.0877 1 1 13.0877 1 28V42C1 56.9123 13.0877 69 28 69ZM194 9C204.498 9 213 17.5023 213 28V42C213 52.4977 204.498 61 194 61H28C17.5023 61 9 52.4977 9 42V28C9 17.5023 17.5023 9 28 9H194Z"
                  stroke="#090728" stroke-opacity="0.6" stroke-width="2"/>
            <defs>
                <filter id="filter0_ii_1710_10345" x="-1" y="-1" width="224" height="72" filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dx="1" dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0.8 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1710_10345"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset dx="-1" dy="-1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0.8 0"/>
                    <feBlend mode="normal" in2="effect1_innerShadow_1710_10345" result="effect2_innerShadow_1710_10345"/>
                </filter>
                <linearGradient  id="paint0_linear_1710_10345" x1="111" y1="2" x2="111" y2="76" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFA20"/>
                    <stop offset="0.269" stop-color="#F9C200"/>
                    <stop offset="0.719" stop-color="#F9C703"/>
                    <stop offset="1" stop-color="#F6F220"/>
                </linearGradient>
            </defs>
        </svg>
    `);
	    widgetElements.appendChild(svgAnimation);


	    const progressBarContainer = document.createElement('div');
	    progressBarContainer.classList.add('p2w-widget-container-progress-bar');
	    progressBarContainer.id = 'p2w-widget-container-progress-bar';

	    progressBarContainer.innerHTML += `
        <svg style="width: 100%; height: 100%;" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.8" cx="111" cy="111.5" r="109" fill="#090728"/>
        <mask id="path-2-outside-1_1692_8033" maskUnits="userSpaceOnUse" x="0" y="0.5" width="222" height="222" fill="black">
        <rect fill="white" y="0.5" width="222" height="222"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M111 220.5C171.199 220.5 220 171.699 220 111.5C220 51.301 171.199 2.5 111 2.5C50.801 2.5 2 51.301 2 111.5C2 171.699 50.801 220.5 111 220.5ZM111 213.5C167.333 213.5 213 167.833 213 111.5C213 55.167 167.333 9.5 111 9.5C54.667 9.5 9 55.167 9 111.5C9 167.833 54.667 213.5 111 213.5Z"/>
        </mask>
        <g filter="url(#filter0_ii_1692_8033)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M111 220.5C171.199 220.5 220 171.699 220 111.5C220 51.301 171.199 2.5 111 2.5C50.801 2.5 2 51.301 2 111.5C2 171.699 50.801 220.5 111 220.5ZM111 213.5C167.333 213.5 213 167.833 213 111.5C213 55.167 167.333 9.5 111 9.5C54.667 9.5 9 55.167 9 111.5C9 167.833 54.667 213.5 111 213.5Z" fill="url(#paint0_linear_1692_8033)"/>
        </g>
        <path d="M218 111.5C218 170.594 170.094 218.5 111 218.5V222.5C172.304 222.5 222 172.804 222 111.5H218ZM111 4.5C170.094 4.5 218 52.4055 218 111.5H222C222 50.1964 172.304 0.5 111 0.5V4.5ZM4 111.5C4 52.4055 51.9055 4.5 111 4.5V0.5C49.6964 0.5 0 50.1964 0 111.5H4ZM111 218.5C51.9055 218.5 4 170.594 4 111.5H0C0 172.804 49.6964 222.5 111 222.5V218.5ZM211 111.5C211 166.728 166.228 211.5 111 211.5V215.5C168.438 215.5 215 168.938 215 111.5H211ZM111 11.5C166.228 11.5 211 56.2715 211 111.5H215C215 54.0624 168.438 7.5 111 7.5V11.5ZM11 111.5C11 56.2715 55.7715 11.5 111 11.5V7.5C53.5624 7.5 7 54.0624 7 111.5H11ZM111 211.5C55.7715 211.5 11 166.728 11 111.5H7C7 168.938 53.5624 215.5 111 215.5V211.5Z" fill="#090728" fill-opacity="0.8" mask="url(#path-2-outside-1_1692_8033)"/>
        <defs>
        <filter id="filter0_ii_1692_8033" x="-1" y="-0.5" width="224" height="224" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="1" dy="1"/>
        <feGaussianBlur stdDeviation="0.5"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1692_8033"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="-1" dy="-1"/>
        <feGaussianBlur stdDeviation="0.5"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="effect1_innerShadow_1692_8033" result="effect2_innerShadow_1692_8033"/>
        </filter>
        <linearGradient id="paint0_linear_1692_8033" x1="111" y1="2.5" x2="111" y2="220.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFFA20"/>
        <stop offset="0.505" stop-color="#F9C200"/>
        <stop offset="1" stop-color="#F6F220"/>
        </linearGradient>
        </defs>
        </svg>
    `;

	    // if (claimStatus.status === 'Attention' || claimStatus.dataStatus === 'widgetWarningMessageAttention') {
	    //     const notificationAlert = document.createElement('div')
	    //     notificationAlert.classList.add('p2w-widget-notification-alert');
	    //     progressBarContainer.appendChild(notificationAlert);
	    // }

	    const progressBar = document.createElement('div');
	    progressBar.style.transition = 'all 1s ease';
	    progressBar.id = 'p2w-progress';


	    const progressBarInnerImage = document.createElement('div');
	    progressBarInnerImage.classList.add('p2w-widget-progress-bar-image');
	    const bgProgressCounter = document.createElement('div');
	    bgProgressCounter.classList.add('p2w-widget-progress-bar-color');

	    if (!!iconUrl) {
	        progressBarInnerImage.style.backgroundImage = `url(https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/p2w/mission-logos/${iconUrl})`;
	        progressBarInnerImage.style.borderRadius = '50%';
	        progressBarInnerImage.style.backgroundSize = 'cover';
	    } else {
	        let progressBarInnerSvg = document.createElement('object');
	        progressBarInnerSvg.id = 'progressBarInnerSvg';
	        progressBarInnerSvg.type = 'image/svg+xml';
	        progressBarInnerSvg.data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg style="width: 100%; height: 100%" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="24.8706" y="19.0185" width="109.722" height="119.204" fill="url(#pattern0_24_1027)"/>
    <defs>
    <pattern id="pattern0_24_1027" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_24_1027" transform="matrix(0.00380228 0 0 0.00349983 0 -0.000475206)"/>
    </pattern>
        <image id="image0_24_1027" width="263" height="286" xlink:href="data:image/png;base64,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"/>
         </defs>
    </svg>`);
	        progressBarInnerImage.appendChild(progressBarInnerSvg);
	    }
	    progressBar.appendChild(progressBarInnerImage);


	    progressBar.appendChild(bgProgressCounter);
	    progressBarContainer.appendChild(progressBar);


	    widgetButton.appendChild(progressBarContainer);

	    const textProgressCounter = document.createElement('div');
	    textProgressCounter.id = 'p2w-textProgress';
	    textProgressCounter.classList.add('p2w-widget-text-progress-counter');
	    // textProgressCounter.classList.add('p2w-widget-animation-seeker');
	    widgetElements.appendChild(textProgressCounter);
	    addWidgetStyles();
	    widgetButton.appendChild(widgetElements);
	};

	const createWarning = (isMissionComplete = false) => {
	    const progressBarContainer = document.body.querySelector('#p2w-widget-container-progress-bar');
	    const lastNotificationAlert = document.querySelector('.p2w-widget-notification-alert');
	    if (progressBarContainer) {
	        const notificationAlert = document.createElement('div');
	        notificationAlert.classList.add('p2w-widget-notification-alert');
	        if(!lastNotificationAlert) {
	            progressBarContainer.appendChild(notificationAlert);
	        }
	        if(!isMissionComplete) {
	            document.querySelector('.p2w-local-widget-arrow-hint')?.classList.add('p2w-attention');
	        }
	    }
	};


	function updateProgressBar(progressPercent) {
	    const progressBar = document.querySelector('[role="progressbar"]');
	    const currentPercentage = parseFloat(getComputedStyle(progressBar).getPropertyValue('--percentage')) || 0;

	    const keyframes = `
                @keyframes dynamicProgress {
                    0% { --percentage: ${currentPercentage}; }
                    100% { --percentage: ${progressPercent}; }
                }
            `;

	    const existingStyle = document.getElementById('dynamicProgressKeyframes');
	    if (existingStyle) {
	        existingStyle.remove();
	    }

	    const styleSheet = document.createElement("style");
	    styleSheet.type = "text/css";
	    styleSheet.id = "dynamicProgressKeyframes";
	    styleSheet.innerText = keyframes;
	    document.head.appendChild(styleSheet);

	    progressBar.style.animation = 'none';
	    void progressBar.offsetWidth;
	    const adjustedProgress = progressPercent <= 99 ? progressPercent : 100;
	    const finalProgress = adjustedProgress >= 1 ? progressPercent : 10;
	    const calculateTime = (1.5 / 100) * finalProgress;
	    progressBar.style.animation = `dynamicProgress ${calculateTime}s  forwards`;

	    progressBar.style.setProperty('--value', progressPercent);
	    return calculateTime
	}

	const setWidgetToLocalStoragePosition = (widget) => {
	    if (!widget) {
	        widget = document.querySelector('#p2w-widget');
	    }
	    const pageWidth = window.innerWidth;
	    const pageHeight = window.innerHeight;
	    let widgetPositions;
	    if (pageWidth < pageHeight) {
	        //mobile
	        widgetPositions = JSON.parse(window.localStorage.getItem('widgetPositionsPortrait'));
	    } else {
	        //desktop
	        widgetPositions = JSON.parse(window.localStorage.getItem('widgetPositionsLandscape'));
	    }
	    if (widgetPositions && widgetPositions?.diffX !== 0) {
	        widget.style.bottom = '';
	        widget.style.right = '';
	        if (0 < widgetPositions.diffX && pageWidth > widgetPositions.diffX) {
	            widget.style.left = widgetPositions.diffX + 'px';
	        } else {
	            if (pageWidth < pageHeight) {
	                window.localStorage.removeItem('widgetPositionsPortrait');
	            } else {
	                window.localStorage.removeItem('widgetPositionsLandscape');
	            }
	        }
	        if (0 < widgetPositions.diffY && pageHeight > widgetPositions.diffY) {
	            widget.style.top = widgetPositions.diffY + 'px';
	        } else {
	            if (pageWidth < pageHeight) {
	                window.localStorage.removeItem('widgetPositionsPortrait');
	            } else {
	                window.localStorage.removeItem('widgetPositionsLandscape');
	            }
	        }
	    }
	};


	const setCompletedStylesToWidget = (delay) => {
	    const progressBarContainer = document.querySelector('.p2w-widget-container-progress-bar');
	    const previousAttentionSeeker = document.querySelector('.p2w-widget-attention');

	    if (progressBarContainer && !previousAttentionSeeker) {
	        const attentionSeeker = document.createElement('div');
	        attentionSeeker.classList.add('p2w-widget-attention');

	        const firstCircleAnimation = document.createElement('img');
	        firstCircleAnimation.src = 'https://p2w.imgix.net/resources/client/tutorial/Subtract.svg?auto=compress&auto=format';
	        firstCircleAnimation.className = 'p2w-widget-circle';
	        firstCircleAnimation.style.position = 'absolute';

	        firstCircleAnimation.style.height = '100%';
	        firstCircleAnimation.style.pointerEvents = 'none';
	        firstCircleAnimation.style.scale = '0';

	        const secondCircleAnimationWithDelay = document.createElement('img');
	        secondCircleAnimationWithDelay.src = 'https://p2w.imgix.net/resources/client/tutorial/Subtract.svg?auto=compress&auto=format';
	        secondCircleAnimationWithDelay.className = 'p2w-widget-circle-after';
	        secondCircleAnimationWithDelay.style.position = 'absolute';

	        secondCircleAnimationWithDelay.style.height = '100%';
	        secondCircleAnimationWithDelay.style.pointerEvents = 'none';
	        secondCircleAnimationWithDelay.style.scale = '0';

	        const delayForSecondElement = delay ? delay + 300 : 300;
	        firstCircleAnimation.style.animation = `circleBlow 3s ${delay ? delay : 0}ms  cubic-bezier(0, 0, 0, 1)  infinite`;
	        secondCircleAnimationWithDelay.style.animation = `circleBlow 3s ${delayForSecondElement}ms cubic-bezier(0, 0, 0, 1)  infinite`;
	        // secondCircleAnimationWithDelay.style.animationDelay = '0.3s'

	        attentionSeeker.appendChild(firstCircleAnimation);
	        attentionSeeker.appendChild(secondCircleAnimationWithDelay);
	        progressBarContainer.appendChild(attentionSeeker);
	    }
	};


	const setProgressText = (text) => {
	    const textProgress = document.getElementById('p2w-textProgress');
	    if (textProgress) {
	        textProgress.textContent = text;
	    }
	};

	const addEventListenerToCollect = (adapterService, dmSrc, progressPercent, rewriteWidget, timeOutArray) => {
	    let timeOutHandler;
	    const textProgressCounter = document.getElementById('p2w-textProgress');
	    const widgetContainer = document.getElementById('p2w-widget-container-progress-bar');

	    const handleClickWidgetBody = () => {
	        if (progressPercent === '100') {
	            adapterService.trackEvent(adapterService.apiKey, adapterService.externalId, 'widgetClickCompletedOpenDm');
	        } else {
	            adapterService.trackEvent(adapterService.apiKey, adapterService.externalId, 'widgetClickUnfinishedOpenDm');
	        }
	        const circleAttention = document.querySelector('.p2w-widget-attention');
	        if (circleAttention) {
	            circleAttention.remove();
	        }
	        adapterService.buildIframe(dmSrc);
	        const notificationAlert = document.querySelector('.p2w-widget-notification-alert');
	        const attention = document.querySelector('.p2w-local-widget-arrow-hint');
	        if (notificationAlert && !attention?.classList.contains('p2w-attention')) {
	            notificationAlert.remove();
	        }
	        adapterService.apiData.tutorial.step = 100;
	            document.querySelector(".sticky-casino").scrollIntoView({
	                behavior: "smooth"
	            });
	        if (rewriteWidget) {
	            clearTimeout(timeOutHandler);
	            // rewriteWidget(true, 'changeData')
	            // this.adapterService.buildIframe(dmSrc)
	        }
	    };
	    if (textProgressCounter && widgetContainer) {
	        textProgressCounter.style.cursor = 'pointer';
	        widgetContainer.style.cursor = 'pointer';
	        widgetContainer.addEventListener('click',  handleClickWidgetBody);
	        textProgressCounter.addEventListener('click',  handleClickWidgetBody);
	    }
	};


	const setProgress = (progress, maxProgress, adapterService, dmSrc, widgetCollectTitle, isUpdateProgress = true, rewriteWidget, timeOutArray) => {
	    const betAlert = document.querySelector('.p2w-widget-notification-alert');
	    const attention = document.querySelector('.p2w-local-widget-arrow-hint');
	    if (betAlert && attention?.classList.contains('p2w-attention')) {
	        betAlert.remove();
	        attention.classList.remove('p2w-attention');
	    }
	    const progressPercent = (+progress / +maxProgress * 100).toString();
	    let progressElement = document.getElementById('p2w-progress');
	    addEventListenerToCollect(adapterService, dmSrc, progressPercent, rewriteWidget);

	    if (progressElement) {
	        progressElement.setAttribute('role', 'progressbar');
	        progressElement.setAttribute('aria-valuenow', progressPercent);
	        progressElement.setAttribute('aria-valuemin', '0');
	        progressElement.setAttribute('aria-valuemax', '100');
	        progressElement.style.setProperty('--value', progressPercent);

	        if (progressPercent === '100') {

	            if (isUpdateProgress) {
	                let timeoutToUpdateProgressBar = updateProgressBar(progressPercent);
	                setTimeout(() => {
	                    progressElement.style.setProperty('--primary', 'hsl(128 99% 35%), hsl(125 94% 41%), hsl(118 95% 49%), hsl(125 94% 41%), hsl(128 99% 35%)');
	                    setProgressText(widgetCollectTitle);
	                }, timeoutToUpdateProgressBar * 1000);
	            } else {
	                let timeoutToUpdateProgressBar = updateProgressBar(progressPercent);
	                setTimeout(() => {
	                    setTimeout(() => {
	                        progressElement.style.setProperty('--primary', 'hsl(128 99% 35%), hsl(125 94% 41%), hsl(118 95% 49%), hsl(125 94% 41%), hsl(128 99% 35%)');
	                    }, 400);
	                    setProgressText(widgetCollectTitle);
	                    runHeartBeatAnimation(700);
	                    setCompletedStylesToWidget();
	                }, timeoutToUpdateProgressBar * 600);
	            }
	        } else {
	            progressElement.style.setProperty('--primary', 'hsl(220 100% 70%), hsl(220 100% 40%), hsl(220 100% 70%)');
	            if (isUpdateProgress) {
	                runHeartBeatAnimation();
	                setTimeout(() => {
	                    let timeoutToUpdateProgressBar = updateProgressBar(progressPercent);
	                    setTimeout(() => {
	                        setProgressText(`${progress}/${maxProgress}`);
	                    }, timeoutToUpdateProgressBar * 1000);
	                }, 600);
	            } else {
	                updateProgressBar(progressPercent);
	                setProgressText(`${progress}/${maxProgress}`);
	            }
	        }
	    }
	};

	const runHeartBeatAnimation = (delay) => {
	    const widget = document.querySelector('#p2w-widget-container-progress-bar');
	    if (widget.classList.contains('p2w-widget-heart-beat')) {
	        widget.classList.remove('p2w-widget-heart-beat');
	        const styles = document.querySelectorAll('.p2w-widget-local-styles');
	        if (styles) {
	            styles.forEach(style => style.remove());
	        }
	    }

	    setTimeout(() => {
	        widget.classList.add('p2w-widget-heart-beat');
	        let currentTransform = getComputedStyle(widget).transform;
	        if (currentTransform === 'none') {
	            currentTransform = '';
	        }

	        const heartBeat = `
                    @keyframes heartBeat {
                      0% {
                        transform: ${currentTransform} scale(1);
                      }
                    
                      14% {
                        transform: ${currentTransform}  scale(1.1);
                      }
                    
                      28% {
                        transform: ${currentTransform} scale(1);
                      }
                    
                      42% {
                        transform: ${currentTransform} scale(1.1);
                      }
                    
                      70% {
                        transform: ${currentTransform} scale(1);
                      }
                    }
                    `;
	        addWidgetStyles(heartBeat);
	        if (!!delay) {
	            widget.style.animationDelay = `${delay}ms`;
	        }
	    }, 0);
	};

	const widgetStyles = `
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5Vvl4jL.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    /* latin-ext */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjLeTY.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin-ext */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6TF0.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eSBf6TF0.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin-ext */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eSBf6TF0.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_eRhf6.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    


    @keyframes bounceIn {
        from,
        33%,
        66%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }
        
        33% {
            transform: scale3d(1.1, 1.1, 1.1);
        }
        
        66% {
            transform: scale3d(0.9, 0.9, 0.9);
        }
        
        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }


    @keyframes warning-bounce {
        from,
        33%,
        66%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }
        
        33% {
            transform: scale3d(1.1, 1.1, 1.1);
        }
        
        66% {
            transform: scale3d(0.9, 0.9, 0.9);
        }
        
        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }
        
    


    @keyframes circleBlow {
        0% {scale:0;      transform-origin: center center;  animation-timing-function: linear; } 
        22% {scale:0; opacity: 1;        transform-origin: center center;  animation-timing-function: linear; } 
        32% {scale:1; opacity: 1;        transform-origin: center center;   animation-timing-function: linear; }
        
        47% {scale:2; opacity: 0;        transform-origin: center center;   animation-timing-function: linear; }
        48% {scale: 0; opacity: 0;        transform-origin: center center;   }
        72% {scale:0; opacity: 1;       transform-origin: center center;   animation-timing-function: linear; } 
        82% {scale:1; opacity: 1;        transform-origin: center center;   animation-timing-function: linear; }
        
        97% {scale:2;  opacity: 0;       transform-origin: center center;  animation-timing-function: linear; } 
        100% {scale:0; opacity: 0;       transform-origin: center center;  } 
    }
    
    
   
   @keyframes opacity {
        from{
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes warning-blinking{
        0% {
            box-shadow: 0 0 #db0909;
            transform: scale(1.2);
            animation-timing-function: ease-out;
        }
        
        70% {
            box-shadow: 0 0 0 10px #5f00;
            transform: scale(1.1);
        }
        
        
        100% {
            box-shadow: 0 0 #5f00;
            transform: scale(1);
            animation-timing-function: ease-in;
        }
    
    }
    
    
    @keyframes backwardOpacity {
        from{
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    


    @keyframes openWidget {
         from {
            opacity: 1;
        }
        to% {
            opacity: 1;
        }
    }
    
    
    @keyframes closeWidget {
     from {
            opacity: 1;
        }
        to% {
            opacity: 1;
        }
    }
    
    
    @keyframes openReverseWidget {
         from {
            opacity: 1;
        }
        to% {
            opacity: 1;
        }
    }
    
    @keyframes closeReverseWidget {
        from {
            opacity: 1;
        }
        to% {
            opacity: 1;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 1;
            transform: translate(-250%, 0px) rotate(35deg);
        }
        to {
            transform: translate(800%, 0px) rotate(35deg);
        }
    }

<!--    .p2w-widget-text-progress-counter:before {-->
<!--        background: linear-gradient(to right, #fdfcf200, #fdfcf2);-->
<!--        content: "";-->
<!--        height: 300%;-->
<!--        will-change: transform;-->
<!--        position: absolute;-->
<!--        width: 30%;-->
<!--        animation: slideIn 2s  both;-->
<!--        animation-delay: 0.75s;-->
<!--        z-index: 0;-->
<!--        left: 0;-->
<!--    }-->
<!--    .p2w-widget-animation-seeker:before {-->
<!--        background: linear-gradient(to right, #fdfcf200, #fdfcf2);-->
<!--        content: "";-->
<!--        height: 300%;-->
<!--        will-change: transform;-->
<!--        position: absolute;-->
<!--        width: 30%;-->
<!--        animation: slideIn 2s infinite;-->
<!--        animation-delay: 2.5s;-->
<!--        z-index: 0;-->
<!--        left: 0;-->
<!--        opacity: 0;-->
<!--    }-->
    
    @keyframes showWidgetDraggable {
      0% {
        transform: scale(0);
       
        opacity: 1;
      
      }
      2.5% {
        transform: scale(0.5) rotate(0deg);
        
      
      }
      5%{
        transform: scale(1) rotate(60deg);
       
      
      }
      10% {
        transform: scale(1) rotate(180deg);
       
        
      }
      80% {    
        transform: scale(1) rotate(180deg);
        filter: blur(0px);
        
       
      }
      90% {
        transform: scale(1.5) rotate(360deg);
        filter: blur(5px);
        opacity: 1;
       
      }
      100% {
        transform: scale(2) rotate(520deg);
        filter: blur(10px);
        opacity: 0;
      }
    }
    
    @keyframes blinkOfAttention {
        0%{
            opacity: 0;
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        } 
    }
    
    


    #p2w-widget {
        border-radius: 28px;
        position: absolute;
        right: 20px;
        bottom: 9.5vh;
        z-index: 1049;
        width: 222px;
        height: 67px;
        border: 0;
        color: transparent;
        margin: 0;
        padding: 0;
        background-color: transparent;
    }  
    
    #p2w-widget,
    #p2w-widget *{
        -webkit-touch-callout: none; 
        -webkit-user-select: none; 
        -khtml-user-select: none; 
        -moz-user-select: none; 
        -ms-user-select: none; 
        user-select: none;
        overscroll-behavior: none;
    }

    .p2w-widget-wrapper-progress-counter{
        position: relative;
        border-radius: 28px;
        left: 0;
        bottom: 6px;
        z-index: 1049;
        width: 220px;
        height: 100%;
        border: 0;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

    .p2w-widget-animation {
            animation-duration: 0.5s;
            animation-name: bounceIn;
    }
    
    #p2w-widget .p2w-widget-heart-beat{
        animation-name: heartBeat ;
        animation-duration: 0.8s;
        animation-timing-function: ease-in-out;
    }

    .p2w-widget-text-progress-counter {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: absolute;
        left:0;
        top: 0;
        height: 100%;
        
        font-family: 'Fira Sans', sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 34px;
        line-height: 41px;
        color: #FFFFF7;
        
        text-shadow: 0px 2.49627px 0px #151413;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index:2;
        border-radius: 32px;
        overflow: hidden;
    }

    @keyframes progress {
        0% { --percentage: 0; }
        100% { --percentage: var(--value); }
    }
    
    @keyframes blockProgress {
        0% { --percentage: 0; }
        100% { --percentage: 0; }
    }

    @property --percentage {
        syntax: '<number>';
        inherits: true;
        initial-value: 0;
    }

    .p2w-widget-progress-bar-background{
        height: 75%;
        position: relative;
        background: radial-gradient(50% 50% at 50% 50%, #FF88FA 29%, #9B09E3 100%);
        position: absolute;
        z-index: -4;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
    }

    .p2w-widget-progress-bar-image{
        pointer-events: none;
        z-index: 5;
        width: 65%;
        aspect-ratio: 1 / 1;
        background-size: inherit;
        background-position-x: 50%;
        background-position-y: 0%;
        background-repeat: no-repeat;
    }


    .p2w-widget-container-progress-bar{
        position: absolute;
        bottom: 85%;
        left: 50%;
        transform: translateX(-50%);
        aspect-ratio: 1 / 1;
        height: 218px;
        border-radius: 50%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #090728;
    }

    .p2w-widget-progress-bar-color{
        position: absolute;
        width: 75%;
        z-index: 4;
        background: blue;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background: radial-gradient(50% 50% at 50% 50%, #FF88FA 29%, #9B09E3 100%);
    }

    [role="progressbar"] {
        --percentage: var(--value);
        --secondary: #090728;
        --size: 198px;
        animation: blockProgress 1s 0s forwards cubic-bezier(0.4, 0, 0.2, 1);
        width: var(--size);
        aspect-ratio: 1;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        display: grid;
        place-items: center;
        background: #090728;
        position: absolute;
    }

    [role="progressbar"]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: conic-gradient(var(--primary) calc(var(--percentage) * 1%), var(--secondary) 0);
        mask: radial-gradient(white 55%, transparent 0);
        mask-mode: alpha;
        -webkit-mask: radial-gradient(#0000 55%, #000 0);
        -webkit-mask-mode: alpha;
        
        
        mask-image: radial-gradient(
        transparent 55%,
        black calc(55% + 0.5px)
        );
    }

    .p2w-local-widget-arrow-hint {
        position: absolute;
        bottom: 88.5%;
        left: 0;
        transform:translate(-80%, 0);
        width: 29%;
        overflow: hidden;
        opacity: 0;
        animation: opacity 0.5s linear forwards;
        --endWidth: 912px;
        --endTransform: -800px;
        --startWidth: 29%;
        --startTransform: -80%;
    }


    .p2w-local-widget-arrow-hint:not(.p2w_active_widget):not(.p2w-widget-arrow-first-show) {
        transform: translate(var(--startTransform), 0)  rotate(0deg);
        width: var(--startWidth);
        transform-origin: left;
        transition: transform 0.37s ease-in-out, width 0.35s ease-in-out;
    }
    
    .p2w-local-widget-arrow-hint.p2w_active_widget {
        transform: translate(var(--endTransform), 0px);
        width: var(--endWidth); 
       
        transition: transform 0.35s ease-in-out, width 0.30s ease-in-out;
    }
    @media  (min-width: 1200px) {
         .p2w-local-widget-arrow-hint:not(.p2w_active_widget):not(.p2w-widget-arrow-first-show) {
                transform: translate(var(--startTransform), 0)  rotate(0deg);
                width: var(--startWidth);
                transform-origin: left;
                transition: transform 0.1s ease-in-out, width 0.3s ease-in-out;
        }
        
        .p2w-local-widget-arrow-hint.p2w_active_widget {
            transform: translate(var(--endTransform), 0px);
            width: var(--endWidth); 
            transition: transform 0.5s  ease-out, width 0.2s ease-out;
        }
    }
    
    .p2w-local-widget-arrow-hint.p2w-reverse-mode{
        left:112%;
    }
    
    
    
    .p2w-widget-container-arrow.p2w-reverse-mode{
        transform-origin: left;
        transform: translateX(6.5%) rotate(180deg);
    }
    .p2w-local-widget-arrow-hint.p2w_active_widget .p2w-widget-container-arrow.p2w-reverse-mode{
        transition: all 0.6s;
    }
    .p2w-local-widget-arrow-hint:not(.p2w_active_widget) .p2w-widget-container-arrow.p2w-reverse-mode{
        transition: all 0.325s;
    }
    
    
    .p2w-local-widget-arrow-hint.p2w_active_widget.p2w-reverse-mode{
        transform: translate(calc(var(--endTransform)+ 100%), 0) rotate(180deg);
        width: var(--endWidth); 
        opacity: 1;
        left: 50%;
        transition: transform 0.15s ease-in-out, width 0.125s ease-in-out, left  0.15s ease-in-out;
<!--        animation: openReverseWidget 0.35s ease forwards;-->
    }
    .p2w-local-widget-arrow-hint:not(.p2w_active_widget):not(.p2w-widget-arrow-first-show).p2w-reverse-mode{
        transform: translate(calc(var(--startTransform)+ 100%), 0) rotate(180deg);
        width: var(--startWidth);
        transform-origin: right ;
        left: 96%;
        transition: transform 0.35s ease-in-out, width 0.35s ease-in-out, left  0.35s ease-in-out;
<!--        animation: closeReverseWidget 0.35s ease forwards;-->
    }
    .p2w-local-widget-arrow-hint.p2w_active_widget.p2w-reverse-mode .p2w-widget-container-arrow{
        transform: translateX(96%) rotate(180deg);
    }
    
    .p2w-local-widget-arrow-hint.p2w-reverse-mode .p2w-local-widget-arrow-hint-text{
        position: relative;
        display: flex;
        justify-content: flex-end;
    }
    .p2w-widget-text {
        display: flex; 
        flex-direction: column; 
        align-items: flex-start; 
        justify-content: center; 
        width: 100%; 
        height: 100%;
        position: absolute;
        text-align:left;
    }
    
    .p2w-widget-text.p2w-widget-completed-text{
        gap: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-weight: 700;
        font-family: 'Fira Sans';
        color: #F8EB38;
    }
    .p2w_active_widget .p2w-widget-text.p2w-widget-completed-text{
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    
    .p2w-reverse-mode .p2w-widget-text {
        display: flex; 
        flex-direction: column; 
        align-items: flex-start; 
        justify-content: center; 
        height: 100%;
        position: absolute;
        text-align:left;
        padding-left:5%;
    }
    .p2w-widget-text {
        width: 85%;
        opacity: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
     
    .p2w-widget-text:not(.p2w-widget-completed-text) div{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .p2w_active_widget:not(.p2w-reverse-mode) .p2w-widget-text {
        animation: opacity 1s 0.35s ease forwards;
    }
    .p2w_active_widget.p2w-reverse-mode .p2w-widget-text {
        animation: opacity 0.5s 0.35s ease forwards;
    }
    
    
    .p2w-arrow{
        animation: opacity 1s 0.75s ease forwards;
        transform: matrix3d(1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 1, 9, 1, 1, 0);
<!--        transition: 0.5s ease-in-out;-->
    }
    
    .p2w-arrow:not(.p2w_active_arrow) {
        transform: matrix3d(-1, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 1, 54, 1, 1, 0);
    }
    
    .p2w_active_widget {
        transform:translate(-800px, 0);
        width: 912px;   
    }
    
    .p2w-local-widget-arrow-hint-text-wrapper{
        position: absolute;
        width: 95%;
        height: 100%;
        transform: translate(55px, -100%);
        pointer-events: none;
        overflow: hidden;
    }
    .p2w-local-widget-arrow-hint-text{
        display: flex;
        height: 100%;
    }
    
    .p2w-local-widget-arrow-hint:not(.p2w-reverse-mode) .p2w-local-widget-arrow-hint-text {
        margin-left: 10%;
    }
    
    .p2w-reverse-mode .p2w-local-widget-arrow-hint-text{
        margin-right: 10%;
    }
    
    .p2w-widget-container-arrow {
        width: 955px;
        height: 210px;
    }
    
    .p2w-widget-text-congratulation{
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 40px;
        color: #F1F6FF;
    }
    
    .p2w-widget-white-text {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 50px; 
        color: #F1F6FF;
        white-space: pre-line
    }
    
    .p2w-widget-gray-text {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 53px;
        color: #CDD0D6;
    }
    
    .p2w-widget-yellow-text {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 40px;
        color: #F8EB38;
        white-space: pre-line;
    }
    
    .p2w-attention .p2w-widget-yellow-text{
        color: #FF3C21;
    }
    
    
    .p2w-widget-red-text {
        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 50px;
        color: #FF3C21;
    }
    
    #p2w-widget:not(:has(.p2w-reverse-mode)) .p2w-widget-notification-alert {
        right: 0;
        animation: warning-bounce 0.5s;
    }
    #p2w-widget:has(.p2w-reverse-mode) .p2w-widget-notification-alert {
        left: 0;
        animation: warning-bounce 0.5s;
    }
    
    .p2w-widget-notification-alert {
        position: absolute;
        top: 0;
        width: 30px;
        background-color: red;
        height: 30px;
        border-radius: 50%;
<!--        background-image: url('https://p2w.imgix.net/resources/widget/Union.svg?auto=compress&auto=format');-->
<!--        background-repeat: no-repeat;-->
<!--        background-position: 50% 50%;-->
<!--        background-size: 6px;-->
    }
    
    .p2w-progress-svg{
        width: 218px;
        height: 64px;
    }
    .p2w-widget-attention{
        position: absolute;
        top: -3%;
<!--        left: -50%;-->
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    @media  (max-width: 3000px) {
        #p2w-widget {
            width: 104px;
            height: 33px;
            right: 50px;
            bottom: 93px;
        }
        .p2w-widget-wrapper-progress-counter {
            width: 104px;
            height: 100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 16px;
            border-radius: 10px;
        }
        .p2w-widget-container-progress-bar {
            transform: translateX(-50%);
            height: 104px;
        }
        [role="progressbar"] {
            --size: 94px;
        }
        .p2w-widget-progress-bar-image {
            width: 70%;
            background-size: contain;
            background-position: center center;
        }
        .p2w-widget-notification-alert {
            width: 16px;
            height: 16px;
            background-size: 3px;
        }
        .p2w-widget-container-arrow {
            width: 422px;
            height: 97px;
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 16px;
            line-height: 1.2;
        }
        .p2w-local-widget-arrow-hint {
            width: 28px;
            --endWidth: 425px;
            --endTransform: -365px;
            --startWidth: 27px;
            --startTransform: -80%;
<!--            height: 104px;-->
        }
      
        .p2w-local-widget-arrow-hint.p2w-reverse-mode {
            width: 23px;
            --endWidth: 425px;
            --endTransform: -365px;
            --startWidth: 27px;
            --startTransform: -80%;
        }
        .p2w-local-widget-arrow-hint-text-wrapper{
            transform: translate(0, -100%);
        }
        
        .p2w-progress-svg{
            width: 104px;
            height: 31px;
        }
    }
   
    @media  (max-width: 600px) {
          #p2w-widget {
            width: 102.96px; 
            height: 32.25px; 
            right: 30px; 
            bottom:calc(50px + 30px)
        }
        
        .p2w-widget-wrapper-progress-counter {
            bottom: 7.5px;
            width: 102.96px;
            height: 100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 15.84px; 
            border-radius: 16.5px; 
        }
        .p2w-widget-container-progress-bar {
            height: 102.96px; 
            left: 50%;
        }
        [role="progressbar"] {
            --size: 90px; 
        }
        .p2w-widget-progress-bar-image {
            width: 70%; 
            background-size: contain;
            background-position: center center;
        }
        .p2w-widget-notification-alert {
            width: 15.84px; 
            height: 15.84px; 
            background-size: 2.25px; 
        }
        .p2w-widget-container-arrow {
            width: 417px; 
            height: 94.5px;
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 15.84px; 
            line-height: 1.2;
        }
        .p2w-local-widget-arrow-hint {
            bottom: 84%;
            width: 28.5px; 
            --endWidth: 405px; 
            --endTransform: -340.5px; 
            --startWidth: 28.5px;
            --startTransform: -24px; 
<!--            height: 102px;-->
        }
        .p2w-local-widget-arrow-hint.p2w-reverse-mode {
            width: 21px;
            --endWidth: 405px;
            --endTransform: -340.5px;
            --startWidth: 21px;
            --startTransform: -29px;
        }
        .p2w-local-widget-arrow-hint-text-wrapper {
            transform: translate(0, -100%);
        }
        .p2w-local-widget-arrow-hint:not(.p2w-reverse-mode) .p2w-local-widget-arrow-hint-text {
            margin-left: 49.5px; 
        }
<!--        .p2w-widget-text {-->
<!--            width: 255px;-->
<!--        }-->
        .p2w-progress-svg {
            width: 102.96px; 
            height: 30.69px;
        }
    }

    @media  (max-width: 500px) {

        #p2w-widget {
            width: 85.8px; 
            height: 26.88px; 
            right: 25px; 
            bottom:calc(50px + 25px)
        }
        .p2w-widget-wrapper-progress-counter {
            bottom: 6.25px;
            width: 85.8px;
            height: 100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 13.2px;
            border-radius: 13.75px; 
        }
        .p2w-widget-container-progress-bar {
            height: 85.8px; 
            left: 50%;
        }
        [role="progressbar"] {
            --size: 75px; 
        }
        .p2w-widget-progress-bar-image {
            width: 70%; 
            background-size: contain;
            background-position: center center;
        }
        .p2w-widget-notification-alert {
            width: 13.2px; 
            height: 13.2px; 
            background-size: 1.875px; 
        }
        .p2w-widget-container-arrow {
            width: 347.5px; 
            height: 78.75px; 
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 13.2px; 
            line-height: 1.2;
        }
        .p2w-local-widget-arrow-hint {
            bottom: 84%;
            width: 25.75px;
            --endWidth: 337.5px; 
            --endTransform: -283.75px;
            --startWidth: 24.75px;
            --startTransform: -22px; 
<!--            height: 85px;-->
        }
        .p2w-local-widget-arrow-hint.p2w-reverse-mode {
               width: 18px;
               --endWidth: 337.5px;
               --endTransform: -283.75px;
               --startWidth: 18px;
               --startTransform: -16px;
        }
        .p2w-local-widget-arrow-hint-text-wrapper {
            transform: translate(0, -100%);
        }
        .p2w-local-widget-arrow-hint:not(.p2w-reverse-mode) .p2w-local-widget-arrow-hint-text {
            margin-left: 41.25px;
        }
<!--        .p2w-widget-text {-->
<!--            width: 212.5px; -->
<!--        }-->
        .p2w-progress-svg {
            width: 85.8px; 
            height: 25.58px; 
        }
    }
    @media (max-width: 400px) {
        #p2w-widget {
            width: 75.5px;
            height: 25px;
            right: 20px;
            bottom:calc(50px + 20px)
        }
        .p2w-widget-wrapper-progress-counter {
            bottom: 5.5px;
            width: 75.5px;
            height:  100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 11.62px; 
            border-radius: 12.1px; 
        }
        .p2w-widget-container-progress-bar {
            height: 75.5px; 
            left: 50%;
        }
        [role="progressbar"] {
            --size: 66px; 
        }
        .p2w-widget-progress-bar-image {
            width: 70%; 
            background-size: contain;
            background-position: center center;
        }
        .p2w-widget-notification-alert {
            width: 11.62px;
            height: 11.62px;
            background-size: 1.65px; 
        }
        .p2w-widget-container-arrow {
            width: 302px; 
            height: 69.3px; 
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 11.62px; 
            line-height: 1.2;
        }
        .p2w-local-widget-arrow-hint {
            bottom: 84%;
            width: 20.5px; 
            --endWidth: 297px; 
            --endTransform: -249.7px; 
            --startWidth: 20px; 
            --startTransform: -17.6px; 
            height: 75px;
        }
        .p2w-local-widget-arrow-hint.p2w-reverse-mode {
            width: 16px;
            --endWidth: 297px;
            --endTransform: -249.7px; 
            --startWidth: 16px; 
            --startTransform: -17.6px; 
        }
        .p2w-local-widget-arrow-hint-text-wrapper {
            transform: translate(0, -100%);
        }
        .p2w-local-widget-arrow-hint:not(.p2w-reverse-mode) .p2w-local-widget-arrow-hint-text {
            margin-left: 36.3px; 
        }
<!--        .p2w-widget-text {-->
<!--            width: 187px; -->
<!--        }-->
        .p2w-progress-svg {
            width: 75.5px; 
            height: 22.51px; 
        }
    }
    
    @media  (max-width: 350px) {
        #p2w-widget {
            width: 68.64px; 
            height: 21.5px;
            right: 20px;
            bottom:calc(50px + 20px)
        }
        .p2w-widget-wrapper-progress-counter {
            bottom:5px;
            width: 68.64px; 
            height: 100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 10.56px; 
            border-radius: 11px;
        }
        .p2w-widget-container-progress-bar {
            height: 68.64px; 
            left: 50%;
        }
        [role="progressbar"] {
            --size: 60px; 
        }
        .p2w-widget-progress-bar-image {
            width: 70%; 
            background-size: contain;
            background-position: center center;
        }
        .p2w-widget-notification-alert {
            width: 10.56px; 
            height: 10.56px; 
            background-size: 1.5px; 
        }
        .p2w-widget-container-arrow {
            width: 278px;  
            height: 63px; 
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 10.56px; 
            line-height:1.2;
        }
        .p2w-local-widget-arrow-hint {
            bottom: 84%;
            width: 19px;
            --endWidth: 270px;
            --endTransform: -227px;
            --startWidth: 19px;
            --startTransform: -16px;
            height: 68px;
        }
        .p2w-local-widget-arrow-hint.p2w-reverse-mode{
            width: 12px;
            --endWidth: 270px;
            --endTransform: -227px;
            --startWidth: 12px;
            --startTransform: -16px;
        }

        .p2w-local-widget-arrow-hint-text-wrapper{
            transform: translate(0, -100%);
        }
        .p2w-local-widget-arrow-hint-text{
            margin-left: 33px;
        }
<!--        .p2w-widget-text {-->
<!--            width: 170px;-->
<!--        }-->
        
        .p2w-progress-svg {
            width: 68.64px;
            height: 20.46px;
        }
    }
    
    
    @media (max-height: 600px) {
        #p2w-widget {
            width: 52px;
            height: 17px;
            right: 40px;
            bottom: 40px;
        }
        .p2w-widget-wrapper-progress-counter {
            bottom: 4px;
            width: 52px;
            height:  100%;
        }
        .p2w-widget-text-progress-counter {
            font-size: 8px;
            border-radius: 8px;
        }
        .p2w-widget-container-progress-bar {
            transform: translateX(-50%);
            height: 52px;
        }
        [role="progressbar"] {
            --size: 46px;
        }
        .p2w-widget-progress-bar-image {
            width: 70%;
            background-size: contain;
            background-position: center center;
        }
        
        .p2w-widget-notification-alert {
            width: 8px;
            height: 8px;
            background-size: 1.5px;
            background-position: 50% 50%;
        }
        .p2w-widget-container-arrow {
            width: 211px;
            height: 48.5px;
        }
        .p2w-widget-white-text,
        .p2w-widget-yellow-text,
        .p2w-widget-gray-text,
        .p2w-widget-red-text {
            font-size: 8px;
            line-height: 1.2;
        }
        .p2w-local-widget-arrow-hint {
            bottom: 72.5%;
            width: 14px;
            --endWidth: 212.5px;
            --endTransform: -182.5px;
            --startWidth: 14px;
            --startTransform: -10px;
        }
        .p2w-local-widget-arrow-hint.p2w-reverse-mode {
             width: 10px;
            --endWidth: 200px;
            --endTransform: -283.75px;
            --startWidth: 10px;
            --startTransform: -16px;
        }
        .p2w-local-widget-arrow-hint-text-wrapper {
<!--            transform: translate(-29px, -100%);-->
<!--            margin-left: 0px;-->
        }
        .p2w-progress-svg {
            width: 52px;
            height: 15.5px;
        }
<!--        .p2w-widget-text {-->
<!--            width: 160px;-->
<!--        }-->
        .p2w-local-widget-arrow-hint-text{
            margin-left: 25px;
        }
        .p2w-reverse-mode .p2w-local-widget-arrow-hint-text{
            margin-left: 20px;
        }
    }
`;


	const UiWidget = {
	    createWidget,
	    createWidgetElements,
	    addWidgetStyles,
	    setProgress,
	    setWidgetToLocalStoragePosition,
	    runHeartBeatAnimation,
	    setCompletedStylesToWidget,
	    createWarning
	};

	var uiHelper_widget = /*#__PURE__*/Object.freeze({
		__proto__: null,
		UiWidget: UiWidget
	});

	class Widget {

	    adapterService
	    previousUrl = ''
	    isFirstLoading = true;
	    openWidgetTimeout;
	    closeWidgetTimeout;
	    firstHandleCloseWidget = true;
	    isAddedHandleClickWithoutWidget = false;
	    endedAnimationNameArray = []
	    redrawWidgetBy = []
	    needAlertAfterReload = false
	    resizeHandler;
	    lastGameID = null;
	    timeOutArray = []
	    landingLastProgressWidget = 0

	    static getInstance(adapter) {
	        if (!Widget.instance) {
	            Widget.instance = new Widget(adapter);
	        }
	        return Widget.instance;
	    }

	    constructor(adapter) {
	        this.adapterService = adapter;
	    }

	    drawWidget(widgetData, withAnimation = true) {
	        const progressStatus = {progress: widgetData.progress, maxProgress: widgetData.progressMax};
	        const type = +widgetData.progress !== +widgetData.progressMax ? 'info' : 'completed';
	        const dmSrc = this.adapterService.clientUri + `/dm?lang=${this.adapterService.userData?.locale ?? 'en'}&userId=${this.adapterService.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}&fromWidget=true`;
	        UiWidget.createWidget(withAnimation, progressStatus, widgetData.iconUrl, this.adapterService, dmSrc, widgetData.widgetCollectTitle, true);
	        let arrow = document.querySelector('.handleClickArrow');
	        if (widgetData.showInfoInSlot) {
	            this.handlerOnCloseOpenWidgetInfo(arrow, widgetData, type);
	            let widget = document.querySelector('#p2w-widget');
	            widget.addEventListener('animationend', (event) => {
	                this.handleWidgetAnimations(event, widget, widgetData, type, dmSrc, widgetData.widgetCollectTitle);
	            });
	            const isMobile = this.adapterService?.isMobile();
	            setTimeout(() => {
	                if (isMobile) {
	                    this.changeWidgetImage(this.redrawWidgetBy.length === 0);
	                    this.makeWidgetDraggable();
	                    this.addHandleListenerMobileTurnover();
	                }
	                if (!isMobile || isMobile && type === "completed" && this.redrawWidgetBy.length !== 0) {
	                    setTimeout(() => {
	                        UiWidget.setProgress(widgetData.progress, widgetData.progressMax, this.adapterService, dmSrc, widgetData.widgetCollectTitle, false);
	                    }, 300);
	                }
	            }, 200);

	        }
	    }

	    handleWidgetAnimations = (event, widget, widgetData, type, dmSrc, widgetCollectTitle) => {
	        const isMobile = this.adapterService?.isMobile();

	        const handleAnimationName = {
	            'showWidgetDraggable': () => {
	                if (isMobile) {
	                    setTimeout(() => {
	                        UiWidget.setProgress(widgetData.progress, widgetData.progressMax, this.adapterService, dmSrc, widgetCollectTitle, false);
	                    }, 100);
	                }
	            },
	            'dynamicProgress': () => {
	                if (
	                    !isMobile
	                    ||
	                    isMobile && this.endedAnimationNameArray.includes("showWidgetDraggable")
	                ) {
	                    const showArrow = type === 'info';
	                    this.handleWidgetDisplay(showArrow);
	                }
	            },
	            'opacity': () => {
	                let arrowHint = document.querySelector('.p2w-local-widget-arrow-hint');
	                const isMobOpacityArrowHint = isMobile && arrowHint === event.target;
	                const isWebOpacityArrowHint = !isMobile && arrowHint === event.target;

	                if (
	                    isWebOpacityArrowHint && this.redrawWidgetBy.length === 0
	                ) {
	                    handleFirstOpenWidgetAfterOpacity(0);
	                }

	                if (
	                    isMobOpacityArrowHint && this.redrawWidgetBy.length === 0
	                ) {
	                    handleFirstOpenWidgetAfterOpacity(500);
	                }

	                if (this.needAlertAfterReload && event.target === arrowHint) {
	                    UiWidget.createWarning();
	                    this.needAlertAfterReload = false;
	                }

	                widget.removeEventListener('animationend', (event) => {
	                    this.handleWidgetAnimations(event, widget, widgetData, type, dmSrc, widgetData.widgetCollectTitle);
	                });
	            },
	            'warning-bounce': () => {
	                let alert = document.querySelector('.p2w-widget-notification-alert');
	                if (alert) {
	                    alert.style.animationName = 'warning-blinking';
	                    alert.style.animationIterationCount = 'infinite';
	                    alert.style.animationDuration = '1s';
	                    alert.style.animationFillMode = 'forwards';
	                }
	            },
	        };
	        const handleFirstOpenWidgetAfterOpacity = (delayForOpen) => {
	            if (!this.openWidgetTimeout) {
	                this.openWidgetTimeout = setTimeout(() => {
	                    if (!this.checkOpenWidget() && this.firstHandleCloseWidget) {
	                        this.openWidget(widgetData, type);
	                    }
	                    clearTimeout(this.openWidgetTimeout);
	                    this.openWidgetTimeout = null;
	                }, delayForOpen);
	            }

	            if (!this.closeWidgetTimeout) {
	                this.closeWidgetTimeout = setTimeout(() => {
	                    if (this.checkOpenWidget() && this.firstHandleCloseWidget) {
	                        this.closeWidget();
	                    }
	                    clearTimeout(this.closeWidgetTimeout);
	                    this.closeWidgetTimeout = null;
	                }, 4500);
	            }
	        };

	        if (handleAnimationName[event.animationName]) {
	            handleAnimationName[event.animationName]();

	        }
	        this.endedAnimationNameArray.push(event.animationName);
	    }


	    handleWidgetDisplay = (showArrow) => {
	        if (showArrow) {
	            const hint = document.querySelector('.p2w-local-widget-arrow-hint');
	            hint.style.animation = '';
	            hint.style.width = '';
	            hint.style.transition = '0s';
	            setTimeout(() => {
	                hint.style.transition = '';
	            }, 0);
	        }
	        const progressCounter = document.querySelector('.p2w-widget-wrapper-progress-counter');
	        progressCounter.style.animation = 'opacity 0.5s forwards linear';
	    }

	    changeWidgetImage(showAnimation) {
	        let progressBarImage = document.querySelector('.p2w-widget-progress-bar-image');
	        let progressBarInnerSvg = document.getElementById('progressBarInnerSvg');

	        if (progressBarInnerSvg) {
	            progressBarInnerSvg.style.display = 'none';
	        }
	        progressBarImage.innerHTML = `
           <div style="
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: ${showAnimation ? 'rgb(0, 0, 0, 0.7)' : 'transparent'};
                opacity : ${showAnimation ? 1 : 0};
                transform: scale(1.1);
                animation: ${showAnimation ? '0.5s' : '0s'} opacity forwards ease-in;" 
                id="p2w-show-widget-draggable-wrapper">
                <div style="
                    width: 100%;
                    height: 100%;
                    border-image-source : url(https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/widget/Icn_Wgt_Drag.svg);
                    border-radius: 50%;
                    border-image-slice: 0 fill;
                    opacity: 0;
                    animation: showWidgetDraggable ${showAnimation ? '2.5s 0.25s' : '0s'}  linear forwards;
                    scale: 0.7;
                    ">
                </div>
           </div>
        `;

	        setTimeout(() => {
	            if (progressBarInnerSvg) {
	                progressBarInnerSvg.style.display = '';
	            }
	            let wrapper = document.querySelector('#p2w-show-widget-draggable-wrapper');
	            wrapper.style.animation = 'backwardOpacity 0.7s  ease-out forwards';

	            setTimeout(() => {
	                if (wrapper) {
	                    wrapper.remove();
	                }
	            }, 1100);
	        }, 2500);
	    }

	    handlerOnCloseOpenWidgetInfo(arrow, widgetData, type) {

	        arrow.addEventListener('click', (e) => {
	            if (this.checkOpenWidget()) {
	                let notificationAlert = document.querySelector('.p2w-widget-notification-alert');
	                const attention = document.querySelector('.p2w-local-widget-arrow-hint');
	                if (notificationAlert && attention?.classList.contains('p2w-attention')) {
	                    this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetCollapseMinBetWarning');
	                } else {
	                    this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetCollapseInfo');
	                }
	                const widgetInfo = document.querySelector('.widgetInfoBody');
	                if (widgetInfo) {
	                    widgetInfo.removeEventListener('click', this.closeWidget);
	                }
	                this.closeWidget();
	            } else {
	                this.openWidget(widgetData, type);
	            }
	            this.firstHandleCloseWidget = false;
	        });
	    }

	    handleChangeMobileWidth = (previousWidth) => {
	        const currentWidth = window.innerWidth;
	        if (currentWidth !== previousWidth) {

	            this.rewriteWidget(false, 'flipScreen');
	        }
	    }

	    addHandleListenerMobileTurnover = () => {
	        let previousWidth = window.innerWidth;
	        this.resizeHandler = () => {
	            this.handleChangeMobileWidth(previousWidth);
	        };
	        window.addEventListener('resize', this.resizeHandler);
	    }

	    removeHandleListenerMobileTurnover = () => {
	        const isMobile = this.adapterService?.isMobile();
	        if (isMobile) {
	            window.removeEventListener('resize', this.resizeHandler);
	            clearTimeout(this.openWidgetTimeout);
	            clearTimeout(this.closeWidgetTimeout);
	        }
	    }

	    rewriteWidget = (withAnimation = false, reasonForRedrawing) => {
	        let isActiveAlert = document.querySelector('.p2w-widget-notification-alert');
	        const attention = document.querySelector('.p2w-local-widget-arrow-hint');
	        if (!!isActiveAlert && attention?.classList.contains('p2w-attention')) {
	            this.needAlertAfterReload = true;
	        }
	        this.removeWidget(false, reasonForRedrawing);
	        this.drawWidget(this.findMissionWidgetForUser(), withAnimation);

	    }


	    resetLocalWidgetStyles = () => {
	        let styles = document.querySelectorAll('.p2w-widget-styles');
	        if (styles) {
	            styles.forEach(style => style.remove());
	        }
	    }
	    isWidgetExist = () => !!document.querySelector('.p2w-widget')

	    removeWidget = (withResetLocalStorageWidget = false, reasonForRedrawing = 'changeData') => {
	        this.resetLocalWidgetStyles();
	        if (reasonForRedrawing === 'flipScreen') {
	            this.endedAnimationNameArray = [];
	            this.redrawWidgetBy.push(reasonForRedrawing);
	        }
	        const widget = document.getElementById('p2w-widget');
	        if (widget) {
	            widget.remove();
	            if (reasonForRedrawing === 'changeData') {
	                this.redrawWidgetBy = [];
	                this.endedAnimationNameArray = [];
	                clearTimeout(this.openWidgetTimeout);
	                this.openWidgetTimeout = null;
	                clearTimeout(this.closeWidgetTimeout);
	                this.closeWidgetTimeout = null;
	                this.timeOutArray.forEach(e => clearTimeout(e));
	            }
	        }
	        if (withResetLocalStorageWidget) {
	            window.localStorage.removeItem('widgetPositions');
	        }
	        this.removeHandleListenerMobileTurnover();
	    }

	    makeWidgetDraggable = () => {
	        document.body.style.overscrollBehavior = 'none';
	        const widget = document.querySelector('#p2w-widget');
	        const widgetChildren = document.querySelectorAll('#p2w-widget > div');
	        let draggableHintInterval;

	        if (widget && widgetChildren) {
	            let initialX = null;
	            let initialY = null;
	            let diffX = 0;
	            let diffY = 0;

	            const pageWidth = window.innerWidth;
	            const pageHeight = window.innerHeight;
	            const arrowContainer = document.querySelector('.p2w-local-widget-arrow-hint');
	            const arrowElement = document.querySelector('.p2w-widget-container-arrow');
	            const progressBar = document.querySelector('#p2w-widget-container-progress-bar');
	            const maxHeight = arrowElement.getBoundingClientRect().height;
	            let widgetInitialPosition = widget.getBoundingClientRect();
	            let isMoved = false;



	            const setArrowMode = (terms) => {
	                if (terms) {
	                    arrowElement.classList.add('p2w-reverse-mode');
	                    arrowContainer.classList.add('p2w-reverse-mode');
	                    progressBar.classList.add('p2w-reverse-mode');
	                } else {
	                    arrowElement.classList.remove('p2w-reverse-mode');
	                    arrowContainer.classList.remove('p2w-reverse-mode');
	                    progressBar.classList.remove('p2w-reverse-mode');
	                }
	                const alert = document.querySelector('.p2w-widget-notification-alert');
	                if (alert) {
	                    alert.style.animation = 'none';
	                    alert.offsetHeight;
	                    alert.style.animation = '';
	                }
	                arrowElement.style.transition = 'none';
	                // arrowContainer.classList.add('p2w-widget-arrow-first-show')
	            };

	            const onTouchMove = (event) => {
	                const isWidgetComplete = widget?.getAttribute('data-status') === 'complete';
	                if (isWidgetComplete) return

	                event.preventDefault();
	                isMoved = true;
	                const currentX = Math.round(event.changedTouches[0].clientX);
	                const currentY = Math.round(event.changedTouches[0].clientY);
	                clearInterval(draggableHintInterval);

	                if (initialX === null || initialY === null) {
	                    initialX = currentX - diffX;
	                    initialY = currentY - diffY;
	                }

	                const newDiffX = currentX - initialX;
	                const newDiffY = currentY - initialY;
	                const axisLimitX = newDiffX > -widgetInitialPosition.x + (pageWidth * 0.1) &&
	                    newDiffX < pageWidth - (widgetInitialPosition.x + widgetInitialPosition.width) - (pageWidth * 0.05);
	                const axisLimitY = newDiffY > -widgetInitialPosition.y + maxHeight + (pageHeight * 0.05) &&
	                    newDiffY < pageHeight - (widgetInitialPosition.y + widgetInitialPosition.height) - (pageHeight * 0.1);




	                if (axisLimitX && axisLimitY) {
	                    diffX = newDiffX;
	                    diffY = newDiffY;
	                    widget.style.transform = `translate(${diffX}px, ${diffY}px)`;
	                }

	                setArrowMode(newDiffX < pageWidth / 2 - (widgetInitialPosition.x + widgetInitialPosition.width));

	            };

	            const onTouchEnd = (event) => {
	                let widgetPositionsCurrentPos = widget.getBoundingClientRect();
	                if (pageWidth < pageHeight) {
	                    window.localStorage.setItem('widgetPositionsPortrait', JSON.stringify({
	                        diffX: widgetPositionsCurrentPos.x,
	                        diffY: widgetPositionsCurrentPos.y
	                    }));
	                } else {
	                    window.localStorage.setItem('widgetPositionsLandscape', JSON.stringify({
	                        diffX: widgetPositionsCurrentPos.x,
	                        diffY: widgetPositionsCurrentPos.y
	                    }));
	                }
	                initialX = null;
	                initialY = null;
	                arrowElement.style.transition = '';
	                if (isMoved) {
	                    this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetChangePosition');
	                }
	                isMoved = false;
	            };
	            setArrowMode(pageWidth / 2 > widgetInitialPosition.x + widgetInitialPosition.width / 2);

	            widgetChildren.forEach(child => {
	                child.addEventListener('touchmove', onTouchMove);
	                child.addEventListener('touchend', onTouchEnd);
	            });
	        }
	    }

	    checkOpenWidget = () =>
	        document.querySelector('.p2w-local-widget-arrow-hint')?.classList.contains('p2w_active_widget')

	    closeWidget = () => {
	        // document.querySelector('.p2w-local-widget-arrow-hint')?.classList.remove('p2w-widget-arrow-first-show')
	        document.querySelector('.p2w-local-widget-arrow-hint')?.classList.remove('p2w_active_widget');
	        document.querySelector('.p2w-arrow').classList.remove('p2w_active_arrow');
	    }


	    openWidget = (widgetData, type) => {
	        // document.querySelector('.p2w-local-widget-arrow-hint')?.classList.remove('p2w-widget-arrow-first-show')
	        document.querySelector('.p2w-local-widget-arrow-hint')?.classList.toggle('p2w_active_widget');
	        document.querySelector('.p2w-arrow').classList.toggle('p2w_active_arrow');

	        const widgetInfo = document.querySelector('.widgetInfoBody');
	        if (widgetInfo) {
	            widgetInfo.addEventListener('click', this.closeWidget);
	        }


	        if (type === 'warning') {
	            this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetShowMinBetWarning');
	        } else {
	            this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetExpandInfo');
	        }


	        const handleClickWithoutWidget = (e) => {
	            const widget = document.querySelector('.p2w-local-widget-arrow-hint');

	            if (widget && !widget.contains(e.target) && !e.target.closest('.p2w-arrow')) {
	                if (this.checkOpenWidget()) {
	                    if (type === 'warning') {
	                        this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetCollapseMinBetWarning');
	                    } else {
	                        this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetCollapseInfo');
	                    }
	                    this.closeWidget();
	                }
	            }
	        };
	        if (!this.isAddedHandleClickWithoutWidget) {
	            document.addEventListener('click', (e) => {
	                handleClickWithoutWidget(e);
	            });
	            this.isAddedHandleClickWithoutWidget = true;
	        }

	        let infoBlock = ``;
	        switch (type) {
	            case 'info': {
	                infoBlock = `
                 <div class="p2w-widget-text">
                      <div class="p2w-widget-white-text">${widgetData.missionName}</div>
                      <div class="p2w-widget-gray-text">${widgetData.missionDescription}</div>
                      <div class="p2w-widget-yellow-text" style="display: ${widgetData.winMultiplier && widgetData.minBet ? 'visible' : 'none'};">${widgetData.widgetInfoDescriptionMinBet}: ${widgetData.minBet}</div>
                      <div class="p2w-widget-yellow-text" style="display: ${widgetData.minBet ? 'visible' : 'none'};">${widgetData.winMultiplier ? widgetData.widgetInfoDescriptionMultiplier : widgetData.widgetInfoDescriptionMinBet}: ${widgetData.winMultiplier ? `x${widgetData.winMultiplier}` : widgetData.minBet}</div>
                </div>`;
	                break;
	            }
	            case 'warning': {
	                const checkMinBetExist = widgetData?.widgetInfoDescriptionMinBet && widgetData?.minBet ? `<div class="p2w-widget-yellow-text">${widgetData.widgetInfoDescriptionMinBet}: ${widgetData.minBet}</div>` : '';
	                infoBlock = `
                <div class="p2w-widget-text">
                    <div class="p2w-widget-red-text">${widgetData.widgetWarningMessageAttention}</div>
                    <div class="p2w-widget-gray-text">${widgetData.widgetWarningMessageRequirement}:</div>
                    ${checkMinBetExist}
                </div>`;
	                UiWidget.createWarning();
	                break;
	            }
	            case 'completed': {
	                infoBlock = `
                    <div class="p2w-widget-text p2w-widget-completed-text">
                        <div class="p2w-widget-yellow-text">${widgetData.widgetCollectText}</div>
                    </div>
                `;
	                break;
	            }
	        }

	        const bodyTextInner = document.querySelector('.p2w-local-widget-arrow-hint-text');

	        if (bodyTextInner) {
	            bodyTextInner.innerHTML = infoBlock;
	        }
	    }

	    handleWarning = (widgetData) => {
	        const runWarningAnimationChain = () => {
	            UiWidget.runHeartBeatAnimation();
	            let timeoutBeforeOpen = setTimeout(() => {
	                this.openWidget(widgetData, 'warning');
	                let timeoutBeforeClose = setTimeout(() => {
	                    this.closeWidget();
	                }, 3000);
	                this.timeOutArray.push(timeoutBeforeClose);
	            }, 700);
	            this.timeOutArray.push(timeoutBeforeOpen);
	        };

	        if (this.checkOpenWidget()) {
	            this.closeWidget();
	            const widget = document.querySelector('#p2w-widget');

	            const onWidgetClose = (event) => {
	                if (event.propertyName === 'transform') {
	                    runWarningAnimationChain();
	                    widget.removeEventListener('transitionend', onWidgetClose);
	                }
	            };
	            widget.addEventListener('transitionend', onWidgetClose);
	        } else {
	            runWarningAnimationChain();
	        }
	    }

	    handleComplete = (widgetData, dmSrc) => {
	        this.redrawWidgetBy.push('completeState');
	        const widget = document.querySelector('#p2w-widget');
	        widget.setAttribute('data-status', 'complete');
	        document.body.style.overflow = 'hidden';
	        window.scroll({
	            top: document.body.scrollHeight,
	            behavior: 'smooth'
	        });

	        const runCompleteAnimationChain = () => {
	            UiWidget.setProgress(widgetData.progress, widgetData.progressMax, this.adapterService, dmSrc, widgetData.widgetCollectTitle, true, this.rewriteWidget, this.timeOutArray);
	            const handleShowProgress = (event) => {
	                if (event.animationName === 'dynamicProgress') {
	                    let timeoutBeforeOpen = setTimeout(() => {
	                        this.openWidget(widgetData, 'completed');

	                        let timeoutBeforeClose = setTimeout(() => {
	                            const hint = document.querySelector('.p2w-local-widget-arrow-hint');
	                            hint.style.setProperty('--startTransform', '0px');
	                            hint.style.setProperty('--startWidth', '0px');
	                            this.closeWidget();
	                            widget.removeEventListener('animationend', handleShowProgress);
	                        }, 2000);

	                        setTimeout(() => {
	                            widget.style.transition = 'all 1s ease';
	                        if(screen.width < screen.height) {
	                            widget.style.right = '39%';
	                            widget.style.bottom = '45%';
	                            widget.style.transform = 'translate(0%, 0%)';
	                        } else {
	                            widget.style.right = '46%';
	                            widget.style.bottom = '30%';
	                            widget.style.transform = 'translate(0%, 0%)';
	                        }

	                        },2000);

	                        let timeoutBeforeHeartBeat = setTimeout(() => {
	                            UiWidget.runHeartBeatAnimation(700);
	                            UiWidget.setCompletedStylesToWidget(50);
	                            let moveToCenter = setTimeout(() => {
	                                widget.style.transition = 'scale 1s ease bottom 1s ease';
	                                // widget.style.right = '-50%';
	                                    widget.style.scale = '2.5';
	                                if(screen.width < screen.height) {
	                                    widget.style.bottom = '30%';
	                                } else {
	                                    widget.style.bottom = '10%';
	                                }


	                                document.body.overflowY = 'scroll';
	                                setTimeout(() => {

	                                // document.querySelector(".sticky-casino").scrollIntoView({
	                                //     behavior: "smooth"
	                                // });
	                                // this.adapterService.buildIframe(dmSrc)
	                                }, 1500);

	                            }, 1000);
	                            this.timeOutArray.push(moveToCenter);
	                        }, 2600);
	                        this.timeOutArray.push(timeoutBeforeClose);
	                        this.timeOutArray.push(timeoutBeforeHeartBeat);
	                    }, 100);
	                    this.timeOutArray.push(timeoutBeforeOpen);
	                    // this.removeWidget(true)
	                    // document.location.href = window.location.origin + '/#demo'
	                    // let fakeCasino = document.querySelector('.sticky-casino')
	                    // if (fakeCasino) {
	                    //     this.adapterService.buildIframe(dmSrc)
	                    //     fakeCasino.focus();
	                    // }

	                }
	            };
	            widget.addEventListener('animationend', handleShowProgress);
	        };
	        if (this.checkOpenWidget()) {
	            this.closeWidget();
	            const onWidgetClose = (event) => {
	                if (event.propertyName === 'transform') {
	                    setTimeout(() => {
	                        runCompleteAnimationChain();
	                        widget.removeEventListener('transitionend', onWidgetClose);
	                    }, 100);
	                }
	            };
	            widget.addEventListener('transitionend', onWidgetClose);
	        } else {
	            runCompleteAnimationChain();
	        }
	    }


	    findSpecificMissionForGame(mg, gameName, includeCompleted = false) {
	        if (mg?.missions && mg?.missions?.length > 0) {
	            const isMissionStatusValid = (m) => m.status !== 'claimed' && (includeCompleted ? m.status === 'completed' : m.status !== 'completed');
	            return mg.missions.find((m) => m?.widget && m?.widget?.widgetGames && m?.widget?.widgetGames?.includes(gameName) && isMissionStatusValid(m))
	        }
	    }

	    findMissionForAllGames(mg, includeCompleted = false) {
	        if (mg?.missions && mg?.missions?.length > 0) {
	            const isMissionStatusValid = (m) => m.status !== 'claimed' && (includeCompleted ? m.status === 'completed' : m.status !== 'completed');
	            return mg?.missions?.find((m) => m?.widget && m?.widget?.widgetInAllGames && isMissionStatusValid(m))
	        }
	    }


	    convertMissionToWidgetData(mission) {
	        return {
	            missionName: mission?.name,
	            missionId: mission?.id,
	            missionDescription: mission?.shortDesc,
	            iconUrl: mission?.iconUrl,
	            progress: +mission.progress,
	            progressMax: mission?.progressMax,
	            showInfoInSlot: mission?.widget?.showInfoInSlot,
	            widgetInfoDescriptionBets: mission?.widget?.widgetInfoDescriptionBets,
	            widgetInfoDescriptionMinBet: mission?.widget?.widgetInfoDescriptionMinBet,
	            widgetInfoDescriptionMultiplier: mission?.widget?.widgetInfoDescriptionMultiplier,
	            widgetInfoDescriptionWins: mission?.widget?.widgetInfoDescriptionWins,
	            widgetWarningMessageAttention: mission?.widget?.widgetWarningMessageAttention,
	            widgetWarningMessageRequirement: mission?.widget?.widgetWarningMessageRequirement,
	            widgetCollectTitle: mission?.widget?.widgetCollectTitle,
	            widgetCollectText: mission?.widget?.widgetCollectText,
	            minBet: mission?.widget?.minBet,
	            winMultiplier: mission?.widget?.winMultiplier
	        };
	    }


	    testFindGameDetails(mg, gameName, findMissionCompleted = false) {
	        if (!findMissionCompleted) {
	            const specificMissionForGameNotCompleted = this.findSpecificMissionForGame(mg, gameName);
	            if (specificMissionForGameNotCompleted) {
	                return this.convertMissionToWidgetData(specificMissionForGameNotCompleted)
	            }
	            const missionForAllGamesNotCompleted = this.findMissionForAllGames(mg);
	            if (missionForAllGamesNotCompleted) {
	                return this.convertMissionToWidgetData(missionForAllGamesNotCompleted);
	            }
	        }
	        const specificMissionForGameCompleted = this.findSpecificMissionForGame(mg, gameName, true);
	        if (specificMissionForGameCompleted) {
	            return this.convertMissionToWidgetData(specificMissionForGameCompleted)
	        }
	        const missionForAllGamesCompleted = this.findMissionForAllGames(mg, true);
	        if (missionForAllGamesCompleted) {
	            return this.convertMissionToWidgetData(missionForAllGamesCompleted)
	        }
	        return false;
	    }

	    findCompletedMissionsByIds = (missions, ids) => {
	        if (missions && missions?.length > 0) {
	            return missions?.filter((m) => ids?.includes(m.id))
	        }
	    }


	    findGameDetails(data, gameId) {
	        for (const mission of data.missions) {
	            if (mission.widget && mission.widget.widgetGames && mission.widget.widgetGames.includes(gameId) && mission.status !== 'claimed') {
	                return {
	                    missionName: mission.name,
	                    missionId: mission?.id,
	                    missionDescription: mission.shortDesc,
	                    iconUrl: mission?.iconUrl,
	                    progress: +mission.progress,
	                    progressMax: mission?.progressMax,
	                    showInfoInSlot: mission?.widget?.showInfoInSlot,
	                    widgetInfoDescriptionBets: mission?.widget?.widgetInfoDescriptionBets,
	                    widgetInfoDescriptionMinBet: mission?.widget?.widgetInfoDescriptionMinBet,
	                    widgetInfoDescriptionMultiplier: mission?.widget?.widgetInfoDescriptionMultiplier,
	                    widgetInfoDescriptionWins: mission?.widget?.widgetInfoDescriptionWins,
	                    widgetWarningMessageAttention: mission?.widget?.widgetWarningMessageAttention,
	                    widgetWarningMessageRequirement: mission?.widget?.widgetWarningMessageRequirement,
	                    widgetCollectTitle: mission?.widget?.widgetCollectTitle,
	                    widgetCollectText: mission?.widget?.widgetCollectText,
	                    minBet: mission?.widget?.minBet,
	                    winMultiplier: mission?.widget?.winMultiplier
	                };
	            }

	            if (mission.widget && mission.widget.widgetInAllGames && mission.status !== 'claimed') {
	                return {
	                    missionName: mission.name,
	                    missionId: mission?.id,
	                    missionDescription: mission.shortDesc,
	                    iconUrl: mission?.iconUrl,
	                    progress: +mission.progress,
	                    progressMax: mission?.progressMax,
	                    showInfoInSlot: mission?.widget?.showInfoInSlot,
	                    widgetInfoDescriptionBets: mission?.widget?.widgetInfoDescriptionBets,
	                    widgetInfoDescriptionMinBet: mission?.widget?.widgetInfoDescriptionMinBet,
	                    widgetInfoDescriptionMultiplier: mission?.widget?.widgetInfoDescriptionMultiplier,
	                    widgetInfoDescriptionWins: mission?.widget?.widgetInfoDescriptionWins,
	                    widgetWarningMessageAttention: mission?.widget?.widgetWarningMessageAttention,
	                    widgetWarningMessageRequirement: mission?.widget?.widgetWarningMessageRequirement,
	                    widgetCollectTitle: mission?.widget?.widgetCollectTitle,
	                    widgetCollectText: mission?.widget?.widgetCollectText,
	                    minBet: mission?.widget?.minBet,
	                    winMultiplier: mission?.widget?.winMultiplier
	                };
	            }
	        }
	        return false;
	    }

	    // Одна миссия в статусе complete => вторая становится тоже complete
	    //мы миссии не complete (2/25) => другая миссия становится complete

	    findCurrentCompletedMission = (missionIds) => {
	        const currentGameState = window?.localStorage?.getItem('PLAYED_GAMES_IDS_LS_KEY');
	        if (currentGameState) {
	            Object.values(JSON.parse(currentGameState)).at(0).at(0);
	            const completedMissions = this.findCompletedMissionsByIds(this.adapterService.apiData.mg.missions, missionIds);
	            if (completedMissions && completedMissions?.length > 0) {
	                const completedMissionOnScreen = completedMissions.find((cm) => cm.id === this.lastGameID);
	                if (completedMissionOnScreen) {
	                    return {
	                        mission: this.convertMissionToWidgetData(completedMissionOnScreen),
	                        redDot: false,
	                    }
	                } else {
	                    const currentMission = this?.adapterService?.apiData?.mg.missions?.find((m) => m.id === this.lastGameID);
	                    if (+currentMission.progress !== +currentMission.progressMax) {
	                        return {
	                            mission: null,
	                            redDot: true
	                        }
	                    } else {
	                        return {
	                            mission: this.convertMissionToWidgetData(completedMissions.find((cm) => cm.id !== this.lastGameID)),
	                            redDot: true
	                        }
	                    }
	                }
	            }
	        }
	        return {
	            mission: null,
	            redDot: true
	        }
	    }


	    findMissionWidgetForUser = () => {
	        const currentGameState = window?.localStorage?.getItem('PLAYED_GAMES_IDS_LS_KEY');
	        if (currentGameState) {
	            const game = Object.values(JSON.parse(currentGameState)).at(0).at(0);
	            const mission = this.testFindGameDetails(this.adapterService.apiData.mg, game);
	            this.lastGameID = mission.missionId;
	            return mission
	            // return this.findGameDetails(this.adapterService.apiData.mg, game)
	        }
	    }
	    removeTutorialHandFromScreen = (trySecondTimeWithDelay = false) => {
	        while (uiTutorialHelper.isHandOnScreen()) {
	            uiTutorialHelper.hideHand();
	        }
	    }

	    emulateWidgetProgress(progress) {
	        console.log(progress);
	        return {
	            "iconUrl": "BookofFallene8126369-0ded-41b5-86d3-348523e6ac57.webp",
	            "minBet": null,
	            "missionDescription": "Complete Form",
	            "missionId": "ccfbb6af-a99a-429a-908f-5d53c220e192",
	            "missionName": "Book a Demo",
	            "progress": progress,
	            "progressMax": 100,
	            "showInfoInSlot": true,
	            "widgetCollectText": "Mission completed!\nCollect your rewards!",
	            "widgetCollectTitle": "Collect",
	            "widgetInfoDescriptionBets": null,
	            "widgetInfoDescriptionMinBet": "Min bet",
	            "widgetInfoDescriptionMultiplier": "Win multiplier",
	            "widgetInfoDescriptionWins": null,
	            "widgetWarningMessageAttention": "Attention",
	            "widgetWarningMessageRequirement": "Mission requirement",
	            "winMultiplier": 1
	        }
	    }

	    sessionStorageObserver() {
	        if (window.location.href.includes('/game/') && this.isFirstLoading && !this.isWidgetExist()) {
	            const widgetData = this.findMissionWidgetForUser();
	            if (widgetData) {
	                this.adapterService.removeBubble();
	                this.removeTutorialHandFromScreen(true);
	                this.drawWidget(widgetData);
	                this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetDrawn');
	            }

	            this.isFirstLoading = false;
	        }

	        let observer = new MutationObserver((mutations) => {
	            const currentGameState = window?.localStorage?.getItem('PLAYED_GAMES_IDS_LS_KEY');
	            const slotName = Object.values(JSON.parse(currentGameState)).at(0).at(0);


	            if (window.location.href.includes('/game/') && this.isFirstLoading && !this.isWidgetExist() && slotName) {
	                const widgetData = this.findMissionWidgetForUser();
	                if (widgetData) {
	                    this.adapterService.removeBubble();
	                    this.removeTutorialHandFromScreen(true);
	                    this.drawWidget(widgetData);
	                    this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetDrawn');
	                }

	                this.isFirstLoading = false;

	            }

	            if (location.href !== this.previousUrl) {
	                this.previousUrl = location.href;
	                if (this.isWidgetExist() && !window.location.href.includes('/game/')) {
	                    this.removeWidget();
	                    this.adapterService.trackEvent(this.adapterService.apiKey, this.adapterService.externalId, 'widgetRemoved');
	                    this.adapterService.drawBubble(this.adapterService.clientUri, this.adapterService.apiData);
	                    if (this?.adapterService.apiData?.tutorial && this?.adapterService.apiData?.tutorial?.step === 0) {
	                        uiTutorialHelper.showHandIfTutorialExist();
	                    }
	                }

	                if (location.href.includes('/game/') && !this.isWidgetExist()) {
	                    const widgetData = this.findMissionWidgetForUser();
	                    if (widgetData) {
	                        this.adapterService.removeBubble();
	                        this.removeTutorialHandFromScreen(true);
	                        this.drawWidget(widgetData);
	                    }
	                }
	            }
	        });

	        const config = {subtree: true, childList: true};
	        observer.observe(document, config);
	    }
	}

	var hasRequiredAdapter;

	function requireAdapter () {
		if (hasRequiredAdapter) return adapter.exports;
		hasRequiredAdapter = 1;
		(function (module, exports) {
			const {uiHelper} = uiHelper$1;
			const P2WCommunicationService = requireCommunicationService();
			const {uiHelperAnimate} = uiHelperAnimate$1;
			const {uiTutorialHelper} = uiHelper_tutorial;
			const TutorialService$1 = TutorialService;
			const {trackingHelper} = tracking_helper;
			const Widget$1 = Widget;
			const {UiWidget} = uiHelper_widget;
			const widgetService = Widget;

			class Adapter {

			    overlay = document.createElement('div');
			    popupContainer = document.createElement('div');
			    spinnerContainer = document.createElement('div');
			    spinner = document.createElement('div');
			    iframe = document.createElement('iframe');
			    eventOpen = new CustomEvent("openIframe");
			    eventClose = new CustomEvent("closeIframe");


			    isIframeOpened = false;
			    dmOpened = false;
			    pbOpened = false;
			    storeOpened = false;
			    isSubscribedToStorageListener = false
			    apiData;

			    clientUri =  'https://client-lendos-clone.vercel.app/'
			    srUrl = "https://wss.staging.plug2win.com/dataExchange"
			    landingBubble = true;

			    apiKey;
			    externalId;
			    segments;

			    openReplayInitialised;
			    initStartTime;
			    WidgetService = Widget$1.getInstance(this);


			    static getInstance(apiKey, externalId, segments) {
			        if (!Adapter.instance) {
			            Adapter.instance = new Adapter();
			        }

			        Adapter.instance.apiKey = apiKey;
			        Adapter.instance.externalId = externalId;
			        Adapter.instance.segments = segments;

			        return Adapter.instance;
			    }


			    constructor() {
			    }


			    init = async (isLocalEnv) => {

			        const currentGeo = await this.getCurrentGeoAndCurrency();
			        const regModel = JSON.parse(localStorage.getItem('REGISTRATION_MODEL'));

			        this.userData = {
			            apiKey: this.apiKey,
			            userId: this.externalId,
			            geoOrigin: regModel?.country ?? currentGeo?.country_code,
			            geoCurrent: currentGeo?.country_code ?? regModel?.country,
			            segments: this.segments,
			            currency: this.getCurrencyCode() ?? regModel?.currency,
			            locale: this.getLocale() ?? 'EN'
			        };

			        const communicationService = P2WCommunicationService.getInstance();
			        // from mainApi
			        this.connection = communicationService.initWssCommunication(isLocalEnv, () => {
			                if (isLocalEnv) {
			                    this.apiData = this.getMockApiData();
			                    window.localStorage.removeItem('widgetPositionsPortrait');
			                    window.localStorage.removeItem('widgetPositionsLandscape');
			                    document.body.querySelector('#demo').addEventListener('mouseenter', (e) => {
			                        this.handleLandingEnterMouseEventOnDemo(e);
			                    });
			                    document.body.querySelector('#demo').addEventListener('touchstart', (e) => {
			                        this.handleLandingEnterMouseEventOnDemo(e);
			                    });
			                    // document.body.querySelector('#demo').addEventListener('mouseleave', (e) => {
			                    //     this.handleLandingLeaveMouseEventOnDemo(e)
			                    // })
			                    document.body.querySelector('#contact').addEventListener('mouseenter', (e) => {
			                        this.handleLandingEnterMouseEventOnContact(e);
			                    });


			                }
			            }, this.userData, this.srUrl, (data) => {
			                const elapsedTime = ((Date.now() - this.initStartTime) / 1000).toFixed(3);
			                console.table({elapsedTime});

			                this.apiData = JSON.parse(data?.message);

			                if (this.apiData.mg || this.apiData.pb || this.apiData.store) {
			                    if (!this.openReplayInitialised) {
			                        trackingHelper.setupOpenReplay(this.externalId);
			                        OpenReplay.setMetadata('isTutorialCompleted', this.apiData.tutorial?.step === 4);
			                        this.openReplayInitialised = true;
			                    }
			                }

			                if (this.isIframeOpened) {
			                    communicationService.sendMessageToClient({type: 'newData', message: this.apiData});
			                }

			                if (this.isIframeOpened) {
			                    this.checkUpdatedMechanicAvailabilityOnLive();
			                }


			                if (this.apiData.reason.type === 'missionComplete' && this.WidgetService.isWidgetExist()) {
			                    const isCurrentMissionCompleted = this.WidgetService.findCurrentCompletedMission(this?.apiData?.reason?.payload?.missionIds);
			                    if (isCurrentMissionCompleted.mission) {
			                        if (isCurrentMissionCompleted.redDot) {
			                            this.WidgetService.removeWidget(false, 'widgetData');
			                            this.WidgetService.drawWidget(isCurrentMissionCompleted.mission, false);
			                            UiWidget.createWarning(true);
			                        }
			                        const dmSrc = this.clientUri + `/dm?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}&fromWidget=true`;
			                        this.WidgetService.handleComplete(isCurrentMissionCompleted.mission, dmSrc);

			                    } else {
			                        UiWidget.createWarning(true);
			                    }
			                } else {
			                    if (!this.WidgetService.isWidgetExist()) {
			                        this.drawBubble(this.clientUri, this.apiData);
			                    }
			                }

			                // this.WidgetService.sessionStorageObserver()


			                if (this?.apiData?.tutorial && this?.apiData?.tutorial?.step === 0) {
			                    uiTutorialHelper.showHandIfTutorialExist();
			                }

			                if (this.apiData.isLiveReload && this.apiData.general.dmRed) {
			                    this.bounceBubble();
			                }
			            }, (data) => {
			                const message = JSON.parse(data?.message);

			                if (message?.result?.success) {
			                    if (this.apiData?.general?.balance >= 0) this.apiData.general.balance = message?.general?.balance;
			                    if (this.apiData?.pb?.balance >= 0) this.apiData.pb.balance = message?.pb?.balance;
			                }

			                communicationService.sendMessageToClient({type: 'pbHoldResponse', message});
			            }, (data) => {
			                const message = JSON.parse(data?.message);

			                if (message.result.success) {
			                    this.removePbFromBubble();
			                    if (message?.result?.success) ;
			                }

			                communicationService.sendMessageToClient({type: 'pbClaimResponse', message});
			            }, (data) => {
			                const message = JSON.parse(data?.message);
			                for (let i = 0; i < this.apiData?.mg?.missions?.length; i++) {
			                    if (this.apiData?.mg?.missions[i] && this.apiData?.mg?.missions[i]?.id === message?.missionId) {
			                        this.apiData.mg.missions[i] = {
			                            ...this.apiData?.mg?.missions[i], progress: message?.progress, status: message?.status
			                        };
			                    }
			                }
			                if (this.WidgetService.isWidgetExist()) {
			                    if (message?.missionId === this.WidgetService.lastGameID) {
			                        const widgetData = this.WidgetService.findMissionWidgetForUser();
			                        const dmSrc = this.clientUri + `/dm?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
			                        UiWidget.setProgress(widgetData.progress, widgetData.progressMax, this, dmSrc);
			                    }
			                }

			                communicationService.sendMessageToClient({type: 'missionProgress', message});
			            }, (data) => {
			                const message = JSON.parse(data?.message);


			                if (message?.result?.success) {
			                    for (let i = 0; i < this.apiData?.mg?.missions?.length; i++) {
			                        if (this.apiData?.mg?.missions[i] && this.apiData?.mg?.missions[i]?.id === message?.mission?.id) {
			                            this.apiData.mg.missions[i].status = message?.mission?.status;
			                        }
			                    }


			                    if (this.apiData?.general) this.apiData.general.balance = message?.general?.balance;

			                    this.apiData.mg.missions = this.sortMissions(this.apiData.mg.missions);
			                    this.apiData.general.dmRed = this.apiData.mg.missions.some((m) => m.status === 'completed');
			                }

			                if (this.WidgetService.isWidgetExist()) {
			                    const widgetData = this.WidgetService.findMissionWidgetForUser();
			                    this.WidgetService.removeWidget();
			                    if (widgetData) {
			                        this.WidgetService.drawWidget(widgetData, false);
			                    } else {
			                        this.drawBubble(this.clientUri, this.apiData, false);
			                        this.hideBubbleInShadows();
			                    }
			                } else {
			                    if (!this.apiData.general.dmRed) {
			                        this.redrawBubble();
			                        this.hideBubbleInShadows();
			                    }
			                }

			                communicationService.sendMessageToClient({
			                    type: 'missionClaim', message: {
			                        ...message, missions: this.apiData.mg.missions
			                    }
			                });
			            }, (data) => {
			                const message = JSON.parse(data?.message);

			                if (message?.result?.success) {
			                    if (this.apiData?.store?.offers && this.apiData?.store?.offers.length > 0) {
			                        if (!this.apiData?.store?.offers?.find(x => x.id === message?.store?.offerId)?.reusable) {
			                            this.apiData.store.offers = this.apiData?.store?.offers.filter(x => x.id !== message?.store?.offerId);
			                        }
			                    }

			                    if (this.apiData?.store?.offers?.length === 0) {
			                        this.removeStoreFromBubble();
			                    }


			                    if (this.apiData?.general) {
			                        this.apiData.general.balance = message?.general?.balance;
			                    }
			                }

			                communicationService.sendMessageToClient({type: 'offerClaim', message});
			            },
			            (data) => {
			                if (this.WidgetService.isWidgetExist()) {
			                    const message = JSON.parse(data?.message);
			                    if (this.WidgetService.lastGameID === message.missionId) {
			                        const widgetData = this.WidgetService.findMissionWidgetForUser();
			                        if (widgetData.showInfoInSlot) {
			                            this.WidgetService.handleWarning(widgetData);
			                        }
			                    }
			                }
			            }
			        );

			        //from client
			        communicationService.initIframeCommunication(
			            (message) => {
			                communicationService.sendMessageToClient({
			                    type: 'newData',
			                    message: message.fromWidget ? {...this.apiData, tutorial: null} : this.apiData
			                });
			            },
			            () => this.showLoadedIframe(),
			            (message) => this.redirectToCtaUrlWithProperOrigin(message),
			            () => this.removeIframe(),
			            () => this.hideBubbleInShadows(),
			            () => this.resetShadowsOverBubble(),
			            (message) => {

			                console.log(message, 'message track');
			                if (message.type === 'TheEnd') {
			                    document.body.querySelectorAll('#p2w-bubble')?.forEach(e => e.remove());
			                    document.body.querySelector('#demo').removeAttribute('id');
			                    this.removeIframe();
			                    this.landingBubble = false;
			                    let scripts = document.querySelectorAll('script');
			                    scripts.forEach((script) => {
			                        if(script.getAttribute('src') === 'p2w-adapter.bundle.staging.js') {
			                            script.remove();
			                        }
			                    });
			                    document.body.querySelector('.form-container').style.height = 0;
			                    this.WidgetService.removeWidget();
			                    window.scrollTo({
			                        top: 0,
			                        behavior: "smooth"
			                    });
			                }
			                if(message.type === 'clickGoToMission' || message.type === 'clickInfoMission') return
			                communicationService.sendMessageToClient({
			                    type: 'missionProgress',
			                    message: {
			                        ...this.apiData.mg.missions.find(mission => mission.id === message.entityId),
			                        rewards: this.apiData.mg.missions.find(mission => mission.id === message.entityId).rewards,
			                        reward: this.apiData.mg.missions.find(mission => mission.id === message.entityId).rewards,
			                        status: 'claimed',

			                        missionId: message.entityId,
			                        type: 'missionProgress',
			                        general: {balance: this.apiData.mg.missions.find(mission => mission.id === message.entityId)?.rewards || 0},
			                        isLiveReload: true,
			                        result: {success: true},
			                    }
			                });
			                this.apiData.mg.missions.map(mission => {
			                    if (mission.id === message.entityId) {
			                        mission.status = 'claimed';
			                    }
			                });



			                if (this.apiData.general.balance >= 5000 && message.type === 'clickGetMissionReward') {
			                    this.apiData.tutorial.step = 3;
			                    this.apiData.store = {
			                        offers: [{
			                            id: "tutorialOffer",
			                            name: " P2W Discount",
			                            description: "Drive growth with \n a special discount \n on P2W gamification solutions",
			                            type: "freeSpins",
			                            price: 5000,
			                            reusable: false,
			                            reward: 777
			                        },
			                            {
			                                id: "4",
			                                name: " VIP Target",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 7770,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "5",
			                                name: " VIP Target",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 6660,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "6",
			                                name: " Conversion Kick",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 9999,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "7",
			                                name: "Live-ops",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 13000,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "8",
			                                name: " Retention Boost",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 9876,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "9",
			                                name: "Bet Frequency",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 122200,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "10",
			                                name: "Session Surge",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 50200,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "11",
			                                name: "Churn Control",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 66600,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                            {
			                                id: "12",
			                                name: "Event Boost",
			                                description: "VIP Target",
			                                type: "bonusCash",
			                                price: 999999,
			                                endDate: "2030-04-28T23:01:43.000Z",
			                                reusable: false,
			                            },
			                        ]
			                    };
			                    setTimeout(() => {
			                        const tutorialService = TutorialService$1.getInstance(this);
			                        tutorialService.showStep11();
			                    },3000);
			                    // this.buildIframe(this.clientUri + `/store?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`)
			                }
			            }, (message) => {
			                this.connection.invoke("pbHold", {
			                    ...message, externalId: this.externalId, apiKey: this.apiKey
			                }).then(() => console.log('sent pbHold'));
			            }, (message) => {
			                this.connection.invoke("pbClaim", {
			                    ...message, externalId: this.externalId, apiKey: this.apiKey
			                }).then(() => console.log('sent pbClaim'));
			            }, (message) => {
			                this.apiData.general.balance += this.apiData.mg.missions.find(mission => mission.id === message.missionId)?.rewards || 0;
			                communicationService.sendMessageToClient({
			                    type: 'missionClaim',
			                    message: {
			                        missions: this.apiData.mg.missions.map(mission => {
			                            if (mission.id === message.missionId) {
			                                mission.status = 'completed';
			                                mission.reward = mission.rewards;
			                            }
			                            return mission;
			                        }),
			                        mission: {
			                            ...this.apiData.mg.missions.find(mission => mission.id === message.missionId),
			                            reward: this.apiData.mg.missions.find(mission => mission.id === message.missionId).rewards,
			                            status: 'completed',
			                        }
			                        ,
			                        type: 'missionClaim',
			                        general: {...this.apiData.general},
			                        isLiveReload: true,
			                        result: {success: true},
			                    }
			                });
			                console.log(this.apiData, 'apiData');
			            }, (message) => {
			                console.log(message, 'offerClaim offerClaim!!');
			                this.apiData.general.balance = this.apiData.store.offers[0].price;
			                communicationService.sendMessageToClient({
			                    type: 'offerClaim',
			                    message: {
			                        store: this.apiData.store.offers[0],
			                        general: this.apiData.general,
			                        result: {success: true},
			                        type: 'offerClaim',
			                    },
			                    result: {success: true},
			                });
			                // this.connection.invoke("offerClaim", {
			                //     ...message, externalId: this.externalId, apiKey: this.apiKey
			                // }).then(() => console.log('sent offerClaim'))
			            }, (message) => {
			                this.animateOffer(message.componentPositions);
			            }, (message) => {
			                switch (message?.step) {
			                    case 0: {
			                        this.increaseTutorialStep(message);
			                        break;
			                    }
			                    case 1: {
			                        this.increaseTutorialStep(message);
			                        this.hideBubbleInShadows();
			                        this.apiData.general.balance = this.apiData.general.balance + this?.apiData?.tutorial?.tutorialMissionReward || 0;
			                        communicationService.sendMessageToClient({type: 'newData', message: this.apiData});
			                        this.redrawBubble();
			                        break;
			                    }
			                    case 2: {
			                        this.increaseTutorialStep(message);
			                        this.hideBubbleInShadows();
			                        this.apiData.general.balance = this.apiData.general.balance + this?.apiData?.tutorial?.tutorialMissionReward || 0;
			                        communicationService.sendMessageToClient({type: 'newData', message: this.apiData});
			                        const dmSrc = this.clientUri + `/dm?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
			                        this.buildIframe(dmSrc);
			                        this.resetShadowsOverBubble();
			                        this.redrawBubble();
			                        break;
			                    }
			                    case 3: {
			                        this.increaseTutorialStep(message);
			                        this.apiData.general.balance = this.apiData.general.balance - (this?.apiData?.tutorial?.tutorialMissionReward * 2);
			                        communicationService.sendMessageToClient({type: 'newData', message: this.apiData});
			                        const tutorialService = TutorialService$1.getInstance(this);
			                        tutorialService.showStep15();
			                        this.drawBubble(this.clientUri, this.apiData, false);
			                        // this.redrawBubble();
			                        uiHelper.removeBubbleToLocalStoragePosition();
			                        break;
			                    }
			                }
			            },
			            (message) => {
			                const tutorialService = TutorialService$1.getInstance(this);
			                tutorialService.setTutorialCoordinates(this.apiData, message?.element, message?.coordinates);

			            },
			            () => {
			                uiTutorialHelper.hideTutorialHints();
			            }
			        );

			        this.watchForLocaleChange((updatedUserData) => {
			            communicationService.sendInit(this.connection, updatedUserData);
			        });

			        this.initStartTime = Date.now();
			    }

			    handleLandingEnterMouseEventOnDemo(event) {
			        if(!this.landingBubble) return;
			        if (!this.isBubbleExist()) {

			            this.drawBubble(this.clientUri, this.apiData, true); // temporary for bubble development
			            uiTutorialHelper.addTutorialStyles();
			            setTimeout(() => {
			                let bubble = document.querySelector('#p2w-bubble');
			                if (bubble) {
			                    bubble.style.animation = '1.3s ease-in-out heartBeatBubble infinite';
			                }
			            }, 1500);

			        }
			    }

			    handleLandingLeaveMouseEventOnDemo() {
			        this.removeBubble();
			        while (uiTutorialHelper.isHandOnScreen()) {
			            uiTutorialHelper.hideHand();
			        }
			    }


			    handleSessionWidgetProgress(event, WidgetService, isUpdate) {
			        if (WidgetService.landingLastProgressWidget !== 100) {

			            let inputArrayNotCheckBox = Array.from(document.querySelectorAll('#contact input:not([type="checkbox"])'));
			            let inputCheckBox = document.querySelector('#contact input[type="checkbox"]');
			            const isEmailValid = inputArrayNotCheckBox.some(input => input.type === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));

			            let filledInputsNotCheckBox = inputArrayNotCheckBox.filter(input => input.value.trim() !== '');
			            let progressInputCheckBox = inputCheckBox.checked ? 10 : 0;

			            let progress = filledInputsNotCheckBox.length * 20;
			            progress += progressInputCheckBox;
			            const submitBtn = document.querySelector('button[type="submit"]');

			            if (event.target === submitBtn) {
			                progress += 5;
			                if (isEmailValid) {
			                    progress += 5;

			                }
			            }
			            this.apiData.mg.missions.find(mission => {
			                if (mission.id === '2') {
			                    mission.progress = progress.toString();
			                    if (progress === 100) {
			                        mission.status = 'completed';
			                    }
			                }
			            });

			            const widgetData = WidgetService.emulateWidgetProgress(progress);
			            if (isUpdate && widgetService.landingLastProgressWidget !== progress) {
			                const dmSrc = this.clientUri + `/dm?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData.userId}&hash=${Math.random().toString(36).slice(2, 7)}`;
			                if (progress !== 100) {
			                    UiWidget.setProgress(widgetData.progress, widgetData.progressMax, this, dmSrc);
			                } else {
			                    this.apiData.tutorial.step = 100;
			                    WidgetService.handleComplete(widgetData, dmSrc);
			                    this.removeClickListener();
			                }
			            }
			            if (!isUpdate) {
			                WidgetService.drawWidget(widgetData, false);
			            }
			            widgetService.landingLastProgressWidget = progress;
			        }
			    }


			    handleLandingEnterMouseEventOnContact(e) {
			        if (this.isBubbleExist()) {
			            this.handleLandingLeaveMouseEventOnDemo();
			        }

			        if (!this.WidgetService.isWidgetExist() && widgetService.landingLastProgressWidget !== 100) {
			            this.handleSessionWidgetProgress(e, this.WidgetService, false);
			            this.addClickListener(); // Add click listener
			        }
			    }

			    addClickListener() {
			        this.handleClickListener = (e) => this.handleSessionWidgetProgress(e, this.WidgetService, true);
			        document.addEventListener("click", this.handleClickListener);
			    }


			    removeClickListener() {
			        document.removeEventListener("click", this.handleClickListener);
			    }





			    redirectToCtaUrlWithProperOrigin = (urlFromParams) => {
			        const url = new URL(urlFromParams);
			        //#tutorial
			        if (url.protocol === 'p2w:' && url.href.includes('pb') && this.apiData?.tutorial && this.apiData.tutorial.step === 2) {
			            const tutorialService = TutorialService$1.getInstance(this);
			            tutorialService.showStep6();
			        } else if (url.protocol === 'p2w:' && url.href.includes('store') && this.apiData?.tutorial && this.apiData.tutorial.step === 3) {
			            this.apiData.tutorial.step = 3;
			            const tutorialService = TutorialService$1.getInstance(this);
			            tutorialService.showStep11();
			        } else if (url.href.includes('pb')) {
			            this.buildIframe(this.clientUri + `/pb?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`);
			        } else if (url.href.includes('store')) {
			            this.buildIframe(this.clientUri + `/store?lang=${this.userData?.locale ?? 'en'}&userId=${this.userData?.userId}&hash=${Math.random().toString(36).slice(2, 7)}`);
			        } else {
			            let currentOriginWithNewUri = window.location.origin;
			            if (url.pathname) {
			                currentOriginWithNewUri = currentOriginWithNewUri + url.pathname;
			            }
			            if (url.search) {
			                currentOriginWithNewUri = currentOriginWithNewUri + url.search;
			            }
			            if (url.hash) {
			                currentOriginWithNewUri = currentOriginWithNewUri + url.hash;
			            }
			            this.removeIframe();
			            document.location.href = currentOriginWithNewUri;
			            document.querySelector('#first-name').focus().click();
			        }
			    }

			    watchForLocaleChange = (downloadNewLocale) => {
			        document.getElementsByClassName('language-links-with-name__link')?.[0]?.addEventListener('click', (event) => {
			            setTimeout(() => {
			                const maybeNewLocale = this.getLocale() ?? 'EN';
			                if (this.userData.locale !== maybeNewLocale) {
			                    this.userData = {...this.userData, locale: maybeNewLocale};

			                    downloadNewLocale(this.userData);
			                }
			            }, 200);

			        });
			    }

			    animateOffer = (initialPositions) => {
			        let positionBell = document.querySelector('.notification-center__button').getBoundingClientRect();
			        const correctionOnIframeSize = this.iframe.getBoundingClientRect();
			        const styleElement = document.createElement('style');
			        const animationTime = 1500;
			        styleElement.textContent = `
            #offerAnimationDiv{
                animation-duration: ${animationTime}ms;
                animation-fill-mode: forwards ease;
                pointer-events: none;
                animation-name: fly-to-bell;
                position: absolute;
                z-index: 10002;
                width: ${positionBell.width}px;
                height:${positionBell.height}px;
            }
            @keyframes fly-to-bell {
                0%{
                    left:${initialPositions.left + initialPositions.width / 2 + correctionOnIframeSize.left - positionBell.width / 2}px;
                    top:${initialPositions.top + initialPositions.height / 2 + correctionOnIframeSize.top - positionBell.height / 2}px;
                }
                33%{
                    left:${positionBell.left}px;
                }
                100%{
                    left:${positionBell.left}px;
                    top: ${positionBell.top}px;
                }
            }
        }
        `;
			        document.head.appendChild(styleElement);

			        let offerAnimationDiv = document.createElement('div');
			        offerAnimationDiv.id = 'offerAnimationDiv';
			        document.body.append(offerAnimationDiv);

			        uiHelperAnimate.styleTrailAnimations();
			        uiHelperAnimate.trailAnimation();

			        setTimeout(() => {
			            document.body.removeChild(offerAnimationDiv);
			        }, animationTime + 500);
			    }

			    redrawBubble = () => {
			        this.removeBubble();
			        this.drawBubble(this.clientUri, this.apiData, false);
			        if (this.isIframeOpened) {
			            uiHelper.moveBubbleToIframe(screen.width > screen.height, this.iframe.getBoundingClientRect());
			        }
			    }

			    isBubbleExist = () => !!document.body.querySelector('#p2w-bubble');
			    removeBubble = () => document.body.querySelector('#p2w-bubble')?.remove();
			    removePbFromBubble = () => document.body.querySelector('.p2w-link-pb').remove();
			    removeMgFromBubble = () => document.body.querySelector('.p2w-link-dm').remove();
			    removeStoreFromBubble = () => document.body.querySelector('.p2w-link-store').remove();
			    // .link-store, .link-dm


			    appendBubbleToBody = (bubbleButton, availableMechanics) => {
			        //#tutorial
			        if (!this.apiData.tutorial || this.apiData.tutorial.step > 1) {
			            if (Object.values(availableMechanics).some(el => el)) {
			                document.body.appendChild(bubbleButton);
			            }
			        } else {
			            document.body.appendChild(bubbleButton);
			        }
			    }

			    drawBubble = (hostUrl, apiData, withAnimation = true, isAdditionalBubble) => {
			        let animateBubbleOnDraw = withAnimation;
			        const isBubbleAlreadyExists = this.isBubbleExist();
			        if (isBubbleAlreadyExists) {
			            this.removeBubble();
			            animateBubbleOnDraw = false;
			        }

			        const styleElement = document.createElement('style');
			        const availableMechanics = this.checkAvailableMechanics(apiData);
			        const redDots = this.checkRedDots(apiData);
			        const calculatedExpandedBubbleHeight = availableMechanics ? Object.values(availableMechanics).reduce((acc, val) => acc + val, 0) * 100 + 200 : 0;

			        styleElement.textContent = uiHelper.getBubbleCssStyles(calculatedExpandedBubbleHeight);
			        document.head.appendChild(styleElement);

			        let timeoutHideLinks;

			        let bubbleButton = uiHelper.createBubbleButton(animateBubbleOnDraw);

			        uiHelper.appendBubbleElementsInBubble(bubbleButton, this.userData?.locale, hostUrl, availableMechanics, redDots, this.buildIframe, this.userData?.userId);

			        if (availableMechanics && Object.values(availableMechanics).some(el => el)) {
			            if (isAdditionalBubble) {
			                let place = document.querySelector('.additional-bubble');
			                if (place) {
			                    bubbleButton.setAttribute('isAdditionalBubble', true);
			                    place.appendChild(bubbleButton);
			                }
			            } else {
			                let place = document.querySelector('.sticky-casino');
			                if (place) {
			                    place.appendChild(bubbleButton);
			                }
			            }

			        }

			        uiHelper.mobileDraggableBubble(bubbleButton, this.trackEvent, this.apiKey, this.externalId);

			        const bubbleHandler = () => {
			            //#tutorial
			            if (!this?.apiData?.tutorial || this?.apiData?.tutorial?.step > 1) {
			                if (this?.apiData?.tutorial?.step > 1) {
			                    uiTutorialHelper.addTutorialStyles();
			                }
			                let type = !this?.apiData?.tutorial ? 'expandBubble' : this?.apiData?.tutorial?.step !== 4 ? 'expandBubbleBeforeFullTutorialCompletion' : 'expandBubble';
			                this.expandBubble(bubbleButton, timeoutHideLinks, type);
			            } else {
			                const tutorialService = TutorialService$1.getInstance(this);
			                if (this.apiData?.tutorial?.step === 0) {
			                    // this.trackEvent(this.apiKey, this.externalId, 'clickTutorFirstTimeBubble')
			                    tutorialService.showStep1();
			                } else if (this.apiData?.tutorial?.step === 1) {
			                    this.trackEvent(this.apiKey, this.externalId, 'clickTutorialBubbleAndGoToDmStep1');
			                    uiTutorialHelper.addTutorialStyles();
			                    tutorialService.showStep2();
			                }
			            }
			        };

			        uiHelper.setExpandBubbleHandler(bubbleButton, bubbleHandler);
			        uiHelper.hideBubbleContentAfterClickWithoutBubble();

			        // uiHelper.removeBubbleToLocalStoragePosition()
			    }

			    //#tutorial


			    increaseTutorialStep = (message) => {
			        this.apiData.tutorial.step = message?.step + 100;
			        // this.connection.invoke('tutorialProgress', {
			        //     ...message, externalId: this.externalId, apiKey: this.apiKey
			        // }).then(() => console.log('sent tutorialProgress'))
			    }


			    expandBubble = (button, timeoutHideLinks, type) => {
			        if (timeoutHideLinks) {
			            clearTimeout(timeoutHideLinks);
			        }

			        button.classList.toggle('p2w_active');
			        if (button.classList.contains('p2w_active')) {
			            this.trackBubbleExpand(this.apiKey, this.externalId, type);
			        }
			        timeoutHideLinks = setTimeout(() => {
			            button.classList.remove('p2w_active');
			        }, 10000);
			    }

			    bounceBubble = () => {
			        let bubble = document.querySelector('#p2w-bubble');
			        bubble.style.animationName = 'bounce';
			        bubble.style.animationDuration = '2s';
			        bubble.style.transformOrigin = 'center bottom';
			        setTimeout(() => {
			            bubble.style.animation = 'none'; // Remove animation
			            bubble.style.transformOrigin = ''; // Reset transform origin
			        }, 2000);
			    }

			    trackEvent = (apiKey, userId, type) => {
			        // this.connection.invoke("track", {
			        //     type: type,
			        //     externalId: userId,
			        //     apiKey: apiKey,
			        //     entityId: null,
			        //     amount: null
			        // }).then(() => console.log(`sent track ${type}`))
			    }

			    trackBubbleExpand = (apiKey, userId, type = 'expandBubble') => {
			        this.trackEvent(apiKey, userId, type);
			    }

			    trackOpenDm = (apiKey, userId) => {
			        this.dmOpened = true;
			        this.trackEvent(apiKey, userId, 'openDm');
			    }

			    trackOpenPb = (apiKey, userId) => {
			        this.pbOpened = true;
			        this.trackEvent(apiKey, userId, 'openPb');
			    }

			    trackOpenStore = (apiKey, userId) => {
			        this.storeOpened = true;
			        this.trackEvent(apiKey, userId, 'openStore');
			    }

			    getCurrencyCode = () => {
			        const balanceElements = document.querySelectorAll('.header__user-balance');
			        let currencyCode;

			        balanceElements.forEach(element => {
			            const text = element.textContent.trim();
			            const matches = text.match(/[A-Z]{2,3}/);
			            if (matches) {
			                currencyCode = matches[0];
			            }
			        });

			        return currencyCode;
			    }

			    getLocale = () => {
			        let result;

			        try {
			            const url = window.location.href;
			            const regex = /\/([a-z]{2})(?:-([A-Z]{2}))?(?:\/|$)/;
			            const match = url.match(regex);

			            if (match) {
			                result = match[2] ? match[2] : match[1];
			                result = result.toUpperCase();
			            }
			        } catch {
			            result = 'EN';
			        }

			        return result;
			    }


			    checkAvailableMechanics = (apiData) => {
			        const mechanicsAvailabilityIndependentFromTutorial = {
			            isMgAvailable: !!apiData.mg, isStoreAvailable: !!apiData.store, isPbAvailable: !!apiData.pb,
			        };

			        //#tutorial logic
			        const tutorialStep = apiData?.tutorial?.step;
			        if (tutorialStep && tutorialStep < 4 && Object.values(mechanicsAvailabilityIndependentFromTutorial).some(x => x)) {
			            return {
			                isMgAvailable: true, isStoreAvailable: false, isPbAvailable: false,
			            }
			            // if (tutorialStep && tutorialStep >= 3) {
			            //     return {
			            //         isMgAvailable: true, isStoreAvailable: false, isPbAvailable: true,
			            //     }
			            // } else if (tutorialStep && tutorialStep >= 2) {
			            //     return {
			            //         isMgAvailable: true, isStoreAvailable: false, isPbAvailable: false,
			            //     }
			            // } else {
			            //     return {
			            //         isMgAvailable: true, isStoreAvailable: false, isPbAvailable: false,
			            //     }
			            // }
			        } else {
			            return mechanicsAvailabilityIndependentFromTutorial
			        }
			    }

			    checkRedDots = (apiData) => {
			        //#tutorial logic
			        const tutorialStep = apiData?.tutorial?.step;
			        if (tutorialStep && tutorialStep < 4) {
			            if (tutorialStep && tutorialStep >= 3) {
			                return {
			                    dmRed: true, storeRed: false, pbRed: false,
			                }
			            } else if (tutorialStep && tutorialStep >= 2) {
			                return {
			                    dmRed: true, storeRed: false, pbRed: false,
			                }
			            } else {
			                return {
			                    dmRed: true, storeRed: true, pbRed: false,
			                }
			            }
			        } else {
			            return {
			                pbRed: apiData.general.pbRed, dmRed: apiData.general.dmRed, storeRed: apiData.general.storeRed,
			            }
			        }
			    }

			    getRightWidthDesktop = () => this.getWidth() > 1920 ? '75%' : '84%';

			    checkUpdatedMechanicAvailabilityOnLive() {
			        if ((!this.apiData.mg && this.dmOpened) || (!this.apiData.pb && this.pbOpened) || (!this.apiData.store && this.storeOpened)) {
			            this.removeIframe();
			        }
			    }

			    checkMechanicAndTrack = (url) => {
			        if (url.includes('/dm?') && (!this.apiData?.tutorial || this.apiData.tutorial.step >= 2)) {
			            this.trackOpenDm(this.apiKey, this.externalId);
			        } else if (url.includes('/pb?') && (!this.apiData?.tutorial || this.apiData.tutorial.step >= 3)) {
			            this.trackOpenPb(this.apiKey, this.externalId);
			        } else if (url.includes('/store?') && (!this.apiData?.tutorial || this.apiData.tutorial.step >= 4)) {
			            this.trackOpenStore(this.apiKey, this.externalId);
			        }
			    }

			    buildIframe = (src) => {
			        this.checkMechanicAndTrack(src);

			        this.overlay.style.position = 'fixed';
			        this.overlay.style.top = '0';
			        this.overlay.style.left = '0';
			        // this.overlay.style.width = '100%';
			        this.overlay.style.width = '100vw';
			        // this.overlay.style.height = '100%';
			        this.overlay.style.height = '100vh';
			        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
			        this.overlay.style.zIndex = '9999';

			        this.popupContainer.style.position = 'fixed';
			        this.popupContainer.style.top = '50%';
			        this.popupContainer.style.left = '50%';
			        this.popupContainer.style.transform = 'translate(-50%, -50%)';
			        this.popupContainer.style.aspectRatio = this.isDesktopOrientation() ? '16/9' : ' ';


			        this.popupContainer.style.width = '100%';
			        this.popupContainer.style.height = '100%';


			        this.popupContainer.style.backgroundColor = 'transparent';
			        this.popupContainer.style.zIndex = '10000';
			        this.popupContainer.style.overflow = 'hidden';

			        this.spinnerContainer.style.position = 'absolute';
			        this.spinnerContainer.style.top = '50%';
			        this.spinnerContainer.style.left = '50%';
			        this.spinnerContainer.style.transform = 'translate(-50%, -50%)';

			        this.spinner.style.width = '50px';
			        this.spinner.style.height = '50px';
			        this.spinner.style.border = '5px solid #f3f3f3';
			        this.spinner.style.borderTop = '5px solid #3498db';
			        this.spinner.style.borderRadius = '50%';
			        this.spinner.style.margin = 'auto';
			        this.spinner.style.animation = 'spin 1s linear infinite';

			        this.spinnerContainer.appendChild(this.spinner);

			        this.iframe.id = 'p2w-iframe';
			        this.iframe.src = src;
			        this.iframe.style.position = 'fixed';
			        this.iframe.style.top = '50%';
			        this.iframe.style.left = '50%';
			        this.iframe.style.transform = 'translate(-50%, -50%)';


			        this.iframe.style.width = '100%';
			        this.iframe.style.height = '100%';
			        this.iframe.style.borderRadius = '0';


			        this.iframe.style.border = 'none';
			        this.iframe.style.display = 'none';

			        this.popupContainer.appendChild(this.spinnerContainer);
			        this.popupContainer.appendChild(this.iframe);

			        document.body.appendChild(this.overlay);
			        document.body.appendChild(this.popupContainer);
			        this.drawBubble(this.clientUri, this.apiData, false, true);
			        this.blockCasinoScroll();

			        const _this = this;
			        this.overlay.addEventListener('click', function () {
			            _this.removeIframe();
			        },);
			    }

			    compareStatuses = (a, b) => {
			        const statusesOrder = ['completed', 'started', 'inactive', 'claimed'];

			        return statusesOrder.indexOf(a) - statusesOrder.indexOf(b)
			    }

			    sortMissions = (missions) => {
			        return missions.sort((a, b) => {
			            const statusComparison = this.compareStatuses(a.status, b.status);

			            if (statusComparison !== 0) {
			                return statusComparison
			            }
			            return a.priority - b.priority // Compare priorities if statuses are the same
			        })
			    }

			    blockCasinoScroll() {
			        document.querySelector('body').style.overflow = 'hidden';
			        let bbls = document.querySelectorAll('#p2w-bubble');
			        bbls.forEach(bbl => {
			            if (bbl.hasAttribute('isAdditionalBubble')) {
			                bbl.style.position = 'fixed';
			            }
			        });

			    }

			    unblockScroll() {
			        document.querySelector('body').style.overflow = 'auto';
			        // document.querySelector('#p2w-bubble').style.position = 'absolute'
			        let bbls = document.querySelectorAll('#p2w-bubble');
			        bbls.forEach(bbl => {
			            if (bbl.hasAttribute('isAdditionalBubble')) {
			                bbl.remove();
			            }
			        });
			        // this.removeBubble()
			    }

			    showLoadedIframe = () => {
			        this.spinner.style.display = 'none';
			        this.iframe.style.filter = 'drop-shadow(0px 7.5px 3.75px rgba(0, 0, 0, 0.5))';
			        this.iframe.style.boxShadow = 'inset -1.5px -1.5px 0px rgba(153, 249, 249, 0.15), inset 1.5px 1.5px 0px rgba(255, 255, 255, 0.15)';
			        this.iframe.style.display = 'block';

			        setTimeout(() => {
			            if (this.isBubbleExist()) {
			                uiHelper.moveBubbleToIframe(screen.width > screen.height, this.iframe.getBoundingClientRect(), !this.isIframeOpened);
			            }
			            this.isIframeOpened = true;
			            this.iframe.dispatchEvent(this.eventOpen);
			        }, 100);
			    }

			    removeIframe = () => {
			        this.isIframeOpened = false;
			        this.dmOpened = false;
			        this.pbOpened = false;
			        this.storeOpened = false;

			        document.body.removeChild(this.overlay);
			        document.body.removeChild(this.popupContainer);

			        const bubble = document?.querySelector('#p2w-bubble');
			        bubble?.classList?.remove('p2w-opened-iframe');

			        uiHelper.removeBubbleToLocalStoragePosition();
			        this.unblockScroll();
			        this.resetShadowsOverBubble();

			        this.iframe.dispatchEvent(this.eventClose);
			    }
			    hideBubbleInShadows = () => {
			        let bubble = document.querySelector('#p2w-bubble');
			        bubble.classList.remove('p2w_active');
			        bubble.style.cursor = 'auto';
			        bubble.style.opacity = '0.3';
			        bubble.disabled = true;
			    }

			    resetShadowsOverBubble = () => {
			        let bubble = document.querySelector('#p2w-bubble');
			        if (bubble) {
			            bubble.style.cursor = 'pointer';
			            bubble.style.opacity = '1';
			            bubble.disabled = false;
			        }
			    }

			    exports = {
			        init: this.init, removeIframe: this.removeIframe, showLoadedIframe: this.showLoadedIframe
			    };

			    isIos = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)// && window.innerWidth > window.innerHeight;
			    isAndroid = () => /Android/i.test(navigator.userAgent)// && window.innerWidth > window.innerHeight;
			    getWidth = () => this.getRealBrowserSize().width;
			    getHeight = () => this.getUsableHeight();
			    isDesktopOrientation = () => this.getWidth() > this.getHeight();
			    isMobile = () => this.isAndroid() || this.isIos();


			    getRealBrowserSize = () => {
			        var browserWidth = Math.min(...[document.documentElement.clientWidth || 0, window.innerWidth || 0, window.screen.availWidth || 0].filter(x => x > 0));
			        var browserHeight = Math.min(...[document.documentElement.clientHeight || 0, window.innerHeight || 0, window.screen.availHeight || 0].filter(x => x > 0));
			        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

			        // Check for iOS devices
			        if (/(iPad|iPhone|iPod)/g.test(navigator.platform)) {
			            if (window.orientation === 0 || window.orientation === 180) {
			                browserHeight = window.innerHeight - 60; // 60px is the height of the address bar
			            } else {
			                browserHeight = window.innerHeight - 30; // 30px is the height of the address bar
			            }
			        }

			        if (isMobile && /Android/g.test(navigator.userAgent)) {
			            browserHeight = Math.floor(screen.availHeight / window.devicePixelRatio);
			        }

			        return {width: browserWidth, height: browserHeight};
			    }

			    getUsableHeight = () => {

			        // check if this page is within a app frame
			        var isInAppMode = ("standalone" in navigator && navigator.standalone) || (window.chrome && window.top.chrome.app && window.top.chrome.app.isInstalled);

			        var ua = navigator.userAgent;
			        // memoized values
			        var isIphone = ua.indexOf('iPhone') !== -1 || ua.indexOf('iPod') !== -1;
			        var isIpad = ua.indexOf('iPad') !== -1;
			        var isAndroid = ua.indexOf('Android') !== -1;
			        var isMobile = isIphone || isIpad || isAndroid;

			        // compute the missing area taken up by the header of the web browser to offset the screen height
			        var usableOffset = 0;
			        if (isIphone) {
			            usableOffset = 20;
			        } else if (isAndroid && ua.indexOf('Chrome') === -1) {
			            usableOffset = 1;
			        }

			        return function () {
			            if (!isMobile) {
			                return window.innerHeight;
			            }
			            var isLandscape = window.innerWidth > window.innerHeight, height;
			            // on ios devices, this must use screen
			            if (isIphone) {
			                height = isLandscape ? screen.width : screen.height;
			                if (!isInAppMode) {
			                    height -= isLandscape ? 32 : 44;
			                    height += 1;
			                }
			            } else {
			                height = (isLandscape ? window.outerWidth : window.outerHeight) / (window.devicePixelRatio || 1);
			            }
			            return height - usableOffset;
			        };
			    }

			    getCurrentGeoAndCurrency = async () => {
			        // try {
			        //     const response = await fetch('https://www.moonwin.com/api/current_ip');
			        //     if (!response.ok) {
			        //         throw new Error('Network response was not ok');
			        //     }
			        //     return await response.json();
			        // } catch (error) {
			        //     console.error('error while getting current geo:::')
			        //     console.error(error)
			        // }
			    }

			    getMockApiData = () => ({
			        mg: {
			            id: "landing-1",
			            name: "Daily missions",
			            info: 'Plug 2 Win transforms engagement with dynamic gamified missions and rewards, capturing users’ interest from the first interaction',
			            dateEnd: "2025-04-28T23:01:43.000Z",
			            missions: [{
			                id: "1",
			                name: "Visit Plug 2 Win",
			                shortDesc: "Explore Plug 2 Win!",
			                longDesc: "Dive in and explore what Plug 2 Win offers!",
			                ctaUrl: "",
			                rewards: 1000,
			                progress: "1",
			                progressMax: '1',
			                status: "completed",
			                iconUrl: "https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/tutorial/Img_Dm_IconComlete.png",
			                ctaCaptionInactive: "Inactive",
			                ctaCaptionActive: "Active",
			                ctaCaptionClaim: "Completed",
			                ctaCaptionClaimed: "Claimed"
			            }, {
			                id: "2",
			                name: "Book a Demo",
			                shortDesc: "Book a demo, earn rewards!",
			                longDesc: "Reserve your demo and unlock rewards! ",
			                ctaUrl: "http://localhost:5174/#contact",
			                rewards: 5000,
			                progress: "0",
			                progressMax: 100,
			                status: "started",
			                iconUrl: 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/landing/UpdatedImg/offerForMission.png',
			                ctaCaptionInactive: "Inactive",
			                ctaCaptionActive: "Active",
			                ctaCaptionClaim: "Completed",
			                ctaCaptionClaimed: "Claimed"
			            }]
			        },
			        // pb: {
			        //     id: "728274a6-9ae0-4b6a-a983-8d65d88433c3",
			        //     name: "Mr Pig",
			        //     balance: 0,
			        //     balanceMax: 1000,
			        //     intermediateThreshold: 60,
			        //     dateEnd: "2024-04-28T23:01:43.000Z",
			        //     finalMultiplierPercents: 250,
			        //     finalMultiplierReward: 3500,
			        //     intermediateMultiplierPercents: 60,
			        //     intermediateMultiplierReward: 800,
			        //     ctaCaptionHold: "Holdus coins",
			        //     ctaCaptionClaim: "CLaimus coins"
			        // },
			        // store: {
			        //
			        // },
			        general: {
			            balance: 0, dmRed: false, pbRed: false, storeRed: true
			        },
			        isInitialized: true,
			        tutorial: {
			            enable: false,
			            tutorialMissionReward: 1500,
			            welcomeS1Title: '',
			            welcomeS1Popup: 'Start your journey with Plug 2 Win! Register for the demo to unlock exclusive bonuses!',
			            welcomeS1Cta: 'Lets go',
			            tutorDmTitle: 'Welcome on board',
			            tutorDmDesc: 'Complete registration',
			            tutorDmCtaClaim: 'Claim',
			            tutorDmCtaClaimed: 'Claimed',
			            dmS1Popup: 'This is a list of missions for you to complete. Check missions daily to earn coins',
			            dmS1Cta: 'Continue',
			            dmS2Popup: 'Get it done!The list will be updated soon with new missions',
			            dmS2Cta: 'Continue',
			            dmS3Popup: 'Well done! You have completed your first mission. Claim your reward!',
			            dmS4Title: 'Mission completed',
			            dmS4Reward: 'Reward',
			            dmS4CtaClaim: 'Claim',
			            tutorPbTitle: 'Piggy bank tutorial',
			            tutorPbDesc: 'Piggy bank tutorial',
			            tutorPbCtaClaim: 'claim',
			            tutorPbCtaClaimed: 'Claimed',
			            welcomePbPopup: 'Time to multiply your coins! Fill your Piggy Bank and get more coins!',
			            welcomePbCta: 'Continue',
			            pbS1Popup: 'Click here to put coins in Piggy bank',
			            pbS2Popup: 'Well done!Now let\'s put them in Piggy Bank to multiply',
			            pbS3Popup: 'It\'s time to break the Piggy Bank! Simply click on the Claim button',
			            pbS4Title: 'Mission Completed',
			            pbS4Reward: 'Reward',
			            pbS4CtaClaim: 'Claim',
			            tutorBlockPbCtaClaim: 'Claim',
			            tutorBlockPbCtaHold: 'Hold',
			            tutorStoreTitle: 'Tutorial offer',
			            tutorStoreDesc: 'Tutorial offer ',
			            tutorStoreCtaClaim: 'Claim',
			            tutorStoreCtaClaimed: 'Claimed',
			            welcomeSorePopup: 'Use your mission coins to unlock exclusive discounts on Plug 2 Win services. Save big and elevate your engagement today!',
			            tutorStoreCardTitle: 'Free spins',
			            storeS1Popup: 'Click on the Buy button to confirm your choice',
			            storeS1CtaClaim: 'Claim',
			            storeS1ModalTitle: 'Free spins',
			            storeS1ModalDescription: 'TEST Spin slot MEGALOAD2000 at Least 10 times with at least $10 Bet amount least 10 Times with ',
			            storeS2Popup: 'Click the Claim button and the offer will appear on your casino account',
			            storeS2CtaClaim: 'Buy',
			            storeS2ModalTitle: 'Free spins',
			            endStorePopUp: 'Activate the bonus on the site by clicking on the Bell',
			            storeS2ModalDescription: 'Spin slot MEGALOAD2000 at Least 10 times with at least $10 Bet amount least 10 Times with ',
			            step: 0
			        }
			    })
			}


			module.exports = Adapter; 
		} (adapter));
		return adapter.exports;
	}

	var hasRequiredSrc;

	function requireSrc () {
		if (hasRequiredSrc) return src;
		hasRequiredSrc = 1;
		const p2wAdapter = requireAdapter();

		const p2wuKey = 'p2wu';

		const isPlayerSignedIn = () =>
		    document.getElementsByClassName('header__sign-in-btn').length === 0;

		const saveUserToLs = (user) =>
		    localStorage.setItem(p2wuKey, JSON.stringify(user));

		const removeUserFromLs = (user) =>
		    localStorage.removeItem(p2wuKey);

		const getUserFromLs = (user) => {
		    const userStr = localStorage.getItem(p2wuKey);

		    return userStr ? JSON.parse(userStr) : null
		};

		const retryGetUserDataLimit = 200;
		let retryGetUserDataCounter = 0;
		let getUserInterval;
		let initialized = false;

		const initP2W = (user, isLocalEnv) => {
		    clearInterval(getUserInterval);

		    const segments = user?.statuses?.map(x => x.id) || [];
		    const userId = user?.userID.toString();

		    const adapter = p2wAdapter.getInstance(window.plug2winApiKey, userId, segments);

		    adapter.init(isLocalEnv).then(() => {
		        console.log('initialized');
		        // clearEmailsFromLs()
		        initialized = true;
		    });
		};

		const checkRetryLimit = () => {
		    if (retryGetUserDataCounter >= retryGetUserDataLimit || initialized) {
		        clearInterval(getUserInterval);
		    }

		    retryGetUserDataCounter++;
		};


		const getDataAndRunInit = () => {
		    let user, justSignedUp;
		    if (isPlayerSignedIn()) {
		        console.log(`user is signed in to casino!!!!`);
		        const userFromLs = getUserFromLs();
		        const userFromDl = window?.isLocalEnv
		            ? {userID: window?.plug2winExternalUserId}
		            : window?.dataLayer?.find(x => x.event === 'user');

		        if (userFromDl) {
		            console.log(`got user from dataLayer and saved to localstorage: ${JSON.stringify(userFromDl)}`);
		            user = userFromDl;
		            saveUserToLs(userFromDl);
		        } else if (userFromLs) {
		            console.log(`no user from dataLayer, got from localstorage: ${JSON.stringify(userFromLs)}`);
		            user = userFromLs;
		        }

		        justSignedUp = !!window?.dataLayer?.find(x => x.event === 'signup_success');

		    } else {
		        console.log(`user is logged off from casino!!!! user is logged off from casino!!!! removing user from localstorage`);
		        removeUserFromLs();
		    }

		    if (user && user?.userID) {
		        if (justSignedUp) {
		            console.log('player just signed up, going to pull statuses from cookie and init p2w');
		            let interval;

		            function listenCookieChange(callback, intervalDelay = 1000) {
		                let lastCookie = document.cookie;
		                interval = setInterval(() => {
		                    let cookie = document.cookie;
		                    if (cookie !== lastCookie) {
		                        try {
		                            callback({oldValue: lastCookie, newValue: cookie});
		                        } finally {
		                            lastCookie = cookie;
		                        }
		                    }
		                }, intervalDelay);
		            }

		            listenCookieChange(({oldValue, newValue}) => {
		                const newDecodedValue = decodeURIComponent(newValue);
		                const pattern = /player_groups=\[(.*?)\];/;
		                const match = newDecodedValue.match(pattern);
		                if (match) {
		                    clearInterval(interval);
		                    if (match && match.length > 0 && match[match.length - 1]) {
		                        user.statuses = JSON.parse('[' + match[match.length - 1] + ']');
		                        saveUserToLs(user);
		                        initP2W(user, window?.isLocalEnv);
		                    }
		                }
		            }, 1000);
		        } else {
		            console.log('player logged in or just opened casino, going to init p2w in a regular way');
		            initP2W(user, window?.isLocalEnv);
		        }
		    }
		};

		if (window.top === window.self) {
		    getUserInterval = setInterval(() => {
		        if (!initialized) {
		            getDataAndRunInit();
		        }

		        checkRetryLimit();
		    }, 5000);

		    getDataAndRunInit();
		}
		return src;
	}

	var srcExports = requireSrc();
	var index = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

	return index;

}));
