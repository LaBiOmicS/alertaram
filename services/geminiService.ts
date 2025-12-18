
import { GoogleGenAI, Type } from "@google/genai";
import { ActionPlanItem } from '../types';

// A inicialização do cliente foi removida daqui para evitar erros no carregamento inicial.

const modelId = "gemini-3-flash-preview";

const getAiClient = () => {
  // Esta função garante que a chave da API seja lida apenas quando necessário.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY não encontrada. Configure a variável de ambiente.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePersonalizedPlan = async (
  profile: string,
  lifestyle: string
): Promise<ActionPlanItem[]> => {
  const prompt = `
    Você é um especialista em Saúde Única (One Health) e Resistência Antimicrobiana (RAM).
    Gere 5 ações práticas, simples e impactantes para uma pessoa com o perfil: "${profile}" e interesse principal: "${lifestyle}".
    O foco é prevenir a resistência antimicrobiana.
    As categorias devem ser relacionadas a Saúde Humana, Saúde Animal ou Meio Ambiente.
    Mantenha a linguagem simples e acessível para leigos.

    **REGRAS IMPORTANTES:**
    1.  Se o interesse for "querendo entender a ciência por trás das ações para compartilhar conhecimento", a descrição de CADA ação DEVE OBRIGATORIAMIAMENTE incluir uma seção clara chamada "**Explicação Científica:**" que detalha o mecanismo biológico ou epidemiológico por trás da recomendação de forma simples e direta.
    2.  Adapte o tom e o conteúdo da descrição para refletir o perfil e o interesse. Não gere respostas genéricas.
    3.  O resultado deve ser um JSON Array válido.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Título curto da ação (ex: Lave as mãos)" },
        description: { type: Type.STRING, description: "Explicação de 1-2 frases do porquê e como fazer, incluindo a explicação científica se o interesse for 'ciencia'." },
        impact: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Nível de impacto dessa ação." },
        category: { type: Type.STRING, enum: ["Human", "Animal", "Environment"], description: "Qual pilar do One Health essa ação toca." }
      },
      required: ["title", "description", "impact", "category"]
    }
  };

  try {
    const ai = getAiClient(); // Inicializa o cliente aqui
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as ActionPlanItem[];
  } catch (error) {
    console.error("Error generating plan:", error);
    throw new Error("Não foi possível gerar o plano. Tente novamente.");
  }
};

export const sendChatMessage = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = getAiClient(); // Inicializa o cliente aqui
    const chat = ai.chats.create({
      model: modelId,
      history: history,
      config: {
        systemInstruction: `
          Você é o 'Guardião da Saúde', um assistente virtual educativo focado em ensinar sobre Resistência Antimicrobiana (RAM) e Saúde Única (One Health).
          
          Regras:
          1. Use linguagem simples, empática e livre de jargões técnicos complexos.
          2. Explique como a saúde humana, animal e ambiental estão conectadas.
          3. Cite os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, especialmente ODS 3 (Saúde e Bem-estar), quando relevante.
          4. NUNCA dê diagnósticos médicos. Se o usuário relatar sintomas, oriente a procurar um médico imediatamente.
          5. Seja positivo e focado em soluções que o indivíduo pode fazer.
          6. Mantenha respostas concisas (máximo 150 palavras por turno, a menos que pedido mais detalhes).
        `,
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, não consegui processar sua resposta.";
  } catch (error) {
    console.error("Chat error:", error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
      return "A chave da API não foi configurada corretamente. Por favor, verifique as configurações do ambiente.";
    }
    return "Estou com dificuldades de conexão no momento. Por favor, tente novamente em instantes.";
  }
};