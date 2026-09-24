export interface Product {
  id: string;
  name: string;
  category: "camisetas" | "hoodies" | "calcas" | "acessorios";
  collection: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  sizes: string[];
  colorName: string;
  colorHex: string;
  badge?: string;
  featured?: boolean;
  angleView: {
    frontal: string;
    angular: string;
    dorsal: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Camiseta Preta Aviador",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 189.0,
    originalPrice: 220.0,
    description: "Camiseta streetwear premium oversized confeccionada em algodao penteado 260g/m2. Recorte angular de 24 graus nas costuras laterais e estampagem em serigrafia de alta densidade.",
    details: [
      "100% Algodao brasileiro pesado (260g/m2)",
      "Modelagem oversized arquitetonica",
      "Gola canelada de 3cm com reforco ombro a ombro",
      "Etiqueta de autenticidade ThAspect na barra"
    ],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Mais Vendido",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-02",
    name: "Camiseta Clara New York Fashion",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 199.0,
    description: "Tonalidade Off White exclusiva (#FAF8F3). Tipografia frontal experimental e coordenadas geograficas com estetica minimalista e angular.",
    details: [
      "100% Algodao premium pre-encolhido",
      "Costura reforcada e acabamento com pesponto duplo",
      "Arte geométrica inspirada em arquitetura brutalista",
      "Lavagem stone washed com toque macio"
    ],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Off White",
    colorHex: "#FAF8F3",
    badge: "Novo",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-03",
    name: "Camiseta Streetwear Prison",
    category: "camisetas",
    collection: "Edicao Limitada · Break The Silence",
    price: 219.0,
    description: "Design de ruptura. Tipografia distorcida sobre malha densa, traduzindo a tensao entre confinamento e perspectiva urbana.",
    details: [
      "Algodao fio 20.1 penteado",
      "Estampa dorsal em quadricromia com toque zero",
      "Corte quadrado boxy fit com ombros descaidos",
      "Tiragem numerada e limitada"
    ],
    sizes: ["M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Limitado",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-04",
    name: "Camiseta Ghost Spin",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 199.0,
    originalPrice: 230.0,
    description: "Cromatica assinada com acento Cobalt (#0057FF) e micro-detalhe Orange (#FF6A00). Um manifesto em movimento sobre o conceito de que o mesmo objeto muda conforme o observador.",
    details: [
      "Tecido respiravel de alta gramatura",
      "Arte visual com aplicacao de foil e serigrafia",
      "Decote careca estruturado",
      "Desenvolvida para durabilidade extrema"
    ],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Cobalt Acento",
    colorHex: "#0057FF",
    badge: "Iconico",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-05",
    name: "Hoodie Horizon Angle Sand",
    category: "hoodies",
    collection: "Winter Cut · Architectural",
    price: 389.0,
    originalPrice: 440.0,
    description: "Moletom 3 cabos 420g/m2 felpado na tonalidade Sand (#E8DFD1). Capuz duplo de alta armacao sem cordoes para silhueta pura e arquitetonica.",
    details: [
      "Algodao e poliester reciclado de alta retencao termica",
      "Bolso canguru com entradas angulares cortadas a laser",
      "Punhos e barras em ribana canelada 2x1 com elastano",
      "Bordado tonal sutil do monograma ThAspect no peito"
    ],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Sand",
    colorHex: "#E8DFD1",
    badge: "Inverno",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-06",
    name: "Hoodie Charcoal Perspective",
    category: "hoodies",
    collection: "Winter Cut · Architectural",
    price: 419.0,
    description: "A expressao maxima do streetwear ThAspect. Moletom preto estruturado com corte reto e painel traseiro com a logo em perspectiva anamorfica.",
    details: [
      "Malha grossa 450g/m2 com interior aveludado",
      "Capuz estruturado anatomico de 3 paineis",
      "Costuras tridimensionais nas costas",
      "Etiqueta de borracha termocolante na manga esquerda"
    ],
    sizes: ["M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    featured: false,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-07",
    name: "Calca Cargo Perspective Tech",
    category: "calcas",
    collection: "Technical Line · 2026",
    price: 349.0,
    description: "Calca tecnica em sarja acetinada com elastano. Bolsos utilitarios dispostos em diagonais ergonomicas de 24 graus para facil acesso e perfil aerodinamico.",
    details: [
      "Sarja 98% algodao e 2% elastano de alta resistencia",
      "6 bolsos estrategicos com fecho magnetico e ziper invertido",
      "Ajuste duplo na barra com reguladores de pressao",
      "Cintura elastica com cordao interno personalizado"
    ],
    sizes: ["38", "40", "42", "44"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Tecnico",
    featured: false,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-08",
    name: "Shoulder Bag Transversal Cobalt",
    category: "acessorios",
    collection: "Hardware Series",
    price: 159.0,
    description: "Bolsa transversal compacta em Cordura 500D com vivo em Cobalt Blue. Fita acetinada regulavel de 40mm com fivela de engate rapido industrial.",
    details: [
      "Tecido impermeavel de altissima resistencia a abrasao",
      "Ziper selado YKK contra chuva e poeira",
      "Compartimento interno acolchoado para smartphone",
      "Mosquetao giratorio em metal fosco escurecido"
    ],
    sizes: ["UNICO"],
    colorName: "Cobalt / Charcoal",
    colorHex: "#0057FF",
    badge: "Acessorio",
    featured: true,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  },
  {
    id: "prod-09",
    name: "Bone 5-Panel ThAspect Monogram",
    category: "acessorios",
    collection: "Hardware Series",
    price: 139.0,
    description: "Bone formato 5-panel em sarja de algodao peletizado. Aba reta com costuras paralelas e fecho traseiro strapback em couro com fecho metalico gravado a laser.",
    details: [
      "Estrutura desconstruida de perfil medio",
      "Ilhoses bordados para ventilacao ativa",
      "Bordado frontal frontal em relevo 3D",
      "Fita interna absorvente antitranspirante"
    ],
    sizes: ["UNICO"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    featured: false,
    angleView: {
      frontal: "/brand/templates/product-card-1200.svg",
      angular: "/brand/templates/hangtag-600x1000.svg",
      dorsal: "/brand/templates/social-post-1080.svg"
    }
  }
];

export const VALID_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  "THASPECT10": { discountPercent: 10, description: "Desconto de boas-vindas ThAspect (10%)" },
  "PERSPECTIVA": { discountPercent: 15, description: "Cupom de lancamento de perspectiva (15%)" },
  "V1ORIGEM": { discountPercent: 20, description: "Desconto historico comunidade CS-Vault V1 (20%)" },
};
