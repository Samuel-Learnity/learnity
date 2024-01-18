import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {confirmSignUp, signIn, type SignInInput, signUp} from 'aws-amplify/auth';
import {fetchAuthSession} from "aws-amplify/src/auth";

interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'verifying';
    error: string | null;
    //--
    email: string | undefined,
    password: string | undefined,
    code: string | undefined,
    verifying: boolean,
}
//
//
// AUTOLOGIN
//
//

export const fetchAuthSessionThunk = createAsyncThunk(
    'auth/signUp',
    async (thunkAPI) => {
        try {
            await fetchAuthSession()
        } catch (error) {
            console.log('error fetchAuthSessionThunk',error)
            throw error
        }
    }
);

//
//
// LOGIN
//
//
export const signInThunk = createAsyncThunk(
    'auth/signUp',
    async ({username, password}: SignInInput, thunkAPI) => {
        try {
            if (password && username) {
                console.log(password, username)
                const result = await signIn({ username, password, options: { authFlowType: "USER_PASSWORD_AUTH" }});
                console.log("signin", result)
                // Do something async
                //thunkAPI.dispatch(setVerifying(true));
            }
        } catch (error) {
            console.log('error signin',error)
            alert(error);
            throw error
        }
    }
);

//
//
// REGISTER
//
//
export const confirmSignUpThunk = createAsyncThunk(
    'auth/signUpOrConfirmSignUp',
    async (props: { code?: string, email?: string }, thunkAPI) => {
        try {
            if ( props.code && props.email) {
                const result = await confirmSignUp({
                    username: props.email,
                    confirmationCode: props.code,
                });
                console.log("confirm", result)
                // Do something async
                //thunkAPI.dispatch(setScreen('login'));
            }
        } catch (error) {
            console.log("confirm", error)
            alert(error);
            throw error
        }
    }
);
export const signUpThunk = createAsyncThunk(
    'auth/signUp',
    async (props: { email?: string, password?: string}, thunkAPI) => {
        try {
            if (props.password && props.email) {
                const result = await signUp({
                    username: props.email,
                    password: props.password,
                });
                console.log("signup", result)
                // Do something async
                thunkAPI.dispatch(setVerifying(true));
            }
        } catch (error) {
            console.log(error)
            alert(error);
        }
    }
);

//
//
// REDUCERS
//
//
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        error: null,
        //
        email: '',
        password: '',
        code: '',
        verifying: false,
    } as AuthState,
    reducers: {
        setToken: (state, action) => {
        },
        logoutUser: (state) => {

        },
        //
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        },
        setVerifying: (state, action) => {
            state.verifying = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register use cases
            .addCase(signUpThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.password = ""
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.password = ""
                state.error = action.error.message || null;
            })
            .addCase(confirmSignUpThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(confirmSignUpThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                //AsyncStorage.setItem('@jwtToken', action.payload.token);
            })
            .addCase(confirmSignUpThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })
    },
});

export const {
    logoutUser,
    setToken,
    setCode,
    setVerifying,
    setPassword,
    setEmail
} = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
