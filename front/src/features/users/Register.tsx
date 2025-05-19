import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import type { IRegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { register } from './usersThunk';
import { selectRegisterError, selectRegisterLoading } from './userSlice';
import { useNavigate } from 'react-router-dom';
import FileInput from '../../components/UI/FileInput/FileInput';

const initialState: IRegisterMutation = {
  username: '',
  password: '',
  confirmPassword: '',
  avatar: null,
};

const Register = () => {
  const [userMutation, setUserMutation] = useState<IRegisterMutation>(initialState);
  const registerError = useAppSelector(selectRegisterError);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userMutation);

    await dispatch(register(userMutation)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    if (files) {
      setUserMutation((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="animate-bounce mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Account
            <AccountCircleIcon fontSize="large" />
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="username"
                  name="username"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white border p-2"
                />
                <small
                  style={{
                    color: getFieldError('username') ? 'red' : '#666',
                    fontSize: '12px',
                  }}
                >
                  {' '}
                  {getFieldError('username')}
                </small>
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
                <small
                  style={{
                    color: getFieldError('password') ? 'red' : '#666',
                    fontSize: '12px',
                  }}
                >
                  {getFieldError('password')}
                </small>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="confirmPassword"
                  required
                  autoComplete="confirmPassword"
                  className="block w-full rounded-md bg-white border p-2"
                />
                <small
                  style={{
                    color: getFieldError('confirmPassword') ? 'red' : '#666',
                    fontSize: '12px',
                  }}
                >
                  {getFieldError('confirmPassword')}
                </small>
              </div>
            </div>
            <div>
              <FileInput name="image" label="image" onGetFile={onChangeFile} />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
            <div>
              <p
                onClick={() => navigate('/login')}
                className="text-right underline text-blue-600 pointer-events-auto cursor-pointer"
              >
                Already have account?
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
