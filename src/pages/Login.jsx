import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock authentication, redirect to home
        navigate('/');
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md glass p-8 rounded-3xl border border-white/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -z-10 w-full h-full bg-blue-500/5 blur-3xl" />
                
                <div className="flex items-center gap-3 mb-8">
                    <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-slate-400">Password</label>
                            <span className="text-blue-400 text-xs hover:underline cursor-pointer">Forgot password?</span>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full primary-button py-3.5 rounded-xl text-white font-bold transition-all text-sm mt-4"
                    >
                        Sign In
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="flex-1 border-b border-white/10" />
                    <span className="text-xs text-slate-500 uppercase font-semibold">Or continue with</span>
                    <div className="flex-1 border-b border-white/10" />
                </div>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-slate-800/50 hover:bg-slate-800 text-white font-medium transition-colors text-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                    </button>
                    
                    <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 bg-slate-800/50 hover:bg-slate-800 text-white font-medium transition-colors text-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6 2.66c.86-1.02 1.44-2.45 1.28-3.92-1.3.05-2.77.85-3.66 1.89-.78.9-1.48 2.37-1.28 3.82 1.45.11 2.76-.71 3.66-1.79zm1.48 11.23c-.02-2.58 2.14-3.83 2.24-3.89-1.21-1.73-3.11-1.96-3.8-1.99-1.61-.16-3.15.93-3.98.93-.82 0-2.09-.9-3.41-.88-1.71.02-3.3.97-4.18 2.47-1.81 3.06-.46 7.6 1.3 10.05.86 1.22 1.88 2.58 3.2 2.53 1.27-.05 1.76-.8 3.3-.8 1.52 0 1.99.8 3.32.78 1.36-.02 2.25-1.25 3.1-2.47 1-1.42 1.4-2.8 1.42-2.87-.03-.01-2.49-.93-2.51-3.66z"/>
                        </svg>
                        Sign in with Apple
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account? <Link to="/signup" className="text-blue-400 font-semibold hover:underline">Sign up</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
