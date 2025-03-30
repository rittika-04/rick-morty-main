import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../slices/searchSlice';
import { toggleTheme } from '../slices/themeSlice';
import { useLocation } from 'react-router-dom';
import logo from '../images/download.jpeg';

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isCharacterDetailPage = location.pathname.startsWith('/character/');
    
    const isDarkmode = useSelector((state) => state.theme.isDarkmode);
    const text = useSelector((state) => state.search.searchText); 

    if (isCharacterDetailPage) {
        return null; 
    }

    return (
        <div className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="logo" className="logo" />
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search By Name"
                        value={text}
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />
                </div>
                <button className='toggle-btn' onClick={() => dispatch(toggleTheme())}>
                    {isDarkmode ? 'Light' : 'Dark'}
                </button>
            </div>
        </div>
    );
};

export default Header;
