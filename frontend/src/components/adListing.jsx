import React, { useState, useEffect } from 'react';
import ProductCard from './productCard';import { BACKEND_URL } from '../config';



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
    const validImage = adsImages.find(imageObj => imageObj.image !== null);
    return validImage.image // Return the full image URL or an empty string if no valid image exists
  };

  if (loading) {
    return <div>Loading...</div>; // You can display a loading spinner here
  }

  return (
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-10">All Ads</h2>
      <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
        {products.map((product) => (
          <ProductCard
            key={product.id} // Use id as the key for better performance
            image={product.imageUrl}
            title={product.caption} // Assuming 'caption' is the title of the product
            description={product.details} // Assuming 'details' is the product description
            price={product.price}
            bgColor={product.bgColor} // Apply random background color
            buttonColor={product.buttonColor}
          />
        ))}
      </section>
    </section>
  );
};

export default AdListing;
