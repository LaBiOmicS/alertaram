
export interface ActionPlanItem {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Human' | 'Animal' | 'Environment';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  LEARN = 'LEARN',
  ACT = 'ACT',
  GAME = 'GAME',
  RPG_GAME = 'RPG_GAME',
  PROFESSIONAL_IMPACT = 'PROFESSIONAL_IMPACT',
  DISPOSAL_EDUCATION = 'DISPOSAL_EDUCATION',
  CHATBOT = 'CHATBOT'
}

export interface GameState {
  score: number;
  infectionLevel: number; // 0-100
  resistanceLevel: number; // 0-100
  isPlaying: boolean;
  gameOver: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// RPG Game Types
export interface Choice {
  text: string;
  nextSceneId?: string;
  clueId?: string;
  knowledgeGain?: number;
  crisisChange?: number;
  reputationChange?: number;
  isGameOverChoice?: boolean;
  gameOverReason?: string;
}

export interface Scene {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
  image?: string;
  newsTicker?: string; // Headline news related to the scene
}

export interface Clue {
  id: string;
  name: string;
  description: string;
}