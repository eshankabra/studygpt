import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">StudyGPT</span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">AI planner</span>
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">AI timetable</span>
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">AI task manager</span>
                    <span className="text-slate-300 hover:text-white cursor-pointer transition-colors text-sm font-medium">Notes</span>
                </div>

                {/* Search & CTAs */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search features..."
                            className="bg-slate-800/50 border border-slate-700/50 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-800 transition-all w-48 group-hover:w-56"
                        />
                    </div>
                    <button className="text-slate-300 hover:text-white font-medium transition-colors">Log In</button>
                    <button className="primary-button px-6 py-2 rounded-full text-white font-semibold">Try Free</button>
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
