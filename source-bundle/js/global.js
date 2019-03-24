
import * as swiper from 'swiper-init';
import collapse from 'collapse';
import nav_menu_flyout from 'nav-menu-flyout';
import search_flyout from 'search-flyout';
import header_fix from 'header-fix';

window._paq = typeof window._paq === "object" ? window._paq : [];
window._gaq = typeof window._gaq === "object" ? window._gaq : [];


document.addEventListener("DOMContentLoaded", function (event) {
	collapse();
	swiper.init(swiper.apply);
	nav_menu_flyout();
	search_flyout();
	header_fix();
});