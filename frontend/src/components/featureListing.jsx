import React, { useState, useEffect } from "react";
import ShimmerFeature from "./shimmerFeature";
import { BACKEND_URL } from "../config";
import ListingCard from "./listingCard";

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ads/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data in the featured list:", data);

        // Filter only non-featured listings and select the last 4
        const featuredListings = data
          .filter((item) => item.is_featured === false) // Filter non-featured items
          .slice(-4) // Get the last 4 non-featured listings
          .map((item) => ({
            image: item.ads_images[0]?.image, // Use actual image URL or fallback to placeholder
            category: item.category_name,
            details: item.details,
            price: item.cost,
            country: item.country_name,
            contact: item.contact_details,
            state: item.state_name,
            caption: item.caption,
            isFeatured: item.is_featured, // Assuming the API gives `is_featured` directly
          }));
        console.log("featured list:", featuredListings);

        setListings(featuredListings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getValidImage = (adsImages) => {
    // Find the first image that is not null
    const validImage = adsImages.find(
      (imageObj) => imageObj !== null && imageObj.url !== null
    );
    return validImage ? validImage.url : "/path/to/placeholder/image.jpg"; // Return a placeholder image if no valid image is found
  };

  if (loading) {
    return <ShimmerFeature />;
  }

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col p-6">
      {/* Heading */}
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-xl font-normal tracking-widest text-gray-500 text-center mb-0">
          FEATURED &gt; LISTINGS
        </h2>
      </div>
      <a
        href="/all-ad"
        className="text-blue-500 text-sm flex items-center justify-end hover:underline pb-3"
      >
        <span>View All</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
      {/* Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {listings.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
