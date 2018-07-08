/*
 * Turns a formfilter checkbox (EMS Searchform) into an button-like element with an "x" to remove this filter
 * The x turns of its hidden checkbox and hide the whole filter from being displayed
 */

export default function() {
    
    // Add the "x" as a close button to each checkbox container and hide the original checkbox
    $('.formfilter .js-checkbox-formfilter').each(function() {
        var self = $(this);
        var closeText = $(this).data("closetext") || "Diesen Filter löschen";
        var checkbox = $('input', self);
        self.append('<span class="close" role="button" title="'+closeText+'"></span>');
        checkbox.addClass('hide');
    });
    
    // ADD EVENT-DELEGATIONS ON THE FORMFILTER CONTAINER: 
    $( ".formfilter" ).on( "click", ".js-checkbox-formfilter label", function(e) {
        // Prevent the label from being clicked
        e.preventDefault();
    }).on( "focus", ".js-checkbox-formfilter input", function(e) {
        // Highligth the close button, when a user tabs via keyboard trough the hidden checkboxes
        var myFilter = $(this).closest(".js-checkbox-formfilter");
        $('.close', myFilter).css('outline', '1px dotted');
    }).on( "blur", ".js-checkbox-formfilter input", function(e) {
        // Un-Highlight the close button when a user tabs via keyboard out of a hidden checkbox
        var myFilter = $(this).closest(".js-checkbox-formfilter");
        $('.close', myFilter).css('outline', '0 none');
    }).on( "click", ".js-checkbox-formfilter input", function(e) {
        // When a user disables a hidden checkbox via keyboard, hide the filter
        var myFilter = $(this).closest(".js-checkbox-formfilter");
        $(this).prop( "checked", false);
        myFilter.addClass('hide');
        checkVisibleFilter($(this).closest(".formfilter"));
    }).on( "click", ".js-checkbox-formfilter .close", function(e) {
        //  Uncheck the hidden checkbox and hide the filter, when a user clicks the close button
        var myFilter = $(this).closest(".js-checkbox-formfilter");
        var checkbox = $('input', myFilter);
        if(!checkbox.is(':disabled')) {
            checkbox.prop( "checked", false );
            myFilter.addClass('hide');
            checkVisibleFilter($(this).closest(".formfilter"));
        }
    });
    
    // We need add a custom selector to check on on css property "visibility"
    jQuery.extend(jQuery.expr[':'], {
      isCssVisible: function (el, index, selector) {
        return $(el).css('visibility') != 'hidden' && $(el).css('display') != 'none' && !$(el).is(':hidden')
      }
    });
    
    function checkVisibleFilter(container) {
        // if no formfilter is left, hide the whole formfilter section
        if( $(".js-checkbox-formfilter:isCssVisible", container).length <= 0 ) {
            container.addClass('hide');
        }
    }    
    
    // clear on load if no filters are present
    checkVisibleFilter($('.formfilter'));
}