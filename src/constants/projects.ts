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
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
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
       { label: "Response Time", value: "50%" },
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
  },
  {
    id: "manufacturing-energy-hub",
    title: "Eco-Industrial Manufacturing Hub",
    slug: "eco-manufacturing",
    domainId: "manufacturing",
    subdomainSlug: "Sustainability",
    type: "Case Study",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2026",
    status: "ONGOING",
    metrics: [
      { label: "Energy Savings", value: "32%" },
      { label: "CO2 Reduction", value: "15 tons" },
      { label: "Efficiency", value: "+28%" }
    ],
    overview: "Currently implementing a multi-phase sustainability framework for a large-scale manufacturing plant focusing on real-time energy tracking.",
    requirements: [
      "Manual meter reading",
      "High carbon footprint",
      "Unmanaged utility leaks",
      "Inefficient peak-load distribution"
    ],
    implementation: [
      "IoT sensor network deployment.",
      "Centralized Sustainability Dashboard.",
      "AI-driven load optimization.",
      "ERP integration for compliance reporting."
    ],
    beforeAfter: {
      before: [
        "Manual energy auditing once a year.",
        "No visibility into peak load wastage.",
        "High carbon emission penalties.",
        "Inefficient resource allocation."
      ],
      after: [
        "24/7 real-time energy visibility.",
        "Predictive load shifting reduced costs by 18%.",
        "Automated compliance documentation.",
        "Optimized resource flow across all units."
      ]
    },
    impact: "Expected to deliver a total ROI within 14 months through energy optimization and operational efficiency.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "logistics-distribution-center",
    title: "Smart Logistics Distribution Center",
    slug: "logistics-distribution",
    domainId: "logistics",
    subdomainSlug: "warehouse",
    type: "Real Deployment",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2024",
    status: "COMPLETED",
    metrics: [
      { label: "Accuracy", value: "99.99%" },
      { label: "Cycle Time", value: "-45%" },
      { label: "Utilization", value: "+60%" },
      { label: "Errors", value: "Zero" }
    ],
    overview: "A fully automated sorting and inventory tracking system using AI vision and RFID gate scanning for a 500k sq. ft. facility.",
    requirements: ["Real-time pallet tracking", "Automated sorter integration", "Mobile fleet management", "Predictive maintenance"],
    implementation: ["RFID Portal Gates", "Vision Sorting Nodes", "Warehouse AI Hub", "Mobile Asset Tracker"],
    beforeAfter: {
      before: ["Manual barcode scanning", "High inventory variance", "Forklift idling time", "Manual sorting errors"],
      after: ["Contactless gate logging", "Real-time stock audit", "Optimized routing path", "Automated sorting logic"]
    },
    impact: "Enhanced inventory precision and drastically reduced loading times for cross-border logistics.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "smart-corporate-campus",
    title: "Enterprise HQ Smart Campus",
    slug: "smart-campus",
    domainId: "corporate",
    subdomainSlug: "bms",
    type: "Real Deployment",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2025",
    status: "COMPLETED",
    metrics: [
      { label: "BMS Efficiency", value: "+40%" },
      { label: "Comfort Score", value: "95/100" },
      { label: "OpEx", value: "-25%" },
      { label: "Space Utility", value: "85%" }
    ],
    overview: "Integrated building management system combining lighting, HVAC, and occupancy sensors into a single 'digital twin' control plane.",
    requirements: ["Unified control dashboard", "Occupancy-based HVAC", "Smart visitor management", "Environmental sensing"],
    implementation: ["Digital Twin Platform", "IoT Sensor Grid", "Auto-Climate Logic", "Smart Access API"],
    beforeAfter: {
      before: ["Fragmented legacy systems", "Manual thermostat adjustments", "High energy wastage after-hours", "Guest wait times > 15m"],
      after: ["Single pane of glass control", "Self-optimizing climate", "Automated power-off", "Pre-registered guest QR entry"]
    },
    impact: "Created a premium employee experience while simultaneously cutting annual utility costs by a quarter.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "retail-analytics-suite",
    title: "Retail Vision Analytics Suite",
    slug: "retail-analytics",
    domainId: "retail",
    subdomainSlug: "analytics",
    type: "ONGOING",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    year: "2026",
    status: "ONGOING",
    metrics: [
      { label: "Store Traffic", value: "Real-time" },
      { label: "Conversion", value: "+12%" },
      { label: "Queue Time", value: "-30%" },
      { label: "Engagement", value: "High" }
    ],
    overview: "Deploying AI-powered computer vision to track customer movement, dwell time, and heatmaps for physical store optimization.",
    requirements: ["Heatmap generation", "Dwell time analytics", "Staff alert triggers", "Privacy-first processing"],
    implementation: ["Edge-AI Cameras", "Analytics Cloud Core", "Live Store Map", "Manager Mobile App"],
    beforeAfter: {
      before: ["Guesswork on store layout", "Underserved checkout peaks", "High theft risk zones", "No dwell time data"],
      after: ["Data-driven shelf placement", "Smart staff allocation", "Proactive security alerts", "Detailed funnel analysis"]
    },
    impact: "Currently optimizing flow in 5 flagship stores with expected nationwide rollout in late 2026.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200"
  }
];
