import { EmployeeService } from './employee.service';
import { EmployeeDto } from "./dto/employee.dto";
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
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
    update(employeeId: string, dto: EmployeeDto): Promise<{
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
