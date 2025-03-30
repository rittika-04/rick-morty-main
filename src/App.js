

import './App.css';
import { Provider } from 'react-redux';
import setupStore from './store/store';
import Header from './component/Header';
import Characters from './component/Characters';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterDetail from './pages/CharacterDetail';

function App() {

    const store = setupStore();
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Characters />} />
                        <Route path="/character/:id" element={<CharacterDetail />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;

