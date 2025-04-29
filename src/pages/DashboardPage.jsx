import React, { useState, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, List, User, Settings, LogOut, Edit, X, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import AuthContext from '../context/AuthContext';
import BookingContext from '../context/BookingContext';
import { mockUserBookings } from '../data/mockData';

// Dashboard components
const ViewBookings = () => {
  const { userBookings, cancelBooking } = useContext(BookingContext);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState('');

  // Combine context bookings with mock data for display
  const allBookings = [...userBookings, ...mockUserBookings];

  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedBookingId) {
      cancelBooking(selectedBookingId);
      setShowCancelModal(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>
      {allBookings.length > 0 ? (
        <div className="space-y-6">
          {allBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{booking.venueName}</h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {booking.startTime} - {booking.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="mb-2 text-right">
                      <span className="text-gray-600 text-sm">Total:</span>
                      <span className="ml-2 font-bold text-gray-800">₹{booking.totalPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span 
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Edit className="h-4 w-4" />}
                    className={booking.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''}
                    disabled={booking.status === 'cancelled'}
                  >
                    Reschedule
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`text-red-600 border-red-200 hover:bg-red-50 ${booking.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    icon={<X className="h-4 w-4" />}
                    onClick={() => booking.status !== 'cancelled' && handleCancelClick(booking.id)}
                    disabled={booking.status === 'cancelled'}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Calendar className="w-16 h-16 text-pink-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            You haven't made any bookings yet. Start by exploring venues and book your perfect wedding venue.
          </p>
          <Link to="/">
            <Button variant="primary">Find Venues</Button>
          </Link>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Cancel Booking</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone and cancellation fees may apply.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Booking
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-300"
                onClick={confirmCancel}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileSettings = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="form-input"
              defaultValue={user?.name || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="form-input"
              defaultValue={user?.email || ''}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-input"
              placeholder="Your phone number"
            />
          </div>
        </div>
        <Button variant="primary">Update Profile</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <Button variant="primary">Change Password</Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Account Management</h3>
        <Button 
          variant="outline" 
          className="mr-4 border-red-200 text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          Log Out
        </Button>
        <Button 
          variant="outline" 
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const getActivePath = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/') return 'bookings';
    if (path.includes('/settings')) return 'settings';
    return 'bookings';
  };

  const activePath = getActivePath();

  return (
    <div className="page-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your bookings and account settings</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xl mr-3">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user?.name}</p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="space-y-1">
              <Link 
                to="/dashboard" 
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  activePath === 'bookings' 
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>My Bookings</span>
              </Link>
              <Link 
                to="/dashboard/settings" 
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  activePath === 'settings' 
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Profile Settings</span>
              </Link>
              <button 
                onClick={() => navigate('/')}
                className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Back to Home</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route path="/" element={<ViewBookings />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;