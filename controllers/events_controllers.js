import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { user, event } from '../mongodb/mongodb_schema.js'
import { searchMongoDB } from '../mongodb/mongodb.js'

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

export const editUserEvents = expressAsyncHandler(async (req, res) => {
  try {
    const { username, eventID } = req.params;
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

    const updatedEvent = await event.updateOne({ "_id": eventID }, {
      "eventUser": eventUser,
      "eventName": eventName,
      "startDate": startDate,
      "endDate": endDate,
      "repeat": repeat
    })

    const updatedEventResults = await event.findOne({ "_id": eventID })
    return res.status(201).json({ message: `${eventName} successfully updated for ${username}`, event: updatedEventResults });

  } catch(err) {
    return res.status(500).json({ error: `Error updating list of event: ${err.message}` });
  }
})

export const deleteUserEvents = expressAsyncHandler(async (req, res) => {
  try {
    const { username, eventID } = req.params;
    const eventUser = username;
    
    /* Check for existing user by username */
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email or username is not registered to a user' });
    }

    await event.deleteOne({ "_id": eventID })
    return res.status(201).json({ message: `Event successfully deleted for ${username}` });

  } catch(err) {
    return res.status(500).json({ error: `Error deleting event: ${err.message}` });
  }
})

export const searchEvents = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    
    /* Check for existing user by username */
    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email or username is not registered to a user' });
    }

    const searchData = await searchMongoDB(req.query.term);
    const autoResults = searchData.filter((searchName) => searchName.eventUser == username);
    
    return res.status(201).json({ message: 'Autocomplete successfull', autocomplete: autoResults });
    
  } catch(err) {
    return res.status(500).json({ error: `Error generating autocomplete data: ${err.message}` });
  }
})