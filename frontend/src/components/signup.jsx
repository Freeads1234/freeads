import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { AuthContext } from "../utils/AuthContext";
import bg from "../assets/images/signUpBg.jpg";
import logo from "../assets/images/logo.png";

function Signup({}) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);
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
    setOtpSent(true);
    if (!mobile) {
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
    setVerified(true);

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
    <div className="min-h-screen w-full bg-white">
      {/* Logo */}
     
      <div className="absolute top-0 left-0 text-start px-8 py-3 z-10">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-56 h-18 mx-auto" />
        </Link>
      </div>

      {/* Main Section */}
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Left Side Background */}
        <div className="relative w-full bg-white md:w-1/2 h-[400px] md:h-screen">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              backgroundSize: "contain",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm md:ml-28">
            <form>
              {/* Username Input */}
              {/* <div className="mb-4">
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
                disabled={otpSent} // Disable username input once OTP is sent
              />
            </div> */}

              {/* <div className="mb-4 relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="w-full h-12 bg-transparent border-2 border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] text-black rounded-lg px-4 focus:outline-none focus:ring-0"
                disabled={otpSent} // Disable email input once OTP is sent
              />

              // Validation Icons 
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

              {email && !validateEmail(email) && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-100">
                  Please enter a valid email address.
                </div>
              )}
            </div> */}

              {/* Mobile Input */}

              {!otpSent && (
                <div className="mb-4">
                  <PhoneInput
                    id="mobile"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={setMobile}
                    defaultCountry="IN"
                    className="custom-phone-input w-full md:w-2/3 h-12 bg-transparent border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] rounded-lg px-4 focus:outline-none"
                    international
                  />
                </div>
              )}

              {/* Password Input */}
              {verified && (
                <div className="mb-4 relative group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-phone-input w-full md:w-2/3 h-12 bg-transparent border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] rounded-lg px-4 focus:outline-none"
                    disabled={otpSent} // Disable password input once OTP is sent
                  />

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

                  {!isPasswordValid && password && (
                    <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Password must be at least 8 characters, contain one number
                      and one uppercase letter.
                    </div>
                  )}
                </div>
              )}
              {verified && (
                <div className="mb-4 relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="custom-phone-input w-full md:w-2/3 h-12 bg-transparent border-[rgb(121,121,121)] placeholder-[rgb(121,121,121)] rounded-lg px-4 focus:outline-none"
                    disabled={otpSent} // Disable confirm password input once OTP is sent
                  />

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

                  {!isPasswordMatch && confirmPassword && (
                    <div className="absolute left-0 bottom-full mb-2 w-full bg-red-500 text-white text-xs rounded py-1 px-2 opacity-100">
                      Passwords do not match.
                    </div>
                  )}
                </div>
              )}

              {/* OTP Section */}
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className={
                    "w-full md:w-2/3 h-12 bg-[rgb(11,31,157)] hover:bg-blue-600 text-white font-semibold rounded-3xl focus:outline-none"
                  }
                >
                  &gt;
                </button>
              )}

              {otpSent && !verified && (
                <>
                  {/* OTP Input */}
                  <div className="mb-4 flex space-x-2 justify-center md:-ml-28 lg:-ml-32">
                    <input
                      type="text"
                      maxLength="1"
                      value={otp[0]}
                      onChange={(e) => {
                        setOtp(otp.slice(0, 0) + e.target.value + otp.slice(1));
                        if (e.target.value) {
                          document.getElementById("otp-input-1").focus(); // Focus next input
                        }
                      }}
                      placeholder="•"
                      className="w-3/12 md:w-10 h-12 text-center border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                      id="otp-input-0"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otp[1]}
                      onChange={(e) => {
                        setOtp(otp.slice(0, 1) + e.target.value + otp.slice(2));
                        if (e.target.value) {
                          document.getElementById("otp-input-2").focus(); // Focus next input
                        }
                      }}
                      placeholder="•"
                      className="w-3/12 md:w-12 h-12 text-center border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                      id="otp-input-1"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otp[2]}
                      onChange={(e) => {
                        setOtp(otp.slice(0, 2) + e.target.value + otp.slice(3));
                        if (e.target.value) {
                          document.getElementById("otp-input-3").focus(); // Focus next input
                        }
                      }}
                      placeholder="•"
                      className="w-3/12 md:w-12 h-12 text-center border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                      id="otp-input-2"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otp[3]}
                      onChange={(e) => setOtp(otp.slice(0, 3) + e.target.value)}
                      placeholder="•"
                      className="w-3/12 md:w-12 h-12 text-center border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                      id="otp-input-3"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className={
                      "w-full md:w-9/12 md:-ml-4 lg:-ml-0 lg:w-2/3 h-12 bg-[rgb(11,31,157)] hover:bg-blue-600 text-white font-semibold rounded-3xl focus:outline-none"
                    }
                  >
                    &gt;
                  </button>
                </>
              )}
              {verified && (
                <button
                  type="button"
                  //onClick={handleVerifyOtp}
                  className={
                    "w-full md:w-2/3 h-12 bg-[rgb(11,31,157)] hover:bg-blue-600 text-white font-semibold rounded-3xl focus:outline-none"
                  }
                >
                  Sign up
                </button>
              )}
            </form>
            <div className="text-center md:w-2/3  my-4">
              <Link
                to="/sign-in"
                className="text-[rgb(33,88,192)] font-medium hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
