
import * as datepicker from 'datepicker-init';
import * as lightbox from 'lightbox.js';
import * as shariff from 'shariff-init';
import * as swiper from 'swiper-init';
import accordion from 'accordion';
import articleimage_add_blur from 'articleimage-add-blur.js';
import block_limit_height from 'block-limit-height.js';
import checkbox_formfilter from 'checkbox-formfilter.js';
import collapse from 'collapse';
import easypopup from 'easypopup';
import iframe_resize from 'iframe-resize.js';
import multiselect2checkboxes from 'multiselect2checkboxes.js';
import nav_footer from 'nav-footer';
import nav_language from 'nav-language';
import nav_menu_flyout from 'nav-menu-flyout';
import nav_mobile from 'nav-mobile';
import nav_sticky_menu from 'nav-sticky-menu';

window._paq = typeof window._paq === "object" ? window._paq : [];
window._gaq = typeof window._gaq === "object" ? window._gaq : [];

iframe_resize();

document.addEventListener("DOMContentLoaded", function (event) {
	accordion();
	articleimage_add_blur();
	block_limit_height();
	checkbox_formfilter();
	collapse();
	datepicker.init(datepicker.apply_standard);
	easypopup();
	lightbox.init(lightbox.apply);
	multiselect2checkboxes();
	nav_footer();
	nav_language();
	nav_menu_flyout();
	nav_mobile();
	nav_sticky_menu();
	shariff.init(shariff.apply);
	swiper.init(swiper.apply);
	tabcontainer();
});