import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { AuthContext } from "../utils/AuthContext";
import bg from "../assets/images/bg.jpg";
import logo from "../assets/images/logo.png";

function Signup({}) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    // Basic email validation using regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);
  console.log("isAuthenticated and login", isAuthenticated, login);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const validatePassword = () => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordPattern.test(password));
    setIsPasswordMatch(password === confirmPassword);
  };

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isPasswordValid || !isPasswordMatch || !mobile || !name) {
      toast.error("Please ensure all fields are filled correctly.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/sendotp/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent successfully.");
      } else {
        const data = await response.json();
        toast.error(data?.message[0] || "OTP send failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          email,
          password,
          otp,
        }),
      });

      if (response.ok) {
        toast.success("Signed up successfully");
        navigate("/sign-in");
      } else {
        const data = await response.json();
        toast.error(
          data?.message[0] || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
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
        <img src={logo} alt="Logo" className="w-50 h-18 mx-auto" />
      </div>
      <div className="w-full max-w-sm bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign up</h1>

        <form>
          {/* Username Input */}
          <div className="mb-4">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={otpSent} // Disable username input once OTP is sent
            />
          </div>

          <div className="mb-4">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={otpSent} // Disable email input once OTP is sent
            />
            {/* Display error message if email is invalid */}
            {!validateEmail(email) && email !== "" && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Mobile Input */}
          <div className="mb-4">
            <PhoneInput
              id="mobile"
              placeholder="Enter phone number"
              value={mobile}
              onChange={setMobile}
              defaultCountry="IN"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              international
              disabled={otpSent} // Disable phone input once OTP is sent
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={otpSent} // Disable password input once OTP is sent
            />
            {!isPasswordValid && password && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters, contain one number and
                one uppercase letter.
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={otpSent} // Disable confirm password input once OTP is sent
            />
            {!isPasswordMatch && confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* OTP Section */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className={`w-full h-12 ${
                isPasswordValid && isPasswordMatch && mobile && name
                  ? "bg-blue-500"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white rounded-lg hover:bg-blue-600 focus:outline-none mb-4`}
              disabled={
                !isPasswordValid || !isPasswordMatch || !mobile || !name
              } // Disable button if password is invalid, not matching, phone is empty or username is empty
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              {/* OTP Input */}
              <div className="mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mb-4"
              >
                Verify OTP
              </button>
            </>
          )}
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-4">
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
      <ToastContainer />
      <div 
        className="absolute -right-3   flex flex-col justify-center items-center text-start font-thin"
        style={{
          padding: '2rem',
          marginRight: '2rem',
          borderRadius: '8px',
          maxWidth: '700px',
        }}
      >
        <p className="text-5xl">
          <b className='font-bold'>Advertise </b>your
          <br />
          <span className="text-5xl ">Brand, Product & Service</span>
          <br />
          to reach millions
          <br />
          <span className="text-5xl font-bold"><b>absolutely</b></span> for   <span className="text-5xl font-bold">free</span> 
        </p>
      </div>
    </div>
  );
}

export default Signup;
