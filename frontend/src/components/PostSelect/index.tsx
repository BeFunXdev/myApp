import SelectInput from '@/components/ui/Select'
import { Control, Controller } from 'react-hook-form'
import { TypeEmployeeFormState } from '@/types/employee.types'
import { usePost } from '@/app/hooks/usePost'

interface IPostSelectProps {
	control: Control<TypeEmployeeFormState, unknown>
}

const PostSelect = ({control}: IPostSelectProps) => {
	const {items} = usePost()

	return (
		<Controller
			control={control}
			rules={{
				required: "Полу должно быть обязательно заполнено",
			}}
			render={({ field: {value, onChange}, formState: {errors} }) => {
				console.log('log', value)
				return (
					<SelectInput  value={value} onChange={onChange} data={items} error={!!errors.post?.message} helperText={errors.post?.message ?? ''}/>
				)
			}}
			name='post'
		/>
	)
}

export default PostSelect