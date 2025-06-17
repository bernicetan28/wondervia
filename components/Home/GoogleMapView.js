"use client";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../../context/UserLocationContext';
import Markers from './Markers';
import { SelectedRestaurantContext } from '../../context/SelectedRestaurantContext';

function GoogleMapView({ businessList }) {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const containerStyle = {
    width: '100%',
    height: '70vh'
  }
  const { selectedRestaurant, setSelectedRestaurant } = useContext(SelectedRestaurantContext)

  const coordinate = { lat: -34.395, lng: 150.422 }
  const is_valid_location = userLocation &&
    typeof userLocation.lat === 'number' &&
    typeof userLocation.lng === 'number' &&
    isFinite(userLocation.lat) &&
    isFinite(userLocation.lng);
  const [map, setMap] = useState();
  useEffect(() => {
    if (map && selectedRestaurant?.geometry?.location) {
      const location = selectedRestaurant.geometry.location;

      // Center the map first
      map.panTo(location);

      // Then shift the view upwards by some pixels (positive Y moves the map down, so the marker appears higher)
      map.panBy(0, 100); // Adjust 100 as needed
    }
  }, [map, selectedRestaurant?.geometry?.location?.lat, selectedRestaurant?.geometry?.location?.lng]);


  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      >
        {is_valid_location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              selectedRestaurant.name
                ? {
                  lat: selectedRestaurant.geometry.location.lat, // shift down slightly
                  lng: selectedRestaurant.geometry.location.lng
                }
                : userLocation
            }
            zoom={13}
          >
            <MarkerF
              position={userLocation}
              icon={{
                url: '/location_pin.png',
                scaledSize: {
                  width: 50,
                  height: 50
                }
              }}
            />
            {businessList.map((item, index) => index <= 50 && (
              <Markers business={item} key={index} />
            ))}
          </GoogleMap>
        )}

      </LoadScript>
    </div>
  )
}

export default GoogleMapView
