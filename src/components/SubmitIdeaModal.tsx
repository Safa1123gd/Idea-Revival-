import React, { useState } from 'react';
import { Category, Difficulty, Stage, Visibility, Idea, Persona } from '../types';
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  Lock, 
  Users,
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';
import { RevivalScoreGauge } from './RevivalScoreGauge';

interface SubmitIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: Persona;
  onSubmitIdea: (newIdea: Idea) => void;
}

export const SubmitIdeaModal: React.FC<SubmitIdeaModalProps> = ({
  isOpen,
  onClose,
  currentPersona,
  onSubmitIdea,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Category>('Environment');
  const [difficulty, setDifficulty] = useState<Difficulty>('Moderate');
  const [stage, setStage] = useState<Stage>('concept');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedMechanism, setProposedMechanism] = useState('');
  const [impactProjection, setImpactProjection] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('Public');
  const [collaborationPreferences, setCollaborationPreferences] = useState(
    'Looking for an enthusiastic builder to lead technical prototyping while I advise on domain testing and community outreach.'
  );

  const popularSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Embedded IoT',
    'Hardware Design', 'CAD / 3D Printing', 'Machine Learning',
    'Agronomy', 'UI/UX Design', 'Logistics', 'Biomedical',
    'LoRaWAN', 'Mobile App', 'Thermal Dynamics'
  ];

  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript']);
  const [customSkill, setCustomSkill] = useState('');
  const [resourceText, setResourceText] = useState('Prototyping microcontroller kit, 3D printing access, field testing site');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  // Dynamic Revival Score preview calculation based on input fullness
  const problemScore = Math.min(95, Math.max(65, 70 + Math.floor(problemStatement.length / 15)));
  const mechanismScore = Math.min(92, Math.max(60, 68 + Math.floor(proposedMechanism.length / 18)));
  const innovationScore = Math.min(94, Math.max(70, 75 + selectedSkills.length * 2));
  const impactScore = Math.min(96, Math.max(65, 70 + Math.floor(impactProjection.length / 12)));
  const resourceScore = 80;

  const totalScore = Math.round(
    problemScore * 0.25 +
    mechanismScore * 0.20 +
    innovationScore * 0.20 +
    impactScore * 0.20 +
    resourceScore * 0.15
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemStatement.trim() || !proposedMechanism.trim()) return;

    // Generate random 6-digit ID
    const randomId = `IR-${Math.floor(100000 + Math.random() * 900000)}`;
    const resourcesList = resourceText
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const newIdea: Idea = {
      id: randomId,
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      category,
      problemStatement: problemStatement.trim(),
      proposedMechanism: proposedMechanism.trim(),
      impactProjection: impactProjection.trim() || 'High positive social and environmental leverage upon deployment.',
      stage,
      difficulty,
      visibility,
      skillsNeeded: selectedSkills,
      resourcesNeeded: resourcesList.length > 0 ? resourcesList : ['Standard maker space access', 'Open source software stack'],
      creatorId: currentPersona.id,
      creatorName: currentPersona.name,
      creatorRole: currentPersona.role,
      creatorAvatar: currentPersona.avatar,
      submittedDate: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      revivalScore: {
        problemImportance: problemScore,
        feasibility: mechanismScore,
        innovation: innovationScore,
        potentialImpact: impactScore,
        resourceRequirements: resourceScore,
        totalScore,
        assessmentNotice: 'Newly cataloged concept with solid problem framing. Ready for open builder discovery.',
      },
      adopters: [],
      milestones: [
        {
          id: `m-${Date.now()}`,
          stage,
          title: 'Initial Concept Blueprint Cataloged',
          notes: 'Submitted via Idea Revival portal; open for builder review.',
          author: currentPersona.name,
          authorRole: 'Creator',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        },
      ],
      adoptionRequests: [],
      collaborationPreferences,
      ipNotice: 'Published under Creative Commons Attribution 4.0 International (CC BY 4.0). Creator retains permanent attribution.',
    };

    onSubmitIdea(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Submit a Dormant Concept
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Resurrect your unfinished thoughts and connect with skilled builders.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confidentiality Warning Banner */}
        <div className="p-4 bg-amber-50/80 border-b border-amber-200 text-amber-900 px-6 flex items-start gap-3 text-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800">Confidentiality & IP Notice:</span> Submitting publicly catalogs your idea with a unique canonical Idea ID for permanent attribution. If you hold proprietary trade secrets or intend to patent, use <strong className="underline">Protected Preview</strong> mode to mask deep schematics until an adoption agreement is executed.
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1">
          {/* Creator Attribution Info */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500"
              />
              <div>
                <span className="text-slate-500">Submitting as Creator:</span>{' '}
                <strong className="text-slate-900">{currentPersona.name}</strong> ({currentPersona.role})
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Canonical IR-ID Assigned on Submit
            </span>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Idea Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Micro-Solar Desalination for Coastal Schools"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                One-Sentence Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Affordable passive thermal distillation unit powered by reclaimed solar thermal collectors..."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Category, Difficulty, and Stage Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category (10 Options)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Technology">Technology</option>
                <option value="Health">Health</option>
                <option value="Business">Business</option>
                <option value="Community">Community</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Productivity">Productivity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Execution Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Beginner">Beginner (Fast software sprint)</option>
                <option value="Moderate">Moderate (Hardware or full stack)</option>
                <option value="Advanced">Advanced (Scientific / Regulatory)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Starting Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as Stage)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="concept">💡 Concept (Raw blueprint)</option>
                <option value="revived">🌱 Revived (Unearthed & evaluated)</option>
              </select>
            </div>
          </div>

          {/* Problem & Solution Areas */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                The Fundamental Problem Statement <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="What specific pain point or bottleneck is occurring? Who suffers from it?"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Proposed Mechanism & Architecture <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="How does your proposed solution operate? What are the key mechanical or algorithmic steps?"
                value={proposedMechanism}
                onChange={(e) => setProposedMechanism(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Projected Real-World Impact
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Reduces student dehydration by 65% across 40 coastal schools..."
                value={impactProjection}
                onChange={(e) => setImpactProjection(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Sought-After Skills Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Skills Needed from Builders ({selectedSkills.length} selected)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {popularSkills.map((sk) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    type="button"
                    key={sk}
                    onClick={() => toggleSkill(sk)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <div className="flex items-center gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add specialized skill..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomSkill();
                  }
                }}
                className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg flex-1 text-slate-800"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="text-xs px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Resources Needed */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Resource Checklist (comma separated)
            </label>
            <input
              type="text"
              value={resourceText}
              onChange={(e) => setResourceText(e.target.value)}
              placeholder="e.g. Arduino kits, 3D printer access, local hospital survey access"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* 3-Tier Visibility Controls */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3-Tier Visibility & Access Control
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  visibility === 'Public'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={visibility === 'Public'}
                    onChange={() => setVisibility('Public')}
                    className="text-emerald-600 accent-emerald-600"
                  />
                  <span className="font-bold text-xs text-slate-900">1. Public</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Fully indexable. All builders can view specs & submit adoption proposals.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  visibility === 'Protected Preview'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="visibility"
                    value="Protected Preview"
                    checked={visibility === 'Protected Preview'}
                    onChange={() => setVisibility('Protected Preview')}
                    className="text-emerald-600 accent-emerald-600"
                  />
                  <span className="font-bold text-xs text-slate-900">2. Protected</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Excerpt & score visible; full mechanics unlocked upon your review.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  visibility === 'Private'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    checked={visibility === 'Private'}
                    onChange={() => setVisibility('Private')}
                    className="text-emerald-600 accent-emerald-600"
                  />
                  <span className="font-bold text-xs text-slate-900">3. Private Draft</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Only visible to you until you choose to open adoption.
                </p>
              </label>
            </div>
          </div>

          {/* Real-time Revival Score Preview */}
          <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <RevivalScoreGauge score={totalScore} size="sm" showLabel={false} />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Estimated Revival Score: <span className="font-mono text-emerald-600">{totalScore}/100</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Dynamically estimated based on problem depth, mechanism clarity, and skill breadth.
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 hidden sm:block">
              Auto-Indexed
            </span>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Catalog & Publish Concept</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
