/*
 * DATEPICKER (Flatpickr):
 */
import * as BO from 'bo';

export function init(callback) {
	var $el = $('.js-add-selectOptionDatepicker,.datepicker-input');
	if (!$el.length) {
		return;
	}

	BO.set_webpack_publicpath();
	import('flatpickr/dist/flatpickr.css');
	import('flatpickr')
		.then(
			function (Module) {
				var flatpickr = Module.default;
				window.flatpickr = flatpickr;
				var languageCode = BO.languageCode()
				if (languageCode === 'en') {
					(callback)(flatpickr);
				}
				else {
					import('flatpickr/dist/l10n/' + languageCode + '.js')
						.then(
							function(language) {
								var fpLang = language.default[languageCode];
								flatpickr.localize(fpLang);
								(callback)(flatpickr);
							}
						)
						.catch(
							function (err) { console.log(err); }
						);
				}
			}
		)
		.catch(
			function (err) { console.log(err); }
		);
}

export function initStdOptions() {
	var stdOptions = {
		dateFormat: "d.m.Y", // Hotelsuche needs
		// this format
		altInput: true,
		altFormat: "d. M Y",
		minDate: "today",
		locale: BO.languageCode(),
		maxDate: new Date().fp_incr(365 * 3),
		onReady: function (selectedDates, dateStr, instance) {
			// do we have a data attribute to remote
			// a "to"-min-date?
			if ($(instance.input).data('setmindate-field')) {
				instance.remote_Field = $($(instance.input).data('setmindate-field'))[0];
			}
		},
		onOpen: function (selectedDates, dateStr, instance) {
			// #1 Formreset fix: We need to reset the hidden input field after a form reset,
			// so we check the value of the visible field and clear the hidden field if necessary:
			if (!instance._input.value.length
				&& instance.input.value.length) {
				instance.clear();
			}
		},
		onValueUpdate: function (selectedDates, dateStr, instance) {
			if ('object' === typeof instance.remote_Field) {
				// see #1:
				if (!instance.remote_Field._flatpickr._input.value.length
					&& instance.remote_Field._flatpickr.input.value.length) {
					instance.remote_Field._flatpickr.clear();
				}
				// set the remote mindate:
				instance.remote_Field._flatpickr.set("minDate", dateStr);
			}
		}
	};
	return stdOptions;
}


// 
// define and init standard datepicker
//
export function apply_standard(flatpickr) {
	return new flatpickr('.datepicker-input', initStdOptions());
}


// 
// define and init EMS datepicker
//
export function apply_ems(flatpickr) {
	$('option.js-add-selectOptionDatepicker').each(function (index, element) {
		var self = $(this);
		var mySelect = self.parent();
		var textOri = self.text();
		var valOri = self.val();

		// build a wrapper field for flatpickr to show the
		// picker popup
		mySelect.wrap('<div class="js-datepicker-selectoption-input_' + index
			+ '" ></div>');

		// add flatpickr to the input field
		var myFlatpickr = new flatpickr(
			'.js-datepicker-selectoption-input_' + index,
			{
				dateFormat: "d. M Y",
				clickOpens: false,
				locale: BO.languageCode(),
				defaultDate: "today",
				minDate: "today",
				maxDate: new Date().fp_incr(365 * 3),
				mode: "range",
				onChange: function (selectedDates, dateStr, instance) {
					// add an iso formated date
					var selectedDatesIso = [];
					$.each(selectedDates, function (key, value) {
						selectedDatesIso.push(value.toISOString());
					});
					// update the select option
					$('option.js-custom-option', mySelect).val(
						selectedDatesIso.join(','));
					$('option.js-custom-option', mySelect).text(dateStr);
				},
				onOpen: function (selectedDates, dateStr, instance) {
					// disable our select to prevent
					// closing it when datepicker is
					// open
					mySelect.prop('disabled', 'disabled');
					// add a new option to store the
					// custom date
					if (!$('.js-custom-option', mySelect).length) {
						mySelect
							.append('<option class="js-custom-option" value=""></option>');
					}
				},
				onClose: function (selectedDates, dateStr, instance) {
					// re-enable our select when closing
					// the datepicker
					mySelect.prop('disabled', false);
				}
			});

		// Chrome dont understand click events on
		// selectoptions, so we use the change event
		$(document).on("change", mySelect, function (event) {
			var $selectedOption = $('option:selected', this);
			if ($selectedOption.hasClass('js-add-selectOptionDatepicker')) {
				$('option.js-custom-option', mySelect).prop('selected', true);
				myFlatpickr.open();
			}
		});
	});
}