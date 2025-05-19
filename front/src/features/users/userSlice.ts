import { createSlice } from '@reduxjs/toolkit';
import type { IGlobalError, IUser, IValidationError } from '../../types';
import { login, register } from './usersThunk';

interface userSliceState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoagin: boolean;
  loginError: IGlobalError | null;
}

const initialState: userSliceState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoagin: false,
  loginError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.registerLoading = false;
        state.user = payload.user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoagin = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loginLoagin = false;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoagin = false;
        state.loginError = error || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoagin,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = usersSlice.reducer;
export const { selectLoginError, selectLoginLoading, selectRegisterError, selectRegisterLoading, selectUser } =
  usersSlice.selectors;
