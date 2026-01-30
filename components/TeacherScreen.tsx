import React from 'react';
import NavSidebar from './NavSidebar';

const TeacherScreen: React.FC = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <NavSidebar role="teacher" />
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
                <header className="h-20 flex-shrink-0 border-b border-slate-800 bg-background-dark/80 backdrop-blur-md sticky top-0 z-20 px-6 sm:px-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Command Center</h2>
                        <p className="text-slate-400 text-sm mt-0.5">Period 3 Journalism • Manage scouts and review submissions</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-card-dark text-slate-300 hover:bg-card-hover hover:text-white transition-all text-sm font-medium">
                            <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                            Switch Class
                        </button>
                        <button className="md:hidden p-2 text-white">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto flex flex-col gap-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-card-dark p-6 rounded-xl border border-slate-800 flex flex-col gap-3 group hover:border-slate-700 transition-all">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-400 text-sm font-medium">Total Active Scouts</p>
                                    <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">group</span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <p className="text-white text-3xl font-bold tracking-tight">32</p>
                                    <div className="flex items-center text-[#0bda5b] text-xs font-bold mb-1.5 bg-[#0bda5b]/10 px-2 py-0.5 rounded-full">
                                        <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>12%
                                    </div>
                                </div>
                            </div>
                            <div className="bg-card-dark p-6 rounded-xl border border-slate-800 flex flex-col gap-3 group hover:border-slate-700 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <p className="text-slate-400 text-sm font-medium">Pending Reviews</p>
                                    <span className="material-symbols-outlined text-primary">rate_review</span>
                                </div>
                                <div className="flex items-end gap-3 relative z-10">
                                    <p className="text-white text-3xl font-bold tracking-tight">8</p>
                                    <p className="text-primary text-sm font-medium mb-1.5 animate-pulse">Needs Attention</p>
                                </div>
                            </div>
                            <div className="bg-card-dark p-6 rounded-xl border border-slate-800 flex flex-col gap-3 group hover:border-slate-700 transition-all">
                                <div className="flex justify-between items-start">
                                    <p className="text-slate-400 text-sm font-medium">Class Average XP</p>
                                    <span className="material-symbols-outlined text-amber-500">military_tech</span>
                                </div>
                                <div className="flex items-end gap-3">
                                    <p className="text-white text-3xl font-bold tracking-tight">2,450</p>
                                    <p className="text-slate-500 text-sm font-medium mb-1.5">Level 4 Avg</p>
                                </div>
                            </div>
                        </div>
                        {/* Split Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="col-span-1 lg:col-span-2 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 p-1 relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                                <div className="bg-[#131b25]/90 backdrop-blur-sm h-full rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500 text-white">Event Ready</span>
                                            <p className="text-indigo-400 text-xs font-medium">Monthly Challenge</p>
                                        </div>
                                        <h3 className="text-white text-xl font-bold">Breaking News Battle</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-md">The monthly simulated newsroom crisis event is ready to launch. Students will have 45 minutes to fact-check the 'Viral Deepfake' scenario.</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-3 min-w-[140px]">
                                        <button className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-900/50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">rocket_launch</span>
                                            Launch
                                        </button>
                                        <span className="text-slate-500 text-xs">Cooldown: Ready</span>
                                    </div>
                                </div>
                            </div>
                            {/* Actions */}
                            <div className="col-span-1 bg-card-dark border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
                                <h3 className="text-white text-sm font-bold uppercase tracking-wider text-opacity-80">Quick Actions</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <button className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-left group">
                                        <div className="w-10 h-10 rounded-md bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center text-rose-400"><span className="material-symbols-outlined">gavel</span></div>
                                        <div className="flex flex-col"><span className="text-sm font-bold">Moderate Content</span><span className="text-xs text-slate-500">Edit or remove posts</span></div>
                                    </button>
                                    <button className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-left group">
                                        <div className="w-10 h-10 rounded-md bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center text-emerald-400"><span className="material-symbols-outlined">download</span></div>
                                        <div className="flex flex-col"><span className="text-sm font-bold">Export Data</span><span className="text-xs text-slate-500">To Google Sheets</span></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Submission Queue (Simplified) */}
                        <div className="overflow-hidden rounded-xl border border-slate-800 bg-card-dark">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800/50 border-b border-slate-700">
                                        <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[200px]">Student</th>
                                        <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[240px]">Article Title</th>
                                        <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-32">Status</th>
                                        <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-32 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-sm">
                                    <tr className="hover:bg-card-hover transition-colors">
                                        <td className="p-4"><span className="font-medium text-white">Alice Johnson</span></td>
                                        <td className="p-4"><span className="text-slate-200">"Mayor's Budget Proposal Analysis"</span></td>
                                        <td className="p-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Pending</span></td>
                                        <td className="p-4 text-right"><button className="bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">Review</button></td>
                                    </tr>
                                    <tr className="hover:bg-card-hover transition-colors">
                                        <td className="p-4"><span className="font-medium text-white">Mark Smith</span></td>
                                        <td className="p-4"><span className="text-slate-200">"Local Sports Recap"</span></td>
                                        <td className="p-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">Flagged</span></td>
                                        <td className="p-4 text-right"><button className="bg-primary hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">Review</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeacherScreen;