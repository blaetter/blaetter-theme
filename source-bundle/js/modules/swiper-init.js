import * as BLAETTER from 'blaetter';

/*
 * INIT SWIPERS:
 */
export function init(callback) {

	if (!$('.swiper').length) {
		return false;
	}

	BLAETTER.set_webpack_publicpath();
	import(/* webpackMode: "lazy" */'swiper/swiper-bundle.min.css');
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

	var archiveindexSelector = '.swiper.archive-index';
	var archiveindexOptions = {
		grabCursor: true,
		slideToClickedSlide: false,
		direction: 'horizontal',
		slidesPerView: 6,
		slidesPerGroup: 5,
		spaceBetween: 24,
		slidesOffsetBefore: 12,
		slidesOffsetAfter: 12,
		loop: false,
		preloadImages: false,
		touchReleaseOnEdges: true,
		autoHeight: true,
		touchEventsTarget: 'wrapper',  // do not touch our navigation buttons
		watchOverflow: true,
		wrapperClass: 'view-content',
		freeMode: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			1200: {
				// bigger
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			720: {
				// palm
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			420: {
				// smallest
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
		}
	};
	new Swiper(archiveindexSelector, archiveindexOptions);
}
