import express from 'express';
import { getAllLocations, getLocationById } from '../controllers/locationsController.js';

const router = express.Router();

router.get('/', getAllLocations);

router.get('/:locationId', getLocationById);



export default router;
