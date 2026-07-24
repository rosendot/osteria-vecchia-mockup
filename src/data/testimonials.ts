/** Regulars' quotes — shown on the Home page. */
export interface Testimonial {
  quote: string;
  initial: string;
  name: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Best cacio e pepe outside Rome. I've tried to make it at home a dozen times — I just come here now.",
    initial: "M",
    name: "Maria D.",
    location: "Somerville",
  },
  {
    quote:
      "Our anniversary spot for 12 years. Same corner table, same osso buco. They remember us every time.",
    initial: "T",
    name: "Tom & Rina",
    location: "Cambridge",
  },
  {
    quote:
      "Tastes like Sunday at my grandmother's. The ragù, the bread, the noise — all of it. I grew up on this.",
    initial: "A",
    name: "Angelo P.",
    location: "Boston",
  },
];
