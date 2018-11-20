/*
 * Mainmenu flyout content toggler:
 */
import * as BLAETTER from 'blaetter';

export default function nav_menu_flyout() {
	
	var elHamburger = $(".js-hamburger");
    var elNavigatation = $("#navigation-primary");
    var elMenuItemCollapsed = $("#navigation-primary ul.menu > li.menu-item--collapsed a");
    var elMenuItemExpanded = $("#navigation-primary ul.menu > li.menu-item--expanded a");
	
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
        $("#navigation-primary ul.menu > li.menu-item--collapsed a, #navigation-primary ul.menu > li.menu-item--expanded a").click(
            function(event) {
                event.preventDefault();
                $('#navigation-primary ul.menu > li.menu-item--expanded a').not(this).parent().removeClass('menu-item--expanded').addClass('menu-item--collapsed');
                if ( $(this).parent().hasClass('menu-item--collapsed') ) {
                    $(this).parent().removeClass('menu-item--collapsed').addClass('menu-item--expanded');
                } else {
                    $(this).parent().removeClass('menu-item--expanded').addClass('menu-item--collapsed');
                }
            }
        );

	}
    handleMenu();
}