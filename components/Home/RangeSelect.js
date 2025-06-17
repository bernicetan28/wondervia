import React, { useState } from 'react';

function RangeSelect({ onRadiusChange }) {
  const [radius, setRadius] = useState(50);

  return (
    <div className="font-bold px-2 mt-5">
      <h2>Select Radius (Meter)</h2>
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        min="0"
        max="100"
        step="10"
        onChange={(e) => {
          setRadius(e.target.value);
          onRadiusChange(e.target.value);
        }}
        defaultValue={radius}
      />
      <label>{radius} in Meter</label>
    </div>
  );
}

export default RangeSelect;
