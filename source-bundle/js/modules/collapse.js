export default function() {

    /*
     *  Collapse any element with the ".js-collapse-me" class:
     *  Use data-opentext and data-closetext attibutes to set button texts.
     */
    $('.js-collapse-me').each(function() {
        var self = $(this);
        var openText = $(this).data("opentext") || "Öffnen";
        var closeText = $(this).data("closetext") || "Schließen";
        self.wrapInner('<span class="js-collapse-me-inner"></span> ');
        self.prepend('<span class="js-collapse-me-toggler" title="">'+openText+'</span>');
        self.show();
        $('.js-collapse-me-toggler', this).click(function() {
            self.toggleClass('opened');
            if (self.hasClass("opened")) {
                $('.js-collapse-me-toggler', self).html(closeText);
            } else {
                $('.js-collapse-me-toggler', self).html(openText);
            }
        });
    });
    
    $('.js-simple-toggler').each(function() {
        var trigger = $(this);
        var toggletarget = $(this).data("target");
        var openText = $(this).data("opentext");
        var closeText = $(this).data("closetext");
        var allowToggle = $(this).data("allowtoggle");
        // hide all targets by default, except they have a given class "display-block"
        if (! $(toggletarget).hasClass("display-block")) {
            $(toggletarget).addClass('display-none');
            if (openText) { trigger.html(openText); }
        } else {
            if (closeText) { trigger.html(closeText); }
        }
        // toggle by click
        trigger.click(function() {
            if ($(toggletarget).hasClass("display-block")) {
                $(toggletarget).removeClass('display-block');
                $(toggletarget).addClass('display-none');
                trigger.html(openText);
            } else {
                $(toggletarget).removeClass('display-none');
                $(toggletarget).addClass('display-block');
                trigger.html(closeText);
            }
            if (allowToggle == false) {
                trigger.remove();
            }
        });
    });

}
