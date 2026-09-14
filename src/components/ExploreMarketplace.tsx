import React, { useState, useMemo } from 'react';
import { Idea, Category, Stage, Difficulty, Persona } from '../types';
import { IdeaCard } from './IdeaCard';
import { STAGE_CONFIG } from '../data/mockData';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';

interface ExploreMarketplaceProps {
  ideas: Idea[];
  currentPersona: Persona;
  onViewDetails: (idea: Idea) => void;
  onOpenScoreBreakdown: (idea: Idea) => void;
  onAdopt: (idea: Idea) => void;
  initialStageFilter?: Stage | null;
}

export const ExploreMarketplace: React.FC<ExploreMarketplaceProps> = ({
  ideas,
  currentPersona,
  onViewDetails,
  onOpenScoreBreakdown,
  onAdopt,
  initialStageFilter = null,
}) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter (10 categories)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Stage filter
  const [selectedStage, setSelectedStage] = useState<string>(initialStageFilter || 'all');

  // Skill filter
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Difficulty filter
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Sorting
  const [sortBy, setSortBy] = useState<'score' | 'recency' | 'views' | 'difficulty'>('score');

  const categories: Category[] = [
    'Education',
    'Environment',
    'Agriculture',
    'Technology',
    'Health',
    'Business',
    'Community',
    'Sustainability',
    'Productivity',
    'Other',
  ];

  // Extract all unique skills across ideas
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    ideas.forEach((item) => {
      item.skillsNeeded.forEach((s) => skillsSet.add(s));
    });
    return Array.from(skillsSet).sort();
  }, [ideas]);

  // Filter & Sort computation
  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((idea) => {
        // Search query across title, problem, solution, skills, and Idea ID
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = idea.title.toLowerCase().includes(query);
          const matchProblem = idea.problemStatement.toLowerCase().includes(query);
          const matchMechanism = idea.proposedMechanism.toLowerCase().includes(query);
          const matchId = idea.id.toLowerCase().includes(query);
          const matchSkills = idea.skillsNeeded.some((s) => s.toLowerCase().includes(query));
          const matchCreator = idea.creatorName.toLowerCase().includes(query);

          if (!matchTitle && !matchProblem && !matchMechanism && !matchId && !matchSkills && !matchCreator) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'all' && idea.category !== selectedCategory) {
          return false;
        }

        // Stage filter
        if (selectedStage !== 'all' && idea.stage !== selectedStage) {
          return false;
        }

        // Skill filter
        if (selectedSkill !== 'all' && !idea.skillsNeeded.includes(selectedSkill)) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'all' && idea.difficulty !== selectedDifficulty) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') {
          return b.revivalScore.totalScore - a.revivalScore.totalScore;
        }
        if (sortBy === 'recency') {
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        }
        if (sortBy === 'views') {
          return b.viewsCount - a.viewsCount;
        }
        if (sortBy === 'difficulty') {
          const diffRank = { Beginner: 1, Moderate: 2, Advanced: 3 };
          return diffRank[a.difficulty] - diffRank[b.difficulty];
        }
        return 0;
      });
  }, [ideas, searchQuery, selectedCategory, selectedStage, selectedSkill, selectedDifficulty, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedStage !== 'all' ||
    selectedSkill !== 'all' ||
    selectedDifficulty !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStage('all');
    setSelectedSkill('all');
    setSelectedDifficulty('all');
    setSortBy('score');
  };

  return (
    <section id="explore" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Open Marketplace Directory
            </span>
            <span className="text-xs text-slate-500">
              Showing {filteredIdeas.length} of {ideas.length} ideas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Dormant Concepts Awaiting Builders
          </h2>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-xs"
          >
            <option value="score">Highest Revival Score</option>
            <option value="recency">Most Recently Submitted</option>
            <option value="views">Most Viewed & Popular</option>
            <option value="difficulty">Difficulty (Beginner First)</option>
          </select>
        </div>
      </div>

      {/* Search & Multi-Axis Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="marketplace-search-input"
            type="text"
            placeholder="Search by title, problem keyword, Idea ID (e.g., IR-000127), required skills, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Category Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Category (10 Dimensions)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Development Stage Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Development Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Stages (Concept → Live)</option>
              {Object.entries(STAGE_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>
                  {cfg.icon} {cfg.label}
                </option>
              ))}
            </select>
          </div>

          {/* Specialized Skillsets Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Specialized Skillset
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">Any Skill Needed ({allSkills.length} total)</option>
              {allSkills.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Execution Complexity
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Complexities</option>
              <option value="Beginner">Beginner</option>
              <option value="Moderate">Moderate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Filter Pills & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-medium">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                  {selectedCategory}
                </span>
              )}
              {selectedStage !== 'all' && (
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                  Stage: {STAGE_CONFIG[selectedStage as Stage]?.label}
                </span>
              )}
              {selectedSkill !== 'all' && (
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                  Skill: {selectedSkill}
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                  Difficulty: {selectedDifficulty}
                </span>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Idea Cards Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              currentPersona={currentPersona}
              onViewDetails={onViewDetails}
              onOpenScoreBreakdown={onOpenScoreBreakdown}
              onAdopt={onAdopt}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No Matching Dormant Ideas Found</h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search keywords, category filters, or complexity level.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
};
