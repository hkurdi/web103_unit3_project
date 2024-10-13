// src/components/Event.jsx

import React, { useState, useEffect } from 'react';
import EventsAPI from '../services/EventsAPI';
import dates from '../utils/date'; 
import '../css/Event.css';

const Event = ({ id }) => {
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState('');
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await EventsAPI.getEventsById(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event && event.date) {
      const formattedTime = dates.formatTime(event.date);
      setTime(formattedTime);

      const timeRemaining = dates.formatRemainingTime(event.date);
      setRemaining(timeRemaining);
      dates.formatNegativeTimeRemaining(timeRemaining, event.id);
    }
  }, [event]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <article className='event-information'>
      <img src={event.image} alt={event.name} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{event.name}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i> {event.date} <br /> {time}
          </p>
          <p id={`remaining-${event.id}`}>{remaining}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
