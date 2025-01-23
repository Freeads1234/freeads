import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css"; // Importing styles for the PhoneInput component
import PhoneInput from "react-phone-number-input";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../utils/AuthContext";
import bg from "../assets/images/bg.jpg";
import logo from "../assets/images/logo.png";
import '../assets/css/phone.css';

function Signin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const isFormValid = () => {
    return mobile && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token } = data;

        // Store tokens securely (accessToken in localStorage and refreshToken in HttpOnly cookies)
        localStorage.setItem("accessToken", access_token);
        document.cookie = `refreshToken=${refresh_token}; path=/; HttpOnly; secure`; // Secure cookie for refresh token

        // Redirect to homepage (or desired page after login)
        toast.success("Login successful!");
        window.location.reload(); // Use navigate from react-router for redirection
      } else {
        const data = await response.json();
        toast.error(data?.message[0] || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen absolute w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-0 left-0 text-start px-8 py-3">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-72 h-18 mx-auto" />
        </Link>{" "}
      </div>

      <div className="p-3 w-full max-w-xs rounded-md ">
        {/* <h1 className="text-xl font-bold text-center mb-6">Sign In</h1> */}

        <form onSubmit={handleSubmit} method="POST">
          {/* Mobile Input */}
          <div className="mb-4">
  <PhoneInput
    id="mobile"
    placeholder="Mobile"
    value={mobile}
    onChange={setMobile}
    defaultCountry="IN"
    className="custom-phone-input w-full h-12 bg-transparent border rounded-lg px-4 focus:outline-none"
    international
  />
</div>


          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-transparent h-12 border-2 border-gray-400 text-gray-300  rounded-lg px-4 "
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-between items-left mb-6">
            

            <div>
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="text-center font-bold">
              <a
                href="/admin"
                className="text-blue-500 text-sm hover:underline"
              >
               Admin
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none ${
              loading ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 ">
          <p className="text-sm flex justify-between">
            New to FreeADS?{" "}
            <Link
              to="/sign-up"
              className="text-blue-500 hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
        
      </div>


      <ToastContainer />
      <div
        className="absolute -right-16  flex flex-col justify-center items-center text-start font-thin"
        style={{
          padding: "2rem",
          marginRight: "2rem",
          borderRadius: "8px",
          maxWidth: "700px",
        }}
      >
        <p className="text-5xl leading-normal">
          <b className="font-bold">Advertise </b>your
          <br />
          <span className="text-5xl ">Brand, Product & Service</span>
          <br />
          to reach millions
          <br />
          <span className="text-5xl font-bold">
            <b>absolutely</b>
          </span>{" "}
          for <span className="text-5xl font-bold">free</span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
