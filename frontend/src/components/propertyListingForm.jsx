import React, { useState } from 'react';
import { Calendar, Camera, ChevronRight } from 'lucide-react';
import { DatePicker } from 'antd';

const PropertyListingForm = () => {
  const [selectedDates, setSelectedDates] = useState({
    start: 'Sat, Mar 1',
    end: 'Sat, Mar 15'
  });
  
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow relative">
      {/* Close Button (X) */}
      <div className="absolute top-4 right-4 text-lg font-medium cursor-pointer">
        X
      </div>
      
      <form className="space-y-6 pt-6">
        {/* Category and Sub Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">CATEGORY</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select category</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">SUB CATEGORY</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select sub category</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">TITLE</label>
          <input 
            type="text" 
            placeholder="Eg. Appartment for Rent"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2" 
          />
        </div>

        {/* Property Type */}
        <div className="flex flex-wrap gap-4">
          {['FOR RENT', 'FOR LEASE', 'FOR SALE'].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input type="radio" name="propertyType" className="rounded-full" />
              <span className="text-sm text-orange-500">{type}</span>
            </label>
          ))}
          
          <label className="flex items-center space-x-2">
            <span className="text-sm text-orange-500">BHK</span>
            <input 
              type="text" 
              placeholder="Eg. 2 BHK" 
              className="rounded-md border border-gray-300 p-2 w-24" 
            />
          </label>
          
          <label className="flex items-center space-x-2">
            <span className="text-sm text-orange-500">BATHROOM</span>
            <input 
              type="text" 
              placeholder="Eg. 2" 
              className="rounded-md border border-gray-300 p-2 w-24" 
            />
          </label>
        </div>
        
        {/* Floor and Parking */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <span className="text-sm text-orange-500">FLOOR NO.</span>
            <input 
              type="text" 
              placeholder="Eg. 6th Floor" 
              className="rounded-md border border-gray-300 p-2 w-32" 
            />
          </label>
          
          <label className="flex items-center space-x-2">
            <span className="text-sm text-orange-500">CAR PARKING</span>
            <input 
              type="text" 
              placeholder="Eg. Yes - 1" 
              className="rounded-md border border-gray-300 p-2 w-32" 
            />
          </label>
        </div>

        {/* Price Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-6">
            {['PER DAY', 'PER MONTH', 'PER YEAR'].map((period) => (
              <label key={period} className="flex items-center space-x-2">
                <input type="radio" name="pricePeriod" className="rounded-full" />
                <span className="text-sm">{period}</span>
              </label>
            ))}
            <div className="ml-auto">
              <span className="text-sm font-medium">SQ.FT/SQ.MTR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">PRICE</label>
              <input 
                type="text" 
                placeholder="Eg. 30,000"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2" 
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Eg. 30 X 40 MTR.SQ. / 1,500 SQ.FT."
                className="mt-1 block w-full rounded-md border border-gray-300 p-2" 
              />
            </div>
          </div>
        </div>

        {/* Advance Payment and Landmark */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ADVANCE PAYMENT</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">LANDMARK IF ANY</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
        </div>

        {/* Property Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">PROPERTY DESCRIPTION</label>
          <textarea rows={4} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">COUNTRY</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select country</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">STATE</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>Select state</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">DISTRICT / CITY</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E MAIL</label>
            <input type="email" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">MOBILE</label>
            <input type="tel" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
        </div>

        {/* Photo Upload Section */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center space-y-2">
                <Camera className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500">Add Photo</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">(JPEG/JPG &lt; 200 Kb.)</p>
        </div>

        {/* Featured Ad Section */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm font-medium">FEATURED AD</span>
          </label>
          <div className="pl-6 text-sm text-gray-600 space-y-1">
            <p>Featured ADs appear on <span className="font-medium">Home</span> Page for better reach</p>
            <p>&gt; Reach up to 5X more</p>
            <p>&gt; Sell 2X faster</p>
          </div>
        </div>

        {/* Date Selection */}
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
        <div className="flex justify-center">
          <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center">
            <span className="mr-2">●</span> POST NOW
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyListingForm;