import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORIES = [
    {
        id: 1,
        content: <span className="font-serif text-5xl">Minni...</span>,
        duration: 3
    },
    {
        id: 2,
        content: <span className="text-2xl font-light leading-relaxed text-ink-600">Please... <br /> Just listen for a moment.</span>,
        duration: 4
    },
    {
        id: 3,
        content: <span className="text-2xl font-light leading-relaxed text-ink-600">Do you remember when the silence <br />wasn't this <span className="font-serif font-bold text-ink-900">loud</span>?</span>,
        duration: 4
    },
    {
        id: 4,
        content: <span className="font-hand text-6xl text-ink-800">I do.</span>,
        duration: 3
    },
    // GIF: Cuddling / Intimacy
    {
        id: 101,
        image: 'https://media.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif', // Cuddling
        content: <span className="text-xl italic text-paper drop-shadow-md">When it was just warmth.</span>,
        duration: 5
    },
    {
        id: 5,
        content: <span className="text-3xl">I remember a time when <br /> looking at me didn't cause you <span className="font-serif italic text-crimson-800">pain</span>.</span>,
        duration: 4
    },
    {
        id: 6,
        content: <span className="text-3xl">And realising that I am the cause... <br /> <span className="font-bold text-crimson-700">shatters me</span>.</span>,
        duration: 4
    },
    {
        id: 7,
        content: <span className="text-4xl text-ink-900">You were the <span className="font-hand text-7xl text-crimson-600">purest</span> thing <br /> in my chaotic world.</span>,
        duration: 4
    },
    // GIF: Pottery scene (Ghost) - "Purest thing" vibe
    {
        id: 102,
        image: 'https://media.giphy.com/media/2mOG3kTuLxT9e/giphy.gif', // Pottery
        content: <span className="text-xl italic text-paper drop-shadow-md">We were art in motion.</span>,
        duration: 5
    },
    {
        id: 8,
        content: <span className="text-3xl">And I committed a <span className="font-hand text-8xl text-crimson-600">sin</span> <br /> to the purest thing for me in the world.</span>,
        duration: 4
    },
    {
        id: 9,
        content: <span className="text-5xl">I <span className="font-hand text-9xl text-crimson-600">lied</span>.</span>,
        duration: 3
    },
    {
        id: 10,
        content: <span className="text-2xl text-ink-600">I hid the truth, thinking I was protecting us... <br /> only to realize I was destroying <b>Us</b>.</span>,
        duration: 4
    },
    {
        id: 11,
        content: <span className="text-3xl">I broke the sacred trust.</span>,
        duration: 3
    },
    {
        id: 14,
        content: <span className="text-3xl leading-relaxed">I stopped planning the <span className="font-serif italic text-crimson-700">dates</span> <br /> that made your soul dance.</span>,
        duration: 4
    },
    {
        id: 16,
        content: <span className="text-2xl leading-relaxed text-ink-600">I saw you carrying the <span className="font-serif italic text-crimson-800">weight</span> <br /> of the world alone.</span>,
        duration: 4
    },
    {
        id: 17,
        content: <span className="text-3xl">And I tried to help.</span>,
        duration: 3
    },
    {
        id: 18,
        content: <span className="text-3xl">But my helping was <span className="font-bold text-ink-900">blind</span>.</span>,
        duration: 3
    },
    {
        id: 19,
        content: <span className="text-3xl leading-relaxed">I offered <span className="font-serif italic text-ink-700">solutions</span>... <br /> when you just needed my hand.</span>,
        duration: 4
    },
    {
        id: 20,
        content: <span className="text-3xl leading-relaxed">I tried to be efficient... <br /> instead of being <span className="font-hand text-6xl text-crimson-600">present</span>.</span>,
        duration: 4
    },
    {
        id: 21,
        content: <span className="text-3xl text-crimson-800">And in doing so... <br /> I made you feel alone in a room full of people.</span>,
        duration: 4
    },
    {
        id: 22,
        content: <span className="font-serif text-3xl italic">That is my failure.</span>,
        duration: 3
    },
    {
        id: 23,
        content: <span className="text-2xl">But I look at you now...</span>,
        duration: 3
    },
    // GIF: Making up / Holding hands
    {
        id: 24,
        content: <span className="text-3xl">And I see the <span className="font-hand text-6xl text-ink-800">fire</span> that still burns.</span>,
        duration: 3
    },
    {
        id: 25,
        content: <span className="text-2xl">I refuse to let that fire go out.</span>,
        duration: 3
    },
    {
        id: 26,
        content: <span className="text-3xl">I am done with 'efficient'. <br /> I am done with 'hiding'.</span>,
        duration: 4
    },
    {
        id: 29,
        content: <span className="font-hand text-7xl text-ink-900">My Redemption...</span>,
        duration: 3
    },
    {
        id: 30,
        content: <span className="font-serif text-5xl font-bold">Starts Here.</span>,
        duration: 3
    },
];

export default function StoryFlow({ onComplete }) {
    const [index, setIndex] = useState(0);

    // Import tracker dynamically to avoid circular deps
    const track = async (event, meta = {}) => {
        const { trackEvent } = await import('../utils/tracker');
        trackEvent(event, meta);
    };

    const nextSlide = () => {
        if (index < STORIES.length - 1) {
            track('story_click', { slideIndex: index, slideId: STORIES[index].id });
            setIndex(index + 1);
        } else {
            track('story_completed');
            onComplete();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index]);

    const currentStory = STORIES[index];

    return (
        <div
            className="relative flex h-screen w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-paper px-6 text-center"
            onClick={nextSlide}
        >
            {/* Film Grain & vignnet */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-10 mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            <div className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

            <AnimatePresence mode="wait">

                {/* Render Image Slide if it exists */}
                {currentStory.image ? (
                    <motion.div
                        key={`img-${currentStory.id}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0 flex items-center justify-center bg-black"
                    >
                        <img src={currentStory.image} alt="Memory" className="h-full w-full object-cover opacity-60" />
                        <div className="absolute bottom-20 z-10 font-serif text-3xl text-white drop-shadow-2xl">
                            {currentStory.content}
                        </div>
                    </motion.div>
                ) : (
                    /* Render Text Slide */
                    <motion.div
                        key={`txt-${currentStory.id}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1.1, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 max-w-4xl"
                    >
                        <div className="font-serif text-ink-900 md:text-5xl">
                            {currentStory.content}
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Subtle Progress Bar */}
            <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-1.5 z-50">
                {STORIES.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 2 }}
                        animate={{
                            height: i === index ? 32 : 4,
                            backgroundColor: i === index ? '#8B1E24' : (currentStory.image ? 'rgba(255,255,255,0.4)' : 'rgba(26, 21, 21, 0.1)')
                        }}
                        className="w-1 rounded-full transition-all duration-700 shadow-sm"
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2, duration: 1 }}
                className={`absolute bottom-6 font-sans text-[10px] uppercase tracking-[0.3em] z-50 ${currentStory.image ? 'text-white' : 'text-ink-900'}`}
            >
                Click to continue
            </motion.div>
        </div>
    );
}
