/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Idea, Persona, Stage, AdoptionRequest } from './types';
import { PERSONAS, INITIAL_IDEAS, STAGE_CONFIG } from './data/mockData';
import { PersonaBar } from './components/PersonaBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RevivalJourneySection } from './components/RevivalJourneySection';
import { FundamentalProblemSection } from './components/FundamentalProblemSection';
import { ExploreMarketplace } from './components/ExploreMarketplace';
import { IdeaDetailModal } from './components/IdeaDetailModal';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';
import { AdoptionModal } from './components/AdoptionModal';
import { SubmitIdeaModal } from './components/SubmitIdeaModal';
import { DashboardView } from './components/DashboardView';
import { ChallengesAndEconomicsSection } from './components/ChallengesAndEconomicsSection';
import { CheckCircle2, Sparkles, HeartHandshake, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const STORAGE_KEY = 'idea_revival_platform_ideas_v1';
const PERSONA_KEY = 'idea_revival_current_persona_v1';

export default function App() {
  // 1. Ideas state with localStorage persistence
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading ideas from storage', e);
    }
    return INITIAL_IDEAS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch (e) {
      console.error('Error saving ideas to storage', e);
    }
  }, [ideas]);

  // 2. Active Persona state ('elena' | 'ayan')
  const [currentPersonaId, setCurrentPersonaId] = useState<'elena' | 'ayan'>(() => {
    try {
      const saved = localStorage.getItem(PERSONA_KEY);
      if (saved === 'elena' || saved === 'ayan') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'elena'; // Default persona
  });

  useEffect(() => {
    try {
      localStorage.setItem(PERSONA_KEY, currentPersonaId);
    } catch (e) {
      // ignore
    }
  }, [currentPersonaId]);

  const currentPersona = PERSONAS[currentPersonaId];

  // 3. Navigation section state
  const [activeSection, setActiveSection] = useState<string>('explore');

  // 4. Modals state
  const [selectedIdeaForDetails, setSelectedIdeaForDetails] = useState<Idea | null>(null);
  const [selectedIdeaForScore, setSelectedIdeaForScore] = useState<Idea | null>(null);
  const [selectedIdeaForAdoption, setSelectedIdeaForAdoption] = useState<Idea | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [stageFilter, setStageFilter] = useState<Stage | null>(null);

  // 5. Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Switch persona handler
  const handleSwitchPersona = (newPersonaId: 'elena' | 'ayan') => {
    setCurrentPersonaId(newPersonaId);
    const p = PERSONAS[newPersonaId];
    showToast(`Switched perspective to ${p.name} (${p.badge})`, 'info');
  };

  // Submit new idea handler
  const handleSubmitNewIdea = (newIdea: Idea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    showToast(`Idea ${newIdea.id} successfully cataloged and indexed!`, 'success');
    setActiveSection('explore');
  };

  // Submit adoption proposal
  const handleSubmitAdoptionProposal = (
    ideaId: string,
    proposalData: {
      proposal: string;
      skillsOffered: string[];
      weeklyCommitmentHours: number;
      portfolioUrl: string;
    }
  ) => {
    const newRequest: AdoptionRequest = {
      id: `req-${Date.now()}`,
      ideaId,
      applicantId: currentPersona.id,
      applicantName: currentPersona.name,
      applicantRole: currentPersona.role,
      applicantAvatar: currentPersona.avatar,
      proposal: proposalData.proposal,
      skillsOffered: proposalData.skillsOffered,
      weeklyCommitmentHours: proposalData.weeklyCommitmentHours,
      portfolioUrl: proposalData.portfolioUrl,
      status: 'pending',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            adoptionRequests: [newRequest, ...idea.adoptionRequests],
          };
        }
        return idea;
      })
    );

    // Also update selected idea if open
    if (selectedIdeaForDetails && selectedIdeaForDetails.id === ideaId) {
      setSelectedIdeaForDetails((prev) =>
        prev
          ? {
              ...prev,
              adoptionRequests: [newRequest, ...prev.adoptionRequests],
            }
          : null
      );
    }

    showToast(
      `Adoption proposal transmitted for ${ideaId}. The creator will be notified!`,
      'success'
    );
  };

  // Accept adoption request
  const handleAcceptAdoptionRequest = (ideaId: string, requestId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const req = idea.adoptionRequests.find((r) => r.id === requestId);
          if (!req) return idea;

          const updatedRequests = idea.adoptionRequests.map((r) =>
            r.id === requestId ? { ...r, status: 'accepted' as const } : r
          );

          const newAdopter = {
            id: req.applicantId,
            name: req.applicantName,
            role: req.applicantRole,
            avatar: req.applicantAvatar,
            joinedDate: new Date().toISOString().split('T')[0],
            weeklyHours: req.weeklyCommitmentHours,
          };

          const newMilestone = {
            id: `m-${Date.now()}`,
            stage: 'teamed_up' as Stage,
            title: `Teamed up with ${req.applicantName}`,
            notes: `Adoption proposal accepted. Collaborative working terms established for ${req.weeklyCommitmentHours} hrs/week.`,
            author: currentPersona.name,
            authorRole: 'Creator',
            timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          };

          return {
            ...idea,
            stage: idea.stage === 'concept' || idea.stage === 'revived' ? ('teamed_up' as Stage) : idea.stage,
            adopters: [...idea.adopters, newAdopter],
            adoptionRequests: updatedRequests,
            milestones: [...idea.milestones, newMilestone],
          };
        }
        return idea;
      })
    );

    showToast(`Adoption request accepted! Builder has been teamed up on ${ideaId}.`, 'success');
  };

  // Decline adoption request
  const handleDeclineAdoptionRequest = (ideaId: string, requestId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const updatedRequests = idea.adoptionRequests.map((r) =>
            r.id === requestId ? { ...r, status: 'declined' as const } : r
          );
          return {
            ...idea,
            adoptionRequests: updatedRequests,
          };
        }
        return idea;
      })
    );
    showToast('Adoption proposal declined.', 'info');
  };

  // Advance stage
  const handleAdvanceStage = (ideaId: string, nextStage: Stage) => {
    const stageCfg = STAGE_CONFIG[nextStage];
    const newMilestone = {
      id: `m-${Date.now()}`,
      stage: nextStage,
      title: `Advanced to Stage: ${stageCfg.label}`,
      notes: `Project progressed to ${stageCfg.label}. ${stageCfg.milestoneDesc}`,
      author: currentPersona.name,
      authorRole: currentPersona.badge,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            stage: nextStage,
            milestones: [...idea.milestones, newMilestone],
          };
        }
        return idea;
      })
    );

    showToast(`Project ${ideaId} advanced to Stage: ${stageCfg.label}!`, 'success');
  };

  // Add custom milestone
  const handleAddMilestone = (
    ideaId: string,
    milestoneData: {
      stage: Stage;
      title: string;
      notes: string;
    }
  ) => {
    const newMilestone = {
      id: `m-${Date.now()}`,
      stage: milestoneData.stage,
      title: milestoneData.title,
      notes: milestoneData.notes,
      author: currentPersona.name,
      authorRole: currentPersona.badge,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            stage: milestoneData.stage,
            milestones: [...idea.milestones, newMilestone],
          };
        }
        return idea;
      })
    );

    // Keep active modal in sync
    if (selectedIdeaForDetails && selectedIdeaForDetails.id === ideaId) {
      setSelectedIdeaForDetails((prev) =>
        prev
          ? {
              ...prev,
              stage: milestoneData.stage,
              milestones: [...prev.milestones, newMilestone],
            }
          : null
      );
    }

    showToast('Milestone update recorded to permanent ledger!', 'success');
  };

  // Calculate pending requests count for current persona
  const pendingRequestsCount = ideas
    .filter((idea) => idea.creatorId === currentPersona.id)
    .reduce((acc, idea) => {
      return acc + idea.adoptionRequests.filter((r) => r.status === 'pending').length;
    }, 0);

  // Synchronize latest idea version in modal if open
  const refreshedSelectedIdea = selectedIdeaForDetails
    ? ideas.find((i) => i.id === selectedIdeaForDetails.id) || selectedIdeaForDetails
    : null;

  // Handle navigation to sections and views
  const handleNavigate = (sec: string) => {
    setActiveSection(sec);
    if (sec === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetDomId = sec === 'journey' ? 'revival-journey' : sec;
      if (activeSection === 'dashboard') {
        setTimeout(() => {
          const el = document.getElementById(targetDomId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        const el = document.getElementById(targetDomId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  // Scroll spy to update active section in header
  useEffect(() => {
    if (activeSection === 'dashboard') return;

    const handleScroll = () => {
      const sections = [
        { id: 'explore', navId: 'explore' },
        { id: 'revival-journey', navId: 'journey' },
        { id: 'barriers', navId: 'barriers' },
        { id: 'challenges', navId: 'challenges' },
      ];

      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection((prev) => (prev !== sections[i].navId ? sections[i].navId : prev));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {/* Combined Unified Sticky Header: Role Simulator Bar + Navigation Bar */}
      <header className="sticky top-0 z-40 w-full shadow-xs">
        <PersonaBar
          currentPersona={currentPersona}
          onSwitchPersona={handleSwitchPersona}
          allPersonas={PERSONAS}
        />
        <Navbar
          currentPersona={currentPersona}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          pendingRequestsCount={pendingRequestsCount}
        />
      </header>

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-300 text-xs sm:text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Page Content Views */}
      <main className="flex-1">
        {activeSection === 'dashboard' ? (
          /* WORKSPACE DASHBOARD VIEW */
          <DashboardView
            ideas={ideas}
            currentPersona={currentPersona}
            onViewIdeaDetails={(idea) => setSelectedIdeaForDetails(idea)}
            onOpenScoreBreakdown={(idea) => setSelectedIdeaForScore(idea)}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            onAcceptAdoptionRequest={handleAcceptAdoptionRequest}
            onDeclineAdoptionRequest={handleDeclineAdoptionRequest}
            onAdvanceStage={handleAdvanceStage}
          />
        ) : (
          /* DEFAULT MULTI-SECTION FLOW */
          <>
            {/* The 5-Second Clarity Experience Hero */}
            <HeroSection
              onExplore={() => {
                const el = document.getElementById('explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSubmitIdea={() => setIsSubmitModalOpen(true)}
              onViewJourney={() => {
                const el = document.getElementById('revival-journey');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Marketplace Discovery (Explore Ideas) */}
            <ExploreMarketplace
              ideas={ideas}
              currentPersona={currentPersona}
              onViewDetails={(idea) => setSelectedIdeaForDetails(idea)}
              onOpenScoreBreakdown={(idea) => setSelectedIdeaForScore(idea)}
              onAdopt={(idea) => setSelectedIdeaForAdoption(idea)}
              initialStageFilter={stageFilter}
            />

            {/* The Idea Revival Journey: 5-Stage Stepper */}
            <RevivalJourneySection
              onExploreStage={(stg) => {
                setStageFilter(stg);
                const el = document.getElementById('explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* The Fundamental Problem Section: 6 Barriers */}
            <FundamentalProblemSection
              onFindBuilder={() => {
                const el = document.getElementById('explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Organization Challenges & 4-Tier Economics */}
            <ChallengesAndEconomicsSection
              onExploreChallengeCategory={(cat) => {
                const el = document.getElementById('explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              IR
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight">Idea Revival Protocol</span>
              <p className="text-[11px] text-slate-400">Attribution-Preserving Collaborative Open Innovation</p>
            </div>
          </div>

          <div className="text-center md:text-right text-slate-400 space-y-1">
            <p>“You're not just adopting an idea. You're helping turn someone's unfinished thought into something real.”</p>
            <p className="font-mono text-[10px]">
              Canonical Indexing · 5-Stage Lifecycle · Attribution Guarantee
            </p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Idea Details & Attribution Records Modal */}
      <IdeaDetailModal
        isOpen={!!selectedIdeaForDetails}
        onClose={() => setSelectedIdeaForDetails(null)}
        idea={refreshedSelectedIdea}
        currentPersona={currentPersona}
        onAdopt={(idea) => setSelectedIdeaForAdoption(idea)}
        onOpenScoreBreakdown={(idea) => setSelectedIdeaForScore(idea)}
        onAddMilestone={handleAddMilestone}
      />

      {/* 2. Revival Score 5-Weight Breakdown Modal */}
      {selectedIdeaForScore && (
        <ScoreBreakdownModal
          isOpen={!!selectedIdeaForScore}
          onClose={() => setSelectedIdeaForScore(null)}
          ideaTitle={selectedIdeaForScore.title}
          ideaId={selectedIdeaForScore.id}
          breakdown={selectedIdeaForScore.revivalScore}
        />
      )}

      {/* 3. The Adoption Protocol Workflow Modal */}
      <AdoptionModal
        isOpen={!!selectedIdeaForAdoption}
        onClose={() => setSelectedIdeaForAdoption(null)}
        idea={selectedIdeaForAdoption}
        currentPersona={currentPersona}
        onSubmitAdoptionProposal={handleSubmitAdoptionProposal}
      />

      {/* 4. Submit a Dormant Idea Portal Modal */}
      <SubmitIdeaModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        currentPersona={currentPersona}
        onSubmitIdea={handleSubmitNewIdea}
      />
    </div>
  );
}
