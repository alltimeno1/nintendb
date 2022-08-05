import { Game } from '../models/title.model'
import { Bucket } from '../models/bucket.model'

export async function findMyBucket(id: string) {
  const bucket = await Bucket.findOne({ id })
  return bucket
}

export async function findBucketList(bucket: Types.MyBucket | null) {
  const games = await Game.find(
    { name: { $in: bucket?.list || [] } },
    { image: 1, name: 1, price: 1, rating: 1 }
  )
  return games
}

export async function updateItem(id: string, titleName: string) {
  await Bucket.updateOne({ id }, { $pull: { list: titleName } })
}

export async function deleteItems(id: string) {
  await Bucket.deleteOne({ id })
}
