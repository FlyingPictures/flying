// constants/performance-config.ts
export const PERFORMANCE_CONFIG = {
    // Core Web Vitals targets
    LCP: 2.5, // Largest Contentful Paint (seconds)
    FID: 100, // First Input Delay (milliseconds)
    CLS: 0.1, // Cumulative Layout Shift
    FCP: 1.8, // First Contentful Paint (seconds)
    TTI: 3.8, // Time to Interactive (seconds)
    TBT: 200, // Total Blocking Time (milliseconds)
    SI: 3.4,  // Speed Index (seconds)
  
    // Image optimization
    IMAGE_QUALITY: 'auto',
    IMAGE_FORMAT: 'auto',
    LAZY_LOAD_THRESHOLD: 0.1,
  
    // Prefetching
    PREFETCH_ON_HOVER: true,
    PREFETCH_DELAY: 50, // milliseconds
  };