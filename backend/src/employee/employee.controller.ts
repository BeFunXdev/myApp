import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {EmployeeDto} from "./dto/employee.dto";

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAll() {
    return this.employeeService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: EmployeeDto) {
    return this.employeeService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') employeeId: string, dto: EmployeeDto) {
    return this.employeeService.update(employeeId, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param("id") employeeId: string) {
    return this.employeeService.delete(employeeId)
  }
}
