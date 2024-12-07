import validate from 'mongoose-validator';

/* User schema validators */
export const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 40],
    message: 'Name should be between 1 and 40 characters'
  }),
  validate({
    validator: 'matches',
    match: [/^[a-zA-Z0-9]*$/, 'Name is invalid'],
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

/* Event Schema Validators */
export const eventUserValidator = [
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

export const eventNameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 40],
    message: 'Event name should be between 1 and 40 characters'
  }),
  validate({
    validator: 'matches',
    match: [/^[a-zA-Z0-9]*$/, 'Event name is invalid'],
  })
]

export const eventDateValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 30],
    message: ' Date should be between 1 and 12 characters'
  }),
]

export const eventRepeatValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 10],
    message: ' Input should be between 1 and 10 characters'
  }),
  validate({
    validator: 'matches',
    match: [/^[a-zA-Z]*$/, 'Input is invalid'],
  })
] 