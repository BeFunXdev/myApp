import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import {PrismaService} from "../prisma.service";
import { PostService } from '../post/post.service'

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, PostService],
})
export class EmployeeModule {}
