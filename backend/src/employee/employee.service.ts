import { Injectable, NotFoundException } from '@nestjs/common'
import {PrismaService} from "../prisma.service";
import {EmployeeDto} from "./dto/employee.dto";
import { PostService } from '../post/post.service'

@Injectable()
export class EmployeeService {
    constructor(
        private prisma: PrismaService,
        private postService: PostService
    ) {
    }

    async getAll() {
        return this.prisma.employee.findMany({
            include: {
                post: true
            }
        })
    }

    async create(dto: EmployeeDto) {
        const post = await this.validatePost(dto)
        return this.prisma.employee.create({
            data: {
                ...dto,
                post: {
                    connect: {
                        id: post.id
                    }
                }
            }
        })
    }

    async update(employeeId: string, dto: Partial<EmployeeDto>) {
        return this.prisma.employee.update({
            where: {
                id: employeeId
            },
            data: {
                ...dto,
                post: {
                    connect: {
                        id: dto.post
                    }
                }
            }
        })
    }

    async delete(employeeId: string) {
        return this.prisma.employee.delete({
            where: {
                id: employeeId
            }
        })
    }

    private async validatePost(dto: EmployeeDto) {
        const post = await this.postService.getById(dto.post)

        if (!post) throw new NotFoundException('Post not found')

        return post
    }
}
