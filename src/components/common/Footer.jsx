import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-pink-600">FindMyHall</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Discover and book the perfect venue for your special day, all in one place.
            </p>
            <div className="flex items-center text-gray-500">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-pink-500 fill-pink-500" />
              <span>for couples</span>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/venues/popular" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Popular Venues
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-pink-600 transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-pink-500" />
                <a href="mailto:contact@findmyhall.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                  contact@findmyhall.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-pink-500" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-pink-600 transition-colors">
                  8798321721
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-pink-500" />
                <span className="text-gray-600">
                CGC ,<br />
                   TDC ,MoghalPura
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FindMyHall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;