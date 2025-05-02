import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Search } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venues/${searchQuery.trim()}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">FindMyHall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search venues by area..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
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
        className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
      > 
        {area.name}
      </li>
    ))}
  </ul>
)}
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-pink-700 hover:text-pink-800 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Search venues by area..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>
          
          <div className="space-y-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
