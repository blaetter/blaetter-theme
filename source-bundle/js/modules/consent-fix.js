/*
 * Function to fix consent popup:
 */

export default function consent_fix() {
  if (typeof(Drupal) !== "undefined" && typeof(Drupal.eu_cookie_compliance) !== "undefined") {
    var elPopup = $('#sliding-popup');
    var bottom_navigation = $('#block-fussbereich > .menu');
    // only show consent by default if user did not choose anything before.
    // we need to check the existance of the cookie-agreed cookie, as the withdraw sets this to  null but obtains
    // the cookie itself so only if the cookie is not existing, the banner should be promted as this seems to be
    // the first visit of the user
    console.log(typeof($.cookie('cookie-agreed')));
    if (typeof($.cookie('cookie-agreed')) === "undefined") {
      if (null !== elPopup) {
        elPopup.addClass('visible');
        elPopup.addClass('initial');
      }
    }
    elPopup.find('.button').each(function() {
      jQuery(this).click(function() {
        $('#sliding-popup').removeClass('visible');
        $('#sliding-popup').removeClass('initial');
      });
    });

    if (elPopup.hasClass('initial')) {
      var settings_button = $('<button class="button button--reversed">Cookie-Einstellungen</button>');
      settings_button.click(function() {
        $('#sliding-popup').removeClass('initial');
        $(this).remove();
      });
      $('#popup-buttons').append(settings_button);
    }

    var privacy_link = $('<a href="#">Datenschutz-Einstellungen</a>');
    privacy_link.click(function() {
      $('#sliding-popup').addClass('visible');
    });
    var privacy_list = $('<li class="menu-item menu-item--expanded"></li>');
    privacy_list.append(privacy_link);

    bottom_navigation.append(privacy_list);
  }
}
