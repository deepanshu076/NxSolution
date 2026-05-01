export const projectsData = [
  {
    id: "campus-gate-auto",
    title: "Global University Gate Automation",
    slug: "gate-automation",
    domainId: "education",
    subdomainSlug: "security",
    type: "Real Deployment",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2026",
    status: "Active",
    metrics: [
      { label: "Wait Time", value: "-85%" },
      { label: "Accuracy", value: "99.9%" },
      { label: "Throughput", value: "1.2k/hr" },
      { label: "Staff Needed", value: "-60%" }
    ],
    overview: "Implemented a campus-wide AI-powered gate entry system using license plate recognition (ANPR) and facial verification for faculty.",
    requirements: [
      "Process 1000+ vehicles during morning peak.",
      "Integrate with existing student database.",
      "Weatherproof hardware for outdoor deployment.",
      "Instant security alert for unauthorized vehicles."
    ],
    implementation: [
      "Deployed 12 AI-cameras at 4 entry points.",
      "Cloud-based management dashboard for security team.",
      "Integration with automated hydraulic bollards.",
      "Mobile app for faculty vehicle pre-registration."
    ],
    beforeAfter: {
      before: [
        "Manual checking by guards took 45s per car.",
        "Constant traffic congestion at main gates.",
        "Manual logs easily spoofed or lost.",
        "High cost of 24/7 manual guarding."
      ],
      after: [
        "Automated clearance in under 5s.",
        "Zero traffic backup during peak hours.",
        "Cryptographically signed digital entry logs.",
        "Guards redeployed to critical interior zones."
      ]
    },
    impact: "Resulted in a 40% reduction in campus security operational costs within the first six months.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200"
  },
  {
     id: "hospital-icu-monitor",
     title: "City General Smart ICU Hub",
     slug: "smart-icu-hub",
     domainId: "healthcare",
     subdomainSlug: "icu",
     type: "Real Deployment",
     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
     year: "2025",
     status: "Active",
     metrics: [
       { label: "Response", value: "-50%" },
       { label: "Errors", value: "-20%" },
       { label: "Uptime", value: "100%" },
       { label: "Efficiency", value: "+35%" }
     ],
     overview: "A centralized monitoring system for ICU beds that integrates vital sensors with an AI alert engine for predictive nursing assistance.",
     requirements: ["Zero-latency vital tracking", "Role-based mobile alerts", "Historical data analysis", "System redundancy"],
     implementation: ["Sensor integration", "Central Nurse Hub", "Mobile Alert CMS", "Failover servers"],
     beforeAfter: {
       before: ["Nurse call buttons only", "Delayed vitals recognition", "Manual charting of vitals", "High staff burnout"],
       after: ["Predictive vital tracking", "Instant smart alerts", "Auto-logged vitals", "Balanced staff workload"]
     },
     impact: "Significant reduction in patient response lag and improved clinical outcomes for high-risk patients.",
     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
  }
];
