import { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AdCreateModal from "./adCreateModal";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null); // Optional: store the username

  // Check authentication on initial load
  useEffect(
    () => {
      const checkAuthStatus = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/isloggedin/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(data?.loggedIn);
            setUsername(data?.username);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      };

      checkAuthStatus();
    },
    [],
    [isAuthenticated]
  );

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    } else {
      toggleModal();
    }
  };
  const handleLogOut = async () => {
    try {
      // Make the logout request to the backend
      const response = await fetch(`${BACKEND_URL}/api/logout/`, {
        method: "POST", // assuming a GET request for logout
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token if needed
        },
      });

      if (response.ok) {
        // On successful logout, clear tokens and update the state
        localStorage.removeItem("accessToken");
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Expire the refresh token cookie
        toast.success("Logged out successfully!");
        setIsAuthenticated(false);
        window.location.reload(); // Optionally redirect to home page or sign-in page
      } else {
        // Handle errors from the server
        const data = await response.json();
        toast.error(data?.message || "Logout failed, please try again");
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <header className="flex flex-row items-center justify-between mx-10 p-2 bg-white ">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-72 h-18 mx-auto" />
          </Link>
        </div>

        <nav className="hidden sm:flex justify-between items-center gap-4 mt-5">
          <Link to="/" className="hover:text-gray-500 text-black self-center">
            HOME
          </Link>
          <button
            type="button"
            className="text-white bg-[#f32525] hover:bg-red-400 focus:ring-4 focus:outline-none focus:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            onClick={handleButtonClick}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            ADD LISTING
          </button>
          {!isAuthenticated && (
            <div className="items-center justify-center">
              <div className="">
                <Link to="/sign-in" className="flex text-gray-500">
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
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  Sign In
                </Link>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <div className="relative w-max mx-auto mr-4">
              <button
                type="button"
                id="dropdownToggle"
                className="  border-gray-200 flex items-center rounded-full text-[#333] text-sm  outline-none "
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5 mr-3"
                  viewBox="0 0 512 512"
                >
                  <path d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z" />
                </svg>
                
              </button>

              <ul
                id="dropdownMenu"
                className={`absolute w-72 flex flex-col mt-1 h-72 -ml-60 shadow-lg z-[9999] bg-[rgb(249,247,245)] py-2 min-w-full rounded-lg max-h-96 overflow-auto ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={handleClick}
                  className="py-2.5 px-5 self-end w-16 h-10 hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                >
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                  <img
                    src="https://readymadeui.com/profile_6.webp"
                    className="w-7 h-7 mr-3 rounded-full shrink-0"
                    alt="Profile"
                  />
                  Fayiz
                </li>
                <hr className="w-4/5 mx-auto my-2 border-t border-gray-300" />
                <Link to="/user-profile">
                  <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#717171] text-sm cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 28"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    View profile
                  </li>
                </Link>
                <hr className="w-4/5 mx-auto my-2 border-t border-gray-300" />

                <li
                  className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#717171] text-sm cursor-pointer"
                  onClick={handleLogOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 28 28"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Modal Component */}
      {showModal && (
        <AdCreateModal
          showModal={showModal}
          setShowModal={setShowModal} // Pass the setter function to close the modal
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Header;
