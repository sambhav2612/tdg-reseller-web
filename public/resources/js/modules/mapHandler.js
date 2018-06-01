/**
 * Created by Himanshu wolf on 15/12/15.
 */

if(typeof(TDG) === 'undefined') {
  TDG ={};
}


var render_options = {
  suppressMarkers: true,
  polylineOptions: {
    strokeColor: "#f37254",
    strokeWeight: 3
  }
};
var directionsDisplay;
var route_directions = function (map, places, el_distance) {


  var directionsService = new google.maps.DirectionsService();


    /**
     * @summary detach all markers from the map
     */

    function markaroute(places) {

      for(var index= 0; index < places.length; index+=1) {
        calcRoute(map, places[index].source, places[index].destination, 'drive');
      }


    }

    function calcRoute(map, source, destination, travel_mode ) {

      var request = {
        origin: new google.maps.LatLng(source.lat, source.lon),
        destination: new google.maps.LatLng(destination.lat, destination.lon),
        travelMode: TDG.map_travel_mode[travel_mode]
      };
      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          directionsDisplay.setMap(map);
          directionsDisplay.setDirections(response);
          var leg = response.routes[0].legs[0];
          $(el_distance).text(leg.distance.text + ' (' + leg.duration.text+')')
        } else {
          $(el_distance).text('(Not found)')
        }
      });
    }
  markaroute(places);

  return directionsService;

}

var init = function() {

  function CustomMarker(latlng, map, title, lat, lon, args) {
    this.latlng = latlng;
    this.lat = lat;
    this.lon = lon;
    this.title = title;
    this.args = args;
    this.setMap(map);
  }

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function() {

    var self = this;

    var div = this.div;

    if (!div) {

      div = this.div = document.createElement('div');

      div.className = 'map-marker';

      div.setAttribute('data-title', this.title);
      div.setAttribute('data-lat', this.lat);
      div.setAttribute('data-lon', this.lon);

      div.style.position = 'absolute';
      div.style.cursor = 'pointer';
      div.style.width = '20px';
      div.style.height = '20px';
      div.innerHTML= this.args.marker;

      if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
      }

      google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(self, "click");
      });

      var panes = this.getPanes();
      panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
      div.style.left = point.x -10 + 'px';
      div.style.top = point.y -20 + 'px';
    }
  };

  CustomMarker.prototype.remove = function() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };

  CustomMarker.prototype.getPosition = function() {
    return this.latlng;
  };

  return CustomMarker;
}


TDG.renderMarker= function(map, markers, doBoundFit) {
  var allMarkers=[], position, marker, bounds = new google.maps.LatLngBounds();

  var headMarker = '<svg width="30px" height="30px" viewBox="0 0 56.693 56.693">' +
      '<g><path fill="#EA423A" d="M6.65491892,32.7071302 C1.84115804,22.8168649 -1.92746609,18.425317 1.09442198,10.9663883 C4.11631005,3.50745968 9.71939004,0.648281084 17.6947944,0.91009766 C25.6701987,1.17191423 31.0287551,5.94940395 33.3170536,11.9241303 C35.6053521,17.8988567 31.2615619,24.8026408 27.6901914,32.7071302 C23.7209778,41.4921632 20.7918617,50.4240213 17.6947951,50.4240213 C14.5977286,50.4240213 11.4686798,42.5973954 6.65491892,32.7071302 Z"/></g>'+
      '<g><path fill="#FCFCFC" d="M10.21970644,16.4743246a7.39014676,7.18455237 0 1,0 14.78029352,0a7.39014676,7.18455237 0 1,0 -14.78029352,0"/></g>'+

      '</svg>';

  var juniorMarker = '<svg width="15px" height="15px" viewBox="0 0 15 15">' +
      '<g><path fill="#EA423A" d="M7.505,1c3.587,0,6.506,2.907,6.506,6.48c0,3.573-2.919,6.48-6.506,6.48C3.918,13.96,1,11.053,1,7.48   C1,3.907,3.918,1,7.505,1 M7.505,0C3.36,0,0,3.348,0,7.48c0,4.134,3.36,7.48,7.505,7.48c4.146,0,7.506-3.346,7.506-7.48   C15.012,3.348,11.651,0,7.505,0L7.505,0z"/></g>'+
      '<ellipse fill-rule="evenodd" clip-rule="evenodd" fill="#EA423A" cx="7.506" cy="7.48" rx="5.454" ry="5.437"/>'+
      '</svg>'


  for(var i = 0; i < markers.length; i+=1 ) {
    if(markers[i].lat && markers[i].lon) {
      position = new google.maps.LatLng(markers[i].lat, markers[i].lon);
      if(markers[i].activity) {
        marker = new TDG.CustomMarker(position, map, markers[i].title, markers[i].lat, markers[i].lon, {marker: juniorMarker});
      } else {
        marker = new TDG.CustomMarker(position, map, markers[i].title, markers[i].lat, markers[i].lon, {marker: headMarker});
      }

      allMarkers.push(marker);


      // Automatically center the map fitting all markers on the screen
      bounds.extend(position);
      doBoundFit && map.fitBounds(bounds);
    }
  }
  return allMarkers;
};

TDG.renderRoutes = function(map, routes, el_distance) {
  return route_directions(map, routes, el_distance);
};

TDG.initializeMap = function(el, mapMarker, options, fitBound, routes, el_distance) {
  var mapCanvas, mapOptions, map, markers;
  var myLatlng = new google.maps.LatLng(mapMarker.lat, mapMarker.lon);

  TDG.CustomMarker = init();

  mapCanvas = document.getElementById(el);
  mapOptions = {
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl : false,
    zoomControl: true,
    zoom : 6
  };
  if(options) {
    $.extend(mapOptions, options);
  }

  map = new google.maps.Map(mapCanvas, mapOptions);

  TDG.map_travel_mode = {
    drive: google.maps.TravelMode.DRIVING
  };
  if(routes) {
     directionsDisplay = new google.maps.DirectionsRenderer(render_options);
    route_directions(map, routes, el_distance);
  }


  return {map : map, markers : TDG.renderMarker(map, mapMarker, fitBound)};
};


TDG.initializeDynamicMap = function($el, mapMarker, options, fitBound, routes, el_distance) {
  var mapCanvas, mapOptions, map, markers;
  var myLatlng = new google.maps.LatLng(mapMarker.lat, mapMarker.lon);

  TDG.CustomMarker = init();

  mapCanvas = $el[0];
  mapOptions = {
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl : false,
    zoomControl: true,
    zoom : 6
  };
  if(options) {
    $.extend(mapOptions, options);
  }

  map = new google.maps.Map(mapCanvas, mapOptions);

  TDG.map_travel_mode = {
    drive: google.maps.TravelMode.DRIVING
  };
  if(routes) {
    directionsDisplay = new google.maps.DirectionsRenderer(render_options);
    route_directions(map, routes, el_distance);
  }


  return {map : map, markers : TDG.renderMarker(map, mapMarker, fitBound)};
};