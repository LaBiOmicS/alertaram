
import React, { useState, useEffect, useRef } from 'react';
import { Scene, Clue, Choice } from '../types';
import { Microscope, FlaskConical, ScrollText, CheckCircle2, RefreshCw, ArrowRight, Frown, Radio, Dna, MapPin, User, Building2, Smartphone, AlertTriangle } from 'lucide-react';

const scenes: { [key: string]: Scene } = {
  intro: {
    id: 'intro',
    title: 'A CHAMADA NA MADRUGADA',
    newsTicker: 'ALERTA: CASOS DE INFECÇÃO RESISTENTE DOBRAM EM 24H',
    text: '03:42 da manhã. Seu telefone toca. É a Dra. Helena, diretora do Hospital Regional. A voz dela treme. "Sofia, perdemos mais um. Um garoto de 12 anos. Nenhum antibiótico fez efeito. Nem a Colistina. Estamos lidando com algo novo, algo... blindado." Você é a Dra. Sofia, especialista em One Health. O que parecia ser um surto isolado está prestes a se tornar uma tempestade perfeita.',
    choices: [
      { text: 'Correr para o hospital e ver o paciente zero', nextSceneId: 'hospital_arrival', reputationChange: 5, crisisChange: 0 },
      { text: 'Acessar remotamente os dados epidemiológicos antes de sair', nextSceneId: 'data_analysis_first', knowledgeGain: 1, crisisChange: 5 },
      { text: 'Ligar para o Secretário de Saúde pedindo quarentena imediata', nextSceneId: 'political_friction_start', reputationChange: -10, crisisChange: -5 },
    ],
    image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  hospital_arrival: {
    id: 'hospital_arrival',
    title: 'ZONA ZERO: O HOSPITAL',
    newsTicker: 'AO VIVO: FAMÍLIAS BUSCAM RESPOSTAS NA PORTA DO HOSPITAL',
    text: 'O caos é visível. Enfermeiros correm com ampolas. Você examina o prontuário de Lucas, o garoto falecido. Infecção generalizada por *Klebsiella pneumoniae*. Mas há um detalhe estranho no histórico: ele não esteve viajando, mas a família mora perto do Rio das Pedras. No corredor, uma jornalista, Mariana, te intercepta: "Doutora, dizem que é uma praga sem cura. O povo tem o direito de saber!"',
    choices: [
      { text: 'Ser transparente: "É grave, mas estamos investigando."', nextSceneId: 'media_transparency', reputationChange: 10, crisisChange: 5 },
      { text: 'Desconversar: "Sem comentários no momento."', nextSceneId: 'media_block', reputationChange: -5, crisisChange: 0 },
      { text: 'Ignorar a imprensa e focar na equipe médica', nextSceneId: 'medical_team_meeting', clueId: 'river_clue', reputationChange: 5 },
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  data_analysis_first: {
    id: 'data_analysis_first',
    title: 'PADRÕES NOS DADOS',
    newsTicker: 'ESTATÍSTICA: AUMENTO DE 300% NA PRESCRIÇÃO DE ANTIBIÓTICOS',
    text: 'Do seu escritório, você cruza dados. Não é só no hospital. As farmácias locais reportaram um aumento massivo na venda de antibióticos sem receita adequada nos últimos meses. Além disso, há um pico de mortalidade de peixes no Rio das Pedras reportado por pescadores. As peças começam a se encaixar.',
    choices: [
      { text: 'Ir ao Rio das Pedras investigar a mortalidade de peixes', nextSceneId: 'river_investigation', clueId: 'dead_fish', knowledgeGain: 1 },
      { text: 'Investigar as farmácias e a automedicação', nextSceneId: 'pharmacy_investigation', clueId: 'overprescription', knowledgeGain: 1 },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  media_transparency: {
    id: 'media_transparency',
    title: 'A MANCHETE',
    newsTicker: 'CAPA: "MÉDICA CONFIRMA AMEAÇA, MAS PEDE CALMA"',
    text: 'Sua fala sai nos jornais. O público fica alarmado, mas confia em você. Mariana, a jornalista, agradece a honestidade e oferece uma informação: "Minha fonte diz que a Estação de Tratamento de Esgoto está desligando os filtros à noite para economizar energia. Verifique."',
    choices: [
      { text: 'Investigar a denúncia na Estação de Tratamento', nextSceneId: 'sewage_plant', clueId: 'corruption_sewage', reputationChange: 10 },
      { text: 'Seguir o protocolo e focar no paciente zero (Rio das Pedras)', nextSceneId: 'river_investigation', reputationChange: 0 },
    ],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  media_block: {
    id: 'media_block',
    title: 'RUMORES E PÂNICO',
    newsTicker: 'RUMOR: "GOVERNO ESCONDE DOENÇA MORTAL", DIZEM REDES SOCIAIS',
    text: 'Seu silêncio gerou especulação. Fake news sobre "vírus alienígenas" começam a circular. As pessoas estão correndo para as farmácias estocar antibióticos, piorando a resistência. Você precisa conter os danos.',
    choices: [
      { text: 'Investigar a origem desses rumores nas redes sociais', nextSceneId: 'social_media_crisis', clueId: 'fake_news', crisisChange: 5 },
      { text: 'Ignorar a mídia e seguir investigando o Rio', nextSceneId: 'river_investigation', crisisChange: 15 },
    ],
    image: 'https://images.unsplash.com/photo-1585842378054-ee0132f8133a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  medical_team_meeting: {
    id: 'medical_team_meeting',
    title: 'REUNIÃO CLÍNICA',
    newsTicker: 'HOSPITAL: EQUIPE MÉDICA DIVIDIDA SOBRE TRATAMENTO',
    text: 'Na sala de reuniões, o Dr. Carlos confessa: "Temos prescrito antibióticos de amplo espectro para qualquer febre. Os pacientes exigem, a direção pressiona por altas rápidas." Você percebe que o hospital é parte do problema. É o "Stewardship" (Gerenciamento) que falhou.',
    choices: [
      { text: 'Impor protocolo rígido de restrição de antibióticos', nextSceneId: 'hospital_stewardship', knowledgeGain: 1, reputationChange: -5 },
      { text: 'Investigar a origem externa (Rio das Pedras)', nextSceneId: 'river_investigation', clueId: 'river_clue' },
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-217358c7e618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  river_investigation: {
    id: 'river_investigation',
    title: 'O RIO MORTO',
    newsTicker: 'AMBIENTE: PESCADORES ENCONTRAM PEIXES COM DEFORMAÇÕES',
    text: 'O cheiro no Rio das Pedras é químico. Você coleta amostras. A análise preliminar é assustadora: não há apenas bactérias, há resíduos de Ciprofloxacina e Tetraciclina na água. Níveis industriais. O rio corre atrás de uma grande Fazenda de Suínos e da Indústria Farmacêutica "VitaNova".',
    choices: [
      { text: 'Inspecionar a Fazenda de Suínos', nextSceneId: 'farm_inspection', clueId: 'agro_waste', reputationChange: 0 },
      { text: 'Inspecionar a Indústria VitaNova', nextSceneId: 'pharma_inspection', clueId: 'industrial_waste', reputationChange: 0 },
    ],
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  farm_inspection: {
    id: 'farm_inspection',
    title: 'A FÁBRICA DE CARNE',
    newsTicker: 'ECONOMIA: PREÇO DA CARNE PODE SUBIR COM NOVAS REGRAS',
    text: 'O dono da fazenda, Sr. Braga, barra sua entrada. "Meus animais são saudáveis! Uso antibióticos na ração para prevenir doenças, como todos fazem. É legalizado!" Ele admite usar doses subterapêuticas para engorda, um motor clássico de resistência. O estrume vai direto para o solo, lixiviando para o rio.',
    choices: [
      { text: 'Ameaçar fechar a fazenda com a Vigilância Sanitária', nextSceneId: 'farm_conflict', reputationChange: -5, crisisChange: 5 },
      { text: 'Tentar educar: "Seus animais vão morrer se as bactérias vencerem"', nextSceneId: 'farm_education', knowledgeGain: 1, reputationChange: 10 },
    ],
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  pharma_inspection: {
    id: 'pharma_inspection',
    title: 'O SEGREDO INDUSTRIAL',
    newsTicker: 'MERCADO: AÇÕES DA VITANOVA CAEM APÓS RUMORES',
    text: 'Na VitaNova, o gerente é hostil. Mas você nota tubos de descarte indo para o rio sem o tratamento terciário necessário. Eles estão produzindo antibióticos e jogando o "lixo" ativo na água, treinando as bactérias do rio a serem imortais.',
    choices: [
      { text: 'Coletar amostras escondido e denunciar', nextSceneId: 'legal_battle', clueId: 'pharma_crime', reputationChange: 10 },
      { text: 'Confrontar o gerente exigindo paralisia imediata', nextSceneId: 'bribe_attempt', crisisChange: 0 },
    ],
    image: 'https://images.unsplash.com/photo-1565631188357-128d223c21c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  bribe_attempt: {
    id: 'bribe_attempt',
    title: 'A PROPOSTA INDECENTE',
    newsTicker: 'BASTIDORES: INDÚSTRIA NEGA IRREGULARIDADES',
    text: 'O gerente sorri e coloca uma maleta na mesa. "Dra. Sofia, isso é um mal-entendido. Podemos doar equipamentos novos para o seu hospital. A cidade precisa dos nossos empregos. Esqueça o rio."',
    choices: [
      { text: 'Recusar e sair furiosa para a imprensa', nextSceneId: 'whistleblower', reputationChange: 20, crisisChange: -5 },
      { text: 'Aceitar a doação para o hospital (Fim da investigação)', nextSceneId: 'game_over_corruption', isGameOverChoice: true, gameOverReason: 'Você vendeu sua integridade. O hospital tem equipamentos novos, mas as bactérias continuaram a evoluir no rio. A pandemia estourou meses depois.' },
    ],
    image: 'https://images.unsplash.com/photo-1555371694-81d09e530638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  farm_education: {
    id: 'farm_education',
    title: 'A VIRADA NO CAMPO',
    newsTicker: 'RURAL: FAZENDA MODELO ADOTA BIOSSEGURIDADE',
    text: 'Sr. Braga ouve. Você explica que a superbactéria pode matar os netos dele que nadam no rio. O argumento emocional funciona. Ele concorda em parar o uso preventivo e compostar o estrume corretamente. Mas ele avisa: "O Prefeito Gouveia não vai gostar. Ele quer produção máxima."',
    choices: [
      { text: 'Ir ao Gabinete do Prefeito com as provas', nextSceneId: 'mayor_office', clueId: 'political_pressure', reputationChange: 5 },
      { text: 'Voltar ao laboratório para confirmar se a água melhorou', nextSceneId: 'lab_confirmation', knowledgeGain: 1 },
    ],
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  mayor_office: {
    id: 'mayor_office',
    title: 'O GABINETE DO PREFEITO',
    newsTicker: 'POLÍTICA: PREFEITO GOUVEIA PRESSIONADO POR CRISE DE SAÚDE',
    text: 'Prefeito Gouveia está suando. "Dra., fechar a VitaNova ou multar as fazendas vai quebrar a cidade! Não podemos resolver isso discretamente? Vacine o gado, dê remédio ao povo, mas não pare a economia!"',
    choices: [
      { text: 'Bater na mesa: "Sem saúde não há economia!"', nextSceneId: 'mayor_convince', reputationChange: 10, crisisChange: -5 },
      { 
        text: 'Aceitar um meio-termo: Medidas educativas apenas', 
        nextSceneId: 'soft_measures', 
        crisisChange: 10, 
        reputationChange: -5,
        isGameOverChoice: true,
        gameOverReason: 'Você tentou agradar a política e esqueceu a ciência. A biologia não negocia.'
      },
    ],
    image: 'https://images.unsplash.com/photo-1529104661501-58711d9546e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  whistleblower: {
    id: 'whistleblower',
    title: 'A DENÚNCIA',
    newsTicker: 'ESCÂNDALO: FÁBRICA DE REMÉDIOS ACUSADA DE CRIME AMBIENTAL',
    text: 'Você entrega tudo para Mariana, a jornalista. A matéria explode. A população cerca a fábrica. A pressão força o Ministério Público a intervir. A VitaNova é lacrada temporariamente para adequação.',
    choices: [
      { text: 'Aproveitar o momento para criar um Plano Municipal One Health', nextSceneId: 'final_victory', reputationChange: 20, crisisChange: -20 },
    ],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  mayor_convince: {
    id: 'mayor_convince',
    title: 'AÇÃO POLÍTICA',
    newsTicker: 'DECISÃO: PREFEITURA DECRETA EMERGÊNCIA SANITÁRIA',
    text: 'Gouveia entende que uma epidemia seria pior para sua reeleição do que a queda na produção. Ele assina o decreto. Fiscalização rigorosa nas fazendas, multas para a indústria e verba para saneamento básico. É uma vitória política e científica.',
    choices: [
      { text: 'Monitorar a implementação das medidas', nextSceneId: 'final_victory', reputationChange: 15, crisisChange: -15 },
    ],
    image: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  soft_measures: {
    id: 'soft_measures',
    title: 'MEDIDAS TÍMIDAS',
    newsTicker: 'CRÍTICA: ESPECIALISTAS DIZEM QUE AÇÃO DO GOVERNO É INSUFICIENTE',
    text: 'Você cedeu à pressão econômica. Apenas panfletos foram distribuídos. A contaminação no rio continuou. Semanas depois, o surto explodiu novamente, desta vez com uma cepa resistente a tudo.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1535129618035-7729f860538a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  sewage_plant: {
    id: 'sewage_plant',
    title: 'ESGOTO A CÉU ABERTO',
    newsTicker: 'SANEAMENTO: FALHAS NO TRATAMENTO EXPÕEM POPULAÇÃO',
    text: 'Na estação de tratamento, você flagra os operadores desviando esgoto bruto para o rio. "Ordem de cima para cortar custos", diz um funcionário. Bactérias humanas ricas em plasmídeos de resistência estão se misturando com bactérias ambientais. Um reator biológico de superbactérias.',
    choices: [
      { text: 'Denunciar ao Ministério Público', nextSceneId: 'whistleblower', reputationChange: 15 },
      { text: 'Exigir correção imediata sob ameaça de escândalo', nextSceneId: 'mayor_office', crisisChange: -5 },
    ],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  pharmacy_investigation: {
    id: 'pharmacy_investigation',
    title: 'O MERCADO NEGRO',
    newsTicker: 'FISCALIZAÇÃO: FARMÁCIAS VENDEM TARJA PRETA LIVREMENTE',
    text: 'Você entra em farmácias de bairro como cliente oculta. Consegue comprar Azitromicina e Amoxicilina sem receita em 3 de 5 tentativas. Os balconistas vendem livremente. Mas o que mais te choca é o motivo: "Vi no Zap que previne", diz um cliente.',
    choices: [
      { text: 'Investigar a fonte dessas "notícias" nas redes', nextSceneId: 'social_media_crisis', clueId: 'fake_news', crisisChange: 5 },
      { text: 'Organizar blitz imediata com o Conselho de Farmácia', nextSceneId: 'pharmacy_blitz', reputationChange: 10, crisisChange: -5 },
    ],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  social_media_crisis: {
    id: 'social_media_crisis',
    title: 'A PANDEMIA DIGITAL',
    newsTicker: 'TRENDING: #AntibioticoLivre CHEGA AOS TOP TRENDS',
    text: 'Você rastreia a desinformação. Um influenciador chamado "Guru Vital", com milhões de seguidores, postou um vídeo viral: "Médicos escondem que antibióticos fortes curam tudo! Previnam-se já!". Milhares de pessoas saudáveis estão se automedicando preventivamente, o que é o cenário perfeito para criar resistência.',
    choices: [
      { text: 'Desmentir publicamente com dados técnicos (Nota Oficial)', nextSceneId: 'debunking_technical', knowledgeGain: 1, reputationChange: 5 },
      { text: 'Convidar o influencer para visitar a UTI (Choque de Realidade)', nextSceneId: 'influencer_shock', reputationChange: 15, crisisChange: -10 },
      { text: 'Tentar derrubar o perfil dele judicialmente', nextSceneId: 'censorship_backlash', crisisChange: 10, reputationChange: -10 },
    ],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  debunking_technical: {
    id: 'debunking_technical',
    title: 'A GUERRA DE NARRATIVAS',
    newsTicker: 'REDE: NOTA DA AGÊNCIA DE SAÚDE TEM BAIXO ENGAJAMENTO',
    text: 'Você emite uma nota técnica impecável. Infelizmente, a verdade é chata e o algoritmo prefere polêmica. Poucas pessoas leem. O vídeo do Guru continua no ar, mas você pelo menos garantiu o registro oficial.',
    choices: [
      { text: 'Voltar a focar na fiscalização física das farmácias', nextSceneId: 'pharmacy_blitz', reputationChange: 0 },
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  influencer_shock: {
    id: 'influencer_shock',
    title: 'O CHOQUE DE REALIDADE',
    newsTicker: 'VIRAL: GURU VITAL PEDE DESCULPAS CHORANDO EM LIVE',
    text: 'Você leva o Guru Vital à UTI Neonatal, onde bebês lutam contra a superbactéria. Ele vê o sofrimento real causado pela irresponsabilidade. Abalado, ele faz uma live de retratação, explicando o perigo da automedicação para seus milhões de fãs. A demanda por antibióticos despenca na hora.',
    choices: [
      { text: 'Aproveitar a queda na demanda para fiscalizar as farmácias', nextSceneId: 'pharmacy_blitz', reputationChange: 10, crisisChange: -10 },
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  censorship_backlash: {
    id: 'censorship_backlash',
    title: 'O EFEITO STREISAND',
    newsTicker: 'POLÊMICA: "DITADURA SANITÁRIA" VIRA ASSUNTO DO MOMENTO',
    text: 'Você conseguiu uma liminar para derrubar o vídeo. O público reagiu com fúria, gritando "Censura!". O vídeo foi re-upado milhares de vezes. O Guru virou um mártir da liberdade de expressão e seus conselhos perigosos ganharam ainda mais força.',
    choices: [
      { text: 'Tentar conter danos com blitz nas farmácias', nextSceneId: 'pharmacy_blitz', reputationChange: -10, crisisChange: 10 },
    ],
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  pharmacy_blitz: {
    id: 'pharmacy_blitz',
    title: 'OPERAÇÃO TARJA PRETA',
    newsTicker: 'POLÍCIA: FARMÁCIAS MULTADAS POR VENDA ILEGAL',
    text: 'A operação é um sucesso. Multas pesadas. A mensagem é clara: antibiótico é coisa séria. O acesso irrestrito é cortado na cidade. A taxa de resistência comunitária começa a cair lentamente.',
    choices: [
      { text: 'Voltar a investigar a origem ambiental (Rio)', nextSceneId: 'river_investigation', reputationChange: 5 },
    ],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  lab_confirmation: {
    id: 'lab_confirmation',
    title: 'DADOS CONFIRMADOS',
    newsTicker: 'CIÊNCIA: NÍVEIS DE CONTAMINAÇÃO NO RIO CAEM APÓS AÇÕES',
    text: 'As novas amostras mostram uma queda drástica na carga bacteriana e de antibióticos no rio após as mudanças na fazenda. A prova de conceito está feita: intervir no ambiente salva vidas no hospital.',
    choices: [
      { text: 'Apresentar o modelo de sucesso na Cúpula Global', nextSceneId: 'global_collaboration_summit', reputationChange: 10 },
    ],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  final_victory: {
    id: 'final_victory',
    title: 'O LEGADO DE SOFIA',
    newsTicker: 'ESPECIAL: CIDADE SE TORNA MODELO MUNDIAL EM ONE HEALTH',
    text: 'A crise foi contida. Não por uma pílula mágica, mas por conexões. Você ligou a saúde do rio à saúde da criança. O fazendeiro, o médico, o prefeito e o farmacêutico agora trabalham juntos. A "pandemia silenciosa" recuou, por enquanto. Você provou que a saúde é uma só.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1616010547051-5743454b5250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  game_over_inaction: {
    id: 'game_over_inaction',
    title: 'FIM DE JOGO: O RELÓGIO PAROU',
    newsTicker: 'OBITUÁRIO: NÚMERO DE VÍTIMAS PASSA DE MIL',
    text: 'Sua hesitação custou caro. Enquanto você esperava dados perfeitos, a bactéria se espalhou por escolas e lares. O hospital colapsou. A cidade está em lockdown, mas a bactéria já está em todo lugar.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1588691880993-9c5950a7f111?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  game_over_corruption: {
    id: 'game_over_corruption',
    title: 'FIM DE JOGO: O PREÇO DO SILÊNCIO',
    newsTicker: 'DENÚNCIA: DIRETORA ACUSADA DE RECEBER PROPINA',
    text: 'Você aceitou os equipamentos. O hospital ficou moderno, mas cheio de pacientes que não conseguia curar. Meses depois, a verdade sobre o rio vazou. Sua carreira acabou, e a resistência se tornou endêmica na região.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1555371694-81d09e530638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  game_over_crisis: {
    id: 'game_over_crisis',
    title: 'FIM DE JOGO: CAOS SOCIAL',
    newsTicker: 'ANARQUIA: PROTESTOS VIOLENTOS POR FALTA DE REMÉDIOS',
    text: 'A crise saiu de controle. A falta de transparência e ações efetivas gerou pânico. Saques a farmácias, hospitais depredados. A ciência perdeu para o medo.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1606869032488-b2a6324d45d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  game_over_reputation: {
    id: 'game_over_reputation',
    title: 'FIM DE JOGO: DESCRÉDITO TOTAL',
    newsTicker: 'DEMISSÃO: DRA. SOFIA AFASTADA DO CARGO',
    text: 'Ninguém mais ouve você. Suas decisões impopulares e falta de tato político isolaram sua agência. Sem apoio público ou político, você não consegue implementar nenhuma medida de One Health.',
    choices: [],
    image: 'https://images.unsplash.com/photo-1544070211-5f21051df4b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  global_collaboration_summit: {
     id: 'global_collaboration_summit',
     title: 'RECONHECIMENTO INTERNACIONAL',
     newsTicker: 'OMS: MODELO BRASILEIRO SERÁ EXPORTADO',
     text: 'O mundo olha para o seu sucesso. Não foi fácil, mas você mostrou que enfrentar a indústria, educar o campo e controlar o hospital simultaneamente é possível. É o One Health na prática.',
     choices: [
         { text: 'Finalizar missão', nextSceneId: 'final_victory' }
     ],
     image: 'https://images.unsplash.com/photo-1563207172-e1d8a4e8d3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  // Add other scenes referenced in choices like hospital_stewardship, farm_conflict, legal_battle, political_friction_start, etc.
  political_friction_start: {
    id: 'political_friction_start',
    title: 'A IRA POLÍTICA',
    newsTicker: 'GOVERNO: SECRETÁRIO DE SAÚDE CHAMA PEDIDO DE QUARENTENA DE "ALARMISMO"',
    text: 'Sua ligação enfurece o Secretário. "Doutora, você tem ideia do pânico e do prejuízo que uma quarentena causaria sem provas concretas? Siga o protocolo!" Sua reputação com o governo está abalada desde o início.',
    choices: [
      { text: 'Recuar e ir ao hospital analisar os fatos', nextSceneId: 'hospital_arrival' }
    ],
    image: 'https://images.unsplash.com/photo-1529104661501-58711d9546e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  hospital_stewardship: {
    id: 'hospital_stewardship',
    title: 'ORDEM NO CAOS',
    newsTicker: 'SAÚDE: HOSPITAL ADOTA NOVO PROTOCOLO RÍGIDO DE ANTIMICROBIANOS',
    text: 'O novo protocolo é impopular. Alguns médicos reclamam da "burocracia". Mas em 48h, o consumo de antibióticos de amplo espectro cai 60%. A pressão seletiva dentro do hospital diminui drasticamente.',
    choices: [
      { text: 'Agora, investigar a fonte externa da infecção (Rio)', nextSceneId: 'river_investigation', crisisChange: -10 }
    ],
    image: 'https://images.unsplash.com/photo-1580281657691-d102d5a37655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  farm_conflict: {
    id: 'farm_conflict',
    title: 'CONFRONTO NA FAZENDA',
    newsTicker: 'AGRONEGÓCIO: PRODUTORES PROTESTAM CONTRA "INTERFERÊNCIA"',
    text: 'A Vigilância Sanitária chega com você. A tensão é alta. A fazenda é interditada preventivamente. A notícia se espalha e outros produtores, com medo, bloqueiam a estrada. Você virou inimiga do agronegócio local.',
    choices: [
      { text: 'Tentar negociar com os manifestantes', nextSceneId: 'mayor_office', reputationChange: -10, crisisChange: 5 }
    ],
    image: 'https://images.unsplash.com/photo-1590187422591-3143c6604a3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  legal_battle: {
    id: 'legal_battle',
    title: 'GUERRA JURÍDICA',
    newsTicker: 'JUSTIÇA: PROVAS APONTAM CRIME AMBIENTAL EM INDÚSTRIA FARMACÊUTICA',
    text: 'Sua denúncia, baseada nas amostras, dá início a uma investigação federal. A VitaNova contra-ataca com os melhores advogados, acusando você de espionagem industrial. A batalha será longa, mas você iniciou o processo para responsabilizá-los.',
    choices: [
      { text: 'Focar em outras frentes enquanto a justiça age', nextSceneId: 'mayor_office', reputationChange: 5 }
    ],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
};


export const RpgGameView: React.FC = () => {
  const [currentSceneId, setCurrentSceneId] = useState('intro');
  const [clues, setClues] = useState<Clue[]>([]);
  const [knowledgeGained, setKnowledgeGained] = useState(0);
  const [crisisLevel, setCrisisLevel] = useState(10); 
  const [reputation, setReputation] = useState(100);   
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [playerWon, setPlayerWon] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const currentScene = scenes[currentSceneId] || scenes['intro'];

  const handleChoice = (choice: Choice) => {
    if (isGameOver || playerWon) return; 

    // Apply effects
    let nextCrisis = crisisLevel + (choice.crisisChange || 0);
    let nextReputation = reputation + (choice.reputationChange || 0);

    setCrisisLevel(Math.max(0, Math.min(100, nextCrisis)));
    setReputation(Math.max(0, Math.min(100, nextReputation)));

    if (choice.clueId && !clues.some(c => c.id === choice.clueId)) {
        setClues(prev => [...prev, { id: choice.clueId, name: choice.clueId.replace(/_/g, ' '), description: `Pista: ${choice.clueId.replace(/_/g, ' ')}` }]);
    }
    if (choice.knowledgeGain) {
      setKnowledgeGained(prev => prev + choice.knowledgeGain!);
    }
    
    // Check for immediate game over from choice
    if (choice.isGameOverChoice) {
      const gameOverScene = scenes[choice.nextSceneId!] || scenes.game_over_crisis;
      setIsGameOver(true);
      setGameOverMessage(choice.gameOverReason || gameOverScene.text);
      setCurrentSceneId(choice.nextSceneId!);
      return;
    }
    
    // Check for game over from stats *after* applying changes
    if (nextCrisis >= 100) {
        setIsGameOver(true);
        setGameOverMessage(scenes.game_over_crisis.text);
        setCurrentSceneId('game_over_crisis');
        return;
    }
    if (nextReputation <= 0) {
        setIsGameOver(true);
        setGameOverMessage(scenes.game_over_reputation.text);
        setCurrentSceneId('game_over_reputation');
        return;
    }

    // Navigate to next scene
    if (choice.nextSceneId) {
      setCurrentSceneId(choice.nextSceneId);
    } else {
      setIsGameOver(true);
      setGameOverMessage('Erro de roteiro: Caminho sem saída.');
      setCurrentSceneId('game_over_crisis');
    }
  };

  // Check victory condition
  React.useEffect(() => {
    if (currentSceneId === 'final_victory' && !isGameOver) {
      setPlayerWon(true);
      if (clues.length >= 3 && crisisLevel < 30 && reputation > 70) {
        setWinMessage('Vitória Lendária! Você não apenas conteve o surto, mas mudou a cultura da cidade para sempre.');
      } else {
        setWinMessage('Vitória Tática. O surto parou, mas as tensões políticas e sociais permanecem altas.');
      }
    }
  }, [currentSceneId, isGameOver, clues.length, crisisLevel, reputation]);

  const restartGame = () => {
    setCurrentSceneId('intro');
    setClues([]);
    setKnowledgeGained(0);
    setCrisisLevel(10);
    setReputation(100);
    setIsGameOver(false);
    setGameOverMessage('');
    setPlayerWon(false);
    setWinMessage('');
  };

  const renderGameEndScreen = (isWin: boolean) => (
    <div className="text-center p-8 bg-white/90 rounded-2xl shadow-xl border border-slate-200">
      {isWin ? (
        <>
          <CheckCircle2 size={60} className="text-brand-600 mx-auto mb-4 animate-bounce" />
          <h3 className="text-3xl font-bold text-slate-900 mb-2">Vitória!</h3>
          <p className="text-slate-700 mb-6">{winMessage}</p>
        </>
      ) : (
        <>
          <Frown size={60} className="text-red-500 mx-auto mb-4 animate-pulse" />
          <h3 className="text-3xl font-bold text-slate-900 mb-2">Fim de Jogo!</h3>
          <p className="text-slate-700 mb-6">{gameOverMessage}</p>
        </>
      )}
      <button
        onClick={restartGame}
        className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors"
      >
        <RefreshCw className="mr-2" size={20} />
        Tentar Novamente
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in font-sans">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Status Bars */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Crise RAM (Pânico/Doença)</span>
              <span className={crisisLevel > 70 ? 'text-red-600 animate-pulse' : 'text-slate-800'}>{Math.round(crisisLevel)}%</span>
            </div>
            <div className="w-full bg-red-100 rounded-full h-2">
              <div className={`h-full rounded-full transition-all duration-300 ${crisisLevel > 70 ? 'bg-red-600' : 'bg-orange-400'}`} style={{ width: `${crisisLevel}%` }}></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Reputação (Apoio Político/Social)</span>
              <span className={reputation < 30 ? 'text-red-600 animate-pulse' : 'text-slate-800'}>{Math.round(reputation)}%</span>
            </div>
            <div className="w-full bg-brand-100 rounded-full h-2">
              <div className={`h-full rounded-full transition-all duration-300 ${reputation < 30 ? 'bg-red-600' : 'bg-blue-500'}`} style={{ width: `${reputation}%` }}></div>
            </div>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center border-b-4 border-slate-800 shadow-inner overflow-hidden">
           <div className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded mr-3 animate-pulse shrink-0 flex items-center gap-1">
              <Radio size={12} /> AO VIVO
           </div>
           <div className="overflow-hidden whitespace-nowrap w-full">
              <p className="font-mono text-sm font-bold text-cyan-400 animate-[marquee_15s_linear_infinite] inline-block">{currentScene.newsTicker || "AGÊNCIA DE VIGILÂNCIA SANITÁRIA MONITORANDO..."}</p>
           </div>
        </div>

        {/* Scene Image (Reduced Height) */}
        {currentScene.image && (
          <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${currentScene.image})` }}>
            <div className="w-full h-full bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-5">
          <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3 mt-[-40px] relative z-10 text-white bg-slate-900/50 backdrop-blur-sm p-3 rounded-t-lg">
            <ScrollText size={28} />
            {currentScene.title}
          </h2>
          
          <div className="h-1 w-20 bg-brand-500 rounded-full mb-6"></div>

          {(isGameOver || playerWon) ? (
            renderGameEndScreen(playerWon)
          ) : (
            <>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium border-l-4 border-slate-200 pl-4">
                {currentScene.text}
              </p>
              
              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Decisões Disponíveis:</h3>
                {currentScene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-brand-50 hover:border-brand-300 hover:shadow-md text-slate-800 font-medium transition-all duration-200 flex items-center justify-between group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-1 bg-brand-500 transition-all duration-300 -translate-x-full group-hover:translate-x-0"></div>
                    <span className="relative z-10 pl-2">{choice.text}</span>
                    <ArrowRight size={20} className="text-slate-300 group-hover:text-brand-600 transition-colors relative z-10" />
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
              <Microscope size={14} /> Pistas Coletadas: <span className="font-bold text-slate-900">{clues.length}</span>
            </div>
            {clues.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {clues.map(c => (
                        <span key={c.id} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded border border-yellow-200 text-[10px] font-bold uppercase">{c.name}</span>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
