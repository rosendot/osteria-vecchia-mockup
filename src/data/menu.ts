/** The dish list. The Menu page renders all of it with category filters; the
 *  Home page teaser pulls the six marked `featured`. */
export type Category = "antipasti" | "pasta" | "woodfired" | "dolci";

export interface Dish {
  name: string;
  price: string;
  /** Copy shown on the Menu page. */
  blurb: string;
  /** Slightly different phrasing used in the Home teaser, where present. */
  teaserBlurb?: string;
  category: Category;
  /** Caption for the empty photo slot. */
  slot: string;
  featured?: boolean;
}

export const dishes: Dish[] = [
  // Antipasti
  {
    name: "Burrata & Prosciutto",
    price: "$16",
    blurb: "Creamy burrata, San Daniele prosciutto, grilled bread, good olive oil.",
    teaserBlurb:
      "Creamy burrata, San Daniele prosciutto, grilled bread, a drizzle of oil.",
    category: "antipasti",
    slot: "Burrata & prosciutto plate",
    featured: true,
  },
  {
    name: "Fritto Misto",
    price: "$18",
    blurb: "Lightly fried calamari, shrimp, and lemon, with a side of spicy marinara.",
    category: "antipasti",
    slot: "Fritto misto platter",
  },
  {
    name: "Caprese",
    price: "$14",
    blurb: "Fresh mozzarella, vine tomatoes, basil from the window box, sea salt.",
    category: "antipasti",
    slot: "Caprese salad",
  },

  // Pasta
  {
    name: "Tagliatelle Bolognese",
    price: "$24",
    blurb: "Fresh egg pasta in a slow Sunday ragù, three hours on the stove.",
    teaserBlurb:
      "Ribbons of fresh egg pasta in a slow Sunday ragù, three hours on the stove.",
    category: "pasta",
    slot: "Tagliatelle bolognese bowl",
    featured: true,
  },
  {
    name: "Cacio e Pepe",
    price: "$21",
    blurb: "Pecorino, black pepper, and a little patience. Nothing else.",
    teaserBlurb:
      "Pecorino, black pepper, and a little patience. Nothing else — that's the point.",
    category: "pasta",
    slot: "Cacio e pepe close-up",
    featured: true,
  },
  {
    name: "Lobster Ravioli",
    price: "$29",
    blurb: "Hand-folded ravioli stuffed with Maine lobster in a light saffron cream.",
    category: "pasta",
    slot: "Lobster ravioli",
  },
  {
    name: "Spaghetti alle Vongole",
    price: "$26",
    blurb: "Littleneck clams, garlic, white wine, chili, parsley. A little of the sea.",
    category: "pasta",
    slot: "Spaghetti alle vongole",
  },

  // Wood-Fired
  {
    name: "Margherita",
    price: "$18",
    blurb: "San Marzano, fresh mozzarella, basil, straight from the brick oven.",
    teaserBlurb:
      "San Marzano, fresh mozzarella, basil, straight from the wood-fired oven.",
    category: "woodfired",
    slot: "Margherita pizza from the oven",
    featured: true,
  },
  {
    name: "Diavola",
    price: "$20",
    blurb: "Spicy soppressata, mozzarella, a hit of chili honey on the way out.",
    category: "woodfired",
    slot: "Diavola pizza",
  },
  {
    name: "Osso Buco",
    price: "$34",
    blurb: "Veal shank braised until it falls off the bone, over saffron risotto.",
    category: "woodfired",
    slot: "Osso buco with gremolata",
    featured: true,
  },
  {
    name: "Branzino",
    price: "$32",
    blurb: "Whole Mediterranean sea bass, roasted over the fire, lemon and herbs.",
    category: "woodfired",
    slot: "Whole roasted branzino",
  },

  // Dolci
  {
    name: "Tiramisù",
    price: "$11",
    blurb: "Espresso-soaked ladyfingers, mascarpone, cocoa. Made fresh daily.",
    teaserBlurb:
      "Espresso-soaked ladyfingers, mascarpone, cocoa. Made fresh, gone fast.",
    category: "dolci",
    slot: "Tiramisù dusted with cocoa",
    featured: true,
  },
  {
    name: "Cannoli",
    price: "$9",
    blurb: "Shells filled to order with sweet ricotta and candied orange.",
    category: "dolci",
    slot: "Cannoli",
  },
  {
    name: "Affogato",
    price: "$8",
    blurb: "A scoop of vanilla gelato drowned in a shot of hot espresso.",
    category: "dolci",
    slot: "Affogato",
  },
];

export const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "antipasti", label: "Antipasti" },
  { key: "pasta", label: "Pasta" },
  { key: "woodfired", label: "Wood-Fired" },
  { key: "dolci", label: "Dolci" },
];

/** The short drinks list on the Menu page. */
export const drinks = [
  {
    name: "House Chianti",
    note: "Sangiovese · Tuscany",
    price: "$12",
    unit: " / glass",
  },
  { name: "Negroni", note: "Gin, Campari, sweet vermouth", price: "$14" },
  { name: "Aperol Spritz", note: "Aperol, prosecco, soda, orange", price: "$12" },
  {
    name: "Limoncello",
    note: "House-made · chilled, after dinner",
    price: "$9",
  },
];
