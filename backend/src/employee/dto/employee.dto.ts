import {IsOptional, IsString, MinLength} from "class-validator";

export class EmployeeDto {
    @IsString()
    @MinLength(3, {
        message: "The name must be longer than 3 characters"
    })
    @IsOptional()
    name: string

    @IsString()
    @MinLength(4, {
        message: "The last name must be longer than 4 characters"
    })
    @IsOptional()
    surname: string

    @IsString()
    @MinLength(4, {
        message: "The patronymic must be longer than 4 characters"
    })
    @IsOptional()
    middleName: string

    @IsString()
    post: string
}