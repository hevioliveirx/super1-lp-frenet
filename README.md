# Super1 · LP para o Marketplace de Serviços da Frenet

Landing page da Super1 para o Marketplace de Serviços da Frenet (TSK-1110). Repositório privado.

**Estado:** rascunho v0.5 · 2026/11/13, em revisão com a Lílian. Nada publicado. A página tem `noindex` e marcas `data-revisao` até a aprovação.

## Arquivos

| Caminho | Conteúdo |
|---|---|
| `Super1-LP-Frenet-v0.5.html` | Página montada e autocontida, com fonte, logotipos e grafismos embutidos. Abre direto no navegador. |
| `fonte/lp.html` | Fonte da página, com marcadores dos ativos. Toda edição começa aqui. |
| `build/montar-lp.py` | Monta a página: embute os ativos do acervo da marca e aplica a quebra por sentido do MIV (04.14). |
| `build/conferir-lp.cjs` | Confere a página renderizada em 1920, 1440, 1366, 768 e 390 px e gera as prévias em `previas/`. |
| `build/gerar-assinaturas-70.cjs` | Gera as assinaturas positivas dos produtos S1 com o ícone em Azul 70% e Lilás 70%. |
| `ativos-parceiro/frenet-logo-rebrading.svg` | Logo da Frenet, baixado do site da Frenet com autorização de Hevelyn. |
| `Super1-LP-Frenet-v0.N-texto.md` | Textos de revisão. A v0.1 traz o texto completo com as fontes de cada afirmação, a v0.2 o texto revisado, e as demais registram as mudanças de cada versão. |

## Como montar e conferir

Dependências: Python 3, Node com Playwright, Microsoft Edge e acesso ao Drive compartilhado `s1_base` em `G:`. O script de montagem lê os ativos oficiais direto do acervo da marca, então não há cópia deles aqui.

```bash
python -I build/montar-lp.py
```

```bash
node build/conferir-lp.cjs
```

A conferência confere fonte carregada, rolagem horizontal, contraste, quebras de linha, equilíbrio das linhas, texto cortado, grafismo atrás de texto, termos vetados, botão principal por seção, alvos de toque, versão do logotipo pelo fundo, proporção do par de logos, cor do ícone igual à do grafismo, primeira dobra e animações. O resultado esperado é zero erro.

Cada versão nova ganha arquivo próprio (`Super1-LP-Frenet-v0.N.html`). A versão que recebeu feedback não é sobrescrita.

## Fora do repositório

Ficam só no computador de trabalho: as versões v0.1 a v0.4 da página e da fonte, as prévias em imagem e a cópia local das assinaturas 70%. As assinaturas oficiais estão no `s1_base`, no capítulo 03 do MIV.

## Pendências antes de publicar

1. Canal de destino do botão "Agende uma avaliação gratuita com especialista" (Lílian).
2. Autorização da Mozaik para nome, descrição e resultados do case.
3. Validação do logo da Frenet com o manual da marca deles.
4. Confirmar se o cliente com conta na Frenet usa a própria conta no S1 Envios.
5. Rastreio do canal combinado com o Evandro (UTM ou parâmetro) e ferramenta de análise.
6. Domínio e hospedagem. A fonte embutida em TTF deve virar WOFF2 em subconjunto.
7. Retirar `noindex` e as marcas `data-revisao`.
