/*
 * NAV MOBLIE (SWIPER):
 */

 import * as BO from 'bo';
 import * as boSwiper from 'swiper-init';

export default function nav_mobile() {
    var detectTap = false;
    // Detects click events: We need a alternative to the click event for native android browser
    $(document).on('touchstart', function() {
        detectTap = true; //detects all touch events
    });
    $(document).on('touchmove', function() {
        detectTap = false; //Excludes the scroll events from touch events
    });         
         
	function track(action, label) {
		try { _paq.push([ 'trackEvent', 'portal_palm_menu', action, label, 1 ]); } catch(err){}
	}
 
    function navSwiper(Swiper) {
        // SWIPER: Primary mobile Navigation
		var active_channel = $('#header').data('active-channel');
		var active_channel_index = 0;
		if (active_channel) {
			active_channel_index = $('.navigation-primary-palm__swiper .swiper-slide[data-swiper-activate="channel--'+active_channel+'"]').index();
		}
		new Swiper('.navigation-primary-palm__swiper', {
			initialSlide: active_channel_index,
			grabCursor: true,
            freeModeMomentumBounce : true,
            freeModeMomentumRatio : 0.2, // Nachlaufzeit
            freeModeMomentumBounceRatio : 0.2,
            freeModeMinimumVelocity : 5, // Einraststärke
            slideToClickedSlide : true,
            grabCursor : false,
            freeModeSticky : true,
            direction : 'horizontal',
            longSwipes : false,
            freeMode : true,
            slidesPerView : 4,
            loopedSlides : 16,
            centeredSlides : true,
            allowSwipeToPrev : true,
            allowSwipeToNext : true,
            loop : true,
            simulateTouch : true,    
            on: {
                transitionEnd: function () {
                    var element = $(this.slides[this.activeIndex]);
                    var elementClassToShow = element
                            .attr('data-swiper-activate');
                    $('.primary-navigation-palm__tree .channel > li')
                            .removeClass('active');
                    $('.primary-navigation-palm__tree .topic > li')
                            .removeClass('active');
                    $('.primary-navigation-palm__tree').find(
                            '.' + elementClassToShow).addClass('active');
                    if ($(".hamburger-palm").hasClass("opened")) {
                        track("ppmSwitch", elementClassToShow);
                    }
                    
                },            
                tap: function () {
                    return false;
                },
            },
        });
	}
	
	function initMenu() {
        // Hamburger Mobile: Toggle Navigation and Searchbar
        $(".hamburger-palm").bind("touchend click",function(e) {
            if (e.type == "click") detectTap = true; //detects click events 
            if (detectTap){
                $(this).toggleClass('opened');
                $('#navigation-primary-palm').toggleClass('opened');
                $('.portal-search').toggleClass('show');
                $('#header').toggleClass('fixed');
                $('#content-wrapper').toggleClass('hide'); // prevent background from scrolling
                $('#footer').toggleClass('hide'); // prevent background from scrolling
                track(($(this).hasClass('opened') ? 'ppmOpen' : 'ppmClose'), $('#header').data('active-channel'));
            }
            return false;
        });
        
        boSwiper.init(navSwiper);

		// Toggle topic submenu on click (Mobile)
		$(".primary-navigation-palm__tree .topic > li > .menu-item").bind("touchend click",function(e) {
            e.preventDefault();
            if (e.type == "click") detectTap = true; //detects click events 
            if (detectTap){
                $(this).parent().toggleClass('active');
                track('ppmOpenTopic', $(this).text());
                $(".primary-navigation-palm__tree .active .topic > li > .menu-item")
                	.not(this)
                	.each(function() {
                		$(this).parent().removeClass('active');
                	});
            }    
            return false;
        });
		
		// tracking: click on channel start page link
		$(".primary-navigation-palm__tree .header a").on("click", function(e) {
			track("ppmClickStart", this.href);
		});
		
		// tracking: click on normal (topic) link
		$(".primary-navigation-palm__tree .subtopic a").on("click", function(e) {
			track("ppmClick", this.href);
		});
	}
        
	if ($('#navigation-primary-palm').length) {
		if ($('#sg-pattern-data-footer').length) {
			initMenu();
		}
		else {
			var lang = jQuery("html").attr('lang');
			lang = typeof lang == "string" ? "."+lang.substring(0,2) : ''; 
			$('#navigation-primary-palm .navigation-wrapper').load(BO.portal_url()+'/ml-top'+lang+'.inc?sub=mobileNav', function(responseText, textStatus, jqXHR) {
				initMenu();
			});
		}
	}
}
