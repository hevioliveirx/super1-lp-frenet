// Gera as assinaturas positivas dos produtos S1 com o ícone em Azul 70% e Lilás 70%.
// Decisão de Hevelyn em 2026-11-13: na versão positiva sobre artes em azul e lilás, o ícone pode usar o tom 70%.
// Mesmo padrão das variantes contextuais existentes: só o preenchimento do ícone muda; SVG e PNG de 2400 px.
// Uso: node build/gerar-assinaturas-70.cjs <pasta de saída>
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');
const { chromium } = require('C:/Users/Super1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ACERVO = 'G:/Drives compartilhados/s1_base/Marketing/Branding/_desenvolvimento/MIV 2027/Capitulo-03 - aguardando revisao e aprovacao/logotipos/svg';
const SAIDA = path.resolve(process.argv[2] || 'assinaturas-70');
const PRODUTOS = ['S1-Pay', 'S1-Envios', 'S1-Connect', 'S1-Trust', 'S1-Ledger'];
const CORES = { 'Blue-70': '#7DCDC3', 'Purple-70': '#7B68BD' };   // Azul 70% e Lilás 70% (MIV 04.17)
const ICONE_BASE = 'fill="#B6A4FF"';                               // ícone do arquivo-base (Lilás 50%)

(async () => {
  fs.mkdirSync(path.join(SAIDA, 'svg'), { recursive: true });
  fs.mkdirSync(path.join(SAIDA, 'png'), { recursive: true });
  const navegador = await chromium.launch({ channel: 'msedge' });
  const relatorio = [];
  for (const produto of PRODUTOS) {
    const base = fs.readFileSync(path.join(ACERVO, produto + '.svg'), 'utf8');
    if (base.split(ICONE_BASE).length !== 2) throw new Error(`${produto}: esperava um único ícone em ${ICONE_BASE}`);
    const [, w, h] = base.match(/<svg[^>]*\swidth="(\d+)"\s+height="(\d+)"/);
    for (const [nomeCor, hex] of Object.entries(CORES)) {
      const nome = `${produto}-contextual-${nomeCor}-positivo`;
      const svg = base.replace(ICONE_BASE, `fill="${hex}"`);
      const arqSvg = path.join(SAIDA, 'svg', nome + '.svg');
      fs.writeFileSync(arqSvg, svg);
      const pagina = await navegador.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
      await pagina.goto(pathToFileURL(arqSvg).href);
      const arqPng = path.join(SAIDA, 'png', nome + '.png');
      await pagina.screenshot({ path: arqPng, omitBackground: true, clip: { x: 0, y: 0, width: +w, height: +h } });
      await pagina.close();
      const png = fs.readFileSync(arqPng);
      relatorio.push({ nome, cor: hex, png: `${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, svgBytes: svg.length });
    }
  }
  await navegador.close();
  console.table(relatorio);
})();
