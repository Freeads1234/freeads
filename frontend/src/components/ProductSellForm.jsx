import React, { useState } from 'react';
import { DatePicker } from 'antd';

const ProductSellForm = () => {
  const [selectedDates, setSelectedDates] = useState({
    start: '2025-03-01',
    end: '2025-03-15'
  });
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Calendar highlighting logic
  const isSelectedDate = (month, day) => {
    const startDay = 1;
    const endDay = 15;
    
    if (month === 'March') {
      return day >= startDay && day <= endDay;
    }
    return false;
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-end mb-2">
        <button className="text-gray-500 font-bold">X</button>
      </div>
      
      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs uppercase font-semibold mb-1">Category</label>
          <select className="w-full border rounded p-2">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase font-semibold mb-1">Sub Category</label>
          <select className="w-full border rounded p-2">
            <option>Select</option>
          </select>
        </div>
      </div>
      
      {/* Title */}
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">Title</label>
        <input 
          type="text" 
          placeholder="Eg. HP Laptop for sale" 
          className="w-full border rounded p-2"
        />
      </div>
      
      {/* Product Condition & Year */}
      <div className="flex flex-wrap mb-4">
        <div className="mr-8">
          <label className="inline-flex items-center">
            <input type="radio" name="condition" className="form-radio" />
            <span className="ml-2 text-sm">BRAND NEW</span>
          </label>
        </div>
        <div className="mr-8">
          <label className="inline-flex items-center">
            <input type="radio" name="condition" className="form-radio" />
            <span className="ml-2 text-sm">USED</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="inline-flex items-center mr-2">
            <input type="radio" name="condition" className="form-radio" />
            <span className="ml-2 text-sm">YEAR OF MAKE</span>
          </label>
          <input 
            type="text" 
            placeholder="Eg. 2015" 
            className="border rounded p-1 w-24 text-sm"
          />
        </div>
      </div>
      
      {/* Price */}
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">Price</label>
        <input 
          type="text" 
          placeholder="Eg. 30,000" 
          className="w-full border rounded p-2"
        />
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">Product Description</label>
        <textarea 
          className="w-full border rounded p-2 h-24" 
        />
      </div>
      
      {/* Location */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs uppercase font-semibold mb-1">Country</label>
          <select className="w-full border rounded p-2">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase font-semibold mb-1">State</label>
          <select className="w-full border rounded p-2">
            <option>Select</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">District / City</label>
        <input 
          type="text" 
          className="w-full border rounded p-2"
        />
      </div>
      
      {/* Contact Information */}
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">E-mail</label>
        <input 
          type="email" 
          className="w-full border rounded p-2"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-xs uppercase font-semibold mb-1">Mobile</label>
        <input 
          type="tel" 
          className="w-full border rounded p-2"
        />
      </div>
      
      {/* Photo Upload */}
      <div className="mb-4">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="border rounded p-2 flex items-center justify-center h-20">
              <div className="text-center">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-xs">Add Photo</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1">(JPEG/JPG  200 Kb.)</div>
      </div>
      
      {/* Featured Ad */}
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox" />
          <span className="ml-2 font-semibold">FEATURED AD</span>
        </label>
        <div className="pl-6 text-sm text-gray-600">
          <div>Featured ADs appear on Home Page for better reach</div>
          <div> Reach up to 5X more</div>
          <div> Sell 2X faster</div>
        </div>
      </div>
      
      
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">SELECT AD DURATION</div>
        {/* <div className="flex items-center mb-2">
          <span className="text-sm">{selectedDates.start} — {selectedDates.end}</span>
        </div> */}

        <div className="w-full h-1 bg-blue-500 mb-4"></div>

        {/* Date Picker */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-center font-medium mb-2">Start Date</div>
            <DatePicker
              //value={selectedDates.start}
              //onChange={handleStartDateChange}
              className="w-full"
            />
          </div>

          <div>
            <div className="text-center font-medium mb-2">End Date</div>
            <DatePicker
              //value={selectedDates.end}
              //onChange={handleEndDateChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md uppercase font-semibold">
          Post Now
        </button>
      </div>
    </div>
  );
};

export default ProductSellForm;