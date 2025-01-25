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
          <div className="font-thin">
            :{isExpanded ? description : truncatedDescription}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <a className="text-sm text-gray-500">supra@gmail.com</a>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <a className="text-sm text-gray-500">+917337488290</a>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center">
            <span class="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#128c7e]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </span>

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
