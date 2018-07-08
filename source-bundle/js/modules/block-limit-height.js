/*
 *  limit text-block height
 */

export default function() {

    $('.js-block-limit-height').each(function() {
        var self = $(this);
        var textblockHeight = (self.height());
        var openText = $(this).data("opentext") || "Weiterlesen";
        var closeText = $(this).data("closetext") || "Weniger lesen";
        var minHeight = $(this).data("minheight") || "217"; //px
        var maxHeight;
        if (textblockHeight > minHeight) {
            self.append('<span class="js-block-limit-height__toggler"><button class="link toggler">'+openText+'</button></span>');
            self.addClass('closed').css('max-height', minHeight+'px');
            var togglerHeight = $('.js-block-limit-height__toggler .toggler', self).height();
            $('.js-block-limit-height__toggler .toggler', this).click(function() {
                self.toggleClass('closed');
                if (self.hasClass("closed")) {
                    $('.js-block-limit-height__toggler .toggler', self).html(openText);
                    self.css('max-height', minHeight);
                } else {
                    $('.js-block-limit-height__toggler .toggler', self).html(closeText);
                    maxHeight = parseInt(textblockHeight) + parseInt(togglerHeight) + parseInt(40);
                    self.css('max-height',maxHeight+'px');
                }
            });
        }
    });
}
