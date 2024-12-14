'use client'
import { useQuery } from '@tanstack/react-query'
import { employeeService } from '@/service/employee.service'
import { useEffect, useState } from 'react'
import { IEmployeeResponse } from '@/types/employee.types'

export function useEmployee() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['employee'],
		queryFn: () => employeeService.getAll()
	})

	const [items, setItems] = useState<IEmployeeResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, isLoading, isSuccess }
}