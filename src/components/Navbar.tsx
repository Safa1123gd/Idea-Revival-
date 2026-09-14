import React, { useState } from 'react';
import { Persona } from '../types';
import { 
  Sparkles, 
  PlusCircle, 
  Compass, 
  GitMerge, 
  AlertCircle, 
  Trophy, 
  LayoutDashboard, 
  Search,
  Menu,
  X,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentPersona: Persona;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenSubmitModal: () => void;
  pendingRequestsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPersona,
  activeSection,
  onNavigate,
  onOpenSubmitModal,
  pendingRequestsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore Ideas', icon: Compass, desc: 'Search & filter dormant concepts' },
    { id: 'journey', label: 'Revival Journey', icon: GitMerge, desc: '5-stage resurrection lifecycle' },
    { id: 'barriers', label: 'The 6 Barriers', icon: AlertCircle, desc: 'Founder & execution challenges' },
    { id: 'challenges', label: 'Challenges & Grants', icon: Trophy, desc: 'Institutional prize pools' },
    { 
      id: 'dashboard', 
      label: 'Workspace', 
      icon: LayoutDashboard, 
      desc: `${currentPersona.name}'s active projects`,
      badge: pendingRequestsCount 
    },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleSearchShortcut = () => {
    onNavigate('explore');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const searchInput = document.getElementById('marketplace-search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleItemClick('explore')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:bg-emerald-500 transition-colors">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                Idea Revival
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                Protocol
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
              Connecting dormant concepts with builders
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'text-emerald-800 bg-emerald-50 font-bold shadow-xs border border-emerald-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search trigger button */}
          <button
            type="button"
            onClick={handleSearchShortcut}
            className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-700 text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border border-slate-200/60"
            title="Search Ideas by skill, category, ID..."
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Quick Search</span>
            <kbd className="hidden md:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded text-slate-400 border border-slate-200">
              /
            </kbd>
          </button>

          {/* Submit Idea Button */}
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Submit Dormant Idea</span>
            <span className="sm:hidden">Submit Idea</span>
          </button>

          {/* Mobile Dashboard Icon button */}
          <button
            type="button"
            onClick={() => handleItemClick('dashboard')}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 relative cursor-pointer"
            title="My Workspace"
          >
            <LayoutDashboard className="w-5 h-5" />
            {pendingRequestsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="px-4 py-3 space-y-1">
            {/* Quick search input in mobile drawer */}
            <div className="mb-3">
              <button
                type="button"
                onClick={handleSearchShortcut}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs text-slate-500 border border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>Search ideas by skill, ID, title...</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Nav links */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{item.desc}</div>
                    </div>
                  </div>

                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge} pending
                    </span>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </button>
              );
            })}

            {/* Persona info footer inside mobile drawer */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2 py-1">
              <div className="flex items-center gap-2">
                <img
                  src={currentPersona.avatar}
                  alt={currentPersona.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500"
                />
                <span className="font-medium text-slate-700">{currentPersona.name}</span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                  {currentPersona.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
