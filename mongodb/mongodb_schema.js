import mongoose from 'mongoose'
import * as mongooseValidators from '../utils/validators.js';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;

/* Schema for users collection */
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.nameValidator
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.emailValidator
  },
  username: {
    type: String,
    required: [true, "can't be blank"],
    index: { unique: true },
    validate: mongooseValidators.usernameValidator
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.passwordValidator
  }
})

export const user =  mongoose.model('Users', userSchema, 'Users');

const eventSchema = new Schema({
  eventUser: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.eventUserValidator
  },
  eventName: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.eventNameValidator
  },
  startDate: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.eventDateValidator
  },
  endDate: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.eventDateValidator
  },
  repeat: {
    type: String,
    required: [true, "can't be blank"],
    index: true,
    validate: mongooseValidators.eventRepeatValidator
  }
})

export const event =  mongoose.model('Events', eventSchema, 'Events');