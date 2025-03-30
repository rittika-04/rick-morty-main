
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../services/Api';

// Async Thunk for fetching characters
export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (searchText, { getState }) => {
        console.log("Inside fetchCharacters thunk, text:", searchText);
        const { currentPage } = getState().characters;
        const response = await fetchData(searchText, currentPage);
        return response;
    }
);

const characterSlice = createSlice({

    // we will pass 3 parameter to createslice function name, initialstate, reducers

    name: 'characters',
    initialState: {
        list: [],
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload?.results || [];
                state.totalPages = action.payload?.info?.pages || 1;
            })
            .addCase(fetchCharacters.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load data.";
            });
    }
});

export const { setPage } = characterSlice.actions;
export default characterSlice.reducer;
