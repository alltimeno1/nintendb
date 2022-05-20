import { Game } from '../models/title.model'
import { Bucket } from '../models/bucket.model'

async function findMyBucket(id: string) {
  return await Bucket.findOne({ id })
}

async function findBucketList(bucket: Types.MyBucket | null) {
  return await Game.find({ name: { $in: bucket?.list || [] } })
}

async function updateItem(id: string, titleName: string) {
  return await Bucket.updateOne({ id }, { $pull: { list: titleName } })
}

async function updateItems(id: string) {
  return await Bucket.updateOne({ id }, { $set: { list: [] } })
}

export { findMyBucket, findBucketList, updateItem, updateItems }
