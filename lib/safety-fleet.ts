export type FleetBalloon = {
  name: string;
  publicId: string | null;
};

// Names come from Flying Pictures' fleet slide. Add the matching Cloudinary
// public ID for each confirmed balloon after the photo selection is approved.
export const SAFETY_FLEET: readonly FleetBalloon[] = [
  { name: "Turco", publicId: null },
  { name: "Zafiro", publicId: null },
  { name: "Pasión", publicId: null },
  { name: "Turquesa", publicId: null },
  { name: "Candy", publicId: null },
  { name: "Harris", publicId: null },
  { name: "Mercurio", publicId: null },
  { name: "Acuario", publicId: null },
  { name: "Jambo", publicId: null },
  { name: "Cóndor", publicId: null },
  { name: "Rubicón", publicId: null },
  { name: "Rumaya", publicId: null },
];
