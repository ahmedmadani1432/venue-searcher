import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, Clock, Car, Utensils, Home, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';
import { getVenueById, checkAvailability } from '../data/mockData';

const VenueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [dateAvailable, setDateAvailable] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchVenue = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = getVenueById(id || '');
        setVenue(result);
      } catch (error) {
        console.error('Error fetching venue:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (venue && date) {
      const isAvailable = checkAvailability(venue.id, date);
      setDateAvailable(isAvailable);
    } else {
      setDateAvailable(null);
    }
  };

  const handleBook = () => {
    if (!selectedDate || !dateAvailable) return;
    navigate(`/booking/${venue.id}?date=${selectedDate}`);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? venue.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === venue.images.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-pink-300 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="page-container text-center py-16 mx-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Venue Not Found</h2>
        <p className="text-gray-600 mb-8">
          The venue you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 pb-16">
      {/* Image Gallery */}
      <div className="relative w-full h-[50vh] bg-gray-100">
        <img
          src={venue.images[activeImageIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {venue.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="page-container">
        <div className="bg-white rounded-lg shadow-sm -mt-10 relative z-10">
          <div className="p-6 md:p-8">
            {/* Venue Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-pink-600 mr-2" />
                  <span className="text-gray-600">{venue.area}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{venue.name}</h1>
                <p className="text-gray-600 mb-2">{venue.address}</p>
                <div className="flex items-center">
                  <div className="flex items-center bg-cream-100 text-amber-700 px-2 py-0.5 rounded-md text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-amber-500" />
                    <span>{venue.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({venue.reviews} reviews)</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl font-bold text-pink-600">₹{venue.pricePerHour.toLocaleString()}</div>
                <div className="text-gray-500">per hour</div>
              </div>
            </div>
            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-lavender-100 text-lavender-600 rounded-full flex items-center justify-center mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-gray-800 font-medium">Up to {venue.capacity}</span>
                <span className="text-gray-500 text-sm">Guests</span>
              </div>
              {venue.hasParking && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-cream-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                    <Car className="h-5 w-5" />
                  </div>
                  <span className="text-gray-800 font-medium">Available</span>
                  <span className="text-gray-500 text-sm">Parking</span>
                </div>
              )}
              {venue.hasCatering && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mb-2">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <span className="text-gray-800 font-medium">In-house</span>
                  <span className="text-gray-500 text-sm">Catering</span>
                </div>
              )}
              {venue.hasAccommodation && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-2">
                    <Home className="h-5 w-5" />
                  </div>
                  <span className="text-gray-800 font-medium">Available</span>
                  <span className="text-gray-500 text-sm">Accommodation</span>
                </div>
              )}
            </div>
            {/* Description */}
            <div className="py-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About this venue</h2>
              <p className="text-gray-600 leading-relaxed">{venue.description}</p>
            </div>
            {/* Amenities */}
            <div className="py-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Availability Check */}
            <div className="py-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Check Availability</h2>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200">
                        <option value="">Select time</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200">
                        <option value="">Select time</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="23:00">11:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                {dateAvailable !== null && (
                  <div className={`mt-4 p-3 rounded-md ${dateAvailable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {dateAvailable ? (
                      <p className="font-medium">This venue is available on the selected date!</p>
                    ) : (
                      <p className="font-medium">Sorry, this venue is not available on the selected date.</p>
                    )}
                  </div>
                )}
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={!selectedDate || !dateAvailable}
                    onClick={handleBook}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;