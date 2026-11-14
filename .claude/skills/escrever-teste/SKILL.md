---
name: escrever-teste
description: Como escrever testes neste projeto (node:test, um teste por critério de aceite, tempo injetado). Use sempre que for criar ou alterar um teste.
---
# Escrever teste no padrão do projeto

## Regras
- Use `node:test` e `node:assert/strict`. Nada de Jest ou outra biblioteca.
- Um teste por critério de aceite. O nome começa pelo critério: `test('CA-2: horário sobreposto devolve 409', …)`.
- Regra de negócio se testa direto em `src/reservas.js`, sem subir servidor. Rota HTTP se testa em `test/app.test.js`.
- Nunca use o relógio real: passe `agora` como parâmetro (ex.: `new Date('2026-12-01T08:00:00-03:00')`).
- Teste o caso de borda junto: horário encostado (16h–18h depois de 14h–16h) não é conflito.

## Modelo
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarReserva } from '../src/reservas.js';

const AGORA = new Date('2026-12-01T08:00:00-03:00');

test('CA-n: <o que o critério garante>', () => {
  // Dado
  const existentes = [];
  // Quando
  const r = criarReserva(existentes, { sala: 'lab-1', inicio: '…', fim: '…', responsavel: 'prof.ana' }, AGORA);
  // Então
  assert.equal(r.status, 201);
});
```

## Antes de entregar
1. Rode `npm test` e confirme que o teste novo **falhou** antes do código.
2. Confira que nenhum teste antigo mudou.
