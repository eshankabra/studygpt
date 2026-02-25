import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Sparkles,
    Copy,
    Trash2,
    ChevronLeft,
    Loader2,
    Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolTabs from '../components/ToolTabs';

const NotesSummarizer = () => {
    const [notes, setNotes] = useState('');
    const [length, setLength] = useState('medium');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const summarizeNotes = async () => {
        if (!notes.trim()) {
            setError('Please paste some notes first!');
            return;
        }

        setError('');
        setIsLoading(true);
        setSummary('');

        // Mock API Call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            let mockSummary = '';
            if (length === 'short') {
                mockSummary = "This is a concise, high-level summary of your notes, capturing only the most essential points for a quick overview.";
            } else if (length === 'long') {
                mockSummary = "This is a detailed and comprehensive summary of your notes. It dives into secondary details, explains core concepts thoroughly, and ensures that no significant nuance is lost from the original text while still being organized and readable.";
            } else {
                mockSummary = "This is a balanced summary of your notes. It provides a clear structure, highlighting the main objectives and supporting evidence without being too brief or overly verbose.";
            }

            setSummary(mockSummary);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!summary) return;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setNotes('');
        setSummary('');
        setError('');
        setLength('medium');
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <FileText className="text-blue-400" />
                            AI Notes Summarizer
                        </h1>
                        <p className="text-slate-400">Transform long notes into concise, actionable summaries.</p>
                    </div>
                </div>

                <ToolTabs />

                <div className="grid grid-cols-1 gap-8 mt-8">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Paste your notes</label>
                            <span className="text-xs text-slate-500 font-mono">{notes.length} characters</span>
                        </div>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Paste your lecture notes, articles, or any text here..."
                            className="w-full h-64 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Summary Length</label>
                                    <select
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                                    >
                                        <option value="short">Short</option>
                                        <option value="medium">Medium</option>
                                        <option value="long">Long</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={clearAll}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
                                >
                                    <Trash2 size={18} />
                                    Clear
                                </button>
                                <button
                                    onClick={summarizeNotes}
                                    disabled={isLoading}
                                    className="primary-button flex items-center gap-2 px-8 py-2 rounded-xl text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Summarizing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            Summarize
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-rose-400 text-sm mt-4 text-center font-medium"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>

                    {/* Output Section */}
                    <AnimatePresence>
                        {(summary || isLoading) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent shadow-xl shadow-blue-500/5"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        <Sparkles size={18} className="text-blue-400" />
                                        AI Summary
                                    </h3>
                                    {summary && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-all text-slate-400 hover:text-blue-400"
                                            title="Copy Summary"
                                        >
                                            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                        </button>
                                    )}
                                </div>

                                <div className="min-h-[100px] relative">
                                    {isLoading ? (
                                        <div className="space-y-3">
                                            <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                                            <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
                                            <div className="h-4 bg-white/5 rounded-full w-4/6 animate-pulse" />
                                        </div>
                                    ) : (
                                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {summary}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default NotesSummarizer;
