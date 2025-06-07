import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage.jsx';
import WritePaper from './pages/WritePaper/WritePaper';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/list" element={<ListPage />} />
				<Route path="/post" element={<WritePaper />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
