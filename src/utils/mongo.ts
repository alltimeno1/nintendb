import mongoose from 'mongoose'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.zwbiy.mongodb.net/switch?retryWrites=true&w=majority`

export const connect = async () => {
  try {
    await mongoose.connect(uri, { ignoreUndefined: true })
    console.log('DB connected!')
  } catch (error) {
    console.log(error)
  }
}

export const disconnect = async () => {
  try {
    await mongoose.connection.close()
    console.log('DB disconnected!')
  } catch (error) {
    console.log(error)
  }
}
