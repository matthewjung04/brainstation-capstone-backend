import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import { user } from '../mongodb/mongodb_schema.js'

export const postSignUp = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    /* Validate request body */
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    /* Check for existing user by email or username */
    const existingUser = await user.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }

    /* Hash the password */
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /* Create and save new user */
    const newUser = new user({
      name,
      email,
      username,
      password: hashedPassword,
    })

    const savedUser = await newUser.save();
    return res.status(201).json({ message: 'User registered successfully', user: savedUser });

  } catch (err) {
    /* Handle unexpected errors */
    return res.status(500).json({ error: `Error registering new user: ${err.message}` });
  }
})

export const postSignIn = expressAsyncHandler(async (req, res) => {
  try{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await user.findOne({ $or: [{ username }, { password }] });
    if (!existingUser) {
      return res.status(400).json({ error: 'Email or username is not registered to a user' });
    }

    const hashedPassword = existingUser.password;
    const matchingPassword = bcrypt.compare(password, hashedPassword);

    if (matchingPassword) {
      return res.status(201).json({ message: 'Successfuly signed in', data: existingUser })
    }

  } catch (err) {
    return res.status(500).json({ error: `Error signing in existing user: ${err.message}` })
  }
})
