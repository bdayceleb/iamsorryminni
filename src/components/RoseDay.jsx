import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, X } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

export default function RoseDay({ onBack }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleYesClick = () => {
        trackEvent('rose_day_yes_clicked');
        // Could add confetti or special animation here
    };

    const handleNoClick = () => {
        trackEvent('rose_day_no_clicked');
        setShowPopup(true);
    };

    const handleBackClick = () => {
        trackEvent('rose_day_return_clicked');
        onBack();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-red-50 p-6"
        >
            {/* Animated Background Roses */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, opacity: 0, rotate: 0 }}
                        animate={{
                            y: '110vh',
                            opacity: [0, 1, 1, 0],
                            rotate: 360
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 8 + Math.random() * 8,
                            delay: i * 1.5,
                            ease: "linear"
                        }}
                        className="absolute text-3xl"
                        style={{ left: `${(i * 8) + 5}%` }}
                    >
                        🌹
                    </motion.div>
                ))}
            </div>

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleBackClick}
                className="absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-rose-800 shadow-lg backdrop-blur-md transition-all hover:bg-white hover:shadow-xl"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Return</span>
            </motion.button>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-lg overflow-visible rounded-3xl border border-white/50 bg-white/80 p-10 shadow-2xl backdrop-blur-xl md:p-14"
            >
                {/* Inner Decorative Border */}
                <div className="absolute inset-3 z-0 rounded-2xl border border-dashed border-rose-200/50"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-5 text-center">

                    {/* Icon */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex items-center gap-2"
                    >
                        <Sparkles className="h-6 w-6 text-rose-400" />
                        <span className="text-4xl">🌹</span>
                        <Sparkles className="h-6 w-6 text-rose-400" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="font-serif text-5xl font-bold text-rose-900 md:text-6xl">
                        Happy Rose Day
                    </h1>

                    {/* Quote */}
                    <p className="font-serif text-xl italic leading-relaxed text-rose-700/80">
                        "A single rose can be my garden... <br /> a single friend, my world."
                    </p>

                    {/* Divider */}
                    <div className="my-2 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

                    {/* Message */}
                    <p className="font-sans text-lg leading-relaxed text-gray-700">
                        But you, <span className="font-semibold text-rose-600">Minni</span>, are my entire universe. <br />
                        I promise to value you, cherish you, and keep our love blooming, <br />
                        <span className="italic">no matter the season.</span>
                    </p>

                    {/* Sticker: Guy Kneeling with Rose */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                        className="my-4"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3069/3069186.png"
                            alt="Man proposing with rose"
                            className="h-28 w-28 drop-shadow-lg transition-transform duration-500 hover:scale-110 md:h-32 md:w-32"
                        />
                    </motion.div>

                    {/* Final Question */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="font-hand text-4xl font-bold text-rose-600"
                    >
                        Will you accept this rose?
                    </motion.p>

                    {/* Buttons Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="relative mt-4 flex h-20 w-full items-center justify-center gap-6"
                    >
                        {/* Yes Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleYesClick}
                            className="rounded-full bg-gradient-to-r from-rose-500 to-red-500 px-10 py-4 text-lg font-bold uppercase tracking-widest text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-rose-500/30"
                        >
                            Yes, I Do 💖
                        </motion.button>

                        {/* No Button - Just shows popup on click */}
                        <button
                            onClick={handleNoClick}
                            className="rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-bold uppercase tracking-widest text-gray-500 shadow-md transition-all hover:border-gray-400 hover:bg-gray-50"
                        >
                            No 😢
                        </button>
                    </motion.div>

                </div>
            </motion.div>

            {/* Footer */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 text-xs uppercase tracking-widest text-rose-800"
            >
                Made with love, for you.
            </motion.p>

            {/* Popup Modal when No is clicked */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 30 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-2xl"
                        >
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-4 text-5xl">💔</div>

                            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-800">
                                I Understand...
                            </h2>

                            <p className="font-sans text-lg leading-relaxed text-gray-600">
                                I know you are very upset at me, and I understand this completely.
                            </p>

                            <p className="mt-4 font-sans text-lg leading-relaxed text-gray-600">
                                I won't force you to accept a rose today.
                            </p>

                            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

                            <p className="font-serif text-xl italic text-rose-600">
                                I want to win back your trust. <br />
                                I will come back with something even better. ❤️
                            </p>

                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gray-700 shadow-md transition-all hover:shadow-lg"
                            >
                                Okay
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}
