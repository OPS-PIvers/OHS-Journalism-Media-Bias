import React, { useState, useRef } from 'react';
import NavSidebar from './NavSidebar';

interface SubmissionScreenProps {
    isTeacher?: boolean;
}

const SubmissionScreen: React.FC<SubmissionScreenProps> = ({ isTeacher = false }) => {
    const [wordCount, setWordCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [url, setUrl] = useState('');
    const [sourceName, setSourceName] = useState('');
    const [author, setAuthor] = useState('');
    const [evidence, setEvidence] = useState('');
    
    // Coordinate State (Default to center-ish)
    const [coords, setCoords] = useState({ x: 0, y: 0 }); // Visual percentages: x (0-100), y (0-100)
    const [plotValues, setPlotValues] = useState({ bias: 0, reliability: 50 }); // Logical values: bias (-50 to 50), reliability (0 to 100)
    
    const gridRef = useRef<HTMLDivElement>(null);

    const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        
        // Calculate percentages for visual placement
        const xPct = Math.max(0, Math.min(100, (clientX / rect.width) * 100));
        const yPct = Math.max(0, Math.min(100, (clientY / rect.height) * 100));
        
        setCoords({ x: xPct, y: yPct });
        
        // Calculate logical values
        // Bias: 0% = -50 (Left), 50% = 0, 100% = +50 (Right)
        const biasVal = Math.round((xPct - 50)); 
        // Reliability: 0% (Top) = 100, 100% (Bottom) = 0
        const relVal = Math.round(100 - yPct);
        
        setPlotValues({ bias: biasVal, reliability: relVal });
    };

    const handleSubmit = () => {
        if (!url || !sourceName || !evidence) {
            alert("Please fill in all required fields (URL, Source, Evidence).");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            url,
            sourceName,
            author,
            evidence,
            bias: plotValues.bias,
            reliability: plotValues.reliability,
            wordCount
        };

        if (window.google && window.google.script) {
            window.google.script.run
                .withSuccessHandler((response: any) => {
                    setIsSubmitting(false);
                    if (response.success) {
                        alert(`Mission Success! Earned ${response.xpEarned} XP.`);
                        // Reset form
                        setUrl('');
                        setSourceName('');
                        setAuthor('');
                        setEvidence('');
                        setCoords({ x: 50, y: 50 });
                        setWordCount(0);
                    } else {
                        alert("Error: " + response.message);
                    }
                })
                .withFailureHandler((err: any) => {
                    setIsSubmitting(false);
                    alert("System Error: " + err);
                })
                .submitReport(payload);
        } else {
            // Dev mode fallback
            console.log("Submitting payload:", payload);
            setTimeout(() => {
                setIsSubmitting(false);
                alert("Dev Mode: Payload logged to console.");
            }, 1000);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
            <NavSidebar role="student" canSwitchToTeacher={isTeacher} />
            <main className="flex-1 h-full overflow-y-auto w-full">
                <div className="max-w-[1280px] mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Mission Data */}
                    <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2 border-b border-border-dark pb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-white">Submit Scout Report</h1>
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider rounded border border-green-500/20">Active Mission</span>
                        </div>
                        <p className="text-gray-400 text-base font-normal">Mission: Weekly Scout Report // Status: Awaiting Intel</p>
                    </div>
                    {/* Section 1 */}
                    <section className="bg-surface-dark rounded-xl p-6 border border-border-dark">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">link</span>
                            <h2 className="text-xl font-bold text-white">The Discovery</h2>
                        </div>
                        <div className="grid gap-5">
                            <label className="flex flex-col gap-2">
                                <span className="text-gray-300 text-sm font-medium">Target URL *</span>
                                <div className="flex gap-2">
                                    <input 
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="form-input flex-1 rounded-lg border border-border-dark bg-background-dark text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 placeholder:text-gray-600" 
                                        placeholder="Paste the article link here..." 
                                        type="url"
                                    />
                                    <button className="h-12 px-5 bg-border-dark hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        <span>Fetch</span>
                                    </button>
                                </div>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-300 text-sm font-medium">Source Name *</span>
                                    <input 
                                        value={sourceName}
                                        onChange={(e) => setSourceName(e.target.value)}
                                        className="form-input w-full rounded-lg border border-border-dark bg-background-dark text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 placeholder:text-gray-600" 
                                        placeholder="e.g. The New York Times" 
                                        type="text"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-gray-300 text-sm font-medium">Author (if available)</span>
                                    <input 
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="form-input w-full rounded-lg border border-border-dark bg-background-dark text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 placeholder:text-gray-600" 
                                        placeholder="e.g. Jane Doe" 
                                        type="text"
                                    />
                                </label>
                            </div>
                        </div>
                    </section>
                    {/* Section 2 */}
                    <section className="bg-surface-dark rounded-xl p-6 border border-border-dark flex flex-col h-full">
                        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">my_location</span>
                                <h2 className="text-xl font-bold text-white">The Coordinates</h2>
                            </div>
                            <div className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                Bias: {plotValues.bias > 0 ? `+${plotValues.bias}` : plotValues.bias} | Rel: {plotValues.reliability}%
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">Click on the grid to plot the source's standing based on Bias (X-axis) and Reliability (Y-axis).</p>
                        <div 
                            ref={gridRef}
                            onClick={handleGridClick}
                            className="relative w-full aspect-square md:aspect-[16/9] bg-background-dark rounded-lg border border-border-dark overflow-hidden group cursor-crosshair"
                        >
                            <div className="absolute inset-0 coordinate-grid opacity-30 pointer-events-none"></div>
                            <div className="absolute inset-0 coordinate-axes pointer-events-none"></div>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold text-gray-500 bg-background-dark/80 px-2 rounded">Fact / Reliable</div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold text-gray-500 bg-background-dark/80 px-2 rounded">Fabricated / Unreliable</div>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-widest font-bold text-blue-400/80 bg-background-dark/80 px-2 rounded">Liberal Bias</div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-widest font-bold text-red-400/80 bg-background-dark/80 px-2 rounded">Conservative Bias</div>
                            
                            {/* Interactive Plot Point */}
                            {coords.x !== 0 && (
                                <div 
                                    className="absolute size-4 bg-primary rounded-full shadow-[0_0_15px_3px_rgba(19,127,236,0.6)] border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse transition-all duration-200"
                                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[10px] px-2 py-1 rounded border border-gray-700 pointer-events-none">
                                        Your Plot
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    {/* Section 3 */}
                    <section className="bg-surface-dark rounded-xl p-6 border border-border-dark">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">edit_note</span>
                            <h2 className="text-xl font-bold text-white">The Log</h2>
                        </div>
                        <label className="flex flex-col gap-2">
                            <span className="text-gray-300 text-sm font-medium">Evidence & Justification *</span>
                            <textarea 
                                value={evidence}
                                onChange={(e) => {
                                    setEvidence(e.target.value);
                                    setWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
                                }}
                                className="form-textarea w-full min-h-[160px] rounded-lg border border-border-dark bg-background-dark text-white focus:border-primary focus:ring-1 focus:ring-primary p-4 placeholder:text-gray-600 font-mono text-sm leading-relaxed" 
                                placeholder="Provide linguistic evidence for your plot coordinates. Why is this source biased or reliable? Cite specific phrases..."
                            ></textarea>
                        </label>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">Min 50 words required</span>
                            <span className={`text-xs font-medium flex items-center gap-1 ${wordCount >= 50 ? 'text-green-400' : 'text-gray-400'}`}>
                                <span className="material-symbols-outlined text-[14px]">{wordCount >= 50 ? 'check_circle' : 'circle'}</span>
                                Words: {wordCount}
                            </span>
                        </div>
                    </section>
                </div>
                {/* Right Column: Sidebar */}
                <div className="lg:w-[360px] flex flex-col gap-6">
                    <div className="sticky top-6 flex flex-col gap-6">
                        <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-900/40 to-surface-dark p-4 border-b border-border-dark">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-400">military_tech</span>
                                    Mission Rewards
                                </h3>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div className="flex justify-between items-end border-b border-border-dark pb-4 mb-2">
                                    <span className="text-gray-400 text-sm font-medium">PROJECTED XP</span>
                                    <span className="text-4xl font-black text-primary tracking-tight">
                                        {50 + (Math.abs(plotValues.bias) < 10 ? 15 : 0) + (wordCount > 50 ? 10 : 0)} 
                                        <span className="text-base font-bold text-gray-500 ml-1">XP</span>
                                    </span>
                                </div>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex items-center justify-between p-3 rounded bg-background-dark border border-green-500/30 shadow-[0_0_10px_-3px_rgba(34,197,94,0.2)]">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-green-400 text-[20px]">check_circle</span>
                                            <div className="flex flex-col">
                                                <span className="text-white text-sm font-bold">Base Report</span>
                                                <span className="text-[10px] text-gray-400">Standard Submission</span>
                                            </div>
                                        </div>
                                        <span className="text-green-400 font-bold text-sm">+50</span>
                                    </li>
                                    <li className={`flex items-center justify-between p-3 rounded bg-background-dark border transition-all ${Math.abs(plotValues.bias) < 10 ? 'border-primary/30 shadow-[0_0_10px_-3px_rgba(19,127,236,0.2)]' : 'border-gray-800 opacity-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-[20px] ${Math.abs(plotValues.bias) < 10 ? 'text-primary' : 'text-gray-600'}`}>bolt</span>
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-bold ${Math.abs(plotValues.bias) < 10 ? 'text-white' : 'text-gray-500'}`}>The Centrist</span>
                                                <span className="text-[10px] text-gray-400">Bias within ±10 range</span>
                                            </div>
                                        </div>
                                        <span className={`${Math.abs(plotValues.bias) < 10 ? 'text-primary' : 'text-gray-600'} font-bold text-sm`}>+15</span>
                                    </li>
                                    <li className={`flex items-center justify-between p-3 rounded border transition-all ${wordCount > 50 ? 'bg-background-dark border-purple-500/30 shadow-[0_0_10px_-3px_rgba(168,85,247,0.2)]' : 'border-dashed border-gray-700 opacity-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`material-symbols-outlined text-[20px] ${wordCount > 50 ? 'text-purple-400' : 'text-gray-500'}`}>lock</span>
                                            <div className="flex flex-col">
                                                <span className={`${wordCount > 50 ? 'text-white' : 'text-gray-400'} text-sm font-bold`}>Deep Dive</span>
                                                <span className="text-[10px] text-gray-500">Log &gt; 50 words</span>
                                            </div>
                                        </div>
                                        <span className={`${wordCount > 50 ? 'text-purple-400' : 'text-gray-500'} font-bold text-sm`}>+10</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full h-14 bg-primary hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined animate-spin">refresh</span>
                                ) : (
                                    <span className="material-symbols-outlined">send</span>
                                )}
                                {isSubmitting ? 'Transmitting...' : 'Transmit Report'}
                            </button>
                            <button className="w-full h-12 bg-transparent hover:bg-surface-dark border border-border-dark text-gray-400 hover:text-white font-medium text-sm rounded-xl transition-colors">
                                Save Draft
                            </button>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
                            <span className="material-symbols-outlined text-yellow-500 shrink-0">lightbulb</span>
                            <p className="text-xs text-yellow-200/80 leading-relaxed">
                                <strong>Tip:</strong> Ensure your source has a clear author and date. Anonymous sources typically reduce Reliability score by at least 20 points.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
};

export default SubmissionScreen;