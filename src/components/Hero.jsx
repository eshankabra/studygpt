import { motion } from 'framer-motion';
import { Star, Users, GraduationCap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        Your All-in-One <br />
                        <span className="gradient-text">AI Study Planner</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                        Designed to help students plan smarter, study faster, and track progress using cutting-edge AI. Master your curriculum effortlessly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="primary-button px-8 py-4 rounded-xl text-white font-bold text-lg">
                            Try Free Now
                        </button>
                        <button className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all">
                            Get Started
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 relative"
                >
                    {/* Main Hero Card */}
                    <div className="glass p-8 rounded-3xl relative z-10 animate-pulse-slow">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-500/20 rounded-2xl">
                                <Star className="text-blue-400" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">4.9 Rating</h3>
                                <p className="text-slate-400">Trusted by over 1.2M+ students</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                                <div className="flex items-center gap-2 mb-1 text-blue-400">
                                    <Users size={18} />
                                    <span className="font-bold">1,200,000+</span>
                                </div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Students</p>
                            </div>
                            <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30">
                                <div className="flex items-center gap-2 mb-1 text-purple-400">
                                    <GraduationCap size={18} />
                                    <span className="font-bold">5,000+</span>
                                </div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Schools</p>
                            </div>
                        </div>

                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                                    <img src={`https://i.pravatar.cc/40?img=${i + 10}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-300 font-medium italic">“Loved by learners worldwide”</p>
                    </div>

                    {/* Decorative backdrop */}
                    <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
