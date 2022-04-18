const { client, connectCollection } = require('./mongo')
const scrapTitleInfo = require('./crawling')

async function main() {
  const games = await connectCollection('games')

  const gameList = await scrapTitleInfo()

  // Reset
  await games.deleteMany({})

  await games.insertMany(gameList)

  await client.close()
}

main()
