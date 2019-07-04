/*
 * Function to set header fixed on scroll:
 */
import * as BLAETTER from 'blaetter';

export default function header_fix() {

    var elHeader = $('#header');
    var elBody = $('body');
    var elContent = $('.page-wrapper');

    function header_fix() {
        var window_top = $(window).scrollTop();
        var top_position = elBody.offset().top;

        if (window_top > top_position) {
            elHeader.addClass('fixed');
            elContent.addClass('fixed');
        } else {
            elHeader.removeClass('fixed');
            elContent.removeClass('fixed');
        }
    }
    $(window).scroll(header_fix);
    header_fix();

    /**
     * Sets scrollbar with if available so we can indicate the length of a page,
     * needs element with id="scrollbar" in the document
     */
    function scrollbar() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("scrollbar").style.width = scrolled + "%";
    }
    if (null !== document.getElementById("scrollbar")) {
        window.onscroll = function () { scrollbar() };
    }
}