import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5001/api/v1/hall/searchhall")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);



  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venues/${searchQuery.trim()}`);
    }
  };

  const popularAreas = [
    { name: 'Banjara Hills', image: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Jubilee Hills', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpXBPxDHMdsvIdvdGNx4p8VFxikfFetHZwwA&s' },
    { name: 'Hitech City', image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Madhapur', image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/q3/040pxx40.xx40.140326092521.h1q3/catalogue/noori-palace-function-hall-chandrayan-gutta-hyderabad-banquet-halls-5l702h7p8g.jpg' },
    { name: 'Mahdipatnam', image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/i9/040pxx40.xx40.180410221749.q9i9/catalogue/royal-palace-function-hall-idpl-hyderabad-banquet-halls-lLdv50RqqJ.jpg?fit=around%7C350:350&crop=350:350;*,*' },
    { name: 'Tolichowki', image: 'https://onehorizonproductions.com/wp-content/uploads/2022/09/Maharaja-2.jpg' },
    { name: 'MasabTank', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJpTzTz2oIE-ULZ88kc95ydUqsqDjNckhgfjLztpmq_ninLjL9QY5rOUTwpsXrJhWRKFw&usqp=CAU' },
    { name: 'Charminar', image: 'https://media.weddingz.in/photologue/images/kings-palace-kings-palace-3.jpg' }
  ];

  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] bg-lavender-50">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://onehorizonproductions.com/wp-content/uploads/2022/10/Whitepetals-3-849.jpg)',
            // backgroundImage: 'url(./assets/1.jpg)',
            opacity: 0.6
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-lavender-600/20"></div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 fade-in">
            Find Your Perfect <span className="text-pink-600">Wedding Venue</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8 slide-up">
            Discover and book the ideal venue for your special day, all in one place.
          </p>
          <div className="w-full max-w-2xl slide-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search venues by area (e.g., Banjara Hills)"
                className="w-full rounded-full px-6 py-4 pr-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-100 text-pink-800 bg-white"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  if (value.trim() === '') {
                    setFilteredSuggestions([]);
                    setShowDropdown(false);
                  } else {
                    const matches = popularAreas.filter((area) =>
                      area.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setFilteredSuggestions(matches);
                    setShowDropdown(true);
                  }
                }}
              />

{showDropdown && filteredSuggestions.length > 0 && (
  <ul className="absolute left-0 right-0 mt-1 bg-red border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
    {filteredSuggestions.map((area, index) => (
      <li
        key={index}
        onClick={() => {
          setSearchQuery(area.name);
          setShowDropdown(false);
          navigate(`/venues/${area.name}`);
        }}
        className="px-1 py-2 hover:bg-pink-50 cursor-pointer text-black hover:text-pink-700 flex"
      > 
        {area.name}
      </li>
    ))}
  </ul>
)}


              {/* <input
                type="text"
                placeholder="Search venues by area (e.g., Banjara Hills)"
                className="w-full rounded-full px-6 py-4 pr-36 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> */}
              <button 
                type="submit"
                className="absolute right-2 top-2 bg-pink-100 hover:bg-pink-200 text-pink-700 px-6 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <Search className="inline-block mr-1 h-5 w-5" />
                Search
              </button>
            </form>
          </div>
          <div className="mt-6 text-gray-600 slide-up" id='popular'>
            <p className='bg-white hover:bg-gray-50 text-gray-900 text-sm px-3 py-1 rounded-full shadow-sm transition-colors w-40 m-auto'  >Popular areas:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {popularAreas.map((area, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/venues/${area.name}`)}
                  className="text-white text-sm px-3 py-1 rounded-full shadow-md transition-colors hover:bg-white hover:text-pink-700"
                >
                  {area.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Finding and booking your dream venue has never been easier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-cream-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Search</h3>
              <p className="text-gray-600">Find venues by location, capacity, or amenities to match your requirements</p>
            </div>
            <div className="bg-lavender-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-lavender-100 text-lavender-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Book</h3>
              <p className="text-gray-600">Select your date and time, then complete your booking in just a few clicks</p>
            </div>
            <div className="bg-sage-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Celebrate</h3>
              <p className="text-gray-600">Enjoy your special day with loved ones in your perfect venue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover wedding venues in these sought-after locations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularAreas.map((area, index) => (
              <div 
                key={index}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/venues/${area.name}`)}
              >
                <img 
                  src={area.image} 
                  alt={area.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <p className="text-white font-medium text-xl">{area.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/venues/popular')}
            >
              View All Areas
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose FindMyHall</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The easiest way to find and book wedding venues</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Extensive Selection</h3>
              <p className="text-gray-600">Browse hundreds of venues carefully curated to suit all preferences and budgets</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-cream-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Real-Time Availability</h3>
              <p className="text-gray-600">Check venue availability instantly without waiting for callbacks</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-lavender-100 text-lavender-600 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Location-Based Search</h3>
              <p className="text-gray-600">Find the perfect venue in your preferred area with our location filters</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Secure Booking</h3>
              <p className="text-gray-600">Book with confidence using our secure payment system</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Easy Management</h3>
              <p className="text-gray-600">Manage your bookings, make changes, or cancel if needed through your dashboard</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-cream-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Customer Support</h3>
              <p className="text-gray-600">Our dedicated team is ready to assist you every step of the way</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Find Your Perfect Wedding Venue?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Start your search today and take the first step towards your dream wedding</p>
          <div className="max-w-lg mx-auto">
            <SearchBar size="lg" className="mb-6" />
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/venues/popular')}
              className="min-w-[200px]"
            >
              Browse Popular Venues
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;