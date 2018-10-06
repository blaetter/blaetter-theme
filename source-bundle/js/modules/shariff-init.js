//
// Init Heise shariff on articles
//

import * as BLAETTER from 'blaetter';

export function init(callback) {
	var $shariff = $('.shariff-init');
	if (!$shariff.length) {
		return;
	}

	BLAETTER.set_webpack_publicpath();
	import('shariff/dist/shariff.min.css');
	import('shariff')
		.then(
			function (Module) { (callback)(Module.default); }
		)
		.catch(
			function (err) { console.log(err); }
		);
}



export function apply(Shariff) {
	// initialize .shariff elements
	var title = $('meta[property="og:title"]').attr("content");
	if (!title) {
		title = $('meta[name="DC.Title"]').attr("content");
		if (!title) {
			title = $('head title').text();
		}
	}
	$('.shariff-init').each(function () {
			$(this).removeClass('shariff-init').addClass(
				'shariff');

			$(this).delegate(
				'a',
				'click',
				function (ev) {
					try {
						_paq.push(['trackEvent',
							'shariff', this.title]);
					} catch (err) {
						if (typeof console === "object")
							console.log(err);
					}

					try {
						_gaq.push(['_trackEvent',
							'shariff', this.title]);
					} catch (err) {
						if (typeof console === "object")
							console.log(err);
					}

					return true;
				})
		});
}
