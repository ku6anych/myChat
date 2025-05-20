import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IGlobalError, ILoginMutation, IRegisterMutation, IUser, IValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { logOutReducer } from './userSlice';

export interface RegisterAndLoadingResponse {
  user: IUser;
  message: string;
}

export const register = createAsyncThunk<
  RegisterAndLoadingResponse,
  IRegisterMutation,
  { rejectValue: IValidationError }
>('users/register', async (registerForm, { rejectWithValue }) => {
  try {
    const dataForm = new FormData();
    const keys = Object.keys(registerForm) as (keyof IRegisterMutation)[];
    keys.forEach((key) => {
      const value = registerForm[key];
      if (value !== null) {
        dataForm.append(key, value);
      }
    });
    const { data } = await axiosApi.post('/users', dataForm);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const login = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'users/login',
  async (loginForm, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterAndLoadingResponse>('/users/sessions', loginForm);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const logOutThunk = createAsyncThunk<void, void>('users/logOutThunk', async (_arg, { dispatch }) => {
  await axiosApi.delete('/users/sessions', { withCredentials: true });
  await dispatch(logOutReducer());
});
