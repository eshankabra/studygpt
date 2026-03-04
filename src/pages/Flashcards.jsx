import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layers,
    Plus,
    ChevronLeft,
    BrainCircuit,
    Sparkles,
    Trash2,
    BookOpen,
    LayoutGrid,
    AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolTabs from '../components/ToolTabs';
import DeckSidebar from '../components/flashcards/DeckSidebar';
import FlashcardGenerator from '../components/flashcards/FlashcardGenerator';
import FlashcardViewer from '../components/flashcards/FlashcardViewer';
import Modal from '../components/flashcards/Modal';

const Flashcards = () => {
    const [decks, setDecks] = useState(() => {
        const saved = localStorage.getItem('study_decks');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeDeckId, setActiveDeckId] = useState(null);
    const [view, setView] = useState('browse'); // 'browse', 'generate', 'study'

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newDeckName, setNewDeckName] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deckToDelete, setDeckToDelete] = useState(null);

    useEffect(() => {
        localStorage.setItem('study_decks', JSON.stringify(decks));
    }, [decks]);

    const activeDeck = decks.find(d => d.id === activeDeckId);

    const handleCreateDeck = (e) => {
        e.preventDefault();
        if (newDeckName.trim()) {
            const newDeck = {
                id: Date.now(),
                name: newDeckName,
                cards: [],
                createdAt: new Date().toISOString()
            };
            setDecks([...decks, newDeck]);
            setActiveDeckId(newDeck.id);
            setView('generate');
            setNewDeckName('');
            setIsCreateModalOpen(false);
        }
    };

    const confirmDeleteDeck = () => {
        if (deckToDelete) {
            const id = deckToDelete.id;
            const nextDecks = decks.filter(d => d.id !== id);
            setDecks(nextDecks);
            if (activeDeckId === id) {
                setActiveDeckId(null);
                setView('browse');
            }
            setIsDeleteModalOpen(false);
            setDeckToDelete(null);
        }
    };

    const handleGenerateCards = (newCards) => {
        if (!activeDeckId) return;

        setDecks(decks.map(deck => {
            if (deck.id === activeDeckId) {
                return {
                    ...deck,
                    cards: [...deck.cards, ...newCards]
                };
            }
            return deck;
        }));
        setView('study');
    };

    const handleUpdateCardStatus = (cardId, status) => {
        setDecks(decks.map(deck => {
            if (deck.id === activeDeckId) {
                return {
                    ...deck,
                    cards: deck.cards.map(card =>
                        card.id === cardId ? { ...card, status } : card
                    )
                };
            }
            return deck;
        }));
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                            <ChevronLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <BrainCircuit className="text-blue-400" />
                                AI Flashcards
                            </h1>
                            <p className="text-slate-400">Master your subjects with AI-generated study cards.</p>
                        </div>
                    </div>

                    {activeDeck && (
                        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setView('study')}
                                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${view === 'study' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                <BookOpen size={16} />
                                Study Mode
                            </button>
                            <button
                                onClick={() => setView('generate')}
                                className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${view === 'generate' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Sparkles size={16} />
                                AI Generator
                            </button>
                        </div>
                    )}
                </div>

                <ToolTabs />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 glass p-6 rounded-3xl border border-white/5 h-fit sticky top-32">
                        <DeckSidebar
                            decks={decks}
                            activeDeckId={activeDeckId}
                            onSelectDeck={(id) => {
                                setActiveDeckId(id);
                                if (view === 'browse') setView('study');
                            }}
                            onCreateDeck={() => setIsCreateModalOpen(true)}
                            onDeleteDeck={(id) => {
                                setDeckToDelete(decks.find(d => d.id === id));
                                setIsDeleteModalOpen(true);
                            }}
                        />
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {!activeDeckId ? (
                                <motion.div
                                    key="no-deck"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="h-full glass rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                        <LayoutGrid className="text-blue-400 w-10 h-10" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Ready to Start?</h2>
                                    <p className="text-slate-400 max-w-sm mb-8">
                                        Select a deck from the sidebar or create a new one to begin your AI-powered study session.
                                    </p>
                                    <button
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="primary-button px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Create Your First Deck
                                    </button>
                                </motion.div>
                            ) : view === 'generate' ? (
                                <motion.div
                                    key="generate-view"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-white mb-1">Generate Flashcards for "{activeDeck.name}"</h3>
                                        <p className="text-slate-400 text-sm">Paste your study material below and our AI will extract key concepts into question-answer pairs.</p>
                                    </div>
                                    <FlashcardGenerator onGenerate={handleGenerateCards} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="study-view"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center"
                                >
                                    <div className="w-full flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold text-white italic">{activeDeck.name}</h3>
                                        <button
                                            onClick={() => setView('generate')}
                                            className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:underline"
                                        >
                                            <Plus size={14} /> Add more cards
                                        </button>
                                    </div>
                                    <FlashcardViewer
                                        cards={activeDeck.cards}
                                        onUpdateCardStatus={handleUpdateCardStatus}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Create Deck Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Deck"
            >
                <form onSubmit={handleCreateDeck} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Deck Name</label>
                        <input
                            autoFocus
                            type="text"
                            value={newDeckName}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            placeholder="e.g. Biology 101, History Chapter 5..."
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(false)}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!newDeckName.trim()}
                            className="flex-1 primary-button px-4 py-3 rounded-xl text-white font-bold disabled:opacity-50"
                        >
                            Create Deck
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Deck"
            >
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                        <AlertCircle size={24} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1 text-white">Are you absolutely sure?</p>
                            <p className="text-sm opacity-80 leading-relaxed">
                                You are about to delete <span className="font-bold underline">"{deckToDelete?.name}"</span>.
                                This action cannot be undone and all cards in this deck will be permanently lost.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
                        >
                            No, Keep it
                        </button>
                        <button
                            onClick={confirmDeleteDeck}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 px-4 py-3 rounded-xl text-white font-bold transition-all shadow-lg shadow-rose-500/20"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Flashcards;
