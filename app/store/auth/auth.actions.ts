import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuthData } from '@/services/auth/auth.helper'
import { IAuthFields } from '@/components/layout/header/auth-form/interfaces/auth-form.interface'
import { getAuthUrl } from '../../configs/api.config'
import { toastError } from '@/utils/api.utils'
import { AuthService } from '@/services/auth/auth.service'
import { toastr } from 'react-redux-toastr'

export const register = createAsyncThunk<IAuthData, IAuthFields>(
	getAuthUrl('/register'),
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.register(email, password)
			toastr.success('Регистрация', 'Успешно выполнена')
			return response
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<IAuthData, IAuthFields>(
	getAuthUrl('/login'),
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password)
			toastr.success('Вход в систему', 'Успешно выполнен')
			return response
		} catch (e) {
			toastError(e)
			return thunkAPI.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk(getAuthUrl('/logout'), async () => {
	return {}
})
