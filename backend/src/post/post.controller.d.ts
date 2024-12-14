import { PostService } from './post.service';
import { PostDto } from "./dto/post.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAll(): Promise<{
        name: string;
        id: string;
    }[]>;
    create(dto: PostDto): Promise<{
        name: string;
        id: string;
    }>;
    update(postId: string, dto: PostDto): Promise<{
        name: string;
        id: string;
    }>;
    delete(postId: string): Promise<{
        name: string;
        id: string;
    }>;
}
