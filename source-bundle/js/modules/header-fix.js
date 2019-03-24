/*
 * Function to set header fixed on scroll:
 */
import * as BLAETTER from 'blaetter';

export default function header_fix() {

    var elHeader = $('#header');
    var elBody = $('body');

    function header_fix() {
        var window_top = $(window).scrollTop();
        var top_position = elBody.offset().top;

        if (window_top > top_position) {
            elHeader.addClass('fixed');
            elBody.addClass('fixed');
        } else {
            elHeader.removeClass('fixed');
            elBody.removeClass('fixed');
        }
	}
    $(window).scroll(header_fix);
    header_fix();
}