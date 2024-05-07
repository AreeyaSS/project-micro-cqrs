"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_redis_params_decorator_1 = require("../../../decorators/api-redis-params.decorator");
const browser_client_metadata_decorator_1 = require("../decorators/browser-client-metadata.decorator");
const decorators_1 = require("../../../common/decorators");
const models_1 = require("../../../common/models");
const interceptors_1 = require("../../../common/interceptors");
const dto_1 = require("./dto");
const hash_service_1 = require("./hash.service");
let HashController = class HashController {
    constructor(hashService) {
        this.hashService = hashService;
    }
    async createHash(clientMetadata, dto) {
        return await this.hashService.createHash(clientMetadata, dto);
    }
    async getMembers(clientMetadata, dto) {
        return await this.hashService.getFields(clientMetadata, dto);
    }
    async addMember(clientMetadata, dto) {
        return await this.hashService.addFields(clientMetadata, dto);
    }
    async deleteFields(clientMetadata, dto) {
        return await this.hashService.deleteFields(clientMetadata, dto);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ description: 'Set key to hold Hash data type' }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.CreateHashWithExpireDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.CreateHashWithExpireDto]),
    __metadata("design:returntype", Promise)
], HashController.prototype, "createHash", null);
__decorate([
    (0, common_1.Post)('/get-fields'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        description: 'Get specified fields of the hash stored at key by cursor position',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Specified fields of the hash stored at key.',
        type: dto_1.GetHashFieldsResponse,
    }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.GetHashFieldsDto]),
    __metadata("design:returntype", Promise)
], HashController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiOperation)({
        description: 'Add the specified fields to the Hash stored at key',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.AddFieldsToHashDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.AddFieldsToHashDto]),
    __metadata("design:returntype", Promise)
], HashController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)('/fields'),
    (0, swagger_1.ApiOperation)({
        description: 'Remove the specified fields from the Hash stored at key',
    }),
    (0, api_redis_params_decorator_1.ApiRedisParams)(),
    (0, swagger_1.ApiBody)({ type: dto_1.DeleteFieldsFromHashDto }),
    (0, decorators_1.ApiQueryRedisStringEncoding)(),
    __param(0, (0, browser_client_metadata_decorator_1.BrowserClientMetadata)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata,
        dto_1.DeleteFieldsFromHashDto]),
    __metadata("design:returntype", Promise)
], HashController.prototype, "deleteFields", null);
HashController = __decorate([
    (0, swagger_1.ApiTags)('Browser: Hash'),
    (0, common_1.UseInterceptors)(interceptors_1.BrowserSerializeInterceptor),
    (0, common_1.Controller)('hash'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [hash_service_1.HashService])
], HashController);
exports.HashController = HashController;
