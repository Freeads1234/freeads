import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker } from 'antd';

const JobPostingForm = () => {
  // const [selectedDates, setSelectedDates] = useState({
  //   start: '2025-03-01',
  //   end: '2025-03-15'
  // });

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <form className="space-y-6">
        {/* Top Grid Section */}
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

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">JOB ROLE</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>

        {/* Job Type Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {['FULL TIME', 'PART TIME', 'WORKING FROM HOME', 'CONTRACT'].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input type="radio" name="jobType" className="rounded-full" />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {['YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY'].map((period) => (
              <label key={period} className="flex items-center space-x-2">
                <input type="radio" name="salaryPeriod" className="rounded-full" />
                <span className="text-sm">{period}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">SALARY RANGE</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>30,000 - 50,000</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">EXPERIENCE</label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option>2 - 5 Years</option>
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">JOB DESCRIPTION</label>
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
          <label className="block text-sm font-medium text-gray-700">CITY / DISTRICT</label>
          <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>

        {/* Company Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">COMPANY NAME</label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">WEB PAGE</label>
            <input type="url" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">E MAIL</label>
            <input type="email" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">MOBILE</label>
            <input type="tel" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
        </div>

        {/* Featured Ad Section */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm font-medium">FEATURED AD</span>
          </label>
          <div className="pl-6 text-sm text-gray-600 space-y-1">
            <p>• Featured ADs appear on home page for better reach</p>
            <p>• Reach up to 5X more</p>
            <p>• Sell 2X faster</p>
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
        <div>
          <button type="submit" className="w-full md:w-auto px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            POST NOW
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;