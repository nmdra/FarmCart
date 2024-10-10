import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/tickets/getTickets");
      setEvents(response.data.tickets || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/booking/${eventId}`);
  };

  const handleMyEventsClick = () => {
    navigate('/eventDetails'); // Redirect to /eventDetails
  };

  const filteredEvents = events.filter((event) => {
    const searchTextMatch =
      (event.title && event.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (event.description && event.description.toLowerCase().includes(searchText.toLowerCase()));

    return searchTextMatch;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-4">Farmcart</h1>
          <h2 className="text-3xl font-medium mb-6">
            Explore Fresh Local Farm Events Near You
          </h2>
          <p className="text-lg font-light mb-10">
            Discover the best farm events around your area. Shop fresh produce directly from farmers and participate in unique experiences.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-white text-green-600 px-6 py-3 text-lg font-medium rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
              onClick={handleMyEventsClick} // Add onClick handler here
            >
              My Events
            </button>
            <button className="border-2 border-white px-6 py-3 text-lg font-medium rounded-full hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="mt-12 flex justify-center">
        <input
          type="text"
          className="border border-gray-300 rounded-full px-4 py-3 w-1/3 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300"
          placeholder="Search by Event or Farm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </section>

      {/* Upcoming Events Section */}
      <section className="mt-16">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Upcoming Farm Events
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
                onClick={() => handleCardClick(event._id)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-gray-500 text-sm">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h4 className="text-2xl font-semibold text-gray-800 mt-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 mt-1">{event.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No upcoming events found.</p>
          )}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
            Load More
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
