import React from 'react';
import { Persona } from '../types';
import { UserCheck, Sparkles, ArrowRightLeft, ShieldAlert } from 'lucide-react';

interface PersonaBarProps {
  currentPersona: Persona;
  onSwitchPersona: (personaId: 'elena' | 'ayan') => void;
  allPersonas: Record<'elena' | 'ayan', Persona>;
}

export const PersonaBar: React.FC<PersonaBarProps> = ({
  currentPersona,
  onSwitchPersona,
  allPersonas,
}) => {
  const isElena = currentPersona.id === 'elena';

  return (
    <div id="demo-persona-bar" className="bg-slate-950 text-slate-100 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Role label & Interactive persona selector tabs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Role Perspective:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            {/* Elena Button */}
            <button
              id="persona-elena-btn"
              type="button"
              onClick={() => onSwitchPersona('elena')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isElena
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <img
                src={allPersonas.elena.avatar}
                alt="Elena"
                className="w-4 h-4 rounded-full object-cover ring-1 ring-white/30"
              />
              <span>Elena</span>
              <span className={`text-[10px] font-normal px-1 py-0.2 rounded ${
                isElena ? 'bg-emerald-700 text-emerald-100' : 'text-slate-500'
              }`}>
                Creator
              </span>
            </button>

            {/* Ayan Button */}
            <button
              id="persona-ayan-btn"
              type="button"
              onClick={() => onSwitchPersona('ayan')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                !isElena
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <img
                src={allPersonas.ayan.avatar}
                alt="Ayan"
                className="w-4 h-4 rounded-full object-cover ring-1 ring-white/30"
              />
              <span>Ayan</span>
              <span className={`text-[10px] font-normal px-1 py-0.2 rounded ${
                !isElena ? 'bg-emerald-700 text-emerald-100' : 'text-slate-500'
              }`}>
                Builder
              </span>
            </button>
          </div>

          <span className="hidden lg:inline text-slate-400 text-[11px]">
            {isElena
              ? 'Has 3 cataloged concepts · Reviewing incoming adoption proposals'
              : 'Full-stack engineer · Adopting dormant concepts & reporting sprint progress'}
          </span>
        </div>

        {/* Right: Quick Context hint / Quick switch */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="hidden md:inline font-mono">
            {isElena ? '⚡ 1 Pending adoption proposal' : '⚡ 2 Active adopted projects'}
          </span>
          <button
            id="switch-persona-btn"
            type="button"
            onClick={() => onSwitchPersona(isElena ? 'ayan' : 'elena')}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-0.5 rounded hover:bg-slate-900 cursor-pointer transition-colors"
            title={`Switch to ${isElena ? 'Ayan' : 'Elena'}`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Switch to</span>
            <span>{isElena ? 'Ayan' : 'Elena'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
