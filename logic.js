<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="UTF-8">
    <title>Income Choropleth</title>

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.3/dist/leaflet.css"
    integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
    crossorigin=""/>

    <!-- Our CSS -->
    <link rel="stylesheet" type="text/css" href="static/css/style.css">

  </head>
  <body>

    <!-- The div where we will inject our map -->
    <div id="mapid"></div>


    <!-- Leaflet JS-->
    <script src="https://unpkg.com/leaflet@1.3.3/dist/leaflet.js"
    integrity="sha512-tAGcCfR4Sc5ZP5ZoVz0quoZDYX5aCtEm/eu1KhSLj2c9eFrylXZknQYmxUssFaVJKvvc0dJQixhGjG2yXWiV9Q=="
    crossorigin=""></script>
    <!-- d3 JavaScript -->
    <script src="https://d3js.org/d3.v4.min.js"></script>

    <!-- Leaflet-Choropleth JavaScript -->
    <script type="text/javascript" src="static/js/choropleth.js"></script>

    <!-- Our JS -->
    <script type="text/javascript" src="static/js/config.js"></script>
    <script type="text/javascript" src="static/js/logic.js"></script>

  </body>
</html>
