# Roteiro · Aula 1 · Do pedido ao teste verde com um agente

O professor faz cada passo no telão e a turma repete no próprio computador.
Copie os prompts **exatamente** como estão: o objetivo é comparar o que o agente de cada um responde.

**Objetivo da aula:** implementar o CA-3 da SPEC-001 (reserva no passado é recusada) seguindo o fluxo
SPEC → plano → teste vermelho → código → teste verde → revisão → commit.

**Ficou para trás?** Acompanhe pela tela do professor. Depois da aula, a branch `lab-1-solucao` é publicada com o resultado do passo 7: `git fetch` e `git switch lab-1-solucao`.

---

## Passo 0 · Preparar (antes da aula, 5 min)
1. **Uma pessoa do grupo** abre **https://github.com/Garage4Labs/reserva-salas**, clica em **Use this template → Create a new repository**, dá o nome `reserva-salas` e clica em **Create repository**. Depois, em **Settings → Collaborators**, convida o resto do grupo.
2. **Todos** aceitam o convite, clonam o repositório do grupo (troque DONO pelo usuário de quem criou) e entram na pasta clonada:
   ```
   mkdir ~/aula      # a pasta de trabalho da disciplina (~ é a sua pasta de usuário)
   cd ~/aula
   git clone https://github.com/DONO/reserva-salas.git
   cd reserva-salas
   ```
   Clonar direto o Garage4Labs/reserva-salas funciona para olhar, mas o push vai falhar: use o do grupo.
3. Confira o ambiente:
   ```
   node --version      # precisa ser 20 ou mais novo
   npm test            # tudo verde
   ```
4. Diga ao git quem você é (só uma vez por máquina):
   ```
   git config --global user.name "Seu Nome"
   git config --global user.email "seu@email.com"
   ```
5. Ligue o hook que bloqueia segredo e teste quebrado: `npm run hooks:git`

## Passo 1 · Ver a API funcionando (5 min)
```
npm start
```
Abra http://localhost:3000/salas no navegador. Em outro terminal, crie uma reserva:

- **Windows (PowerShell):**
  ```powershell
  Invoke-RestMethod -Method Post -Uri http://localhost:3000/reservas -ContentType 'application/json' -Body '{"sala":"lab-1","inicio":"2030-03-11T14:00:00-03:00","fim":"2030-03-11T16:00:00-03:00","responsavel":"prof.ana"}'
  ```
- **Mac/Linux:** use o `curl` do README.

> **Pergunte à turma:** e se eu pedir uma reserva no passado? Troque as datas por `2025-01-01` e repita:
> a reserva é criada. Esse é o defeito de hoje.

Pare o servidor (Ctrl+C) e abra o agente **dentro da pasta do projeto**. O Claude só enxerga a pasta onde foi aberto: fora dela, ele não acha o `AGENTS.md` nem a SPEC.
```
cd ~/aula/reserva-salas
claude
```
Na primeira vez, ele pede login e pergunta se você confia nesta pasta: responda que sim.

## Passo 2 · O agente lê o contexto antes de agir (10 min)
**Prompt 1:**
```
Leia o AGENTS.md e a SPEC-001. O que falta? Não altere nada.
```
**O que esperar:** o agente diz que faltam o CA-3 e o CA-2 (sem teste e sem código) e aponta ambiguidades da SPEC.

> **Discuta:** o agente leu o `AGENTS.md` sozinho, porque o `CLAUDE.md` aponta para ele. É assim que o projeto ensina o agente.

## Passo 3 · Plano antes de código (10 min)
Aperte **Shift+Tab** até aparecer *plan mode*. Nesse modo o agente não altera nenhum arquivo.

**Prompt 2:**
```
Quero o CA-3: reserva no passado é recusada. Proponha o plano e o teste.
```
**O que esperar:** um plano com dois testes, o caso no passado (400) e o caso de borda (começar exatamente agora é aceito).

> **Discuta:** de onde veio o caso de borda? Da SPEC: "só é passado se `inicio < agora`". Sem essa frase na SPEC, o agente teria de adivinhar.

Leia o plano e aprove.

## Passo 4 · Teste vermelho (5 min)
O agente escreve o teste e roda `npm test`. **Ele precisa falhar:**
```
✖ CA-3: reserva que começa no passado devolve 400
  201 !== 400
```
> **Discuta:** um teste que nunca falhou não prova nada. O vermelho mostra que o teste realmente enxerga o defeito.

## Passo 5 · Código mínimo e teste verde (5 min)
O agente acrescenta **uma linha** em `src/reservas.js`:
```js
if (inicio < agora) return { status: 400, erro: 'A reserva não pode começar no passado' };
```
e roda `npm test`: todos verdes.

> **Discuta:** por que `<` e não `<=`? O teste de borda trava essa decisão. Troque para `<=`, rode `npm test` e veja o vermelho. Depois desfaça.

## Passo 6 · Revisão por outro agente (10 min)
**Prompt 3:**
```
Chame o revisor para revisar a mudança contra a SPEC-001.
```
**O que esperar:** **APROVADO** e uma tabela critério → teste.

> **Discuta:** o revisor não viu a conversa, só o código. Ele julga a evidência, não a intenção.

## Passo 7 · Commit (5 min)
**Prompt 4:**
```
Mostre o diff e faça o commit.
```
O hook roda os testes antes do commit. Com teste vermelho, o commit é bloqueado.

## Passo 8 · Diário de bordo (10 min, em grupo)
Preencha a entrada da Aula 1 em `diario/DIARIO.md`: os prompts, 3 acertos e pelo menos 1 erro do agente, com evidência.
Erro que vale registrar vira lição em `docs/licoes/`.

---

## Problemas comuns
| Sintoma | Solução |
|---|---|
| `Author identity unknown` no commit | Passo 0.4 (`git config`) |
| `curl` dá erro estranho no Windows | No PowerShell, `curl` não é o curl de verdade: use o `Invoke-RestMethod` do passo 1 |
| O agente já começa editando arquivo | Você não ativou o *plan mode* (Shift+Tab) |
| O agente não fala do caso de borda | Pergunte: "E se a reserva começar exatamente agora?" |
| Me perdi | `git stash` e acompanhe pela tela; depois da aula, `git fetch` e `git switch lab-1-solucao` |
