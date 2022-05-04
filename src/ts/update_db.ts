const { client, connectCollection } = require('./mongo')
import scrapTitleInfo from './scraping'

async function main(URI: string, reset: string) {
  try {
    const games = await connectCollection('games')

    const gameList = await scrapTitleInfo(URI)

    if (reset === 'y') {
      await games.deleteMany({})
    }

    await games.insertMany(gameList)

    await client.close()

    console.log('Database updated!!')
  } catch (error) {
    console.log(error)
  }
}

main(process.argv[2], process.argv[3])
