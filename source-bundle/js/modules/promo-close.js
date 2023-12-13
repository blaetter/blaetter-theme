/*
 * Function to set header fixed on scroll:
 */
import * as BLAETTER from 'blaetter';

export default function promo_close() {
    $('.promo-close').each(function(){
      $(this).on('click', function(){
        $('.block--promo').remove();
      })
    });
}
