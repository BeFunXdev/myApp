import { Module } from '@nestjs/common';
import { AiApiService } from './ai-api.service';
import { AiApiController } from './ai-api.controller';
import {PrismaService} from "../prisma.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({
    timeout: 1000,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    httpsAgent: new (require('https').Agent)({
      rejectUnauthorized: false // Отключаем проверку SSL
    })
  })],
  controllers: [AiApiController],
  providers: [AiApiService, PrismaService],
})
export class AiApiModule {}
