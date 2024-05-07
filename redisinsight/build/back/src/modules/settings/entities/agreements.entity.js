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
exports.AgreementsEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const decorators_1 = require("../../../common/decorators");
let AgreementsEntity = class AgreementsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AgreementsEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last accepted version.',
        type: String,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgreementsEntity.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User agreements.',
        type: String,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, decorators_1.DataAsJsonString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgreementsEntity.prototype, "data", void 0);
AgreementsEntity = __decorate([
    (0, typeorm_1.Entity)('agreements')
], AgreementsEntity);
exports.AgreementsEntity = AgreementsEntity;
