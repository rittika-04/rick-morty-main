import { Tsunami } from "@mui/icons-material";
import searchReducer, { setSearchText } from "../slices/searchSlice";

describe("searchSlice", () => {

    // ensure that reducer initalizes with text " "
    test("should return the initial state", () => {
        const initialState = searchReducer(undefined, { type: undefined });
        expect(initialState).toEqual({ text: "" });
    });

    test("should update search when searchtext has been updated", ()=>{
        const prevstate = {text : " "};
        const newstate = searchReducer(prevstate, setSearchText("Spiderman"));
        expect(newstate).toEqual({text : "Spiderman"});
    })
    test("should create setSearchText action with correct payload", () => {
        const action = setSearchText("Batman");
        expect(action).toEqual({ type: "search/setSearchText", payload: "Batman" });
    });
});