import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Clock, CheckCircle, FileText,
    Layers, Zap, Target, MessageSquare, MoreHorizontal
} from 'lucide-react';

const tools = [
    { icon: Calendar, label: 'AI Planner', id: 'planner' },
    { icon: Clock, label: 'AI Timetable Generator', id: 'timetable' },
    { icon: CheckCircle, label: 'AI Task Manager', id: 'tasks' },
    { icon: FileText, label: 'AI Notes Summarizer', id: 'notes' },
    { icon: Layers, label: 'AI Flashcards', id: 'flashcards' },
    { icon: Target, label: 'AI Exam Predictor', id: 'exam' },
    { icon: Zap, label: 'AI Focus Mode', id: 'focus' },
    { icon: MessageSquare, label: 'AI Chat Tutor', id: 'tutor' },
    { icon: MoreHorizontal, label: 'More Tools', id: 'more', badge: 'New' },
];

const ToolTabs = () => {
    const activeTab = 'planner';
    const scrollRef = useRef(null);

    return (
        <div className="max-w-7xl mx-auto px-6 mb-16">
            <div
                ref={scrollRef}
                className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar border-b border-slate-800/50"
            >
                {tools.map((tool) => (
                    <motion.div
                        key={tool.id}
                        whileHover={{ y: -2 }}
                        className={`
              relative flex items-center gap-3 px-6 py-3 rounded-t-xl cursor-pointer whitespace-nowrap transition-all duration-300
              ${activeTab === tool.id
                                ? 'bg-blue-500/10 border-b-2 border-blue-500 text-white'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
            `}
                    >
                        <tool.icon size={18} className={activeTab === tool.id ? 'text-blue-400' : ''} />
                        <span className="font-semibold">{tool.label}</span>
                        {tool.badge && (
                            <span className="ml-1 bg-blue-500 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md text-white">
                                {tool.badge}
                            </span>
                        )}

                        {activeTab === tool.id && (
                            <motion.div
                                layoutId="activeGlow"
                                className="absolute inset-0 bg-blue-500/5 blur-md -z-10"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ToolTabs;
