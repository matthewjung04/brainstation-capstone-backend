import validate from 'mongoose-validator';

export const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 40],
    message: 'Name should be between 1 and 40 characters'
  })
]

export const emailValidator = [

]

export const usernameValidator = [

]

export const passwordValidator = [

]