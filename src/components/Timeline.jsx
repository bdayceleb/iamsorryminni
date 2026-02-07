import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

const DAYS = [
    { date: 'Feb 7', label: 'Rose Day', icon: '🌹', message: 'Just like a rose, my love for you blooms even through the thorns.' },
    { date: 'Feb 8', label: 'Propose Day', icon: '💍', message: 'I promise to choose you, every single day.' },
    { date: 'Feb 9', label: 'Chocolate Day', icon: '🍫', message: 'Life is sweeter with you in it.' },
    { date: 'Feb 10', label: 'Teddy Day', icon: '🧸', message: 'Ready to be your comfort, always.' },
    { date: 'Feb 11', label: 'Promise Day', icon: '🤞', message: 'I promise to never let you go to sleep angry again.' },
    { date: 'Feb 12', label: 'Hug Day', icon: '🤗', message: 'Your arms are my favorite place.' },
    { date: 'Feb 13', label: 'Kiss Day', icon: '💋', message: 'Sealed with a kiss.' },
    { date: 'Feb 14', label: 'Valentine\'s', icon: '❤️', message: 'My Forever Valentine.' },
];

export default function Timeline({ onNavigate }) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setComplete(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-paper py-20 pb-40">

            <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center font-serif text-4xl font-bold text-ink-900 md:text-5xl"
            >
                Our Journey to Love
            </motion.h2>

            <div className="relative w-full max-w-4xl px-4">
                {/* The Road Line */}
                <div className="absolute left-4 top-0 h-full w-0.5 origin-top bg-ink-900/10 md:left-1/2 md:-translate-x-1/2"></div>

                {/* Progress Bar */}
                <motion.div
                    className="absolute left-4 top-0 w-0.5 origin-top bg-crimson-600 md:left-1/2 md:-translate-x-1/2"
                    initial={{ height: "0%" }}
                    animate={{ height: complete ? "14%" : "0%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                <div className="space-y-20">
                    {DAYS.map((day, index) => (
                        <TimelineItem
                            key={day.date}
                            day={day}
                            index={index}
                            isTarget={index === 0}
                            isReached={complete && index === 0}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ day, index, isTarget, isReached, onNavigate }) {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex w-full flex-col items-center md:items-stretch`}>
            <div className={`relative flex w-full items-center ${isLeft ? 'md:flex-row-reverse' : ''} justify-end md:justify-center`}>

                {/* Date Marker */}
                <div className={`absolute left-4 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-paper bg-ink-200 md:left-1/2 ${isReached ? 'border-crimson-600' : ''}`}>
                    {isTarget && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: isReached ? 1 : 0 }}
                            className="h-full w-full rounded-full bg-crimson-600"
                        />
                    )}
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0.3, scale: 0.95 }}
                    animate={{
                        opacity: isReached ? 1 : (isTarget ? 1 : 0.3),
                        scale: isReached ? 1.02 : 1
                    }}
                    className={`ml-12 w-full max-w-sm rounded-xl border border-ink-900/5 bg-white p-8 shadow-sm transition-all duration-500 md:ml-0 md:w-5/12 ${isLeft ? 'md:mr-16 md:text-right' : 'md:ml-16 md:text-left'} ${isReached ? 'border-crimson-100 shadow-xl ring-1 ring-crimson-50' : ''}`}
                >
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-crimson-600 opacity-60">{day.date}</span>
                    <h3 className="mb-2 font-serif text-2xl text-ink-900">{day.label}</h3>

                    {isReached && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ delay: 0.5 }}
                            className="overflow-hidden"
                        >
                            <div className={`my-4 flex text-5xl opacity-90 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                <motion.span
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    {day.icon}
                                </motion.span>
                            </div>
                            <p className="font-sans text-sm font-medium leading-relaxed text-ink-600">{day.message}</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* FLOATING BUTTON - OUTSIDE THE CARD for Rose Day */}
            {index === 0 && isReached && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-6 flex justify-center"
                >
                    <button
                        onClick={() => {
                            trackEvent('timeline_surprise_clicked');
                            onNavigate('roseday');
                        }}
                        className="group flex animate-pulse items-center gap-3 rounded-full border-2 border-rose-400 bg-rose-50 px-6 py-3 text-sm font-bold uppercase tracking-widest text-rose-700 shadow-lg transition-all hover:animate-none hover:bg-rose-100 hover:shadow-xl hover:ring-4 hover:ring-rose-200 hover:ring-offset-2"
                    >
                        <span>🌹 Click here for your surprise</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </button>
                </motion.div>
            )}
        </div>
    );
}
