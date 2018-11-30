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
            function(event) {
                event.preventDefault();
                if (! $(this).hasClass('opened')) {
                    $(this).addClass('opened').attr('aria-label','Navigation zuklappen');
                    elNavigatation.addClass('opened');
                }else{
                    $(this).removeClass('opened').attr('aria-label','Navigation aufklappen');
                    elNavigatation.removeClass('opened');
                }
                return false;
            }
        );

        // toggle navigation sublist items
        $("#navigation-primary ul.menu > li.menu-item--collapsed, #navigation-primary ul.menu > li.menu-item--expanded").click(
            function(event) {
                event.preventDefault();
                $('#navigation-primary ul.menu > li.menu-item--expanded').not(this).removeClass('menu-item--expanded').addClass('menu-item--collapsed');
                if ( $(this).hasClass('menu-item--collapsed') ) {
                    $(this).removeClass('menu-item--collapsed').addClass('menu-item--expanded');
                } else {
                    $(this).removeClass('menu-item--expanded').addClass('menu-item--collapsed');
                }
            }
        );

	}
    handleMenu();
}