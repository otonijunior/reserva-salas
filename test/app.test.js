// Teste de ponta a ponta da API: sobe o servidor numa porta livre e faz requisições de verdade.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { criarApp } from '../src/app.js';

let servidor;
let base;

before(async () => {
  servidor = createServer(criarApp({ agora: () => new Date('2026-12-01T08:00:00-03:00') }));
  await new Promise((ok) => servidor.listen(0, ok));
  base = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

test('GET /salas lista as salas', async () => {
  const resp = await fetch(`${base}/salas`);
  assert.equal(resp.status, 200);
  const salas = await resp.json();
  assert.ok(salas.length >= 1);
});

test('POST /reservas cria e GET /reservas mostra a reserva', async () => {
  const criar = await fetch(`${base}/reservas`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ sala: 'auditorio', inicio: '2026-12-02T09:00:00-03:00', fim: '2026-12-02T11:00:00-03:00', responsavel: 'prof.bruno' }),
  });
  assert.equal(criar.status, 201);
  const lista = await (await fetch(`${base}/reservas`)).json();
  assert.ok(lista.some((r) => r.responsavel === 'prof.bruno'));
});

test('JSON inválido devolve 400', async () => {
  const resp = await fetch(`${base}/reservas`, { method: 'POST', body: '{isso não é json' });
  assert.equal(resp.status, 400);
});
