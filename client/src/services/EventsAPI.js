import axios from 'axios';

class EventsAPI {
  constructor(hostURL) {
    this.hostURL = hostURL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders() {
    return this.token
      ? { Authorization: `Bearer ${this.token}` }
      : {};
  }

  async getAllEvents() {
    try {
      const response = await axios.get(`${this.hostURL}/events`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw error;
    }
  }


  async getEventsById(id) {
    if (!id) {
      throw new Error('Missing "id" argument');
    }
    try {
      const response = await axios.get(`${this.hostURL}/events/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      throw error;
    }
  }
  async getEventsByLocation(locationId) {
    if (!locationId) {
      throw new Error('Missing locationId argument');
    }
    try {
      const response = await axios.get(`${this.hostURL}/events/location/${locationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for location ID ${locationId}:`, error);
      throw error;
    }
  }
  

}

export default new EventsAPI("http://localhost:3001");
