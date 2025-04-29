import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Car, Calendar } from 'lucide-react';

const VenueCard = ({ venue }) => {
  return (
    <Link to={`/venue/${venue.id}`} className="block">
      <div className="card group overflow-hidden h-full rounded-2xl">
        {/* Image container with overlay */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 flex items-center space-x-1">
            <div className="bg-white rounded-full p-1">
              <MapPin className="h-4 w-4 text-pink-600" />
            </div>
            <span className="text-white font-medium text-sm">{venue.area}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
              {venue.name}
            </h3>
            <div className="flex items-center bg-cream-100 text-amber-700 px-2 py-0.5 rounded-md text-sm font-medium">
              <span>★</span>
              <span>{venue.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Users className="h-4 w-4 mr-1" />
            <span>Up to {venue.capacity} guests</span>
          </div>

          {venue.hasParking && (
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <Car className="h-4 w-4 mr-1" />
              <span>Parking available</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="text-pink-600 font-medium">
              ₹{venue.pricePerHour.toLocaleString()}<span className="text-gray-500 text-sm">/hour</span>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Check availability</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;