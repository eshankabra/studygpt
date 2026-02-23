import { motion } from 'framer-motion';
import {
    Sparkles, Calendar, BookOpen, Clock,
    BarChart2, Target, Zap, PieChart
} from 'lucide-react';

const features = [
    { icon: Sparkles, title: 'Smart Study Plan Generator', desc: 'AI-driven schedules tailored to your pace and goals.', color: 'text-blue-400' },
    { icon: Calendar, title: 'Daily Timetable Builder', desc: 'Optimized daily routines for maximum productivity.', color: 'text-purple-400' },
    { icon: BookOpen, title: 'AI Homework Helper', desc: 'Step-by-step solutions and explanations for any subject.', color: 'text-emerald-400' },
    { icon: Clock, title: 'Exam Countdown Tracker', desc: 'Stay ahead of deadlines with smart reminders.', color: 'text-rose-400' },
    { icon: BarChart2, title: 'Study Progress Analytics', desc: 'Deep insights into your learning patterns.', color: 'text-cyan-400' },
    { icon: Zap, title: 'Pomodoro Focus Timer', desc: 'Enhanced focus sessions with AI-timed breaks.', color: 'text-amber-400' },
    { icon: Target, title: 'Goal Tracker', desc: 'Set, track, and achieve your academic milestones.', color: 'text-indigo-400' },
    { icon: PieChart, title: 'Performance Insights', desc: 'Comprehensive reports on your study efficiency.', color: 'text-pink-400' },
];

const FeatureGrid = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="glass p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={`p-3 bg-slate-800/60 rounded-xl w-fit mb-4 ${feature.color} border border-white/5`}>
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
