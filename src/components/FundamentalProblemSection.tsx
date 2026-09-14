import React, { useState } from 'react';
import { BARRIERS } from '../data/mockData';
import { 
  Code2, 
  Coins, 
  Clock, 
  Users2, 
  Compass, 
  ShieldCheck, 
  Quote, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FundamentalProblemSectionProps {
  onFindBuilder: () => void;
}

export const FundamentalProblemSection: React.FC<FundamentalProblemSectionProps> = ({
  onFindBuilder,
}) => {
  const [activeBarrier, setActiveBarrier] = useState<string>('technical-skills');

  // Map icon names to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Coins':
        return Coins;
      case 'Clock':
        return Clock;
      case 'Users2':
        return Users2;
      case 'Compass':
        return Compass;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="barriers" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Core Philosophy Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-700/60 mb-14 relative overflow-hidden">
          {/* Subtle watermark background decorative icon */}
          <div className="absolute -right-6 -bottom-8 opacity-10 text-emerald-400 pointer-events-none">
            <Quote className="w-64 h-64" />
          </div>

          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Philosophical Anchor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-4">
              “The idea isn’t always the problem.{' '}
              <span className="text-emerald-400">
                Sometimes the missing piece is simply the right person.”
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
              Modern startup culture places the entire burden of execution on lone individuals. But world-changing breakthroughs happen at the intersection of a deep problem-finder (who spots the pain point) and a skilled builder (who can assemble the engine).
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={onFindBuilder}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Find Your Missing Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* The Six Common Barriers to Execution */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The 6 Structural Execution Barriers
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Why do brilliant concepts stall? These are the six bottlenecks that paralyze innovation—and how our adoption protocol resolves each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BARRIERS.map((barrier) => {
            const Icon = getIcon(barrier.iconName);
            const isHovered = activeBarrier === barrier.id;

            return (
              <div
                key={barrier.id}
                onMouseEnter={() => setActiveBarrier(barrier.id)}
                className={`bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isHovered
                    ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20 translate-y-[-2px]'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top: Icon & Barrier name */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Barrier 0{BARRIERS.indexOf(barrier) + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {barrier.title}
                  </h4>

                  {/* The Barrier Problem */}
                  <div className="mb-4">
                    <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      The Bottleneck
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {barrier.problem}
                    </p>
                  </div>
                </div>

                {/* The Revival Solution */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    How Idea Revival Solves It
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/80">
                    {barrier.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
