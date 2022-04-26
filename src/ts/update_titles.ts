const { client, connectCollection } = require('./mongo')
import scrapTitleInfo from './crawling'

async function main() {
  try {
    const games = await connectCollection('games')

    const gameList = await scrapTitleInfo()

    // Reset
    await games.deleteMany({})

    await games.insertMany(gameList)

    await client.close()

    console.log('Database updated!!')
  } catch (error) {
    console.log(error)
  }
}

main()
