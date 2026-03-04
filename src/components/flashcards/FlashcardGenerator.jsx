import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Plus, AlertCircle } from 'lucide-react';

const FlashcardGenerator = ({ onGenerate }) => {
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!notes.trim()) {
            setError('Please paste some notes or a topic first.');
            return;
        }

        setError('');
        setIsLoading(true);

        // Simulate AI Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI Generation Logic
        const lines = notes.split('\n').filter(line => line.trim().length > 10);
        let mockCards = [];

        if (lines.length > 0) {
            mockCards = lines.slice(0, 5).map((line, index) => {
                // very basic split to pretend it's a Q&A
                const words = line.split(' ');
                const splitIndex = Math.floor(words.length / 3);
                return {
                    id: Date.now() + index,
                    front: words.slice(0, splitIndex).join(' ') + '?',
                    back: words.slice(splitIndex).join(' '),
                    status: 'new'
                };
            });
        } else {
            // Fallback mock cards if text is too short or weird
            mockCards = [
                { id: 1, front: "What is the primary function of Mitochondria?", back: "The Mitochondria is known as the powerhouse of the cell, primarily responsible for generating ATP.", status: 'new' },
                { id: 2, front: "Define Photosynthesis.", back: "The process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.", status: 'new' }
            ];
        }

        onGenerate(mockCards);
        setIsLoading(false);
        setNotes('');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">Generate from Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Paste your notes, a paragraph, or a topic here and let AI create flashcards for you..."
                    className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full primary-button py-4 rounded-xl text-white font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        AI is reading your notes...
                    </>
                ) : (
                    <>
                        <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
                        Generate Flashcards with AI
                    </>
                )}
            </button>
        </div>
    );
};

export default FlashcardGenerator;
