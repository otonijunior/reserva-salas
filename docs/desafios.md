# Desafios com o reserva-salas

Terminou o lab antes? O mesmo aplicativo tem mais desafios. Regra para todos:
**critério na SPEC primeiro, teste vermelho antes do código, entrada no diário de bordo.** Vale ponto extra no projeto.

## Aula 1 · Fundamentos
| Nível | Desafio | Pedido inicial ao agente |
|---|---|---|
| Fácil | **Mensagem que ajuda:** o erro de reserva no passado passa a dizer a hora atual e o que fazer. | `Melhore a mensagem do CA-3: diga a hora atual. Teste antes.` |
| Médio | **Filtrar por sala:** `GET /reservas?sala=lab-1` devolve só as reservas daquela sala. | `Proponha o critério e o teste para filtrar por sala.` |
| Difícil | **Duração máxima:** reserva com mais de 4 horas é recusada. Discuta a borda (exatamente 4 h). | `Critique este critério antes de implementar: [cole o critério]` |

## Aula 2 · Contexto e especificação
| Nível | Desafio | Pedido inicial ao agente |
|---|---|---|
| Fácil | **Agenda do dia:** SPEC-003 para listar as reservas de um dia, por sala. Três critérios e um fora de escopo. | `/revisar-spec docs/specs/SPEC-003-agenda-do-dia.md` |
| Médio | **Reserva semanal:** SPEC de reserva recorrente. O desafio é o fora de escopo: o que não entra agora? | `Liste 5 casos de borda de reserva recorrente. Sem código.` |
| Difícil | **Crítico de SPEC:** um subagente que critica SPEC com o checklist do `_modelo-spec.md` e dá nota. | `Crie .claude/agents/critico.md no modelo do revisor.` |

## Aula 3 · Qualidade e DevOps
| Nível | Desafio | Pedido inicial ao agente |
|---|---|---|
| Fácil | **O 409 pela API:** teste de rota HTTP em `test/app.test.js` que prova o conflito de ponta a ponta. | `Escreva o teste HTTP do 409. Mostre falhando primeiro.` |
| Médio | **Capacidade da sala:** pedido com mais pessoas que a capacidade é recusado. Critério na SPEC antes. | `Proponha o critério de capacidade e o teste. Não implemente.` |
| Difícil | **Custo da revisão:** o comentário da revisão por IA no PR mostra quanto ela custou. | `Altere revisao-ia.yml para incluir o custo no comentário.` |

## Aula 4 · A fábrica
| Nível | Desafio | Pedido inicial ao agente |
|---|---|---|
| Fácil | **Lição que vira regra:** uma segunda lição (L-02) que muda o `revisor.md`, com commit citando a lição. | `Proponha a regra no revisor.md para a L-02.` |
| Médio | **Secretaria cancela:** a secretaria pode cancelar qualquer reserva. Do critério ao PR, pelo fluxo inteiro. | `Use o planejador neste critério novo: [cole o critério]` |
| Difícil | **Dois cards em paralelo:** duas branches mexendo em `src/reservas.js`. Resolvam o conflito pelo fluxo. | `Use o revisor na branch depois do merge da main.` |

## Aula 5 · Desafio final
Escolha um desafio que o grupo não fez e entregue pelo fluxo completo (SPEC → plano → teste → código → revisão → PR),
medindo o custo de IA de ponta a ponta. Mostre no demo day.
