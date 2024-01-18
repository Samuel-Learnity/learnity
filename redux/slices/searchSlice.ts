import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AutocompleteItem} from "../../types/searchTypes";
import {axiosInstance} from "../../axios";
import {AuthResponse, loginUser} from "./authSlice";

interface SearchState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    query: string;
    suggestions: AutocompleteItem[];
    error: string | null,
}

const initialState: SearchState = {
    status: 'idle',
    query: '',
    suggestions: [],
    error: null,
};

export const searchAutocomplete =
    createAsyncThunk(
        'search/autocomplete',
        async (query: string) => {
            try {
                const response = await axiosInstance.post('/autocomplete', query);
                return response.data as AutocompleteItem[];
            } catch (error) {
                throw new Error('Registration failed');
            }
        });

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchAutocomplete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchAutocomplete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.suggestions = action.payload;
            })
            .addCase(searchAutocomplete.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
    }}
);

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
