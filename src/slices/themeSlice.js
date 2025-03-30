
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkmode: false,
    },
    reducers: {
        toggleTheme : (state) =>{
            state.isDarkmode = !state.isDarkmode;
            document.body.style.backgroundColor = state.isDarkmode ? 'black' : 'white'; 
        }
    }
});

export const {toggleTheme}  = themeSlice.actions;
export default themeSlice.reducer;