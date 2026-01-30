import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Role } from '../types';

interface NavSidebarProps {
  role?: Role;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ role = 'student' }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all";
    const activeClass = "bg-primary text-white group";
    const inactiveClass = "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800";

    const NavLinkItem = ({ to, icon, label, fillIcon = false }: { to: string, icon: string, label: string, fillIcon?: boolean }) => (
        <Link to={to} className={`${baseClass} ${isActive(to) ? activeClass : inactiveClass}`}>
            <span className={`material-symbols-outlined ${fillIcon ? 'icon-fill' : ''}`}>{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );

    if (role === 'teacher') {
         return (
            <aside className="w-64 flex-shrink-0 flex flex-col border-r border-slate-800 bg-background-dark h-full hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">W</div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-base font-bold leading-none tracking-tight">The Weekly Scout</h1>
                        <span className="text-slate-500 text-xs font-normal mt-1">Teacher Edition</span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
                     <NavLinkItem to="/teacher" icon="dashboard" label="Dashboard" />
                     <NavLinkItem to="/" icon="groups" label="Student View (Home)" />
                     <NavLinkItem to="/submission" icon="article" label="Test Submission" />
                     <NavLinkItem to="/portfolio" icon="bar_chart" label="Test Portfolio" />
                     <NavLinkItem to="#" icon="settings" label="Settings" />
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-700 bg-center bg-cover" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAyXA-0pv2WIVQ3bRdn7n_LLOpj07lfAHPc5DE4C_CeKWuyWzdflAFEw7GItmirw4GP9XjDQqPW1tjfg4is-qer4Ltq8B4V3o8QRYvQ0IfILPqckn20Bg8F-r3S_4EfNdTdWh1sQEIUzQ5fuCXqYSsATW3UeUKvgdxG7ZtvHm12R-EWHEEjnzShBUulAhY7BqWJRmh3wM_ysN1pEPfts265Nz7fb3q1l17DGSjVqE0SY5qEHKXj4d7Lpmb9ABdTTzgy01NEohGF-Ehn')"}}></div>
                        <div className="text-left">
                            <p className="text-sm font-medium text-white">Mr. Anderson</p>
                            <p className="text-xs text-slate-500">Period 3 • Journalism</p>
                        </div>
                    </button>
                </div>
            </aside>
        )
    }

    // Student Sidebar
    return (
        <aside className="flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-card-light dark:bg-[#111418] transition-colors duration-200 flex-shrink-0">
            <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined icon-fill">newspaper</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">The Weekly Scout</h1>
            </div>
            <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
                <NavLinkItem to="/" icon="dashboard" label="Mission Control" fillIcon={true} />
                <NavLinkItem to="/portfolio" icon="public" label="My Portfolio Map" />
                <NavLinkItem to="/submission" icon="post_add" label="Submit Report" />
                <NavLinkItem to="/teacher" icon="school" label="Teacher View" />
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
                    <NavLinkItem to="#" icon="settings" label="Settings" />
                </div>
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-primary" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzC86Z2SobgtS0PoxdZZ6COWEkv96SO8tTTSyjX0l2YR6_yN7a6aXdjju2TkgQ_7HwWe6pODP3csq1PBQgFvdqDIeXsDQ8bCUs5TYH5--pbBWFgh97B2CBRGmxpLkX2QXoEJFlX-cwE7MV0tX-C_Dk2QmtYiCB2jT_DLqT9EE3PD5LUkxqWyfF75YLxGi1V-UfHU20Qw6QYlwWysBhz6QiECa2sfxiLYMPT3U1A4oyyE0LtjlpVaJ7c27UPWQ7LLpOo_TgxBGaXq-T')"}}></div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Cmdr. Alex Chen</p>
                        <p className="text-xs text-gray-500 truncate">Level 2 Scout</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default NavSidebar;