import React from 'react';
import { Link } from 'react-router-dom';
import NavSidebar from './NavSidebar';

const PortfolioScreen: React.FC = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white font-display">
            <NavSidebar />
            <main className="flex-1 h-full overflow-y-auto flex justify-center py-8 px-4 md:px-10 lg:px-20">
                <div className="w-full max-w-[1200px] flex flex-col gap-8">
                    {/* Page Header & Stats */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-[#283039] pb-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Media Portfolio</h1>
                                <p className="text-[#9dabb9] text-base font-normal">Tracking analysis history, bias detection, and reliability assessment.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 bg-[#283039] hover:bg-[#3b4754] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm">
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                    Export Report
                                </button>
                                <Link to="/submission" className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    New Log
                                </Link>
                            </div>
                        </div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-[#3b4754] relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[64px] text-white">military_tech</span>
                                </div>
                                <p className="text-[#9dabb9] text-sm font-medium uppercase tracking-wider">Scout Rank</p>
                                <p className="text-white text-2xl font-bold">Eagle Scout</p>
                                <div className="w-full bg-[#283039] h-1.5 rounded-full mt-2">
                                    <div className="bg-primary h-1.5 rounded-full" style={{width: "85%"}}></div>
                                </div>
                                <p className="text-xs text-[#9dabb9] mt-1">150 XP to next rank</p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-[#3b4754] relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[64px] text-white">verified</span>
                                </div>
                                <p className="text-[#9dabb9] text-sm font-medium uppercase tracking-wider">Avg. Reliability</p>
                                <p className="text-white text-2xl font-bold">88%</p>
                                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                    +4.2% from last month
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-[#3b4754] relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[64px] text-white">balance</span>
                                </div>
                                <p className="text-[#9dabb9] text-sm font-medium uppercase tracking-wider">Bias Tendency</p>
                                <p className="text-white text-2xl font-bold">Center-Left</p>
                                <p className="text-xs text-[#9dabb9] mt-1">Based on last 15 logs</p>
                            </div>
                        </div>
                    </div>
                    {/* Media Bias Map Section */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 flex flex-col rounded-xl border border-[#3b4754] bg-surface-dark overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3b4754] bg-[#1a2430]">
                                <h3 className="text-white text-lg font-bold">Submission Map</h3>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-xs text-[#9dabb9]"><span className="w-2 h-2 rounded-full bg-primary"></span> High Quality</span>
                                    <span className="flex items-center gap-1 text-xs text-[#9dabb9]"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Mixed</span>
                                    <span className="flex items-center gap-1 text-xs text-[#9dabb9]"><span className="w-2 h-2 rounded-full bg-red-500"></span> Low Quality</span>
                                </div>
                            </div>
                            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] chart-grid bg-[#131b24] p-8">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold text-[#9dabb9] uppercase tracking-widest bg-[#131b24] px-2 rounded">Original Fact Reporting</div>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold text-[#9dabb9] uppercase tracking-widest bg-[#131b24] px-2 rounded">Fabrication / Propaganda</div>
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] md:text-xs font-bold text-[#9dabb9] uppercase tracking-widest">Extreme Left</div>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] md:text-xs font-bold text-[#9dabb9] uppercase tracking-widest">Extreme Right</div>
                                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20"></div>
                                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
                                <div className="absolute top-[10%] left-0 right-0 h-px border-t border-dashed border-green-500/30"></div>
                                <div className="absolute bottom-[20%] left-0 right-0 h-px border-t border-dashed border-red-500/30"></div>
                                {/* Points */}
                                <div className="absolute left-[48%] top-[15%] group cursor-pointer z-10 hover:z-20">
                                    <div className="size-8 rounded-full bg-surface-dark border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(19,127,236,0.5)] transition-transform group-hover:scale-125">
                                        <span className="material-symbols-outlined text-[16px] text-white">article</span>
                                    </div>
                                </div>
                                <div className="absolute left-[25%] top-[40%] group cursor-pointer z-10 hover:z-20">
                                    <div className="size-8 rounded-full bg-surface-dark border-2 border-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-transform group-hover:scale-125">
                                        <span className="material-symbols-outlined text-[16px] text-white">podcasts</span>
                                    </div>
                                </div>
                                <div className="absolute left-[85%] top-[75%] group cursor-pointer z-10 hover:z-20">
                                    <div className="size-8 rounded-full bg-surface-dark border-2 border-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-transform group-hover:scale-125">
                                        <span className="material-symbols-outlined text-[16px] text-white">public</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Side Panel */}
                        <div className="w-full lg:w-[360px] flex flex-col rounded-xl border border-[#3b4754] bg-surface-dark">
                            <div className="p-6 border-b border-[#3b4754]">
                                <h4 className="text-sm font-bold text-[#9dabb9] uppercase tracking-wider">Recently Inspected</h4>
                                <div className="mt-4 flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-white">The Daily Voice</h3>
                                    <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">Mixed</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">"Healthcare Debate Heats Up"</p>
                            </div>
                            <div className="p-6 flex-1 flex flex-col gap-4">
                                <div>
                                    <p className="text-xs text-[#9dabb9] font-medium mb-1">Analysis Log #12</p>
                                    <p className="text-sm text-white leading-relaxed">Found significant use of emotional appeals in paragraph 3. The author uses terms like "catastrophic" and "heartless" without providing data to back up the claims.</p>
                                </div>
                                <div className="bg-[#131b24] p-3 rounded-lg border border-[#283039]">
                                    <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">format_quote</span>
                                        Flagged Evidence
                                    </p>
                                    <p className="text-xs text-white italic pl-2 border-l-2 border-orange-500">"...this legislation is a heartless attack on the most vulnerable..."</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-[#3b4754]">
                                    <button className="w-full flex justify-center items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-lg transition-colors text-sm font-medium">
                                        View Full Scout Report
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Scout Reports Table */}
                     <div className="overflow-x-auto rounded-xl border border-[#3b4754] bg-surface-dark">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#131b24] text-[#9dabb9] text-xs uppercase tracking-wider">
                                    <th className="p-4 font-medium border-b border-[#3b4754]">Date</th>
                                    <th className="p-4 font-medium border-b border-[#3b4754]">Article Title</th>
                                    <th className="p-4 font-medium border-b border-[#3b4754]">Source</th>
                                    <th className="p-4 font-medium border-b border-[#3b4754]">Reliability</th>
                                    <th className="p-4 font-medium border-b border-[#3b4754]">Detected Bias</th>
                                    <th className="p-4 font-medium border-b border-[#3b4754] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-[#283039]">
                                <tr className="hover:bg-[#283039]/50 transition-colors">
                                    <td className="p-4 text-white whitespace-nowrap">Oct 24, 2023</td>
                                    <td className="p-4 text-white font-medium">Global Summit Outcomes</td>
                                    <td className="p-4 text-[#9dabb9]">AP News</td>
                                    <td className="p-4"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-[#283039] rounded-full overflow-hidden"><div className="h-full bg-primary w-[98%]"></div></div><span className="text-white text-xs">98%</span></div></td>
                                    <td className="p-4 text-[#9dabb9]">Center</td>
                                    <td className="p-4 text-right"><span className="material-symbols-outlined text-[20px] text-[#9dabb9] cursor-pointer">visibility</span></td>
                                </tr>
                                <tr className="hover:bg-[#283039]/50 transition-colors">
                                    <td className="p-4 text-white whitespace-nowrap">Oct 21, 2023</td>
                                    <td className="p-4 text-white font-medium">Healthcare Debate</td>
                                    <td className="p-4 text-[#9dabb9]">The Daily Voice</td>
                                    <td className="p-4"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-[#283039] rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[72%]"></div></div><span className="text-white text-xs">72%</span></div></td>
                                    <td className="p-4 text-[#9dabb9]">Skew Left</td>
                                    <td className="p-4 text-right"><span className="material-symbols-outlined text-[20px] text-[#9dabb9] cursor-pointer">visibility</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PortfolioScreen;