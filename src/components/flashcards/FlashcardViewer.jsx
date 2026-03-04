import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Brain } from 'lucide-react';
import FlashcardCard from './FlashcardCard';

const FlashcardViewer = ({ cards, onUpdateCardStatus }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev + 1), 50);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev - 1), 50);
        }
    };

    const handleStatusUpdate = (status) => {
        onUpdateCardStatus(currentCard.id, status);
        if (currentIndex < cards.length - 1) {
            handleNext();
        }
    };

    if (!cards || cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] text-slate-500">
                <Brain size={48} className="mb-4 opacity-20" />
                <p>No cards in this deck yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-8 py-8 w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                    className="h-full bg-blue-500"
                />
            </div>

            <div className="flex justify-between items-center w-full text-sm font-medium text-slate-400">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                    {Math.round(((currentIndex + 1) / cards.length) * 100)}% Complete
                </span>
            </div>

            <div className="relative w-full flex justify-center py-4">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -direction * 50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex justify-center"
                    >
                        <FlashcardCard
                            card={currentCard}
                            isFlipped={isFlipped}
                            onFlip={() => setIsFlipped(!isFlipped)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleBack}
                        disabled={currentIndex === 0}
                        className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 disabled:opacity-20 transition-all border border-white/5 shadow-lg"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <AnimatePresence mode="wait">
                        {isFlipped ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex gap-4"
                            >
                                <button
                                    onClick={() => handleStatusUpdate('review')}
                                    className="px-6 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold flex items-center gap-2 hover:bg-rose-500/20 transition-all"
                                >
                                    <RotateCcw size={18} />
                                    Review Again
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('mastered')}
                                    className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center gap-2 hover:bg-emerald-500/20 transition-all"
                                >
                                    <CheckCircle2 size={18} />
                                    I Know This
                                </button>
                            </motion.div>
                        ) : (
                            <div className="w-[300px] h-[52px] flex items-center justify-center text-slate-500 italic text-sm">
                                Flip the card to mark your progress
                            </div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === cards.length - 1}
                        className="p-4 rounded-2xl glass hover:bg-white/10 text-slate-400 disabled:opacity-20 transition-all border border-white/5 shadow-lg"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlashcardViewer;
