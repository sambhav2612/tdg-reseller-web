//Module with all the routes used by application, when user interacts with app

var routes = {
  API : {
    SUBSCRIBE : '/subscribeMe',
    GET_QUOTE : '/itinerary/getquote',
    BOOK_TRIP : '/itinerary/book',
    PRODUCT_BOOKING : '/product/book',
    ADD_TO_BOOK : '/add-to-book',
    AUTO_SEARCH: '/autocomplete',
    EMAIL_TRACK : '/active-subscriber',
    CHECK_COUPON : '/coupons',
    GET_GUIDE : '/get-guide',
    ITEM_SEARCH : '/search-product/:product_type',
    GET_DEAL : '/get-deal',
    STAY_DEAL : '/stay-deal',
    GET_PRICE_DEAL : '/get-price',
    GENERATE_PROD_DIST : '/get-product-dist'
  },
  WEB : {
  	LANDING_URL : '/',
    WEEKEND_GETAWAYS_LIST : '/weekend-getaways',
    WEEKEND_GETAWAYS : '/weekend-getaways-from-:location_slug',

    FIND_ITINERARY : '/itinerary/from--:source/to--:destination',
    FIND_ITINERARY_VIA : '/itinerary/from--:source/via--:via/to--:destination',
    GET_ITINERARY : '/itinerary/from--:source/to--:destination/routes/:nodes/map/:hash',
    ITINERARY : '/itinerary/from--:source/to--:destination/:slug',
    ITINERARY_VIA : '/itinerary/from--:source/via--:via/to--:destination/:slug',
    
    FIND_ROUTES : '/route/from--:source/to--:destination',

    BOOKING_DEAL : '/booking/deal',
    BOOKING : '/booking',
    CUSTOM_BOOKING : '/pay',
    BOOKING_SUCCESS : '/booking/success',
    BOOKING_FAILURE : '/booking/failure',

    TREK_PLACE : '/places/:place_slug',
    TREK_PLACE_LIST : '/places',

    ABOUT : '/about',
    TERMS : '/terms',
    FAQ:'/faq',
    LOGIN:'/login',
    TEAM : '/team',
    CONTACT : '/contact',
    WHY_CHOOSE_US : '/why-choose-traveldglobe',
    POLICIES : '/policies',

    SITEMAP : '/sitemap',


    EXPLORE : '/explore',
    EXPLORE_FILTER : '/explore/filter',
    COLLECTION : '/collections',
    SPECIAL_THINGS_TO_DO : '/things-to-do',
    SPECIAL_THINGS_TO_DO_ITEMS : '/things-to-do/:item_slug',
    COLLECTION_ITEMS : '/collection/:item_slug',
    ACTIVTIY_TYPE_LIST : '/point-of-interest/type/:activity_type',


    BLOG_LIST : '/blog',
    BLOG_LIST_AMP : '/amp/blog',
    BLOG_CATEGORY_LIST : '/blog/category/:category_slug',
    BLOG_DRAFTS_LIST : '/drafts',
    BLOG_DRAFTS : '/blog/drafts/:blog_slug',
    BLOG_WRITE : '/add-blog',
    BLOG_PAGE : '/blog/:blog_slug',
    BLOG_EDIT : '/blog/:blog_slug/edit',

    CALENDAR_LIST : '/calendar',
    CALENDAR_MONTHS : '/calendar/best-places-to-visit-in-:month',
    TAGS_LISTING : '/tags/:tag_slug',
    INTEREST_LISTING : '/travel-interests/:interest_slug',
    TRAVELLING_WITH : '/travel-with/:travel_with',


    CAB_SEARCH : '/cab',
    TRANSPORT_DIRECTORY : '/directory/transport',

    STAY : '/stay',
    PRODUCT_LISTING : '/tour',
    PRODUCT_LISTING_1 : '/outdoor-activities',
    PRODUCT_LISTING_2 : '/outdoor',
    PRODUCT : '/tour/:product_name',
    PRODUCT_REVIEWS : '/tour/:product_name/reviews',
    PRODUCT_REVIEW : '/tour/:product_name/review',
    PRODUCT_1 : '/outdoor-activities/:product_name',
    PRODUCT_2 : '/outdoor/:product_name',

    VENDOR : '/page/:vendor_slug',

    LOGOUT : '/user/logout',
    FACEBOOK_LOGIN : '/auth/facebook',
    GOOGLE_LOGIN : '/auth/google',
    FACEBOOK_LOGIN_REPEAT : '/auth/facebook/rerequest',
    FACEBOOK_LOGIN_CB : '/auth/facebook/cb',
    GOOGLE_LOGIN_CB : '/auth/google/cb',
    USER_PROFILE : '/traveller/:user_name',
  },

  LICENSE : {
    HOME : '/license/:domain_name',
    CUSTOM_PAY : '/license/:domain_name/pay',
    QUERY : '/license/:domain_name/query',
    BOOKING : '/license/:domain_name/booking',
    BOOKING_FAILURE : '/license/:domain_name/booking/failure',
    BOOKING_SUCCESS : '/license/:domain_name/booking/success',
    PRODUCT_QUERY : '/license/:domain_name/product/book',
    PRODUCT : '/license/:domain_name/plan/:product_slug',
    ADD_PRODUCT : '/license/:domain_name/add-to-book',
    GET_DEPARTURES : '/license/:domain_name/get-departures',
    STATIC_PAGE : '/license/:domain_name/page/:page_slug',
    GET_TOURS : '/license/:domain_name/plan',
    GET_EVENTS : '/license/:domain_name/event',
    EVENT_PAGE : '/license/:domain_name/event/:event_slug',
    GET_BLOGS : '/license/:domain_name/blog',
    GET_BLOG : '/license/:domain_name/blog/:blog_slug',
    GET_TAGS:'/license/:domain_name/tag'
    // BLOG : '/license/:domain_name/blog',
  }
};

Object.freeze(routes);

module.exports = routes;