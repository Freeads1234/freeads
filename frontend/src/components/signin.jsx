import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../utils/AuthContext";
import bg from "../assets/images/signInBg.jpg";
import logo from "../assets/images/logo.png";
import "../assets/css/phone.css";

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
        localStorage.setItem("accessToken", access_token);
        document.cookie = `refreshToken=${refresh_token}; path=/; HttpOnly; secure`;
        toast.success("Login successful!");
        window.location.reload();
      } else {
        const data = await response.json();
        toast.error(data?.message[0] || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Logo */}
      <div className="absolute top-0 left-0 w-full p-4 z-10">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 h-auto" />
        </Link>
      </div>

      {/* Main Section */}
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Left Side Background */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-screen">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative h-full flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h1 className="text-3xl md:text-4xl font-light leading-tight">
                <span className="font-bold">Advertise</span> your
                <br />
                Brand, Product & Service
                <br />
                to reach millions
                <br />
                <span className="font-bold">absolutely</span> for{" "}
                <span className="font-bold">free</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm md:ml-28">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <PhoneInput
                  placeholder="Mobile"
                  value={mobile}
                  onChange={setMobile}
                  defaultCountry="IN"
                  className="custom-phone-input w-full md:w-2/3 h-12 bg-transparent border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] rounded-lg px-4 focus:outline-none"
                  international
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  className=" h-12 bg-transparent w-full md:w-2/3 border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-2 sm:space-y-0">
                <a
                  href="#"
                  className="text-[rgb(33,88,192)] text-sm font-semibold hover:underline"
                >
                  Forgot password?
                </a>
                <a
                  href="/admin"
                  className="text-[rgb(33,88,192)] md:w-6/12 text-sm font-bold hover:underline"
                >
                  Admin
                </a>
              </div>

              <button
                type="submit"
                className={`w-full md:w-2/3 h-12 bg-[rgb(11,31,157)] hover:bg-blue-600 text-white font-semibold rounded-3xl focus:outline-none ${
                  loading ? "bg-gray-500 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign in"}
              </button>

              <div className="mt-6 text-center sm:text-left">
                <p className="text-sm text-[rgb(121,121,121)] flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-2 sm:space-y-0">
                  New to FreeADS?{" "}
                  <Link
                    to="/sign-up"
                    className="text-[rgb(54,92,172)] md:w-7/12  hover:underline ml-2"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signin;
