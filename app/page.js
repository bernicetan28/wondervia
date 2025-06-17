"use client";
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CategoryList from '../components/Home/CategoryList';
import RangeSelect from '../components/Home/RangeSelect';
import SelectRating from '../components/Home/SelectRating';
import GoogleMapView from '../components/Home/GoogleMapView';
import BusinessList from '../components/Home/BusinessList';
import SkeletonLoading from '../components/Home/SkeletonLoading';
import GlobalApi from '../Shared/GlobalApi';
import { UserLocationContext } from '../context/UserLocationContext';

export default function Home() {
  const { data: session } = useSession();
  const [category, setCategory] = useState('Chinese restaurant');
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState([1, 2, 3, 4, 5]);

  const [nextToken, setNextToken] = useState(null);
  const [prevPages, setPrevPages] = useState([]);
  const [currentToken, setCurrentToken] = useState("");

  const router = useRouter();
  const { userLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng && category) {
      loadPlaces();
    }
  }, [userLocation, category, radius, selectedRatings]);

  const loadPlaces = (token = "") => {
    setLoading(true);
    GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng, token)
      .then(resp => {
        const data = resp.data.product;
        let results = data?.results || [];

        if (selectedRatings.length > 0) {
          results = results.filter(
            b => b.rating && selectedRatings.includes(Math.floor(b.rating))

          );
        }

        setBusinessList(results);
        setNextToken(data?.next_page_token || null);
        setCurrentToken(token);
        setLoading(false);
      });
  };


  const handleNext = () => {
    if (nextToken) {
      setPrevPages((prev) => [...prev, currentToken]);
      setTimeout(() => loadPlaces(nextToken), 2000);
    }
  };

  const handlePrev = () => {
    if (prevPages.length > 0) {
      const newPrev = [...prevPages];
      const lastToken = newPrev.pop();
      setPrevPages(newPrev);
      loadPlaces(lastToken);
    }
  };

  return (
    <div className='grid grid-cols-9'>
      <div className='col-span-3 px-3 pt-3'>
        {!loading ? (
          <>
            <div className='flex justify-between mb-3'>
              <h2 className='text-s'>📍 Places Nearby <span className='text-sm text-gray-500'>(showing {businessList.length} places)</span></h2>
              <button
                onClick={handlePrev}
                disabled={prevPages.length === 0}
                className='text-[15px] px-2 py-1 bg-gray-300 rounded disabled:opacity-50'
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!nextToken}
                className='text-[15px] px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50'
              >
                Next
              </button>
            </div>
            <BusinessList businessList={businessList} />
          </>
        ) : (
          <div className='flex flex-col gap-3'>
            {[1, 2, 3, 4, 5, 6].map(item => (
              <SkeletonLoading key={item} />
            ))}
          </div>
        )}
      </div>

      <div className='col-span-6 bg-yellow-20'>
        <GoogleMapView businessList={businessList} />
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        {/* <RangeSelect onRadiusChange={(value) => setRadius(value)} /> */}
        <SelectRating selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} />
      </div>
    </div>
  );
}
