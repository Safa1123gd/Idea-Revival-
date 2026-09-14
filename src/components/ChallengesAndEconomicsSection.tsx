import React, { useState } from 'react';
import { CHALLENGES, SUSTAINABILITY_TIERS } from '../data/mockData';
import { Challenge, SustainabilityTier } from '../types';
import { 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles, 
  Send,
  X,
  ShieldCheck,
  Coins
} from 'lucide-react';

interface ChallengesAndEconomicsProps {
  onExploreChallengeCategory: (category: string) => void;
}

export const ChallengesAndEconomicsSection: React.FC<ChallengesAndEconomicsProps> = ({
  onExploreChallengeCategory,
}) => {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  // Inquiry form states
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('University');
  const [focusArea, setFocusArea] = useState('Clean Water & Climate Tech');
  const [grantBudget, setGrantBudget] = useState('$25,000');
  const [contactEmail, setContactEmail] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setIsInquiryModalOpen(false);
      setOrgName('');
      setContactEmail('');
    }, 2000);
  };

  return (
    <section id="challenges" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* SECTION A: SPONSORED CHALLENGES */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2.5 border border-emerald-200">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>Institutional Catalysts</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Organization Challenges & Catalytic Grants
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                Universities, foundations, and global sponsors back collaborative creator-builder pairs with direct non-dilutive prototype capital and lab testing access.
              </p>
            </div>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Building2 className="w-4 h-4" />
              <span>Sponsor an Institutional Challenge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHALLENGES.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{challenge.organizerLogo}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {challenge.organizerType}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {challenge.organizer}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {challenge.description}
                  </p>

                  {/* Prize / Grant Callout */}
                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Grant Pool & Resources
                    </span>
                    <span className="text-sm font-bold text-emerald-950">
                      {challenge.prizeOrGrant}
                    </span>
                  </div>

                  {/* Target Outcomes */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Target Outcomes
                    </span>
                    {challenge.targetOutcomes.map((outcome, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline: {challenge.deadline}
                  </span>
                  <button
                    onClick={() => onExploreChallengeCategory(challenge.category)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
                  >
                    <span>View {challenge.ideasCount} Ideas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION B: PLATFORM ECONOMICS (4-TIER SUSTAINABILITY MODEL) */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-2.5">
              <Coins className="w-3.5 h-3.5 text-slate-700" />
              <span>Platform Economics & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Transparent 4-Tier Sustainability Model
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We never sell user data or demand equity in resurrected ideas. Our platform is funded through transparent builder tooling, institutional cohorts, and philanthropic challenge sponsorships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between relative ${
                  tier.isPopular
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 shadow-xs'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                    Most Popular for Builders
                  </div>
                )}

                <div>
                  <div className="font-bold text-base text-slate-900 mb-1">
                    {tier.name}
                  </div>
                  <div className="text-xs text-slate-500 mb-4 min-h-[32px]">
                    {tier.targetAudience}
                  </div>

                  <div className="mb-4 pb-4 border-b border-slate-100">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-500 ml-1.5 font-normal">
                      /{tier.billingPeriod}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Included Capabilities
                    </span>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tier.isPopular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {tier.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional Sponsor Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Institutional Sponsor Inquiry
                </h3>
              </div>
              <button
                onClick={() => setIsInquiryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Inquiry Received</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Our institutional partnership director will connect with you within 24 hours with custom challenge templates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Organization / University Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford Climate Accelerator, Horizon Foundation"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Organization Type
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    >
                      <option value="University">University</option>
                      <option value="Foundation">Philanthropic Foundation</option>
                      <option value="Corporate Sponsor">Corporate ESG</option>
                      <option value="NGO">Municipal / NGO</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Estimated Grant Pool
                    </label>
                    <select
                      value={grantBudget}
                      onChange={(e) => setGrantBudget(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    >
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000 - $100,000+">$50,000 - $100,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Target Thematic Challenge Area
                  </label>
                  <input
                    type="text"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    placeholder="e.g. Decentralized Clean Water, Remote Clinical Diagnostics"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Liaison Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@foundation.org"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Challenge Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
