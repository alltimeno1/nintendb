"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { client, connectCollection } = require('./mongo');
const scraping_1 = require("./scraping");
async function main(URI, reset) {
    try {
        const games = await connectCollection('games');
        const gameList = await (0, scraping_1.default)(URI);
        if (reset === 'y') {
            await games.deleteMany({});
        }
        await games.insertMany(gameList);
        await client.close();
        console.log('Database updated!!');
    }
    catch (error) {
        console.log(error);
    }
}
main(process.argv[2], process.argv[3]);
