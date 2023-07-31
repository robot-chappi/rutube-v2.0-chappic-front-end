import { combineReducers } from 'redux'
import { authSlice } from '@/store/auth/auth.slice'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { api } from '@/store/api/api'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	toastr: toastrReducer
})
