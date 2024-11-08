import React, { useEffect, useState } from "react";
import polyline from "@mapbox/polyline";
import "mapbox-gl/dist/mapbox-gl.css";
import html2canvas from "html2canvas";

const ItineraryStaticMap = ({ destinations, onMapCapture }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const [boundaries, setBoundaries] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  // Function to calculate boundaries with a buffer
  const calculateMapBoundaries = (destinations, bufferRatio = 0.15) => {
    const latitudes = destinations.map((dest) => dest.latitude);
    const longitudes = destinations.map((dest) => dest.longitude);

    const latMin = Math.min(...latitudes);
    const latMax = Math.max(...latitudes);
    const lngMin = Math.min(...longitudes);
    const lngMax = Math.max(...longitudes);

    // Calculate the buffer based on the range of latitudes and longitudes
    const latBuffer = (latMax - latMin) * bufferRatio;
    const lngBuffer = (lngMax - lngMin) * bufferRatio;

    return {
      latRange: { min: latMin - latBuffer, max: latMax + latBuffer },
      lngRange: { min: lngMin - lngBuffer, max: lngMax + lngBuffer },
    };
  };

  useEffect(() => {
    if (destinations.length) {
      // Calculate map boundaries with buffer
      const bounds = calculateMapBoundaries(destinations);
      setBoundaries(bounds);

      // Generate markers for destinations
      const markers = destinations
        .map(
          (dest, index) =>
            `pin-s-${index + 1}+285A98(${dest.longitude},${dest.latitude})`
        )
        .join(",");

      // Generate polyline path between destinations
      const pathCoordinates = destinations.map((dest) => [
        dest.latitude,
        dest.longitude,
      ]);
      const encodedPolyline = polyline.encode(pathCoordinates);
      const polylinePath = `path-2+285A98-1(${encodedPolyline})`;

      // Generate the Mapbox Static Image API URL with markers and polyline path
      const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${markers},${polylinePath}/[${bounds.lngRange.min},${bounds.latRange.min},${bounds.lngRange.max},${bounds.latRange.max}]/800x600?access_token=${mapboxToken}`;

      setMapUrl(url);
    }
  }, [destinations, mapboxToken]);

  const handleSaveMapAsImage = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mapElement = document.getElementById("map-container");
      const canvas = await html2canvas(mapElement);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "map.png";
      link.click();
      onMapCapture(mapUrl);

      // ... handle imageDataUrl as before
    } catch (error) {
      console.error("Error capturing map:", error);
    }
  };

  return (
    <>
      {mapUrl && (
        <div id="map-container">
          <div
            style={{ position: "relative", width: "800px", height: "600px" }}
          >
            <img
              src={mapUrl}
              alt="Itinerary Map"
              style={{ width: "100%", height: "100%" }}
            />
            {/* Overlay labels for each destination */}
            {destinations.map((dest, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${
                    ((dest.longitude - boundaries.lngRange.min) /
                      (boundaries.lngRange.max - boundaries.lngRange.min)) *
                    100
                  }%`,
                  top: `${
                    ((boundaries.latRange.max - dest.latitude) /
                      (boundaries.latRange.max - boundaries.latRange.min)) *
                    100
                  }%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  padding: "2px 5px",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                {dest.day}: {dest.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center my-7">
        <button
          onClick={handleSaveMapAsImage}
          type="button"
          className="rounded bg-protertiary text-white px-4 py-2"
        >
          Capture Map Image
        </button>
      </div>
    </>
  );
};

export default ItineraryStaticMap;
