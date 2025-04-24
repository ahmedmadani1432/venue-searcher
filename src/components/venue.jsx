import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaHeart, FaCheckCircle, FaEnvelope, FaPhone, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const VenueDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Enquiry sent successfully!');
    setFormData({ name: '', email: '', phone: '', date: '', message: '' });
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-purple-700">VenueBook</h1>
        <div className="flex gap-4 text-sm">
          <button className="hover:underline">Saved</button>
          <button className="hover:underline">Account</button>
        </div>
      </header>

      {/* Banner Image */}
     
      {/* <div className='h-80 bg-cover bg-center' style ={{backgroundImage: 'url()'}}></div> */}
      <div className='bg-[url("/venue.jpg")] bg-cover bg-center h-80'>
       
      </div>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Royal Grand Convention</h2>
            <p className="flex items-center text-gray-500 mt-1">
              <FaMapMarkerAlt className="mr-1" /> Jubilee Hills, Hyderabad
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-green-600 font-semibold flex items-center">
                <FaCheckCircle className="mr-1" /> Available
              </span>
              <span>500-1000 guests</span>
              <span>₹ 1,50,000/day
              </span>
              <button
                onClick={toggleSave}
                className="ml-auto flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
              >
                <FaHeart className="mr-1" /> {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* About */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-1">About this Venue</h3>
              <p className="text-gray-700 text-sm">
                Royal Grand Convention is a luxurious wedding venue located in the heart of Jubilee Hills. With its grand architecture, state-of-the-art facilities, and impeccable service, it’s perfect for hosting memorable celebrations. The venue features multiple halls, outdoor spaces, and dedicated areas for various wedding functions.
              </p>
            </section>

            {/* Amenities */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                <span>Air Conditioning</span>
                <span>Valet Parking</span>
                <span>In-house Catering</span>
                <span>DJ Allowed</span>
                <span>Changing Rooms</span>
                <span>Security</span>
              </div>
            </section>

            {/* Gallery */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-300 h-28 rounded"></div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="bg-gray-300 h-48 flex items-center justify-center rounded">
                <FaMapMarkerAlt className="text-3xl text-gray-500" />
              </div>
            </section>
          </div>

          {/* Right section - Enquiry Form */}
          <div className="w-full lg:w-1/3 bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold mb-4">Make an Enquiry</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded p-2"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded p-2"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="border rounded p-2"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>

        {/* Back to Listings */}
        <div className="mt-6">
          <button className="text-purple-600 hover:underline">&larr; Back to Listings</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 px-6 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">VenueBook</h4>
            <p>Find and book the perfect venue for your special occasions.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p><FaPhone className="inline mr-1" /> +91 9876543210</p>
            <p><FaEnvelope className="inline mr-1" /> info@venuebook.com</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-3 text-xl">
              <FaInstagram />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
        </div>
        <p className="text-center mt-8 text-gray-400 text-xs">© 2025 VenueBook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VenueDetails;