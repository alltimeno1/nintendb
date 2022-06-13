"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorType(error) {
    if (error instanceof Error) {
        return error;
    }
    else {
        return new Error('Unknown Error');
    }
}
exports.default = errorType;
