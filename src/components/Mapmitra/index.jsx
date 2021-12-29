import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const mapboxToken =
  "pk.eyJ1Ijoicml6YWxtb2hhbWFkIiwiYSI6ImNrd3VyMmxkYzF0NGwycHFvdXNod3hyd3AifQ.RO6Ly-imFs4zMLRJgrOoOA";

export default function Mapmitra() {
  const [viewPort, setViewPort] = React.useState({
    width: "w-auto",
    height: "400px",
    latitude: -6.895842571735898,
    longitude: 109.04089772305696,
    zoom: 5,
  });
  const mapRef = React.useRef();
  const handleViewportChange = React.useCallback(
    (newViewport) => setViewPort(newViewport),
    []
  );

  const handleGeocoderViewportChange = React.useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );
  return (
    <div>
      <div className="relative w-full rounded-xl shadow-lg">
        <ReactMapGl
          ref={mapRef}
          onClick={(feature) => console.log("Coords:", feature.lngLat)}
          {...viewPort}
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={(nextViewport) => setViewPort(nextViewport)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker latitude={-6.895842571735898} longitude={109.04089772305696}>
            <img
              className="w-10 h-10"
              src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1616838931/Group_54_2_qzvqx7.png"
              alt=""
            />
          </Marker>
          <Marker latitude={-6.895271} longitude={109.040957}>
            <img
              className="w-10 h-10"
              src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1616838931/Group_54_2_qzvqx7.png"
              alt=""
            />
          </Marker>
          <Marker latitude={-6.8947222933369465} longitude={109.04161388134409}>
            <img
              className="w-10 h-10"
              src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1616838931/Group_54_2_qzvqx7.png"
              alt=""
            />
          </Marker>
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={mapboxToken}
            position="top-right"
            placeholder="Search here!"
            countries="id"
          />
        </ReactMapGl>
      </div>
    </div>
  );
}
