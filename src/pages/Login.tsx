/* eslint-disable react/jsx-one-expression-per-line */
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import Layout from '../layout/Layout';
import {
  loginUser,
  loginUserWithGoogle,
} from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hooks';

export default function Login() {
  interface Inputs {
    email: string;
    password: string;
  }
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  return (
    <Layout title="Login">
      <div className="min-h-[calc(100vh_-_80px)] flex flex-col justify-center">
        <h2 className="text-center text-3xl pt-10 pb-5">
          Login | <span className="text-secondary font-bold">Bookworm</span>
        </h2>
        <form
          className="flex flex-col gap-3 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="email"
            className="input input-bordered w-full max-w-xs input-primary"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-600">Email is required</p>}
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs input-primary"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="text-red-600">Password is required</p>
          )}
          <button className="btn btn-primary px-12" type="submit">
            Login
          </button>
          <p>Don&apos;t have an account?</p>
          <Link to="/signup">
            <button className="btn btn-link" type="button">
              Go to Signup page
            </button>
          </Link>
        </form>
        <div className="divider" />
        <div className="flex justify-center pb-10">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => dispatch(loginUserWithGoogle())}
          >
            <div className="flex justify-between items-center">
              <p className="pr-8">Login with google</p>
              <BsGoogle />
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
