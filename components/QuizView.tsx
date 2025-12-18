import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "O que acontece se eu parar de tomar o antibiótico assim que me sentir melhor?",
    options: [
      "Eu economizo remédio para a próxima vez.",
      "As bactérias mais fortes podem sobreviver e se tornar resistentes.",
      "Não acontece nada, estou curado.",
      "O remédio faz mal se tomar por muito tempo."
    ],
    correctAnswer: 1,
    explanation: "Parar o tratamento antes da hora mata apenas as bactérias fracas, deixando as fortes vivas para se multiplicarem."
  },
  {
    id: 2,
    question: "Antibióticos servem para tratar gripe e resfriado?",
    options: [
      "Sim, sempre funcionam.",
      "Apenas se a febre for muito alta.",
      "Não, pois gripe é causada por vírus e antibióticos matam bactérias.",
      "Sim, mas precisa ser uma dose forte."
    ],
    correctAnswer: 2,
    explanation: "Antibióticos combatem BACTÉRIAS. Gripe e resfriado são causados por VÍRUS. Usar antibiótico para vírus não ajuda e cria resistência."
  },
  {
    id: 3,
    question: "Qual a maneira correta de descartar medicamentos vencidos?",
    options: [
      "Jogar no lixo comum da cozinha.",
      "Jogar no vaso sanitário e dar descarga.",
      "Queimar no quintal.",
      "Levar a uma farmácia ou posto de coleta."
    ],
    correctAnswer: 3,
    explanation: "Jogar no lixo ou esgoto contamina o solo e a água, afetando animais e voltando para nós. O correto é a logística reversa (farmácias)."
  },
  {
    id: 4,
    question: "No conceito One Health (Saúde Única), quem está conectado?",
    options: [
      "Apenas médicos e pacientes.",
      "Saúde Humana, Saúde Animal e Meio Ambiente.",
      "Hospitais e Farmácias.",
      "Humanos e seus animais de estimação apenas."
    ],
    correctAnswer: 1,
    explanation: "One Health reconhece que a saúde das pessoas, dos animais e dos ecossistemas estão interligadas indissociavelmente."
  },
  {
    id: 5,
    question: "O que é uma 'superbactéria'?",
    options: [
      "Uma bactéria gigante visível a olho nu.",
      "Uma bactéria benéfica para o intestino.",
      "Uma bactéria que se tornou resistente a vários tipos de antibióticos.",
      "Uma bactéria criada em laboratório."
    ],
    correctAnswer: 2,
    explanation: "Superbactérias são aquelas que sofreram mutações e não morrem mais com os antibióticos comuns, tornando o tratamento muito difícil."
  }
];

export const QuizView: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in text-center">
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="text-brand-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Finalizado!</h2>
          <p className="text-xl text-slate-600 mb-8">
            Você acertou <span className="font-bold text-brand-600">{score}</span> de <span className="font-bold text-brand-600">{questions.length}</span> questões.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="font-bold text-slate-800 mb-2">Mensagem Final:</h3>
            <p className="text-slate-600">
              {score === questions.length 
                ? "Parabéns! Você é um verdadeiro guardião da Saúde Única. Compartilhe esse conhecimento!" 
                : "Muito bem! Você aprendeu conceitos importantes. Continue explorando o app para saber mais."}
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors"
          >
            <RefreshCw className="mr-2" size={20} />
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Questão {currentQuestion + 1} de {questions.length}</span>
          <span>Acertos: {score}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-brand-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
              
              if (showExplanation) {
                if (idx === question.correctAnswer) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (idx === selectedOption) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-slate-100 text-slate-400 opacity-50";
                }
              } else {
                btnClass += "border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && idx === question.correctAnswer && <CheckCircle2 className="text-green-600" />}
                    {showExplanation && idx === selectedOption && idx !== question.correctAnswer && <XCircle className="text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100 animate-fade-in">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center">
              Explicação:
            </h4>
            <p className="text-slate-700 mb-6">{question.explanation}</p>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
            >
              {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};