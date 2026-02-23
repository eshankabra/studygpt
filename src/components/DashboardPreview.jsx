import { motion } from 'framer-motion';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    Tooltip, PieChart, Pie, Cell
} from 'recharts';
import { Lightbulb, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const studyData = [
    { name: 'Mon', hours: 4.5 },
    { name: 'Tue', hours: 6.2 },
    { name: 'Wed', hours: 3.8 },
    { name: 'Thu', hours: 5.1 },
    { name: 'Fri', hours: 4.9 },
    { name: 'Sat', hours: 2.5 },
    { name: 'Sun', hours: 7.2 },
];

const progressData = [
    { name: 'Completed', value: 75, color: '#3B82F6' },
    { name: 'Remaining', value: 25, color: '#1E293B' },
];

const DashboardPreview = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Study Analytics</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Visualize your progress and get AI-powered recommendations to optimize your learning journey.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Progress Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 glass p-8 rounded-3xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Weekly Study Hours</h3>
                        <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold bg-blue-500/10 px-3 py-1 rounded-full">
                            <TrendingUp size={14} />
                            <span>+12% from last week</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={studyData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Bar dataKey="hours" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Circular Progress & AI Recs */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="glass p-8 rounded-3xl flex items-center justify-between"
                    >
                        <div>
                            <h3 className="font-bold text-white mb-1">Today's Progress</h3>
                            <p className="text-slate-400 text-sm">Target: 6 hours</p>
                        </div>
                        <div className="w-20 h-20">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={progressData}
                                        innerRadius={25}
                                        outerRadius={35}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {progressData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-400 pointer-events-none">
                                75%
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="glass p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20"
                    >
                        <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <Lightbulb size={24} />
                            <h3 className="font-bold text-white">AI Recommendation</h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
                            “Based on your progress, revise Mathematics today. Your performance in Calculus has dipped slightly in the last 3 days.”
                        </p>
                        <button className="w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-bold hover:bg-blue-500/30 transition-all">
                            Start Session
                        </button>
                    </motion.div>

                    {/* Upcoming Deadlines */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="glass p-6 rounded-3xl"
                    >
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-rose-400" />
                            Upcoming
                        </h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Physics Exam', date: 'Tomorrow' },
                                { title: 'Project Submission', date: 'Feb 28' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-300">{item.title}</span>
                                    <span className="text-slate-500">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;
