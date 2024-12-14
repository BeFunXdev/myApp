import SelectInput from '@/components/ui/Select'
import { Control, Controller } from 'react-hook-form'
import { TypeEmployeeFormState } from '@/types/employee.types'
import { usePost } from '@/app/hooks/usePost'

interface IPostSelectProps {
	control: Control<TypeEmployeeFormState, any>
}

const PostSelect = ({control}: IPostSelectProps) => {
	const {items, setItems, isSuccess, isLoading} = 	usePost()

	return (
		<Controller
			control={control}
			render={({ field: {value, onChange} }) => (
				<SelectInput value={value} onChange={onChange} data={items} />
			)}
			name='post'
		/>
	)
}

export default PostSelect