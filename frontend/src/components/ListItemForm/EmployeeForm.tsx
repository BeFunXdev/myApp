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
	const { register, control, handleSubmit, formState: {errors} } = useForm<TypeEmployeeFormState>({
		defaultValues: {
			name: item.name,
			middleName: item.middleName,
			surname: item.surname,
			post: item.post
		}
	})

	const {createEmployee} = useCreateEmployee()

	const onSubmit = (data: TypeEmployeeFormState) => {
		setIsActive()
		createEmployee(data)
	}

  return (
		<ListItem>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input error={!!errors.surname?.message} helperText={errors.surname?.message} label={'Фамилия'} {...register('surname', {
					required: "Поле должно быть обязательно заполнено",
					minLength: {
						value: 4,
						message: "Минимальная длина фамилии должна быть не менее 4"
					},
					pattern: {
						value: /[A-Za-zА-Яа-я]/,
						message: "В фамилии могут быть только буквы"
					}
				})} />
				<Input error={!!errors.name?.message} helperText={errors.name?.message} label={'Имя'} {...register('name', {
					required: "Поле должно быть обязательно заполнено",
					minLength: {
						value: 3,
						message: "Минимальная длина имени должна быть не менее 3"
					},
					pattern: {
						value: /[A-Za-zА-Яа-я]/,
						message: "В имени могут быть только буквы"
					}
				})} />
				<Input error={!!errors.middleName?.message} helperText={errors.middleName?.message} label={'Отчество'} {...register('middleName', {
					required: "Поле должно быть обязательно заполнено",
					minLength: {
						value: 4,
						message: "Минимальная длина отчества должна быть не менее 4"
					},
					pattern: {
						value: /[A-Za-zА-Яа-я]/,
						message: "В отчестве могут быть только буквы"
					}
				})} />
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