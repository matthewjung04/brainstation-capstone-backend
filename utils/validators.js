import validate from 'mongoose-validator';

export const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 40],
    message: 'Name should be between 1 and 40 characters'
  }),
  validate({
    validator: 'matches',
    arguments: [/^[a-zA-Z0-9]*$/, 'Name is invalid'],
  })
]

export const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 40],
    message: 'Name should be between 1 and 40 characters'
  }),
  validate({
    validator: 'matches',
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  })
]

export const usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 12],
    message: 'Username should be between 1 and 12 characters'
  }),
  validate({
    validator: 'matches',
    match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'],
  })
]

export const passwordValidator = [
  validate({
    validator: 'matches',
    match: [/^[a-zA-Z0-9]+$/, 'Password is invalid'],
  })
]