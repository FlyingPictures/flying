// config/images.ts
export const IMAGES = {
  home: {
    hero: {
      background: "hero1_rszxmn",
      stars: "5_stars_xbtijo",
      cameronLogo: "b5884911c3141d5efecb262d7371f5c738f8aff1_o9yrql",
    },
    brandLogos: [
      { publicId: "bbclogo150150_kqylht", alt: "BBC" },
      { publicId: "columbialogo_birqjy", alt: "Columbia" },
      { publicId: "Discoveryogo150150_qrubrn", alt: "Discovery" },
      { publicId: "natgeoogo150150_leob98", alt: "National Geographic" },
      { publicId: "redbullogo150150_z0uxsl", alt: "Red Bull" },
      { publicId: "telcelogo150150_wslrln", alt: "Telcel" },
    ],
    liveMonitoring: {
      background: "Rectangle_63_x9khlt",
      card1: "livemonitoring_ujhljj",
      card2: "yellowcard_dvlrgw",
    },
    flightExperience: {
      background: "v1770751698/flightexp_kisynt",
      flights: {
        shared: "v1770748401/toggle1_pydq5z",
        private: "v1770751029/toggle2_dasi0j",
        vip: "toggle3_fd1suy",
      },
      awards: {
        certificate: "v1770745292/certificate_tde9fm",
        badge: "awward_nvceuz",
      },
      bottomCards: {
        tradition: "twocards_1_oijkmu",
        safety: "Rectangle_40_1_x4el6d",
      },
    },
    whyChoose: {
      background: "v1770746469/Rectangle_44_1_cuhoex",
      cameronLogo: "cameronlogo_hve9ws",
      cards: [
        "minigallery1_auhyyf",
        "v1770750449/Rectangle_42_1_wzpq0p",
        "minigallery3_wbdxcz",
      ],
    },
    reviews: {
      background: "backgroundreviews_uptzt8",
      stars: "Group_64_xrfcje",
      platforms: {
        google: "v1770745707/icon-google-5-stars_1_jkkyci",
        tripadvisor: "v1770745706/icon-tripadvisor-5-stars_1_kj3cku",
        facebook: "v1770745705/icon-fb-5-stars_1_ph3b79",
      },
      avatars: [
        "Ellipse_8_reoc5x",
        "Ellipse_8_reoc5x",
        "Ellipse_8_reoc5x",
      ],
    },
  },

  flightExperiences: {
    hero: {
      background: "v1770932405/flightHero_tqysvs",
      badge: "trustbadges1_2x_1_1_pq9pzn"
    },
    flights: {
      classic: "v1770985333/Rectangle_37_1_wzbwjr",
      journey: "v1770985333/Rectangle_37_2_vkbxog",
      transport: "v1770985332/Rectangle_37_3_qspece",
      open: "v1770985333/Rectangle_37_4_gdprri",
      proposal: "v1770985334/Rectangle_37_5_vswg5d",
      anniversary: "v1770985333/Rectangle_37_6_mtrsye",
      birthday: "v1770985333/Rectangle_37_7_lozhvd",
      vip: "v1770985332/Rectangle_37_8_xkxdci",
      corporate: "v1770985333/Rectangle_37_9_vw580e"
    }
  },

  contact: {
    hero: {
      background: "v1771040063/Rectangle_33_2_wn4nfc",
      booking: "v1771040063/Rectangle_39_2_fqsef8",
    },  
  },

  product: {
    hero: {
      background: "v1770746469/Rectangle_44_1_cuhoex",
      cameronLogo: "cameronlogo_hve9ws",
    },
  },
  
  plan: {
    hero: {
      background: "v1770746469/Rectangle_44_1_cuhoex",  
      cameronLogo: "cameronlogo_hve9ws",
    },
  },

  safety: {
    hero: {
      background: "v1770746469/Rectangle_44_1_cuhoex",
      cameronLogo: "cameronlogo_hve9ws",
    },
  },

} as const;
