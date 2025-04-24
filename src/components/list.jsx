import React, { useState } from 'react';
import { FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const venues = [
  {
    name: 'Royal Palace Function Hall',
    location: 'Banjara Hills',
    guests: '500-1000 guests',
    price: 75000,
    rating: 4,
    reviews: 124,
    status: 'Available',
    image: '/hall1.jpg'
  },
  {
    name: 'Golden Gate Banquet',
    location: 'Jubilee Hills',
    guests: '300-600 guests',
    price: 95000,
    rating: 4,
    reviews: 89,
    status: 'Booked',
    image: '/hall2.jpg'
  },
  {
    name: 'Silver Springs Convention',
    location: 'Gachibowli',
    guests: '800-1500 guests',
    price: 125000,
    rating: 4,
    reviews: 156,
    status: 'Available',
    image: '/hall3.jpg'
  }
];

export default function VenueListPage() {
  const [selectedPage, setSelectedPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold text-purple-600">VenueFind</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600 cursor-pointer">Wishlist</span>
          <img src="https://i.pravatar.cc/40" alt="user" className="rounded-full w-8 h-8" />
        </div>
      </header>

      <main className="flex p-6">
        {/* Filters */}
        <aside className="w-72 bg-white p-4 rounded shadow mr-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Budget Range</label>
            <input type="range" min="10000" max="200000" className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹10,000</span>
              <span>₹2,00,000</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Capacity</label>
            <div className="flex gap-2">
              <input type="number" placeholder="Min" className="w-1/2 p-1 border rounded" />
              <input type="number" placeholder="Max" className="w-1/2 p-1 border rounded" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <select className="w-full border rounded p-1">
              <option>All Locations</option>
              <option>Banjara Hills</option>
              <option>Jubilee Hills</option>
              <option>Gachibowli</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input type="date" className="w-full border rounded p-1" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select className="w-full border rounded p-1">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Apply Filters</button>
        </aside>

        {/* Venue Cards */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue, index) => (
            <div key={index} className="bg-white rounded shadow overflow-hidden">
              <div className="relative">
                <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />
                <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded ${venue.status === 'Available' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {venue.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{venue.name}</h3>
                <p className="flex items-center text-sm text-gray-600 mb-1"><FaUsers className="mr-1" /> {venue.guests}</p>
                <p className="flex items-center text-sm text-gray-600 mb-1"><FaMapMarkerAlt className="mr-1" /> {venue.location}</p>
                <p className="flex items-center text-sm text-yellow-500 mb-1">
                  {Array.from({ length: venue.rating }).map((_, i) => <AiFillStar key={i} />)}
                  <span className="ml-1 text-gray-600">({venue.reviews} reviews)</span>
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-purple-700">₹{venue.price.toLocaleString()}</span>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Pagination */}
      <div className="flex justify-center items-center my-8 gap-2">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => setSelectedPage(page)}
            className={`w-8 h-8 rounded border text-sm ${selectedPage === page ? 'bg-purple-600 text-white' : 'bg-white text-gray-800'}`}
          >
            {page}
          </button>
        ))}
      </div>

      <footer className="bg-white px-6 py-8 border-t text-sm text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="font-semibold mb-2">About Us</h3>
          <p>Find and book the perfect venue for your special occasions in Hyderabad.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul>
            <li>How it Works</li>
            <li>List Your Venue</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-2">
            <a href="#">Fb</a>
            <a href="#">Tw</a>
            <a href="#">Ig</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
