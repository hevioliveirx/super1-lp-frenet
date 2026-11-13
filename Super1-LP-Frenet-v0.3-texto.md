# LP da Super1 para o Marketplace de Serviços da Frenet · v0.3

**Versão:** v0.3 · 2026/11/13 · rascunho para Hevelyn revisar com Lílian
**Estado:** nada publicado nem enviado ao Evandro. A v0.2 foi preservada (`Super1-LP-Frenet-v0.2.html`, `fonte/lp-v0.2.html`, `previas/v0.2/`).
**Base:** MIV 2.00 R007 - 2026/11/13. O texto da página é o mesmo da v0.2 (ver `Super1-LP-Frenet-v0.2-texto.md`), com uma exceção: o título da abertura continua igual, mas agora quebra em duas linhas no desktop.

## O que mudou a partir do feedback da Hevelyn

| Pedido | O que foi feito |
|---|---|
| Logo da Frenet parecia menor que o do Super1 | Medi os dois arquivos. A altura das letras minúsculas ocupa 58% do logo do Super1 e 53,5% do da Frenet. Com 26 px contra 30 px, as letras da Frenet ficavam com 80% do tamanho. Agora a Frenet tem 1,05 vez a altura do Super1 (31,5 px contra 30 px): as letras chegam a 97%, a altura total fica praticamente igual e as linhas de base estão alinhadas. Vale para o cabeçalho e para o par de logos da seção Frenet |
| Logo negativo no rodapé sobre fundo branco | A regra que pintava o rodapé de Preto se perdeu na v0.2. O rodapé voltou a ser Preto, e o logo negativo ficou legível |
| Primeira dobra cortada | A abertura agora tem duas colunas desde o topo: etiqueta, título, apoio e botões à esquerda, e o caminho do pedido à direita. O título fica em duas linhas e o painel ocupa a altura da tela, sem passar dela. A largura útil das seções passou de 1200 para 1320 px |
| Soluções coloridas demais | Os cards usam agora bases 5%, cada um numa combinação aprovada: S1 Envios em Laranja 5% (118-5), S1 Pay em Lilás 5% (I-03), S1 Ledger em Azul 5% (063-M1), S1 Connect em Lilás 5% (014-M1) e S1 Trust em Azul 5% (031-M2). O grafismo de cada produto e a cor do ícone acompanham a combinação |

## Conferência

A conferência automática ganhou quatro verificações:
- a abertura cabe na primeira dobra nas telas de desktop (1920×951, 1440×900 e 1366×768);
- o logo positivo ou negativo corresponde ao fundo;
- o logo da Frenet só aparece em fundo claro;
- no par Super1 e Frenet, a Frenet fica entre 1,03 e 1,08 vez a altura do Super1.

Resultado: 0 erros em 1920, 1440, 1366, 768 e 390 px e na rodada com movimento (`previas/conferencia.json`).

## Arquivos

- `Super1-LP-Frenet-v0.3.html`: página completa
- `previas/desktop-1920.png`, `desktop-1440.png`, `laptop-1366.png`, `tablet-768.png`, `celular-390.png`: estado estático
- `previas/animacao/`: quadros das sequências animadas

## Pendências antes de publicar

As mesmas da v0.2: destino do botão, autorização da Mozaik, validação do logo com o manual da Frenet, conta Frenet do cliente no S1 Envios, rastreio com o Evandro, publicação pelo GitHub e registro no Drive.
