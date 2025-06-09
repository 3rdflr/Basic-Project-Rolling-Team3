import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage.jsx';
import WritePaper from './pages/WritePaper/WritePaper';
import RollingPaperPage from './pages/RollingPaparPage/RollingPaperPage';
import MessagePage from './pages/MessagePage/MessagePage.jsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/list" element={<ListPage />} />
				<Route path="/post" element={<WritePaper />} />
				<Route path="/post/:id" element={<RollingPaperPage />} />
				<Route path="/post/:id/message" element={<MessagePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
