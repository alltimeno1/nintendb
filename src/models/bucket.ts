import { ObjectId } from 'mongodb'

export interface MyBucket {
  _id?: ObjectId
  list?: string[]
  user_id?: string
  address?: string
}
