import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, Users, CreditCard, Building, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';
import { getVenueById } from '../data/mockData';
import BookingContext from '../context/BookingContext';
import AuthContext from '../context/AuthContext';

const BookingPage = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { addBooking } = useContext(BookingContext);
  const { user } = useContext(AuthContext);
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    date: searchParams.get('date') || '',
    startTime: '18:00',
    endTime: '23:00',
    guestCount: 200,
    totalHours: 5,
    totalPrice: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = getVenueById(venueId || '');
        setVenue(result);
        if (result) {
          // Pre-fill total price based on venue's price per hour and default 5 hours
          setBookingDetails(prev => ({
            ...prev,
            totalPrice: result.pricePerHour * 5,
            name: user?.name || '',
            email: user?.email || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching venue:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenue();
  }, [venueId, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => {
      const updated = { ...prev, [name]: value };
      // Update total hours and price when start or end time changes
      if (name === 'startTime' || name === 'endTime') {
        const startHour = parseInt(updated.startTime.split(':')[0]);
        const endHour = parseInt(updated.endTime.split(':')[0]);
        // Calculate hours, ensuring we don't have negative hours if end is before start
        const totalHours = Math.max(0, endHour - startHour);
        updated.totalHours = totalHours;
        updated.totalPrice = venue.pricePerHour * totalHours;
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!venue || !bookingDetails.date || bookingDetails.totalHours <= 0) {
      alert('Please fill in all required booking details');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call to create booking
    setTimeout(() => {
      const newBooking = {
        id: `b${Date.now()}`,
        venueId: venue.id,
        userId: user?.id || '',
        date: bookingDetails.date,
        startTime: bookingDetails.startTime,
        endTime: bookingDetails.endTime,
        guestCount: bookingDetails.guestCount,
        totalPrice: bookingDetails.totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      addBooking(newBooking);
      navigate('/confirmation');
    }, 1500);
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
      <div className="page-container text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Venue Not Found</h2>
        <p className="text-gray-600 mb-8">
          The venue you're trying to book doesn't exist or has been removed.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Venue</h1>
        <div className="flex items-center text-gray-600">
          <span>{venue.name}</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Booking Details</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDetails.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="guestCount"
                      min="1"
                      max={venue.capacity}
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      value={bookingDetails.guestCount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Maximum capacity: {venue.capacity} guests</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="startTime"
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      value={bookingDetails.startTime}
                      onChange={handleInputChange}
                      required
                    >
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
                    <select
                      name="endTime"
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      value={bookingDetails.endTime}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="15:00">3:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="23:00">11:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pt-4 border-t border-gray-100">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                    value={bookingDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                    value={bookingDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                    value={bookingDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 pt-4 border-t border-gray-100">Payment Information</h2>
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="px-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={bookingDetails.totalHours <= 0}
                >
                  Complete Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
            <div className="mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-start mb-3">
                <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">{venue.name}</p>
                  <p className="text-gray-600 text-sm">{venue.area}</p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">
                    {bookingDetails.date ? new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Select a date'}
                  </p>
                </div>
              </div>
              <div className="flex items-start mb-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">
                    {bookingDetails.startTime} - {bookingDetails.endTime}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {bookingDetails.totalHours} hours
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">
                    {bookingDetails.guestCount} guests
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Price per hour</span>
                <span className="font-medium">₹{venue.pricePerHour.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Hours</span>
                <span className="font-medium">{bookingDetails.totalHours}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100 text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold text-pink-600">₹{bookingDetails.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p className="mb-2">By proceeding with this booking, you agree to our <a href="#" className="text-pink-600 hover:underline">Terms of Service</a> and <a href="#" className="text-pink-600 hover:underline">Cancellation Policy</a>.</p>
              <p>A 10% cancellation fee applies if cancelled less than 7 days before the event.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;