import { Board } from '../models/board.model'
import { Count } from '../models/count.model'

export async function findBoard() {
  return await Board.find().sort({ id: -1 })
}

export async function findPostLog(id: string) {
  return await Board.findOne({ id: parseInt(id) })
}

export async function updateAndFindPost(id: string) {
  await Board.updateOne({ id: parseInt(id) }, { $inc: { viewCount: 1 } })

  return await Board.findOne({ id: parseInt(id) })
}

export async function insertLoginPost(
  title: string,
  displayName: string,
  userId: string,
  text: string
) {
  const postNum = await Count.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } })

  await Board.create({
    id: postNum?.count,
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
  const postNum = await Count.findOneAndUpdate({ name: 'board' }, { $inc: { count: 1 } })

  await Board.create({
    id: postNum?.count,
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
  await Board.deleteOne({
    id: parseInt(postId),
    user_id: userId,
  })
}

export async function deleteLogoutPost(postId: string, password: string) {
  const result = await Board.deleteOne({
    id: parseInt(postId),
    password: password,
  })

  return result
}

export const updateLoginPost: Types.UpdateLoginPost<string> = async (id, userId, title, text) => {
  await Board.updateOne({ id: parseInt(id), user_id: userId }, { $set: { title, text } })
}

export async function updateLogoutPost(
  id: string,
  password: string,
  title: string,
  nickname: string,
  text: string
) {
  const result = await Board.findOneAndUpdate(
    { id: parseInt(id), password },
    { $set: { title, nickname, text } }
  )

  return result
}

export async function updateRecommend(postId: string, id: string) {
  await Board.updateOne({ id: parseInt(postId) }, { $addToSet: { recommend: id } })
}
