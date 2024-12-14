import { BadRequestException, Injectable } from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {PostDto} from "./dto/post.dto";

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService
    ) {
    }

    async getById(id: string) {
        return this.prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    async getAll() {
        return this.prisma.post.findMany()
    }

    async create(dto: PostDto) {
        const oldPost = await this.prisma.post.findUnique({
            where: {
                name: dto.name
            }
        })

        if (oldPost) throw new BadRequestException('Such a position exists')

        return this.prisma.post.create({
            data: {
                ...dto
            }
        })
    }

    async update(postId: string, dto: Partial<PostDto>) {
        return this.prisma.post.update({
            where: {
                id: postId
            },
            data: dto
        })
    }

    async delete(postId: string) {
        return this.prisma.post.delete({
            where: {
                id: postId
            }
        })
    }
}
