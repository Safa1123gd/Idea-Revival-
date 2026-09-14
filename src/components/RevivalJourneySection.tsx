import React, { useState } from 'react';
import { Stage } from '../types';
import { STAGE_CONFIG } from '../data/mockData';
import { CheckCircle2, ChevronRight, Sparkles, Clock, FileCheck, ArrowRight, ShieldCheck, History } from 'lucide-react';

interface RevivalJourneySectionProps {
  onExploreStage?: (stage: Stage) => void;
}

export const RevivalJourneySection: React.FC<RevivalJourneySectionProps> = ({
  onExploreStage,
}) => {
  const [selectedStage, setSelectedStage] = useState<Stage>('revived');
  const stages: Stage[] = ['concept', 'revived', 'teamed_up', 'building', 'live'];

  const stageDetails: Record<
    Stage,
    {
      cemeteryState: string;
      resurrectionStep: string;
      milestoneExample: string;
      keyPrerequisites: string[];
      roleResponsibilities: string;
    }
  > = {
    concept: {
      cemeteryState: 'Dormant in notes, forgotten drive folders, or napkin sketches.',
      resurrectionStep: 'Cataloged with structured problem statement, mechanism hypothesis, and required skills.',
      milestoneExample: '“Initial field observation data compiled across 6 target communities.”',
      keyPrerequisites: [
        'Well-defined problem statement (who, where, why)',
        'Proposed operational mechanism (how it works)',
        'Initial skills & resource checklist defined',
      ],
      roleResponsibilities: 'Creator defines domain problem and sets collaboration expectations.',
    },
    revived: {
      cemeteryState: 'Considered "too difficult" due to missing coding or engineering skills.',
      resurrectionStep: 'Evaluated by the 5-point Revival Score engine and listed in the open marketplace for builder adoption.',
      milestoneExample: '“Revived specifications published; adoption protocol opened for IoT engineers.”',
      keyPrerequisites: [
        'Revival Score calculated (>70 benchmark)',
        'Attribution agreement and IP license chosen (e.g. MIT, CERN, CC BY)',
        '3-tier visibility set to Public or Protected Preview',
      ],
      roleResponsibilities: 'Creator reviews incoming adoption proposals from qualified builders.',
    },
    teamed_up: {
      cemeteryState: 'Stalled as a solo frustration without complementary brains.',
      resurrectionStep: 'Adoption protocol accepted! Creator and technical adopter enter collaborative agreement preserving creator attribution.',
      milestoneExample: '“Ayan Rahman adopted hardware pipeline; weekly 10hr sprint schedule locked in.”',
      keyPrerequisites: [
        'Adoption proposal reviewed and accepted by Creator',
        'Weekly time commitment and role boundaries agreed upon',
        'Shared code repository or hardware workgroup launched',
      ],
      roleResponsibilities: 'Adopter takes lead on technical build; Creator provides domain guidance and testing access.',
    },
    building: {
      cemeteryState: 'Faded due to lack of momentum or accountability.',
      resurrectionStep: 'Active sprints with timestamped milestone logging, git commits, lab prototypes, and challenge grant alignment.',
      milestoneExample: '“PCB revision 1.2 assembled; telemetry reporting live sensor data to dashboard.”',
      keyPrerequisites: [
        'Active milestone updates logged every 14 days',
        'Working MVP or alpha circuit under testing',
        'Eligible for Institutional Challenge Grant applications',
      ],
      roleResponsibilities: 'Team reports milestone progress directly to the community.',
    },
    live: {
      cemeteryState: 'Zero impact delivered because execution never crossed the finish line.',
      resurrectionStep: 'Functional prototype deployed in production, serving real humans, and open-sourced for global replication.',
      milestoneExample: '“Live commercial installation in Neukölln Eco-Wash achieving 61.4% heat recovery.”',
      keyPrerequisites: [
        'Operational pilot serving real users in frontline setting',
        'Public verifiable performance metrics',
        'Full documentation published for civic replication',
      ],
      roleResponsibilities: 'Joint maintenance, scaling partnerships, and open-source governance.',
    },
  };

  const currentInfo = stageDetails[selectedStage];
  const currentConfig = STAGE_CONFIG[selectedStage];

  return (
    <section id="revival-journey" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Idea Revival Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From the <span className="text-rose-600 line-through decoration-rose-400">“Idea Cemetery”</span> into Active Resurrection
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Every breakthrough project follows our verified 5-stage lifecycle. Click any stage below to inspect how ideas evolve from dormant thoughts into deployed reality.
          </p>
        </div>

        {/* Interactive Horizontal Progress Stepper */}
        <div className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {stages.map((stage, idx) => {
              const cfg = STAGE_CONFIG[stage];
              const isSelected = selectedStage === stage;
              const stageIndex = stages.indexOf(selectedStage);
              const isPast = idx < stageIndex;

              return (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                      : isPast
                      ? 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{cfg.icon}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : isPast
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-1.5">
                    <span>{cfg.label}</span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-snug">
                    {cfg.shortDesc}
                  </p>

                  {/* Active bottom indicator bar */}
                  {isSelected && (
                    <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage In-Depth Focus Panel */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Stage overview & emotional transition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentConfig.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Stage {stages.indexOf(selectedStage) + 1}: {currentConfig.label}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Active Lifecycle Focus
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{currentConfig.shortDesc}</p>
                </div>
              </div>

              {/* Emotional Transformation Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-rose-200/80 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    In the "Idea Cemetery"
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-serif italic">
                    "{currentInfo.cemeteryState}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-200/80 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    In Active Resurrection
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {currentInfo.resurrectionStep}
                  </p>
                </div>
              </div>

              {/* Real-time Milestone Snapshot */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Real-World Milestone Example:</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 border border-slate-200/70">
                  {currentInfo.milestoneExample}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                  <span>Logged with permanent timestamp & cryptographically verified author attribution</span>
                  <span className="text-emerald-600 font-semibold">IR-Audit Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Requirements to graduate & roles */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Requirements to Advance This Stage
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {currentInfo.keyPrerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Creator & Adopter Responsibilities
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentInfo.roleResponsibilities}
                </p>
              </div>

              {onExploreStage && (
                <button
                  onClick={() => onExploreStage(selectedStage)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Filter Directory for {currentConfig.label} Ideas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
