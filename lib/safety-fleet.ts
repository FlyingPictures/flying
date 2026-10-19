export type FleetBalloon = {
  name: string;
  publicId: string | null;
};

// Names come from Flying Pictures' fleet slide. Image paths are taken from the
// Cloudinary links supplied for each named balloon; keep the format extension.
export const SAFETY_FLEET: readonly FleetBalloon[] = [
  { name: "Turco", publicId: "turco_kx357y.webp" },
  { name: "Zafiro", publicId: "zafiro_oehcka.webp" },
  { name: "Pasión", publicId: null },
  { name: "Turquesa", publicId: "turquesa_azu4dw.webp" },
  { name: "Candy", publicId: "candy_aaayef.webp" },
  { name: "Harris", publicId: "harris_e83z0q.webp" },
  { name: "Mercurio", publicId: null },
  { name: "Acuario", publicId: "Acuario_skovv0.webp" },
  { name: "Jambo", publicId: "Jambo_jufmzu.webp" },
  { name: "Cóndor", publicId: null },
  { name: "Rubicón", publicId: null },
  { name: "Rumaya", publicId: null },
];
