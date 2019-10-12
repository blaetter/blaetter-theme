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
    // only do check for scrolling if we have a scrollbar
    if (null !== document.getElementById("scrollbar")) {
        // check for articles (node-type--story) to indicate scrolldepth (only on not closed articles as those are short)
        // this might be the point to add other content types as well
        if (1 <= document.getElementsByClassName("node-type--story").length) {
            // the first element with the "node-type-story" class is the main page content, so
            // lets check here if this is a closed article or not
            if (!document.getElementsByClassName("node-type--story").item(0).classList.contains('nodeshop-closed')) {
                document.getElementById("scrollbar").classList.add("scroll-indicator");
                window.onscroll = function () { scrollbar() };
            }
        }
    }
}