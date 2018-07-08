/*
 *  Popop for Befi detailpage contact forms 
 *  
 */

export default function() {

	function EasyPopup() {
		var self = $(this);
		if ('function' === typeof this.EasyPopup) {
			return;
		}
		this.EasyPopup = EasyPopup;
		$('.js-easypopup__toggler', self).attr("aria-expanded", "false");
		$('.js-easypopup__toggler', self).attr("aria-haspopup", "true");
		$('.js-easypopup__toggler', this).click(
				function() {
					// close all popups
					$('.js-easypopup').not(self).removeClass('opened');
					$('.js-easypopup__toggler').not(self).attr(
							"aria-expanded", "false");
					//
					self.toggleClass('opened');
					if (self.hasClass("opened")) {
						$('.js-easypopup', self).removeClass('opened');
						$('.js-easypopup__toggler', self).attr(
								"aria-expanded", "true");
					} else {
						$('.js-easypopup', self).addClass('opened');
						$('.js-easypopup__toggler', self).attr(
								"aria-expanded", "false");
					}
				});
		$('.js-easypopup__close', this).click(
				function() {
					self.removeClass('opened');
					$('.js-easypopup__toggler', self).attr("aria-expanded",
							"false");
				});
	}
	
	$.fn.EasyPopup = function() {
		return this.each(EasyPopup);
	}

	$('.js-easypopup').EasyPopup();
}
