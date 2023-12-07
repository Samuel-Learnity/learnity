import {createSlice, createAsyncThunk, AsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from "../../axios";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {User} from "../../types/user";

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    user: User | null
}

export interface AuthResponse {
    token: string;
}

export interface fetchUserResponse {
    username: string
    email: string
}

export const fetchUser: AsyncThunk<any, { token: string }, AsyncThunkConfig> =
    createAsyncThunk(
        'auth/fetchUser',
        async (credentials) => {
            try {
                const response = await axiosInstance.post('/user', credentials);
                console.log("fetch request", response.data)
                return response.data
            } catch (error) {
                // @ts-ignore
                throw new Error(error.message);
            }
        }
    );

export const loginUser: AsyncThunk<AuthResponse, { email: string, password: string }, AsyncThunkConfig> =
    createAsyncThunk(
        'auth/loginUser',
        async (credentials) => {
            try {
                const response = await axiosInstance.post('/login', credentials);
                return response.data as AuthResponse
            } catch (error) {
                // @ts-ignore
                throw new Error(error.message);
            }
        }
    );

export const registerUser =
    createAsyncThunk(
        'auth/registerUser',
        async (credentials: { email: string; password: string; username: string }) => {
            try {
                const response = await axiosInstance.post('/register', credentials);
                return response.data as AuthResponse;
            } catch (error) {
                throw new Error('Registration failed');
            }
        });

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        status: 'idle',
        error: null,
        user: null,
    } as AuthState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logoutUser: (state) => {
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login use cases
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                console.log('STATE ========= LOADING')
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                AsyncStorage.setItem('@jwtToken', action.payload.token);
                console.log('STATE ========= SUCCEEDED')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
                console.log('STATE ========= ERROR', action.error.message)
            })

            // Register use cases
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                console.log('STATE ========= LOADING')
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.error = null;
                console.log('STATE ========= SUCCEEDED')
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed';
                console.log('STATE ========= ERROR', action.error.message)
            })

            // FETCH USER PROFILE USE CASES
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                console.log('STATE ========= FETCH USER LOADING');
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                console.log('STATE ========= FETCH USER SUCCEEDED');
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Fetch user failed';
                console.log('STATE ========= FETCH USER ERROR', action.error.message);
            });
    },
});

export const {logoutUser, setToken} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
