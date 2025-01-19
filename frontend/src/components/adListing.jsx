import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";

const AdListing = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ads/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data in the featured list", data);

        // Map the data to the required format and ensure we capture 'isFeatured'
        const fetchedListings = data.map((item) => ({
          id: item.id, // Make sure to add id for tracking key
          imageUrl: item.ads_images[0]?.image,
          category: item.category,
          details: item.details,
          price: item.cost,
          country: item.Country,
          contact: item.contact_details,
          state: item.State,
          caption: item.caption,
          isFeatured: item.isFeatured, // Assuming 'isFeatured' is part of the data
          bgColor: getRandomBgColor(), // Randomly assign one of the background colors
          buttonColor: "bg-blue-500", // You can choose another random color if needed
        }));

        console.log("fetchedListings", fetchedListings);
        setProducts(fetchedListings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Function to randomly select a background color
  const getRandomBgColor = () => {
    const bgColors = ["bg-purple-50", "bg-green-50", "bg-red-50"];
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  const getValidImage = (adsImages) => {
    // Find the first image that is not null
    const validImage = adsImages.find((imageObj) => imageObj.image !== null);
    return validImage.image; // Return the full image URL or an empty string if no valid image exists
  };
  const handleFilter=()=>{
    console.log("changeing")
  }

  if (loading) {
    return <div>Loading...</div>; // You can display a loading spinner here
  }

  return (
    <div className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">
        All Ads
      </h2>

      <div className="mb-5">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <form className="" onChange={handleFilter}>
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <svg
                  className="absolute left-2 block h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
                <input
                  type="name"
                  name="search"
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by name, type, manufacturer, etc"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-stone-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Raspberry juice"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-stone-600"
                  >
                    Category
                  </label>

                  <select
                    id="manufacturer"
                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Cadberry</option>
                    <option>Starbucks</option>
                    <option>Hilti</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-stone-600"
                  >
                    Date of Entry
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="subCategory"
                    className="text-sm font-medium text-stone-600"
                  >
                    Sub Category
                  </label>

                  <select
                    id="subCategory"
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Dispached Out</option>
                    <option>In Warehouse</option>
                    <option>Being Brought In</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">
                  Reset
                </button>
                <button className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
        {products.map((product) => (
          <Link to={`/ad/${product.id}`} key={product.id}>
          <ProductCard
            image={product.imageUrl}
            key={product.id} 
            title={product.caption}
            description={product.details}
            price={product.price}
            bgColor={product.bgColor}
            buttonColor={product.buttonColor}
          />
        </Link>
        ))}
      </div>




<div className="flex justify-between mt-6">
  <a href="#" className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-600  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 ">
    Previous
  </a>

  <a href="#" className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-white bg-blue-600  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
    Next
  </a>
</div>

    </div>
  );
};

export default AdListing;
