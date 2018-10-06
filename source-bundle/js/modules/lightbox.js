/*
 * Init Magnific Popup Lightboxes:
 * http://dimsemenov.com/plugins/magnific-popup/documentation.html
 */

import * as BLAETTER from 'blaetter';
import * as swiper from 'swiper-init';

export function init(callback) {
    if (!$('.js-lightbox').length) {
        return;
    }

    BLAETTER.set_webpack_publicpath();
    import('magnific-popup/dist/magnific-popup.css');
    import('magnific-popup')
        .then(
            function (Module) {
                (callback)(Module.default);
            })
        .catch(
            function (err) { console.log(err); }
        );
}

export function apply(magnificPopup) {

    // Open image 
    $('.js-lightbox.js-lightbox--image').magnificPopup({
        type: 'image'
    });

    // Open image 
    $('.js-lightbox.js-lightbox--inline').magnificPopup({
        type: 'inline'
    });

    // Open gallery 
    $('.js-lightbox.js-lightbox--gallery').each(function () {
        $(this).magnificPopup({
            type: 'image',
            delegate: 'a', // the selector for gallery item. Or use $(this).find('a').magnificPopup( ...
            preload: [1, 1],
            gallery: {
                enabled: true
            }
        });
    });

    // Open iframe
    $('.js-lightbox.js-lightbox--iframe').magnificPopup({
        type: 'iframe',
        //disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Open ajax
    $('.js-lightbox.js-lightbox--ajax').magnificPopup({
        type: 'ajax'
    });

    // Load a swiper with ajax and js callback to init the swiper
    $('.js-lightbox.js-lightbox--swiper-ajax').magnificPopup({
        type: 'ajax',
        callbacks: {
            parseAjax: function (mfpResponse) {
                // mfpResponse.data is a "data" object from ajax "success" callback
                // for simple HTML file, it will be just String
                // You may modify it to change contents of the popup
                // For example, to show just #some-element:
                // mfpResponse.data = $(mfpResponse.data).find('#some-element');
                // mfpResponse.data must be a String or a DOM (jQuery) element
                //console.log('Ajax content loaded:', mfpResponse);
            },
            ajaxContentAdded: function () {
                swiper.init(initLightboxSwiper);
            }
        }
    });
}


function initLightboxSwiper(Swiper) {
    var $lightboxSwiper = new Swiper('.swiper-lightbox .swiper', {
        grabCursor: true,
        zoom: false, // not good in mobile, only doubleclick
        longSwipesMs: 400,
        threshold: 10, //Threshold value in px
        slideToClickedSlide: false,
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: false,
        spaceBetween: 24,
        preloadImages: false,
        hashNavigation: {
            watchState: false,
            replaceState: false,
        },
        pagination: {
            el: '.swiper-lightbox .swiper-pagination',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return 'Bild ' + current + ' von ' + total;
            },
        },
        navigation: {
            nextEl: '.swiper-lightbox .swiper-button-next',
            prevEl: '.swiper-lightbox .swiper-button-prev',
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: false,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });
}
