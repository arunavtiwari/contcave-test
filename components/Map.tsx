"use client";

import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import Flag from "react-world-flags";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  center?: number[];
  locationValue?: string;
};

function Map({ center, locationValue }: Props) {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [20.5937, 78.9629]}
      zoom={center ? 10 : 4}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {center && (
        <Marker position={center as L.LatLngExpression}>
          {locationValue && (
            <Popup>
              <div className="flex justify-center items-center animate-bounce">
                <Flag code={locationValue} className="w-10" />
              </div>
            </Popup>
          )}
        </Marker>
      )}
    </MapContainer>

  );
}

export default Map;
