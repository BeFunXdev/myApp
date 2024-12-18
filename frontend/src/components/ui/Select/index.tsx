import {
	CircularProgress,
	FormControl, FormControlProps, FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'
import { IPostResponse } from '@/types/post.types'

interface ISelectProps extends FormControlProps {
	value: string | IPostResponse | undefined
	onChange: (...event: unknown[]) => void
	data: IPostResponse[] | undefined
	helperText: string
}

const SelectInput = ({onChange, value, data, helperText, ...rest}: ISelectProps) => {
	return (
		<FormControl style={{width: 200}} {...rest}>
			<InputLabel>Должность</InputLabel>
			<Select
				defaultValue={''}
				value={typeof value == "object" ? value.id : value}
				onChange={onChange}
				label="Должность"
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{data ?
					data.map((item) => {
						return(
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						)
					}) : <CircularProgress size={15} />}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}

export default SelectInput