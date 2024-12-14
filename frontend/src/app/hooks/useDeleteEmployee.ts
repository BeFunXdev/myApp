import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postService } from '@/service/post.service'
import { employeeService } from '@/service/employee.service'

const useDeleteEmployee = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteEmployee, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete employee'],
		mutationFn: (id: string) => employeeService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['employee']
			})
		}
	})

	return {deleteEmployee, isDeletePending}
}

export default useDeleteEmployee