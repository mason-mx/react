import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Channel from './pages/channel';
import Module from './pages/module';
 
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/c/:chassis/s/:slot' element={<Module />} />
                <Route path='/c/:chassis/s/:slot/c/:channel' element={<Channel />} />
            </Routes>
        </Router>
    );
}
 
export default App;