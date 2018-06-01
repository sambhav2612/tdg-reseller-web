/**
 * Created by himanshujain on 08/04/15.
 */

var seoConstants = require('../constants/seoConstants'),
    _ = require('underscore'),
    //templateGenerator = require('es6-template-strings');
    templateGenerator = require('dot');

var DATA_OBJECT = {
  query : '',
  count : '',
  image_url : 'http://www.traveldglobe.com/resources/images/travel-of-globe.jpg'
};

var populateSEO = function(key, data) {
  seo_data = JSON.parse(JSON.stringify(key));

  _.extend(DATA_OBJECT, data);

  seo_data.title = templateGenerator.template(seo_data.title)(DATA_OBJECT);
  seo_data.description = templateGenerator.template(seo_data.description)(DATA_OBJECT);
  seo_data.keywords = templateGenerator.template(seo_data.keywords)(DATA_OBJECT);
  seo_data.image_url = templateGenerator.template(seo_data.image_url)(DATA_OBJECT);

  return seo_data;
};

var homeSEO = function(req, result) {
  var data = {};
  return populateSEO(seoConstants.HOME, data);
};

//TODO: Find place filter mapping
var findPlaces = function(req, result) {
  var data = {
    name : req.params.source_slug,
    traveling_with : req.query.traveling_with,
    listing: result.destinations

  };
  return populateSEO(seoConstants.FIND_DESTINATIONS, data);
}

var searchSEO = function(req, result) {
  var data = {
    query : req.query.query,
    count : result.search_result.length
  };
  return populateSEO(seoConstants.SEARCH, data);
};

var routeSEO = function(req, result) {
  var query = req.query.place, activity={name:''};
  if(query){
    for(var i=0;i<result.destination.activities.length;i++) {
      activity = result.destination.activities[i]
      if(activity.slug == query){
        break;
      }
    }
  }
  var data = {
    isRoad :'',
    activity : activity.name,
    other_name : result.destination.name,
    name: result.source.name,
    listing: result.routes

  };
  return populateSEO(seoConstants.ROUTE_PAGE, data);
}

 var itinerarySEO = function(req, result) {
   var data = {
     other_name : result.itineraries[0].destination.name,
     name: result.itineraries[0].source.name,
     listing: result.itineraries
   };
   return populateSEO(seoConstants.FIND_ITINERARY, data);
 }
var singleItinerarySEO = function(req, result) {
  var data = {
    other_name : result.itinerary.destination.name,
    name: result.itinerary.source.name,
  };
  return populateSEO(seoConstants.ITINERARY, data);
}

var destinationSEO = function(req, result) {
  var destination = result.location;
  var data = {
    other_name : destination.state.name? destination.state.name : destination.country.name,
    name: destination.name,
    title: destination.title,
    listing: destination.activities,
    image_url: destination.image_url

  };
  return populateSEO(seoConstants.DESTINATION, data);
};

var activitySEO = function(req, result) {
  var destination = result.location, activity = result.activity;
  var data = {
    other_name : destination.name,
    name: activity.name,
    title: activity.title || '',
    type: activity.type,
    listing: destination.activities,
    image_url: activity.image_url

  };
  return populateSEO(seoConstants.ACTIVITY, data);
};


var activityList = function(req, result) {
    var destination = result.location;
    var data = {
        name : destination.name,
        listing: destination.activities,
        image_url: destination.image_url
    };
    return populateSEO(seoConstants.ACTIVITY_LIST, data);
};

var activityType = function(req, result) {
  var type = req.params.activity_type;
  var data = {
    name : type,
    listing: result.activities,
    //image_url: result.activities[0].image_url
  };
  return populateSEO(seoConstants.ACTIVITY_TYPE, data);
};

var foodSEO = function(req, result) {
    var destination = result.location, activity = result.foodstuff;
    var data = {
        other_name : destination.name,
        name: activity.name,
        title: activity.title || '',
        type: activity.type,
        listing: destination.foodstuffs,
        image_url: activity.image_url

    };
    return populateSEO(seoConstants.FOOD, data);
};

var foodList = function(req, result) {
    var destination = result.location;
    var data = {
        name : destination.name,
        listing: destination.foodstuffs,
        second_listing: destination.food_availabilities,
        image_url: destination.image_url

    };
    return populateSEO(seoConstants.FOOD_LIST, data);
};

var souvenirSEO = function(req, result) {
    var destination = result.location, activity = result.souvenir;
    var data = {
        other_name : destination.name,
        name: activity.name,
        title: activity.title || '',
        listing: destination.souvenirs,
        image_url: activity.image_url

    };
    return populateSEO(seoConstants.SOUVENIR, data);
};

var souvenirList = function(req, result) {
    var destination = result.location;
    var data = {
        name: destination.name,
        listing: destination.souvenirs,
        image_url: destination.image_url

    };
    return populateSEO(seoConstants.SOUVENIR_LIST, data);
};

var destinationGallery = function(req, result) {
    var destination = result.location;
    var data = {
      name: destination.name,
      listing: destination.activities,
      image_url: destination.image_url

    };
    return populateSEO(seoConstants.DESTINATION_GALLERY, data);
};

var countrySEO = function(req, result) {
    var country = result.country, listing = result.states;
    var data = {
        name: country.name,
        listing: listing,
        image_url: country.image_url

    };
    return populateSEO(seoConstants.COUNTRY, data);
};

var stateSEO = function(req, result) {
    var state = result.state, listing = result.destinations;
    var data = {
        name: state.name,
        title: state.title || '',
        listing: listing,
        image_url: state.image_url

    };
    return populateSEO(seoConstants.STATE, data);
};

var stateMap = function(req, result) {
  var state = result.state, listing = result.destinations;
  var data = {
    name: state.name,
    title: state.title || '',
    listing: listing,
    image_url: state.image_url

  };
    return populateSEO(seoConstants.STATE_MAP, data);
};

var stateGallery = function(req, result) {
  var state = result.state, listing = result.destinations;
  var data = {
    name: state.name,
    title: state.title || '',
    listing: listing,
    image_url: state.image_url

  };
    return populateSEO(seoConstants.STATE_GALLERY, data);
};

var stateTopList = function(req, result) {
    var state = result.state, listing = result.destinations;
    var data = {
      name: state.name,
      title: state.title || '',
      listing: listing,
      image_url: state.image_url

    };
    return populateSEO(seoConstants.STATE_TOP, data);
};

var collectionsSEO = function(req, result) {
    var collection = result.collections;
    var data = {
        listing: collection
    };
    return populateSEO(seoConstants.COLLECTIONS, data);
};

var collectionListing = function(req, result) {
    var collection = result.collection;
    var data = {
        name: collection.name,
        listing: collection.locations,
        image_url: collection.image_url

    };
    return populateSEO(seoConstants.COLLECTION, data);
};

var calendarList = function(req, result) {
  var data = {};
    return populateSEO(seoConstants.CALENDAR_LIST, data);
};

var monthsListing = function(req, result) {
    var destinations = result.destinations;
    var data = {
        name: req.params.month,
        listing: destinations,
        image_url: ''

    };
    return populateSEO(seoConstants.MONTH_FILTER, data);
};

var tagListing = function(req, result) {
    var destinations = result.destinations;
    var data = {
      name: req.params.tag_slug,
      tag: result.tag,
      listing: destinations,
      image_url: ''

    };
    return populateSEO(seoConstants.TAG_FILTER, data);
};

var interestListing = function(req, result) {
  var destinations = result.destinations;
  var data = {
    name: req.params.interest_slug,
    interest: result.interest,
    listing: destinations,
    image_url: ''

  };
  return populateSEO(seoConstants.INTEREST_FILTER, data);
};

var travellingWithListing = function(req, result) {
  var destinations = result.destinations;
  var data = {
    name: req.params.travel_with,
    listing: destinations,
    image_url: ''

  };
  return populateSEO(seoConstants.PARTNER_FILTER, data);
};

var activityCollection = function(req, result) {
  var data = {};
  return populateSEO(seoConstants.THINGS_TO_DO, data);
};

var activityCollectionList = function(req, result) {
    var collection = result.collection;
    var data = {
        name: collection.name || '',
        listing: result.activities,
        image_url: collection.image_url
    };
    return populateSEO(seoConstants.THINGS_TO_DO_LIST, data);
};

var vendorSEO = function(req, result) {
  var vendor = result.vendor;
  var image = vendor.plans.length ? vendor.plans[0].plan.image_url :'';
  var data = {
    name : vendor.name,
    listing: vendor.plans,
    image_url : image
  };
  return populateSEO(seoConstants.VENDOR, data);
}

var contributorsSEO = function(req, result) {
  var users = result.users;
  var data = {
    listing: users
  };
  return populateSEO(seoConstants.CONTRIBUTORS, data);
};

var licenseeHome = function(req, result) {
  var licensee = result.licensee;
  var data = {
    name: licensee.name,
    image_url: ''
  };
  return populateSEO(seoConstants.LICENSE_HOME, data);
};

//TODO: Make blog listing for category

var blogList = function(req, result) {
  var listing = result.blogs, page = req.query.page || 1;
  var data = {
    page: page,
    listing: listing,
    type : 'by travellers',
    image_url: ''
  };
  return populateSEO(seoConstants.BLOG_LIST, data);
};

var countries = function(req, result){
  var listing = result.countries;
  var data = {
    listing: listing
  };
  return populateSEO(seoConstants.COUNTRIES, data);
};

var placeSEO = function(req, result){
  var location = result.trek_location;
  var data = {
    name: location.name,
    title: location.title,
    food_availability : location.food_availability,
    stay_option : location.stay_option,
    image_url : location.image_url
  };
  return populateSEO(seoConstants.PLACE, data);
};
var placeList = function(req, result){
  var listing = result.trek_locations;
  var data = {
    listing: listing
  };
  return populateSEO(seoConstants.PLACES, data);
};

var stayOptions = function(req, result){
  var location = result.location, listing= result.stays;
  var data = {
    name: location.name,
    image_url: location.image_url,
    listing: listing
  };
  return populateSEO(seoConstants.STAY_OPTIONS, data);
};

var stayPage = function(req, result){
  var stay = result.stay, location= result.stay.location;
  var data = {
    name: stay.name,
    other_name: location.name,
    image_url: stay.image_url
  };
  return populateSEO(seoConstants.STAY_PAGE, data);
};
var weekendListing = function(req, result){

  return populateSEO(seoConstants.WEEKEND_LISTING, {});
};
var weekendGetaways = function(req, result){

  var source = result.source, destinations= result.destinations;
  var data = {
    name: source.name,
    listing: destinations,
    image_url: source.image_url
  };

  return populateSEO(seoConstants.WEEKEND_GETAWAYS, data);
};

var transportSearch = function(req, result){

  var data= {
    other_name : '',
    name: '',
    listing: []
  };

  if(result){
    data = {
      other_name : result.road.destination.name,
      name: result.road.source.name,
      listing: result.cabs
    };
  }
  return populateSEO(seoConstants.TRANSPORT_SEARCH, data);
};

var profilePage = function(req, result){
  var user = result.user;
  var data = {
    name: user.user_name,
    image_url: 'http://graph.facebook.com/'+ user.facebook + '/picture?type=large'
  };
  return populateSEO(seoConstants.PROFILE, data);
};

var tbProductPage = function(req, result) {
  var product = result;
  var data = {
    name: product.title,
    desc : product.overview,
    image_url: product.media[0].url
  };
  return populateSEO(seoConstants.TOURBOKS_PRODUCT, data);
};

var hostingPlans = function() {
  var data = {};
  return populateSEO(seoConstants.HOSTING_PLANS, data);
}


module.exports = {
  'home' : homeSEO,
  'find places' : findPlaces,
  'search' : searchSEO,
  'route' : routeSEO,
   'find itinerary' : itinerarySEO,
   'itinerary' : singleItinerarySEO,
  'destination' : destinationSEO,
  'activity' : activitySEO,
  'activity list' : activityList,
  'activity type' : activityType,
  'food' : foodSEO,
  'food list' : foodList,
  'souvenir' : souvenirSEO,
  'souvenir list' : souvenirList,
  'gallery' : destinationGallery,
  'countries' : countries,
  'country' : countrySEO,
  'state' : stateSEO,
  'state map' : stateMap,
  'state gallery' : stateGallery,
  'state top listing' : stateTopList,
  'collections' : collectionsSEO,
  'collection listing' : collectionListing,
  'calendar list' : calendarList,
  'months listing' : monthsListing,
  'tag listing' : tagListing,
  'travelling with listing' : travellingWithListing,
  'activity collection' : activityCollectionList,
  'activity collection list' : activityCollection,
  'blog listing' : blogList,
  'place' : placeSEO,
  'place list' : placeList,
  'stay options' : stayOptions,
  'stay search' : stayOptions,
  'stay' : stayPage,
  'tbProduct' : tbProductPage,
  'profile' : profilePage,
  'vendor' : vendorSEO,
  'hostingPlans' : hostingPlans,
  'contributors' : contributorsSEO,
  'weekend getaway listing':  weekendListing,
  'weekend gateways' : weekendGetaways,
  'transport search' : transportSearch,
  'licenseeHome' : licenseeHome,
  'licenseeProduct' : licenseeHome,
  'licenseeBooking' : licenseeHome

};
