

import themeSlice, {toggleTheme} from './themeSlice';

describe("themeslice reducer test", ()=>{

    it("we will test for initial state", ()=>{
        // undefined means no previous state, and {} means no action have to take
        expect(themeSlice(undefined, {})).toEqual({isDarkmode : false});
    });

    it('should toggle theme state from false to true', () => {
        const prevState = { isDarkmode: false };
        const newState = themeSlice(prevState, toggleTheme());
        expect(newState.isDarkmode).toBe(true);
    });

    it("should toggle theme state from true to false", ()=>{
        const prevstate = {isDarkmode : true};
        const newState = themeSlice(prevstate, toggleTheme());
        expect(newState.isDarkmode).toEqual(false);
    })
});

