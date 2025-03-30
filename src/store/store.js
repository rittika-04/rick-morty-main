import { configureStore, combineReducers } from '@reduxjs/toolkit';
import characterReducer from '../slices/characterSlice';
import searchReducer from '../slices/searchSlice';
import themeReducer from '../slices/themeSlice';

// Combine reducers
export const rootReducer = combineReducers({
  characters: characterReducer,
  search: searchReducer,
  theme: themeReducer,
});

// Function to set up the store with default states if needed
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      characters: preloadedState.characters || { 
        list: [], 
        loading: false, 
        currentPage: 1, 
        totalPages: 1, 
        error: null 
      },
      search: preloadedState.search || { text: "" },
      theme: preloadedState.theme || { darkMode: false },
    },  
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};


export default setupStore;
