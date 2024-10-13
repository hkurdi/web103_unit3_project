import React, { useState, useEffect } from "react";
import EventsAPI from "../services/EventsAPI";
import LocationsAPI from "../services/LocationsAPI";
import Event from "../components/Event";
import "../css/Event.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchEventsAndLocations = async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents();
        setEvents(eventsData);
        setFilteredEvents(eventsData);

        const locationsData = await LocationsAPI.getAllLocations();
        setLocations(locationsData);
        console.log(eventsData);
        console.log(locations);
      } catch (error) {
        console.error("Error fetching events or locations:", error);
      }
    };

    fetchEventsAndLocations();
  }, []);

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setSelectedLocation(locationId);

    if (locationId === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) => event.location_id === parseInt(locationId)
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="events-page">
      <h2>All Events</h2>

      <div className="filter">
        <label htmlFor="location-select">Filter by Location:</label>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="events-list">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.name}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>No events found.</h2>
        )}
      </div>
    </div>
  );
};

export default Events;
