"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res) {
    const { message, status } = err;
    return res.send({ message, status });
}
exports.default = errorMiddleware;
