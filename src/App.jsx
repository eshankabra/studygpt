import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolTabs from './components/ToolTabs';
import FeatureGrid from './components/FeatureGrid';
import DashboardPreview from './components/DashboardPreview';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-navy-900 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />

        <div className="relative">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-navy-900" />
          <ToolTabs />
        </div>

        <section id="features" className="py-12">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
            <span className="text-blue-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
              Everything you need to <br />
              <span className="gradient-text">Study Smarter</span>
            </h2>
          </div>
          <FeatureGrid />
        </section>

        <DashboardPreview />

        {/* Call to Action Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-3xl text-center relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-transparent">
            <div className="absolute top-0 right-0 -z-10 w-[300px] h-[300px] bg-blue-500/10 blur-3xl rounded-full" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your grades?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 1.2M+ students who are already using StudyGPT to master their curriculum.
            </p>
            <div className="flex justify-center">
              <button className="primary-button px-12 py-4 rounded-xl text-white font-bold text-lg">
                Create Your Account
              </button>
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />
    </div>
  );
}

export default App;
