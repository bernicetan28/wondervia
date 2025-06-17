import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from '../../context/UserLocationContext';

function Restaurant({ business, isMapPopup = false, showDir = false }) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const photo_ref = business?.photos ? business?.photos[0]?.photo_reference : '';
  let wrapperClass = 'flex border border-gray-300 rounded-md shadow-sm bg-white p-3 ';

  if (isMapPopup) {
    wrapperClass += 'flex-col items-center w-fit max-w-[400px] ml-0 ';
  } else {
  }

  const [distance, setDistance] = useState();
  const { userLocation } = useContext(UserLocationContext);

  const onDirectionClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.geometry.location.lat},${business.geometry.location.lng}&travelmode=driving`
    );
  }

  useEffect(() => {
    calculateDistance(
      business.geometry.location.lat,
      business.geometry.location.lng,
      userLocation.lat,
      userLocation.lng
    );
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const earthRadius = 6371;
    const degToRad = (deg) => deg * (Math.PI / 180);
    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    setDistance(distance.toFixed(2));
  }

  return (
    <div className={wrapperClass}>
      <Image
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`}
        priority
        alt={business.name}
        width={210}
        height={120}
        className={`rounded-md object-cover  ${isMapPopup ? 'w-[220px] h-[120px]' : 'w-[190px] h-[140px]'}`}
      />

      <div className={`${isMapPopup ? 'mt-2' : 'ml-4'} flex flex-col justify-between flex-1 min-h-[120px]`}>
        <div>
          <h2 className="text-[15px] font-bold mb-1 break-words">{business.name}</h2>
          <h2 className="text-[13px] text-gray-500 break-words whitespace-normal">{business.formatted_address}</h2>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-yellow-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
          <h2 className="text-[13px] font-semibold">{business.rating}</h2>
        </div>

        {showDir && (
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-center text-sm">
              <span>Distance: {distance} km</span>
              <button
                onClick={onDirectionClick}
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full px-2 py-1 text-xs"
              >
                Get Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurant;
