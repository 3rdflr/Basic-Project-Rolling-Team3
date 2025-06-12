import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WritePaper from './pages/WritePaper/WritePaper';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<WritePaper />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
