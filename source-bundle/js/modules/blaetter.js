
//
// associated portal base url
//
export function portal_url() {
	return document.getElementById('echo-behavior-js').src.replace(
		/\/css\/.*/, '');
}

//
// base URL of this patternlab instance
//
export function jsbase() {
	return document.getElementById('echo-behavior-js').src.replace(
		/js\/[^\/]+$/, '');
}

export function set_webpack_publicpath() {
	window.__webpack_public_path__ = jsbase() + "/";
}

//
// check for palm size device
//
export function is_palm() {
	var pc = document.querySelector('#header .portal-claim');
	return (! pc || 'none' === window.getComputedStyle(pc,null).display);
}

//
// get page two-char language code
// 
export function languageCode() {
	var languageCode = document.documentElement.lang || 'de';
	var languageCodeShort = languageCode.substring(0, 2);
	return languageCodeShort;
}

//
// async load scripts and execute code after loading is complete
//
// usage:
//
//   bo_script(script_url).then(onFulfilled, onRejected);
//   bo_script([script_url1, script_url2], …).then(onFulfilled, onRejected);
//
// - load() returns a Promise
// - async loading of multiple scripts
// - every script is only loaded once when load() is called multiple
// - loading order is not guaranteed
//
export function load(url) {

//	console.log('bo_script', url);

	if (Array.isArray(url)) {
		var self = this, prom = [];
		url.forEach(function(item) {
			prom.push(self.bo_script(item));
		});
		return Promise.all(prom);
	}

	return new Promise(
			function(resolve, reject) {
				var state = false;

				function loaded(ev) {
					if (!state
							&& (!this.readyState || 'complete' === this.readyState)) {
//						console.log('bo_script.loaded', this);
						this.readyState = 'complete';
						state = true;
						resolve(this);
					}
				}

				var currentScript = document.getElementsByTagName('script')[0];
				var script = document
						.querySelector('script[src="' + url + '"]');
				if (script) {
//					console.log('bo_script found', url);
					if ('complete' === script.readyState) {
//						console.log('bo_script resolve', url, this);
						resolve(this)
					} else {
//						console.log('bo_script add handler', url, this);
						script.addEventListener('load', loaded.bind(script));
						script.addEventListener('readystatechange', loaded
								.bind(script));
						script.addEventListener('error', reject);
						script.addEventListener('abort', reject);
					}
				} else {
//					console.log('bo_script write tag', url);
					script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = url;
//					script.async = true;
					script.onload = script.onreadystatechange = loaded;
					script.onerror = script.onabort = reject;
					currentScript.parentNode
							.insertBefore(script, currentScript);
				}
			});
}



export function isElementVisible(el) {
	var rect     = el.getBoundingClientRect(),
    vWidth   = window.innerWidth || doc.documentElement.clientWidth,
    vHeight  = window.innerHeight || doc.documentElement.clientHeight,
    efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
        || rect.left > vWidth || rect.top > vHeight)
    	return false;

	// Return true if any of its four corners are visible
	return (
	      el.contains(efp(rect.left,  rect.top))
	  ||  el.contains(efp(rect.right, rect.top))
	  ||  el.contains(efp(rect.right, rect.bottom))
	  ||  el.contains(efp(rect.left,  rect.bottom))
	);
}
