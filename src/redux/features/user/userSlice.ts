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

interface IInitialState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredentials {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentials): Promise<string | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = response;
      if (user) {
        user.getIdToken().then((accessToken) => {
          axios
            .post(
              `${API_URL}/api/v1/auth/login`,
              { email: user.email },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('user-email', email);
                toast.success('Signup successfull!');
              }
            })
            .catch(() => {
              toast.error('Signup failed!');
            });
        });
      }
      return response.user.email;
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
//   'user/loginUser',
//   async ({ email, password }: ICredentials): Promise<string | null> => {
//     const provider = new GoogleAuthProvider();
//     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//     const response = await signInWithEmailAndPassword(auth, email, password);
//     const { user } = response;
//     if (user) {
//       user.getIdToken().then((accessToken) => {
//         axios
//           .post(
//             `${API_URL}/api/v1/auth/login`,
//             { email: user.email },
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             },
//           )
//           .then((res) => {
//             if (res.data.success) {
//               localStorage.setItem('token', accessToken);
//               toast.success('Logged in successfull!');
//             }
//           })
//           .catch(() => {
//             toast.error('Login failed!');
//           });
//       });
//     } else {
//       toast.error('Login failed!');
//     }
//     return response.user.email;
//   },
// );

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: ICredentials): Promise<string | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await signInWithEmailAndPassword(auth, email, password);
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
          localStorage.setItem('user-email', email);
          toast.success('Logged in successfully!');
        }
      }
      return response.user.email;
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
  async (): Promise<string | null> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const response = await signInWithPopup(auth, provider);
      const { user } = response;
      if (user) {
        user.getIdToken().then((accessToken) => {
          axios
            .post(
              `${API_URL}/api/v1/auth/login`,
              { email: user.email },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then((res) => {
              if (res.data.success) {
                localStorage.setItem('token', accessToken);
                if (user.email) {
                  localStorage.setItem('user-email', user.email);
                }
                toast.success('Logged in successfully!');
              }
            })
            .catch(() => {
              toast.error('Login failed!');
            });
        });
      }
      return user.email;
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
    setUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload!;
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
        state.user.email = action.payload;
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
        state.user.email = action.payload;
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
        state.user.email = action.payload!;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(loginUserWithGoogle.rejected, (state, action) => {
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
        state.user.email = null;
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
