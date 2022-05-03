import { MongoClient } from 'mongodb'
import 'dotenv/config'

const uri: string = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.zwbiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri)

async function connectCollection(colName: string) {
  const _client = await client.connect()

  return _client.db('switch').collection(colName)
}

module.exports = { client, connectCollection }
