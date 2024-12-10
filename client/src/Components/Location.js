// frontend/src/App.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";

const socket = io("http://localhost:5000");
const mapContainerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 0, lng: 0 };

function Location() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB7EOwK6NMmiPXlHUAThIjfDbCxXq_A6c", // Replace with your Google Maps API Key
  });

  const [userLocation, setUserLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState({});
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.watchPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ lat: latitude, lng: longitude });
        socket.emit("update-location", { lat: latitude, lng: longitude });
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );

    socket.on("location-updated", (locations) => {
      setOtherLocations(locations);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (userLocation && Object.values(otherLocations).length > 0) {
      const directionsService = new window.google.maps.DirectionsService();
      const otherLocation = Object.values(otherLocations)[0];
      directionsService.route(
        {
          origin: userLocation,
          destination: otherLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          }
        }
      );
    }
  }, [userLocation, otherLocations]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={userLocation || center}>
      {userLocation && <Marker position={userLocation} label="You" />}
      {Object.values(otherLocations).map((loc, index) => (
        <Marker key={index} position={loc} label={`Device ${index + 1}`} />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default Location;
