# L-NN · <o que deu errado, numa frase>

- **Data e lab:** <dd/mm, Lab N>
- **Ferramenta e modelo:** <ex.: Claude Code, Copilot no modo agente, Gemini CLI>

**O que aconteceu (com evidência):** <o pedido, o que o agente fez, o print, o trecho do diff ou do log>

**Esperado:** <o que deveria ter acontecido>

**Por que aconteceu:** <falta de contexto? SPEC ambígua? permissão demais? teste fraco?>

**Sugestão:** <a mudança no AGENTS.md, na SPEC, num subagente, num hook ou no fluxo que evita a repetição>

**Virou regra?** <não | sim: onde (arquivo) e em qual commit>

---
Exemplo real, da fábrica da Garage4Lab (L-16): 310 testes passaram, mas na nuvem real a função chamada
não existia; o simulador dos testes a criava. Regra que nasceu: mudança que mexe em acesso de nuvem
é ensaiada contra o recurso real antes do merge, e a ordem é sempre criar o novo antes de remover o antigo.
