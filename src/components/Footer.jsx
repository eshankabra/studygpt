import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="border-t border-slate-800/50 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="text-xl font-bold text-white">StudyGPT</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        The ultimate AI-powered ecosystem for students and educators. Plan, study, and succeed.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Product</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">AI Planner</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Exam Predictor</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Flashcards</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Careers</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Community</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Student Hub</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Ambassadors</li>
                        <li className="hover:text-blue-400 cursor-pointer transition-colors">Blog</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/30 flex flex-col md:row items-center justify-between gap-4 text-slate-500 text-xs">
                <p>© 2026 StudyGPT AI. All rights reserved.</p>
                <div className="flex gap-6">
                    <span className="hover:text-slate-300 cursor-pointer">Twitter</span>
                    <span className="hover:text-slate-300 cursor-pointer">Discord</span>
                    <span className="hover:text-slate-300 cursor-pointer">LinkedIn</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
