import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { user, event } from '../mongodb/mongodb_schema.js'

export const postUserEvents = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    const eventUser = username;
    const { eventName, startDate, endDate, repeat } = req.body;
  
    /* Validate request body */
    if (!eventName || !startDate || !endDate || !repeat) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    /* Check for existing user by username */
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email or username is not registered to a user' });
    }

    const newEvent = new event({
      eventUser,
      eventName,
      startDate,
      endDate,
      repeat
    })
    const savedEvent = await newEvent.save();
    return res.status(201).json({ message: `New event successfully created for ${username}`, event: savedEvent });

  } catch(err) {
    return res.status(500).json({ error: `Error creating new event: ${err.message}` });
  }
})

export const getUserEvents = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    
    /* Check for existing user by username */
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email or username is not registered to a user' });
    }

    const eventList = await event.find({ "eventUser": username})
    return res.status(201).json({ message: `List of events successfully found for ${username}`, event: eventList });

  } catch(err) {
    return res.status(500).json({ error: `Error getting list of event: ${err.message}` });
  }
})