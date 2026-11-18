import { MenuCategoryId, MenuItem, PizzaAddonOption, PizzaSizeOption } from '../types/menu';

export const PIZZERIA_CONFIG = {
  brand: {
    name: 'Forno da Vila',
    tagline: 'Pizzaria Artesanal',
    city: 'Curitiba, Paraná',
    neighborhoodLabel: 'Vila Nova · Curitiba/PR',
    demoAttribution: 'Projeto demonstrativo · LG Business',
    demoFullNotice:
      'Projeto demonstrativo criado para apresentar uma experiência digital de cardápio e pedidos via WhatsApp pela LG Business. Endereços, telefones, horários e avaliações são ilustrativos.',
  },
  theme: {
    colors: {
      cream: '#FAF6F0',
      ivory: '#FFFDF9',
      linen: '#F2ECE1',
      charcoal: '#1E1B18',
      charcoalMuted: '#5A534A',
      tomato: '#C83E2B',
      tomatoDark: '#A93120',
      olive: '#4A5D3F',
    },
  },
  whatsapp: {
    // Deixe vazio ('') para exibir apenas a prévia e botão de copiar na demonstração,
    // ou preencha no formato DDI + DDD + Número (ex: '5541999990000').
    defaultNumber: '',
    displayPlaceholder: 'Não configurado (modo demonstração)',
  },
  delivery: {
    fee: 9.0,
    estimatedMinutes: '35 a 50 min',
    pickupEstimatedMinutes: '20 a 30 min',
    coverageNote: 'Raio demonstrativo de até 6 km a partir da região central de Curitiba.',
  },
  contact: {
    address: 'Rua das Araucárias, 412 — Vila Nova, Curitiba/PR',
    addressNote: 'Endereço fictício para demonstração',
    phoneDisplay: '(41) 3000-0412 (ilustrativo)',
    emailDisplay: 'atendimento@fornodavila-exemplo.com.br',
    instagramHandle: '@fornodavila.exemplo',
    hours: [
      { days: 'Terça a Quinta', time: '18h30 às 23h00' },
      { days: 'Sexta e Sábado', time: '18h30 às 23h45' },
      { days: 'Domingo', time: '18h30 às 22h45' },
      { days: 'Segunda-feira', time: 'Fechado para descanso da massa' },
    ],
  },
  hero: {
    kicker: 'Curitiba · Fermentação natural de 48h',
    headline: 'Pizza artesanal, feita para compartilhar',
    subheadline:
      'Massa leve de longa maturação, molho de tomate pelati preparado na casa e assamento em alta temperatura. Escolha os sabores, personalize do seu jeito e envie o pedido direto pelo WhatsApp.',
    image: '/src/assets/images/hero_forno_pizza_1795009253058.jpg',
    imageAlt: 'Pizza artesanal recém-saída do forno a lenha sobre pá de madeira rústica',
  },
  highlights: [
    {
      index: '01',
      title: 'Massa de fermentação lenta',
      description:
        'Maturação controlada por 48 horas com farinha selecionada, resultando em borda aerada, crocante por fora e macia por dentro.',
    },
    {
      index: '02',
      title: 'Ingredientes selecionados',
      description:
        'Tomates pelati italianos, mozzarella fior di latte fresca, azeite extravirgem e embutidos cortados no dia do serviço.',
    },
    {
      index: '03',
      title: 'Pedido simples pelo WhatsApp',
      description:
        'Sem cadastros longos nem taxas extras de aplicativo: você monta o pedido no cardápio e envia o resumo organizado em um toque.',
    },
  ],
  about: {
    kicker: 'Nossa cozinha',
    title: 'Do descanso da massa ao calor do forno',
    paragraphs: [
      'A Forno da Vila nasce da ideia de unir a técnica das massas italianas de longa fermentação ao acolhimento das mesas curitibanas. Cada disco é aberto à mão na hora do pedido para preservar as bolhas de ar formadas durante o descanso frio.',
      'Trabalhamos com um cardápio enxuto, sazonal e pensado para chegar à sua mesa com equilíbrio entre acidez do tomate, frescor das ervas e leveza da massa.',
    ],
    demoCaption:
      'História e conceito gastronômico fictícios elaborados como projeto demonstrativo comercial.',
    image: '/src/assets/images/forno_fermentacao_lenta_1795009255550.jpg',
    imageAlt: 'Mãos de pizzaiolo abrindo massa artesanal de fermentação lenta sobre bancada de mármore',
  },
  reviews: {
    kicker: 'Exemplos visuais · Avaliações fictícias',
    title: 'Como o cardápio se apresenta aos seus clientes',
    disclaimer:
      'Os depoimentos abaixo são exemplos ilustrativos e fictícios para demonstração de layout.',
    items: [
      {
        id: 'rev-1',
        author: 'Mariana C.',
        neighborhood: 'Batel · Exemplo fictício',
        orderNote: 'Pediu Margherita Verace e Burrata',
        quote:
          'Massa extremamente leve, borda tostada na medida certa e entrega antes do horário previsto. O pedido pelo WhatsApp foi direto e sem complicação.',
      },
      {
        id: 'rev-2',
        author: 'Rafael T.',
        neighborhood: 'Água Verde · Exemplo fictício',
        orderNote: 'Pediu Calabresa da Casa e Quatro Queijos',
        quote:
          'Conseguimos escolher o tamanho certo para cada sabor e adicionar borda recheada direto na página antes de enviar a mensagem.',
      },
      {
        id: 'rev-3',
        author: 'Camila & Lucas',
        neighborhood: 'Bigorrilho · Exemplo fictício',
        orderNote: 'Retirada no balcão',
        quote:
          'A opção de retirada com horário estimado facilitou muito no sábado à noite. Tudo veio bem embalado e ainda quente.',
      },
    ],
  },
} as const;

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'todas', label: 'Todo o cardápio' },
  { id: 'classicas', label: 'Pizzas Clássicas' },
  { id: 'especiais', label: 'Especiais' },
  { id: 'vegetarianas', label: 'Vegetarianas' },
  { id: 'acompanhamentos', label: 'Acompanhamentos' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'sobremesas', label: 'Sobremesas' },
];

export const PIZZA_SIZES: PizzaSizeOption[] = [
  {
    id: 'individual',
    label: 'Individual',
    diameter: '25 cm',
    slices: 4,
    priceDelta: -14,
  },
  {
    id: 'media',
    label: 'Média',
    diameter: '30 cm',
    slices: 6,
    priceDelta: 0,
  },
  {
    id: 'grande',
    label: 'Grande',
    diameter: '35 cm',
    slices: 8,
    priceDelta: 16,
  },
];

export const PIZZA_ADDONS: PizzaAddonOption[] = [
  { id: 'borda-catupiry', name: 'Borda recheada de requeijão cremoso', price: 12 },
  { id: 'extra-fior', name: 'Extra de mozzarella fior di latte', price: 9 },
  { id: 'burrata-centro', name: 'Burrata fresca no centro (100g)', price: 18 },
  { id: 'rucula-parmesao', name: 'Rúcula selvagem com lascas de parmesão', price: 8 },
  { id: 'mel-picante', name: 'Fio de mel picante artesanal', price: 5 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'margherita-verace',
    name: 'Margherita Verace',
    description:
      'Molho de tomate pelati san marzano, mozzarella fior di latte fresca, folhas de manjericão e azeite extravirgem.',
    category: 'classicas',
    categoryLabel: 'Pizzas Clássicas',
    basePrice: 58,
    isPizza: true,
    isVegetarian: true,
    highlightTag: 'Favorita da casa',
    image: '/src/assets/images/pizza_margherita_classica_1795009252761.jpg',
    imageAlt: 'Pizza Margherita Verace artesanal com manjericão fresco e borda tostada',
    allowAddons: true,
  },
  {
    id: 'calabresa-da-casa',
    name: 'Calabresa da Casa',
    description:
      'Calabresa curada fatiada fina, cebola roxa caramelizada, azeitonas pretas, orégano fresco e mozzarella sobre base de tomate.',
    category: 'classicas',
    categoryLabel: 'Pizzas Clássicas',
    basePrice: 62,
    isPizza: true,
    highlightTag: 'Mais pedida',
    image: '/src/assets/images/pizza_calabresa_artesanal_1795009253940.jpg',
    imageAlt: 'Pizza de Calabresa artesanal com cebola roxa caramelizada e azeitonas pretas',
    allowAddons: true,
  },
  {
    id: 'portuguesa-artesanal',
    name: 'Portuguesa Artesanal',
    description:
      'Presunto cozido artesanal, ovos caipiras, cebola roxa em lâminas, ervilha fresca, azeitonas pretas e mozzarella.',
    category: 'classicas',
    categoryLabel: 'Pizzas Clássicas',
    basePrice: 64,
    isPizza: true,
    image: '/src/assets/images/pizza_calabresa_artesanal_1795009253940.jpg',
    imageAlt: 'Pizza Portuguesa artesanal servida em prato de cerâmica rústica',
    allowAddons: true,
  },
  {
    id: 'quatro-queijos-mel',
    name: 'Quatro Queijos & Mel Silvestre',
    description:
      'Base branca com gorgonzola dolce, fior di latte, fontina e grana padano, finalizada com pimenta-do-reino e mel silvestre.',
    category: 'especiais',
    categoryLabel: 'Especiais',
    basePrice: 69,
    isPizza: true,
    isVegetarian: true,
    highlightTag: 'Sugestão do forno',
    image: '/src/assets/images/pizza_quatro_queijos_1795009254228.jpg',
    imageAlt: 'Pizza Quatro Queijos artesanal com gorgonzola, pimenta moída e fio de mel',
    allowAddons: true,
  },
  {
    id: 'parma-stracciatella',
    name: 'Parma & Stracciatella',
    description:
      'Molho pelati, mozzarella assada e finalização fora do forno com presunto de Parma fatiado, stracciatella cremosa e raspas de limão.',
    category: 'especiais',
    categoryLabel: 'Especiais',
    basePrice: 76,
    isPizza: true,
    highlightTag: 'Especialidade',
    image: '/src/assets/images/pizza_margherita_classica_1795009252761.jpg',
    imageAlt: 'Pizza artesanal de Parma e Stracciatella com ervas frescas',
    allowAddons: true,
  },
  {
    id: 'diavola-piccante',
    name: 'Diavola Piccante',
    description:
      'Salame italiano levemente picante, molho de tomate da casa, mozzarella fior di latte, pimenta calabresa em flocos e manjericão.',
    category: 'especiais',
    categoryLabel: 'Especiais',
    basePrice: 68,
    isPizza: true,
    image: '/src/assets/images/pizza_calabresa_artesanal_1795009253940.jpg',
    imageAlt: 'Pizza Diavola Piccante com salame italiano e borda dourada',
    allowAddons: true,
  },
  {
    id: 'cogumelos-rucula',
    name: 'Cogumelos Assados & Rúcula',
    description:
      'Mix de cogumelos frescos assados com tomilho, tomate-cereja confit, mozzarella, rúcula selvagem e lascas de parmesão.',
    category: 'vegetarianas',
    categoryLabel: 'Vegetarianas',
    basePrice: 67,
    isPizza: true,
    isVegetarian: true,
    highlightTag: 'Vegetariana',
    image: '/src/assets/images/pizza_cogumelos_rucula_1795009254117.jpg',
    imageAlt: 'Pizza vegetariana de cogumelos assados, tomate confit e rúcula fresca',
    allowAddons: true,
  },
  {
    id: 'abobrinha-cabra-pesto',
    name: 'Abobrinha, Queijo de Cabra & Pesto',
    description:
      'Lâminas finas de abobrinha grelhada, medalhões cremosos de queijo de cabra, mozzarella e pesto fresco de manjericão.',
    category: 'vegetarianas',
    categoryLabel: 'Vegetarianas',
    basePrice: 66,
    isPizza: true,
    isVegetarian: true,
    image: '/src/assets/images/pizza_cogumelos_rucula_1795009254117.jpg',
    imageAlt: 'Pizza vegetariana com queijo cremoso, lâminas grelhadas e pesto verde',
    allowAddons: true,
  },
  {
    id: 'burrata-focaccia',
    name: 'Burrata com Focaccia de Alecrim',
    description:
      'Burrata cremosa (150g) servida com pesto artesanal, tomatinhos assados na rama e tiras quentes de focaccia de fermentação lenta.',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    basePrice: 44,
    isPizza: false,
    isVegetarian: true,
    highlightTag: 'Para compartilhar',
    image: '/src/assets/images/acompanhamento_burrata_focaccia_1795009254336.jpg',
    imageAlt: 'Burrata cremosa servida com tiras de focaccia de alecrim e tomates assados',
    allowAddons: false,
  },
  {
    id: 'focaccia-alecrim-flor-sal',
    name: 'Focaccia da Casa com Flor de Sal',
    description:
      'Massa alta e aerada regada com azeite extravirgem, alecrim fresco, alho confitado macio e cristais de flor de sal.',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    basePrice: 28,
    isPizza: false,
    isVegetarian: true,
    image: '/src/assets/images/acompanhamento_burrata_focaccia_1795009254336.jpg',
    imageAlt: 'Focaccia artesanal dourada com alecrim e azeite extravirgem',
    allowAddons: false,
  },
  {
    id: 'soda-laranja-sanguinea',
    name: 'Soda Italiana de Laranja Sanguínea',
    description:
      'Garrafa de 350 ml preparada com xarope cítrico artesanal, água com gás bem gelada e ramo aromático de alecrim.',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    basePrice: 16,
    isPizza: false,
    isVegetarian: true,
    image: '/src/assets/images/sobremesa_tiramisu_artesanal_1795009254803.jpg',
    imageAlt: 'Soda italiana refrescante de laranja sanguínea com alecrim',
    imageFocus: 'object-right',
    allowAddons: false,
  },
  {
    id: 'limonada-siciliana',
    name: 'Limonada Siciliana com Hortelã',
    description:
      'Copo 350 ml com suco natural de limão siciliano, folhas de hortelã fresca e leve toque de açúcar orgânico.',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    basePrice: 14,
    isPizza: false,
    isVegetarian: true,
    image: '/src/assets/images/sobremesa_tiramisu_artesanal_1795009254803.jpg',
    imageAlt: 'Bebida cítrica artesanal gelada servida em copo alto',
    imageFocus: 'object-right',
    allowAddons: false,
  },
  {
    id: 'tiramisu-classico',
    name: 'Tiramisù Clássico da Casa',
    description:
      'Porção individual em pote cerâmico com creme leve de mascarpone, biscoitos embebidos em espresso e cacau amargo.',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas',
    basePrice: 29,
    isPizza: false,
    isVegetarian: true,
    highlightTag: 'Receita italiana',
    image: '/src/assets/images/sobremesa_tiramisu_artesanal_1795009254803.jpg',
    imageAlt: 'Tiramisù artesanal polvilhado com cacau amargo em ramekin cerâmico',
    imageFocus: 'object-left',
    allowAddons: false,
  },
  {
    id: 'cannoli-ricota-pistache',
    name: 'Dupla de Cannoli de Ricota & Pistache',
    description:
      'Dois tubos crocantes recheados na hora com creme de ricota fresca, raspas de laranja baiana e pistache tostado.',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas',
    basePrice: 26,
    isPizza: false,
    isVegetarian: true,
    image: '/src/assets/images/sobremesa_tiramisu_artesanal_1795009254803.jpg',
    imageAlt: 'Sobremesa italiana artesanal servida em mesa de mármore',
    imageFocus: 'object-left',
    allowAddons: false,
  },
];
