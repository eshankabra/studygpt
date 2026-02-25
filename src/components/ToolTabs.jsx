import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    Calendar, Clock, CheckCircle, FileText,
    Layers, Zap, Target, MessageSquare, MoreHorizontal,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const tools = [
    { icon: Calendar, label: 'AI Planner', id: 'planner', path: '/' },
    { icon: Clock, label: 'AI Timetable Generator', id: 'timetable', path: '/' },
    { icon: CheckCircle, label: 'AI Task Manager', id: 'tasks', path: '/' },
    { icon: FileText, label: 'AI Notes Summarizer', id: 'notes', path: '/summarizer' },
    { icon: Layers, label: 'AI Flashcards', id: 'flashcards', path: '/' },
    { icon: Target, label: 'AI Exam Predictor', id: 'exam', path: '/' },
    { icon: Zap, label: 'AI Focus Mode', id: 'focus', path: '/' },
    { icon: MessageSquare, label: 'AI Chat Tutor', id: 'tutor', path: '/' },
    { icon: MoreHorizontal, label: 'More Tools', id: 'more', badge: 'New', path: '/' },
];

const ToolTabs = () => {
    const location = useLocation();
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 20);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }
        return () => scrollElement?.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 mb-16 relative group">
            {/* Scroll Buttons */}
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 glass rounded-full text-white shadow-xl hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 glass rounded-full text-white shadow-xl hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight size={20} />
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-slate-800/50 scroll-smooth"
            >
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        to={tool.path}
                        className="no-underline"
                    >
                        <motion.div
                            whileHover={{ y: -2 }}
                            className={`
                relative flex items-center gap-3 px-6 py-3 rounded-t-xl cursor-pointer whitespace-nowrap transition-all duration-300
                ${location.pathname === tool.path && (tool.id === 'notes' || (tool.id === 'planner' && location.pathname === '/'))
                                    ? 'bg-blue-500/10 border-b-2 border-blue-500 text-white'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
              `}
                        >
                            <tool.icon size={18} className={(location.pathname === tool.path && (tool.id === 'notes' || (tool.id === 'planner' && location.pathname === '/'))) ? 'text-blue-400' : ''} />
                            <span className="font-semibold">{tool.label}</span>
                            {tool.badge && (
                                <span className="ml-1 bg-blue-500 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md text-white">
                                    {tool.badge}
                                </span>
                            )}

                            {(location.pathname === tool.path && (tool.id === 'notes' || (tool.id === 'planner' && location.pathname === '/'))) && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-blue-500/5 blur-md -z-10"
                                />
                            )}
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ToolTabs;
