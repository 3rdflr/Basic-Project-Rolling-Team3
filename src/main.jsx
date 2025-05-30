import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/global.css';
import './styles/variables.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
