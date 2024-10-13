import pool from "../config/db.js";

export const getAllLocations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const { locationId } = req.params;
    console.log(`Fetching location with ID: ${locationId}`);

    const result = await pool.query("SELECT * FROM locations WHERE id = $1", [
      locationId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching location with ID ${locationId}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllLocations,
  getLocationById,
};
