import axiosClassic from "@/api/interceptors";
import { IEmployeeResponse, TypeEmployeeFormState } from '@/types/employee.types'

class EmployeeService {
    private BASE_URL = '/employee'

    async getAll() {
        return await axiosClassic.get<IEmployeeResponse[]>(this.BASE_URL)
    }

    async create(data: TypeEmployeeFormState) {
        return await axiosClassic.post<IEmployeeResponse>(this.BASE_URL, data)
    }

    async delete(employeeId: string) {
        return await axiosClassic.delete(this.BASE_URL + '/' + employeeId)
    }
}

export const employeeService = new EmployeeService()