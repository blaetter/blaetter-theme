/*
 * Mainmenu flyout content toggler:
 */
import * as BLAETTER from 'blaetter';

export default function search_flyout() {

	var elSearchButton = $(".js-search");
  var elSearch = $("#page-search");
  // palm:search-form in the search block of the Palm theme.
  var elSearchForm = $(".js-search-form");

	function handleSearch() {
        elSearchButton.click(
            function(event) {
                event.preventDefault();
                if (! $(this).hasClass('opened')) {
                    $(this).addClass('opened').attr('aria-label','Suche zuklappen');
                    elSearchForm.attr('action', '/search/node');
                    elSearch.addClass('opened');
                }else{
                    $(this).removeClass('opened').attr('aria-label','Suche aufklappen');
                    elSearch.removeClass('opened');
                    elSearchForm.attr('action', '#');
                }
                return false;
            }
        );
	}
    handleSearch();
}
