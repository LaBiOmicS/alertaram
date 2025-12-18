import React, { useState } from 'react';
import { Briefcase, Stethoscope, Dog, Smile, Leaf, UtensilsCrossed, HeartPulse, ChevronDown, Pill } from 'lucide-react';

interface ImpactArea {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  impacts: string[];
}

const areas: ImpactArea[] = [
  {
    id: 'medicina',
    title: 'Medicina',
    subtitle: 'A volta à era pré-antibiótica.',
    icon: <Stethoscope size={24} />,
    color: 'blue',
    impacts: [
      '**Cirurgias de Rotina (Cesáreas, Apendicites):** Tornam-se procedimentos de altíssimo risco sem a proteção antibiótica eficaz.',
      '**Transplantes de Órgãos:** A imunossupressão necessária se torna quase inviável devido ao risco de infecções intratáveis.',
      '**Quimioterapia:** Pacientes com câncer, com sistema imune enfraquecido, ficam extremamente vulneráveis a bactérias comuns.',
      '**UTIs:** Unidades de Terapia Intensiva podem se tornar focos incontroláveis de superbactérias, elevando drasticamente a mortalidade.',
    ],
  },
  {
    id: 'veterinaria',
    title: 'Medicina Veterinária',
    subtitle: 'Guardiões da saúde animal e humana.',
    icon: <Dog size={24} />,
    color: 'amber',
    impacts: [
      '**Animais de Estimação:** Infecções simples (de pele, urinárias) podem se tornar crônicas ou fatais.',
      '**Produção Animal:** Surtos em rebanhos podem levar a perdas econômicas massivas e ameaçar a segurança alimentar.',
      '**Zoonoses:** Animais podem se tornar reservatórios de superbactérias, transmitindo-as para humanos.',
      '**Cirurgias Veterinárias:** Procedimentos em pets e animais de grande porte ficam mais arriscados e com pós-operatórios complicados.',
    ],
  },
  {
    id: 'odontologia',
    title: 'Odontologia',
    subtitle: 'A boca como porta de entrada para superbactérias.',
    icon: <Smile size={24} />,
    color: 'teal',
    impacts: [
      '**Profilaxia Antibiótica:** A prevenção de infecções antes de procedimentos em pacientes de risco (cardíacos, imunossuprimidos) perde a eficácia.',
      '**Abscessos Dentários:** Uma infecção localizada pode evoluir rapidamente para uma infecção sistêmica grave e de difícil tratamento.',
      '**Implantes e Cirurgias Periodontais:** O sucesso desses procedimentos depende do controle bacteriano, que fica comprometido.',
    ],
  },
   {
    id: 'enfermagem',
    title: 'Enfermagem',
    subtitle: 'A linha de frente na prevenção e no cuidado.',
    icon: <HeartPulse size={24} />,
    color: 'pink',
    impacts: [
      '**Controle de Infecção Hospitalar:** Enfermeiros são cruciais na prevenção da disseminação de superbactérias entre pacientes.',
      '**Administração de Medicamentos:** A complexidade aumenta com antibióticos de último recurso, que exigem monitoramento intensivo.',
      '**Cuidados com Feridas Crônicas:** Tratamento de feridas infectadas se torna um desafio diário e prolongado.',
      '**Educação do Paciente:** O papel de educar sobre o uso correto de antibióticos e medidas de higiene se torna ainda mais vital.',
    ],
  },
  {
    id: 'farmacia',
    title: 'Farmácia',
    subtitle: 'A última barreira antes do uso indevido.',
    icon: <Pill size={24} />,
    color: 'purple',
    impacts: [
      '**Aconselhamento ao Paciente:** O farmacêutico é vital para reforçar a importância de completar o tratamento e não compartilhar antibióticos.',
      '**Controle de Vendas:** A responsabilidade de exigir receita e coibir a automedicação é um pilar no combate à RAM.',
      '**Logística Reversa:** Farmácias são pontos de coleta essenciais para o descarte seguro de medicamentos, quebrando o ciclo de contaminação ambiental.',
      '**Farmacovigilância:** Reportar reações adversas e suspeitas de ineficácia ajuda a mapear o avanço da resistência.',
    ],
  },
  {
    id: 'agricultura',
    title: 'Agricultura',
    subtitle: 'O campo de batalha no solo e na água.',
    icon: <Leaf size={24} />,
    color: 'green',
    impacts: [
      '**Uso em Animais de Produção:** A pressão para reduzir o uso de antibióticos como promotores de crescimento exige novas práticas de manejo e biossegurança.',
      '**Contaminação Ambiental:** O esterco de animais tratados pode espalhar genes de resistência no solo e na água, contaminando plantações.',
      '**Bactericidas Agrícolas:** O uso de produtos para controlar pragas bacterianas nas plantas também contribui para a seleção de mecanismos de resistência.',
    ],
  },
  {
    id: 'nutricao',
    title: 'Nutrição',
    subtitle: 'O que comemos e como isso nos afeta.',
    icon: <UtensilsCrossed size={24} />,
    color: 'orange',
    impacts: [
      '**Segurança Alimentar:** A presença de bactérias resistentes em carnes cruas e vegetais exige um rigor ainda maior no preparo dos alimentos.',
      '**Microbiota Intestinal:** O uso indiscriminado de antibióticos destrói bactérias benéficas, e nutricionistas têm o desafio de ajudar a restaurar essa flora.',
      '**Dietas Hospitalares:** A nutrição se torna um pilar fundamental para fortalecer o sistema imune de pacientes com infecções resistentes.',
    ],
  },
];

const colorClasses: Record<string, { bg: string, text: string, border: string, ring: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', ring: 'ring-blue-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', ring: 'ring-amber-100' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', ring: 'ring-teal-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', ring: 'ring-green-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', ring: 'ring-orange-100' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', ring: 'ring-pink-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', ring: 'ring-purple-100' },
};


export const ProfessionalImpactView: React.FC = () => {
    const [expandedCard, setExpandedCard] = useState<string | null>('medicina');

    const toggleCard = (id: string) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in font-sans">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-700 rounded-2xl mb-4">
          <Briefcase size={32} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Impacto Profissional</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A Resistência Antimicrobiana não é um problema apenas para médicos. Veja como ela ameaça o futuro de diversas áreas cruciais da sociedade.
        </p>
      </div>

      <div className="space-y-4">
        {areas.map((area) => (
          <div 
            key={area.id}
            className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                expandedCard === area.id 
                ? `${colorClasses[area.color].border} shadow-lg ring-1 ${colorClasses[area.color].ring}`
                : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <button
              onClick={() => toggleCard(area.id)}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shrink-0 transition-colors ${expandedCard === area.id ? `${colorClasses[area.color].bg} ${colorClasses[area.color].text}` : 'bg-slate-100 text-slate-500'}`}>
                    {area.icon}
                </div>
                <div className="flex-1">
                    <h3 className={`font-bold text-lg leading-tight ${expandedCard === area.id ? colorClasses[area.color].text : 'text-slate-800'}`}>
                        {area.title}
                    </h3>
                    <p className="text-sm text-slate-500">{area.subtitle}</p>
                </div>
              </div>
              <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ml-2 ${expandedCard === area.id ? `${colorClasses[area.color].bg} ${colorClasses[area.color].text} rotate-180` : 'bg-slate-100 text-slate-400'}`}>
                <ChevronDown size={20} />
              </div>
            </button>

            <div 
              className={`transition-all duration-500 ease-in-out ${
                expandedCard === area.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`px-5 pb-6 transition-colors`}>
                 <div className="border-t border-slate-100 pt-5 ml-16">
                    <ul className="space-y-3 text-slate-700">
                        {area.impacts.map((impact, index) => (
                           <li key={index} className="flex items-start gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${colorClasses[area.color].bg.replace('-50', '-500')} mt-2 shrink-0`}></div>
                                <span dangerouslySetInnerHTML={{ __html: impact.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>') }}></span>
                           </li>
                        ))}
                    </ul>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};