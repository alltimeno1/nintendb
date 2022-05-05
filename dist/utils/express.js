"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorType(error) {
    if (error instanceof Error) {
        return error.message;
    }
    else {
        return 'Unknown Error';
    }
}
exports.default = errorType;
