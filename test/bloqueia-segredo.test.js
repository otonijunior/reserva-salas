// O hook também tem teste: se alguém "afrouxar" o script, o CI avisa.
// As chaves falsas são montadas em tempo de execução para este arquivo não parecer um segredo.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const rodar = (entrada) => spawnSync(process.execPath, ['scripts/bloqueia-segredo.js'], { input: JSON.stringify(entrada), encoding: 'utf8' });
const chaveFalsa = 'sk-' + 'ant-' + 'x'.repeat(40);

test('hook bloqueia conteúdo com chave', () => {
  const r = rodar({ tool_name: 'Write', tool_input: { file_path: 'src/config.js', content: `const k = "${chaveFalsa}";` } });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /Bloqueado/);
});

test('hook bloqueia escrever no .env', () => {
  const r = rodar({ tool_name: 'Write', tool_input: { file_path: '/repo/.env', content: 'PORT=3000' } });
  assert.equal(r.status, 2);
});

test('hook deixa passar código normal e o .env.exemplo', () => {
  assert.equal(rodar({ tool_name: 'Edit', tool_input: { file_path: 'src/app.js', new_string: 'const porta = 3000;' } }).status, 0);
  assert.equal(rodar({ tool_name: 'Write', tool_input: { file_path: '.env.exemplo', content: 'ANTHROPIC_API_KEY=' } }).status, 0);
});
