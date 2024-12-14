import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeEmployeeFormState } from '@/types/employee.types'
import { employeeService } from '@/service/employee.service'

export function useCreateEmployee () {
	const queryClient = useQueryClient()

	const { mutate: createEmployee } = useMutation({
		mutationKey: ['create employee'],
		mutationFn: (data: TypeEmployeeFormState) => employeeService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['employee']
			})
		}
	})

	return { createEmployee }
}