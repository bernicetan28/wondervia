import React, { useEffect, useState } from 'react';
import Data from './../../Shared/Data';
import Image from 'next/image';

function CategoryList({ onCategoryChange }) {
    const [categoryList, setCategoryList] = useState(Data.CategoryListData);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Set default category after data is loaded
        const defaultIndex = categoryList.findIndex(c => c.name === 'Chinese');
        if (defaultIndex !== -1) {
            setSelectedCategory(defaultIndex);
            if (onCategoryChange) {
                onCategoryChange(categoryList[defaultIndex].value);
            }
        }
    }, [categoryList]);

    const handleCategoryClick = (item, index) => {
        setSelectedCategory(index);
        if (onCategoryChange) {
            onCategoryChange(item.value);
        }
    };

    return (
        <div className="p-2 pt-3">
            <h2 className="font-bold">Select Type of Food</h2>
            <div className="flex flex-row gap-4 overflow-x-auto pt-2">
                {categoryList.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => handleCategoryClick(item, index)}
                        className={`flex-shrink-0 w-[60px] sm:w-[70px] md:w-[100px] aspect-square 
              flex flex-col justify-center items-center rounded-md border 
              ${selectedCategory === index ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-transparent'} 
              hover:border-purple-300 hover:bg-gray-50 transition cursor-pointer`}
                    >
                        <Image src={item.icon} alt={item.name} width={50} height={50} />
                        <span className="text-sm text-center mt-1">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
