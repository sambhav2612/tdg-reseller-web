//module with all the url templates used by application to interact with api server

module.exports = {
	HOME :  {url: '/home', method: 'GET'},

	CHOOSE_DESTINATION : {url:'/location', method : 'GET'},
	DESTINATION : {url:'/location/{location_slug}', method : 'POST'},
	DESTINATION_DATA : {url:'/location/{location_slug}', method : 'GET'},
	EATING_PLACES : {url:'/location/{location_slug}/zomato', method: 'GET'},
	DESTINATION_FILTER : {url:'/location/filter', method : 'GET'},

	ACTIVITY : {url:'/activity/{activity}', method : 'GET'},
	FOOD_STUFF : {url:'/activity/food/{food_stuff}', method : 'GET'},
	SOUVENIRS : {url:'/activity/souvenir/{souvenir_slug}', method : 'GET'},

	STAY : {url:'/activity/stay', method : 'GET'},
	STAY_PRODUCT : {url:'/activity/stay/{stay_slug}', method : 'GET'},

	PLAN : {url:'/plan', method: 'GET'},
	ACTIVITY_PLAN : {url:'/plan/activity', method: 'GET'},
	PLAN_PRODUCT : {url:'/plan/{plan_slug}', method: 'GET'},
	PRODUCT_BOOKING : {url:'/license/user', method: 'POST'},


	CHECK_OFFER : {url:'/payment/offers', method: 'GET'},
	FETCH_PRICE : {url:'/payment/price', method: 'GET'},
	DYNAMIC_PRICE : {url:'/payment/price/dynamic', method: 'GET'},
	GROUP_PRICE : {url:'/payment/price/group', method: 'GET'},

	ROUTE_INFO : {url:'/itinerary/info', method : 'GET'},
	FIND_ROUTE : {url:'/route', method : 'GET'},
	ACTIVE_ROUTES_FROM : {url:'/route/from', method : 'GET'},
	GET_QUOTE : {url:'/itinerary/quote', method : 'POST'},
	UPDATE_QUOTE : {url:'/itinerary/quote/{id}', method : 'PUT'},

	FIND_ITINERARY : {url:'/itinerary/itinerary2', method : 'GET'},
	ITINERARY : {url:'/itinerary/itinerary2/{itinerary_slug}', method : 'GET'},

	SITEMAP : {url:'/location/sitemap', method : 'GET'},

	COUNTRY_MAP : {url:'/location/country', method : 'GET'},
	STATE_LIST : {url:'/location/state/{state_slug}', method: 'GET'},
	STATE_FOOD : {url:'/activity/food/state' , method:'GET'},
	COUNTRY_LIST : {url:'/location/country/{country_slug}', method : 'GET'},

	EXPLORE : {url:'/location/explore', method : 'GET'},
	COLLECTION : {url:'/location/collection', method : 'GET'},
	COLLECTION_LIST : {url:'/location/collection/{collection_slug}', method : 'GET'},
	ACTIVITY_LIST : {url:'/activity/type/{activity_type}', method : 'GET'},
	WEEKEND_GETAWAY : {url:'/location/weekend_getaway/{source_slug}', method : 'GET'},

	FEELING_TRAVEL : {url:'/location/imfeeling', method : 'GET'},
	LOCATION_WEEKLY : {url:'/location/weekly', method : 'GET'},
	DESTINATION_FACT : {url:'/activity/fact', method : 'GET'},

	BLOG_LIST : {url:'/blog', method : 'GET'},
	BLOG_PAGE : {url:'/blog/{blog_slug}', method : 'GET'},
	BLOG_CATEGORY_LIST : {url:'/blog/category/{category_slug}', method : 'GET'},
	BLOG_DRAFT_LIST : {url:'/blog/draft', method : 'GET'},
	BLOG_DRAFT : {url:'/blog/draft/{blog_slug}', method : 'GET'},

	VENDOR_LIST : {url:'/vendor', method : 'GET'},
	VENDOR_DATA : {url:'/vendor/{vendor_slug}', method : 'GET'},

	LOGIN_OAUTH : {url: '/user/oAuth', method: 'POST'},
	LOGOUT : {url: '/user/{id}/logout', method: 'POST'},

	SUBSCRIBE :  {url: '/user/subscribe', method: 'POST'},
	USER_PROFILE :  {url: '/user/{user_name}', method: 'GET'},
	BLOGGERS :  {url: '/user/blogger', method: 'GET'},
	USER_WISHLIST : {url: '/user/wishlist', method: 'POST'},


	REVIEW : {url: '/review/', method: 'POST'},
	REVIEWS : {url: '/review/', method: 'GET'},
	REVIEW_RATING : {url: '/review/rating', method: 'POST'},
	REVIEW_RATINGS : {url: '/review/rating', method: 'GET'},
	UPDATE_REVIEW_RATING : {url: '/review/rating/{id}', method: 'PUT'},
	RATING_TYPE_LIST : {url: '/review/rating/type', method: 'GET'},


	//booking calls
	CREATE_BOOKING : {url: '/payment/booking', method: 'POST'},
	UPDATE_STATUS : {url: '/payment/txn/callback/payu', method: 'POST'},
	UPDATE_RAZOR_STATUS : {url: '/payment/txn/callback/razorpay', method: 'POST'},


	AUTO_COMPLETE : {url : '/knight/autocomplete', method:'GET'},
	SEARCH : {url : '/knight/search', method:'GET'},

	RELEASE : {url : '/knight/release', method:'GET'},
	URL_REDIRECTION : {url : '/knight/url', method:'GET'},

	//trek
	TREK_PLACE : {url : '/trek/trek_location/{place_slug}', method:'GET'},
	TREK_PLACE_LIST : {url : '/trek/places', method:'GET'},

	DEPARTURES : {url : '/plan/{plan}/dates', method:'GET'},

	//licensee
	DOMAIN_DATA : {url : '/license/{domain}', method:'GET'},
	LICENSE_PRODUCTS : {url : '/license/{domain}/product', method:'GET'},
	LICENSE_PRODUCT : {url : '/license/{domain}/product/{product_slug}', method:'GET'},
	LICENSE_PAGE : {url : '/license/{domain}/page/{slug}', method:'GET'},
	LICENSE_PAGES : {url : '/license/{domain}/page', method:'GET'},
	LICENSE_BLOGS : {url : '/license/{domain}/blog', method:'GET'},
	LICENSE_BLOG : {url : '/license/{domain}/blog/{blog_slug}', method:'GET'},
	LICENSE_EVENTS : {url : '/license/{domain}/event', method:'GET'},
	LICENSE_EVENT : {url : '/license/{domain}/event/{event_slug}', method:'GET'},
	LICENSE_BOOKING : {url:'/license/booking', method: 'POST'},
	LICENSE_UPDATE_BOOKING : {url:'/license/{domain}/booking', method: 'PUT'},
	LICENSE_TAG: {'url':'/license/{domain}/tag',method:"GET"},
	//temporary
	ACTIVE_LOCATIONS : {url: 'http://52.88.8.157:8080/admin/api/v1/location/active_locations', method: 'GET'},

	//Foreign API
	WEATHER : {url:'https://www.tripoto.com/api/1.0/weather', method: 'GET'},
	//WEATHER : {url:'https://api.forecast.io/forecast/{access_code}/{lat},{lng}', method: 'GET'},
	FLIGHT : {url:'https://developer.goibibo.com/api/search/', method: 'GET'},
	BUS : {url:'https://developer.goibibo.com/api/bus/search/', method: 'GET'},



	//TourBoks API
	TOURBOKS_PRODUCT_SEARCH : {url : '/products', method: 'POST'},
	TOURBOKS_PRODUCT_DETAILS : {url : '/products/{id}', method: 'GET'},
	TOURBOKS_PRODUCT_AVAILABLE_DATES : {url : '/products/availability/dates', method: 'POST'},
	TOURBOKS_PRODUCT_AVAILABILITY : {url : '/products/availability', method : 'POST'},
	TOURBOKS_ORDER_CREATE : {url : '/orders/create', method : 'POST'},
	TOURBOKS_SUCCESS_CALL : {url : '/orders/{orderId}/pay', method : 'POST'},

	//REVIEWS : {url:'https://graph.facebook.com/v2.8/763865327072658/ratings?access_token=EAAQXHxvQNSsBAEur1xM2v5GtFfRRNHayhFFQog4roO8rkSNE145DySKenI5vbuZCelnhtZBhZC8aDFuTEwVZAPXKZCCuMhxf9IZAE6CN9VxVebmYQSV0ug1waehPNIaVKwf7Nq7enQKLbpf6vPWiVPxCxm2ZAZArvMk22qeAZCOe9wwZDZD&limit=50', method: 'GET'}


};

