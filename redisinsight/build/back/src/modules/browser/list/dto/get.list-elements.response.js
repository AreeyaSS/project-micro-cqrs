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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListElementsResponse = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
class GetListElementsResponse extends dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of elements in the currently-selected list.',
    }),
    __metadata("design:type", Number)
], GetListElementsResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => String,
        description: 'Array of elements.',
        isArray: true,
    }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], GetListElementsResponse.prototype, "elements", void 0);
exports.GetListElementsResponse = GetListElementsResponse;
