import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage';
import WritePaper from './pages/WritePaper/WritePaper';
import RollingPaperPage from './pages/RollingPaparPage/RollingPaperPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/additem" element={<ListPage />} />
				<Route path="/post/:id" element={<RollingPaperPage />} />
				<Route path="/post/:id/message" element={<WritePaper />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
