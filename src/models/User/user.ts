import { IUser } from 'models/types'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

export default mongoose.model<IUser>("user", userSchema)