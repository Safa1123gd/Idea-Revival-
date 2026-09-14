import React, { useState } from 'react';
import { Idea, Persona, Stage, MilestoneUpdate } from '../types';
import { STAGE_CONFIG } from '../data/mockData';
import { RevivalScoreGauge } from './RevivalScoreGauge';
import { 
  X, 
  HeartHandshake, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Layers, 
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  GitCommit,
  ArrowRight,
  Share2,
  FileText,
  BadgeCheck,
  Award
} from 'lucide-react';

interface IdeaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: Idea | null;
  currentPersona: Persona;
  onAdopt: (idea: Idea) => void;
  onOpenScoreBreakdown: (idea: Idea) => void;
  onAddMilestone: (ideaId: string, milestone: {
    stage: Stage;
    title: string;
    notes: string;
  }) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  isOpen,
  onClose,
  idea,
  currentPersona,
  onAdopt,
  onOpenScoreBreakdown,
  onAddMilestone,
}) => {
  if (!isOpen || !idea) return null;

  const [activeTab, setActiveTab] = useState<'specs' | 'milestones' | 'collaborators' | 'ip'>('specs');
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [newMilestoneStage, setNewMilestoneStage] = useState<Stage>(idea.stage);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneNotes, setNewMilestoneNotes] = useState('');

  const isCreator = currentPersona.id === idea.creatorId;
  const isAdopter = idea.adopters.some((a) => a.id === currentPersona.id);
  const canPostMilestones = isCreator || isAdopter;
  const stageCfg = STAGE_CONFIG[idea.stage];

  const stagesList: Stage[] = ['concept', 'revived', 'teamed_up', 'building', 'live'];
  const currentStageIndex = stagesList.indexOf(idea.stage);

  const handleMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim() || !newMilestoneNotes.trim()) return;

    onAddMilestone(idea.id, {
      stage: newMilestoneStage,
      title: newMilestoneTitle.trim(),
      notes: newMilestoneNotes.trim(),
    });

    setNewMilestoneTitle('');
    setNewMilestoneNotes('');
    setIsAddingMilestone(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Sticky Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                {idea.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                {idea.category}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                Difficulty: {idea.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Submitted {idea.submittedDate}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {idea.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              {idea.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Stage Interactive Horizontal Stepper */}
        <div className="bg-slate-50 p-4 px-6 border-b border-slate-200">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Revival Lifecycle Progression</span>
            <span className="text-emerald-700 font-medium">Currently at Stage 0{currentStageIndex + 1}: {stageCfg.label}</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {stagesList.map((stg, idx) => {
              const cfg = STAGE_CONFIG[stg];
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={stg}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'bg-white border-emerald-500 shadow-xs ring-1 ring-emerald-500/30'
                      : isPast
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                      : 'bg-white/40 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="text-base sm:text-lg mb-0.5">{cfg.icon}</div>
                  <div className="text-[11px] font-bold text-slate-900 truncate">
                    {cfg.label}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 hidden sm:block">
                    {isCurrent ? '● Active' : isPast ? '✓ Completed' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-100 gap-6 text-xs font-semibold overflow-x-auto bg-white">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'specs'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'milestones'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Milestone Chronology</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
              {idea.milestones.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('collaborators')}
            className={`py-3 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'collaborators'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Collaborator Roster</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">
              {idea.adopters.length + 1}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('ip')}
            className={`py-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'ip'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sensitive IP & Attribution Rules
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* TAB 1: TECHNICAL SPECS */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {/* Problem Statement Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Unresolved Problem Statement
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {idea.problemStatement}
                </p>
              </div>

              {/* Proposed Mechanism Box */}
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Proposed Mechanism & Solution Architecture
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                  {idea.proposedMechanism}
                </p>
              </div>

              {/* Impact Projection */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  Projected Real-World Impact
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {idea.impactProjection}
                </p>
              </div>

              {/* Skills & Resources Checklist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sought-after skills */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Sought-After Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.skillsNeeded.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white text-slate-800 font-medium px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resource Checklist */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Resource Checklist
                  </h4>
                  <ul className="space-y-1.5">
                    {idea.resourcesNeeded.map((res, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Revival Score Section */}
              <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <RevivalScoreGauge score={idea.revivalScore.totalScore} size="md" showLabel={false} />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Overall Revival Score: {idea.revivalScore.totalScore}/100
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                      {idea.revivalScore.assessmentNotice}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenScoreBreakdown(idea)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  View 5 Weighted Weights
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Chronological Version & Milestone Log</h3>
                  <p className="text-xs text-slate-500">Every stage advancement is accompanied by timestamped notes.</p>
                </div>
                {canPostMilestones && !isAddingMilestone && (
                  <button
                    onClick={() => setIsAddingMilestone(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Advance Milestone</span>
                  </button>
                )}
              </div>

              {/* Add Milestone Form */}
              {isAddingMilestone && (
                <form onSubmit={handleMilestoneSubmit} className="bg-slate-50 p-4 rounded-xl border border-emerald-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Log New Milestone Update</span>
                    <button
                      type="button"
                      onClick={() => setIsAddingMilestone(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Lifecycle Stage
                      </label>
                      <select
                        value={newMilestoneStage}
                        onChange={(e) => setNewMilestoneStage(e.target.value as Stage)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                      >
                        {stagesList.map((stg) => (
                          <option key={stg} value={stg}>
                            {STAGE_CONFIG[stg].icon} {STAGE_CONFIG[stg].label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Milestone Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Assembled Prototype Sensor Housing"
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      Detailed Timestamped Notes & Findings
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detail experimental results, commits, or field deployment numbers..."
                      value={newMilestoneNotes}
                      onChange={(e) => setNewMilestoneNotes(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Publish Milestone Note
                    </button>
                  </div>
                </form>
              )}

              {/* Timeline list */}
              <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 pl-8">
                {idea.milestones.map((m) => {
                  const cfg = STAGE_CONFIG[m.stage];
                  return (
                    <div key={m.id} className="relative bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      {/* Timeline dot */}
                      <div className="absolute -left-[27px] top-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] ring-4 ring-slate-50">
                        {cfg.icon}
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{m.title}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            {cfg.label}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{m.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {m.notes}
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Logged by: <strong className="text-slate-700">{m.author}</strong> ({m.authorRole})</span>
                        <span className="text-emerald-700 font-medium">IR-Ledger Verified</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: COLLABORATORS */}
          {activeTab === 'collaborators' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Project Roster & Active Team</h3>
                <p className="text-xs text-slate-500">Every contributor on this Idea ID retains verified public credit.</p>
              </div>

              {/* Creator Card */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={idea.creatorAvatar}
                    alt={idea.creatorName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{idea.creatorName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900">
                        Original Concept Creator
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">{idea.creatorRole}</div>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  Originator
                </div>
              </div>

              {/* Adopters / Teammates */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Adopters & Active Builders ({idea.adopters.length})
                </h4>

                {idea.adopters.length > 0 ? (
                  <div className="space-y-3">
                    {idea.adopters.map((adopter) => (
                      <div key={adopter.id} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={adopter.avatar}
                            alt={adopter.name}
                            className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-300"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">{adopter.name}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                Active Adopter
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">{adopter.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-semibold text-slate-700">{adopter.weeklyHours || 10} hrs/week</div>
                          <div className="text-[10px] text-slate-400">Joined {adopter.joinedDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center">
                    <p className="text-xs text-slate-500 mb-3">
                      This idea does not have an active adopter yet. It is ready to be adopted!
                    </p>
                    {!isCreator && (
                      <button
                        onClick={() => onAdopt(idea)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <HeartHandshake className="w-4 h-4" />
                        <span>Adopt This Concept Now</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SENSITIVE IP */}
          {activeTab === 'ip' && (
            <div className="space-y-5">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-800 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Attribution & Intellectual Property Protocol
                </div>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Idea Revival is built on an attribution-first philosophy. Adopting an idea does not strip the original thinker of credit; rather, it formalizes a collaborative co-development agreement.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Canonical Idea ID Tracking</div>
                  <p className="leading-relaxed">
                    This project is permanently indexed under identifier <span className="font-mono font-semibold">{idea.id}</span>. Any future research paper, patent, grant disbursement, or corporate acquisition references this canonical record.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Applied License & Collaboration Agreement</div>
                  <p className="leading-relaxed font-mono text-slate-800 bg-white p-2 rounded border border-slate-200/60 mt-1">
                    {idea.ipNotice}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Creator Collaboration Preferences</div>
                  <p className="leading-relaxed">
                    {idea.collaborationPreferences}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BadgeCheck className="w-4 h-4 text-emerald-600" />
            <span>Permanent Creator Attribution: {idea.creatorName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>

            {!isCreator && (
              <button
                onClick={() => {
                  onClose();
                  onAdopt(idea);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Adopt This Idea</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
