import React, { useState } from 'react';
import { Idea, Persona } from '../types';
import { 
  HeartHandshake, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Clock,
  Code2,
  Lock
} from 'lucide-react';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: Idea | null;
  currentPersona: Persona;
  onSubmitAdoptionProposal: (ideaId: string, proposalData: {
    proposal: string;
    skillsOffered: string[];
    weeklyCommitmentHours: number;
    portfolioUrl: string;
  }) => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  isOpen,
  onClose,
  idea,
  currentPersona,
  onSubmitAdoptionProposal,
}) => {
  if (!isOpen || !idea) return null;

  const [proposal, setProposal] = useState(
    `Hi ${idea.creatorName}, I would love to adopt ${idea.title}. I have relevant experience and would like to build the initial working prototype, establish testing milestones, and support deployment.`
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    currentPersona.skills.slice(0, 3)
  );
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com/ayan-systems');
  const [agreedToProtocol, setAgreedToProtocol] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkillInput.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(customSkillInput.trim())) {
        setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      }
      setCustomSkillInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposal.trim()) {
      setError('Please provide a brief proposal explaining your intended contribution.');
      return;
    }
    if (!agreedToProtocol) {
      setError('You must confirm the Adoption Protocol agreement to proceed.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate async submission
    setTimeout(() => {
      onSubmitAdoptionProposal(idea.id, {
        proposal,
        skillsOffered: selectedSkills,
        weeklyCommitmentHours: weeklyHours,
        portfolioUrl,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {idea.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Adoption Protocol
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                Adopt This Idea
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Core Confirmation Dialog Callout */}
        <div className="p-6 bg-gradient-to-r from-emerald-900 to-slate-900 text-white border-b border-emerald-950">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-semibold text-emerald-100 leading-snug italic font-serif">
                “You're not just adopting an idea. You're helping turn someone's unfinished thought into something real.”
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-emerald-800/60 text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Core Protocol Rule:</strong> Adoption represents permission to collaborate and build, preserving permanent creator attribution and Idea ID tracking ({idea.id}) rather than executing an automatic legal IP transfer.
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Target Idea Recap */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Concept
              </span>
              <div className="text-sm font-bold text-slate-900 line-clamp-1">{idea.title}</div>
              <div className="text-xs text-slate-500">Created by {idea.creatorName} ({idea.creatorRole})</div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Revival Viability</span>
              <span className="text-base font-bold font-mono text-emerald-600">
                {idea.revivalScore.totalScore}/100
              </span>
            </div>
          </div>

          {/* Adopting Persona Card */}
          <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/50"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>Applying as: {currentPersona.name}</span>
                <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-1.5 py-0.2 rounded font-semibold">
                  {currentPersona.badge}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 truncate">{currentPersona.role} · {currentPersona.location}</div>
            </div>
          </div>

          {/* Intended Contribution & Proposal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Your Proposal & Architectural Approach <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Explain how you plan to build the prototype, what technologies you will use, and your estimated execution milestones.
            </p>
            <textarea
              rows={4}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="Detail your intended contribution, technical stack, and first 30-day goals..."
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white leading-relaxed"
            />
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Skills You Bring to This Project
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {currentPersona.skills.map((skill) => {
                const isChecked = selectedSkills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weekly Commitment & Portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Weekly Commitment Hours
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="2"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="flex-1 accent-emerald-600 cursor-pointer"
                />
                <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-800 shrink-0">
                  {weeklyHours} hrs/wk
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                Portfolio or GitHub Link
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Mandatory Protocol Agreement Checkbox */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToProtocol}
                onChange={(e) => setAgreedToProtocol(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600 shrink-0 cursor-pointer"
              />
              <span className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Enforce Attribution Protocol:</strong> I understand that adopting this idea grants permission to collaboratively prototype under open licenses. <span className="font-semibold text-emerald-800">{idea.creatorName}</span> retains permanent creator attribution, and tracking remains tied to canonical ID <span className="font-mono font-semibold">{idea.id}</span>.
              </span>
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Adoption...' : 'Transmit Adoption Proposal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
