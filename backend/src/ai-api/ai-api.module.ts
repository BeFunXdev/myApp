import { Module } from '@nestjs/common';
import { AiApiService } from './ai-api.service';
import { AiApiController } from './ai-api.controller';
import {PrismaService} from "../prisma.service";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({
    timeout: 1000
  })],
  controllers: [AiApiController],
  providers: [AiApiService, PrismaService],
})
export class AiApiModule {}
