/*
 * Mainmenu flyout content toggler:
 */
import * as BLAETTER from 'blaetter';

export default function nav_menu_flyout() {
	
	var elHamburger = $(".js-hamburger");
	var elNavigatation = $("#navigation-primary");
	
	function handleMenu() {
        // Hamburger: Toggle Navigation and Page Background
        elHamburger.click(
            function() {
                if (! $(this).hasClass('opened')) {
                    $(this).addClass('opened').attr('aria-label','Navigation zuklappen');
                    elNavigatation.addClass('opened');
                }else{
                    $(this).removeClass('opened').attr('aria-label','Navigation aufklappen');
                    elNavigatation.removeClass('opened');
                }
                if (!$(".primary-navigation-desk__tree .channel > li")
                        .hasClass('active')) {
                    $(".primary-navigation-desk__tree .channel > li")
                            .removeClass('active');
                    $('.primary-navigation-desk__tree').find(
                            '.channel--politik').addClass('active');
                }
                return false;
            });
	}
    handleMenu();
}