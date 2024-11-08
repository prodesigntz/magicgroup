// components/ItineraryStaticMap.js
import React, { useRef, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import polyline from "@mapbox/polyline";
import "mapbox-gl/dist/mapbox-gl.css";
import html2canvas from "html2canvas";

const ItineraryStaticMap = ({ destinations, onMapCapture }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const mapRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const captureMap = async () => {
    if (mapRef.current) {
      const canvas = await html2canvas(mapRef.current.getContainer());
      const imgData = canvas.toDataURL("image/png");

      // You can now pass imgData as a base64-encoded image to the PDF generation endpoint

      setImageData(imgData);
      return imgData;
    }
  };

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

  const handleCaptureImg = async () => {
    const imgUrl = await captureMap();

    onMapCapture(imgUrl);
  };

  // Prepare coordinates for markers
  const markers = destinations
    .map(
      (dest, index) =>
        `pin-l-${index + 1}+285A98(${dest.longitude},${dest.latitude})`
    )
    .join(",");

  // Extract latitudes and longitudes for encoding
  const pathCoordinates = destinations.map((dest) => [
    dest.latitude,
    dest.longitude,
  ]);

  // Encode the coordinates to a polyline string
  const encodedPolyline = polyline.encode(pathCoordinates);

  // Concatenate path styling information with the encoded polyline
  const polylinePath = `path-5+285A98-1(${encodedPolyline})`;

  // Generate the Mapbox Static Image API URL with markers and polyline path
  const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${markers},${polylinePath}/auto/800x600?access_token=${mapboxToken}`;

  //   const mapUrl =
  //     "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-122.4241,37.78,14.25,0,60/600x600?access_token=pk.eyJ1IjoicHJvZGVzaWdudHoiLCJhIjoiY20zMm9hN3h0MHRmZzJpcjZ4YzNnaXFtdiJ9.t-LnIfyAmJVnrKsKvjZKcQ";

  return (
    <p>aos</p>
    // <>
    //   {mapUrl && (
    //     <div>
    //       <h3>Map Preview</h3>
    //       <img src={mapUrl} alt="Itinerary Map" />
    //     </div>
    //   )}

    //   {imageData && (
    //     <div className="image-preview">
    //       <h3>Map Preview:</h3>
    //       <img src={imageData} alt="Captured Map Preview" />
    //     </div>
    //   )}

    //   <div className="text-center my-7">
    //     <button
    //       onClick={handleCaptureImg}
    //       type="button"
    //       className="rounded bg-protertiary text-white"
    //     >
    //       capture img
    //     </button>
    //   </div>
    // </>
  );
};

export default ItineraryStaticMap;
