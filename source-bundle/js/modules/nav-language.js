/*
 *     Language select:
 */

export default function() {
    
    var languageSelectContainer = $('#header .language-select');
    
    
	$('.toggler',languageSelectContainer).click(function(e) {
        if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).attr('aria-expanded', 'false');
        }else {
            $(this).parent().addClass('open');
            $(this).attr('aria-expanded', 'true');
        }
        e.preventDefault();
		return false;
	});
    
    // close container on click outside
    languageSelectContainer.click(function(event){
        event.stopPropagation();
    });
    $(window).click(function() {
        languageSelectContainer.removeClass('open');
        $('.toggler', languageSelectContainer).attr('aria-expanded', 'false');
    });
    
    //
    // replace language select entries with documents alternate language entires
    //
	var $language_select = $('ul', languageSelectContainer);
	$('link[rel="alternate"][hreflang]').each(function() {
		$('a[hreflang="' + this.hreflang + '"]', $language_select).attr({
			'href' : this.href,
			'title' : this.title
		});
	});

}
