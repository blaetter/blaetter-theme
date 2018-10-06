/*
 *  Build a list of checkboxes from a multiselect field (desktop device only)
 *  set attribute "data-selectfirst" if you want to autoselect the first option (only if nothing else is selected)
 */
import * as BLAETTER from 'blaetter';

export default function () {
  $('.js-multiselect2checkboxes').each(function () {
    var self = $(this);
    var $mySelect = $('select', self);
    var $mySelectOptions = $('option', $mySelect);
    var selectName = $mySelect.attr('name');
    // Only desktop! On mobile devices we want to use the original multiselect!
    if (! BLAETTER.is_palm()) {
      // Hide the original select
      $mySelect.hide();
      // Add a fake field for our selected display texts
      var myFakeselect = $('<input readonly="readonly "class="js-multiselect2checkboxes__fakeselect">').attr('placeholder', $mySelect.attr('placeholder')).on('click', function (event) {
        event.stopPropagation();
        $myCheckBoxContainer.toggle();
      });
      $mySelect.before(myFakeselect).before('<span class="arrow">');
      // Add a container for our checkboxes
      var $myCheckBoxContainer = $('<div class="checkbox-container">').on('click', function (event) {
        event.stopPropagation();
      });
      // Copy all selectfield-options as checkboxes into the checkbox container
      $('option', $mySelect).each(function (e) {
        var $label = $('<label>').text($(this).text()).appendTo($myCheckBoxContainer);
        var $cb = $('<input type="checkbox">').attr({
          name: selectName,
          value: this.value
        }).prop({
        	'_bo_option': this,
        	'checked': this.selected
        }).on('change', function () {
          this._bo_option.selected = this.checked;
          if (this.checked) {
        	  $(this._bo_option).attr('selected', 'selected');
          }
          else {
        	  $(this._bo_option).removeAttr('selected');
          }
          var selected = [];
          $(':checked', $myCheckBoxContainer).each(function () {
            selected.push($(this._bo_option).text());
          });
          $(myFakeselect).val(selected.join(', '));
        }).trigger('change').appendTo($label);
      });
      $mySelect.after($myCheckBoxContainer);
      // Open Checkbox container when click on the fake select input field
      $(window).click(function (event) {
        $myCheckBoxContainer.hide();
      });
    } else {
      // Show the original select instead, when on a mobile device
      $mySelect.show();
    }
  });
}
