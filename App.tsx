import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { ActView } from './components/ActView';
import { GameView } from './components/GameView';
import { RpgGameView } from './components/RpgGameView';
import { ProfessionalImpactView } from './components/ProfessionalImpactView';
import { DisposalEducationView } from './components/DisposalEducationView';
import { ChatView } from './components/ChatView';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <HomeView onChangeView={setCurrentView} />;
      case ViewState.LEARN:
        return <LearnView />;
      case ViewState.ACT:
        return <ActView />;
      case ViewState.PROFESSIONAL_IMPACT:
        return <ProfessionalImpactView />;
      case ViewState.DISPOSAL_EDUCATION:
        return <DisposalEducationView />;
      case ViewState.CHATBOT:
        return <ChatView />;
      case ViewState.GAME:
        return <GameView />;
      case ViewState.RPG_GAME:
        return <RpgGameView />;
      default:
        return <HomeView onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-900 font-bold mb-2">Alerta RAM</p>
          <p className="text-slate-500 text-sm mb-6">
            © {new Date().getFullYear()} - Educação Científica e Saúde Única para Todos.
          </p>
          
          {/* Idealização Section */}
          <div className="mb-8">
            <p className="text-slate-900 font-bold mb-2">Idealização</p>
            <a 
              href="https://labiomics.bioinformatica.com.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-600 hover:text-brand-700 font-semibold text-sm transition-colors"
            >
              LaBiOmicS
            </a>
            <p className="text-slate-500 text-sm">Laboratório de Bioinformática e Ciências Ômicas</p>
            <p className="text-slate-500 text-sm">Universidade de Mogi das Cruzes (UMC)</p>
          </div>
          
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <span>ODS 3: Saúde e Bem-estar</span>
            <span>One Health</span>
            <span>Microbiologia</span>
            <span>Sustentabilidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;