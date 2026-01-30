import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardScreen from './components/DashboardScreen';
import SubmissionScreen from './components/SubmissionScreen';
import PortfolioScreen from './components/PortfolioScreen';
import TeacherScreen from './components/TeacherScreen';
import { Role } from './types';

const App: React.FC = () => {
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (window.google && window.google.script) {
                window.google.script.run
                    .withSuccessHandler((userRole: Role) => {
                        setRole(userRole);
                        setLoading(false);
                    })
                    .withFailureHandler((err: any) => {
                        console.error("Auth check failed", err);
                        setRole('student'); // Default to student on error
                        setLoading(false);
                    })
                    .getUserRole();
            } else {
                // Dev mode fallback
                setRole('teacher'); // Default to teacher in dev for easy testing
                setLoading(false);
            }
        };

        // Add a small delay to ensure Google Apps Script API is fully initialized
        const timer = setTimeout(checkAuth, 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background-dark text-white">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-4xl animate-spin text-primary">donut_large</span>
                    <p className="font-display font-medium text-sm text-gray-400">Authenticating Credentials...</p>
                </div>
            </div>
        );
    }

    const isTeacher = role === 'teacher';

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<DashboardScreen isTeacher={isTeacher} />} />
                <Route path="/submission" element={<SubmissionScreen isTeacher={isTeacher} />} />
                <Route path="/portfolio" element={<PortfolioScreen isTeacher={isTeacher} />} />
                <Route 
                    path="/teacher" 
                    element={isTeacher ? <TeacherScreen /> : <Navigate to="/" replace />} 
                />
            </Routes>
        </HashRouter>
    );
};

export default App;