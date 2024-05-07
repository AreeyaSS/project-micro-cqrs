"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudDatabaseInFailedStateException = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../../../../constants/error-messages");
const constants_1 = require("../../../../constants");
class CloudDatabaseInFailedStateException extends common_1.HttpException {
    constructor(message = error_messages_1.default.CLOUD_DATABASE_IN_FAILED_STATE, options) {
        const response = {
            message,
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            error: 'CloudDatabaseInFailedState',
            errorCode: constants_1.CustomErrorCodes.CloudDatabaseIsInTheFailedState,
        };
        super(response, response.statusCode, options);
    }
}
exports.CloudDatabaseInFailedStateException = CloudDatabaseInFailedStateException;
