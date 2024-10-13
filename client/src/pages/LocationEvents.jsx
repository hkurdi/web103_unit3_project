import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Event from "../components/Event";
import LocationsAPI from "../services/LocationsAPI";
import EventsAPI from "../services/EventsAPI";
import "../css/LocationEvents.css";

const LocationEvents = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLocationAndEvents = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(id);
        setLocation(locationData);
        console.log("Location Data: ", locationData);
        const eventsData = await EventsAPI.getEventsByLocation(id);
        setEvents(eventsData);
        console.log(eventsData);
      } catch (error) {
        console.error("Error fetching location or events:", error);
      }
    };

    fetchLocationAndEvents();
  }, []);

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} alt={location.name} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>{location.address} </p>
          <p>{location.description}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
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
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i> No events
            scheduled at this location yet!
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
