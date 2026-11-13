// Confere a LP renderizada e gera as prévias.
// Uso: node build/conferir-lp.cjs
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');
const { chromium } = require('C:/Users/Super1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const RAIZ = path.resolve(__dirname, '..');
const PAGINA = process.argv[2] ? path.resolve(process.argv[2]) : path.join(RAIZ, 'Super1-LP-Frenet-v0.5.html');
const PREVIAS = process.argv[3] ? path.resolve(process.argv[3]) : path.join(RAIZ, 'previas');
fs.mkdirSync(PREVIAS, { recursive: true });

const LARGURAS = [['desktop-1920', 1920, 951], ['desktop-1440', 1440, 900], ['laptop-1366', 1366, 768], ['tablet-768', 768, 1024], ['celular-390', 390, 844]];

async function conferir(page) {
  return page.evaluate(() => {
    const CONECTIVOS = new Set('e ou mas que de do da dos das em no na nos nas com para por pelo pela pelos pelas sem entre o a os as um uma uns umas ao aos à às como quando não sob cada seu sua seus suas só outra outro outras outros própria próprio próprias próprios mesma mesmo todas todos'.split(' '));
    const erros = [], avisos = [];

    // 1. Fonte real carregada
    const gsf = [...document.fonts].filter(f => f.family.replace(/"/g, '') === 'Google Sans Flex');
    if (!gsf.length || gsf.some(f => f.status !== 'loaded')) erros.push('Google Sans Flex não carregada');
    if (!document.fonts.check('600 32px "Google Sans Flex"')) erros.push('document.fonts.check falhou para Google Sans Flex');

    // 2. Rolagem horizontal
    if (document.documentElement.scrollWidth > window.innerWidth + 1) erros.push(`rolagem horizontal: ${document.documentElement.scrollWidth}px > ${window.innerWidth}px`);

    // Utilidades de cor
    const rgba = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const fundo = el => { for (let e = el; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c && c.a > 0.5) return c; } return { r: 255, g: 255, b: 255, a: 1 }; };
    const razao = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

    // Texto visível
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => {
        const p = n.parentElement;
        if (!n.textContent.trim() || !p || p.closest('script,style,svg,.sr,.pular')) return NodeFilter.FILTER_REJECT;
        const cs = getComputedStyle(p);
        if (cs.display === 'none' || cs.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const blocos = new Map();
    const blocoDe = el => { for (let e = el; e; e = e.parentElement) { const d = getComputedStyle(e).display; if (!/^inline($|-block)?$/.test(d) || e.tagName === 'A' && /flex|block/.test(d)) return e; } return document.body; };
    const contrastes = new Set();
    let n;
    while ((n = walker.nextNode())) {
      const p = n.parentElement, cs = getComputedStyle(p);
      // 3. Contraste contra o fundo real
      const cor = rgba(cs.color), bg = fundo(p), r = razao(cor, bg);
      const tam = parseFloat(cs.fontSize), peso = parseInt(cs.fontWeight, 10);
      const grande = tam >= 24 || (tam >= 18.66 && peso >= 700);
      const minimo = grande ? 3 : 4.5;
      if (r < minimo) { const chave = `${n.textContent.trim().slice(0, 40)}|${r.toFixed(2)}`; if (!contrastes.has(chave)) { contrastes.add(chave); erros.push(`contraste ${r.toFixed(2)}:1 < ${minimo}:1 em "${n.textContent.trim().slice(0, 50)}"`); } }

      // Palavras com posição (espaço comum separa; espaço inseparável mantém junto)
      const t = n.textContent, re = /[^ \n\t\r]+/g; let m;
      const bloco = blocoDe(p);
      if (!blocos.has(bloco)) blocos.set(bloco, []);
      while ((m = re.exec(t))) {
        const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        const rects = [...rg.getClientRects()].filter(x => x.width > 0);
        if (!rects.length) continue;
        const ultimo = rects[rects.length - 1];
        // Texto cortado por um contêiner com overflow oculto ou fora da tela
        let corte = p.parentElement;
        while (corte && getComputedStyle(corte).overflowX === 'visible') corte = corte.parentElement;
        const lim = corte ? corte.getBoundingClientRect() : { left: 0, right: window.innerWidth };
        if (ultimo.right > Math.min(lim.right, window.innerWidth) + 1 || rects[0].left < Math.max(lim.left, 0) - 1) erros.push(`texto cortado: "${m[0]}"`);
        blocos.get(bloco).push({ palavra: m[0], topo: ultimo.top, base: ultimo.bottom, x: ultimo.left, dir: ultimo.right, rects: rects.length });
        if (p.closest('.selo')) continue;
        // 4. Grafismo por trás do texto (vários pontos por palavra, inclusive traços de contorno)
        let achou = false;
        for (const rc of rects) {
          for (let fx = 0.05; fx <= 0.95 && !achou; fx += 0.15) for (let fy = 0.2; fy <= 0.8 && !achou; fy += 0.3) {
            const px = rc.left + rc.width * fx, py = rc.top + rc.height * fy;
            if (py < 0 || py > window.innerHeight) continue;
            for (const el of document.elementsFromPoint(px, py)) {
              if (el.closest && el.closest('.grafismo')) { erros.push(`grafismo por trás do texto "${m[0]}"`); achou = true; break; }
              const c = rgba(getComputedStyle(el).backgroundColor);
              if (c && c.a > 0.5) break;
            }
          }
        }
      }
    }

    // 5. Linha terminada em conectivo
    for (const [bloco, palavras] of blocos) {
      const linhas = [];
      for (const w of palavras) {
        const l = linhas.find(x => Math.min(x.base, w.base) - Math.max(x.topo, w.topo) > 0.5 * Math.min(x.base - x.topo, w.base - w.topo));
        if (l) { l.palavras.push(w); l.topo = Math.min(l.topo, w.topo); l.base = Math.max(l.base, w.base); } else linhas.push({ topo: w.topo, base: w.base, palavras: [w] });
      }
      linhas.sort((a, b) => a.base - b.base);
      linhas.slice(0, -1).forEach(l => {
        const fim = l.palavras.sort((a, b) => a.x - b.x).at(-1);
        const ult = fim.palavra.split('\u00a0').at(-1).toLowerCase().replace(/[.,:!?)]+$/, '');
        if (CONECTIVOS.has(ult)) erros.push(`linha termina em "${ult}": ...${l.palavras.map(w => w.palavra).join(' ').slice(-60)}`);
      });
      palavras.filter(w => w.rects > 1).forEach(w => avisos.push(`palavra partida entre linhas: "${w.palavra}"`));
      // 5b. Equilíbrio (04.14, R007): só a última linha pode ficar curta, e nenhuma palavra fica sozinha no fim
      if (linhas.length > 1 && !(bloco.closest && bloco.closest('.selo'))) {
        const larg = l => Math.max(...l.palavras.map(w => w.dir)) - Math.min(...l.palavras.map(w => w.x));
        const maior = Math.max(...linhas.map(larg));
        const titulo = !!(bloco.closest && bloco.closest('h1,h2,h3,summary,.resumo,.verbo'));
        const minimo = titulo ? 0.6 : 0.5;
        const resumoBloco = palavras.map(w => w.palavra).join(' ').replace(/ /g, ' ').slice(0, 60);
        const quebra = linhas.map(l => l.palavras.sort((x, y) => x.x - y.x).map(w => w.palavra).join(' ').replace(/ /g, ' ')).join(' / ');
        linhas.slice(0, -1).forEach(l => { if (larg(l) < maior * minimo) erros.push(`linha buraco (${Math.round(100 * larg(l) / maior)}%): ${quebra}`); });
        const ultima = linhas.at(-1).palavras.map(w => w.palavra).join(' ').split(/[  ]+/).filter(x => /[\wÀ-ú]/.test(x));
        if (ultima.length < 2) erros.push(`palavra sozinha no fim: "${ultima.join(' ')}" em "${resumoBloco}"`);
      }
    }

    // 6. Termos vetados e presença de multilojas
    const texto = document.body.innerText;
    const vetados = [['—', 'travessão'], ['–', 'meia-risca'], [';', 'ponto e vírgula'], ['SuperOne', ''], ['Super 1', ''], ['sem split', ''], ['estoque compartilhado', ''], ['lojas virtuais', ''], ['whitelabel', ''], ['white label', ''], ['marketplace multi-seller', '']];
    for (const [v, nome] of vetados) if (texto.toLowerCase().includes(v.toLowerCase())) erros.push(`termo vetado: ${nome || v}`);
    if (/\bICP\b/.test(texto)) erros.push('termo vetado: ICP');
    if (/(^|[^@])\bsuper1\b/.test(texto)) erros.push('grafia "super1" em minúsculas');
    if (!/multilojas/i.test(texto)) erros.push('"multilojas" ausente');

    // 7. Um botão principal por seção
    document.querySelectorAll('section').forEach(s => { const k = s.querySelectorAll('.botao:not(.secundario)').length; if (k > 1) erros.push(`${k} botões principais na seção #${s.id || s.className}`); });

    // 8. Alvos de toque
    document.querySelectorAll('a, summary, button').forEach(el => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (!r.width || cs.visibility === 'hidden' || el.classList.contains('pular')) return;
      if (r.height < 44) avisos.push(`alvo de toque com ${Math.round(r.height)}px: "${el.innerText.trim().slice(0, 30) || el.getAttribute('aria-label')}"`);
    });

    // 9. Logotipo: altura mínima de 26 px (MIV 03.05)
    document.querySelectorAll('.marca svg').forEach(s => { const h = s.getBoundingClientRect().height; if (h < 26) erros.push(`logotipo com ${h}px de altura`); });

    // 10. Versão do logotipo de acordo com o fundo (03.02) e logo da Frenet só em fundo claro
    document.querySelectorAll('.marca svg').forEach(s => {
      const negativo = [...s.querySelectorAll('path')].some(e => getComputedStyle(e).fill === 'rgb(255, 255, 255)');
      const L = lum(fundo(s.parentElement));
      if (negativo && L > 0.4) erros.push('logotipo negativo sobre fundo claro');
      if (!negativo && L < 0.2) erros.push('logotipo positivo sobre fundo escuro');
    });
    document.querySelectorAll('.parceiro svg').forEach(s => { if (s.getBoundingClientRect().height && lum(fundo(s.parentElement)) < 0.6) erros.push('logo da Frenet (versão para fundo claro) sobre fundo escuro'); });

    // 12. Card de produto: o grafismo tem a mesma cor do ícone da assinatura (03.03)
    document.querySelectorAll('.produto').forEach(card => {
      const icone = [...card.querySelectorAll('.assinatura svg g[fill]')].map(g => getComputedStyle(g).fill).find(f => f !== 'rgb(17, 17, 17)' && f !== 'rgb(255, 255, 255)');
      const forma = card.querySelector('.grafismo path');
      if (icone && forma && getComputedStyle(forma).fill !== icone) erros.push(`ícone e grafismo com cores diferentes em ${card.getAttribute('aria-labelledby')}: ${icone} e ${getComputedStyle(forma).fill}`);
    });

    // 11. Par Super1 e Frenet: Frenet entre 1,03 e 1,08 vezes a altura do Super1 (mesma leitura óptica)
    document.querySelectorAll('.conjunto, .selo-parceria').forEach(c => {
      const a = c.querySelector('.marca svg'), b = c.querySelector('.parceiro svg');
      if (!a || !b || !b.getBoundingClientRect().height) return;
      const k = b.getBoundingClientRect().height / a.getBoundingClientRect().height;
      if (k < 1.03 || k > 1.08) erros.push(`par Super1 e Frenet com proporção ${k.toFixed(2)}`);
    });

    return { erros, avisos, altura: document.documentElement.scrollHeight };
  });
}

(async () => {
  const navegador = await chromium.launch({ channel: 'msedge' });
  const relatorio = {};
  let total = 0;
  for (const [nome, w, h] of LARGURAS) {
    // Prévias e conferência no estado estático (movimento reduzido): tudo visível e completo.
    const page = await navegador.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(pathToFileURL(PAGINA).href);
    await page.evaluate(async () => { await document.fonts.ready; });
    // O grafismo não recebe ponteiro na página; só para a conferência ele passa a ser detectável.
    await page.addStyleTag({ content: '.grafismo,.grafismo *{pointer-events:visiblePainted!important}' });
    // A conferência de grafismo usa o que está na tela: percorre a página por trechos.
    const alturaTotal = await page.evaluate(() => document.documentElement.scrollHeight);
    const erros = new Set(), avisos = new Set();
    // Primeira dobra: no desktop, a abertura inteira cabe na tela sem rolar
    if (w >= 1024) {
      const dobra = await page.evaluate(() => ({ fundo: document.querySelector('.abertura .painel').getBoundingClientRect().bottom, tela: window.innerHeight }));
      if (dobra.fundo > dobra.tela) erros.add(`abertura passa da primeira dobra: termina em ${Math.round(dobra.fundo)}px, tela de ${dobra.tela}px`);
    }
    for (let y = 0; y < alturaTotal; y += h - 100) {
      await page.evaluate(v => window.scrollTo(0, v), y);
      await page.waitForTimeout(60);
      const r = await conferir(page);
      r.erros.forEach(e => erros.add(e)); r.avisos.forEach(a => avisos.add(a));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(PREVIAS, `${nome}.png`), fullPage: true });
    relatorio[nome] = { erros: [...erros], avisos: [...avisos] };
    total += erros.size;
    console.log(`\n== ${nome}: ${erros.size} erro(s), ${avisos.size} aviso(s)`);
    [...erros].forEach(e => console.log('  ERRO  ' + e));
    [...avisos].forEach(a => console.log('  aviso ' + a));
    await page.close();
  }
  // Rodada com movimento: erros de script, revelação, sequências, contagem e quadros da animação
  {
    const page = await navegador.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const falhas = [];
    page.on('pageerror', e => falhas.push('erro de script: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') falhas.push('console: ' + m.text()); });
    await page.goto(pathToFileURL(PAGINA).href);
    await page.evaluate(async () => { await document.fonts.ready; });
    const altura = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < altura; y += 400) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(1200);
    const estado = await page.evaluate(() => ({
      anim: document.documentElement.classList.contains('anim'),
      ocultos: [...document.querySelectorAll('.revelar:not(.visivel)')].length,
      contagem: [...document.querySelectorAll('[data-contar]')].map(e => e.textContent)
    }));
    if (!estado.anim) falhas.push('animações não iniciaram');
    if (estado.ocultos) falhas.push(`${estado.ocultos} bloco(s) continuam ocultos depois da rolagem`);
    if (estado.contagem.some(t => t !== '80')) falhas.push('contagem não terminou em 80: ' + estado.contagem.join(','));
    const quadros = path.join(PREVIAS, 'animacao');
    fs.mkdirSync(quadros, { recursive: true });
    for (const [alvo, prefixo] of [['.caminho', 'caminho'], ['.rota', 'rota']]) {
      await page.locator(alvo).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      for (let q = 1; q <= 4; q++) {
        const ativos = await page.evaluate(a => document.querySelectorAll(a + ' [data-passo].ativo').length, alvo);
        if (q === 1 && ativos !== 1) falhas.push(`sequência ${alvo} sem etapa ativa`);
        await page.locator(alvo).screenshot({ path: path.join(quadros, `${prefixo}-${q}.png`) });
        await page.waitForTimeout(1800);
      }
    }
    relatorio['movimento-1440'] = { erros: falhas, avisos: [] };
    total += falhas.length;
    console.log(`
== movimento-1440: ${falhas.length} erro(s)`);
    falhas.forEach(e => console.log('  ERRO  ' + e));
    await page.close();
  }
  fs.writeFileSync(path.join(PREVIAS, 'conferencia.json'), JSON.stringify(relatorio, null, 2));
  await navegador.close();
  process.exitCode = total ? 1 : 0;
})();
