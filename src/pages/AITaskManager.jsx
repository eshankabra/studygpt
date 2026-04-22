import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ChevronLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ToolTabs from '../components/ToolTabs';

const AITaskManager = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateTasks = async () => {
    if (!input.trim()) {
      setError('Please enter your tasks first!');
      return;
    }

    setError('');
    setIsLoading(true);
    setTasks([]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (!response.ok || !data.tasks) {
        throw new Error();
      }

      setTasks(data.tasks);

    } catch (err) {
      console.log("AI not available. Showing fallback.");

      setTasks([
        { task: "Study Physics", priority: "High", time: "2h" },
        { task: "Complete Math Assignment", priority: "Medium", time: "1.5h" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <CheckCircle className="text-blue-400" />
              AI Task Manager
            </h1>
            <p className="text-slate-400">
              Turn your tasks into a smart, structured schedule.
            </p>
          </div>
        </div>

        <ToolTabs />

        <div className="grid grid-cols-1 gap-8 mt-8">

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-2xl border border-white/5"
          >
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Enter your tasks
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {input.length} characters
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. physics exam tomorrow, math homework, gym"
              className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            />

            <div className="flex justify-end mt-6">
              <button
                onClick={generateTasks}
                disabled={isLoading}
                className="primary-button flex items-center gap-2 px-8 py-2 rounded-xl text-white font-bold transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Schedule
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-rose-400 text-sm mt-4 text-center font-medium">
                {error}
              </p>
            )}
          </motion.div>

          {/* Output Section */}
          {(tasks.length > 0 || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent"
            >
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-blue-400" />
                Your Schedule
              </h3>

              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded-full animate-pulse" />
                  <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map((t, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-white/5"
                    >
                      <div>
                        <p className="text-white font-semibold">{t.task}</p>
                        <p className="text-sm text-slate-400">
                          {t.time} • {t.priority}
                        </p>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        t.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : t.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AITaskManager;