import React from 'react';
import { RevivalScoreBreakdown } from '../types';
import { X, CheckCircle2, Info, Award, HelpCircle } from 'lucide-react';
import { RevivalScoreGauge } from './RevivalScoreGauge';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaTitle: string;
  ideaId: string;
  breakdown: RevivalScoreBreakdown;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  ideaTitle,
  ideaId,
  breakdown,
}) => {
  if (!isOpen) return null;

  const dimensions = [
    {
      name: 'Problem Importance',
      weight: '25%',
      score: breakdown.problemImportance,
      weightedValue: (breakdown.problemImportance * 0.25).toFixed(1),
      desc: 'Severity, scale of affected population, and urgency of the addressed societal or environmental pain point.',
      color: 'bg-emerald-500',
    },
    {
      name: 'Feasibility & Actionability',
      weight: '20%',
      score: breakdown.feasibility,
      weightedValue: (breakdown.feasibility * 0.20).toFixed(1),
      desc: 'Clarity of proposed mechanism, scientific validity, and availability of required core technologies.',
      color: 'bg-teal-500',
    },
    {
      name: 'Innovation & Differentiation',
      weight: '20%',
      score: breakdown.innovation,
      weightedValue: (breakdown.innovation * 0.20).toFixed(1),
      desc: 'Novelty of approach compared to existing status-quo solutions or stagnant legacy implementations.',
      color: 'bg-blue-500',
    },
    {
      name: 'Potential Impact Scale',
      weight: '20%',
      score: breakdown.potentialImpact,
      weightedValue: (breakdown.potentialImpact * 0.20).toFixed(1),
      desc: 'Long-term quantifiable outcome if fully deployed (e.g. lives improved, metric tons saved, carbon diverted).',
      color: 'bg-indigo-500',
    },
    {
      name: 'Resource Accessibility',
      weight: '15%',
      score: breakdown.resourceRequirements,
      weightedValue: (breakdown.resourceRequirements * 0.15).toFixed(1),
      desc: 'Whether an agile builder pair can execute a functional MVP without needing venture capital rounds.',
      color: 'bg-slate-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {ideaId}
              </span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Platform Assessment Record
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              Revival Score Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{ideaTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Banner */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <RevivalScoreGauge score={breakdown.totalScore} size="lg" showLabel={false} />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Overall Weighted Index</div>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {breakdown.totalScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Revival Viability Tier
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-500">5 Weighted Dimensions</div>
            <div className="text-xs font-medium text-slate-700 mt-1">Multi-factor Algorithm</div>
          </div>
        </div>

        {/* 5 Weighted Dimensions */}
        <div className="p-6 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Weighted Dimension Scores
          </h4>

          <div className="space-y-4">
            {dimensions.map((dim, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{dim.name}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                      Weight: {dim.weight}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {dim.score}
                    <span className="text-xs font-normal text-slate-400">/100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className={`${dim.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>

          {/* Assessment Notice */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-emerald-950">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
              <Award className="w-4 h-4 text-emerald-600" />
              Platform Assessment Notice
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              "{breakdown.assessmentNotice}"
            </p>
          </div>

          {/* Methodological footnote */}
          <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              The Revival Score is calculated via weighted geometric aggregation: 
              Score = (Problem × 0.25) + (Feasibility × 0.20) + (Innovation × 0.20) + (Impact × 0.20) + (Resources × 0.15).
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
