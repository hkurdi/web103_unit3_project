import express from 'express';
import { getAllEvents, getEventsById, getEventsByLocation } from '../controllers/eventsController.js';

const eventsRouter = express.Router();


eventsRouter.get('/location/:locationId', getEventsByLocation);

eventsRouter.get('/:id', getEventsById);

eventsRouter.get('/', getAllEvents);


export default eventsRouter;
