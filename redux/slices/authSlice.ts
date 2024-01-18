import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {autoSignIn, confirmSignUp, signIn, type SignInInput, signOut, signUp, SignUpOutput} from 'aws-amplify/auth';
import {fetchAuthSession} from "aws-amplify/src/auth";

interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'verifying';
    error: string | null;
    //--
    email: string | undefined,
    password: string | undefined,
    code: string | undefined,
    verifying: boolean,
    isAuthenticated: boolean
}

//
//
// SIGN OUT
//
//
export const signOutThunk = createAsyncThunk(
    'auth/signOut',
    async (thunkAPI) => {
        try {
            await signOut()
            console.log('signOutThunk ok')
        } catch (error) {
            console.log('error signOutThunk',error)
            throw error
        }
    }
);

//
//
// AUTOLOGIN
//
//
export const fetchAuthSessionThunk = createAsyncThunk(
    'auth/fetchAuthSession',
    async (thunkAPI) => {
        try {
            const { credentials } = await fetchAuthSession()
            return { ...credentials, expiration: credentials?.expiration?.toISOString() }
        } catch (error) {
            console.log('error fetchAuthSessionThunk',error)
            throw error
        }
    }
);

//
//
// AUTO SIGN IN AFTER REGISTER
//
//
export const autoSignInThunk = createAsyncThunk(
    'auth/autoSignIn',
    async (thunkAPI) => {
        try {
            const signInOutput = await autoSignIn()
            console.log('SIGN IN AFTER SIGNUP', signInOutput)
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
    'auth/signIn',
    async ({username, password}: SignInInput, thunkAPI) => {
        try {
            if (password && username) {
                console.log(password, username)
                const result = await signIn({ username, password, options: { authFlowType: "USER_PASSWORD_AUTH" }});
                console.log("signin", result)
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
    'auth/confirmSignUp',
    async (props: { code?: string, email?: string }, thunkAPI) => {
        try {
            if ( props.code && props.email) {
                const { nextStep } = await confirmSignUp({
                    username: props.email,
                    confirmationCode: props.code,
                });
                console.log("confirm", nextStep)

                try {
                    const signInOutput = await autoSignIn();
                    console.log(signInOutput)
                } catch (e) {
                    console.log(e)
                }
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
                const { nextStep } = await signUp({
                    username: props.email,
                    password: props.password,
                    options: {
                        userAttributes:{ email:props.email },
                        autoSignIn: true
                    },
                });
                console.log("signup", nextStep)
                return nextStep
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
        isAuthenticated: false,
    } as AuthState,
    reducers: {
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
            //
            // AUTOLOGIN REDUCERS
            //
            .addCase(fetchAuthSessionThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthSessionThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.isAuthenticated = action.payload.expiration !== undefined;
            })
            .addCase(fetchAuthSessionThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })

            //
            // LOGIN REDUCERS
            //
            .addCase(signInThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })

            //
            // LOG OUT REDUCERS
            //
            .addCase(signOutThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = false;
            })
            .addCase(signOutThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })

            //
            // SIGNUP REDUCERS
            //
            .addCase(signUpThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload?.signUpStep === 'CONFIRM_SIGN_UP') {
                    state.verifying = true
                } else if (action.payload?.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
                    // DO call to autoLogin() from aws-amplify
                }
                state.password = ""
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.password = ""
                state.error = action.error.message || null;
            })

            //
            // Confirm sign up reducers
            //
            .addCase(confirmSignUpThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(confirmSignUpThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })

            //
            // Auto signIn after sign up
            //
            .addCase(autoSignInThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(autoSignInThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.code = ""
                state.error = action.error.message || 'Confirmation of mail signup failed';
            })

    },
});

export const {
    setCode,
    setVerifying,
    setPassword,
    setEmail
} = authSlice.actions;

export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;
