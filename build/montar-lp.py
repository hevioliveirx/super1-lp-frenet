"""Monta a LP da Super1 para o Marketplace de Serviços da Frenet.

Lê fonte/lp.html, embute os ativos reais da Super1 Base (fonte, logotipos,
assinaturas dos produtos e grafismos) e aplica a regra fixa 04.14 do MIV
(quebra por sentido) somente nos nós de texto do corpo.

Uso: python -I build/montar-lp.py
"""
import base64
import pathlib
import re
import sys

VERSAO = "v0.5 · 2026/11/13"
SAIDA = "Super1-LP-Frenet-v0.5.html"
DESTINO_CTA = "#contato"  # canal de destino a definir com a Lílian

RAIZ = pathlib.Path(__file__).resolve().parent.parent
BASE = pathlib.Path(r"G:\Drives compartilhados\s1_base\Marketing\Branding")
ASSETS = BASE / "assets"
MIV_LOGOS = BASE / "_desenvolvimento" / "MIV 2027" / "Capitulo-03 - aguardando revisao e aprovacao" / "logotipos" / "svg"

FONTE_GSF = ASSETS / "fontes" / "Google-Sans-Flex" / "GoogleSansFlex-Variable.ttf"
LOGO_POSITIVO = MIV_LOGOS / "Super1-positivo-Purple-7B68BD.svg"   # MIV 03.02: raio e 1 em Lilás 70%
LOGO_NEGATIVO = MIV_LOGOS / "Super1-negativo-Purple-B6A4FF.svg"   # MIV 03.02: raio e 1 em Lilás 50%
GRAFISMOS = ASSETS / "grafismos" / "svg"
# Logo de parceiro baixado com autorização de Hevelyn em 2026-11-13 (rodapé de frenet.com.br).
# Validar com o manual da Frenet antes de publicar.
PARCEIROS = {"frenet": RAIZ / "ativos-parceiro" / "frenet-logo-rebrading.svg"}

# MIV 04.14: abrem a linha seguinte (lista do manual e flexões diretas)
CONECTIVOS = (
    "e ou mas que de do da dos das em no na nos nas com para por pelo pela pelos pelas "
    "sem entre o a os as um uma uns umas ao aos à às como quando não "
    # extensão no mesmo sentido: determinantes que formam unidade com a palavra seguinte
    "sob cada seu sua seus suas só outra outro outras outros própria próprio próprias próprios mesma mesmo todas todos"
).split()
# MIV 04.14: ficam na mesma linha
JUNTOS = [
    "S1 Envios", "S1 Pay", "S1 Ledger", "S1 Connect", "S1 Trust", "até 80%",
    "J&amp;T Express", "Total Express", "Grand Optical", "A Graciosa", "Mercado Livre",
    "quem gerencia", "quem vende", "quem compra",
]
NBSP = "\u00a0"


def ler(p: pathlib.Path) -> str:
    if not p.exists():
        sys.exit(f"Ativo não encontrado: {p}")
    return p.read_text(encoding="utf-8")


def limpar_svg(svg: str) -> str:
    svg = re.sub(r"<\?xml.*?\?>", "", svg, flags=re.S)
    svg = re.sub(r"<!DOCTYPE.*?>", "", svg, flags=re.S)
    svg = re.sub(r"<!--.*?-->", "", svg, flags=re.S)
    return svg.strip()


def estilos_em_atributos(svg: str) -> str:
    """Troca classes de <style> por fill inline, para não vazar CSS global."""
    mapa = {}
    for bloco in re.findall(r"<style[^>]*>(.*?)</style>", svg, flags=re.S):
        for seletores, corpo in re.findall(r"([^{}]+)\{([^}]*)\}", bloco):
            fill = re.search(r"fill\s*:\s*([^;]+)", corpo)
            for sel in seletores.split(","):
                sel = sel.strip()
                if sel.startswith(".") and fill:
                    mapa[sel[1:]] = fill.group(1).strip()
    svg = re.sub(r"<defs>\s*<style[^>]*>.*?</style>\s*</defs>", "", svg, flags=re.S)
    svg = re.sub(r"<style[^>]*>.*?</style>", "", svg, flags=re.S)

    def troca(m):
        classe = m.group(1)
        return f'fill="{mapa[classe]}"' if classe in mapa else ""
    return re.sub(r'class="([^"]+)"', troca, svg)


def raiz_svg(svg: str, atributos: str) -> str:
    """Remove width, height e id da tag raiz e acrescenta os atributos dados."""
    m = re.search(r"<svg\b[^>]*>", svg)
    tag = m.group(0)
    nova = re.sub(r'\s(width|height|id|data-name|role|aria-labelledby)="[^"]*"', "", tag)
    nova = nova[:-1].rstrip() + " " + atributos + ">"
    return svg.replace(tag, nova, 1)


def logotipo(caminho: pathlib.Path) -> str:
    svg = estilos_em_atributos(limpar_svg(ler(caminho)))
    svg = re.sub(r'\sid="[^"]*"', "", svg)
    return raiz_svg(svg, 'aria-hidden="true" focusable="false"')


def produto(nome: str) -> str:
    svg = limpar_svg(ler(MIV_LOGOS / f"{nome}.svg"))
    svg = re.sub(r"<title.*?</title>|<desc.*?</desc>|<metadata.*?</metadata>", "", svg, flags=re.S)
    svg = re.sub(r'\sid="[^"]*"', "", svg)
    rotulo = re.match(r"S1-[A-Za-z]+", nome).group(0).replace("-", " ")
    return raiz_svg(svg, f'role="img" aria-label="{rotulo}" focusable="false"')


_instancias = {}


def parceiro(nome: str) -> str:
    """Logo de parceiro intacto, com ids renomeados a cada uso para não repetir na página."""
    svg = limpar_svg(ler(PARCEIROS[nome]))
    if re.search(r"<script|<foreignObject|\son\w+=", svg, flags=re.I):
        sys.exit(f"Logo de parceiro com conteúdo ativo: {nome}")
    n = _instancias[nome] = _instancias.get(nome, 0) + 1
    for antigo in set(re.findall(r'\sid="([^"]+)"', svg)):
        novo = f"{nome}-{n}-{antigo}"
        svg = svg.replace(f'id="{antigo}"', f'id="{novo}"').replace(f"url(#{antigo})", f"url(#{novo})")
    return raiz_svg(svg, f'role="img" aria-label="{nome.capitalize()}" focusable="false"')


def grafismo(nome: str) -> str:
    svg = limpar_svg(ler(GRAFISMOS / f"{nome}.svg"))
    svg = re.sub(r"<defs>.*?</defs>", "", svg, flags=re.S)
    svg = re.sub(r'\s(id|data-name|class|fill|style)="[^"]*"', "", svg)
    return raiz_svg(svg, 'aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"')


def quebra_por_sentido(texto: str) -> str:
    for termo in JUNTOS:
        texto = texto.replace(termo, termo.replace(" ", NBSP))
    texto = texto.replace("e-commerce", '<span class="nw">e-commerce</span>')
    padrao = r"(?<![\w\u00C0-\u017F&-])(" + "|".join(map(re.escape, CONECTIVOS)) + r") (?=\S)"
    return re.sub(padrao, lambda m: m.group(1) + NBSP, texto, flags=re.I)


def ultimo_espaco_fora_de_tag(texto: str) -> int:
    dentro = False
    for k in range(len(texto) - 1, -1, -1):
        c = texto[k]
        if c == ">":
            dentro = True
        elif c == "<":
            dentro = False
        elif c == " " and not dentro:
            return k
    return -1


def em_titulo(partes, i) -> bool:
    """Verdadeiro se o texto está dentro de h1, h2 ou h3 (títulos têm menos caracteres por linha)."""
    for j in range(i - 1, -1, -1):
        m = re.match(r"<(/?)(h1|h2|h3|p|li|summary)\b", partes[j] or "")
        if m:
            return m.group(1) == "" and m.group(2) in ("h1", "h2", "h3")
    return False


def processar_corpo(html: str) -> str:
    inicio = html.index("<body")
    cabeca, corpo = html[:inicio], html[inicio:]
    partes = re.split(r"(<script\b.*?</script>|<style\b.*?</style>|<!--.*?-->|<[^>]+>)", corpo, flags=re.S)
    for i, parte in enumerate(partes):
        if parte and not parte.startswith("<"):
            partes[i] = quebra_por_sentido(parte)
    # 04.14, R007, prioridade 2: nenhuma palavra fica sozinha no fim do bloco
    for i in range(len(partes) - 1):
        texto, seguinte = partes[i], partes[i + 1]
        if texto and not texto.startswith("<") and re.match(r"</(p|h1|h2|h3|li|summary|span|strong)>", seguinte or ""):
            corpo = texto.rstrip()
            k = ultimo_espaco_fora_de_tag(corpo)
            visivel = re.sub(r"<[^>]+>", "", corpo).split(" ")
            # só cola quando a última palavra está solta e o trecho unido continua curto
            limite = 18 if em_titulo(partes, i) else 28
            if k > 0 and NBSP not in corpo[k + 1:] and len(visivel) > 1 and len(visivel[-2]) + len(visivel[-1]) <= limite:
                partes[i] = corpo[:k] + NBSP + corpo[k + 1:] + texto[len(corpo):]
    return cabeca + "".join(partes)


def main():
    html = ler(RAIZ / "fonte" / "lp.html")
    html = processar_corpo(html)

    html = html.replace("{{VERSAO}}", VERSAO).replace("{{DESTINO_CTA}}", DESTINO_CTA)
    html = html.replace("{{FONT_GSF}}", base64.b64encode(FONTE_GSF.read_bytes()).decode("ascii"))
    html = html.replace("{{LOGO_POSITIVO}}", logotipo(LOGO_POSITIVO))
    html = html.replace("{{LOGO_NEGATIVO}}", logotipo(LOGO_NEGATIVO))
    raio = re.search(r' d="([^"]+)"', ler(MIV_LOGOS / "Simbolo-Purple-7B68BD.svg")).group(1)  # símbolo oficial, só a geometria
    html = html.replace("{{RAIO_D}}", raio)
    html = re.sub(r"\{\{PRODUTO:([^}]+)\}\}", lambda m: produto(m.group(1)), html)
    html = re.sub(r"\{\{GRAFISMO:([^}]+)\}\}", lambda m: grafismo(m.group(1)), html)
    html = re.sub(r"\{\{PARCEIRO:([^}]+)\}\}", lambda m: parceiro(m.group(1)), html)

    restantes = re.findall(r"\{\{[^}]+\}\}", html)
    if restantes:
        sys.exit(f"Marcadores sem ativo: {sorted(set(restantes))}")

    destino = RAIZ / SAIDA
    destino.write_text(html, encoding="utf-8")
    print(f"OK {destino} ({destino.stat().st_size / 1_000_000:.1f} MB)")


if __name__ == "__main__":
    main()
