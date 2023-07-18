/* eslint-disable react/jsx-one-expression-per-line */
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsGoogle } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import {
  createUser,
  createUserWithGoogle,
} from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hooks';

export default function Signup() {
  const { state } = useLocation();
  const navigate = useNavigate();
  interface Inputs {
    name: string;
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
    dispatch(
      createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    ).then(() => {
      if (state?.pathname) {
        navigate(state?.pathname);
      } else {
        navigate('/');
      }
    });
  };

  const handleGoogleLogin = () => {
    dispatch(createUserWithGoogle()).then(() => {
      if (state?.pathname) {
        navigate(state?.pathname);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <Layout title="Signup">
      <div className="min-h-[calc(100vh_-_80px)] flex flex-col justify-center">
        <h2 className="text-center text-3xl pt-10 pb-5">
          Signup | <span className="text-secondary font-bold">Bookworm</span>
        </h2>
        <form
          className="flex flex-col gap-3 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full max-w-xs input-primary"
            {...register('name', { required: true })}
          />
          {errors.email && <p className="text-red-600">Email is required</p>}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs input-primary"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-600">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs input-primary"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="text-red-600">Password is required</p>
          )}

          <button className="btn btn-primary px-12" type="submit">
            Signup
          </button>
          <p>Already have an account?</p>
          <Link to="/login">
            <button className="btn btn-link" type="button">
              Go to login page
            </button>
          </Link>
        </form>
        <div className="divider" />
        <div className="flex justify-center pb-10">
          <button
            className="btn btn-accent"
            type="button"
            onClick={handleGoogleLogin}
          >
            <div className="flex justify-between items-center">
              <p className="pr-8">Signup with google</p>
              <BsGoogle />
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
