export const TRIPADVISOR_PROFILE_URL =
  "https://www.tripadvisor.com.mx/Attraction_Review-g14989463-d7000917-Reviews-Flying_Pictures_Mexico-Teotihuacan_de_Arista_Teotihuacan_Municipality_Central_M.html";

export const TRIPADVISOR_RATING = 4.8;
export const TRIPADVISOR_REVIEW_COUNT = 225;
export const TRIPADVISOR_LAST_VERIFIED = "2026-08-05";

type LocalizedText = {
  es: string;
  en: string;
};

export type TripadvisorReview = {
  id: string;
  author: string;
  location: LocalizedText;
  date: LocalizedText;
  rating: 5;
  title: LocalizedText;
  excerpt: LocalizedText;
  reviewUrl: string;
  profileUrl: string;
  avatarUrl?: string;
  photoUrl?: string;
};

export const TRIPADVISOR_REVIEWS: readonly TripadvisorReview[] = [
  {
    id: "pb-vip-2026",
    author: "P B",
    location: { es: "Viajero de Tripadvisor", en: "Tripadvisor traveler" },
    date: { es: "12 jun 2026", en: "Jun 12, 2026" },
    rating: 5,
    title: { es: "¡Fabuloso, simplemente fabuloso!", en: "Fabulous, simply fabulous!" },
    excerpt: {
      es: "Todo fue excelente: el traslado, el vuelo al amanecer, las fotos, el champán y la visita privada a las pirámides.",
      en: "Everything was excellent: transport, the sunrise flight, photos, Champagne, and the private pyramid tour.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1063932314-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/pbF9675VI",
  },
  {
    id: "clyde-2026",
    author: "Clyde",
    location: { es: "Dartmouth, Canadá", en: "Dartmouth, Canada" },
    date: { es: "10 may 2026", en: "May 10, 2026" },
    rating: 5,
    title: { es: "Es increíble", en: "It is amazing" },
    excerpt: {
      es: "¡La experiencia más asombrosa de todas!",
      en: "The most amazing experience of all!",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1059663558-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/913clydep",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/2e/a8/54/caption.jpg?w=900&h=650&s=1",
  },
  {
    id: "galagirl-2026",
    author: "GalagirlBoston",
    location: { es: "Viajera de Tripadvisor", en: "Tripadvisor traveler" },
    date: { es: "28 abr 2026", en: "Apr 28, 2026" },
    rating: 5,
    title: {
      es: "Increíble experiencia, perfectamente organizada",
      en: "Amazing experience, perfectly organized",
    },
    excerpt: {
      es: "Cada momento fue cómodo y profesionalmente organizado, sin ambiente de trampa turística.",
      en: "Every moment was comfortable and professionally organized, with none of the tourist-trap atmosphere.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g14989463-d7000917-r1057962276-Flying_Pictures_Mexico-Teotihuacan_de_Arista_Teotihuacan_Municipality_Central.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/GalagirlBoston",
  },
  {
    id: "djspector-2026",
    author: "DJSpector",
    location: { es: "Filadelfia, Pensilvania", en: "Philadelphia, Pennsylvania" },
    date: { es: "27 abr 2026", en: "Apr 27, 2026" },
    rating: 5,
    title: {
      es: "El punto culminante de nuestro viaje",
      en: "The highlight of our trip",
    },
    excerpt: {
      es: "Todo transcurrió sin problemas, de forma segura y a tiempo. El conductor, piloto y guía fueron de primera categoría.",
      en: "Everything ran smoothly, safely, and on time. Our driver, pilot, and guide were all first-rate.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1057873627-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/DJSpector",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/33/0e/ff/b9/caption.jpg?w=900&h=650&s=1",
  },
  {
    id: "passenger-2026",
    author: "Passenger787149",
    location: { es: "Stockport, Reino Unido", en: "Stockport, United Kingdom" },
    date: { es: "19 abr 2026", en: "Apr 19, 2026" },
    rating: 5,
    title: { es: "Un objetivo cumplido", en: "A goal accomplished" },
    excerpt: {
      es: "El vuelo fue suave y tranquilo sobre las pirámides, con un aterrizaje muy seguro y una experiencia que valió la pena.",
      en: "The flight was smooth and peaceful over the pyramids, with a very safe landing and an experience worth the cost.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1057125114-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/Passenger787149",
  },
  {
    id: "jamie-2026",
    author: "Jamie M",
    location: { es: "Honolulu, Hawái", en: "Honolulu, Hawaii" },
    date: { es: "17 mar 2026", en: "Mar 17, 2026" },
    rating: 5,
    title: { es: "Lo más destacado de nuestro viaje", en: "The highlight of our trip" },
    excerpt: {
      es: "De principio a fin, todo se sintió fluido, organizado y profesional. El personal fue amable y conocedor.",
      en: "From start to finish, everything felt seamless, organized, and professional. The staff were friendly and knowledgeable.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1053359188-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/bittersweet1",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/b5/a9/11/caption.jpg?w=900&h=650&s=1",
  },
  {
    id: "tatiana-2026",
    author: "Tatiana Nieto",
    location: { es: "Medellín, Colombia", en: "Medellín, Colombia" },
    date: { es: "23 feb 2026", en: "Feb 23, 2026" },
    rating: 5,
    title: { es: "Una experiencia imperdible", en: "An unmissable experience" },
    excerpt: {
      es: "Fueron muy profesionales y nos hicieron sentir seguros y tranquilos. El servicio completo fue excelente.",
      en: "They were highly professional and made us feel safe and relaxed. The entire service was excellent.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1050849065-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/nietotati",
    avatarUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/86/38/7f/caption.jpg?w=200&h=200&s=1",
  },
  {
    id: "afshin-2026",
    author: "Afshin S",
    location: { es: "Oakland, California", en: "Oakland, California" },
    date: { es: "12 feb 2026", en: "Feb 12, 2026" },
    rating: 5,
    title: {
      es: "Flying Pictures se eleva por encima del resto",
      en: "Flying Pictures rises above the rest",
    },
    excerpt: {
      es: "Excelente comunicación y transparencia. Nos sentimos seguros con sus pilotos certificados y disfrutamos una mañana inolvidable.",
      en: "Excellent communication and transparency. We felt safe with their certified pilots and enjoyed an unforgettable morning.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1049447968-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/962afshins",
    avatarUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/7c/ba/5a/afshin-s.jpg?w=200&h=200&s=1",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/6f/58/a8/caption.jpg?w=900&h=650&s=1",
  },
  {
    id: "monika-2026",
    author: "Monika S",
    location: { es: "Viajera de Tripadvisor", en: "Tripadvisor traveler" },
    date: { es: "29 ene 2026", en: "Jan 29, 2026" },
    rating: 5,
    title: {
      es: "Increíble experiencia en globo aerostático",
      en: "Amazing hot air balloon experience",
    },
    excerpt: {
      es: "Una experiencia fantástica y muy bien organizada, con puntualidad, champán y un desayuno delicioso.",
      en: "A fantastic, beautifully organized experience, right on time and complete with Champagne and a delicious breakfast.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1047751489-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/monikasU4748ML",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/51/ca/ad/caption.jpg?w=900&h=650&s=1",
  },
  {
    id: "maria-jose-2025",
    author: "Maria Jose H",
    location: { es: "San Salvador, El Salvador", en: "San Salvador, El Salvador" },
    date: { es: "31 dic 2025", en: "Dec 31, 2025" },
    rating: 5,
    title: { es: "Experiencia única", en: "A unique experience" },
    excerpt: {
      es: "El paseo estuvo increíble; es una experiencia para vivir al menos una vez. La atención fue perfecta y todo estuvo muy ordenado.",
      en: "The flight was incredible—a once-in-a-lifetime experience. The service was perfect and everything was exceptionally well organized.",
    },
    reviewUrl: "https://www.tripadvisor.com.mx/ShowUserReviews-g150800-d17224137-r1044370378-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    profileUrl: "https://www.tripadvisor.com.mx/Profile/mariajosehp0",
    avatarUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/72/96/d5/caption.jpg?w=200&h=200&s=1",
    photoUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/19/36/57/caption.jpg?w=900&h=650&s=1",
  },
] as const;

export function getTripadvisorText(text: LocalizedText, locale: string) {
  return text[locale === "es" ? "es" : "en"];
}
