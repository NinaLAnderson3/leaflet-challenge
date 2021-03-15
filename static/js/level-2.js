
// Store API link
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var techtonicUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"




function circleSize(mag) {
  return mag * 40000;
}

function circleColor(){
  var location = L.geoJSON(earthquakeData)
  console.log(location)
}

function circleColor(mag) {
  if (mag <= 1) {
      return "white";
  } else if (mag <= 2) {
      return "green";
  } else if (mag <= 3) {
      return "yellow";
  } else if (mag <= 4) {
      return "orange";
  } else if (mag <= 5) {
      return "red"
  } else {
      return "magenta";
  };
}

function depthColor(depth){
  if (depth <10) {
    return .1
  }
  else if (depth < 20){
    return .3
  }
  else if (depth < 40){
    return 0.5
  }
  else if (depth < 60){
    return 0.7
  }
  else if (depth < 100){
    return 0.8
  }
  else {
    return 1
  }
}


function createMap(earthquakes) {

  // Define satelitemap and light map layers
  var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satelite Map": satelitemap,
    "Light Map": light
  };

  // create layers
  var techPlates = new L.layerGroup();
  var NewEarthquakes = new L.layerGroup();

  console.log(techPlates);
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    TechtonicPlates: techPlates
  };

  // Create our map, giving it the satelitemap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [40.7128, -74.0060],
    zoom: 3,
    layers: [satelitemap, light]
  });
  satelitemap.addTo(myMap);
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
earthquakes.addTo(NewEarthquakes)
NewEarthquakes.addTo(myMap)

    //perform a GET request to te github tectonic URL
    d3.json(techtonicUrl, function(techtonic){
        L.geoJSON(techtonic, {
            color: "blue",
            weight: 2.5
        }).addTo(techPlates);
  
    });

} //end of create map function

// Perform a GET request to the USGS URL
d3.json(url, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  
function createFeatures(earthquakeData) {
  console.log(earthquakeData);
  var earthquakes = L.geoJSON(earthquakeData, {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
   onEachFeature : function (feature, layer) {
  
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: circleSize(feature.properties.mag),
          fillColor: circleColor(feature.properties.mag),
          fillOpacity: depthColor(feature.geometry.coordinates[2]),
          stroke: false
      })
    }
    });
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }

