import { createRoot } from 'react-dom/client';
import App from './App';
import Instrument from './Instrument';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const root = document.getElementById('root');
const header = createRoot(root);
header.render(<App support24Hour={false} />);

const instrument = document.getElementById('instrument');
const page = createRoot(instrument); // createRoot(container!) if you use TypeScript
page.render(<Instrument />);