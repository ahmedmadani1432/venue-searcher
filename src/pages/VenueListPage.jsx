import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Filter, Search } from 'lucide-react';
import VenueCard from '../components/venues/VenueCard';
import Button from '../components/common/Button';
import { getVenuesByArea } from '../data/mockData';

const VenueListPage = () => {
  const { area } = useParams();
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minCapacity: 0,
    maxPrice: 50000,
    hasParking: false,
    hasCatering: false,
  });

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const results = getVenuesByArea(area || '');
        setVenues(results);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [area]);

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;

    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  const applyFilters = () => {
    let filtered = getVenuesByArea(area || '');

    // Apply capacity filter
    if (filters.minCapacity > 0) {
      filtered = filtered.filter(venue => venue.capacity >= filters.minCapacity);
    }

    // Apply price filter
    if (filters.maxPrice < 50000) {
      filtered = filtered.filter(venue => venue.pricePerHour <= filters.maxPrice);
    }

    // Apply amenity filters
    if (filters.hasParking) {
      filtered = filtered.filter(venue => venue.hasParking);
    }

    if (filters.hasCatering) {
      filtered = filtered.filter(venue => venue.hasCatering);
    }

    setVenues(filtered);
  };

  const resetFilters = () => {
    setFilters({
      minCapacity: 0,
      maxPrice: 50000,
      hasParking: false,
      hasCatering: false,
    });

    setVenues(getVenuesByArea(area || ''));
  };

  return (
    <div className="page-container pb-16 mx-10">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <MapPin className="h-5 w-5 text-pink-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Wedding Venues in {area}</h1>
        </div>
        <p className="text-gray-600">
          Showing {venues.length} venues available in {area}
        </p>
      </div>

      {/* Filters section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            className="flex items-center text-gray-700 hover:text-pink-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search in this area..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Capacity
                </label>
                <select
                  name="minCapacity"
                  className="w-full border border-gray-200 rounded-md p-2"
                  value={filters.minCapacity}
                  onChange={handleFilterChange}
                >
                  <option value="0">Any</option>
                  <option value="100">100+ guests</option>
                  <option value="200">200+ guests</option>
                  <option value="300">300+ guests</option>
                  <option value="500">500+ guests</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Price (per hour)
                </label>
                <select
                  name="maxPrice"
                  className="w-full border border-gray-200 rounded-md p-2"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                >
                  <option value="50000">Any</option>
                  <option value="15000">Up to ₹15,000</option>
                  <option value="20000">Up to ₹20,000</option>
                  <option value="30000">Up to ₹30,000</option>
                  <option value="40000">Up to ₹40,000</option>
                </select>
              </div>

              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasParking"
                    name="hasParking"
                    checked={filters.hasParking}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasParking" className="ml-2 block text-sm text-gray-700">
                    Parking
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasCatering"
                    name="hasCatering"
                    checked={filters.hasCatering}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasCatering" className="ml-2 block text-sm text-gray-700">
                    Catering
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button variant="primary" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-16 h-16 border-4 border-t-pink-300 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <MapPin className="w-16 h-16 text-pink-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Venues Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any venues in this area. Try searching for another location or adjusting your filters.
          </p>
          <Button
            variant="primary"
            className="mt-6"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default VenueListPage;