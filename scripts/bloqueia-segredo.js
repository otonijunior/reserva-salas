#!/usr/bin/env node
// Bloqueia segredo antes que ele entre no repositório. Três modos:
//   1. Hook do Claude Code (PreToolUse): recebe pela entrada padrão o JSON da ferramenta Write/Edit.
//      Sai com código 2 para bloquear; a mensagem vai para o agente, que corrige sozinho.
//   2. Hook de git (pre-commit):  node scripts/bloqueia-segredo.js --git    confere o que está no stage.
//   3. Varredura no CI:           node scripts/bloqueia-segredo.js --tudo   confere todos os arquivos versionados.
// Os modos 2 e 3 funcionam com qualquer ferramenta de IA (ou sem nenhuma).
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const PADROES = [
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'chave da Anthropic'],
  [/sk-(proj-)?[A-Za-z0-9_-]{32,}/, 'chave de API'],
  [/AKIA[0-9A-Z]{16}/, 'chave da AWS'],
  [/gh[pousr]_[A-Za-z0-9]{36,}/, 'token do GitHub'],
  [/AIza[0-9A-Za-z_-]{35}/, 'chave do Google'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'chave privada'],
];
const ARQUIVOS_SENSIVEIS = [/(^|[\\/])\.env(\.[^\\/]*)?$/, /\.pem$/, /(^|[\\/])id_(rsa|ed25519)$/];
const PERMITIDOS = [/\.env\.exemplo$/, /\.env\.example$/];

const sensivel = (caminho) => ARQUIVOS_SENSIVEIS.some((r) => r.test(caminho)) && !PERMITIDOS.some((r) => r.test(caminho));
const achar = (texto) => PADROES.filter(([r]) => r.test(texto)).map(([, nome]) => nome);
const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

function falhar(problemas, codigo) {
  console.error(`Bloqueado: possível segredo.\n- ${problemas.join('\n- ')}\nUse variável de ambiente ou cofre; segredo nunca vai para o repositório.`);
  process.exit(codigo);
}

if (process.argv.includes('--git')) {
  const nomes = git('diff --cached --name-only --diff-filter=ACM').split('\n').filter(Boolean);
  const problemas = [
    ...nomes.filter(sensivel).map((n) => `arquivo sensível no commit: ${n}`),
    ...achar(git('diff --cached -U0')).map((n) => `${n} no que vai ser commitado`),
  ];
  if (problemas.length) falhar(problemas, 1);
  process.exit(0);
}

if (process.argv.includes('--tudo')) {
  const problemas = [];
  for (const nome of git('ls-files').split('\n').filter(Boolean)) {
    if (sensivel(nome)) { problemas.push(`arquivo sensível versionado: ${nome}`); continue; }
    let texto = '';
    try { texto = readFileSync(nome, 'utf8'); } catch { continue; }
    for (const achado of achar(texto)) problemas.push(`${achado} em ${nome}`);
  }
  if (problemas.length) falhar(problemas, 1);
  console.log('Nenhum segredo encontrado nos arquivos versionados.');
  process.exit(0);
}

// Modo hook do Claude Code.
let entrada = {};
try { entrada = JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { process.exit(0); }
const t = entrada.tool_input ?? {};
const caminho = t.file_path ?? '';
const conteudo = [t.content, t.new_string, ...(t.edits ?? []).map((e) => e.new_string)].filter(Boolean).join('\n');
const problemas = [
  ...(caminho && sensivel(caminho) ? [`escrever em arquivo sensível: ${caminho}`] : []),
  ...achar(conteudo).map((n) => `${n} no conteúdo`),
];
if (problemas.length) falhar(problemas, 2);
process.exit(0);
