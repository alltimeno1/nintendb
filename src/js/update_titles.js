const { client, connectCollection } = require('./mongo')
const scrapTitleInfo = require('./crawling')

async function main() {
  try {
    const games = await connectCollection('games')

    const gameList = await scrapTitleInfo()

    // Reset
    await games.deleteMany({})

    await games.insertMany(gameList)

    await client.close()

    console.log('Database updated!!')
  } catch {
    console.log(error)
  }
}

main()
