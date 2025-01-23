import React from "react";

const Banner = ({ imageUrl }) => {
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] z-10">
      {/* Banner Image */}
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Banner;
