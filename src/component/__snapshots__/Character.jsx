import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';

const Character = ({ character = {} }) => {
    const navigate = useNavigate();
    const charactersState = useSelector((state) => state.characters);
    const { list = [] } = charactersState || {};

    return (
        <div

           //  i have used default prop so that is by chance data will not be fetched then default value can be used
            className="character-card"
            data-testid="character-card"
            onClick={() => navigate(`/character/${character.id}`)}
        >
            <img
                className="character-image" data-testid = "character-image"
                src={character.image || "fallback-image-url"}
                alt={character.name || "Unknown Character"}
            />
            <div className="character-info">
                <p className="character-name" data-testid = "character-name">Name: {character.name || "Unknown"}</p>
                <p className="character-species">Species: {character.species || "Unknown"}</p>
                <p className="character-status" data-testid = "character-status">
                    Status:{" "}
                    <span className={character.status?.toLowerCase() || "unknown"}>
                        {character.status || "Unknown"}
                    </span>
                </p>
            </div>
        </div>
    );
};


export default Character;
