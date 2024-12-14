import { PrismaService } from "../prisma.service";
import { PostDto } from "./dto/post.dto";
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        name: string;
        id: string;
    }[]>;
    create(dto: PostDto): Promise<{
        name: string;
        id: string;
    }>;
    update(postId: string, dto: Partial<PostDto>): Promise<{
        name: string;
        id: string;
    }>;
    delete(postId: string): Promise<{
        name: string;
        id: string;
    }>;
}
