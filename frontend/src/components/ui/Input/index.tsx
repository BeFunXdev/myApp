import { forwardRef } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export const Input = forwardRef<
	HTMLInputElement,
	TextFieldProps
>(({...rest}, ref) => {
	return <TextField ref={ref} {...rest} />
})

Input.displayName = 'Input'