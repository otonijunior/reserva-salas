# SPEC-001 · Reservar sala

- **Situação:** aprovada · CA-1 pronto · CA-3 no Lab 1 · CA-2 no Lab 3
- **Dono:** coordenação do curso

## Problema
Professores reservam salas por e-mail com a secretaria. Toda semana há duas turmas marcadas
na mesma sala e no mesmo horário, e a aula começa com 15 minutos de improviso.

## Quem usa
Professores (fazem a reserva) e secretaria (consulta a agenda). Cerca de 80 professores, 3 salas.

## Critérios de aceite
- **CA-1** · Dado uma sala livre, quando reservo das 14h às 16h, então a reserva é criada (201).
- **CA-2** · Dado uma reserva no lab-1 das 14h às 16h, quando outra pessoa pede o lab-1 das 15h às 17h,
  então recebe 409 com a mensagem do conflito. Horário encostado (16h às 18h) **não** é conflito.
  Outra sala no mesmo horário **não** é conflito.
- **CA-3** · Dado o horário atual, quando peço uma reserva que começa no passado, então recebo 400.

## Fora de escopo
Cancelamento (SPEC-002), reserva recorrente, aprovação, notificação por e-mail, login.

## Riscos e perguntas
- Fuso horário: todas as datas em ISO 8601 com fuso (ex.: `-03:00`).
- Reserva que começa agora, neste minuto, é passado? (Decidido: só é passado se `inicio < agora`.)
