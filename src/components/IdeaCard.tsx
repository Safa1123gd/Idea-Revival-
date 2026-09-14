import React from 'react';
import { Idea, Persona } from '../types';
import { STAGE_CONFIG } from '../data/mockData';
import { RevivalScoreGauge } from './RevivalScoreGauge';
import { 
  Users, 
  Tag, 
  ArrowUpRight, 
  HeartHandshake, 
  Eye, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface IdeaCardProps {
  idea: Idea;
  currentPersona: Persona;
  onViewDetails: (idea: Idea) => void;
  onOpenScoreBreakdown: (idea: Idea) => void;
  onAdopt: (idea: Idea) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  currentPersona,
  onViewDetails,
  onOpenScoreBreakdown,
  onAdopt,
}) => {
  const stageCfg = STAGE_CONFIG[idea.stage];
  const isCreator = currentPersona.id === idea.creatorId;
  const isAlreadyAdoptedByMe = idea.adopters.some((a) => a.id === currentPersona.id);
  const hasPendingRequestFromMe = idea.adoptionRequests.some(
    (r) => r.applicantId === currentPersona.id && r.status === 'pending'
  );

  // Difficulty badge colors
  const difficultyColors = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  }[idea.difficulty];

  return (
    <div
      id={`idea-card-${idea.id}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
    >
      {/* Card Header */}
      <div className="p-5 pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Unique Idea ID and Category */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/90 tracking-tight">
              {idea.id}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {idea.category}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${difficultyColors}`}>
              {idea.difficulty}
            </span>
          </div>

          {/* Stage Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold">
            <span>{stageCfg.icon}</span>
            <span>{stageCfg.label}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(idea)}
          className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-emerald-600 transition-colors cursor-pointer group-hover:text-emerald-700"
        >
          {idea.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {idea.tagline}
        </p>
      </div>

      {/* Problem Excerpt & Score Gauge */}
      <div className="p-5 py-4 space-y-3.5 flex-1">
        {/* Excerpt box */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Problem Statement
          </span>
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            "{idea.problemStatement}"
          </p>
        </div>

        {/* Revival Score Bar & Radial Gauge Trigger */}
        <div className="flex items-center justify-between p-2.5 bg-emerald-50/40 rounded-xl border border-emerald-100/80">
          <div className="flex items-center gap-3">
            <RevivalScoreGauge
              score={idea.revivalScore.totalScore}
              size="sm"
              showLabel={true}
              onClick={() => onOpenScoreBreakdown(idea)}
            />
          </div>
          <button
            onClick={() => onOpenScoreBreakdown(idea)}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Inspect 5 Weights</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Required Skills Tags */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Sought-After Skills ({idea.skillsNeeded.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {idea.skillsNeeded.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors"
              >
                {skill}
              </span>
            ))}
            {idea.skillsNeeded.length > 3 && (
              <span className="text-[11px] font-medium bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded-md">
                +{idea.skillsNeeded.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Creator Attribution & Action Buttons */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Creator Info */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={idea.creatorAvatar}
            alt={idea.creatorName}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-800 truncate leading-tight">
              {idea.creatorName}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {idea.adopters.length > 0
                ? `${idea.adopters.length} builder teamed`
                : 'Seeking adopter'}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onViewDetails(idea)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Details
          </button>

          {isCreator ? (
            <button
              onClick={() => onViewDetails(idea)}
              className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              My Idea
            </button>
          ) : isAlreadyAdoptedByMe ? (
            <button
              onClick={() => onViewDetails(idea)}
              className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold cursor-pointer"
            >
              Adopted ✓
            </button>
          ) : hasPendingRequestFromMe ? (
            <button
              onClick={() => onViewDetails(idea)}
              className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold cursor-pointer"
            >
              Pending
            </button>
          ) : (
            <button
              onClick={() => onAdopt(idea)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Adopt</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
