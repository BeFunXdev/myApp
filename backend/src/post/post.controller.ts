import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { PostService } from './post.service';
import {PostDto} from "./dto/post.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll() {
    return this.postService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: PostDto) {
    return this.postService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') postId: string, @Body() dto: PostDto) {
    return this.postService.update(postId, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(":id")
  async delete(@Param('id') postId: string) {
    return this.postService.delete(postId)
  }
}
