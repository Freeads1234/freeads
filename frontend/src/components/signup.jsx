import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { AuthContext } from "../utils/AuthContext";
import bg from "../assets/images/bg_signup.jpg";
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
        <Link to="/">
          <img src={logo} alt="Logo" className="w-72 h-18 mx-auto" />
        </Link>{" "}
      </div>
      <div className="p-3 w-full max-w-xs rounded-md -mt-6">
        {/* <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1> */}

        <form>
          {/* Username Input */}
          <div className="mb-4">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
              disabled={otpSent} // Disable username input once OTP is sent
            />
          </div>

          <div className="mb-4 relative">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
              disabled={otpSent} // Disable email input once OTP is sent
            />

            {/* Validation Icons */}
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {email && !validateEmail(email) ? (
                // Red cross icon when email is invalid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="red"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : email && validateEmail(email) ? (
                // Green tick icon when email is valid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : null}
            </span>

            {/* Tooltip: Invalid Email Message */}
            {email && !validateEmail(email) && (
              <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-100">
                Please enter a valid email address.
              </div>
            )}
          </div>

          {/* Mobile Input */}

          <div className="mb-4">
            <PhoneInput
              id="mobile"
              placeholder="Mobile"
              value={mobile}
              onChange={setMobile}
              defaultCountry="IN"
              className="custom-phone-input w-full h-12 bg-transparent border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)]  rounded-lg px-4 focus:outline-none"
              international
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
              disabled={otpSent} // Disable password input once OTP is sent
            />

            {/* Validation Icons */}
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {password &&
                (isPasswordValid ? (
                  // Green check (tick) icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="green"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ) : (
                  // Red cross icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="red"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ))}
            </span>

            {/* Tooltip: Password Validation Message */}
            {!isPasswordValid && password && (
              <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Password must be at least 8 characters, contain one number and
                one uppercase letter.
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
              disabled={otpSent} // Disable confirm password input once OTP is sent
            />

            {/* Validation Icons */}
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {confirmPassword &&
                (isPasswordMatch ? (
                  // Green check (tick) icon when passwords match
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="green"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ) : (
                  // Red cross icon when passwords do not match
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="red"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ))}
            </span>

            {/* Tooltip: Passwords Do Not Match */}
            {!isPasswordMatch && confirmPassword && (
              <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-100">
                Passwords do not match.
              </div>
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
                  : "bg-[rgb(11,31,157)] cursor-not-allowed"
              } text-white rounded-3xl hover:bg-blue-600 focus:outline-none mb-4`}
              disabled={
                !isPasswordValid || !isPasswordMatch || !mobile || !name
              } // Disable button if password is invalid, not matching, phone is empty or username is empty
            >
              Sign Up
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
        <div className="text-right mb-4">
          <Link to="/sign-in" className="text-[rgb(33,88,192)] font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
      <ToastContainer />
      {/* <div
        className="absolute -right-16 flex flex-col justify-center items-center text-start font-thin"
        style={{
          padding: "2rem",
          marginRight: "2rem",
          borderRadius: "8px",
          maxWidth: "700px",
        }}
      >
        <p className="text-5xl">
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
      </div> */}
    </div>
  );
}

export default Signup;
