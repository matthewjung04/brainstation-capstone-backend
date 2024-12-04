import mongoose from 'mongoose'

const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'rootroot';

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@brainstationcapstone.4u1nh.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
    match: [/^[a-zA-Z0-9]+$/, 'name is invalid'],
    index: true,
    minlength: [1, 'Name must be at least 1 character'],
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'email is invalid'],
    index: true,
    minlength: [1, 'Email must be at least 1 character'],
  },
  username: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'name is invalid'],
    index: { unique: true },
    minlength: [1, 'Username must be at least 1 character'],
    maxlength: [12, "Username can't be more than 12 characters"]
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'name is invalid'],
    index: true,
    minlength: [8, 'Password must be at least 8 character']
  }
})

export const user =  mongoose.model('Users', userSchema);