"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwError(status, message) {
    const error = new Error(message);
    error.status = status;
    throw error;
}
exports.default = throwError;
