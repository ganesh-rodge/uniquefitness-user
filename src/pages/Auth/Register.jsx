import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../api/api";
import { useRegistration } from "../../context/RegistrationContext";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0); // ⬅️ new state for cooldown

  const { updateRegistrationData } = useRegistration();
  const navigate = useNavigate();

  // ⬅️ Effect to decrease cooldown every second
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // --- Handle Send OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.warning("Please enter your email");

    try {
      setLoading(true);
      const res = await sendOtp(email);
      if (res.data.success) {
        toast.info(res.data.message); // you can replace with toast
        setOtpSent(true);
        setCooldown(40); // ⬅️ start cooldown (40 sec)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Verify OTP ---
  const handleContinue = async (e) => {
    e.preventDefault();
    if (!otp) return toast.warning("Please enter OTP");

    try {
      setLoading(true);
      const res = await verifyOtp(email, otp);
      if (res.data.success) {
        const signupToken = res.data.data.signupToken;
        localStorage.setItem("signupToken", signupToken);
        updateRegistrationData({ signupToken });

        toast.info("OTP verified successfully");
        navigate("/details");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A1B] px-4">
      <div className="flex flex-col items-center w-full">
        <img
          src="/logoFull.jpeg"
          alt="Unique Health & Fitness Logo"
          className="w-80 h-80 object-contain mb-6 mx-auto"
          style={{ maxWidth: 320, maxHeight: 320 }}
        />
      </div>
      <form className="bg-[#10151F] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 items-center">
        {/* Email Input */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-white text-base font-semibold" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#374151] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        {/* Send OTP */}
        <button
          className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendOtp}
          disabled={loading || cooldown > 0}
        >
          {loading
            ? "Sending..."
            : cooldown > 0
            ? `Resend OTP in ${cooldown}s`
            : "Send OTP"}
        </button>

        {/* OTP Field - only show after OTP is sent */}
        {otpSent && (
          <>
            <div className="w-full flex flex-col gap-2">
              <label className="text-white text-base font-semibold" htmlFor="otp">
                OTP (6-digit)
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="bg-[#374151] text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <button
              className="bg-[#EAB308] text-black font-bold rounded-md py-2 w-full transition hover:bg-yellow-400"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Continue"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
