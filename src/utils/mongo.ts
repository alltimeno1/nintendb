import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.zwbiy.mongodb.net/switch?retryWrites=true&w=majority`

const client = new MongoClient(uri)

export async function connectCollection(colName: string) {
  const _client = await client.connect()

  return _client.db('switch').collection(colName)
}

export const connect = async () => {
  try {
    await mongoose.connect(uri, { ignoreUndefined: true })
    console.log('DB connected!')
  } catch (error) {
    console.log(error)
  }
}
