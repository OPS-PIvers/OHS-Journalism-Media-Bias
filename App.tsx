import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardScreen from './components/DashboardScreen';
import SubmissionScreen from './components/SubmissionScreen';
import PortfolioScreen from './components/PortfolioScreen';
import TeacherScreen from './components/TeacherScreen';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<DashboardScreen />} />
                <Route path="/submission" element={<SubmissionScreen />} />
                <Route path="/portfolio" element={<PortfolioScreen />} />
                <Route path="/teacher" element={<TeacherScreen />} />
            </Routes>
        </HashRouter>
    );
};

export default App;