import {IsOptional, IsString} from "class-validator";

export class PostDto {
    @IsString()
    @IsOptional()
    name
}