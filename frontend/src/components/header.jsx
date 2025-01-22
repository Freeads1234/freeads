import { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AdCreateModal from "./adCreateModal";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      <header className="flex flex-row items-center justify-between mx-10 p-2 bg-white sticky">
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
          {isAuthenticated && (
            <Link to="/user-profile">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
          )}
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogOut}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
            >
              Log Out
            </button>
          )}

          {!isAuthenticated && (
            <div className="items-center justify-center">
              <div className="">
                <Link to="/sign-in" className="flex">
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
