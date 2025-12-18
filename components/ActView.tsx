import React, { useState } from 'react';
import { Leaf, Heart, Pill, Sparkles, Loader2, AlertTriangle, User, Dog, Globe, ScrollText, ClipboardCheck, Syringe, ShieldCheck, Stethoscope, Home, Trash2, UtensilsCrossed } from 'lucide-react';
import { ActionPlanItem } from '../types';

const categoryIcons: { [key in ActionPlanItem['category']]: React.ReactNode } = {
  'Human': <Heart className="text-blue-600" size={24} />,
  'Animal': <Dog className="text-amber-600" size={24} />,
  'Environment': <Leaf className="text-green-600" size={24} />,
};

const impactColors: { [key in ActionPlanItem['impact']]: string } = {
  'High': 'bg-red-100 text-red-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'Low': 'bg-green-100 text-green-700',
};

// --- BANCO DE PLANOS PRÉ-DEFINIDOS ---
const predefinedPlans: Record<string, Record<string, ActionPlanItem[]>> = {
  'pai_mae_familia': {
    'saude_familia': [
      { title: 'Supervisionar o Tratamento', description: 'Garanta que todos em casa (incluindo você) completem o ciclo de antibióticos prescrito, mesmo que os sintomas desapareçam. Isso elimina as bactérias mais resistentes que sobrevivem no final.', category: 'Human', impact: 'High' },
      { title: 'Vacinação em Dia é Prioridade', description: 'Verifique a carteira de vacinação de toda a família. Prevenir doenças como coqueluche e pneumonia bacteriana é a forma mais eficaz de evitar a necessidade de antibióticos.', category: 'Human', impact: 'High' },
      { title: 'Cozinha Segura, Família Saudável', description: 'Use tábuas e facas separadas para carnes cruas e vegetais. Isso evita a contaminação cruzada, impedindo que bactérias (potencialmente resistentes) dos alimentos se espalhem.', category: 'Environment', impact: 'Medium' },
      { title: 'Farmácia Doméstica Consciente', description: 'Não guarde sobras de antibióticos. Leve-os a um posto de coleta em uma farmácia para o descarte correto, evitando que contaminem o ambiente.', category: 'Environment', impact: 'Medium' },
      { title: 'Diálogo Aberto com o Pediatra', description: 'Ao levar seu filho ao médico, não pressione por um antibiótico para gripes ou resfriados. Pergunte "Doutor, há certeza de que é uma infecção bacteriana?".', category: 'Human', impact: 'Low' },
    ],
    'cuidado_pet': [
       { title: 'Mãos Limpas Após o Carinho', description: 'Sempre lave as mãos após brincar com o pet ou limpar suas necessidades. Animais podem carregar bactérias resistentes sem ficarem doentes e passá-las para nós.', category: 'Animal', impact: 'High' },
       { title: 'Veterinário é o Único Médico do Pet', description: 'Nunca dê um antibiótico seu para seu animal de estimação. As doses e os tipos de medicamentos são diferentes e podem ser tóxicos, além de gerar resistência.', category: 'Animal', impact: 'High' },
       { title: 'Descarte Correto das Fezes', description: 'Recolha as fezes do seu pet em passeios e descarte no lixo. Fezes podem contaminar o solo e a água de parques com bactérias resistentes.', category: 'Environment', impact: 'Medium' },
       { title: 'Brinquedos e Potes Sempre Limpos', description: 'Higienize regularmente os potes de comida/água e os brinquedos do seu pet. Biofilmes bacterianos podem se formar nessas superfícies.', category: 'Animal', impact: 'Low' },
       { title: 'Qualidade da Ração Importa', description: 'Ofereça alimentos de boa qualidade. Uma boa nutrição fortalece o sistema imunológico do pet, diminuindo a chance de infecções que precisariam de antibióticos.', category: 'Animal', impact: 'Low' },
    ],
    'impacto_ambiental': [
      { title: 'Descarte Zero no Esgoto', description: 'Jamais jogue comprimidos ou líquidos antibióticos no vaso sanitário. Eles passam pelas estações de tratamento e "treinam" bactérias nos rios. Use postos de coleta.', category: 'Environment', impact: 'High' },
      { title: 'Prefira Produtos de Criação Responsável', description: 'Se possível, busque por carnes e laticínios com selos de "sem uso de antibióticos promotores de crescimento". Isso reduz a pressão por resistência na agropecuária.', category: 'Animal', impact: 'Medium' },
      { title: 'Horta Caseira Sem Contaminação', description: 'Se tem uma horta, use adubo seguro e água limpa. Evite usar água de fontes duvidosas que podem estar contaminadas por esgoto com resíduos de medicamentos.', category: 'Environment', impact: 'Medium' },
      { title: 'Limpeza Consciente', description: 'Evite o uso excessivo de produtos de limpeza "antibacterianos" em casa. Água e sabão são suficientes na maioria dos casos e não criam pressão seletiva.', category: 'Environment', impact: 'Low' },
      { title: 'Apoie o Saneamento Básico', description: 'Informe-se e apoie políticas públicas para a melhoria do tratamento de esgoto na sua cidade. Esgoto tratado é uma barreira crucial contra a RAM.', category: 'Human', impact: 'Low' },
    ],
    'ciencia': [
      { title: 'Supervisionar o Tratamento', description: '**Explicação Científica:** Parar o tratamento cedo elimina apenas as bactérias sensíveis (fracas), criando um ambiente sem competição para as poucas bactérias naturalmente mais fortes (mutantes) se multiplicarem e dominarem a população.', category: 'Human', impact: 'High' },
      { title: 'Cozinha como Laboratório', description: '**Explicação Científica:** A contaminação cruzada é a transferência de microrganismos de uma superfície para outra. Bactérias de uma carne crua podem formar uma nova colônia em uma salada em minutos.', category: 'Environment', impact: 'High' },
      { title: 'Vacinas: Treinamento do Sistema Imune', description: '**Explicação Científica:** Vacinas expõem seu corpo a um antígeno (parte do patógeno), criando células de memória. Se a infecção real ocorrer, a resposta imune é tão rápida que a doença não se desenvolve, eliminando a necessidade de tratamento com antibióticos.', category: 'Human', impact: 'High' },
      { title: 'Animais e o Microbioma Compartilhado', description: '**Explicação Científica:** Humanos e pets compartilham microbiomas. Genes de resistência podem passar de bactérias de animais para humanas (transferência horizontal de genes) através de plasmídeos, mesmo entre espécies diferentes.', category: 'Animal', impact: 'Medium' },
      { title: 'Descarte Correto: Quebrando o Ciclo Ambiental', description: '**Explicação Científica:** Baixas concentrações de antibióticos no ambiente não matam todas as bactérias, mas criam uma "pressão seletiva" constante, favorecendo a sobrevivência e proliferação daquelas com genes de resistência.', category: 'Environment', impact: 'Medium' },
    ]
  },
  'dono_pet': {
     'saude_familia': [
       { title: 'Lavar as Mãos é Regra', description: 'Após brincar, alimentar ou limpar seu pet, lave bem as mãos. É a principal barreira para evitar que bactérias (potencialmente resistentes) passem dele para você.', category: 'Human', impact: 'High' },
       { title: 'Beijos e Lambidas: Cuidado', description: 'Evite que seu pet lamba seu rosto, especialmente boca e nariz. A saliva dos animais contém uma microbiota muito diferente da nossa.', category: 'Animal', impact: 'Medium' },
       { title: 'Cama é Lugar de Humano', description: 'Evite dormir na mesma cama que seu pet, principalmente se você ou ele tiverem alguma ferida ou baixa imunidade. O contato prolongado aumenta a chance de troca de microrganismos.', category: 'Human', impact: 'Medium' },
       { title: 'Higiene do Ambiente', description: 'Mantenha o local onde o pet dorme e come sempre limpo. Isso diminui a carga bacteriana geral no ambiente que você compartilha.', category: 'Environment', impact: 'Low' },
       { title: 'Sapatos Fora de Casa', description: 'Crie o hábito de tirar os sapatos ao entrar em casa. Você evita trazer para o ambiente interno fezes de outros animais (e suas bactérias) que seu pet pode ter contato.', category: 'Environment', impact: 'Low' },
     ],
    'cuidado_pet': [
       { title: 'Veterinário é o Único Médico do Pet', description: 'Nunca dê um antibiótico seu para seu animal de estimação. As doses e os tipos de medicamentos são diferentes e podem ser tóxicos, além de gerar resistência.', category: 'Animal', impact: 'High' },
       { title: 'Complete o Tratamento Dele Também', description: 'Assim como nós, o tratamento do pet precisa ser seguido à risca até o fim, mesmo que ele pareça melhor. Isso evita a sobrevivência das bactérias mais fortes.', category: 'Animal', impact: 'High' },
       { title: 'Vacinas e Antipulgas em Dia', description: 'Manter a saúde preventiva do pet em dia (vacinas, controle de pulgas e carrapatos) evita doenças que secundariamente poderiam precisar de antibióticos.', category: 'Animal', impact: 'Medium' },
       { title: 'Descarte Correto das Fezes', description: 'Recolha as fezes do seu pet em passeios e descarte no lixo. Fezes podem contaminar o solo e a água de parques com bactérias resistentes.', category: 'Environment', impact: 'Medium' },
       { title: 'Alimentação de Qualidade', description: 'Uma dieta balanceada fortalece o sistema imunológico do seu pet, tornando-o menos suscetível a infecções.', category: 'Animal', impact: 'Low' },
    ],
    'impacto_ambiental': [
      { title: 'Descarte Correto das Fezes', description: 'É a sua ação de maior impacto ambiental. Fezes de animais tratados com antibióticos liberam esses compostos e bactérias resistentes diretamente no ambiente.', category: 'Environment', impact: 'High' },
      { title: 'Produtos de Limpeza Conscientes', description: 'Use produtos de limpeza pet-friendly e evite os "super desinfetantes". A limpeza excessiva com antimicrobianos pode selecionar bactérias mais fortes no seu próprio lar.', category: 'Environment', impact: 'Medium' },
      { title: 'Não Descarte Remédios do Pet na Pia', description: 'Sobras de xaropes ou comprimidos do seu pet também devem ir para postos de coleta em farmácias, nunca no lixo ou esgoto.', category: 'Environment', impact: 'Medium' },
      { title: 'Cuidado com Xixi em Jardins Públicos', description: 'Se possível, ensine seu pet a usar locais específicos. A urina também pode conter resíduos de medicamentos que afetam o solo.', category: 'Environment', impact: 'Low' },
      { title: 'Banhos com Produtos Adequados', description: 'Use apenas shampoos e produtos veterinários. Produtos humanos podem desequilibrar a microbiota da pele do animal, abrindo portas para infecções.', category: 'Animal', impact: 'Low' },
    ],
     'ciencia': [
      { title: 'O Zoonose Reverso', description: '**Explicação Científica:** Não são apenas os animais que nos passam doenças (zoonose). Nós também podemos transmitir bactérias resistentes para eles (zoonose reversa), que podem então passá-las de volta para nós ou para outros animais.', category: 'Animal', impact: 'High' },
      { title: 'Microbiota Compartilhada', description: '**Explicação Científica:** Estudos mostram que donos e seus pets compartilham comunidades de bactérias na pele e no intestino. Isso significa que um gene de resistência que surge em um, pode facilmente ser transferido para o outro.', category: 'Human', impact: 'High' },
      { title: 'Fezes como Vetor Ambiental', description: '**Explicação Científica:** As fezes são um "pacote" concentrado de bactérias. No ambiente, essas bactérias podem transferir seus genes de resistência para bactérias do solo através de "plasmídeos", espalhando a resistência pelo ecossistema.', category: 'Environment', impact: 'Medium' },
      { title: 'Metabolismo Diferente', description: '**Explicação Científica:** O fígado e os rins de cães e gatos metabolizam drogas de forma diferente dos humanos. Um antibiótico seguro para você pode ser ineficaz ou tóxico para eles, e vice-versa, por isso a prescrição veterinária é crucial.', category: 'Animal', impact: 'Medium' },
     ]
  },
  'estudante': {
    'saude_familia': [ // Adaptado para 'Saúde Pessoal e Comunitária'
      { title: 'Não Compartilhe Antibióticos', description: 'Nunca pegue um antibiótico de um amigo ou parente, nem ofereça o seu. Cada infecção precisa de um diagnóstico e tratamento específico.', category: 'Human', impact: 'High' },
      { title: 'Cuidado com Infecções Comunitárias', description: 'Em festas e ambientes fechados, a transmissão de bactérias é alta. Lave as mãos e evite compartilhar copos e talheres.', category: 'Human', impact: 'Medium' },
      { title: 'Informação é a Melhor Defesa', description: 'Converse com seus amigos sobre os riscos da automedicação. Um post ou uma conversa pode ter um grande impacto no seu círculo social.', category: 'Human', impact: 'Medium' },
      { title: 'Saúde Sexual Responsável', description: 'Algumas ISTs são bacterianas e o tratamento inadequado pode gerar resistência. Use proteção e faça exames regularmente.', category: 'Human', impact: 'High' },
      { title: 'Alimentação no Campus', description: 'Prefira locais de alimentação que demonstrem boas práticas de higiene. Intoxicações alimentares em ambientes universitários são comuns.', category: 'Environment', impact: 'Low' },
    ],
    'cuidado_pet': [ // Adaptado para vida em república/apartamento
      { title: 'Regras Claras para o Pet da Rep', description: 'Se há um animal compartilhado, definam um responsável principal pela saúde e medicação, sempre seguindo o veterinário.', category: 'Animal', impact: 'High' },
      { title: 'Higiene do Espaço Comum', description: 'A limpeza das áreas onde o pet circula é responsabilidade de todos. Isso evita a concentração de bactérias no ambiente.', category: 'Environment', impact: 'Medium' },
      { title: 'Visitas de Pets', description: 'Se amigos levam seus pets para sua casa, garanta que todos estejam saudáveis. É uma forma de evitar a troca de patógenos.', category: 'Animal', impact: 'Low' },
      { title: 'Cuidado com "Dicas" da Internet', description: 'Não siga conselhos de grupos online para tratar seu pet. Confie apenas no médico veterinário.', category: 'Animal', impact: 'High' },
    ],
    'impacto_ambiental': [
      { title: 'Descarte Correto na Universidade', description: 'Se sua universidade tiver cursos de saúde, procure por pontos de descarte de medicamentos nos prédios ou farmácias universitárias.', category: 'Environment', impact: 'High' },
      { title: 'Ativismo e Conscientização', description: 'Participe ou crie projetos de extensão sobre One Health e RAM no seu campus. A universidade é um polo de mudança.', category: 'Human', impact: 'Medium' },
      { title: 'Economia de Água', description: 'Pode não parecer direto, mas economizar água reduz a pressão sobre as estações de tratamento de esgoto, que são uma barreira contra a disseminação da RAM.', category: 'Environment', impact: 'Low' },
      { title: 'Mobilidade Sustentável', description: 'Usar bicicleta ou transporte público reduz sua pegada de carbono, contribuindo para um ambiente menos estressado e mais resiliente a crises de saúde.', category: 'Environment', impact: 'Low' },
    ],
    'ciencia': [
      { title: 'Não Compartilhe Antibióticos', description: '**Explicação Científica:** Compartilhar antibióticos é uma "terapia empírica" cega. Você pode estar usando um remédio ineficaz para a bactéria em questão, o que apenas mata as bactérias mais fracas do seu corpo e seleciona as resistentes.', category: 'Human', impact: 'High' },
      { title: 'O Perigo do "Tratamento Preventivo"', description: '**Explicação Científica:** Tomar antibiótico "para não ficar doente" é uma das piores práticas. Expor sua microbiota a um antibiótico sem uma infecção ativa é um treinamento intensivo para que suas bactérias normais desenvolvam e armazenem genes de resistência.', category: 'Human', impact: 'High' },
      { title: 'ISTs e Resistência', description: '**Explicação Científica:** Bactérias como a *Neisseria gonorrhoeae* (gonorreia) são exemplos clássicos de como o tratamento inadequado e a automedicação levaram ao surgimento de cepas multirresistentes, tornando uma doença curável em um grave problema de saúde pública.', category: 'Human', impact: 'Medium' },
      { title: 'O Papel do Estresse', description: '**Explicação Científica:** O estresse crônico (comum na vida de estudante) pode suprimir o sistema imunológico, tornando você mais suscetível a infecções. Cuidar da saúde mental é uma forma de prevenção que reduz a necessidade de antibióticos.', category: 'Human', impact: 'Low' },
    ]
  },
  'morador_rural': {
    'saude_familia': [
      { title: 'Cuidado com Ferimentos', description: 'Qualquer corte ou ferimento adquirido no campo deve ser limpo imediatamente com água e sabão. O solo é um grande reservatório de bactérias.', category: 'Human', impact: 'High' },
      { title: 'Água Sempre Potável', description: 'Beba apenas água de fontes seguras (filtrada, fervida ou tratada). Poços e nascentes podem estar contaminados por dejetos de animais.', category: 'Environment', impact: 'High' },
      { title: 'Higiene Após Contato com Animais', description: 'Sempre lave as mãos com cuidado após lidar com animais de criação, mesmo que pareçam saudáveis.', category: 'Animal', impact: 'Medium' },
      { title: 'Proteção Individual', description: 'Use luvas e botas ao trabalhar na lavoura ou com os animais. Isso cria uma barreira física contra a entrada de microrganismos.', category: 'Human', impact: 'Medium' },
    ],
    'cuidado_pet': [ // Adaptado para animais de criação
      { title: 'Separe Animais Doentes', description: 'Isole imediatamente qualquer animal que apresente sinais de doença para evitar que a infecção se espalhe pelo rebanho.', category: 'Animal', impact: 'High' },
      { title: 'Antibiótico Apenas Terapêutico', description: 'Use antibióticos apenas para tratar animais doentes com prescrição veterinária. Evite o uso massivo na ração como "promotor de crescimento".', category: 'Animal', impact: 'High' },
      { title: 'Manejo Correto de Esterco', description: 'Faça a compostagem do esterco antes de usá-lo como adubo. O processo de compostagem elimina grande parte dos patógenos e resíduos de antibióticos.', category: 'Environment', impact: 'Medium' },
      { title: 'Controle de Pragas', description: 'Mantenha um bom controle de ratos e insetos, pois eles podem ser vetores de doenças entre os animais e para os humanos.', category: 'Animal', impact: 'Low' },
    ],
    'impacto_ambiental': [
      { title: 'Manejo Correto de Esterco', description: 'Sua ação de maior impacto. Esterco não tratado aplicado diretamente no solo contamina lençóis freáticos e rios com bactérias resistentes e resíduos de antibióticos.', category: 'Environment', impact: 'High' },
      { title: 'Proteção de Nascentes e Rios', description: 'Mantenha os animais de criação longe das margens de rios e nascentes. Cerque essas áreas para evitar a contaminação direta da água por dejetos.', category: 'Environment', impact: 'High' },
      { title: 'Descarte de Embalagens de Medicamentos', description: 'Não queime ou enterre frascos e embalagens de medicamentos veterinários. Leve-os a um ponto de coleta ou siga a orientação do fabricante.', category: 'Environment', impact: 'Medium' },
      { title: 'Rotação de Culturas', description: 'A prática da rotação de culturas melhora a saúde do solo, tornando as plantas mais fortes e menos suscetíveis a doenças, o que pode reduzir a necessidade de agrotóxicos.', category: 'Environment', impact: 'Low' },
    ],
    'ciencia': [
        { title: 'Esterco como "Reator Biológico"', description: '**Explicação Científica:** O intestino de um animal tratado com antibióticos é um ambiente de alta seleção para resistência. O esterco carrega essa população de bactérias resistentes para o solo, onde elas podem transferir seus genes para as bactérias nativas do ambiente.', category: 'Environment', impact: 'High' },
        { title: 'Antibióticos no Solo', description: '**Explicação Científica:** Resíduos de antibióticos no solo alteram a comunidade microbiana, podendo afetar a fertilidade e o ciclo de nutrientes. Eles atuam como uma pressão seletiva contínua, fazendo do solo um reservatório de genes de resistência.', category: 'Environment', impact: 'High' },
        { title: 'O Salto Entre Espécies', description: '**Explicação Científica:** O contato próximo e constante com animais de criação aumenta a probabilidade de "spillover" (salto) de patógenos. Uma bactéria originalmente de aves ou suínos pode se adaptar e infectar humanos, trazendo consigo seus mecanismos de resistência.', category: 'Animal', impact: 'Medium' },
    ]
  }
};


export const ActView: React.FC = () => {
  const [profile, setProfile] = useState('pai_mae_familia');
  const [lifestyle, setLifestyle] = useState('saude_familia');
  const [plan, setPlan] = useState<ActionPlanItem[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A lógica agora é síncrona e local.
    const newPlan = predefinedPlans[profile]?.[lifestyle] || [];
    setPlan(newPlan);
  };

  // Efeito para gerar um plano inicial na primeira renderização
  useState(() => {
    setPlan(predefinedPlans['pai_mae_familia']['saude_familia']);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in font-sans">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-700 rounded-2xl mb-4">
            <Sparkles size={32} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Crie seu Plano de Ação Personalizado</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A luta contra a RAM começa com você. Responda duas perguntas para receber um plano de ação prático e focado na sua realidade.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl mb-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-1">
            <label htmlFor="profile" className="block text-sm font-bold text-slate-700 mb-2">Qual perfil te descreve?</label>
            <select
              id="profile"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="pai_mae_familia">Pai/Mãe de família</option>
              <option value="dono_pet">Dono(a) de Pet</option>
              <option value="estudante">Estudante</option>
              <option value="morador_rural">Morador(a) de área rural</option>
            </select>
          </div>
          <div className="md:col-span-1">
            <label htmlFor="lifestyle" className="block text-sm font-bold text-slate-700 mb-2">Qual seu principal interesse?</label>
            <select
              id="lifestyle"
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="saude_familia">Saúde da Família</option>
              <option value="cuidado_pet">Cuidado com Pet</option>
              <option value="impacto_ambiental">Impacto Ambiental</option>
              <option value="ciencia">Entender a Ciência</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full md:col-span-1 p-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            <span>Gerar Plano</span>
          </button>
        </form>
      </div>

      {plan.length > 0 && (
        <div className="animate-fade-in space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-6">Seu Plano de Ação Personalizado:</h3>
          {plan.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-brand-200 hover:shadow-md transition-all">
              <div className="p-3 bg-slate-50 rounded-xl">
                {categoryIcons[item.category]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${impactColors[item.impact]}`}>
                        Impacto {item.impact}
                    </span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Guia de Boas Práticas Universais</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Pequenas ações, grande impacto. Adote estes hábitos para proteger o futuro da medicina.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Saúde Humana */}
              <div className="space-y-4">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-blue-700 border-b-2 border-blue-200 pb-2">
                      <User size={24} /> Saúde Humana
                  </h3>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ScrollText className="text-blue-500 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Receita Médica é Lei</strong>
                          <p className="text-sm text-slate-600">Use antibióticos apenas com prescrição de um profissional de saúde qualificado.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ClipboardCheck className="text-blue-500 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Tratamento Completo</strong>
                          <p className="text-sm text-slate-600">Siga o tratamento até o fim, mesmo que se sinta melhor. Isso evita que as bactérias mais fortes sobrevivam.</p>
                      </div>
                  </div>
                   <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <Syringe className="text-blue-500 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Vacinas em Dia</strong>
                          <p className="text-sm text-slate-600">Prevenir doenças bacterianas através da vacinação é a melhor forma de não precisar de antibióticos.</p>
                      </div>
                  </div>
              </div>
              {/* Saúde Animal */}
              <div className="space-y-4">
                   <h3 className="flex items-center gap-3 text-xl font-bold text-amber-700 border-b-2 border-amber-200 pb-2">
                      <Dog size={24} /> Saúde Animal
                  </h3>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <Stethoscope className="text-amber-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Veterinário Decide</strong>
                          <p className="text-sm text-slate-600">Apenas o médico veterinário pode prescrever antibióticos para seu pet ou rebanho.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ShieldCheck className="text-amber-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Vacinação Animal</strong>
                          <p className="text-sm text-slate-600">Proteja seus animais de doenças e reduza a necessidade de tratamentos antimicrobianos.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <Home className="text-amber-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Higiene do Ambiente</strong>
                          <p className="text-sm text-slate-600">Mantenha limpos os espaços, comedouros e bebedouros dos animais para evitar infecções.</p>
                      </div>
                  </div>
              </div>
              {/* Meio Ambiente & Alimentos */}
              <div className="space-y-4">
                   <h3 className="flex items-center gap-3 text-xl font-bold text-green-700 border-b-2 border-green-200 pb-2">
                      <Globe size={24} /> Ambiente & Alimentos
                  </h3>
                   <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <Trash2 className="text-green-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Lixo, Não Esgoto</strong>
                          <p className="text-sm text-slate-600">Leve sobras de remédios a postos de coleta. Jamais descarte no vaso sanitário ou lixo comum.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <UtensilsCrossed className="text-green-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Cozinha Segura</strong>
                          <p className="text-sm text-slate-600">Lave bem os alimentos e use tábuas separadas para carnes cruas e vegetais para evitar contaminação.</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <Leaf className="text-green-600 shrink-0 mt-1" size={20} />
                      <div>
                          <strong className="text-slate-800">Origem Responsável</strong>
                          <p className="text-sm text-slate-600">Se possível, prefira produtos de criações que usam antibióticos de forma consciente e sustentável.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
