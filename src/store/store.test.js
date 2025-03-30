import setUpStore, { setupStore } from "./store";
import { rootReducer } from './store';
import { toggleTheme } from "../slices/themeSlice";

describe("we are testing the store", () => {
    test("should create a store", () => {
        const store = setupStore();
        expect(store).toBeDefined();

        expect(store.getState()).toEqual({
            characters: expect.any(Object),
            search: expect.any(Object),
            theme: expect.any(Object),
        });
    });

    test('should initialize store with preloaded state', () => {
        const preloadedState = {
          characters: { list: ['character1', 'character2'] },
          search: { query: 'hero' },
          theme: { darkMode: true },
        };
      
        const store = setupStore(preloadedState);
      
        expect(store.getState()).toEqual(preloadedState);
      });

      test('should update state when an action is dispatched', () => {
        const store = setupStore();
      
        store.dispatch(toggleTheme(true)); // Assuming `setTheme` action toggles darkMode
        expect(store.getState().theme.isDarkmode).toBe(true);
      });
      
      test('should combine reducers correctly', () => {
        const state = rootReducer(undefined, { type: '@@INIT' });
        expect(state).toHaveProperty('characters');
        expect(state).toHaveProperty('search');
        expect(state).toHaveProperty('theme');
      });
      
});
