import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { EmployeeModule } from './employee/employee.module';
import { AiApiModule } from './ai-api/ai-api.module';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
      HttpModule,
      PostModule,
      EmployeeModule,
      AiApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
