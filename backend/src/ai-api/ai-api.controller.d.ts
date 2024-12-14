import { AiApiService } from './ai-api.service';
export declare class AiApiController {
    private readonly aiApiService;
    constructor(aiApiService: AiApiService);
    getPrompt(employeeId: string): Promise<import("axios").AxiosResponse<any, any>>;
}
