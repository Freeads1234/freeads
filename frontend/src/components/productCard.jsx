import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ProductCard = ({ image, title, description, price, buttonColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription =
    description.length > 10 ? description.slice(0, 10) + "..." : description;

  return (
    <section className="flex bg-white mb-3 shadow-md hover:shadow-lg transform duration-500 hover:-translate-y-2 cursor-pointer border-2 h-auto">
      {/* Image container */}
      <div className="w-1/4 h-full self-center border-r-2 overflow-hidden flex justify-center items-center p-2">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="w-3/4 pl-6 flex flex-col justify-between mb-3">
        {/* Job Details */}
        <div className="mt-2 text-sm grid grid-cols-3 gap-x-4">
          {/* Job Role */}
          <div className="font-semibold col-span-1">Job Role</div>
          <div className="font-thin col-span-2">: {title}</div>

          {/* Company Name */}
          <div className="font-semibold col-span-1">Company Name</div>
          <div className="font-thin col-span-2">: EY Technologies</div>

          {/* Salary */}
          <div className="font-semibold col-span-1">Salary</div>
          <div className="font-thin col-span-2">: 200k</div>

          {/* Salary Range */}
          <div className="font-semibold col-span-1">Salary Range</div>
          <div className="font-thin col-span-2">: 20k-220k</div>

          {/* Experience */}
          <div className="font-semibold col-span-1">Experience</div>
          <div className="font-thin col-span-2">: 2+ years</div>

          {/* Job Description */}
          <div className="font-semibold">Job Description</div>
          <div className="font-thin">: 
            {isExpanded ? description : truncatedDescription}
            {description.length > 10 && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleDescription}
              >
                {isExpanded ? " Read Less" : " Read More"}
              </span>
            )}
          </div>
          <br />
          <div className="font-semibold col-span-1">Location</div>
          <div className="font-thin col-span-2">: Kerala, India</div>
        </div>

        {/* Contact Information */}
        <div className="flex space-x-4 mt-5">
          {/* Email */}
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />

            <a className="text-sm text-gray-500">supra@gmail.com</a>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faPhoneAlt}
              className="mr-2 text-green-600"
            />
            <a className="text-sm text-gray-500">+917337488290</a>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="mr-2 text-green-500"
            />

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
