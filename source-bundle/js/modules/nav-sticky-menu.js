/*
 * Sticky Menu on top (classic navigation left)
 * and move listelemnts into a "more" container if we do not have enough horizontal space
 */

export default function() {
    var itemsCollected = false; // only collect items once
	var elemWidth;
	var fitCount;
	var varWidth = 0;
	var itemCounter;
    var navigation = $('#navigation-stickyindex');
    var togglerMore = $('#navigation-stickyindex .toggler');
	var $menu = $("#navigation-stickyindex ul.js-menu-items");
	var $collectmenu = $("#navigation-stickyindex ul.js-collected-items");
	var $collectedSet;
    var collectcontainer = $("#navigation-stickyindex .collect-container");


	
    function collect_stickynavigationitems() { 
        // collect and count the widths of the menu elements 
        // to get the number of menuitems placed on the top
        var menuBarFreeSpace = navigation.outerWidth() - togglerMore.outerWidth();
        var menuItemWidths = [];
        var currentMenuWidth = 0;
        var numberOfItemsTop = null;
        var hideToggler = true;
        
        togglerMore.hide();
        
        $('li', $menu).each(function(counter) { 
            currentMenuWidth += $(this).outerWidth();
            menuItemWidths.push(currentMenuWidth);
            if (currentMenuWidth > menuBarFreeSpace) {
                numberOfItemsTop = counter -1; // (because :gt based on zero)
                togglerMore.show();
                return false; 
            }
        });
        
        
        // Put menu items into the collection menu container
        $menu.children().show(); // we have to do this first
        if ($( window ).width() < 720 ) {
			// Mobile: put ALL items into the collection menu
            togglerMore.show();
            $collectmenu.empty().append($menu.children().clone());
            $collectmenu.children().show();
            $menu.children().hide();
		} else {
            // Desktop: put only items into the collection menu that are GREATER than the number of items we have counted
            $collectedSet = $menu.children(":gt(" + numberOfItemsTop + ")");
            $collectmenu.empty().append($collectedSet.clone());
            $collectmenu.children().show();
            $menu.children(":gt(" + numberOfItemsTop + ")").hide();
        }
	}
    
    $(window).resize(collect_stickynavigationitems);
    
    
	// fade sticke indexmenu in and out, depending on scroll direction
	var lastPosition = $(window).scrollTop();
	$(window).bind('scroll', function() {
		var myPosY = $(window).scrollTop();
		if (myPosY >= 300) {
			if (myPosY < lastPosition) {
				$('#navigation-stickyindex').addClass('show');
                if (! itemsCollected) {
                    // we need to put this function here because of the "display:none" of the hidden menu (otherwise elemWidths are 0)
                    // (we need the "display:none" because of Barrierefreiheit and not Tabbing through hidden elements)
                    collect_stickynavigationitems();
                    itemsCollected = true;
                }
			}
		} else {
			$('#navigation-stickyindex').removeClass('show');
            collectcontainer.removeClass('opened');
		}
		lastPosition = myPosY;
	});
    
	// open close collection container on "mehr" click
	$("#navigation-stickyindex .toggler").click(function() {
		//$(this).parent().toggleClass('opened');
        collectcontainer.toggleClass('opened');
		return false;
	});
    
    // close collect container on click outside
    collectcontainer.click(function(event){
        event.stopPropagation();
    });
    $(window).click(function() {
        collectcontainer.removeClass('opened');
    });

}