import { Button, ListItem, ListItemBaseProps } from '@mui/material'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { IEmployeeResponse, TypeEmployeeFormState } from '@/types/employee.types'
import { Dispatch, SetStateAction } from 'react'
import { useCreateEmployee } from '@/app/hooks/useCreateEmployee'
import PostSelect from '@/components/PostSelect'

interface IEmployeeItemForm extends ListItemBaseProps {
	item: IEmployeeResponse
	setIsActive: () => void
	setItems: Dispatch<SetStateAction<IEmployeeResponse[] | undefined>>
}

const EmployeeItemForm = ({setItems, setIsActive, item}: IEmployeeItemForm) => {
	const { register, control, reset, handleSubmit } = useForm<TypeEmployeeFormState>({
		defaultValues: {
			name: item.name,
			middleName: item.middleName,
			surname: item.surname,
			post: item.post,
			DateOfEmployment: item.DateOfEmployment
		}
	})

	const {createEmployee} = useCreateEmployee()

	const onSubmit = (data: any) => {
		setIsActive()
		createEmployee(data)
	}

  return (
		<ListItem>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input label={'Фамилия'} {...register('surname')} />
				<Input label={'Имя'} {...register('name')} />
				<Input label={'Отчество'} {...register('middleName')} />
				<PostSelect control={control}/>
				<Button type={'submit'} variant="contained">Save</Button>
				<Button onClick={() => {
					setIsActive()
					setItems(prev => prev?.slice(0, -1))
				}} variant="contained">Delete</Button>
			</form>
		</ListItem>
	)
}

export default EmployeeItemForm