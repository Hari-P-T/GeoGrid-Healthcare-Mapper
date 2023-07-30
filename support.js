
    var map;
    var polygon;
    var gridMarkers = [];
    var placeMarkers = [];
    var coordinates = [];
    var placeType = ''; // Variable to store user-selected place type

    // Sample place data. Replace this with actual data from a database.
    var places = [
  { name: "Hospital 1", lat: 37.7752, lng: -122.4187, type: "Hospital" },
  { name: "Hospital 2", lat: 37.7735, lng: -122.4222, type: "Hospital" },
  // Add more places here...
];

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 37.7749, lng: -122.4194 }
      });

      polygon = new google.maps.Polygon({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        editable: true
      });

      polygon.setMap(map);

      // Add a listener for the click event
      google.maps.event.addListener(map, 'click', addLatLng);

      // Add a listener for the 'bounds_changed' event of the polygon
      google.maps.event.addListener(polygon, 'bounds_changed', indicatePlaces);
      
      // Add a listener for vertex_changed event
      google.maps.event.addListener(polygon.getPath(), 'set_at', displayGrids);
      google.maps.event.addListener(polygon.getPath(), 'insert_at', displayGrids);
      google.maps.event.addListener(polygon.getPath(), 'remove_at', displayGrids);
    }

    function addLatLng(event) {
      polygon.getPath().push(event.latLng);
      displayGrids();
      updateInfoWindow();
    }

    function displayGrids() {
      // Clear any existing grid markers
      for (var i = 0; i < gridMarkers.length; i++) {
        gridMarkers[i].setMap(null);
      }
      gridMarkers = [];

      var coordinates = polygon.getPath().getArray();
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0; i < coordinates.length; i++) {
        bounds.extend(coordinates[i]);
      }

      var northEast = bounds.getNorthEast();
      var southWest = bounds.getSouthWest();

      var latStep = (northEast.lat() - southWest.lat()) / 10;
      var lngStep = (northEast.lng() - southWest.lng()) / 10;

      for (var i = southWest.lat(); i < northEast.lat(); i += latStep) {
        for (var j = southWest.lng(); j < northEast.lng(); j += lngStep) {
          var rectangle = new google.maps.Rectangle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            bounds: {
              north: i,
              south: i + latStep,
              east: j + lngStep,
              west: j
            }
          });

          gridMarkers.push(rectangle);
        }
      }
    }

    function updateInfoWindow() {
      coordinates = polygon.getPath().getArray();
      var content = 'Latitude and Longitude of Four Points:<br>';
      for (var i = 0; i < coordinates.length; i++) {
        content += (i + 1) + '. ' + coordinates[i].lat() + ', ' + coordinates[i].lng() + '<br>';
      }
      document.getElementById("coordinateList").innerHTML = content;
    }

    function indicatePlaces() {
      // Clear any existing place markers
      for (var i = 0; i < placeMarkers.length; i++) {
        placeMarkers[i].setMap(null);
      }
      placeMarkers = [];

      // Get the selected place type from the user input (e.g., dropdown list)
      placeType = document.getElementById("placeType").value;

      // Loop through the places data and count the hospitals within the marked polygon
      var count = 0;
      for (var i = 0; i < places.length; i++) {
        var placeLatLng = new google.maps.LatLng(places[i].lat, places[i].lng);

        if (google.maps.geometry.poly.containsLocation(placeLatLng, polygon) && places[i].type === placeType) {
          count++;
          var marker = new google.maps.Marker({
            position: placeLatLng,
            map: map,
            title: places[i].name
          });
          placeMarkers.push(marker);
        }
      }

      // Display the count of hospitals within the polygon
      document.getElementById("hospitalCount").innerHTML = "Hospitals within the polygon: " + count;
    }
  
