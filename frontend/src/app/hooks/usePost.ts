import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IPostResponse } from '@/types/post.types'
import { postService } from '@/service/post.service'

export function usePost() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['post'],
		queryFn: () => postService.getAll()
	})

	const [items, setItems] = useState<IPostResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, isLoading, isSuccess }
}