import { connectCollection } from '../utils/mongo'

export async function findBoard() {
  const board = await connectCollection('board')

  return await board.find().sort({ id: -1 }).toArray()
}

export async function findPostLog(id: string) {
  const board = await connectCollection('board')

  return await board.findOne({ id: parseInt(id) })
}

export async function updateAndFindPost(id: string) {
  const board = await connectCollection('board')

  await board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } })

  return await board.findOne({ id: parseInt(id) })
}

export async function insertLoginPost(
  title: string,
  displayName: string,
  userId: string,
  text: string
) {
  const board = await connectCollection('board')
  const counts = await connectCollection('counts')
  const postNum = await counts.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } })

  await board.insertOne({
    id: postNum.value?.count,
    title,
    nickname: displayName,
    user_id: userId,
    text: text.replace(/\n/g, '<br>'),
    date: new Date(),
    viewCount: 0,
    recommend: [],
  })
}

export async function insertLogoutPost(
  title: string,
  nickname: string,
  password: string,
  text: string
) {
  const board = await connectCollection('board')
  const counts = await connectCollection('counts')
  const postNum = await counts.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } })

  await board.insertOne({
    id: postNum.value?.count,
    title,
    nickname,
    password,
    text: text.replace(/\n/g, '<br>'),
    date: new Date(),
    viewCount: 0,
    recommend: [],
  })
}

export async function deleteLoginPost(postId: string, userId: string) {
  const board = await connectCollection('board')

  await board.deleteOne({
    id: parseInt(postId),
    user_id: userId,
  })
}

export async function deleteLogoutPost(postId: string, password: string) {
  const board = await connectCollection('board')

  const result = await board.deleteOne({
    id: parseInt(postId),
    password: password,
  })

  return result
}

export const updateLoginPost: Types.UpdateLoginPost<string> = async (id, userId, title, text) => {
  const board = await connectCollection('board')

  await board.updateOne({ id: parseInt(id), user_id: userId }, { $set: { title, text } })
}

export async function updateLogoutPost(
  id: string,
  password: string,
  title: string,
  nickname: string,
  text: string
) {
  const board = await connectCollection('board')

  const result = await board.findOneAndUpdate(
    { id: parseInt(id), password },
    { $set: { title, nickname, text } }
  )

  return result
}

export async function updateRecommend(postId: string, id: string) {
  const board = await connectCollection('board')

  await board.updateOne({ id: parseInt(postId) }, { $addToSet: { recommend: id } })
}
