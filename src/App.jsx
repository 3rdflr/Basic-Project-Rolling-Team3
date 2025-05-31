import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/list" element={<ListPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
