import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  placeholder = 'Search venues by area...',
  size = 'md',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'py-1.5 pl-9 pr-3 text-sm',
    md: 'py-2 pl-10 pr-4',
    lg: 'py-3 pl-12 pr-5 text-lg'
  };

  const iconSizes = {
    sm: 'h-4 w-4 left-3',
    md: 'h-5 w-5 left-3.5',
    lg: 'h-6 w-6 left-4'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/venues/${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 ${sizeClasses[size]}`}
      />
      <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${iconSizes[size]}`} />
      <button type="submit" className="hidden">Search</button>
    </form>
  );
};

export default SearchBar;