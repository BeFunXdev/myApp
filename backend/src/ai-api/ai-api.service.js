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
exports.AiApiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const axios_1 = require("@nestjs/axios");
let AiApiService = class AiApiService {
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
        this.httpService.axiosRef.interceptors.request.use((config) => {
            const accessToken = this.httpService.post('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', JSON.stringify({
                'scope': 'GIGACHAT_API_PERS'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'RqUID': 'd5372802-3a8f-4095-a787-bf2ff89e0d34',
                    'Authorization': 'Basic YmRmZDkyZWItNTA2Yi00YjRjLWJiOTItNjg0YTMwY2Q2NzlkOjZkNTg4MDllLThiYTUtNDFkNS1hZWMyLWM2MjlkMDU0MjgxNw=='
                }
            });
            if (config?.headers && accessToken)
                config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });
        this.httpService.axiosRef.interceptors.response.use(config => config, async (error) => {
            const originalRequest = error.config;
            if (error?.response?.status === 401 &&
                !error.config._isRetry) {
                originalRequest._isRetry = true;
                return this.httpService.request(originalRequest);
            }
            throw error;
        });
    }
    async getPrompt(employeeId) {
        const employee = await this.prisma.employee.findFirst({
            where: {
                id: employeeId
            },
            include: {
                post: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return await this.gigaChatPrompt(employee);
    }
    async gigaChatPrompt(promptUser) {
        return this.httpService.axiosRef.post('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', this.getPromptData(promptUser), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });
    }
    getPromptData(employee) {
        const promptData = {
            model: "GigaChat",
            messages: [
                {
                    role: "user",
                    content: 'Напиши поздравления сотрудника с днем рождения '
                }
            ],
            n: 1,
            stream: false,
            max_tokens: 512,
            repetition_penalty: 1,
            update_interval: 0
        };
        promptData.messages[0].content += employee.surname + employee.name + employee.middleName + employee.post;
        return promptData;
    }
};
exports.AiApiService = AiApiService;
exports.AiApiService = AiApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], AiApiService);
//# sourceMappingURL=ai-api.service.js.map