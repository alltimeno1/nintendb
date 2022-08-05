"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const throwError_1 = require("./throwError");
async function getCurrency() {
    try {
        const response = await axios_1.default.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
        return response.data[0]?.basePrice;
    }
    catch (error) {
        return (0, throwError_1.default)(500, '환율 정보를 가져올 수 없습니다.');
    }
}
exports.default = getCurrency;
