import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: { text: "" }, // ✅ Ensure text exists in initial state
    reducers: {
        setSearchText: (state, action) => {
            state.text = action.payload;
        }
    }
});

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;
