
import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Globe2, TrendingUp, Skull, Microscope, ShieldAlert, Activity, Users, Gamepad2, ScrollText } from 'lucide-react';

interface HomeViewProps {
  onChangeView: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onChangeView }) => {
  return (
    <div className="animate-fade-in font-sans">
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 flex-grow flex items-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 font-bold text-xs uppercase tracking-widest mb-8 animate-bounce">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Ameaça Global Iminente
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
                Resistência <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Antimicrobiana</span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-200 mb-6 font-light">
                A Pandemia Silenciosa
              </p>
              
              <p className="text-lg sm:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Bactérias estão se tornando imunes aos nossos remédios. 
                <strong className="text-white font-semibold"> Não é ficção científica.</strong> É a maior crise sanitária do nosso tempo, segundo a Organização Mundial de Saúde (OMS).
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <button
                  onClick={() => onChangeView(ViewState.LEARN)}
                  className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.6)] hover:-translate-y-1 overflow-hidden w-full sm:w-auto whitespace-nowrap"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <span className="flex items-center justify-center gap-2">
                    Entender o Perigo
                    <ArrowRight size={20} />
                  </span>
                </button>
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                   <button
                    onClick={() => onChangeView(ViewState.GAME)}
                    className="group px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl transition-all hover:-translate-y-1 w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2"
                   >
                     <Gamepad2 size={20} className="text-brand-400 group-hover:scale-110 transition-transform" />
                     Simulador de Defesa
                   </button>
                   <button
                    onClick={() => onChangeView(ViewState.RPG_GAME)}
                    className="group px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl transition-all hover:-translate-y-1 w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2"
                   >
                     <ScrollText size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                     RPG: Ameaça Invisível
                   </button>
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-blue-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
                <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">STATUS: CRÍTICO</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                      <div className="bg-red-500/20 p-3 rounded-lg text-red-400">
                        <Skull size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase">Mortes/Ano (Hoje)</div>
                        <div className="text-xl font-bold text-white">1.27 Milhões</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-white/5">
                      <div className="bg-brand-500/20 p-3 rounded-lg text-brand-400">
                        <Activity size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase">Eficácia Antibióticos</div>
                        <div className="text-xl font-bold text-white">Caindo Rapidamente</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                      <p className="text-sm text-slate-300 italic">"Se não agirmos, voltaremos à era pré-antibiótica."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative pb-10 flex flex-col items-center gap-4 opacity-50 cursor-pointer hover:opacity-100 transition-opacity z-20">
          <span className="text-xs uppercase tracking-widest text-slate-400">Descubra os Fatos</span>
          <ArrowRight className="rotate-90 text-brand-400 animate-bounce" size={20} />
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Os Números Não Mentem
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              A Resistência Antimicrobiana (RAM) já é uma realidade letal. Veja os dados compilados pela <em>The Lancet</em> e Nações Unidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-red-600 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <span className="font-bold text-slate-400 text-sm uppercase tracking-wider">Cenário 2050</span>
                </div>
                <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  10 Mi
                </div>
                <p className="font-medium text-slate-800 text-lg mb-3">Mortes anuais estimadas</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ultrapassará o câncer como a principal causa de morte no mundo se nada mudar.
                </p>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-brand-600 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <span className="font-bold text-slate-400 text-sm uppercase tracking-wider">Impacto Real</span>
                </div>
                <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  1 em 3
                </div>
                <p className="font-medium text-slate-800 text-lg mb-3">Infecções Intratáveis</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Casos de infecções comuns onde os antibióticos de primeira linha já não funcionam mais.
                </p>
              </div>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                    <ShieldAlert size={24} />
                  </div>
                  <span className="font-bold text-slate-400 text-sm uppercase tracking-wider">Economia</span>
                </div>
                <div className="text-5xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  -3.8%
                </div>
                <p className="font-medium text-slate-800 text-lg mb-3">PIB Global</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Impacto econômico comparável à crise financeira de 2008, afetando principalmente países pobres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-block p-4 rounded-full bg-white/10 mb-8 backdrop-blur-md">
            <Globe2 size={40} className="text-blue-400" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">
            "A resistência antimicrobiana é uma das <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">10 principais ameaças globais</span> à saúde pública."
          </h2>
          
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <div className="h-px w-12 bg-slate-700"></div>
            <span className="uppercase tracking-widest text-sm font-semibold">Organização Mundial da Saúde</span>
            <div className="h-px w-12 bg-slate-700"></div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-brand-400 mb-4 flex items-center gap-2">
                <Microscope size={20} />
                Medicina em Risco
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Sem antibióticos eficazes, procedimentos como cesarianas, cirurgias ortopédicas e quimioterapia tornam-se perigosamente arriscados.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <ShieldAlert size={20} />
                Ameaça Invisível
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Superbactérias não respeitam fronteiras. Elas viajam através de pessoas, alimentos e animais, tornando-se um problema de todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Não espere a crise chegar até você.</h2>
          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto font-medium">
            A educação é a única vacina contra a ignorância. Aprenda como pequenas ações salvam o futuro da medicina.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => onChangeView(ViewState.ACT)}
              className="px-10 py-5 bg-white text-brand-700 font-extrabold rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Activity size={24} />
              Quero Agir Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
