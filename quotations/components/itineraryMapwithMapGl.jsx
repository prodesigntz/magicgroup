// components/ItineraryMap.js
import React, { useRef } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { toPng } from "html-to-image";
import html2canvas from "html2canvas";
import "mapbox-gl/dist/mapbox-gl.css";

const ItineraryMap = ({ destinations, onMapCapture }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const mapRef = useRef(null);

  // Coordinates and labels for the destinations
  const geojson = {
    type: "FeatureCollection",
    features: destinations.map((dest, index) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [dest.longitude, dest.latitude],
      },
      properties: {
        title: dest.name,
        day: `Day ${index + 1}`,
      },
    })),
  };

  // Lines between each destination in the itinerary
  const lineCoordinates = destinations.map((dest) => [
    dest.longitude,
    dest.latitude,
  ]);

  const lineData = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: lineCoordinates,
    },
  };

  const handleSaveMapAsImage = async () => {
    const mapElement = document.getElementById("map-container"); 
    const canvas = await html2canvas(mapElement);
    const imageDataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "map.png";
    link.click();
    onMapCapture(link);
  };

  // HTML TO IMAGE...........................................................
  // const handleSaveMapAsImage = () => {
  //   const mapContainer = document.getElementById("map-container");
  //   toPng(mapContainer)
  //     .then((dataUrl) => {
  //       const link = document.createElement("a");
  //       link.href = dataUrl;
  //       link.download = "itinerary-map.png";
  //       link.click();

  //       onMapCapture(link);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to capture map image:", err);
  //     });
  // };

  return (
    <>
      <div id="map-container">
        <Map
          initialViewState={{
            latitude: destinations[0].latitude,
            longitude: destinations[0].longitude,
            zoom: 5,
          }}
          style={{ width: "100%", height: 600 }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxToken}
          ref={mapRef}
        >
          {geojson.features.map((feature, index) => (
            <Marker
              key={index}
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
            >
              <div className="marker-label">
                {feature.properties.day}: {feature.properties.title}
              </div>
            </Marker>
          ))}

          <Source id="line-source" type="geojson" data={lineData}>
            <Layer
              id="line-layer"
              type="line"
              paint={{
                "line-color": "#3b82f6",
                "line-width": 4,
              }}
            />
          </Source>
        </Map>
      </div>

      <button
        onClick={handleSaveMapAsImage}
        className="text-red-700 text-lg text-center rounded-md p-3"
      >
        capture map
      </button>
    </>
  );
};

export default ItineraryMap;
