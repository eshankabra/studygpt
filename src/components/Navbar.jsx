import { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setIsFeaturesOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">StudyGPT</span>
                </Link>

                {/* Primary Nav Links */}
                <div className="hidden lg:flex items-center gap-8 ml-10 flex-1">
                    <div className="relative">
                        <button
                            onMouseEnter={() => setIsFeaturesOpen(true)}
                            className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium"
                        >
                            AI Tools
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isFeaturesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    onMouseLeave={() => setIsFeaturesOpen(false)}
                                    className="absolute top-full left-0 mt-4 w-64 glass p-4 rounded-2xl border border-white/5 shadow-2xl"
                                >
                                    <div className="grid grid-cols-1 gap-1">
                                        {[
                                            { name: 'AI Planner', path: '/' },
                                            { name: 'AI Timetable', path: '/' },
                                            { name: 'AI Task Manager', path: '/' },
                                            { name: 'AI Notes Summarizer', path: '/summarizer' },
                                            { name: 'AI Flashcards', path: '/' },
                                            { name: 'AI Exam Predictor', path: '/' },
                                        ].map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className="px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">Pricing</span>
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">About</span>
                </div>

                {/* Search & CTAs */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find features..."
                            className="bg-slate-800/30 border border-slate-700/30 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-800/80 transition-all w-36 focus:w-48 placeholder:text-slate-500"
                        />
                    </div>
                    <button className="text-slate-300 hover:text-white font-medium text-sm transition-colors px-2">Log In</button>
                    <button className="primary-button px-5 py-2 rounded-full text-white font-semibold text-sm">Try Free</button>
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden text-white">
                    <Menu className="cursor-pointer" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
