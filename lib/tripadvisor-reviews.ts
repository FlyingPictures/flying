export const TRIPADVISOR_PROFILE_URL =
  "https://www.tripadvisor.com.mx/Attraction_Review-g14989463-d7000917-Reviews-Flying_Pictures_Mexico-Teotihuacan_de_Arista_Teotihuacan_Municipality_Central_M.html";

export const TRIPADVISOR_RATING = 4.8;
export const TRIPADVISOR_REVIEW_COUNT = 226;
export const VIATOR_REVIEWS_URL =
  "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section";

export type TravelerReview = {
  platform: "Tripadvisor" | "Viator";
  author: string;
  rating: number;
  date: string;
  title: string;
  url: string;
  excerpt: { es: string; en: string };
};

// Titles, publication dates and ratings checked on the source listings on 2026-11-08.
// Viator renders these reviews on the product page; its author text locates each entry.
export const TRAVELER_REVIEWS: readonly TravelerReview[] = [
  {
    "platform": "Tripadvisor",
    "author": "P B",
    "rating": 5,
    "date": "2026-06-11",
    "title": "Fabulous, Simply Fabulous!",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1063932314-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "Me encantó toda la experiencia",
      "en": "I loved the whole experience"
    }
  },
  {
    "platform": "Viator",
    "author": "Hesmari_C",
    "rating": 5,
    "date": "2026-04-04",
    "title": "Unforgettable Teotihuacan Sunrise Balloon Ride & Amazing Private Tour",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Hesmari_C",
    "excerpt": {
      "es": "Montserrat fue una guía increíble al mostrarnos los templos del Sol y de la Luna.",
      "en": "Montserrat was an amazing guide while showing us the Sun and Moon temples."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Clyde",
    "rating": 5,
    "date": "2026-05-10",
    "title": "Es Increible",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1059663558-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "¡La experiencia más increíble que he vivido!",
      "en": "The most amazing experience ever!"
    }
  },
  {
    "platform": "Viator",
    "author": "Dave_C",
    "rating": 5,
    "date": "2025-12-23",
    "title": "You're missing out if you don't take this trip.",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Dave_C",
    "excerpt": {
      "es": "Muy bien organizado, con un personal increíble.",
      "en": "Very well organized, awesome staff."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "GalagirlBoston",
    "rating": 5,
    "date": "2026-04-26",
    "title": "Amazing experience, perfectly organized!",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1057962276-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "Cada momento fue cómodo y estuvo organizado con profesionalismo, sin sentirse como una trampa para turistas.",
      "en": "Every moment was comfortable and professionally arranged, with zero tourist-trap vibe."
    }
  },
  {
    "platform": "Viator",
    "author": "Adriana_D",
    "rating": 5,
    "date": "2025-11-25",
    "title": "Professional and slick",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Adriana_D",
    "excerpt": {
      "es": "Vale la pena madrugar.",
      "en": "It’s worth the early morning wake up."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "DJSpector",
    "rating": 5,
    "date": "2026-04-25",
    "title": "High Point of our Trip (no pun intended)",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1057873627-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "Nuestro conductor, el piloto y el guía fueron de primera",
      "en": "Our driver, pilot and tour guide were top-notch"
    }
  },
  {
    "platform": "Viator",
    "author": "Cierra_C",
    "rating": 4,
    "date": "2025-09-20",
    "title": "The Ballon experience was excellent, however the buffet made some of us sick.",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Cierra_C",
    "excerpt": {
      "es": "¡La experiencia en globo fue fantástica!",
      "en": "The balloon experience was fantastic!"
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Passenger787149",
    "rating": 5,
    "date": "2026-04-19",
    "title": "A bucket item ticked off",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1057125114-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "El vuelo sobre las pirámides de Teotihuacán fue suave y tranquilo.",
      "en": "The flight was smooth and peaceful over the Teotihuacán pyramids."
    }
  },
  {
    "platform": "Viator",
    "author": "Lisa_M",
    "rating": 5,
    "date": "2024-12-05",
    "title": "Fabulous morning!",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Lisa_M",
    "excerpt": {
      "es": "Nuestro piloto hizo que todos nos sintiéramos seguros en el globo.",
      "en": "our Pilot made us all feel safe and sound in our balloon."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Jamie M",
    "rating": 5,
    "date": "2026-03-17",
    "title": "The highlight of our trip!",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1053359188-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "Verónica nos ayudó muchísimo desde el principio.",
      "en": "Veronica was extremely helpful from the beginning."
    }
  },
  {
    "platform": "Viator",
    "author": "Tonibelle_C",
    "rating": 4,
    "date": "2025-07-05",
    "title": "Carlos (driver) and Luis...",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Tonibelle_C",
    "excerpt": {
      "es": "El recorrido arqueológico fue breve y poco extenso, pero para nosotros fue suficiente.",
      "en": "The tour of the archeological site was short and not super extensive but it was enough for us."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Tatiana Nieto",
    "rating": 5,
    "date": "2026-02-23",
    "title": "An unmissable experience!",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1050849065-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "nos hicieron sentir muy seguros y tranquilos",
      "en": "they made us feel very safe and calm"
    }
  },
  {
    "platform": "Viator",
    "author": "James_M",
    "rating": 5,
    "date": "2024-08-22",
    "title": "Expensive, but worth it and thrilling",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=James_M",
    "excerpt": {
      "es": "Un día largo y caro que valió la pena.",
      "en": "A long, expensive day that was worth it."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Afshin S",
    "rating": 5,
    "date": "2026-02-12",
    "title": "Flying Pictures Rises Above the Rest",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1049447968-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "Excelente comunicación y transparencia.",
      "en": "Excellent communication and transparency."
    }
  },
  {
    "platform": "Viator",
    "author": "Ken_Y",
    "rating": 5,
    "date": "2025-02-27",
    "title": "Wonderful Ride!",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Ken_Y",
    "excerpt": {
      "es": "Nuestro piloto David sabía mucho y nos hizo sentir seguros desde el despegue hasta el aterrizaje.",
      "en": "Our pilot David was very knowledgeable and make us feel safe from take off to landing."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Monika S",
    "rating": 5,
    "date": "2026-01-28",
    "title": "Amazing hot air balloon experience!",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1047751489-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "¡Una experiencia fantástica!",
      "en": "Fantastic experience!"
    }
  },
  {
    "platform": "Viator",
    "author": "Sean_Z",
    "rating": 5,
    "date": "2025-02-01",
    "title": "Spectacular day with Flying Pictures Mexico!",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=Sean_Z",
    "excerpt": {
      "es": "David fue el piloto de nuestro globo y las vistas que nos mostró fueron mágicas.",
      "en": "David was the pilot of our balloon and the views he showed us were magical."
    }
  },
  {
    "platform": "Tripadvisor",
    "author": "Maria Jose H",
    "rating": 5,
    "date": "2025-12-31",
    "title": "Unique experience",
    "url": "https://www.tripadvisor.com/ShowUserReviews-g150800-d17224137-r1044370378-Hot_Air_Balloon_Tour_Teotihuacan-Mexico_City_Central_Mexico_and_Gulf_Coast.html",
    "excerpt": {
      "es": "la atención del personal fue perfecta, todo muy ordenado",
      "en": "the staff attention was perfect, everything very tidy"
    }
  },
  {
    "platform": "Viator",
    "author": "ChongJieh_C",
    "rating": 5,
    "date": "2024-01-27",
    "title": "fun, professional and safe",
    "url": "https://www.viator.com/tours/Mexico-City/HOT-AIR-BALLOON-RIDE-TOUR-FROM-MEXICO-CITY-INCLUDES-BREAKFAST-AND-PYRAMID-GUIDE/d628-129154P1#reviews_section:~:text=ChongJieh_C",
    "excerpt": {
      "es": "Al llegar nos recibieron con calidez y amabilidad.",
      "en": "the reception when we arrived was warm and friendly."
    }
  }
];
