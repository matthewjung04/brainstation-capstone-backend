import express from 'express'
import * as eventController from '../controllers/events_controllers.js'

const eventsRouter = express.Router();

eventsRouter.route('/:username')
  .post(eventController.postUserEvents)

export default eventsRouter;