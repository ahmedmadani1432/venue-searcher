import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    guests: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Search Submitted!\n" + JSON.stringify(formData, null, 2));
  };

  // Sayeed Testing

  return (
    <div className="font-sans  bg-purple-100 ">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-[#120912]">FindMyHall</h1>
        <nav className="space-x-6 text-gray-700">
          <a href="#" className="hover:text-[#2BA69A]">Home</a>
          <a href="#" className="hover:text-[#2BA69A]">Venues</a>
          <a href="#" className="hover:text-[#2BA69A]">Venue</a>
          <button  className="hover:text-[#d46acf]">3
             <Link to="/dashboard">Dashboard</Link>
              </button>
          <button className="text-[#d46acf]">
            <Link to="/login">  Login </Link></button>
          <button className="bg-[#d46acf] text-white px-4 py-1 rounded">Sign Up</button>
        </nav>
      </header>
      <div>
        <img src="/venue.jpg" alt="Wedding Venue" className="w-full h-96 object-cover" />
      </div>
      {/* Hero Section */}
      {/* bg-[url('/wedding-venue.jpg')] */}
      <section className=" bg-purple-100 bg-cover bg-center text-center text-black py-20">
        <div className="bg-transparent  px-4">
          <h2 className="text-4xl font-bold mb-2">Find the Perfect Function Hall in Hyderabad</h2>
          <p className="text-lg mb-6">Discover and book the most beautiful wedding venues for your special day</p>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md max-w-4xl mx-auto grid md:grid-cols-4 gap-4">
            <select name="location" onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Area</option>
              <option value="Banjara Hills">Banjara Hills</option>
              <option value="Gachibowli">Gachibowli</option>
              <option value="Begumpet">Begumpet</option>
            </select>
            <input type="date" name="date" onChange={handleChange} className="border p-2 rounded" />
            <input
              type="number"
              name="guests"
              onChange={handleChange}
              placeholder="No. of guests"
              className="border p-2 rounded"
            />
            <select name="budget" onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Budget</option>
              <option value="<50k">Below ₹50,000</option>
              <option value="50k-1L">₹50,000 - ₹1,00,000</option>
              <option value=">1L">Above ₹1,00,000</option>
            </select>
            <button type="submit" className="col-span-4 bg-[#e295de] text-white py-2 rounded">
              Search Venues
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 text-center">
        <h3 className="text-2xl font-bold mb-10">Why Choose ShaadiSpaces?</h3>
        <div className="grid md:grid-cols-3 gap-8 px-6">
          <div>
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-semibold mb-1">Verified Venues</h4>
            <p className="text-sm text-gray-600">All our venues are personally verified for quality and authenticity</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Easy Booking</h4>
            <p className="text-sm text-gray-600">Simple and secure booking process with instant confirmation</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⭐</div>
            <h4 className="font-semibold mb-1">Real Reviews</h4>
            <p className="text-sm text-gray-600">Authentic reviews from verified customers to help you decide</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 text-center">
        <h3 className="text-2xl font-bold mb-10">What Our Customers Say</h3>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {[
            {
              name: "Priya Sharma",
              review:
                "Found the perfect venue for my wedding through ShaadiSpaces. The booking process was smooth and the venue was exactly as described!",
            },
            {
              name: "Rahul Verma",
              review:
                "Great platform! Saved us so much time in venue hunting. The virtual tours really helped us make the right choice.",
            },
            {
              name: "Anita Reddy",
              review:
                "Excellent customer service and a wide range of venues to choose from. Would definitely recommend to others!",
            },
          ].map((cust, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <p className="text-sm mb-2">{cust.review}</p>
              <p className="font-semibold">{cust.name}</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-10 px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-2">ShaadiSpaces</h4>
            <p className="text-sm">Making your wedding venue search easier and more enjoyable.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>About Us</li>
              <li>Our Services</li>
              <li>List Your Venue</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">+91 9876543210</p>
            <p className="text-sm">info@shaadispaces.com</p>
            <p className="text-sm">Hyderabad, India</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-3 text-xl">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-10">© 2025 ShaadiSpaces. All rights reserved.</p>
      </footer>
    </div>
  );
}
