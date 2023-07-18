import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import toast from 'react-hot-toast';

import API_URL from '../../../config';
import auth from '../../../lib/firebase';

export interface ILocalUser {
  name: string;
  email: string;
  id: string;
}

export interface IUser {
  name: string;
  email: string | null;
}
interface IInitialState {
  user: ILocalUser;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ISignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  user: {
    name: '',
    email: '',
    id: '',
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({
    name,
    email,
    password,
  }: ISignupCredentials): Promise<ILocalUser | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      let id: string = '';
      const { user } = response;
      if (user) {
        user.getIdToken().then((accessToken) => {
          axios
            .post(
              `${API_URL}/api/v1/auth/signup`,
              { name, email: user.email },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((res) => {
              if (res.data.success) {
                id = res.data.data.id;
                localStorage.setItem('token', accessToken);
                localStorage.setItem(
                  'user',
                  JSON.stringify({
                    name: res.data.data.name,
                    email: user.email,
                    id: res.data.data.id,
                  }),
                );
                toast.success('Signup successfull!');
              }
            })
            .catch((err) => {
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error('Something went wrong!');
              }
            });
        });
      }
      return { name: user.displayName!, email: user.email!, id };
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong!');
      }
      return null;
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({
    email,
    password,
  }: ILoginCredentials): Promise<ILocalUser | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await signInWithEmailAndPassword(auth, email, password);
      let id: string = '';
      const { user } = response;
      if (user) {
        const accessToken = await user.getIdToken();
        const apiResponse = await axios.post(
          `${API_URL}/api/v1/auth/login`,
          { email: user.email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (apiResponse.data.success) {
          localStorage.setItem('token', accessToken);
          id = apiResponse.data.data.id;
          localStorage.setItem(
            'user',
            JSON.stringify({
              name: apiResponse.data.data.name,
              email: user.email,
              id: apiResponse.data.data.id,
            }),
          );
          toast.success('Logged in successfully!');
        } else {
          toast.error('Login failed!');
        }
      }
      return { name: user.displayName!, email: user.email!, id };
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong!');
      }
      return null;
    }
  },
);

export const loginUserWithGoogle = createAsyncThunk(
  'user/loginUserWithGoogle',
  async (): Promise<ILocalUser | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await signInWithPopup(auth, provider);
      const { user } = response;
      let id: string = '';
      if (user) {
        user.getIdToken().then((accessToken) => {
          axios
            .post(
              `${API_URL}/api/v1/auth/login`,
              { email: user.email, name: user.displayName },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem('token', accessToken);
                id = res.data.data.id;
                localStorage.setItem(
                  'user',
                  JSON.stringify({
                    name: res.data.data.name,
                    email: user.email,
                    id: res.data.data.id,
                  }),
                );
                toast.success('Logged in successfully!');
              }
            })
            .catch((err) => {
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error('Something went wrong!');
              }
            });
        });
      }
      return { name: user.displayName!, email: user.email!, id };
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong!');
      }
      return null;
    }
  },
);

export const createUserWithGoogle = createAsyncThunk(
  'user/createUserWithGoogle',
  async (): Promise<ILocalUser | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await signInWithPopup(auth, provider);
      let id: string = '';
      const { user } = response;
      if (user) {
        user.getIdToken().then((accessToken) => {
          axios
            .post(
              `${API_URL}/api/v1/auth/signup`,
              { email: user.email, name: user.displayName },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((res) => {
              if (res.data.success) {
                id = res.data.data.id;
                localStorage.setItem('token', accessToken);
                localStorage.setItem(
                  'user',
                  JSON.stringify({
                    name: res.data.data.name,
                    email: user.email,
                    id: res.data.data.id,
                  }),
                );
                toast.success('Signup successfull!');
              }
            })
            .catch((err) => {
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error('Something went wrong!');
              }
            });
        });
      }
      return { name: user.displayName!, email: user.email!, id };
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong!');
      }
      return null;
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (): Promise<void> => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILocalUser>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload!;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload!;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload!;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(createUserWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUserWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload!;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(createUserWithGoogle.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: '', email: '', id: '' };
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
