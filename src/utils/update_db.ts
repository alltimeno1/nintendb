import scrapTitleInfo from './scraping'
import { Game } from '../models/title.model'
const { connect, disconnect } = require('./mongo')

async function main(URI: string, reset: string) {
  try {
    const gameList = await scrapTitleInfo(URI)

    connect()

    if (reset === 'y') {
      await Game.deleteMany({})
    }

    if (gameList) {
      await Game.insertMany(gameList)

      console.log('Database updated!!')
    }

    disconnect()
  } catch (error) {
    console.log(error)
  }
}

main(process.argv[2], process.argv[3])
