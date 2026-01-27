export const getNavItems = (t: any, tExp: any, tSafety: any, tPlan: any) => [
    {
      title: t('flightExperiences'),
      href: "/experiences",
      items: [
        { title: tExp('balloon'), href: "/experiences/balloon" },
        { title: tExp('helicopter'), href: "/experiences/helicopter" },
        { title: tExp('private'), href: "/experiences/private" },
      ],
    },
    {
      title: t('safetyHeritage'),
      href: "/safety",
      items: [
        { title: tSafety('standards'), href: "/safety/standards" },
        { title: tSafety('history'), href: "/safety/history" },
        { title: tSafety('certifications'), href: "/safety/certifications" },
      ],
    },
    {
      title: t('planVisit'),
      href: "/plan",
      items: [
        { title: tPlan('locations'), href: "/plan/locations" },
        { title: tPlan('schedule'), href: "/plan/schedule" },
        { title: tPlan('pricing'), href: "/plan/pricing" },
      ],
    },
  ];