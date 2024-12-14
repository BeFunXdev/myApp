import {Controller, Get, Param} from '@nestjs/common';
import { AiApiService } from './ai-api.service';

@Controller('ai-api')
export class AiApiController {
  constructor(private readonly aiApiService: AiApiService) {
  }

  @Get(':id')
  async getPrompt(@Param("id") employeeId: string) {
    return this.aiApiService.getPrompt(employeeId)
  }
}
