# LP da Super1 para o Marketplace de Serviços da Frenet · texto para revisão

**Versão:** v0.1 · 2026/11/13 · rascunho para Hevelyn revisar com Lílian
**Estado:** nada publicado nem enviado ao Evandro. A página tem `noindex` e marcas amarelas de revisão.
**Base visual:** MIV 2.00 R005 - 2026/11/12, versão local em desenvolvimento, com os blocos "Para agentes de IA" dos capítulos 01 a 12.
**Briefing:** `Downloads/2026-11-12-briefing-lp-super1-frenet.md` · tarefa TSK-1110 no Notion.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `Super1-LP-Frenet-v0.1.html` | Página completa, abre no navegador, com fonte e ativos embutidos |
| `previas/desktop-1440.png`, `previas/tablet-768.png`, `previas/celular-390.png` | Prévias de página inteira para comentar sem abrir o HTML |
| `previas/conferencia.json` | Resultado da conferência automática: 0 erros nas três larguras |
| `fonte/lp.html` | Estrutura e CSS editáveis. Toda mudança é feita aqui |
| `build/montar-lp.py` | Monta o HTML com os ativos reais da Super1 Base e aplica a quebra por sentido (04.14) |
| `build/conferir-lp.cjs` | Gera as prévias e confere fonte, quebras, contraste, grafismo, termos vetados e alvos de toque |

Para refazer depois de um ajuste: `python -I build/montar-lp.py` e `node build/conferir-lp.cjs`.

## Decisões já tomadas (13/11)

- Botão principal: **Agende uma avaliação gratuita com especialista**, o CTA de conversão vigente na Marca verbal (seção 6) e no MIV (cap. 07). **Falar com a Super1**, sugerido no briefing, ficou como botão secundário no cabeçalho e leva à seção de contato.
- Exemplo: case **Mozaik**, marcado como pendente de autorização. A versão ilustrativa sem nome está abaixo, pronta para troca.
- Arquivos locais até a revisão. Depois, publicação pelo GitHub.

## Texto por seção

As barras indicam a quebra de linha no desktop. No celular, a quebra é automática e respeita a regra 04.14.

### 0 · Cabeçalho
Logotipo · Para quem é · Como funciona · Soluções · Na prática · botão secundário **Falar com a Super1**

### 1 · Abertura
- **Etiqueta:** Para quem vende e envia com a Frenet
- **Título:** Seu e-commerce / organizado / do estoque / à entrega.
- **Apoio:** O Super1 é uma plataforma de e-commerce multilojas. Atende uma loja e também operações com filiais, franquias, revendas ou lojas parceiras, organizando vitrine, estoque por loja, pedidos, envios e repasses de cada uma.
  *Fonte: descrição de referência de 18/10 (Posicionamento e mensagem, seção 2).*
- **Botões:** Agende uma avaliação gratuita com especialista · Conheça as soluções →
- **Cartão "O caminho de um pedido"** (ilustrativo):
  1. Vitrine: O cliente compra no site da sua marca, com carrinho e pagamento únicos.
  2. Loja de origem: O pedido sai da loja que tem o produto, conforme a regra que você define.
  3. Etiqueta e rastreio: A etiqueta sai pela Frenet, com Correios ou transportadora.
  4. Repasse: O valor de cada loja fica registrado no extrato.
  Nota: Exemplo ilustrativo. As etapas variam conforme o modelo da operação.
  *Fonte: Escopo do produto 5.4 (origem do envio ✅, Correios e transportadoras pela Frenet ✅) e 4.3 (extrato ✅).*

**Alternativa de título:** Venda online / com estoque, frete e repasse / organizados por loja.

### 2 · Para quem é
- **Título:** Uma loja / ou várias, na mesma plataforma.
- **Apoio:** Multilojas quer dizer que o Super1 organiza a venda online de cada loja da operação. Veja o que isso permite em cada caso.
- **Uma loja:** Crie ou migre o seu e-commerce com vitrine, checkout, frete e integração com os seus sistemas. Se a operação ganhar novas lojas, a mesma base acompanha.
- **Filiais e marcas do grupo:** Cada loja física vira estoque de apoio. O pedido sai da unidade que tem o produto, e cada loja acompanha as próprias vendas e o que tem a receber.
- **Franquias e revendas:** A marca organiza a vitrine e as regras da venda online. Cada franqueado ou revenda opera a sua parte, conforme o modelo combinado entre a marca e os parceiros.
- **Lojas parceiras:** Reúna empresas parceiras em um só site, com carrinho e pagamento únicos. A operação define comissão e regras, e cada loja recebe o que vendeu.

*Fontes: recortes de mensagem (Posicionamento, seção 4), "cada loja física vira estoque de apoio" (Marca verbal, vocabulário controlado), monetização e checkout único (Escopo 4.3). Franquias ficou genérico de propósito: o Posicionamento pede não anunciar funções de franquia sem confirmação no Escopo.*

### 3 · Como funciona
- **Título:** Três partes, / cada uma com o seu papel.
- **Gestão do ecossistema** · Para quem administra a operação: Aprova e acompanha as lojas, define comissão e regras, cria promoções e decide como e quando o dinheiro é repassado.
- conector: *define regras e repasses*
- **Gestão das lojas** · Para cada loja: Cuida de catálogo, estoque, preço, pedidos, envio e trocas, e acompanha o extrato do que tem a receber.
- conector: *publica ofertas e despacha pedidos*
- **Vitrine** · Para quem compra: Um só lugar para comprar de todas as lojas, com carrinho e pagamento únicos e a identidade da sua marca.
- **Fecho:** Um só ambiente para quem compra, autonomia para quem vende, controle para quem gerencia.
- Nota: Ilustração conceitual das partes da plataforma. Não é uma captura da interface.

*Fonte: descrição oficial das camadas aprovada por Adriano em 09/10 (Escopo, seção 3), formas curtas Gestão do ecossistema e Gestão das lojas (Marca verbal, seção 5, 22/10) e MIV cap. 09.*

### 4 · Soluções
- **Título:** Do estoque / ao registro de cada valor.
- **Apoio:** Cinco produtos S1 cuidam de cada parte da venda online e trabalham juntos na plataforma.

**S1 Envios** (em destaque) · Do estoque / à porta do cliente.
Estoque separado por endereço, escolha da loja de origem de cada item e envio feito pela própria loja. Se faltar um produto na separação, outra loja do grupo pode assumir o envio.
- Retirada na loja e entrega própria por região
- Promoção de frete por região, loja, categoria ou produto
- Etiqueta automática e rastreio para o cliente
- Troca e devolução com etiqueta de envio reverso

Bloco **Com a Frenet:** O S1 Envios usa a Frenet para cotar o frete, gerar a etiqueta e rastrear os envios pelos Correios e pelas transportadoras Jadlog, Loggi, Total Express, J&T Express e iMile. **Economize até 80% nos envios pelos Correios com o S1 Envios.** Economia máxima possível. O valor varia conforme cada envio.
*Fonte: Escopo 5.4 e 8 (todos ✅, roteamento ✅ ago/2026). A frase dos 80% é a formulação aprovada para peça no Escopo 5.4. A palavra "whitelabel", usada internamente no Escopo, ficou fora.*

**S1 Pay** · O valor da venda / chega a quem vendeu.
Checkout único com Pix, boleto e cartão à vista ou parcelado. O repasse para cada loja pode ser no ato, programado ou manual, conforme a configuração da operação.
*Fonte: Escopo 4.3 e 8. Sem taxa, prazo ou ideia de carteira, conforme a regra de comunicação do S1 Pay. Repasse programado está 🟢 e pode ser apresentado como capacidade.*

**S1 Ledger** · Cada valor / fica registrado.
Extrato da loja e da operação, relatório de repasse por período e taxa congelada no momento do pagamento. Os lançamentos não se apagam: uma correção entra como novo lançamento.
*Fonte: Escopo 4.3 e 8 (✅). Não é apresentado como contabilidade.*

**S1 Connect** · Seus sistemas / conversando com a loja.
Conectores com os ERPs Bling e Tiny e com Nuvemshop, Shopify e Tray, integração com o Mercado Livre e API com webhooks para o que for sob medida.
*Fonte: Escopo 7.2. Mercado Livre está 🟢 e, desde 24/09, pode ser dito como integração existente, sem demonstração e sem data. TOTVS e CDS não aparecem como conector.*

**S1 Trust** · Proteção / nas compras com cartão.
Listas de bloqueio por cliente, endereço, IP e dispositivo, conferidas antes de a compra com cartão seguir para o meio de pagamento. Funciona junto com o antifraude do próprio meio de pagamento.
*Fonte: Escopo 4.8 (✅). Só cartão, sem análise preditiva, conforme os limites honestos (seção 12).*

### 5 · Na prática · Mozaik (aguarda autorização)
- **Título:** Lojas de ótica / em uma só vitrine.
- **Apoio:** A Mozaik reúne o portfólio das óticas A Graciosa, Grand Optical e Oticalli, com o estoque das lojas por trás do site.
- **O desafio:** Levar para a internet o portfólio das lojas de ótica do grupo sem separar o estoque online da operação física.
- **Com o Super1:** O estoque das lojas alimenta o site. Cada loja despacha os pedidos da própria oferta, o sistema de gestão do grupo está integrado à plataforma e as etiquetas saem pelo S1 Envios com a Frenet.
- **O avanço:** espaço reservado, sem número.

*Fontes: contexto atual da Mozaik (s1_work/Empresas/_memory), Escopo 5.4 (envio pela loja ✅ Mozaik) e 7.2 (ERP por projeto ✅ Mozaik), reunião com a Frenet de 28/10 (etiquetas da Mozaik pela Frenet).*
**Para validar:** "O desafio" é uma leitura minha do contexto, não uma fala registrada do cliente. Confirmar com a Lílian. O avanço precisa de dado com fonte. O relato da reunião ("bate a meta do mês anterior") não serve como número publicável.

**Versão ilustrativa, sem nome, se a autorização não vier:**
- **Título:** Lojas físicas / vendendo em um só site.
- **Apoio:** Exemplo ilustrativo de uma operação com várias lojas físicas que passa a vender online.
- **O desafio:** Vender pela internet sem criar um estoque separado das lojas.
- **Com o Super1:** Cada loja vira estoque de apoio. O pedido sai da loja mais próxima do cliente ou da que tem o produto. Se faltar um item na separação, outra loja do grupo assume o envio. A etiqueta sai pela Frenet, e o valor de cada loja aparece no extrato.
- Sem bloco de avanço. Rótulo visível: Exemplo ilustrativo.

### 6 · Perguntas frequentes (opcional)
- **Preciso ter várias lojas para usar o Super1?** Não. A plataforma atende uma loja e também operações com filiais, franquias, revendas ou lojas parceiras. A avaliação mostra o que faz sentido para o seu caso.
- **Como o S1 Envios trabalha com a Frenet?** A operação administra frete, cotação, etiqueta e rastreio no Super1, com os Correios e as transportadoras pela Frenet. Estoque por endereço, origem do envio, retirada na loja e entrega própria são do S1 Envios.
- **Quais sistemas se conectam ao Super1?** Bling e Tiny têm conectores homologados. Nuvemshop, Shopify e Tray também se conectam, e outros ERPs podem ser integrados por projeto, pela API.
- **Quanto custa?** Depende do desenho da operação. Na avaliação gratuita, um especialista entende o seu cenário e apresenta a proposta.

### 7 · Contato
- **Título:** Conte / como sua operação vende hoje.
- **Apoio:** Um especialista do Super1 entende o seu cenário e mostra quais soluções fazem sentido para ele.
- **Botão:** Agende uma avaliação gratuita com especialista. Destino provisório: a própria seção.

### 8 · Rodapé
Logotipo negativo · Plataforma de e-commerce multilojas. · @super1oficial · Super1 · 2026
O slogan ficou de fora: o MIV 03.09 pede Guton e Libre Caslon, e não há arquivo vetorial oficial do slogan no acervo.

## Como o MIV foi aplicado

- **Tipografia:** só Google Sans Flex, com o arquivo real da biblioteca (OFL). Sem Guton, reservada pelo MIV 04.10 a títulos de apresentações. Isso também evita a restrição da licença da Guton em repositório público.
- **Quebra por sentido (04.14):** espaço inseparável depois de conectivos, preposições e artigos. Por extensão, também depois de determinantes que formam unidade com a palavra seguinte (cada, seu, sua, só, outra, própria, mesma, todas, sob). Produtos, "até 80%" e nomes próprios ficam juntos. A conferência mede a última palavra de cada linha renderizada nas três larguras.
- **Cor:** combinações aprovadas 014-M1 (abertura), I-03 (Como funciona), 014-NEG (case e contato). Corpo sempre em Preto. Lilás 70% só no destaque grande do título. Amarelo 50% só nas marcas de revisão, como cor de atenção (04.08).
- **Logotipos:** arquivos do acervo do MIV (capítulo 03): positivo com raio e numeral em Lilás 70% #7B68BD, negativo em Lilás 50%, assinaturas dos produtos com ícone sólido. Os arquivos da biblioteca vigente usam Lilás 50% no positivo e gradiente nos produtos, o que diverge do 03.02 e do 03.08.
- **Componentes (cap. 07):** cantos de 12, 24 e 48 px, botões em pílula, um botão principal por seção, foco visível, sem sombras.
- **Grafismos (cap. 06):** Ativo 5 preenchido na abertura e Ativo 1 em contorno no contato, um por quadro, sangrando pela borda e longe do texto.
- **Ícones:** família Lucide (cap. 08): store, map-pin, network, layout-grid.

**Divergências entre o MIV em desenvolvimento e as referências vigentes de Branding** (segui o MIV, a seu pedido):

| Tema | MIV R005 | Referências vigentes |
|---|---|---|
| Lilás como texto sobre claro | Lilás 70% #7B68BD | Purple deep #6B5CA5 |
| Positivo do logotipo | Raio e 1 em Lilás 70% | Raio e 1 em #B6A4FF |
| Proteção do logotipo | x, cerca de 0,40 da altura (proposta) | 1/3 da altura |
| Altura mínima do logotipo digital | 26 px | 120 px |
| Grifo serifado | Libre Caslon Condensed Medium Italic | Instrument Serif |
| Guton em landing page | Não (só títulos de apresentações) | Marca verbal, seção 7, ainda diz que sim |

## Pendências antes de publicar

1. **Destino do botão** (formulário, WhatsApp ou agenda): Lílian.
2. **Autorização da Mozaik** para nome, marcas das óticas, descrição e avanço observado, com dado e fonte: via Adriano e Lílian. Sem ela, entra a versão ilustrativa.
3. **Logotipo da Frenet:** pedir arquivo e manual ao Evandro e aplicar a convivência 03.11 (2x). Até lá, a Frenet aparece só em texto.
4. **Conta Frenet do cliente:** quem já tem conta na Frenet usa a própria conta no S1 Envios? Confirmar com produto antes de afirmar algo na página ou nas perguntas.
5. **Rastreio:** combinar com o Evandro como o link entra no marketplace (UTM ou parâmetro próprio). A página já repassa `utm_*` e `ref` da URL ao link do botão. Falta escolher a ferramenta de análise e testar visitas e contatos antes de enviar a URL.
6. **Publicação pelo GitHub:** definir repositório (privado ou público) e domínio. Gerar WOFF2 com subconjunto da Google Sans Flex: o TTF completo deixa a página com 5,3 MB, e o README da fonte pede subconjunto para web. Isso exige instalar fonttools e brotli, com sua autorização. Retirar as marcas de revisão (elementos `data-revisao`) e o `noindex`.
7. **Registro no Drive:** depois da aprovação, copiar o conjunto para `s1_work/Marketing/Parcerias/Frenet`, no padrão da pasta Nuvemshop, se quiser manter o histórico lá.

## Fontes consultadas

AGENTS, README e s1-hub (Drive) · MIV 2.0 local R005 · s1-marketing-pecas-visuais e checklist 09 · Branding - Posicionamento e mensagem · Branding - Marca verbal · B1 - Plataforma - Escopo do produto v4.1 · reunião Super1 <> Frenet de 28/10/2026 e tarefa TSK-1110 (Notion) · EMP-12 Mozaik current_context (s1_work) · Conteudo/Provas/README · ativos em Marketing/Branding/assets e no acervo do MIV 2027 (capítulo 03).
