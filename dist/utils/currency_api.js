"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
async function getCurrency() {
    try {
        const response = await axios_1.default.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
        return response.data[0]?.basePrice;
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = getCurrency;
