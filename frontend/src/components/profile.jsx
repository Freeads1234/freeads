import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Banner from "./banner";
import Header from "./header";
import bannerImage from "../assets/images/banner.jpg";

const UserProfile = () => {
  return (
    <div className="relative">
      {/* Banner */}
      <Header />
      <div className="w-full h-48 bg-gray-300 bg-cover bg-center">
        <Banner imageUrl={bannerImage} />
      </div>

      {/* Profile Container */}
      <div className="relative bg-white mx-auto -mt-24 p-6 rounded-lg shadow-lg z-50 w-2/3">
        {/* Profile Photo */}
        <div className="absolute top-12 left-32 transform -translate-x-1/2">
          <label
            htmlFor="upload-photo"
            className="flex flex-col items-center justify-center w-36 h-36  bg-gray-100 border-2 border-black rounded-lg shadow-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            Add Photo

            <input
              type="file"
              id="upload-photo"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        {/* Form */}
        <div className="ml-8">
        <form className="mt-48 ">
          <div className="mb-4 ">
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-gray-700"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
