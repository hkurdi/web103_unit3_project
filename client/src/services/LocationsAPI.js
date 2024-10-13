import axios from 'axios';

class LocationsAPI {
  constructor(hostURL) {
    this.hostURL = hostURL;
    this.token = null;
  }

  async getAllLocations() {
    try {
      const response = await axios.get(`${this.hostURL}/locations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all locations:', error);
      throw error;
    }
  }

  async getLocationById(id) {
    if (!id) {
      throw new Error('Missing id argument');
    }
    try {
      const response = await axios.get(`${this.hostURL}/locations/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new LocationsAPI("http://localhost:3001");
