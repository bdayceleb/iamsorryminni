import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/tracker';

export default function ApologyCard({ onNext }) {
    const handleNextClick = () => {
        trackEvent('letter_proceed_to_timeline');
        onNext();
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-paper p-0 md:p-8">

            {/* Noise Overlay Global for this card too */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex h-screen w-full max-w-6xl flex-col overflow-hidden bg-[#FDFBF7] shadow-2xl md:h-[85vh] md:flex-row md:rounded-sm"
            >

                {/* Left Side: The "Book Cover" aesthetics */}
                <div className="relative flex w-full flex-col items-center justify-center border-b border-ink-900/10 bg-[#F5F2EB] p-12 text-center text-ink-900 md:w-5/12 md:border-b-0 md:border-r">
                    {/* Decorative Border */}
                    <div className="absolute inset-4 border border-double border-ink-900/10 md:inset-8"></div>

                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="z-10 mb-8"
                    >
                        <Heart className="h-10 w-10 text-crimson-700/80 fill-crimson-700/80" />
                    </motion.div>

                    <h1 className="z-10 font-serif text-6xl font-bold leading-none tracking-tight text-ink-900 md:text-7xl">
                        For<br />
                        <span className="font-hand text-8xl text-crimson-700">Minni</span>
                    </h1>

                    {/* Corrected Date: VII . II . MMXXI (Feb 7, 2021) */}
                    <p className="z-10 mt-6 font-serif text-sm italic tracking-wider opacity-60">
                        VII . II . MMXXI
                    </p>

                    <button
                        onClick={handleNextClick}
                        className="group z-10 mt-16 hidden items-center gap-3 border-b border-crimson-700 pb-1 text-xs uppercase tracking-[0.2em] text-crimson-900 transition-all hover:gap-5 hover:border-black hover:text-black md:flex"
                    >
                        <span>Proceed to Timeline</span>
                        <ArrowRight className="h-3 w-3" />
                    </button>
                </div>

                {/* Right Side: The Letter */}
                <div className="flex-1 overflow-y-auto bg-paper px-8 py-16 md:px-20 md:py-20">
                    <article className="prose prose-lg prose-p:font-serif prose-p:text-ink-800 prose-headings:font-serif prose-headings:text-ink-900 max-w-none">

                        <p className="font-hand text-5xl text-ink-900">
                            My Dearest Minni,
                        </p>

                        <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:text-crimson-700">
                            I’ve been thinking a lot. Not just about us, but about everything you've been feeling.
                            I know things haven’t been easy lately. I can see the hurt in your eyes, and it breaks me because I put it there.
                        </p>

                        <p>
                            You’ve been told that maybe you deserved something more “settled,” something safer.
                            Maybe, in a world of resumes and predictable checklists, I wasn’t the obvious choice.
                        </p>

                        <p>
                            But I never loved you like a checklist. <br />
                            <span className="text-xl font-medium italic text-crimson-800">I loved you the way you light up the space around you.</span> <br />
                            I loved you for the fire in your eyes and the softness in your soul.
                        </p>

                        <div className="my-12 flex justify-center">
                            <div className="h-px w-32 bg-crimson-900/20"></div>
                        </div>

                        <p>
                            I’m not perfect. I feel deeply, I cry sometimes, and I stumble like every human.
                            But I’m not weak. And I promise you this:
                            <b>I won’t give up on you.</b>
                            I won’t let outside noise drown out what we built from nothing.
                        </p>

                        <p>
                            "You are not ‘just’ my love, Minni.
                            You’re the reason I fight harder.
                            And no part of me ever regrets stepping into your life—because it’s the only place that ever felt like home."
                        </p>

                        <p>
                            First and foremost, I need you to know how much I love you.
                            Over the past few weeks, as we’ve navigated this storm, I’ve been thinking deeply.
                            And I want you to hear me loud and clear when I say:
                            <br /><br />
                            <span className="bg-crimson-50 px-2 font-bold text-crimson-900">This is not about you versus me. This is about us versus the situation.</span>
                        </p>

                        <h4 className="mt-12 font-hand text-4xl text-crimson-700">
                            My Promise
                        </h4>

                        <p>
                            I know that recently, you’ve been feeling like I’ve failed you.
                            When you said that I “could never help you,” it pierced my heart.
                            I’ve been so focused on my own ideas of how to help that I’ve missed the moments when you needed me to just be there.
                            I’m sorry if I made you feel unsupported.
                        </p>

                        <p>
                            In the Bhagavad Gita, Krishna says:
                            <em> "There is neither this world nor the world beyond. How can there be happiness without peace?"</em>
                        </p>

                        <p>
                            True peace comes from knowing that you are enough.
                            Minni, your worth is not measured by any exam score or interview result. Your true strength lies in your heart.
                            And I believe in you—always.
                        </p>

                        <p className="mt-12 text-right">
                            So I’ll wait. I’ll grow. I’ll become.<br />
                            But just know this—my heart has already chosen you.<br />
                            And I’ll keep choosing you, every day.
                        </p>

                        <p className="mt-8 text-right font-hand text-4xl text-ink-900">
                            Yours, truly and fearlessly.
                        </p>
                    </article>

                    {/* Mobile Button */}
                    <div className="mt-16 flex justify-center md:hidden">
                        <button
                            onClick={handleNextClick}
                            className="group rounded-full bg-ink-900 px-8 py-3 text-white shadow-lg active:scale-95"
                        >
                            <span className="mr-2 text-sm uppercase tracking-widest">The Journey</span>
                            <ArrowRight className="inline h-4 w-4" />
                        </button>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
