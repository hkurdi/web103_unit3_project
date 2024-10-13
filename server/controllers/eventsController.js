import pool from "../config/db.js";

export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching all events:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const getEventsByLocation = async (req, res) => {
  const { locationId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM events WHERE location_id = $1", [locationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No events found for this location" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(`Error fetching events for location ID ${locationId}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllEvents,
  getEventsById,
  getEventsByLocation,
};