import express from 'express'
import * as eventController from '../controllers/events_controllers.js'

const eventsRouter = express.Router();

eventsRouter.route('/:username')
  .get(eventController.getUserEvents)
  .post(eventController.postUserEvents)

eventsRouter.route('/:username/:eventID')
  .put(eventController.editUserEvents)
  .delete(eventController.deleteUserEvents)

export default eventsRouter;