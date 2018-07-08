/*
 * receive resize messages from IFRAMEs
 * 
 * message data (event.data) is a single number
 * 
 * sample code to integrate in IFRAME documents (tracks onload, onresize and DOM changes):

	<script>
	if ("function" === typeof MutationObserver) {
	    function postHandler(ev) {
	        parent.postMessage(document.documentElement.getBoundingClientRect().height, "*");
	    }
	    new MutationObserver(function(mutations) {
	            postHandler("mutation",null);
	        }).observe(document, { attributes: true, childList: true, characterData: true, subtree: true });
	    window.addEventListener('load', postHandler);
	    window.addEventListener('resize', postHandler);
	}
	</script>

*/
export default function () {
	if ("function" === typeof window.addEventListener) {
		window.addEventListener("message", function (event) {
			if ("number" === typeof event.data) {
				var i, ifs = document.getElementsByTagName("iframe");
				for (i = 0; i < ifs.length; i++) {
					if (ifs[i].contentWindow === event.source) {
						ifs[i].scrolling = "no";
						ifs[i].style.overflow = "hidden";
						ifs[i].height = event.data;
					}
				}
			}
		});
	}
}