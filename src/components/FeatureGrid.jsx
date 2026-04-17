import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CheckCircle, FileText,
    Layers, MessageSquare
} from 'lucide-react';

const features = [
    { icon: CheckCircle, title: 'AI Task Manager', desc: 'Organize and prioritize your daily assignments effortlessly.', color: 'text-emerald-400', path: '/' },
    { icon: FileText, title: 'AI Notes Summarizer', desc: 'Condense long lectures into quick, digestible key points.', color: 'text-rose-400', path: '/summarizer' },
    { icon: Layers, title: 'AI Flashcards', desc: 'Generate high-quality study cards instantly from your materials.', color: 'text-cyan-400', path: '/flashcards' },

    { icon: MessageSquare, title: 'AI Chat Tutor', desc: 'Step-by-step solutions and explanations for any subject.', color: 'text-pink-400', path: '/tutor' },
];

const FeatureGrid = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <Link to={feature.path} key={idx} className="block no-underline">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group relative overflow-hidden h-full"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className={`p-3 bg-slate-800/60 rounded-xl w-fit mb-4 ${feature.color} border border-white/5`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
