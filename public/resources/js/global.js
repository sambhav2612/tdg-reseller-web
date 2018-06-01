/**
 * Created by Himanshu wolf on 17/10/15.
 *
 * @desc This is the global file for all the pages, it creates the namespace for the application and defines the global variables that will used in the application.
 *
 * JS structure
 *
 * 1. global.js - TDG is global namespace
 * 2. modules
 *      - all supportive modules extending the namespace
 * 3. fragments
 *      - contains the page specific scripts and event handling
 *
 * Naming conventions for JS
 *
 * Functions - camelCase [bindEvent()]
 * Variables - underscore separated [my_var]
 * DOM selector - .js-thisElement
 * Constants - UPPERCASE
 * Constructor - Capitalize
 * Private members - underscore prefix [ _private_var ]
 *
 */

if (typeof TDG === 'undefined') {

  TDG = {};
}

TDG.urls = {
  PRODUCT_BOOKING: '/product/book', // product query
  LICENSE_BOOKING: '/query', // booking query
  ADD_TO_BOOK: '/add-to-book', // add to cart
  GET_DEPARTURES: '/get-departures', // get departures
  GET_DEAL: '/get-deal',
  GET_TAGS: '/tags'
};

TDG.regex = {
  "EMAIL": /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  "PHONE": /^[0-9]{10}$/,
  "NUMBER": /^[0-9]+$/,
  "SPECIAL_CHAR": /[<>]/i
};

TDG.domClass = {
  "OPEN": 'open',
  "STATIC": 'static',
  "SELECTED": 'selected',
  "SHOW": 'show'

}

TDG.ascii = {
  ESCAPE: 27,
  ENTER: 13
};

TDG.utils = {
  createCookie: function (name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    else  expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  readCookie: function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  getUrlVars: function (tmUrl) {
    var vars = [], hash;
    var hashes = tmUrl.slice(tmUrl.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;

  }
};

TDG.toggleOverlay = function () {
  var $overlay = $('.fixed-overlay'), $body = $('body');
  if ($overlay.hasClass('hide')) {
    $overlay.removeClass('hide');
    //$body.addClass('noscroll');
  } else {
    $overlay.addClass('hide');
    //$body.removeClass('noscroll');
  }
};

TDG.storelocalStorage = function (key, blog) {
  localStorage.setItem(key, JSON.stringify(blog));
};
TDG.retrievelocalStorage = function (key) {
  var retrievedObject = localStorage.getItem(key);
  return JSON.parse(retrievedObject);
};

TDG.jsonToQueryString = function (json) {
  return '?' +
      Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
      }).join('&');
}

TDG.lazyLoadImages = function (container) {
  var imgTags = container.find('img[data-src]');

  imgTags.each(function (index, tag) {
    var $this = $(this);
    $this.attr('src', $this.attr('data-src'));

  });

};


(function () {
  var el = {
        $lazyImages: $('.img-lazy'),
        $overlay: $('.fixed-overlay'),
        $magicBox: $('.magic-box'),
        $navLink: $('.js-nav'),
        $magicBoxClose: $('.magic-box .js-close')
      },
      scrollIndex = {}, scrollIndices, indexLength;

  el.$navLink.click(function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $this = $(this)
    $('html,body').animate({
          scrollTop: $($this.attr('href')).offset().top
        },
        'slow');
  })


  el.$lazyImages.each(function (index, tag) {
    var $this = $(this);

    if (scrollIndex[$this.attr('data-scroll')]) {
      scrollIndex[$this.attr('data-scroll')].push($this);
    } else {
      scrollIndex[$this.attr('data-scroll')] = [$this]; // create new images array
    }
  });
  scrollIndices = Object.keys(scrollIndex);
  indexLength = scrollIndices.length;


  $(window).on('scroll', function () {
    var scrollY = window.scrollY,
        loadImage = function (items) {
          items.forEach(function (item) {
            var $this = $(item);
            if ($this.attr('data-src')) {
              $this.attr('src', $this.attr('data-src'));
              $this.attr('data-src', '');
            }
          });
        }
    if (!($(document).height() - $(window).height() > 400)) {
      return;
    }
    scrollY = (parseInt(String(scrollY)[0])) * Math.pow(10, String(scrollY).length - 1);
    if (scrollIndex[scrollY]) {
      loadImage(scrollIndex[scrollY])
    }
    while (indexLength) {
      indexLength -= 1;
      if (scrollY > scrollIndices[indexLength]) {
        loadImage(scrollIndex[scrollIndices[indexLength]])
      }
    }
  });


  var hideMagicBox = function () {
    el.$overlay.addClass('hide');
    el.$magicBox.removeClass('show');
  };

  el.$magicBoxClose.click(hideMagicBox);

  $(document).keydown(function (event) {
    if (event.which == TDG.ascii.ESCAPE) {
      hideMagicBox();
    }
  });

  $(".js-cross").hide();
  $(".mbl-menu").hide();

  $(".js-hamburger").click(function () {
    $(".mbl-menu").slideToggle("slow", function () {
      $(".js-hamburger").hide();
      $(".js-cross").show();
    });
  });

  $(".js-cross").click(function () {
    $(".mbl-menu").slideToggle("slow", function () {
      $(".js-cross").hide();
      $(".js-hamburger").show();
    });
  });
})();


