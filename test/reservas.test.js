// Testes das regras de reserva. Cada teste cita o critério de aceite (CA) da SPEC que ele prova.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarReserva } from '../src/reservas.js';

const AGORA = new Date('2026-12-01T08:00:00-03:00');
const pedido = (extra = {}) => ({
  sala: 'lab-1',
  inicio: '2026-12-01T14:00:00-03:00',
  fim: '2026-12-01T16:00:00-03:00',
  responsavel: 'prof.ana',
  ...extra,
});

test('CA-1: sala livre é reservada', () => {
  const r = criarReserva([], pedido(), AGORA);
  assert.equal(r.status, 201);
  assert.equal(r.reserva.sala, 'lab-1');
  assert.equal(r.reserva.responsavel, 'prof.ana');
});

test('campo obrigatório ausente devolve 400 dizendo qual falta', () => {
  const r = criarReserva([], pedido({ responsavel: '' }), AGORA);
  assert.equal(r.status, 400);
  assert.match(r.erro, /responsavel/);
});

test('sala inexistente devolve 404', () => {
  const r = criarReserva([], pedido({ sala: 'sala-que-nao-existe' }), AGORA);
  assert.equal(r.status, 404);
});

test('fim antes do início devolve 400', () => {
  const r = criarReserva([], pedido({ fim: '2026-12-01T13:00:00-03:00' }), AGORA);
  assert.equal(r.status, 400);
});

// Lab 1: escreva aqui o teste do CA-3 ANTES de mexer em src/reservas.js.
// Lab 3: escreva aqui os testes do CA-2 ANTES de mexer em src/reservas.js.
