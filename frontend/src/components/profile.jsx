import React, { useContext, useState } from "react";
import Banner from "./banner";
import Header from "./header";
import bannerImage from "../assets/images/banner.jpg";
import { BACKEND_URL } from "../config";
import { AuthContext } from "../utils/AuthContext";
const UserProfile = () => {
  const { userdata } = useContext(AuthContext);

  const [image, setImage] = useState(null);

  const handleFileChange = async (e) => {
    const accessToken = localStorage.getItem("accessToken");

    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      try {
        const formData = new FormData();
        formData.append("profile_pic", file);

        const response = await fetch(`${BACKEND_URL}/api/update-profile-pic/`, {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const data = await response.json();
        console.log("Upload success:", data);

        // Handle success (e.g., update UI or show a message)
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="relative">
      {/* Banner */}
      <Header />
      <div className="w-full h-48 bg-gray-300 bg-cover bg-center">
        <Banner imageUrl={bannerImage} />
      </div>

      {/* Profile Container */}
      <div className="relative bg-white mx-auto -mt-24 p-6 rounded-lg shadow-lg z-50 w-2/3">
        <div className="flex justify-start items-center w-full relative">
          {/* Image Preview */}
          <div
            className="w-36 h-36 absolute left-7 top-10 bg-gray-100 border-2 border-dashed border-black rounded-lg flex items-center justify-center relative"
            style={{ display: userdata?.profile_pic ? "block" : "none" }}
          >
            <img
              id="image-preview"
              src={userdata?.profile_pic}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <div>
            <label
            htmlFor="upload-photo"
          >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="absolute top-0 right-0 m-2 w-6 h-6 text-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
            </div>
            
          </div>

          {!userdata?.profile_pic &&
          <div className="absolute top-10 left-[100px] transform -translate-x-1/2">
          <label
            htmlFor="upload-photo"
            className="flex flex-col items-center justify-center w-36 h-36 bg-gray-100 border-2 border-black rounded-lg shadow-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
             Add Photo
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
          }
          
        </div>

        {/* Form */}
        <div className="ml-8">
          <form className="mt-48 ">
            <div className="mb-4 ">
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="first-name"
                value={userdata?.name}
                disabled
                className="mt-1 block w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* <div className="mb-4">
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
            </div> */}

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
                value={userdata?.mobile}
                disabled
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
                disabled
                value={userdata?.email}
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
