import React from "react";

const Banner = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="relative w-full h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
      {/* Banner Background */}
      <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay for better text visibility */}
      
      {/* Banner Image */}
      <img
        src={imageUrl}
        alt={title || "Banner"}
        className="w-full h-full object-cover"
        loading="eager"
      />

      {/* Optional Content Container */}
      {/* {(title || subtitle) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          {title && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-2 sm:mb-4">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-center max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )} */}

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default Banner;