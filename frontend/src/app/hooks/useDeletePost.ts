import { postService } from '@/service/post.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeletePost = () => {
	const queryClient = useQueryClient()

	const { mutate: deletePost, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete post'],
		mutationFn: (id: string) => postService.delete(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['post']
			})
		}
	})

	return {deletePost, isDeletePending}
}

export default useDeletePost