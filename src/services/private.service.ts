import { MyBucket } from '../models/bucket'
import { connectCollection } from '../utils/mongo'

async function findMyBucket(id: string) {
  const buckets = await connectCollection('buckets')

  return await buckets.findOne({ id })
}

async function findBucketList(bucket: MyBucket | null) {
  const games = await connectCollection('games')

  return await games.find({ name: { $in: bucket?.list || [] } }).toArray()
}

async function updateItem(id: string, titleName: string) {
  const buckets = await connectCollection('buckets')

  return await buckets.updateOne({ id }, { $pull: { list: titleName } })
}

async function updateItems(id: string) {
  const buckets = await connectCollection('buckets')

  return await buckets.updateOne({ id }, { $set: { list: [] } })
}

export { findMyBucket, findBucketList, updateItem, updateItems }
