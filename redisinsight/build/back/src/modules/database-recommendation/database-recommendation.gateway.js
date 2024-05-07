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
exports.DatabaseRecommendationGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const config_1 = require("../../utils/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const constants_1 = require("./constants");
const database_recommendations_response_1 = require("./dto/database-recommendations.response");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let DatabaseRecommendationGateway = class DatabaseRecommendationGateway {
    notify(databaseId, data) {
        this.wss.of('/').emit(`${constants_1.RecommendationServerEvents.Recommendation}:${databaseId}`, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DatabaseRecommendationGateway.prototype, "wss", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.RecommendationServerEvents.Recommendation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, database_recommendations_response_1.DatabaseRecommendationsResponse]),
    __metadata("design:returntype", void 0)
], DatabaseRecommendationGateway.prototype, "notify", null);
DatabaseRecommendationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient })
], DatabaseRecommendationGateway);
exports.DatabaseRecommendationGateway = DatabaseRecommendationGateway;
