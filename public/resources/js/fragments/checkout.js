/**
 * Created by Himanshu wolf on 23/03/17.
 */

(function() {
  var el = {
    $checkoutTabHead    : $('.js-tabHead'),
    $checkoutTab    : $('.js-checkoutTab')
  };


  el.$checkoutTabHead.click(function() {
    el.$checkoutTab.removeClass(TDG.domClass.OPEN);
    $(this).parents('.js-checkoutTab').addClass(TDG.domClass.OPEN);
  })

  $('a[href="#booking-tab"]').click(function() {
    el.$checkoutTab.removeClass(TDG.domClass.OPEN);
    $('.booking-form.js-checkoutTab').addClass(TDG.domClass.OPEN);
  })

})();