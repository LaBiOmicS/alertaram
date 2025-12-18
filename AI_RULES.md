# Regras de Desenvolvimento para Dyad (AI Editor)

Este documento descreve a stack tecnológica e as regras de uso de bibliotecas para garantir a consistência e a manutenibilidade do projeto Alerta RAM.

## 1. Stack Tecnológico

*   **Framework:** React (utilizando componentes funcionais e hooks).
*   **Linguagem:** TypeScript (obrigatório para todos os arquivos de código-fonte).
*   **Estilização:** Tailwind CSS (utilizando classes utilitárias para todos os aspectos de design).
*   **Componentes UI:** shadcn/ui (preferencialmente) ou componentes customizados seguindo o padrão de design minimalista e moderno.
*   **Ícones:** `lucide-react`.
*   **Navegação:** Gerenciamento de estado local (`useState`) utilizando o enum `ViewState` para a troca de telas (não utilizar React Router).
*   **Estrutura de Arquivos:** Componentes e Views devem ser colocados em `src/components/`.
*   **AI/Backend:** Google GenAI SDK (`@google/genai`) para todas as interações de IA, encapsuladas em `services/geminiService.ts`.
*   **Build Tool:** Vite.

## 2. Regras de Uso de Bibliotecas

| Tarefa | Biblioteca/Ferramenta | Regra de Uso |
| :--- | :--- | :--- |
| **Estilização** | Tailwind CSS | Use classes utilitárias. Designs devem ser responsivos por padrão. |
| **Componentes** | shadcn/ui | Use componentes pré-existentes ou crie novos seguindo o padrão de design. Mantenha componentes pequenos e focados (máximo 100 linhas). |
| **Ícones** | `lucide-react` | Única fonte de ícones permitida. |
| **Navegação** | `ViewState` enum | Use o sistema de navegação baseado em estado (`useState` e `ViewState`) já implementado em `App.tsx`. |
| **Comunicação IA** | `@google/genai` | Toda interação com a IA (chat, geração de planos) deve ser encapsulada em `services/geminiService.ts`. |
| **Estrutura** | React/TS | Crie um arquivo por componente/view. Não adicione novos componentes a arquivos existentes. |