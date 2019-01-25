import * as BLAETTER from 'blaetter';

/*
 * INIT SWIPERS:
 */
export function init(callback) {

	if (!$('.swiper,.swiper-wrapper').length) {
		return false;
	}

	BLAETTER.set_webpack_publicpath();
	import(/* webpackMode: "lazy" */'swiper/dist/css/swiper.css');
	import(/* webpackMode: "lazy" */'swiper')
		.then(
			function (Module) {
				(callback)(Module.default);
			}
		)
		.catch(
			function (err) { console.log(err); }
		);
}


export function slidesperview(el, options) {
	var slidesperview = el && $(el).data('slidesperview');
	if (el) {
		$.extend(options, {
			slidesPerView: slidesperview,
			slidesPerGroup: slidesperview,
			lazy: {
				loadPrevNextAmount: slidesperview
			}
		})
	}
	return options;
}

export function apply(Swiper) {

	// SWIPER: galleryselect
	
	var archiveindexSelector = '.archive-index.swiper';
	var archiveindexOptions = {
		grabCursor: true,
		slideToClickedSlide: true,
		direction: 'horizontal',
		slidesPerView: 12,
		slidesPerGroup: 12,
		spaceBetween: 24,
		loop: false,
		preloadImages: false,
		touchReleaseOnEdges: true, 
		autoHeight: true,
		touchEventsTarget: 'swiper-wrapper',  // do not touch our navigation buttons
		watchOverflow: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1000: {
				// palm
				slidesPerView: 6,
				slidesPerGroup: 6,
			},
			420: {
				// smallest
				slidesPerView: 4,
				slidesPerGroup: 4,
			},
		}
	};
	new Swiper(archiveindexSelector, archiveindexOptions);
	

	// SWIPER: galleryselect
	/*
	var galleryselectSelector = '.swiper-galleryselect .swiper';
	var galleryselectOptions = {
		grabCursor: true,
		slideToClickedSlide: true,
		direction: 'horizontal',
		slidesPerView: 3,
		slidesPerGroup: 3,
		spaceBetween: 24,
		loop: true,
		preloadImages: false,
		touchReleaseOnEdges: true, 
		touchEventsTarget: 'wrapper',  // do not touch our navigation buttons
		watchOverflow: true,
		lazy: {
			loadPrevNextAmount: 3
		},
		pagination: {
			el: '.js-galleryselect .swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			720: {
				// palm
				slidesPerView: 2.4,
				slidesPerGroup: 2,
			},
			420: {
				// smallest
				slidesPerView: 1.3,
				slidesPerGroup: 1,
			},
		}
	};
	new Swiper(galleryselectSelector, galleryselectOptions);
	*/

	// SWIPER: Article Mainimage
	/*
	var galleryArticleimageSelector = '.swiper-articleimage .swiper';
	var galleryArticleimageOptions = {
		grabCursor: true,
		zoom: false, // not good in mobile, only doubleclick
		longSwipesMs: 400,
		threshold: 10, // Threshold value in px
		slideToClickedSlide: false,
		direction: 'horizontal',
		loop: true,
		slidesPerView: 1,
		slidesPerGroup: 1,
		autoHeight: true,
		spaceBetween: 24,
		touchReleaseOnEdges: true, 
		touchEventsTarget: 'wrapper', // do not touch our navigation buttons
		hashNavigation: {
			watchState: false,
			replaceState: false,
		},
		pagination: {
			el: '.swiper-articleimage .swiper-pagination',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
				return 'Bild ' + current + ' von ' + total;
			},
		},
		navigation: {
			nextEl: '.swiper-articleimage .swiper-button-next',
			prevEl: '.swiper-articleimage .swiper-button-prev',
		},
		// lazy loading images
		preloadImages: false,
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 1,
			loadOnTransitionStart: true,
		},
		on: {
			lazyImageReady: function (swiper, slide) {
				// Duplicate and BLUR the backgroundcopy of an image to fill out
				// different image ratios
				// Info: CSS Bluring is very unperformant on mobile devices!
				// Zoom inside a blured gallery can crash the browser.
				// The "transform" property force the user’s browser to hardware
				// accelerate,
				// if you try blurring an element without it applied, you’ll see
				// a general drop in frame rate!
				$(slide).parent().css({
					'position': 'relative',
					'overflow': 'hidden'
				});
				$(slide).css('position', 'relative');
				$(slide).clone().prependTo($(slide).parent()).removeClass()
					.addClass('image-blured').css({
						'position': 'absolute',
						'width': '100%',
						'height': '100%',
						'max-width': 'none',
						'left': '0',
						'top': '6%',
						'filter': 'blur(12px)',
						'transform': 'translate3d(0, 0, 0)',
						'transform': 'scale(1.2)'
					});
			}
		}
	};
	new Swiper(galleryArticleimageSelector, galleryArticleimageOptions);
	*/
	
}
