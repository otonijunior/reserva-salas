// Camada HTTP: só traduz requisição em chamada de função e resultado em resposta.
// A regra de negócio mora em reservas.js.
import { SALAS } from './salas.js';
import { criarReserva } from './reservas.js';

export function criarApp({ agora = () => new Date() } = {}) {
  const reservas = [];

  return async function tratar(req, res) {
    const url = new URL(req.url, 'http://localhost');
    try {
      if (req.method === 'GET' && url.pathname === '/salas') return responder(res, 200, SALAS);
      if (req.method === 'GET' && url.pathname === '/reservas') return responder(res, 200, reservas);
      if (req.method === 'POST' && url.pathname === '/reservas') {
        const pedido = await lerJson(req);
        const resultado = criarReserva(reservas, pedido, agora());
        if (resultado.reserva) reservas.push(resultado.reserva);
        return responder(res, resultado.status, resultado.reserva ?? { erro: resultado.erro });
      }
      return responder(res, 404, { erro: 'Rota não encontrada' });
    } catch (e) {
      return responder(res, 400, { erro: 'JSON inválido no corpo da requisição' });
    }
  };
}

function responder(res, status, corpo) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(corpo));
}

async function lerJson(req) {
  let texto = '';
  for await (const parte of req) texto += parte;
  return texto ? JSON.parse(texto) : {};
}
