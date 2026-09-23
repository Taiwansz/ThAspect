# ThAspect

E-commerce oficial e sistema de identidade visual da ThAspect — streetwear contemporaneo construido a partir de perspectiva, angulos, movimento e expressao individual.

## Brand Core

- **Conceito:** Moda tambem e perspectiva.
- **Assinatura:** Find Another Side of You.
- **Paleta Oficial:** Charcoal (#1F1F1F), Off White (#FAF8F3), Sand (#E8DFD1), Cobalt (#0057FF), Orange (#FF6A00).
- **Estetica:** Urbana, angular (12°, 24°, 30°, 45°), expressiva, contemporanea e visualmente direcional.

---

## Arquitetura da Aplicacao Web (Next.js 15)

O website foi reconstruido integralmente como uma plataforma e-commerce moderna com arquitetura App Router em Next.js 15, TypeScript e Tailwind CSS v4, pronta para deploy imediato na Vercel.

### Componentes e Modulos

- `app/` — Rotas, layout raiz com injecao de fontes oficiais (Montserrat para titulos e Inter para interface), metadata SEO e OpenGraph.
- `components/Header.tsx` — Navegacao sticky, barra de anuncios em perspectiva, busca rapida e acionador da sacola com contador dinamico.
- `components/Hero.tsx` — Painel hero arquitetonico baseado na composicao oficial com controle interativo de angulos de observacao (12°, 24°, 30°, 45°).
- `components/PerspectiveMarquee.tsx` — Faixa continua inclinada com os manifestos nucleares da marca.
- `components/ProductCatalog.tsx` — Catalogo completo com filtros de categoria (Camisetas, Hoodies, Calcas, Acessorios), ordenacao, selecao de tamanhos, cards com gestos de perspectiva e modal de inspecao tecnica.
- `components/PerspectiveViewer.tsx` — Laboratorio optico interativo com simulador de angulos 3D (0° Frontal, 24° Canonico, 45° Anamorfico, Macro) e telemetria de visualizacao.
- `components/HeritageSection.tsx` — Homenagem e documentacao da linhagem tecnica V1 (ThAspectDB SQL e origens no CS-Vault).
- `components/CartDrawer.tsx` — Gaveta lateral de sacola de compras com controle de itens, validacao de cupons (`THASPECT10`, `PERSPECTIVA`, `V1ORIGEM`) e simulacao de checkout aderente ao schema de clientes.
- `components/Footer.tsx` — Rodape editorial com manifesto de marca, links, captura de newsletter e creditos tecnicos.
- `context/CartContext.tsx` — Gerenciador reativo de estado da sacola persistido em localStorage.
- `data/products.ts` — Base de produtos tipados com precos, cortes, gramaturas e caminhos visuais.

---

## Estrutura do Repositorio

```
ThAspect/
├── app/                              # Next.js App Router (Layout, Page, Styles)
├── components/                       # Componentes de interface e e-commerce
├── context/                          # Estado global de carrinho e cupons
├── data/                             # Catalogo de produtos e cupons validos
├── public/                           # Assets estaticos publicos e branding SVG
├── branding/                         # Brand Guide e assets canônicos
│   ├── brand-guide/                  # Diretrizes de cor, tipografia e logo
│   ├── logos/                        # Familia oficial de logotipos em SVG
│   ├── graphics/                     # Formas angulares e padroes geometricos
│   ├── icons/                        # Iconografia proprietaria
│   └── templates/                    # Modelos editoriais e comerciais
├── v1/                               # Primeira versao historica (CS-Vault-2026)
│   ├── ThAspectbd.sql                # Schema DDL do MySQL
│   ├── ThAspect - DER.pdf            # Diagrama Entidade-Relacionamento
│   ├── DOCUMENTACAO THASPECT.pdf     # Documentacao funcional e MVP Flask
│   └── ThAspect.pdf                  # Analise formal de requisitos
├── .agents/skills/thaspect-brand/    # Skill e regras de marca para agentes
└── README.md
```

---

## Como Executar Localmente

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento (http://localhost:3000)
npm run dev

# Executar verificacao estrita de tipos TypeScript
npm run typecheck

# Compilar versao de producao otimizada
npm run build
```

---

## Deploy na Vercel

A aplicacao esta configurada para publicacao automatica na Vercel:

1. Conecte o repositorio `Taiwansz/ThAspect` ao painel da Vercel.
2. O framework preset sera detectado automaticamente como **Next.js**.
3. Comando de build: `npm run build` (ou `next build`).
4. Diretorio de saida: `.next`.
5. Nao ha variaveis de ambiente obrigatorias para o build inicial de demonstracao.
