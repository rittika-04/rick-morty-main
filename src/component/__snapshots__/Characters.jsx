import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters, setPage } from "../slices/characterSlice";
import Character from "./Character";
import Shimmer from "./Shimmer";

const Characters = () => {

    const dispatch = useDispatch();
    const { list = [], currentPage = 1, totalPages = 1, loading = false, error = null } =
    useSelector((state) => state.characters) || {};

    const searchText = useSelector((state) => state.search.text);

    useEffect(() => {
        dispatch(fetchCharacters(searchText));
    }, [dispatch, searchText, currentPage]);

    if (loading) {
        console.log("Shimmer should render now!");
        return <Shimmer />;
    }
    
    if (error) return <p className="error-message">{error}</p>;
    if (!list || list.length === 0) return (
        <p data-testid="no-characters-message">No Characters Found...</p>
    );

    return (
        <div className="characters-container">
            {list.map((character) => (
                <div key={character.id} className="character-item" data-testid = "character-item">
                    <Character character={character} />
                </div>
            ))}

            <div className="pagination">
                <button onClick={() => dispatch(setPage(Math.max(currentPage - 1, 1)))} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => dispatch(setPage(Math.min(currentPage + 1, totalPages)))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Characters;



