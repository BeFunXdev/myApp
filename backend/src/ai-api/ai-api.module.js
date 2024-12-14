"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiApiModule = void 0;
const common_1 = require("@nestjs/common");
const ai_api_service_1 = require("./ai-api.service");
const ai_api_controller_1 = require("./ai-api.controller");
const prisma_service_1 = require("../prisma.service");
const axios_1 = require("@nestjs/axios");
let AiApiModule = class AiApiModule {
};
exports.AiApiModule = AiApiModule;
exports.AiApiModule = AiApiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [ai_api_controller_1.AiApiController],
        providers: [ai_api_service_1.AiApiService, prisma_service_1.PrismaService],
    })
], AiApiModule);
//# sourceMappingURL=ai-api.module.js.map