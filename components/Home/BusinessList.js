import React, { useContext } from 'react';
import BusinessItem from './Restaurant';
import { SelectedRestaurantContext } from '../../context/SelectedRestaurantContext';

function BusinessList({ businessList }) {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(SelectedRestaurantContext);

  return (
    <div className="h-screen overflow-y-auto px-2 bg-white">
      <div className="flex flex-col gap-4">
        {businessList.map((item, index) => (
          <div key={index} onClick={() => setSelectedRestaurant(item)} className="cursor-pointer">
            <BusinessItem business={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessList;
