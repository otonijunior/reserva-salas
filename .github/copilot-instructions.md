# Instruções para o GitHub Copilot

As regras do projeto valem para qualquer agente e estão em `AGENTS.md` na raiz. Leia e siga esse arquivo antes de qualquer tarefa.

Resumo do essencial:
- Node.js 20+, ES modules, sem dependências externas. Testes com `npm test`.
- Nenhum código sem SPEC (`docs/specs/`); teste do critério antes do código, e ele precisa falhar primeiro.
- Nunca alterar teste para passar, nunca gravar segredo, nunca implementar o que está fora de escopo.
- Responda em português.
