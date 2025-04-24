
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      setMessage("✅ Login successful!");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      // You can redirect here if you have routing
      // e.g., navigate("/dashboard")
    } else {
      setMessage("❌ Invalid email or password!");
    }
  };

  const handleSignup = () => {
    // Just mock signup logic: save entered email/password to localStorage
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      setMessage("✅ Signup successful! You can now login.");
    } else {
      setMessage("❌ Enter email and password to sign up.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen font-sans">
      {/* Left Section - Image */}
      <div className="relative hidden md:block">
      <div className="absolute top-24 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white w-full">
          <h1 className="text-2xl font-bold">Find Your Perfect Venue</h1>
          <p className="text-sm">Discover beautiful wedding venues in Hyderabad</p>
        </div>
        <img
          src="/venue1.jpeg"
          alt="Wedding Venue"
          className=" w-full h-screen object-cover"
        />
        
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex gap-6 mb-6 border-b pb-2">
            <button
              onClick={handleLogin}
              className="text-red-600 font-semibold cursor-pointer border-b-2 border-red-600"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="text-gray-400 cursor-pointer hover:text-black"
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                className="w-full border p-2 rounded mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border p-2 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span className="text-red-500 text-sm cursor-pointer">Forgot Password?</span>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
              Login
            </button>

            {message && (
              <div className="text-center text-sm mt-2 text-blue-600">{message}</div>
            )}

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-400 text-sm">Or continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="flex items-center justify-center gap-2 border w-full py-2 rounded">
                <FaGoogle /> Google
              </a>
              <a href="#" className="flex items-center justify-center gap-2 border w-full py-2 rounded">
                <FaFacebookF /> Facebook
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}