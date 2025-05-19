import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import type { ILoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { selectLoginError, selectLoginLoading } from './userSlice';
import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from './usersThunk';

const initialState: ILoginMutation = {
  username: '',
  password: '',
};

const Login = () => {
  const [userMutation, setUserMutation] = useState(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginLoading = useAppSelector(selectLoginLoading);
  const loginError = useAppSelector(selectLoginError);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(userMutation)).unwrap();
    navigate('/');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="animate-bounce mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account <LoginIcon fontSize="large" />
          </h2>
          {loginError && <Alert severity="error">{loginError.error}</Alert>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onFormSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white border p-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white border p-2"
                />
              </div>
            </div>

            <div>
              <p
                onClick={() => navigate('/register')}
                className="text-right underline text-blue-600 pointer-events-auto cursor-pointer"
              >
                do not have account ?
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
