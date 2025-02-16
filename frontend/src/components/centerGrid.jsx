import React, { useState, useEffect } from "react";
import CatagoryIcon from "../assets/images/category.jpg";
import ShimmerGrid from "./shimmerGrid";
import { BACKEND_URL } from "../config";

const CenteredGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/categories/`)
      .then((response) => response.json())
      .then((data) => {
        const categories = data.slice(0, 12).map((item) => ({
          name: item.name,
        }));
        setItems(categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ShimmerGrid />;
  }

  return (
    <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] w-full px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-screen-xl mx-auto">
        {/* Main container with responsive width */}
        <div className="w-full lg:w-2/3 mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Grid Container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-gray-50"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3 relative">
                  <img
                    src={CatagoryIcon}
                    alt={`${item.name} icon`}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Category Name */}
                <p className="text-sm sm:text-base text-gray-700 text-center font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredGrid;