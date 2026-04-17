import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, Plus, Settings, ChevronDown, 
    Trash2, Paperclip, Mic, Send, Bot, User, 
    Copy, RefreshCw, Sparkles, BookOpen, Calculator, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

const subjects = [
    { id: 'math', name: 'Math', icon: Calculator, color: 'text-blue-400' },
    { id: 'physics', name: 'Physics', icon: Sparkles, color: 'text-purple-400' },
    { id: 'chemistry', name: 'Chemistry', icon: BookOpen, color: 'text-emerald-400' },
    { id: 'coding', name: 'Coding', icon: Code, color: 'text-orange-400' },
    { id: 'biology', name: 'Biology', icon: User, color: 'text-rose-400' } // Using user icon as placeholder for bio
];

const mockHistory = [
    { id: 1, title: 'Newton\'s Laws of Motion', date: 'Today' },
    { id: 2, title: 'Integration by Parts', date: 'Yesterday' },
    { id: 3, title: 'React Hooks Intro', date: 'Previous 7 Days' }
];

const AITutor = () => {
    const [input, setInput] = useState('');
    const [activeSubject, setActiveSubject] = useState(subjects[0]);
    const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;
        
        const newUserMessage = {
            id: Date.now(),
            role: 'user',
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                role: 'ai',
                content: `Here is a helpful explanation about "${text}". The key concept to understand is that it strongly relates to ${activeSubject.name} fundamentals. Let me break it down for you.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(input);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="absolute inset-0 flex bg-navy-900 overflow-hidden text-slate-200 z-[100]">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-72 h-full glass border-r border-white/5 relative z-10">
                {/* Logo Area */}
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">StudyGPT</span>
                    </Link>
                </div>

                <div className="p-4 flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">
                    {/* New Chat Button */}
                    <button 
                        onClick={clearChat}
                        className="w-full flex items-center gap-2 primary-button px-4 py-3 rounded-xl text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={20} />
                        New Chat
                    </button>

                    {/* Chat History */}
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Recent Chats</h3>
                        <div className="space-y-1">
                            {mockHistory.map(chat => (
                                <button key={chat.id} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all truncate flex items-center gap-2">
                                    <MessageSquare size={14} className="shrink-0" />
                                    <span className="truncate">{chat.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Subjects View */}
                    <div>
                         <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Subjects</h3>
                         <div className="grid grid-cols-2 gap-2">
                             {subjects.map(subject => {
                                 const Icon = subject.icon;
                                 return (
                                     <button
                                         key={subject.id}
                                         onClick={() => setActiveSubject(subject)}
                                         className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all border ${activeSubject.id === subject.id ? 'bg-white/10 border-white/10 text-white' : 'border-transparent text-slate-400 hover:bg-white/5'}`}
                                     >
                                         <Icon size={20} className={subject.color} />
                                         <span className="text-xs font-medium">{subject.name}</span>
                                     </button>
                                 );
                             })}
                         </div>
                    </div>
                </div>

            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative z-0">
                {/* Header */}
                <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-6 shrink-0 relative z-20">
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <h2 className="text-lg font-bold text-white">AI Tutor</h2>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Online</span>
                            </div>
                        </div>
                        {/* Mobile Header Logo */}
                        <div className="md:hidden flex items-center gap-2">
                             <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-xs">S</span>
                            </div>
                            <span className="font-bold text-white">AI Tutor</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Subject Selector Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-sm font-medium"
                            >
                                <activeSubject.icon size={14} className={activeSubject.color} />
                                {activeSubject.name}
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                            
                            <AnimatePresence>
                                {isSubjectDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-48 glass p-2 rounded-xl border border-white/10 shadow-xl z-50"
                                    >
                                        {subjects.map(subject => (
                                            <button
                                                key={subject.id}
                                                onClick={() => {
                                                    setActiveSubject(subject);
                                                    setIsSubjectDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left text-sm"
                                            >
                                                <subject.icon size={16} className={subject.color} />
                                                {subject.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button 
                            onClick={clearChat}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
                            title="Clear Chat"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </header>

                {/* Chat Flow */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar relative w-full">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">
                        {messages.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                            >
                                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 relative">
                                    <Bot className="text-blue-400 w-10 h-10" />
                                    <div className="absolute top-0 right-0 w-5 h-5 bg-navy-900 rounded-full flex items-center justify-center">
                                        <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">How can I help you study?</h2>
                                <p className="text-slate-400 mb-8 max-w-md">
                                    I am your intelligent AI tutor. Ask me to explain concepts, solve problems, or quiz you on any subject.
                                </p>
                                

                            </motion.div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <motion.div 
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${message.role === 'user' ? 'bg-indigo-500' : 'bg-gradient-to-br from-blue-400 to-blue-600'}`}>
                                            {message.role === 'user' ? <span className="text-white font-bold text-sm">E</span> : <Bot size={16} className="text-white" />}
                                        </div>
                                        <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-center gap-2 px-1">
                                                <span className="text-xs font-medium text-slate-400">{message.role === 'user' ? 'You' : 'AI Tutor'}</span>
                                                <span className="text-[10px] text-slate-500">{message.timestamp}</span>
                                            </div>
                                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                                                message.role === 'user' 
                                                ? 'bg-blue-600 text-white rounded-tr-sm' 
                                                : 'glass border border-white/5 text-slate-200 rounded-tl-sm'
                                            }`}>
                                                {message.content}
                                            </div>
                                            
                                            {/* Action Buttons for AI */}
                                            {message.role === 'ai' && (
                                                <div className="flex items-center gap-2 mt-1 px-1">
                                                    <button className="p-1.5 text-slate-500 hover:text-white transition-colors rounded hover:bg-white/5" title="Copy">
                                                        <Copy size={14} />
                                                    </button>
                                                    <button className="p-1.5 text-slate-500 hover:text-white transition-colors rounded hover:bg-white/5" title="Regenerate">
                                                        <RefreshCw size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                
                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex gap-4 flex-row"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 mt-1">
                                            <Bot size={16} className="text-white" />
                                        </div>
                                        <div className="glass border border-white/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 w-fit">
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                </div>

                {/* Input Section */}
                <div className="p-4 bg-navy-900 border-t border-white/5 relative z-20">
                    <div className="max-w-4xl mx-auto flex flex-col gap-3">
                        <div className="flex items-center bg-slate-800/50 border border-white/10 rounded-2xl pr-2 focus-within:border-blue-500/50 focus-within:bg-slate-800 transition-all shadow-inner">
                            <div className="pl-3 pr-2 flex items-center shrink-0">
                                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5" title="Attach File">
                                    <Paperclip size={18} />
                                </button>
                            </div>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask your tutor anything..."
                                className="w-full bg-transparent py-4 text-white focus:outline-none focus:ring-0 font-medium placeholder:text-slate-500"
                            />
                            <div className="pl-2 flex items-center gap-1 shrink-0">
                                <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5" title="Voice Input">
                                    <Mic size={18} />
                                </button>
                                <button 
                                    onClick={() => handleSend(input)}
                                    disabled={!input.trim()}
                                    className="p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-colors rounded-xl shadow-lg shadow-blue-500/20 disabled:shadow-none mr-1"
                                    title="Send Message"
                                >
                                    <Send size={18} className="ml-0.5" />
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] text-slate-500">AI Tutor can make mistakes. Verify important information.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AITutor;
