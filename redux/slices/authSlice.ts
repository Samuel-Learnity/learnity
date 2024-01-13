import {AsyncThunk, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from "../../axios";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UserTypes} from "../../types/userTypes";
import {Animated} from "react-native";
import delay = Animated.delay;

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    user: UserTypes | null
}

export interface AuthResponse {
    token: string;
}

export const fetchUser: AsyncThunk<any, { token: string }, AsyncThunkConfig> =
    createAsyncThunk(
        'auth/fetchUser',
        async (credentials) => {
            try {
                const response = await axiosInstance.post('/user', credentials);
                return response.data
            } catch (error) {
                console.log("fetchUserFailed")
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
            state.user = null;
            AsyncStorage.removeItem('@jwtToken');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login use cases
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                AsyncStorage.setItem('@jwtToken', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })

            // Register use cases
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.error = null;
                AsyncStorage.setItem('@jwtToken', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed';
            })

            // FETCH USER PROFILE USE CASES
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Fetch user failed';
            });
    },
});

export const {logoutUser, setToken} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
