import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { BACKEND_URL } from "../config";
import { Link } from "react-router-dom";
import Header from "./header";

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

  const getValidImage = (adsImages) => {
    // Find the first image that is not null
    const validImage = adsImages.find((imageObj) => imageObj.image !== null);
    return validImage.image; // Return the full image URL or an empty string if no valid image exists
  };
  const handleFilter = () => {
    console.log("changeing");
  };

  if (loading) {
    return <div>Loading...</div>; // You can display a loading spinner here
  }

  return (
    <>
      <Header />
      <div className="mx-36">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">
          All Ads
        </h2>

        <div className="grid grid-cols-1 gap-2">
          {products.map((product) => (
            // <Link to={`/ad/${product.id}`} key={product.id}>
              <ProductCard
                image={product.imageUrl}
                key={product.id}
                title={product.caption}
                description={product.details}
                price={product.price}
                buttonColor={product.buttonColor}
              />
            // </Link>
          ))}
        </div>
{/* 
        <div className="flex justify-between mt-6">
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-600  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </a>

          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-white bg-blue-600  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </a>
        </div> */}
      </div>
    </>
  );
};

export default AdListing;
