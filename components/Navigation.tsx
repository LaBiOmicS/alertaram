
import React, { useState } from 'react';
import { ViewState } from '../types';
import { Shield, BookOpen, Activity, Gamepad2, ShieldAlert, Menu, X, ScrollText, Briefcase, Trash2, Bot } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: ViewState.HOME, label: 'Início', icon: Shield },
    { id: ViewState.LEARN, label: 'Aprender', icon: BookOpen },
    { id: ViewState.ACT, label: 'Como Agir', icon: Activity },
    { id: ViewState.PROFESSIONAL_IMPACT, label: 'Impacto Profissional', icon: Briefcase },
    { id: ViewState.DISPOSAL_EDUCATION, label: 'Descarte Correto', icon: Trash2 },
    { id: ViewState.CHATBOT, label: 'Especialista IA', icon: Bot },
    { id: ViewState.GAME, label: 'Simulador', icon: Gamepad2 },
    { id: ViewState.RPG_GAME, label: 'RPG Narrativo', icon: ScrollText },
  ];

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false); // Fecha o menu ao navegar
  };

  return (
    <nav className="sticky top-0 z-[70] bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavigate(ViewState.HOME)}>
            <div className="bg-red-500 text-white p-2 rounded-lg mr-2 group-hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
              <ShieldAlert size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl text-slate-900 tracking-tight leading-none uppercase flex items-center gap-0.5">
                Alerta <span className="text-red-600">RAM</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-slate-900 text-slate-100 z-[150] shadow-2xl transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <span className="font-bold text-lg">Navegação</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-base font-medium transition-colors ${
                currentView === item.id
                  ? 'text-brand-400 bg-slate-800'
                  : 'text-slate-200 hover:text-brand-400 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
       <div 
         className={`fixed inset-0 bg-slate-900/50 z-[140] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
         onClick={() => setIsMenuOpen(false)}
       ></div>
    </nav>
  );
};