import { Game } from '../models/title.model'
import { Comment } from '../models/comment.model'
import { Bucket } from '../models/bucket.model'
import { ObjectId } from 'mongodb'

export async function findTop10() {
  const top10 = await Game.find({}, { description: 0 }).sort({ rating: -1 }).limit(10)

  return top10
}

export async function findTitles(sort: string) {
  const title = await Game.find({}, { description: 0 }).sort({ [sort]: -1 })

  return title
}

export async function findByQuery(keyword: string) {
  const title = await Game.find({ name: { $regex: keyword } }, { description: 0 })

  return title
}

export async function findByTags(tags: string | string[]) {
  let title: object

  if (typeof tags === 'object') {
    const reg = tags.reduce((prev, curr) => `(?=.*${curr})` + prev, '.*')

    title = await Game.find({ tag: { $regex: reg } }, { description: 0 })
  } else {
    title = await Game.find({ tag: { $regex: tags } }, { description: 0 })
  }

  return title
}

export async function findTitleDetails(id: string) {
  const title = await Game.findOne({ name: id })
  const comment = await Comment.find({ game_id: id })

  return { title, comment }
}

export async function updateWishItem(id: string, gameId: string) {
  const bucket = await Bucket.findOne({ id })

  if (bucket) {
    await Bucket.updateOne({ id: id }, { $addToSet: { list: gameId } })
  } else {
    await Bucket.create({ id: id, list: [gameId] })
  }
}

export async function updateLoginComment(
  gameId: string,
  userId: string,
  displayName: string,
  text: string
) {
  await Comment.create({
    game_id: decodeURI(gameId),
    id: userId,
    name: displayName,
    text: text.replace(/\n/g, '<br>'),
  })
}

export async function updateLogoutComment(
  gameId: string,
  userName: string,
  password: string,
  text: string
) {
  await Comment.create({
    game_id: decodeURI(gameId),
    name: userName,
    password,
    text: text.replace(/\n/g, '<br>'),
  })
}

export async function deleteLoginComment(userId: string, commentId: string) {
  await Comment.deleteOne({
    _id: new ObjectId(commentId),
    id: userId,
  })
}

export async function findLogoutComment(commentId: string) {
  const result = await Comment.findOne({
    _id: new ObjectId(commentId),
  })

  return result?.password
}

export async function deleteLogoutComment(commentId: string) {
  const result = await Comment.findOneAndDelete({
    _id: new ObjectId(commentId),
  })

  return result
}
