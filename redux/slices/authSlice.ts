import {createSlice, createAsyncThunk, AsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from "../../axios";

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface LoginResponse {
    token: string;
}

export const loginUser: AsyncThunk<LoginResponse, { email: string; password: string }, {}> =
    createAsyncThunk(
        'auth/loginUser',
        async (credentials) => {
            try {
                const response = await axiosInstance.post('/login', credentials);
                return response.data as LoginResponse
            } catch (error) {
                throw new Error('Login failed');
            }
        }
    );

export const registerUser =
    createAsyncThunk(
        'auth/registerUser',
        async (credentials: { email: string; password: string; username: string }) => {
            try {
                const response = await axiosInstance.post('/register', credentials);
                console.log(response.status, response.data)
                return response.data;
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
    } as AuthState,
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                console.log('STATE ========= LOADING')
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                console.log('STATE ========= SUCCEEDED')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
                console.log('STATE ========= ERROR', action.error.message)
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                console.log('STATE ========= LOADING')
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token; // Récupérer un user plutôt ?
                state.error = null;
                console.log('STATE ========= SUCCEEDED')
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed';
                console.log('STATE ========= ERROR', action.error.message)
            });
    },
});

export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
