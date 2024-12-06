import mongoose from 'mongoose'
import { nameValidator, emailValidator, usernameValidator, passwordValidator } from '../utils/validators.js';
import validate from 'mongoose-validator';

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';
const mongodb_url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`;

mongoose
  .connect(mongodb_url)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => { console.log(err) })
;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: emailValidator
  },
  username: {
    type: String,
    required: [true, "can't be blank"],
    index: { unique: true },
    validate: usernameValidator
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: passwordValidator
  }
})

export const user =  mongoose.model('Users', userSchema);