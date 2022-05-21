"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraping_1 = require("./scraping");
const title_model_1 = require("../models/title.model");
const { connect, disconnect } = require('./mongo');
async function main(URI, reset) {
    try {
        const gameList = await (0, scraping_1.default)(URI);
        connect();
        if (reset === 'y') {
            await title_model_1.Game.deleteMany({});
        }
        if (gameList) {
            await title_model_1.Game.insertMany(gameList);
            console.log('Database updated!!');
        }
        disconnect();
    }
    catch (error) {
        console.log(error);
    }
}
main(process.argv[2], process.argv[3]);
