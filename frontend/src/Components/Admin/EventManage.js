import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ id: null, name: '', description: '', date: '', location: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/events/${newEvent.id}`, newEvent);
        setIsEditing(false);
      } else {
        await axios.post('/api/events', newEvent);
      }
      setNewEvent({ id: null, name: '', description: '', date: '', location: '', image: '' });
      fetchEvents();
    } catch (err) {
      setError('Failed to save the event');
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (err) {
      setError('Failed to delete the event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Event Management</h2>

        {/* Error Message */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Event Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              required
            />
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
            />
          </div>

          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="date"
              type="date"
              value={newEvent.date}
              onChange={handleInputChange}
              required
            />
            <input
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="image"
              value={newEvent.image}
              onChange={handleInputChange}
              placeholder="Image URL"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            {isEditing ? 'Update Event' : 'Add Event'}
          </button>
        </form>

        {/* Loading State */}
        {loading ? (
          <p className="text-center mt-6 text-lg text-gray-500">Loading events...</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {events.map((event) => (
              <li key={event._id} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} - {event.location}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventManagement;
