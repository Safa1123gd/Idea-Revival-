import React, { useState } from 'react';
import { Idea, Persona, Stage, AdoptionRequest } from '../types';
import { STAGE_CONFIG } from '../data/mockData';
import { RevivalScoreGauge } from './RevivalScoreGauge';
import { 
  FolderGit2, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  ExternalLink, 
  Clock, 
  ArrowRight, 
  Plus, 
  AlertCircle,
  Award,
  Layers,
  ShieldCheck,
  ChevronRight,
  Send
} from 'lucide-react';

interface DashboardViewProps {
  ideas: Idea[];
  currentPersona: Persona;
  onViewIdeaDetails: (idea: Idea) => void;
  onOpenScoreBreakdown: (idea: Idea) => void;
  onOpenSubmitModal: () => void;
  onAcceptAdoptionRequest: (ideaId: string, requestId: string) => void;
  onDeclineAdoptionRequest: (ideaId: string, requestId: string) => void;
  onAdvanceStage: (ideaId: string, nextStage: Stage) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  ideas,
  currentPersona,
  onViewIdeaDetails,
  onOpenScoreBreakdown,
  onOpenSubmitModal,
  onAcceptAdoptionRequest,
  onDeclineAdoptionRequest,
  onAdvanceStage,
}) => {
  const [activeTab, setActiveTab] = useState<'submitted' | 'adopted' | 'requests' | 'projects'>('submitted');
  const [selectedApplicant, setSelectedApplicant] = useState<AdoptionRequest | null>(null);

  // 1. My Submitted Ideas (where creatorId === currentPersona.id)
  const mySubmittedIdeas = ideas.filter((item) => item.creatorId === currentPersona.id);

  // 2. Ideas I've Adopted (where adopters contains currentPersona.id)
  const myAdoptedIdeas = ideas.filter((item) =>
    item.adopters.some((a) => a.id === currentPersona.id)
  );

  // 3. Incoming Adoption Requests (all requests across ideas where creatorId === currentPersona.id)
  const incomingRequests: Array<{ idea: Idea; request: AdoptionRequest }> = [];
  mySubmittedIdeas.forEach((idea) => {
    idea.adoptionRequests.forEach((req) => {
      incomingRequests.push({ idea, request: req });
    });
  });

  const pendingRequests = incomingRequests.filter((r) => r.request.status === 'pending');

  // 4. Active Real-World Projects (teamed_up, building, live)
  const activeProjects = ideas.filter(
    (item) =>
      (item.creatorId === currentPersona.id || item.adopters.some((a) => a.id === currentPersona.id)) &&
      ['teamed_up', 'building', 'live'].includes(item.stage)
  );

  const stagesSequence: Stage[] = ['concept', 'revived', 'teamed_up', 'building', 'live'];

  const getNextStage = (current: Stage): Stage | null => {
    const idx = stagesSequence.indexOf(current);
    if (idx >= 0 && idx < stagesSequence.length - 1) {
      return stagesSequence[idx + 1];
    }
    return null;
  };

  return (
    <div id="creator-adopter-dashboard" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Personalized Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/80 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentPersona.name}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {currentPersona.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentPersona.location}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {currentPersona.bio}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Concept</span>
          </button>
        </div>

        {/* 4 Quick Stat Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              My Submitted Ideas
            </span>
            <span className="text-xl font-bold text-slate-900 font-mono">
              {mySubmittedIdeas.length}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Adopted Concepts
            </span>
            <span className="text-xl font-bold text-emerald-600 font-mono">
              {myAdoptedIdeas.length}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Pending Requests
            </span>
            <span className={`text-xl font-bold font-mono ${pendingRequests.length > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {pendingRequests.length}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Active Build Teams
            </span>
            <span className="text-xl font-bold text-indigo-600 font-mono">
              {activeProjects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Workspace Tabs Header */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('submitted')}
          className={`py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'submitted'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>My Submitted Ideas</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200/40 text-[10px] font-mono">
            {mySubmittedIdeas.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('adopted')}
          className={`py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'adopted'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Ideas I've Adopted</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200/40 text-[10px] font-mono">
            {myAdoptedIdeas.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'requests'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Incoming Adoption Requests</span>
          {pendingRequests.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
              {pendingRequests.length} new
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Active Real-World Projects</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200/40 text-[10px] font-mono">
            {activeProjects.length}
          </span>
        </button>
      </div>

      {/* TAB 1: MY SUBMITTED IDEAS */}
      {activeTab === 'submitted' && (
        <div className="space-y-4">
          {mySubmittedIdeas.length > 0 ? (
            mySubmittedIdeas.map((idea) => {
              const stageCfg = STAGE_CONFIG[idea.stage];
              const nextStage = getNextStage(idea.stage);
              const hasRequests = idea.adoptionRequests.filter((r) => r.status === 'pending').length > 0;

              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {idea.id}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {idea.category}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                          <span>{stageCfg.icon}</span>
                          <span>Stage: {stageCfg.label}</span>
                        </span>
                        {hasRequests && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                            ● Adoption proposal waiting!
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => onViewIdeaDetails(idea)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {idea.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                        {idea.problemStatement}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                      <RevivalScoreGauge
                        score={idea.revivalScore.totalScore}
                        size="sm"
                        showLabel={false}
                        onClick={() => onOpenScoreBreakdown(idea)}
                      />

                      <button
                        onClick={() => onViewIdeaDetails(idea)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        Specifications & Milestones
                      </button>

                      {nextStage && (
                        <button
                          onClick={() => onAdvanceStage(idea.id, nextStage)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                          title={`Advance from ${stageCfg.label} to ${STAGE_CONFIG[nextStage].label}`}
                        >
                          <span>Advance to {STAGE_CONFIG[nextStage].label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Adopter info if teamed up */}
                  {idea.adopters.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3 text-xs">
                      <span className="text-slate-400 font-medium">Teamed Adopter:</span>
                      {idea.adopters.map((adopter) => (
                        <div key={adopter.id} className="flex items-center gap-1.5 font-semibold text-slate-800">
                          <img
                            src={adopter.avatar}
                            alt={adopter.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span>{adopter.name}</span>
                          <span className="text-slate-400 font-normal">({adopter.role})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No Submitted Ideas for this Persona</h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                Switch to Elena Rostova in the top bar to test reviewing creator concepts, or submit a new idea.
              </p>
              <button
                onClick={onOpenSubmitModal}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Submit an Idea
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IDEAS I'VE ADOPTED */}
      {activeTab === 'adopted' && (
        <div className="space-y-4">
          {myAdoptedIdeas.length > 0 ? (
            myAdoptedIdeas.map((idea) => {
              const stageCfg = STAGE_CONFIG[idea.stage];
              const myAdopterRecord = idea.adopters.find((a) => a.id === currentPersona.id);

              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {idea.id}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          Adopted Project
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                          <span>{stageCfg.icon}</span>
                          <span>Stage: {stageCfg.label}</span>
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {myAdopterRecord?.weeklyHours || 10} hrs/wk committed
                        </span>
                      </div>

                      <h3
                        onClick={() => onViewIdeaDetails(idea)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {idea.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        Original Creator: <strong className="text-slate-700">{idea.creatorName}</strong> · {idea.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => onViewIdeaDetails(idea)}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Open Project Hub</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Latest Milestone Excerpt */}
                  {idea.milestones.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">
                          Latest Milestone: <strong>{idea.milestones[idea.milestones.length - 1].title}</strong>
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px] font-mono shrink-0 ml-2">
                        {idea.milestones[idea.milestones.length - 1].timestamp}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
              <HeartHandshake className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No Adopted Ideas for this Persona</h3>
              <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                Switch to Ayan Rahman in the top bar to view his active adopted projects, or explore the directory to adopt a concept now.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INCOMING ADOPTION REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {incomingRequests.length > 0 ? (
            incomingRequests.map(({ idea, request }) => {
              const isPending = request.status === 'pending';
              const isAccepted = request.status === 'accepted';
              const isDeclined = request.status === 'declined';

              return (
                <div
                  key={request.id}
                  className={`bg-white rounded-2xl p-6 border transition-all ${
                    isPending
                      ? 'border-emerald-500/80 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {idea.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Adoption Proposal for:
                        </span>
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">
                          {idea.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Submitted: {request.submittedAt}
                      </span>
                    </div>

                    <div>
                      {isPending && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          Pending Creator Review
                        </span>
                      )}
                      {isAccepted && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Accepted & Teamed Up ✓
                        </span>
                      )}
                      {isDeclined && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                          Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Applicant Info & Proposal Box */}
                  <div className="py-4 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={request.applicantAvatar}
                          alt={request.applicantName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <span>{request.applicantName}</span>
                            <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                              {request.weeklyCommitmentHours} hrs/week
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">{request.applicantRole}</div>
                        </div>
                      </div>

                      {/* View Profile Action */}
                      <button
                        onClick={() => setSelectedApplicant(request)}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>View Applicant Profile</span>
                      </button>
                    </div>

                    {/* Proposal text */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">Applicant Proposal:</strong>
                      "{request.proposal}"
                    </div>

                    {/* Skills offered */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Skills Offered by Applicant
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {request.skillsOffered.map((sk, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white text-slate-800 px-2 py-0.5 rounded-md border border-slate-200 font-medium"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* One-Click Review Actions */}
                  {isPending && (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        onClick={() => onDeclineAdoptionRequest(idea.id, request.id)}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4 text-slate-400" />
                        <span>Decline</span>
                      </button>

                      <button
                        onClick={() => onAcceptAdoptionRequest(idea.id, request.id)}
                        className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept & Team Up</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
              <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No Incoming Adoption Requests</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When builders apply to adopt your submitted concepts, their proposals will appear here for one-click approval.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ACTIVE REAL-WORLD PROJECTS */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProjects.length > 0 ? (
            activeProjects.map((idea) => {
              const stageCfg = STAGE_CONFIG[idea.stage];
              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {idea.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <span>{stageCfg.icon}</span>
                        <span>{stageCfg.label}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1">
                      {idea.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                      {idea.tagline}
                    </p>

                    {/* Active Team Roster */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Active Guild Members
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                          <img
                            src={idea.creatorAvatar}
                            alt={idea.creatorName}
                            className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-300"
                          />
                          <span>{idea.creatorName}</span>
                          <span className="text-[10px] text-slate-400">(Creator)</span>
                        </div>

                        {idea.adopters.map((adopter) => (
                          <div key={adopter.id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                            <img
                              src={adopter.avatar}
                              alt={adopter.name}
                              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-300"
                            />
                            <span>{adopter.name}</span>
                            <span className="text-[10px] text-emerald-600 font-bold">(Adopter)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {idea.milestones.length} milestones logged
                    </span>
                    <button
                      onClick={() => onViewIdeaDetails(idea)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      Open Project Board
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 bg-white rounded-2xl p-10 border border-slate-200 text-center">
              <p className="text-xs text-slate-500">No active teamed projects yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Applicant Profile Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedApplicant.applicantAvatar}
                  alt={selectedApplicant.applicantName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedApplicant.applicantName}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedApplicant.applicantRole}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-700 block">Weekly Commitment:</span>
                <span className="text-slate-600">{selectedApplicant.weeklyCommitmentHours} hours per week</span>
              </div>

              <div>
                <span className="font-bold text-slate-700 block">Skills & Expertise:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedApplicant.skillsOffered.map((sk, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {selectedApplicant.portfolioUrl && (
                <div>
                  <span className="font-bold text-slate-700 block">Portfolio / Code Repository:</span>
                  <a
                    href={selectedApplicant.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 underline font-mono break-all"
                  >
                    {selectedApplicant.portfolioUrl}
                  </a>
                </div>
              )}

              <div className="pt-2">
                <span className="font-bold text-slate-700 block mb-1">Proposal Statement:</span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 italic border border-slate-200/70 leading-relaxed">
                  "{selectedApplicant.proposal}"
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
