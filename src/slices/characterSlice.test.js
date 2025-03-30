
import characterReducer, {setPage, fetchCharacters} from './characterSlice';

const initialState  = {
      list : [],
      currentPage : 1,
      totalPages : 1,
      loading : false,
      error : null,
};

describe("test the characterslice component", ()=>{

    it("should run the initial state", ()=>{
      expect(characterReducer(undefined, {})).toEqual(initialState);
    });
    
    it("should handle the page reducer", ()=>{
        const newstate = characterReducer(initialState,setPage(2));
        expect(newstate.currentPage).toEqual(2);
    });

    it("should handle the fetchcharacter.pending",()=>{
        const newstate = characterReducer(initialState, {type : fetchCharacters.pending.type});
        expect(newstate.loading).toEqual(true);
        expect(newstate.error).toBe(null);
    });

    it("should handle the fetchcharacter.fulfilled", ()=>{
        const payload = {results : [{id:1, name : "Rick Sanchez"}], info : {pages : 3}};
        const newstate = characterReducer(initialState, {type: fetchCharacters.fulfilled.type , payload});

        expect(newstate.loading).toBe(false);
        expect(newstate.totalPages).toBe(3);
        expect(newstate.list).toEqual(payload.results);
    });

    it("should handle the fetchcharacter.rejected", ()=>{
        const newstate = characterReducer(initialState, {type: fetchCharacters.rejected.type});
        expect(newstate.loading).toEqual(false);
        expect(newstate.error).toBe("Failed to load data.");
    });
});