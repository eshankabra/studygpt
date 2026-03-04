import { motion } from 'framer-motion';

const FlashcardCard = ({ card, isFlipped, onFlip }) => {
    return (
        <div
            className="relative w-full max-w-md h-[400px] cursor-pointer group perspective-1000"
            onClick={onFlip}
        >
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d"
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full glass rounded-3xl border border-white/10 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/5 to-transparent">
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Question</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {card.front}
                        </h2>
                        <div className="mt-8 text-slate-500 text-sm flex items-center gap-2">
                            <span>Click to reveal answer</span>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="w-full h-full glass rounded-3xl border border-blue-500/30 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-tr from-blue-600/10 to-transparent">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">Answer</span>
                        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                            {card.back}
                        </p>
                        <div className="mt-8 text-slate-500 text-sm italic">
                            How did you do?
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Subtle Glow Effect */}
            <div className={`absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 transition-opacity duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
};

export default FlashcardCard;
