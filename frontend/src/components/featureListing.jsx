import React, { useState, useEffect, useRef } from "react";
import ShimmerFeature from "./shimmerFeature";
import { BACKEND_URL } from "../config";
import ListingCard from "./listingCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ads/`)
      .then((response) => response.json())
      .then((data) => {
        const featuredListings = data
          .filter((item) => item.is_featured === false)
          .map((item) => ({
            image: item.ads_images[0]?.image,
            category: item.category_name,
            details: item.details,
            price: item.cost,
            country: item.country_name,
            contact: item.contact_details,
            state: item.state_name,
            caption: item.caption,
            isFeatured: item.is_featured,
          }));

        setListings(featuredListings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Check scroll buttons visibility
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, [listings]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return <ShimmerFeature />;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
        <h2 className="text-lg sm:text-xl font-normal tracking-widest text-gray-500 mb-2 sm:mb-0">
          FEATURED &gt; LISTINGS
        </h2>
        <a
          href="/all-ad"
          className="text-blue-500 text-sm flex items-center hover:underline"
        >
        </a>
      </div>

      {/* Listings Section with Scroll Controls */}
      <div className="relative">
        {/* Left Scroll Button */}
        {showLeftScroll && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 -ml-4"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {/* Right Scroll Button */}
        {showRightScroll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 -mr-4"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 sm:gap-6 min-w-min">
            {listings.map((listing, index) => (
              <div key={index} className="w-[280px] sm:w-[300px] flex-shrink-0">
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional: Scroll Indicator Dots */}
      {listings.length > 4 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(listings.length / 4) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Add these styles to your CSS to hide scrollbar
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

export default FeaturedListings;