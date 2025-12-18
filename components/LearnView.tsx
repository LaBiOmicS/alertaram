import React, { useState } from 'react';
import { 
  HeartPulse, Microscope, 
  Dna, Globe2, ShieldCheck, ChevronDown, BookOpen, 
  Activity, GraduationCap, Syringe, Users, Stethoscope, UtensilsCrossed, Plane, Info, CheckCircle2, XCircle, ArrowRight, Dog, Trash2, MapPin, Building2, FlaskConical, PiggyBank, ClipboardCheck
} from 'lucide-react';

type Level = 'basic' | 'intermediate' | 'advanced';

interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const levels: { id: Level; title: string; subtitle: string; color: string; icon: React.ReactNode }[] = [
  { 
    id: 'basic', 
    title: 'Nível 1: Cidadão Consciente', 
    subtitle: 'O guia essencial para sobreviver e proteger sua família.',
    color: 'bg-emerald-500',
    icon: <HeartPulse size={24} className="text-white" />
  },
  { 
    id: 'intermediate', 
    title: 'Nível 2: Estudante de Ciências', 
    subtitle: 'Mecanismos biológicos e o conceito de Saúde Única.',
    color: 'bg-blue-600',
    icon: <Microscope size={24} className="text-white" />
  },
  { 
    id: 'advanced', 
    title: 'Nível 3: Especialista em Saúde', 
    subtitle: 'Genética, farmacologia e políticas públicas globais.',
    color: 'bg-purple-700',
    icon: <Dna size={24} className="text-white" />
  }
];

export const LearnView: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<Level>('basic');
  const [expandedTopic, setExpandedTopic] = useState<string | null>('what_is_amr');

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  const topics: Record<Level, Topic[]> = {
    basic: [
      {
        id: 'what_is_amr',
        title: 'O que é Resistência Antimicrobiana (RAM)?',
        icon: <ShieldCheck className="text-emerald-600" />,
        content: (
          <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed text-lg">
              Imagine um exército onde os soldados (antibióticos) atiram, mas os inimigos (bactérias) usam coletes à prova de balas que ficam cada vez melhores. Isso é a Resistência Antimicrobiana (RAM).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2"><XCircle size={18}/> NÃO É O SEU CORPO</h4>
                  <p className="text-sm text-slate-700">Seu corpo não fica "resistente" ao remédio. O antibiótico não perde a validade dentro de você.</p>
               </div>
               <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-700 mb-2 flex items-center gap-2"><CheckCircle2 size={18}/> SÃO AS BACTÉRIAS</h4>
                  <p className="text-sm text-slate-700">A <strong>BACTÉRIA</strong> muda (sofre mutação) e aprende a sobreviver ao ataque. Ela passa essa habilidade para suas descendentes.</p>
               </div>
            </div>
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h4 className="font-bold text-yellow-800">Consequência Prática:</h4>
                <p className="text-sm text-slate-700 mt-1">Infecções que eram simples de tratar, como uma infecção urinária, podem se tornar mortais porque os remédios param de funcionar.</p>
            </div>
          </div>
        )
      },
      {
        id: 'cycle_prescription',
        title: 'O Ciclo do Erro no Consultório',
        icon: <Stethoscope className="text-indigo-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Muitas vezes, a resistência começa com um mal-entendido entre médico e paciente.</p>
            <div className="relative border-l-4 border-indigo-200 pl-6 py-2 space-y-4">
              <div className="relative">
                <span className="absolute -left-[33px] bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ring-4 ring-white">1</span>
                <strong className="text-slate-900 block">A Pressão:</strong> Você tem uma gripe (causada por VÍRUS). Você quer "sarar logo" e pede um antibiótico.
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ring-4 ring-white">2</span>
                <strong className="text-slate-900 block">A Prescrição Incorreta:</strong> O médico, por vezes pressionado, prescreve o antibiótico, mesmo sabendo que ele não funciona contra vírus.
              </div>
              <div className="relative">
                <span className="absolute -left-[33px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ring-4 ring-white">3</span>
                <strong className="text-slate-900 block">O Dano Colateral:</strong> O remédio não mata o vírus da gripe, mas ataca as bactérias do seu corpo. As bactérias fracas morrem, mas as fortes (naturalmente resistentes) sobrevivem.
              </div>
               <div className="relative">
                <span className="absolute -left-[33px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ring-4 ring-white">4</span>
                <strong className="text-slate-900 block">A Superpopulação:</strong> Sem competição, as bactérias resistentes se multiplicam livremente, tornando-se dominantes em seu corpo.
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg text-indigo-800 text-sm font-medium text-center">
              Dica: Confie no seu médico. Se ele disser que é viral, não insista no antibiótico. Pergunte sobre tratamentos para os sintomas.
            </div>
          </div>
        )
      },
       {
        id: 'food_safety',
        title: 'Segurança Alimentar: O Guia Definitivo',
        icon: <UtensilsCrossed className="text-orange-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Bactérias resistentes estão presentes em alimentos crus. A cozinha é um campo de batalha crucial.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2 text-lg"><CheckCircle2/> FAÇA ISSO</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-emerald-600 shrink-0"/><span><strong>Lave bem as mãos</strong> antes e depois de manusear alimentos.</span></li>
                        <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-emerald-600 shrink-0"/><span><strong>Cozinhe carnes</strong> completamente (acima de 70°C).</span></li>
                        <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-emerald-600 shrink-0"/><span><strong>Lave frutas e vegetais</strong> em água corrente.</span></li>
                        <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-emerald-600 shrink-0"/><span><strong>Guarde sobras</strong> na geladeira o mais rápido possível.</span></li>
                    </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2 text-lg"><XCircle/> EVITE ISSO</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                       <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-red-600 shrink-0"/><span><strong>Contaminação Cruzada:</strong> Nunca use a mesma tábua ou faca para carne crua e salada.</span></li>
                       <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-red-600 shrink-0"/><span><strong>Descongelar na pia:</strong> Descongele na geladeira, micro-ondas ou em água fria.</span></li>
                       <li className="flex gap-2 items-start"><ArrowRight size={14} className="mt-1 text-red-600 shrink-0"/><span><strong>Deixar comida fora:</strong> Não deixe alimentos cozidos em temperatura ambiente por mais de 2 horas.</span></li>
                    </ul>
                </div>
            </div>
          </div>
        )
      },
      {
        id: 'pets_family',
        title: 'Pets e a Família',
        icon: <Dog className="text-amber-600" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Amamos nossos animais, mas eles também participam do ciclo da resistência. Cuidado e informação protegem a todos.</p>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <XCircle className="text-red-500 shrink-0 mt-1" size={24}/>
                <div>
                  <strong className="text-slate-800 text-base">Nunca medique seu pet por conta própria</strong>
                  <p className="text-sm text-slate-600">Doses e metabolismos são diferentes. Você pode intoxicá-lo e criar resistência com remédios humanos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={24}/>
                <div>
                  <strong className="text-slate-800 text-base">Siga o tratamento do veterinário à risca</strong>
                  <p className="text-sm text-slate-600">Complete o ciclo de antibióticos prescrito, mesmo que o animal pareça melhor. Isso garante que todas as bactérias, inclusive as mais fortes, sejam eliminadas.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={24}/>
                <div>
                  <strong className="text-slate-800 text-base">Higiene e descarte correto das fezes</strong>
                  <p className="text-sm text-slate-600">Fezes podem conter bactérias resistentes que contaminam o solo e a água de parques e praças, espalhando o problema.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'travel',
        title: 'Viagens: Levando Bactérias na Bagagem',
        icon: <Plane className="text-blue-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Superbactérias não precisam de passaporte. A globalização significa que uma cepa resistente que surge na Índia pode chegar ao Brasil em menos de 24 horas.</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 className="font-bold text-blue-800 mb-2">Como acontece a disseminação?</h4>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li><strong>Turismo e Negócios:</strong> Viajantes podem adquirir bactérias resistentes no exterior (em alimentos, água ou hospitais) e trazê-las para casa sem saber.</li>
                <li><strong>Turismo Médico:</strong> Pacientes que fazem cirurgias em outros países podem se infectar com superbactérias locais.</li>
                <li><strong>Importação de Alimentos:</strong> Produtos de origem animal ou vegetal podem carregar bactérias de outros ecossistemas.</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-sm text-emerald-800 font-medium text-center">
              <strong>Ação Prática:</strong> Lave as mãos constantemente em aeroportos e aviões e pesquise sobre os riscos de saúde do seu destino antes de viajar.
            </div>
          </div>
        )
      },
      {
        id: 'medicine_disposal',
        title: 'O Perigo do Lixo: Descarte Correto',
        icon: <Trash2 className="text-rose-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Jogar antibióticos no lixo comum ou no vaso sanitário é um erro grave com consequências invisíveis.</p>
            <div className="bg-rose-50 border-t-4 border-rose-500 p-4 rounded-b-xl shadow-md">
              <h4 className="font-bold text-rose-800 text-lg mb-2">Por que é tão perigoso?</h4>
              <p className="text-slate-700">Os medicamentos não desaparecem. Eles se dissolvem na água dos aterros, contaminam o lençol freático e chegam aos rios. Lá, eles expõem as bactérias do ambiente a doses baixas de antibióticos, o que é um "campo de treinamento" perfeito para que elas desenvolvam resistência.</p>
            </div>
            <div className="bg-emerald-50 border-emerald-200 border p-4 rounded-xl text-center">
               <h4 className="font-bold text-emerald-800 mb-2 flex items-center justify-center gap-2"><MapPin/> O que fazer?</h4>
               <p className="text-slate-700">Leve sobras e medicamentos vencidos a <strong>pontos de coleta específicos</strong>. A maioria das grandes redes de farmácia possui esses postos para descarte seguro.</p>
            </div>
          </div>
        )
      },
    ],
    intermediate: [
      {
        id: 'one_health_deep',
        title: 'A Tríade One Health (Saúde Única)',
        icon: <Globe2 className="text-green-600" />,
        content: (
          <div className="space-y-6">
            <p className="text-slate-700 text-lg">
              Não existe "saúde humana" isolada. Somos um ecossistema interligado onde as ações em um pilar afetam diretamente os outros.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md text-blue-600"><Users size={24}/></div>
                <strong className="block text-blue-800 mb-1 text-lg">Saúde Humana</strong>
                <span className="text-slate-600 text-xs">Uso excessivo de antibióticos em hospitais e pela população.</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 hover:shadow-lg transition-shadow">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md text-amber-600"><Dog size={24}/></div>
                <strong className="block text-amber-800 mb-1 text-lg">Saúde Animal</strong>
                <span className="text-slate-600 text-xs">Uso em animais de fazenda para engorda e prevenção.</span>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md text-green-600"><Trash2 size={24}/></div>
                <strong className="block text-green-800 mb-1 text-lg">Meio Ambiente</strong>
                <span className="text-slate-600 text-xs">Esgoto e resíduos industriais contaminam rios.</span>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-slate-800 text-md mb-2">Como o ciclo se retroalimenta:</h4>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-xs font-mono text-slate-600">
                  <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-lg"><Stethoscope size={14}/><span>Hospital descarta esgoto</span></div>
                  <ArrowRight className="text-slate-400 rotate-90 md:rotate-0"/>
                  <div className="flex items-center gap-2 bg-green-100 p-2 rounded-lg"><Globe2 size={14}/><span>Rio é contaminado</span></div>
                   <ArrowRight className="text-slate-400 rotate-90 md:rotate-0"/>
                   <div className="flex items-center gap-2 bg-amber-100 p-2 rounded-lg"><Dog size={14}/><span>Animais bebem a água</span></div>
                   <ArrowRight className="text-slate-400 rotate-90 md:rotate-0"/>
                   <div className="flex items-center gap-2 bg-red-100 p-2 rounded-lg"><Users size={14}/><span>Humanos comem a carne</span></div>
              </div>
            </div>
          </div>
        )
      },
       {
        id: 'natural_selection',
        title: 'Seleção Natural Acelerada',
        icon: <Activity className="text-blue-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">
              Darwin explicou a evolução em milhões de anos. Bactérias, que se reproduzem a cada 20 minutos, fazem isso em dias. O uso de antibióticos é uma força de seleção artificial poderosíssima.
            </p>
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center text-center">
                    <div className="flex-1">
                       <strong className="text-sm text-slate-800">1. População Inicial</strong>
                       <p className="text-xs text-slate-500">Uma minoria já é naturalmente resistente</p>
                       <div className="flex gap-1 justify-center mt-2">
                         <div className="w-4 h-4 rounded-full bg-blue-400" title="Bactéria Sensível"></div>
                         <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                         <div className="w-4 h-4 rounded-full bg-red-500 ring-2 ring-red-200" title="Mutante Resistente"></div>
                         <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                       </div>
                    </div>
                    <ArrowRight className="text-slate-400 shrink-0 rotate-90 sm:rotate-0"/>
                    <div className="flex-1">
                       <strong className="text-sm text-slate-800">2. Pressão Seletiva (Antibiótico)</strong>
                       <p className="text-xs text-slate-500">O remédio mata as sensíveis</p>
                       <div className="flex gap-1 justify-center mt-2">
                         <div className="w-4 h-4 rounded-full bg-blue-400 opacity-20"></div>
                         <div className="w-4 h-4 rounded-full bg-blue-400 opacity-20"></div>
                         <div className="w-4 h-4 rounded-full bg-red-500 ring-2 ring-red-200 animate-pulse"></div>
                         <div className="w-4 h-4 rounded-full bg-blue-400 opacity-20"></div>
                       </div>
                    </div>
                    <ArrowRight className="text-slate-400 shrink-0 rotate-90 sm:rotate-0"/>
                    <div className="flex-1">
                       <strong className="text-sm text-slate-800">3. População Final</strong>
                       <p className="text-xs text-slate-500">Apenas as resistentes se multiplicam</p>
                       <div className="flex gap-1 justify-center mt-2">
                         <div className="w-4 h-4 rounded-full bg-red-500"></div>
                         <div className="w-4 h-4 rounded-full bg-red-500"></div>
                         <div className="w-4 h-4 rounded-full bg-red-500"></div>
                         <div className="w-4 h-4 rounded-full bg-red-500"></div>
                       </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
              Ao usar um antibiótico (especialmente de forma errada), você cria o ambiente perfeito — sem competição — para a única mutante resistente prosperar e dominar.
            </p>
          </div>
        )
      },
      {
        id: 'agriculture',
        title: 'O Papel da Agropecuária',
        icon: <PiggyBank className="text-orange-600" />,
        content: (
            <div className="space-y-4">
                <p className="text-slate-700">Cerca de 70% de todos os antibióticos vendidos no mundo são para animais. Isso cria um gigantesco reservatório de resistência.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="font-bold text-orange-800 mb-2">Uso Subterapêutico (Promotor de Crescimento)</h4>
                        <p className="text-sm text-slate-700">Doses baixas e contínuas na ração para engordar o animal mais rápido. É o "treinamento" perfeito para criar bactérias resistentes, já que não mata todas, apenas seleciona as mais fortes.</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-emerald-800 mb-2">Uso Terapêutico e Profilático</h4>
                        <p className="text-sm text-slate-700">Para tratar um animal doente (terapêutico) ou prevenir que todo o rebanho adoeça (profilático). Embora necessário, o uso massivo ainda contribui para o problema.</p>
                    </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <h4 className="font-bold text-yellow-800">Como chega em nós?</h4>
                    <p className="text-sm text-slate-700 mt-1">Através do consumo de carne mal cozida, contaminação do solo e da água pelo esterco, e contato direto de trabalhadores rurais com os animais.</p>
                </div>
            </div>
        )
      },
      {
        id: 'biofilms',
        title: 'Biofilmes: As Cidades das Bactérias',
        icon: <Building2 className="text-teal-600" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Bactérias raramente vivem sozinhas. Elas se unem para formar "biofilmes", comunidades complexas e altamente protegidas, como cidades fortificadas.</p>
            <div className="bg-teal-50 border-t-4 border-teal-500 p-4 rounded-b-xl shadow-md">
              <h4 className="font-bold text-teal-800 text-lg mb-2">Por que biofilmes são um problema?</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2"><ArrowRight size={14} className="mt-1 text-teal-600 shrink-0"/><span><strong>Escudo Físico:</strong> Elas produzem uma matriz gosmenta (polissacarídeos) que impede fisicamente a penetração do antibiótico.</span></li>
                  <li className="flex gap-2"><ArrowRight size={14} className="mt-1 text-teal-600 shrink-0"/><span><strong>Metabolismo Lento:</strong> Bactérias no interior do biofilme ficam "dormentes", e antibióticos só costumam atacar células em atividade.</span></li>
                  <li className="flex gap-2"><ArrowRight size={14} className="mt-1 text-teal-600 shrink-0"/><span><strong>Troca de Genes:</strong> A proximidade facilita a troca de genes de resistência (plasmídeos) entre as bactérias.</span></li>
              </ul>
            </div>
            <p className="text-sm text-slate-600"><strong>Exemplos comuns:</strong> A placa nos seus dentes, o lodo em canos, e infecções persistentes em cateteres e próteses médicas.</p>
          </div>
        )
      },
    ],
    advanced: [
      {
        id: 'genetics',
        title: 'Os 4 Superpoderes (Mecanismos Moleculares)',
        icon: <Dna className="text-purple-600" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">
              A resistência não é uma única habilidade, mas um arsenal de estratégias moleculares que as bactérias usam para sobreviver.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white border-2 border-slate-100 p-4 rounded-xl shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                 <strong className="text-purple-700 block mb-1 text-base">1. Campo de Força (Impermeabilidade)</strong>
                 <span className="text-slate-600">A bactéria altera sua membrana externa, fechando os "portões" (porinas) para que o antibiótico sequer consiga entrar na célula.</span>
              </div>
              <div className="bg-white border-2 border-slate-100 p-4 rounded-xl shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                 <strong className="text-purple-700 block mb-1 text-base">2. Sistema de Ejeção (Bombas de Efluxo)</strong>
                 <span className="text-slate-600">Proteínas especiais agem como porteiros, reconhecendo o antibiótico que entra e o bombeando ativamente para fora antes que ele possa agir.</span>
              </div>
              <div className="bg-white border-2 border-slate-100 p-4 rounded-xl shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                 <strong className="text-purple-700 block mb-1 text-base">3. Desativação (Enzimas)</strong>
                 <span className="text-slate-600">A bactéria produz enzimas (como as Beta-lactamases) que funcionam como "tesouras" moleculares, cortando e destruindo a molécula do antibiótico.</span>
              </div>
              <div className="bg-white border-2 border-slate-100 p-4 rounded-xl shadow-sm hover:border-purple-200 hover:shadow-md transition-all">
                 <strong className="text-purple-700 block mb-1 text-base">4. Disfarce (Alteração do Alvo)</strong>
                 <span className="text-slate-600">O antibiótico precisa se ligar a um alvo específico (como o ribossomo) para funcionar. A bactéria modifica a forma desse alvo, e o antibiótico não consegue mais "encaixar".</span>
              </div>
            </div>
            <div className="bg-purple-900 text-purple-100 p-4 rounded-xl text-xs font-mono mt-2 flex gap-3 items-center">
              <Info size={32} className="shrink-0"/>
              <div>
                 <span className="font-bold text-yellow-400">Pior que isso:</span> Bactérias podem trocar esses "superpoderes" entre si através de material genético móvel (Plasmídeos), mesmo entre espécies diferentes! É a "internet" das bactérias.
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'pipeline',
        title: 'Geopolítica e Economia (Pipeline Vazio)',
        icon: <GraduationCap className="text-indigo-600" />,
        content: (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
               <h4 className="font-bold text-slate-800 text-lg mb-2">Se o problema é tão grave, por que não criamos novos antibióticos?</h4>
               <p className="text-slate-600 leading-relaxed">
                 A resposta é econômica. Criar um novo antibiótico custa em média <strong>$1.5 bilhão</strong> e leva mais de 10 anos. Diferente de um remédio para colesterol (que o paciente usa a vida toda), um novo antibiótico deve ser usado o mínimo possível, para não gerar resistência.
               </p>
               <div className="mt-4 bg-red-100 text-red-800 p-3 rounded-lg text-center font-medium">
                  Isso cria um paradoxo: quanto mais eficaz e importante o antibiótico, menos ele deve ser vendido, tornando-o um péssimo negócio para a indústria farmacêutica.
               </div>
            </div>
             <p className="text-slate-700">A solução envolve novos modelos de financiamento, como parcerias público-privadas e "prêmios de mercado", onde governos pagam à empresa pelo desenvolvimento, não pela quantidade vendida. Sem isso, o "pipeline" de novos medicamentos continuará seco.</p>
          </div>
        )
      },
      {
        id: 'diagnostics',
        title: 'Diagnóstico: A Corrida Contra o Tempo',
        icon: <ClipboardCheck className="text-sky-600" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Usar o antibiótico errado é como atirar no escuro: você desperdiça munição, causa danos colaterais (mata bactérias boas) e treina o inimigo. A chave é o diagnóstico rápido e preciso.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-700 mb-2">HOJE: Terapia Empírica</h4>
                <p className="text-sm text-slate-700">O médico não sabe qual bactéria está causando a infecção, então prescreve um antibiótico de "amplo espectro" que mata vários tipos. É uma bomba atômica para matar uma formiga. Isso acelera a resistência.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-700 mb-2">FUTURO: Terapia Direcionada</h4>
                <p className="text-sm text-slate-700">Um teste rápido (minutos, não dias) identifica a bactéria e a quais antibióticos ela é sensível (antibiograma). O médico prescreve o remédio exato, um "tiro de sniper". Isso preserva os antibióticos e salva vidas.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">O desafio é desenvolver testes que sejam rápidos, baratos e acessíveis globalmente para que a terapia direcionada se torne o padrão, não a exceção.</p>
          </div>
        )
      },
      {
        id: 'phage_therapy',
        title: 'Terapia com Fagos: A Esperança Viral',
        icon: <FlaskConical className="text-pink-500" />,
        content: (
          <div className="space-y-4">
            <p className="text-slate-700">Se os antibióticos estão falhando, o que vem a seguir? Uma das respostas mais promissoras vem da natureza: usar vírus para matar bactérias.</p>
            <div className="bg-pink-50 p-6 rounded-2xl">
              <h4 className="font-bold text-pink-800 text-lg mb-2">O que são Bacteriófagos (Fagos)?</h4>
              <p className="text-slate-700">São vírus que evoluíram por bilhões de anos para um único propósito: infectar e destruir bactérias. Eles são os predadores naturais mais abundantes do planeta.</p>
              <div className="mt-4 pt-4 border-t border-pink-100 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-emerald-700">Vantagens:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li><strong>Hiper Específicos:</strong> Atacam apenas a bactéria-alvo, sem afetar as bactérias boas do nosso corpo.</li>
                      <li><strong>Auto-replicantes:</strong> Multiplicam-se no local da infecção até eliminar o alvo.</li>
                      <li><strong>Evoluem:</strong> Se a bactéria mudar, os fagos podem co-evoluir para superá-la.</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-red-700">Desafios:</strong>
                     <ul className="list-disc list-inside mt-1">
                      <li><strong>Regulamentação:</strong> A aprovação para uso humano é complexa e lenta.</li>
                      <li><strong>Produção:</strong> Encontrar e isolar o fago certo para cada infecção é um desafio.</li>
                    </ul>
                  </div>
              </div>
            </div>
             <p className="text-center text-sm font-medium text-slate-600">A terapia fágica não é uma bala de prata, mas representa uma fronteira vital na era pós-antibiótica.</p>
          </div>
        )
      },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in font-sans pb-32">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-700 rounded-2xl mb-4">
          <BookOpen size={32} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Centro de Conhecimento</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Informação é a única vacina contra a ignorância. Escolha seu nível e entenda o que está em jogo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {levels.map((level) => {
          const titleParts = level.title.split(': ');
          return (
            <button
              key={level.id}
              onClick={() => { setActiveLevel(level.id); setExpandedTopic(null); }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden group ${
                activeLevel === level.id 
                  ? `border-${level.color.split('-')[1]}-500 shadow-xl scale-105 z-10 bg-white` 
                  : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200'
              }`}
            >
              {activeLevel === level.id && (
                <div className={`absolute top-0 left-0 w-full h-1.5 ${level.color}`}></div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                activeLevel === level.id ? level.color : 'bg-slate-200 text-slate-400'
              }`}>
                {level.icon}
              </div>
              <h3 className={`font-bold text-lg mb-1 ${activeLevel === level.id ? 'text-slate-900' : 'text-slate-700'}`}>
                <span className="block text-sm opacity-80">{titleParts[0]}</span>
                <span className="block text-xl leading-tight">{titleParts[1]}</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                {level.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-2 h-8 rounded-full ${levels.find(l => l.id === activeLevel)?.color}`}></div>
          <h3 className="text-2xl font-bold text-slate-900">
            {activeLevel === 'basic' ? 'Manual de Sobrevivência' : 
             activeLevel === 'intermediate' ? 'Conceitos Fundamentais' : 
             'Ciência Avançada'}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topics[activeLevel].map((topic) => (
            <div 
              key={topic.id} 
              className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                expandedTopic === topic.id 
                  ? 'border-brand-200 shadow-lg ring-1 ring-brand-100' 
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-slate-100 shrink-0 transition-colors ${expandedTopic === topic.id ? 'text-brand-600 bg-brand-50' : 'text-slate-500'}`}>
                    {topic.icon}
                  </div>
                  <span className={`font-bold text-lg leading-tight ${expandedTopic === topic.id ? 'text-brand-800' : 'text-slate-700'}`}>
                    {topic.title}
                  </span>
                </div>
                <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ml-2 ${expandedTopic === topic.id ? 'bg-brand-100 text-brand-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  expandedTopic === topic.id ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`p-5 sm:p-6 pt-0 transition-colors ${expandedTopic === topic.id ? 'bg-slate-50/50' : ''}`}>
                  <div className="border-t border-slate-100">
                    <div className="mt-6 animate-fade-in">
                      {topic.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};