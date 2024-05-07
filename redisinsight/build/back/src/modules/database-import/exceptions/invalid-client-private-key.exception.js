"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidClientPrivateKeyException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../constants/error-messages");
class InvalidClientPrivateKeyException extends common_1.HttpException {
    constructor(message = error_messages_1.default.INVALID_PRIVATE_KEY) {
        const response = {
            message,
            statusCode: 400,
            error: 'Invalid Client Private Key',
        };
        super(response, 400);
    }
}
exports.InvalidClientPrivateKeyException = InvalidClientPrivateKeyException;
