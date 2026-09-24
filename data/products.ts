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

const photo = (id: string) => `/products/${id}.jpg`;

export const PRODUCTS: Product[] = [
  {
    id: "prod-01",
    name: "Camiseta Perspective Charcoal",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 189,
    originalPrice: 220,
    description: "Camiseta oversized em algodão pesado com assinatura ThAspect e recortes gráficos Cobalt e Orange.",
    details: ["Algodão penteado 260g/m²", "Modelagem oversized", "Gola canelada reforçada", "Etiqueta ThAspect aplicada"],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Mais vendido",
    featured: true,
    angleView: { frontal: photo("prod-01"), angular: photo("prod-01"), dorsal: photo("prod-01") }
  },
  {
    id: "prod-02",
    name: "Camiseta Angle Off White",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 199,
    description: "Off White com composição gráfica angular, proporção oversized e acabamento de alta densidade.",
    details: ["Algodão premium pré-encolhido", "Pesponto duplo", "Arte geométrica proprietária", "Toque macio"],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Off White",
    colorHex: "#FAF8F3",
    badge: "Nova",
    featured: true,
    angleView: { frontal: photo("prod-02"), angular: photo("prod-02"), dorsal: photo("prod-02") }
  },
  {
    id: "prod-03",
    name: "Camiseta Back Perspective",
    category: "camisetas",
    collection: "Drop 01 · Perspective",
    price: 219,
    description: "Peça de costas marcantes, tipografia vertical e blocos Cobalt e Orange construídos a partir de novos ângulos.",
    details: ["Algodão pesado", "Estampa traseira em alta definição", "Boxy fit", "Tiragem limitada"],
    sizes: ["M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Limitada",
    featured: true,
    angleView: { frontal: photo("prod-03"), angular: photo("prod-03"), dorsal: photo("prod-03") }
  },
  {
    id: "prod-04",
    name: "Camiseta Core Logo",
    category: "camisetas",
    collection: "Core Series",
    price: 199,
    originalPrice: 230,
    description: "A assinatura principal ThAspect em uma camiseta preta limpa, direta e fácil de combinar.",
    details: ["Algodão respirável", "Serigrafia de alta densidade", "Decote estruturado", "Acabamento premium"],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Core",
    featured: true,
    angleView: { frontal: photo("prod-04"), angular: photo("prod-04"), dorsal: photo("prod-04") }
  },
  {
    id: "prod-05",
    name: "Hoodie Horizon Sand",
    category: "hoodies",
    collection: "Winter Cut · Architectural",
    price: 389,
    originalPrice: 440,
    description: "Moletom Sand de alta gramatura com logo frontal e construção visual inspirada em arquitetura brutalista.",
    details: ["Moletom 420g/m²", "Capuz estruturado", "Bolso canguru", "Etiqueta emborrachada"],
    sizes: ["P", "M", "G", "GG"],
    colorName: "Sand",
    colorHex: "#E8DFD1",
    badge: "Inverno",
    featured: true,
    angleView: { frontal: photo("prod-05"), angular: photo("prod-05"), dorsal: photo("prod-05") }
  },
  {
    id: "prod-06",
    name: "Hoodie Vision Charcoal",
    category: "hoodies",
    collection: "Winter Cut · Architectural",
    price: 419,
    description: "Hoodie preto estruturado com assinatura frontal e estética limpa para uma silhueta urbana de alto impacto.",
    details: ["Malha grossa 450g/m²", "Capuz de 3 painéis", "Costuras reforçadas", "Acabamento interno aveludado"],
    sizes: ["M", "G", "GG"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Destaque",
    featured: true,
    angleView: { frontal: photo("prod-06"), angular: photo("prod-06"), dorsal: photo("prod-06") }
  },
  {
    id: "prod-07",
    name: "Calça Cargo Aspect",
    category: "calcas",
    collection: "Technical Line · 2026",
    price: 349,
    description: "Cargo técnica com bolsos utilitários, costuras angulares e detalhes funcionais em Cobalt e Orange.",
    details: ["Sarja resistente", "6 bolsos funcionais", "Fechos reforçados", "Modelagem ampla"],
    sizes: ["38", "40", "42", "44"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Técnica",
    featured: true,
    angleView: { frontal: photo("prod-07"), angular: photo("prod-07"), dorsal: photo("prod-07") }
  },
  {
    id: "prod-08",
    name: "Shoulder Bag Perspective",
    category: "acessorios",
    collection: "Hardware Series",
    price: 159,
    description: "Bolsa transversal compacta com painéis em Off White, Cobalt e Orange e construção utilitária.",
    details: ["Tecido de alta resistência", "Zíper selado", "Compartimentos internos", "Alça regulável"],
    sizes: ["ÚNICO"],
    colorName: "Charcoal / Cobalt",
    colorHex: "#0057FF",
    badge: "Acessório",
    featured: true,
    angleView: { frontal: photo("prod-08"), angular: photo("prod-08"), dorsal: photo("prod-08") }
  },
  {
    id: "prod-09",
    name: "Boné Angle 5-Panel",
    category: "acessorios",
    collection: "Hardware Series",
    price: 139,
    description: "Boné preto com monograma angular bordado e acabamento discreto ThAspect na lateral.",
    details: ["5-panel", "Bordado frontal 3D", "Fecho ajustável", "Fita interna antitranspirante"],
    sizes: ["ÚNICO"],
    colorName: "Charcoal",
    colorHex: "#1F1F1F",
    badge: "Novo",
    featured: true,
    angleView: { frontal: photo("prod-09"), angular: photo("prod-09"), dorsal: photo("prod-09") }
  }
];

export const VALID_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  THASPECT10: { discountPercent: 10, description: "Desconto de boas-vindas ThAspect (10%)" },
  PERSPECTIVA: { discountPercent: 15, description: "Cupom de lançamento Perspective (15%)" },
  V1ORIGEM: { discountPercent: 20, description: "Desconto comunidade V1 (20%)" }
};
