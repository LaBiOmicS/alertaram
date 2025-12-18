import React from 'react';
import { Trash2, XCircle, Droplet, Leaf, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

export const DisposalEducationView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in font-sans">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-700 rounded-2xl mb-4">
          <Trash2 size={32} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Seja um Herói Ambiental</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          O que você faz com um antibiótico vencido pode ter um impacto gigantesco. Aprenda a quebrar o ciclo da contaminação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* O Jeito Errado */}
        <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-8 shadow-lg shadow-red-500/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
              <XCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold text-red-800">O Jeito Errado</h3>
          </div>
          <p className="text-slate-700 mb-6">
            Jogar no lixo comum ou no vaso sanitário parece fácil, mas cria um problema invisível e perigoso.
          </p>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100">
              <Trash2 className="text-red-500" size={20} />
              <span>Lixo Comum</span>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="text-red-300 rotate-90" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100">
              <Droplet className="text-red-500" size={20} />
              <span>Contamina o solo e lençol freático</span>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="text-red-300 rotate-90" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-100">
              <Leaf className="text-red-500" size={20} />
              <span>"Treina" bactérias no ambiente</span>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-4 rounded-xl border border-red-200">
            <h4 className="font-bold text-red-900 mb-2">A Consequência Silenciosa</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              No ambiente, baixas doses de antibióticos não matam todas as bactérias, mas criam uma "pressão seletiva" constante, favorecendo a sobrevivência e proliferação daquelas com genes de resistência. O rio vira um "campo de treinamento" de superbactérias.
            </p>
          </div>
        </div>

        {/* O Jeito Certo */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 shadow-lg shadow-emerald-500/10">
           <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800">O Jeito Certo</h3>
          </div>
          <p className="text-slate-700 mb-6">
            A atitude correta é simples e protege toda a comunidade. É o ciclo da responsabilidade.
          </p>
          
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-200">
              <MapPin className="text-emerald-600" size={20} />
              <span>Levar ao Ponto de Coleta</span>
            </div>
             <div className="flex justify-center">
              <ArrowRight className="text-emerald-300 rotate-90" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-200">
              <Trash2 className="text-emerald-600" size={20} />
              <span>Descarte profissional e seguro</span>
            </div>
            <div className="flex justify-center">
              <ArrowRight className="text-emerald-300 rotate-90" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-emerald-200">
              <Leaf className="text-emerald-600" size={20} />
              <span>Protege o meio ambiente e a saúde pública</span>
            </div>
          </div>
          
           <div className="mt-8 bg-white p-4 rounded-xl border border-emerald-200">
            <h4 className="font-bold text-emerald-900 mb-2">Sua Missão como Herói Ambiental</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Junte medicamentos vencidos ou sobras de tratamentos (incluindo frascos e caixas) e leve-os ao ponto de coleta mais próximo. <strong>A maioria das grandes redes de farmácias é obrigada por lei a ter um.</strong> Pergunte ao farmacêutico!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};