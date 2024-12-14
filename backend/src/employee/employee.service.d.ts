import { PrismaService } from "../prisma.service";
import { EmployeeDto } from "./dto/employee.dto";
export declare class EmployeeService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        name: string;
        id: string;
        surname: string;
        middleName: string;
        DateOfEmployment: Date;
        postId: string;
    }[]>;
    create(dto: EmployeeDto): Promise<{
        name: string;
        id: string;
        surname: string;
        middleName: string;
        DateOfEmployment: Date;
        postId: string;
    }>;
    update(employeeId: string, dto: Partial<EmployeeDto>): Promise<{
        name: string;
        id: string;
        surname: string;
        middleName: string;
        DateOfEmployment: Date;
        postId: string;
    }>;
    delete(employeeId: string): Promise<{
        name: string;
        id: string;
        surname: string;
        middleName: string;
        DateOfEmployment: Date;
        postId: string;
    }>;
}
