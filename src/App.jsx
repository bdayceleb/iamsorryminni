import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StoryFlow from './components/StoryFlow';
import ApologyCard from './components/ApologyCard';
import Timeline from './components/Timeline';
import RoseDay from './components/RoseDay';
import { trackEvent, getEventSummary } from './utils/tracker';

function App() {
    const [view, setView] = useState('story'); // story -> letter -> timeline

    // Track page views
    useEffect(() => {
        trackEvent('page_view', { page: view });
    }, [view]);

    // Track initial session start
    useEffect(() => {
        trackEvent('session_start');

        // Log summary to console on unmount or before page unload
        window.addEventListener('beforeunload', () => {
            console.log('📊 Session Summary:', getEventSummary());
        });
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-paper font-sans text-ink-900 selection:bg-rose-200 selection:text-crimson-900">

            {/* Decorative Textures */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

            <AnimatePresence mode="wait">

                {view === 'story' && (
                    <motion.div
                        key="story"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <StoryFlow onComplete={() => setView('letter')} />
                    </motion.div>
                )}

                {view === 'letter' && (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <ApologyCard onNext={() => setView('timeline')} />
                    </motion.div>
                )}

                {view === 'timeline' && (
                    <motion.div
                        key="timeline"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 h-full w-full"
                    >
                        <Timeline onNavigate={(page) => setView(page)} />
                    </motion.div>
                )}

                {view === 'roseday' && (
                    <motion.div
                        key="roseday"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-20 h-full w-full"
                    >
                        <RoseDay onBack={() => setView('timeline')} />
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

export default App;
