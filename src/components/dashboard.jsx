import { useState } from "react";
import { Calendar, Heart, Star, LogOut, Menu } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard" },
    { label: "Bookings" },
    { label: "Saved Venues" },
    { label: "Settings" },
  ];

  const handleLogout = () => {
    alert("Logging out...");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome back, Sarah! 👋</h2>
            <p className="mb-6">Here's what's happening with your wedding venue search</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-2xl shadow text-center">
                <Calendar className="mx-auto text-purple-600" />
                <p className="text-xl font-bold mt-2">3</p>
                <p className="text-gray-500">Active Bookings</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow text-center">
                <Heart className="mx-auto text-pink-600" />
                <p className="text-xl font-bold mt-2">12</p>
                <p className="text-gray-500">Saved Venues</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow text-center">
                <Star className="mx-auto text-yellow-500" />
                <p className="text-xl font-bold mt-2">8</p>
                <p className="text-gray-500">Reviews Given</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow mb-6">
              <div className="flex justify-between mb-3">
                <h3 className="font-semibold">Recent Bookings</h3>
                <button className="text-purple-600 hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Royal Palace</p>
                    <p className="text-gray-500 text-sm">Banjara Hills</p>
                  </div>
                  <p>Apr 15, 2025</p>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Confirmed</span>
                  <button className="text-purple-600 hover:underline">View Details</button>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Green Valley</p>
                    <p className="text-gray-500 text-sm">Jubilee Hills</p>
                  </div>
                  <p>May 20, 2025</p>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">Pending</span>
                  <button className="text-purple-600 hover:underline">View Details</button>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex justify-between mb-3">
                <h3 className="font-semibold">Saved Venues</h3>
                <button className="text-purple-600 hover:underline">View all</button>
              </div>
              <div className="flex gap-4">
                <div className="rounded-2xl overflow-hidden shadow w-full">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                    alt="venue"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold">Crystal Palace</p>
                    <p className="text-gray-500 text-sm">Hitech City, Hyderabad</p>
                    <div className="text-sm text-gray-600 mt-1">⭐ 4.8 · ₹2,00,000/day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-6">{activeTab} content goes here.</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-xl">
        <h1 className="text-xl font-bold text-purple-600 mb-6">WeddingSpot</h1>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-100 ${
                activeTab === item.label ? "bg-purple-200 text-purple-800" : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-12 flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-sm text-gray-500">sarah@example.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center mt-6 text-red-600 gap-2 hover:underline"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">{renderTabContent()}</main>
    </div>
  );
};

export default Dashboard;