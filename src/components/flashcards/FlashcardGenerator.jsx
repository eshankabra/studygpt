import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Plus, AlertCircle, Upload, FileText } from 'lucide-react';

const FlashcardGenerator = ({ onGenerate }) => {
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setNotes(prev => prev + (prev.trim() ? '\n\n' : '') + `[Content extracted from ${file.name}]`);
            // Reset input so the same file can be uploaded again if needed
            e.target.value = null;
        }
    };

    const handleGenerate = async () => {
        if (!notes.trim()) {
            setError('Please paste some notes or a topic first.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
        const response = await fetch("/api/flashcards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ notes }),
        });

        const data = await response.json();

        if (!response.ok || !data.cards) {
            throw new Error("Failed to generate cards");
        }

        const formattedCards = data.cards.map(card => ({
            id: card.id,
            front: card.question,
            back: card.answer,
            status: "new"
        }));

        onGenerate(formattedCards);

        setNotes('');

    } catch (err) {
        console.error("Flashcard error:", err);
        setError("Failed to generate flashcards. Try again.");
    } finally {
        setIsLoading(false);
    }


        
        
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Generate from Notes</label>
                    <div className="flex items-center gap-2">
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 text-xs py-1.5 px-3 rounded-lg flex items-center gap-2 transition-colors border border-white/10"
                        >
                            <Upload size={14} />
                            Upload PDF/PPT
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload}
                            accept=".pdf,.ppt,.pptx"
                            className="hidden" 
                        />
                    </div>
                </div>
                {fileName && (
                    <div className="text-xs text-emerald-400 ml-1 flex items-center gap-1">
                        <FileText size={14} />
                        Attached: {fileName}
                    </div>
                )}
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
