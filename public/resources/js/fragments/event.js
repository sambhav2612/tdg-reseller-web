/**
 * Created by Himanshu wolf on 19/05/16.
 */


(function (window, document, $) {
  var el = {
    $actionHeader : $('.js-action'),
    formBtn: '.js-getQuote',
    $glider: $(".js-glide"),
    $galleryOpen : $('.js-openGallery'),
    $startDate    : $('.js-startDate'),
    $bookBtn : $('.js-book'),
    $bookStatus : $('.js-bookStatus'),
    $bookingCard : $('.booking-card'),
    $imgThumb : $('img.js-thumb'),
    $travellersCount : $('.js-count'),
    $quantityIcon : $('.js-qIcon'),
    $quantity : $('.js-quantity'),
    $total : $('.js-total'),
    $showMore : $('.js-showMore')
  }, user = {};



  var groupSizeManager = function() {
    var $this = $(this), quantity = parseInt(el.$travellersCount.val());
    if($this.attr('data-type') === 'plus') {
      quantity +=1;
      el.$quantity.text(quantity);
      el.$travellersCount.val(quantity);
    } else {
      if(quantity ===1) {
        return false;
      }
      quantity -=1;
      el.$quantity.text(quantity);
      el.$travellersCount.val(quantity);
    }
    el.$total.text(TDG.productPrice*quantity);

  };// booking card handler ends


/*----------------------------------------------------------------------------------------------------------------------
      Query Submit Handling
----------------------------------------------------------------------------------------------------------------------*/


  var querySubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $btn_ref = $(this), email_ref;

    el.$form = $btn_ref.parents('form');

    email_ref = $(el.$form.find('[name="email"]'));

    // user.slug = $(el.$form.find('[name=slug]')).val();
    // user.name = $(el.$form.find('[name=username]')).val();
    user.mobile = $(el.$form.find('[name=phone]')).val() || $(el.$form.find('[name=mobile]')).val();
    user.comment = $(el.$form.find('[name=comment]')).val();
    user.start_date = $(el.$form.find('[name=start_date]')).val();
    user.query_url= window.location.href
    user.is_booking = false;
    user.licensee_product= $(el.$form.find('[name=licensee_product]')).val();
    user.licensee_id=$(el.$form.find('[name=licensee_id]')).val();

    if (email_ref && email_ref.val()) {
      user.email = email_ref.val();
    }
    if (!$btn_ref.hasClass('disabled')) {
      $btn_ref.addClass('disabled');
      console.log("user =",user);
      $.ajax({
        url: TDG.urls.LICENSE_BOOKING,
        method: 'POST',
        data: user,
        success: function (response) {
          $('<div> We will contact you shortly </div>').insertAfter(el.$form);
          $btn_ref.removeClass('disabled')
        },
        error: function (err) {
          $('<div> Something is wrong </div>').insertAfter(el.$form);
          $btn_ref.removeClass('disabled')
        }
      });
    }
  }; // Query Submit handler ends

/*----------------------------------------------------------------------------------------------------------------------
         Booking Button Handler
----------------------------------------------------------------------------------------------------------------------*/

  var handleBookingBtn = function() {
    var $this = $(this), product = $this.data('slug');
    var date = el.$startDate.val() || '';
    if($this.hasClass('disabled')){
      return false;
    }

    //TDG.product.updateProductCache();

    $this.addClass('disabled');
    el.$bookStatus.html('Checking Availability...');
    $.ajax({
      url: TDG.urls.ADD_TO_BOOK,
      method: 'post',
      data: {product: product},
      success: function (response) {
        el.$bookStatus.html('Redirecting to Booking page...');
        window.location.href = location.protocol + '//'+ location.host + '/booking?travel_date=' + date + '&travellers=' + el.$travellersCount.val();
      },
      error: function (err) {
        el.$bookStatus.html('Try Again!');
        $this.removeClass('disabled');
      }
    });
  };


/*----------------------------------------------------------------------------------------------------------------------
 Common UI
 ----------------------------------------------------------------------------------------------------------------------*/

  var changeImage = function() {
    var $this = $(this);
    el.$imgThumb.removeClass('highlight');
    $this.addClass('highlight');
    $('img.js-image').attr('src', $this.attr('src'));
    $('.js-caption').text($this.data('caption'))
  }

  var loadTruncateText = function() {
    $(this).parents('.js-content').addClass(TDG.domClass.OPEN)
  }

/*----------------------------------------------------------------------------------------------------------------------
 Page Initialisation
----------------------------------------------------------------------------------------------------------------------*/

  var init = function(){

    setTimeout(function() {
      el.$imgThumb.each(function(index, tag) {
        var $this = $(this);
        $this.attr('src', $this.attr('data-img')).on('load', function() {
          $this.attr('data-img', '');
        });

      });
    }, 1500);

    if(el.$glider) {

      el.$glider.glide({
        type: 'slider',
        paddings: '20%',
        autoplay: 2000,
        hoverpause: false,
        animationTimingFunc: "ease-out",
        animationDuration: 400
      });

      el.$galleryOpen.click(function () {
        TDG.lazyLoadImages(el.$glider);
        el.$glider.toggleClass(TDG.domClass.OPEN)
      })
    };

    // event Manager

    el.$quantityIcon.click(groupSizeManager);
    el.$imgThumb.mouseenter(changeImage);
    el.$showMore.click(loadTruncateText);
    $(el.formBtn).click(querySubmit);
    el.$bookBtn.click(handleBookingBtn);

    $(window).on('scroll', function() {
      if(window.scrollY >550) {
        el.$actionHeader.addClass('fixed');
      } else {
        el.$actionHeader.removeClass('fixed');
      }
    })
  }


  init();

})(window, document, jQuery);
