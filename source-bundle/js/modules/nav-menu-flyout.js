/*
 * Mainmenu flyout content toggler:
 */
import * as BLAETTER from 'blaetter';

export default function nav_menu_flyout() {

	var elHamburger = $(".js-hamburger");
  var elNavigation = $("#navigation-primary");

	function handleMenu() {

        // Hamburger: Toggle Navigation and Page Background
        elHamburger.click(
            function(event) {
                event.preventDefault();
                if (! $(this).hasClass('opened')) {
                    // add open class to menu link
                    $(this).addClass('opened').attr('aria-label','Navigation zuklappen');
                    // open navigation itself
                    elNavigation.addClass('opened');
                    // add close method on body click
                    $('body').click(function(click_event) {
                        if(0 == $(click_event.target).parents('#navigation-primary').length && elHamburger.hasClass('opened')) {
                            elHamburger.click();
                        }
                    });
                    // add close method on esc key up
                    var KEYCODE_ESC = 27;
                    $(document).keyup(function(e) {
                        if (e.keyCode == KEYCODE_ESC && elHamburger.hasClass('opened')) {
                            elHamburger.click();
                        }
                    });
                } else {
                    $(this).removeClass('opened').attr('aria-label','Navigation aufklappen');
                    elNavigation.removeClass('opened');
                }
                return false;
            }
        );
  }

  handleMenu();
}
