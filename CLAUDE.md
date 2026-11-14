# Instruções para o Claude Code

As regras do projeto valem para qualquer agente e estão em AGENTS.md:

@AGENTS.md

## Específico do Claude Code
- Comece tarefas novas no modo de plano (Shift+Tab).
- Subagentes do projeto em `.claude/agents/`: `planejador`, `construtor` e `revisor`. Depois de implementar, chame o `revisor`.
- Skill `escrever-teste` em `.claude/skills/`: use sempre que for escrever teste.
- Comando `/revisar-spec <arquivo>` critica uma SPEC antes de virar código.
- O hook em `.claude/settings.json` bloqueia segredo. Se ele recusar uma escrita, não tente contornar: troque por variável de ambiente.
