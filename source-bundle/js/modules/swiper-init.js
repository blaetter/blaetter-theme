import * as BLAETTER from 'blaetter';

/*
 * INIT SWIPERS:
 */
export function init(callback) {

	if (!$('.swiper').length) {
		return false;
	}

	BLAETTER.set_webpack_publicpath();
	import('swiper/swiper.min.css');
	import('swiper/bundle')
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
	var archiveindexSelector = '.swiper';
	var archiveindexOptions = {
		autoHeight: true,
		breakpoints: {
			720: {
				// palm
				slidesPerGroup: 2,
			},
			420: {
				// small
				slidesPerGroup: 2,
			},
			320: {
				// smallest
				slidesPerGroup: 2,
			}
		},
		direction: 'horizontal',
		freeMode: true,
    grabCursor: true,
    navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
    slidesOffsetAfter: 12,
		slidesOffsetBefore: 12,
		slidesPerGroup: 5,
		slidesPerView: 5,
		spaceBetween: 24,
		touchEventsTarget: 'wrapper',  // do not touch our navigation buttons
		// touchReleaseOnEdges: true,
		watchOverflow: true,
		wrapperClass: 'view-content'
	};
	var swiper = new Swiper(archiveindexSelector, archiveindexOptions);
}
