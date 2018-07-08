/*
 *     Footer Navigation: Toggle subnav (mobile only)
 */


export default function nav_footer() {

	$(".navigation-footer h3, .navigation-footer .grid__item > strong").bind("tap click",function(e) {
		$(this).parent().toggleClass('opened');
		return false;
	});

	$('#footer .footer_totop').bind("tap click",function(e) {
		e.preventDefault();
		document.getElementById('header').scrollIntoView();
		return false;
	});
}
