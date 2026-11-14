import { createServer } from 'node:http';
import { criarApp } from './app.js';

const porta = Number(process.env.PORT ?? 3000);
createServer(criarApp()).listen(porta, () => {
  console.log(`reserva-salas no ar: http://localhost:${porta}/salas`);
});
