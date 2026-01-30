import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavSidebar from './NavSidebar';
import { Report } from '../types';

interface DashboardScreenProps {
    isTeacher?: boolean;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ isTeacher = false }) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (window.google && window.google.script) {
            window.google.script.run
                .withSuccessHandler((data: Report[]) => {
                    setReports(data);
                    setLoading(false);
                })
                .withFailureHandler((err: any) => {
                    console.error("Failed to load reports", err);
                    setLoading(false);
                })
                .getRecentReports();
        } else {
            // Mock data for dev
            setTimeout(() => {
                setReports([
                    {
                        timestamp: new Date().toISOString(),
                        student: "Cmdr. Alex Chen",
                        url: "#",
                        sourceName: "Dev Daily",
                        author: "Test User",
                        bias: 0,
                        reliability: 90,
                        evidence: "Mock evidence",
                        wordCount: 100,
                        xp: 150,
                        status: "Verified"
                    }
                ]);
                setLoading(false);
            }, 1000);
        }
    }, []);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
            <NavSidebar role="student" canSwitchToTeacher={isTeacher} />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header Section */}
                <header className="flex-none px-8 py-6 w-full max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Mission Control</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Commander. Ready to uncover the truth?</p>
                        </div>
                        <Link to="/submission" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined">add_circle</span>
                            Submit New Report
                        </Link>
                    </div>
                </header>
                {/* Scrollable Dashboard Grid */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                        {/* Left Column (Stats & Leveling) */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Level Progress Card */}
                            <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                    <span className="material-symbols-outlined text-[120px] text-primary">verified_user</span>
                                </div>
                                <div className="flex justify-between items-end mb-4 relative z-10">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                                            Current Rank
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Bias Hunter</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Level 2 Scout</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-primary">850 <span className="text-lg text-gray-400 font-medium">/ 1200 XP</span></p>
                                    </div>
                                </div>
                                <div className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 rounded-full" style={{width: "70%"}}></div>
                                    <div className="absolute top-0 left-[25%] h-full w-0.5 bg-white/20"></div>
                                    <div className="absolute top-0 left-[50%] h-full w-0.5 bg-white/20"></div>
                                    <div className="absolute top-0 left-[75%] h-full w-0.5 bg-white/20"></div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-right">350 XP to Level 3</p>
                            </div>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Total XP */}
                                <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                            <span className="material-symbols-outlined">bolt</span>
                                        </div>
                                        <span className="text-xs font-medium text-accent-success bg-accent-success/10 px-2 py-0.5 rounded">+150 Today</span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total XP</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2,450</p>
                                    </div>
                                </div>
                                {/* Articles Verified */}
                                <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                            <span className="material-symbols-outlined">fact_check</span>
                                        </div>
                                        <span className="text-xs font-medium text-accent-success bg-accent-success/10 px-2 py-0.5 rounded">+2 New</span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Reports Verified</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                                    </div>
                                </div>
                                {/* Bias Detected Rate */}
                                <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                                            <span className="material-symbols-outlined">radar</span>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. 92%</span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Bias Detection</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                                    </div>
                                </div>
                            </div>
                            {/* Recent Logs Table */}
                            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden min-h-[300px]">
                                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Mission Logs</h3>
                                    <Link to="/portfolio" className="text-primary text-sm font-medium hover:underline">View All</Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#151e29]">
                                                <th className="px-5 py-3">Report Title / Source</th>
                                                <th className="px-5 py-3">Status</th>
                                                <th className="px-5 py-3">XP Earned</th>
                                                <th className="px-5 py-3 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-8 text-gray-500">
                                                        <span className="material-symbols-outlined animate-spin text-3xl">refresh</span>
                                                        <p className="text-xs mt-2">Decrypting Archives...</p>
                                                    </td>
                                                </tr>
                                            ) : reports.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="text-center py-8 text-gray-500">No reports filed yet, Commander.</td>
                                                </tr>
                                            ) : (
                                                reports.map((report, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-[#253041] transition-colors group">
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-primary">
                                                                    <span className="material-symbols-outlined text-[20px]">article</span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate max-w-[200px]">{report.sourceName}</p>
                                                                    <p className="text-xs text-gray-500">{report.author || 'Unknown Agent'}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                {report.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4 text-sm font-bold text-accent-success">+{report.xp} XP</td>
                                                        <td className="px-5 py-4 text-sm text-gray-500 text-right">
                                                            {new Date(report.timestamp).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Right Column (Map & Sidebar extras) */}
                        <div className="flex flex-col gap-6">
                            {/* Global Coverage Map */}
                            <div className="bg-white dark:bg-card-dark rounded-xl p-0 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[300px]">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#151e29] flex justify-between items-center">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Coverage Area</h3>
                                    <span className="material-symbols-outlined text-gray-400 text-sm">public</span>
                                </div>
                                <div className="flex-1 relative bg-[#111418] w-full">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" style={{backgroundImage: "url('https://placeholder.pics/svg/300')"}}></div>
                                    <div className="absolute inset-0" style={{backgroundImage: "radial-gradient(#137fec 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.1}}></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-8 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(19,127,236,0.6)] animate-pulse"></div>
                                    <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-accent-warning rounded-full shadow-[0_0_8px_1px_rgba(245,158,11,0.6)]"></div>
                                    <div className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-accent-success rounded-full shadow-[0_0_8px_1px_rgba(11,218,91,0.6)]"></div>
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white border border-white/10">3 Active Zones</div>
                                </div>
                            </div>
                            {/* Achievements / Badges Mini */}
                            <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">Recent Badges</h3>
                                    <span className="text-xs text-primary hover:underline cursor-pointer">View All</span>
                                </div>
                                <div className="flex gap-3 justify-start">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20" title="First Story">
                                        <span className="material-symbols-outlined text-[20px]">star</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20" title="Fact Checker">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                </div>
                            </div>
                            {/* Callout */}
                            <div className="bg-gradient-to-br from-primary-dark to-primary rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <span className="material-symbols-outlined text-6xl">campaign</span>
                                </div>
                                <h3 className="font-bold text-lg mb-1 relative z-10">Weekly Challenge</h3>
                                <p className="text-sm text-blue-100 mb-4 relative z-10 leading-relaxed">Find an article with logical fallacies and submit a correction report.</p>
                                <button className="w-full py-2 bg-white text-primary font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors relative z-10">Accept Mission (+300 XP)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardScreen;