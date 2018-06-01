/**
 * Created by Himanshu wolf on 20/07/15.
 */

(function(window, document, $) {
  var el = {
    $body : $('body'),
    $scrollBtn: $('.js-scroll'),
    $startDate    : $('.js-startDate'),
    $interestItem : $('.js-interestItem'),
    $fields : $('.js-field'),
    $travelTime : $('.js-field.travel-time'),
    $submitBtn : $('.js-preferenceSubmit'),
    $roadMap : $('.js-roadMap'),
    $overlay : $('.fixed-overlay'),
    $dumpOverlay: $('.home-inner'),
    $result_ref : $('.js-results'),
    $loader_ref : $('.js-resultLoader')
  }, preferences = {
        traveling_with : 'friends',
        source: 'new-delhi',
        travel_time : '3'
      },
  isBtnAvailable = true, areResultRequested = false, source="new-delhi";

  $('input:reset').trigger('click');


  el.$interestItem.click(function(event) {
    var $this = $(this),
        targetCheck = $this.data('target');
    if(areResultRequested){
      return;
    }

    el.$interestItem.removeClass('selected');
    $this.addClass('selected');
    preferences.traveling_with = targetCheck;
    if(!isBtnAvailable) {
      loadResults(el.$submitBtn)
    }
  });

  el.$submitBtn.on('click', function(event) {
    var currMonth, currYear, day, btn_ref = $(this);
    var form = btn_ref.parents('form');

    var d = el.$startDate.datepicker('getDate');
    if(d) {
      day = d.getDate();
    } else {
      d = new Date();
      day = d.getDate() + 10;
    }
    currMonth = d.getMonth();
    currYear = d.getFullYear();

    var startDate = new Date(currYear,currMonth,day);
    el.$startDate.datepicker('update', startDate);


      event.preventDefault();
      event.stopPropagation();
      loadResults(btn_ref, form);
    isBtnAvailable = false;
  });

  el.$startDate.datepicker({
    container: '.date-container',
    orientation: 'left bottom',
    immediateUpdates: true,
    // toggleActive: true,
    startDate: '+1d',
    todayHighlight: true,
    autoclose : true
  });

  window.onload = function() {

    $( ".js-img" ).each(function() {
      var _self = $(this);

      _self.attr('src', _self.data('src'));
    });
  };

  var loadResults = function(btn_ref, form) {
    el.$loader_ref.addClass('show');
    btn_ref.addClass('disabled');
    el.$result_ref.toggleClass('inactive');

    form = form || btn_ref.parents('form');

    var baseURL = form[0].action,
        url = baseURL.substr(0, baseURL.indexOf('--')) + '--' + preferences.source + '?traveling_with='+preferences.traveling_with+'&travel_time='+preferences.travel_time+'&start_date=' + el.$startDate.datepicker('getDate')

    //History.pushState({}, document.title, url);
    el.$loader_ref.parents('.home-poster').addClass('open');
    areResultRequested = true;

    $.ajax({
      url: url + '&filter_home=true',
      dataType: 'html',
      success: function (response) {
        areResultRequested = false;
        btn_ref.removeClass('disabled');
        el.$result_ref.toggleClass('inactive');
        el.$result_ref.html(response);
        el.$loader_ref.removeClass('show');
      }, error: function () {
        areResultRequested = false;
        btn_ref.removeClass('disabled');
        alert('Something went wrong');
      }
    });
  }

  el.$result_ref.on('click', '.js-source li', function(event) {
    event.stopPropagation();
    if(areResultRequested){
      return;
    }
    var $this= $(this);

    preferences.source = $this.attr('data-source');
    $this.parents('.dropmenu').find('span').text($this.text());
    loadResults(el.$submitBtn)
  });
  el.$result_ref.on('click', '.js-time li', function(event) {
    event.stopPropagation();
    if(areResultRequested){
      return;
    }
    var $this= $(this);

    preferences.travel_time = $this.attr('data-time');
    $this.parents('.dropmenu').find('span').text($this.text());
    loadResults(el.$submitBtn)
  });


  var scrollToNext = function(event) {
    var $target = $($(this).data('target'));

    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 1000);
  };


  el.$scrollBtn.on('click', scrollToNext);

})(window, document, jQuery);