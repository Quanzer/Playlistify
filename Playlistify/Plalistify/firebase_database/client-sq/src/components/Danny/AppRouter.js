import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './test';
import Room from './Room'; 

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/room" element={<Room />} />
                {/* 其他路由 */}
            </Routes>
        </Router>
    );
}

export default AppRouter;
