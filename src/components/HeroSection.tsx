import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Users, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onSubmitIdea: () => void;
  onViewJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onSubmitIdea,
  onViewJourney,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/40 border-b border-slate-200/80 pt-10 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Background soft ambient accents */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* The 5-Second Clarity Experience Banner */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The 5-Second Clarity Experience</span>
            <span className="text-emerald-300">|</span>
            <span className="text-emerald-700 font-normal">Dormant Ideas → Active Resurrection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-5">
            Dormant ideas don't die.{' '}
            <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-4">
              They wait for the right builder.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
            Millions of transformative civic, environmental, and tech concepts languish in notebook margins. 
            We pull high-leverage thoughts out of the <span className="font-semibold text-slate-800">“Idea Cemetery”</span> and pair creators with software and hardware engineers ready to adopt and deploy them.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              onClick={onExplore}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Ideas to Adopt</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={onSubmitIdea}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 active:scale-95 text-slate-800 text-sm font-bold px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <span>Submit a Dormant Concept</span>
            </button>

            <button
              onClick={onViewJourney}
              className="text-xs text-slate-500 hover:text-emerald-700 font-semibold px-3 py-2 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>See 5-Stage Revival Lifecycle</span>
              <span className="text-emerald-500 font-mono">→</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars of the Revival Protocol */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">STEP 01</span>
              <span className="text-lg">💡</span>
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Dormant Extraction</div>
            <p className="text-xs text-slate-500 leading-snug">Unearth unfinished blueprints from creators lacking dev capability.</p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">STEP 02</span>
              <span className="text-lg">📊</span>
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Revival Scoring</div>
            <p className="text-xs text-slate-500 leading-snug">Algorithmic 5-point assessment: feasibility, impact, and resources.</p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">STEP 03</span>
              <span className="text-lg">🤝</span>
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Adoption Protocol</div>
            <p className="text-xs text-slate-500 leading-snug">Structured adoption matches builders while permanently attributing creators.</p>
          </div>

          <div className="bg-white/90 p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">STEP 04</span>
              <span className="text-lg">🚀</span>
            </div>
            <div className="font-bold text-sm text-slate-900 mb-1">Living Prototypes</div>
            <p className="text-xs text-slate-500 leading-snug">Public milestones, grant alignment, and real-world deployment.</p>
          </div>
        </div>

        {/* Live Ecosystem Summary Counter */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">8</div>
            <div className="text-xs text-slate-500 font-medium">Curated Concepts Resurrected</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">100%</div>
            <div className="text-xs text-slate-500 font-medium">Attribution Preserved (IR-IDs)</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">5-Stage</div>
            <div className="text-xs text-slate-500 font-medium">Verified Progression Lifecycle</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">$105,000+</div>
            <div className="text-xs text-slate-500 font-medium">In Active Challenge Grants</div>
          </div>
        </div>
      </div>
    </section>
  );
};
