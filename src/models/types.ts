import { Date, Document, Types } from 'mongoose';

export interface IUser extends Document{
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

export interface ICard extends Document {
  name: string,
  link: string,
  owner: Types.ObjectId,
  likes: Types.ObjectId[],
  createdAt: Date
}
