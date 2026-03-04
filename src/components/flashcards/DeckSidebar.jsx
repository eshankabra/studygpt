import { Plus, Layers, Trash2 } from 'lucide-react';

const DeckSidebar = ({ decks, activeDeckId, onSelectDeck, onCreateDeck, onDeleteDeck }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Layers size={18} className="text-blue-400" />
                    Decks
                </h3>
                <button
                    onClick={onCreateDeck}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-blue-400"
                    title="New Deck"
                >
                    <Plus size={20} />
                </button>
            </div>

            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {decks.map((deck) => (
                    <div
                        key={deck.id}
                        className={`
                            group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border
                            ${activeDeckId === deck.id
                                ? 'bg-blue-500/10 border-blue-500/30 text-white'
                                : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                        `}
                        onClick={() => onSelectDeck(deck.id)}
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-sm truncate max-w-[140px]">{deck.name}</span>
                            <span className="text-[10px] opacity-50 uppercase font-bold tracking-wider">
                                {deck.cards.length} Cards
                            </span>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteDeck(deck.id);
                            }}
                            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg transition-all"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}

                {decks.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-slate-600 text-xs italic">No decks yet. Create one to get started!</p>
                    </div>
                )}
            </div>

            {/* Progress Stats Placeholder */}
            {decks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Overall Progress</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Mastered</span>
                            <span className="text-emerald-400 font-bold">
                                {decks.reduce((acc, deck) => acc + deck.cards.filter(c => c.status === 'mastered').length, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">To Review</span>
                            <span className="text-blue-400 font-bold">
                                {decks.reduce((acc, deck) => acc + deck.cards.filter(c => c.status === 'review').length, 0)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckSidebar;
