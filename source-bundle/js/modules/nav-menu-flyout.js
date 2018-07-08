/*
 * Mainmenu flyout content toggler:
 */
import * as BO from 'bo';

export default function nav_menu_flyout() {
	function loadImages() {
		// lazy load teaser images
    	$('#navigation-primary-desk img[data-src]').each(function() {
			this.src = BO.portal_url() + $(this).data('src');
			$(this).removeAttr('data-src');
    	});		
	}
	
	function track(action, label) {
		try { _paq.push([ 'trackEvent', 'portal_desk_menu', action, label, 1 ]); } catch(err){}
	}
	
	function handleMenu() {
		var active_channel = $('#header').data('active-channel');
		if (active_channel) {
			$('.navigation-primary-desk__top ul.nav [data-target="channel--'+active_channel+'"]')
				.parent('li')
				.addClass('active');
			$('.primary-navigation-desk__tree .channel--'+active_channel)
				.addClass('active');
		}
		
		$('.primary-navigation-desk__tree .topic a').on('click', function(ev) {
			track('pdmClick', this.href);
		});
		
		// Menu Channellink Desktop: open/close navigation flyout
		$(".navigation-primary-desk__top  .nav > li > .menu-item").click(
				function(e) {
					var targetClass = $(this).attr('data-target');
					var $topicEl = $('.primary-navigation-desk__tree').find('.' + targetClass);
					if ($('#navigation-primary-desk').hasClass('opened') && $topicEl.hasClass('active')) { 
						// follow channellink if channel already selected and navigation is open
						track('pdmTopStart', targetClass);
						return true;
					}
					else {
						e.preventDefault();
						loadImages();
						track('pdmOpen', targetClass);
						$(".primary-navigation-desk__tree .channel > li")
								.removeClass('active');
						$topicEl.addClass('active');
                        $('> .menu-item', $topicEl).focus();
						if (! $('#navigation-primary-desk').hasClass('opened')) {
							$('.hamburger-desk').addClass('opened').attr('aria-label','Navigation zuklappen');
							$('#navigation-primary-desk').addClass('opened');
						}
						return false;
					}
				});
		// Toggle topic on click (Desktop)
		$(".primary-navigation-desk__tree .channel > li > .menu-item").click(
				function(e) {
					e.preventDefault();
					if ($(this).parent().hasClass('active')) {
						track('pdmSwitchStart', $(this).parent().attr('class'));
						location.href = $(this).parent().find('a.header-item').attr('href');
					}
					else {
						track('pdmSwitch', $(this).parent().attr('class'));
						$(".primary-navigation-desk__tree .channel > li")
								.removeClass('active')
                                .attr('aria-selected', 'false');
						$(this).parent().toggleClass("active").attr('aria-selected','true');
					}
					return false;
				});
        // Hamburger Desktop: Toggle Navigation and Page Background
        $(".hamburger-desk").click(
            function() {
            	loadImages();
				track(($(this).hasClass('opened') ? 'pdmClose' : 'pdmOpen'), 'hamburger');
                if (! $(this).hasClass('opened')) {
                    $(this).addClass('opened').attr('aria-label','Navigation zuklappen');
                    $('#navigation-primary-desk').addClass('opened');
                }else{
                    $(this).removeClass('opened').attr('aria-label','Navigation aufklappen');
                    $('#navigation-primary-desk').removeClass('opened');
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

	if ($('#sg-pattern-data-footer').length) {
		handleMenu();
	}
	else {
		var lang = jQuery("html").attr('lang');
		lang = typeof lang == "string" ? "."+lang.substring(0,2) : ''; 
		$('#navigation-primary-desk .primary-navigation-desk__tree').load(BO.portal_url()+'/ml-top'+lang+'.inc?sub=desc-flyout', 
				function(responseText, textStatus, jqXHR) {
					handleMenu();
				});
	}
}