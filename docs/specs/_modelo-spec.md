# SPEC-00N · <título curto, com verbo>

- **Situação:** rascunho | em revisão | aprovada
- **Dono:** <quem decide sobre esta funcionalidade>

## Problema
<Qual problema, de quem, e como sabemos que ele existe. Duas a quatro frases, sem falar de solução.>

## Quem usa
<Perfis, quantidade, frequência.>

## Critérios de aceite
Um critério por comportamento. Sempre no formato Dado / Quando / Então, com o resultado observável.
- **CA-1** · Dado <situação>, quando <ação>, então <resultado observável: status, mensagem, dado>.
- **CA-2** · …

## Fora de escopo
<O que parece fazer parte, mas não entra agora. Proteja a entrega do "já que estamos aqui".>

## Riscos e perguntas
<O que ninguém decidiu ainda. Pergunta sem resposta bloqueia a implementação do critério afetado.>

---
Conferência antes de aprovar (ou rode `/revisar-spec` no Claude Code):
- [ ] Todo critério vira um teste automático sem interpretação
- [ ] Há pelo menos um caso de erro e um caso de borda
- [ ] "Fora de escopo" tem pelo menos um item
- [ ] Nenhuma pergunta aberta bloqueia o primeiro critério
