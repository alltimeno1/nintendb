import { Board } from '../models/board.model'
import { Count } from '../models/count.model'

export async function findBoard() {
  const posts = await Board.find().sort({ id: -1 })

  return posts
}

export async function findKeyword(sortBy: string, keyword: string) {
  const posts = await Board.find({ [sortBy]: { $regex: keyword } }).sort({ id: -1 })

  return posts
}

export async function findPostLog(id: string) {
  const post = await Board.findOne({ id: +id })

  return post
}

export async function updateAndFindPost(id: string) {
  await Board.updateOne({ id: +id }, { $inc: { viewCount: 1 } })

  const post = await Board.findOne({ id: +id })

  return post
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
    id: +postId,
    user_id: userId,
  })
}

export async function findLogoutPost(postId: string) {
  const result = await Board.findOne({
    id: +postId,
  })

  return result?.password
}

export async function deleteLogoutPost(postId: string) {
  const result = await Board.deleteOne({
    id: +postId,
  })

  return result
}

export const updateLoginPost: Types.UpdateLoginPost<string> = async (id, userId, title, text) => {
  await Board.updateOne({ id: +id, user_id: userId }, { $set: { title, text } })
}

export async function updateLogoutPost(id: string, title: string, nickname: string, text: string) {
  const result = await Board.findOneAndUpdate({ id: +id }, { $set: { title, nickname, text } })

  return result
}

export async function updateRecommend(postId: string, id: string) {
  await Board.updateOne({ id: +postId }, { $addToSet: { recommend: id } })
}
