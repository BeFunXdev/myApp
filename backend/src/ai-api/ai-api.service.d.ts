import { PrismaService } from "../prisma.service";
import { HttpService } from "@nestjs/axios";
export declare class AiApiService {
    private prisma;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    getPrompt(employeeId: string): Promise<import("axios").AxiosResponse<any, any>>;
    private gigaChatPrompt;
    private getPromptData;
}
