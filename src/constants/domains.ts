export const domainData = [
  {
    id: "education",
    name: "Education & Campuses",
    slug: "education",
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
    description: "Transforming learning environments into smart, connected ecosystems that enhance safety and operational efficiency.",
    stats: [
      { label: "Sub-domains", value: "8" },
      { label: "Uptime", value: "99.9%" },
      { label: "Efficiency", value: "+40%" },
      { label: "Institutions", value: "120+" }
    ],
    subdomains: [
      { id: "smart-campus", name: "Smart Campus Management", slug: "campus" },
      { id: "e-learning", name: "E-Learning Infrastructure", slug: "e-learning" },
      { id: "security", name: "Campus Security & Access", slug: "security" }
    ],
    problems: [
      { id: "p1", title: "Fragmented Data", desc: "Student and facility data stored in disconnected systems." },
      { id: "p2", title: "Security Gaps", desc: "Manual access logs at dormitories and lab facilities." },
      { id: "p3", title: "Energy Waste", desc: "HVAC and lighting running in empty lecture halls." }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare & Hospitals",
    slug: "healthcare",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    description: "Intelligent monitoring and automation systems for patient-centric care and hospital resource optimization.",
    stats: [
      { label: "Departments", value: "12" },
      { label: "Reliability", value: "100%" },
      { label: "Recovery", value: "+25%" },
      { label: "Hospitals", value: "45+" }
    ],
    subdomains: [
      { id: "patient-monitoring", name: "Patient Monitoring", slug: "monitoring" },
      { id: "asset-tracking", name: "Asset Tracking", slug: "assets" },
      { id: "smart-icu", name: "Smart ICU Systems", slug: "icu" }
    ],
    problems: [
      { id: "p1", title: "Response Lag", desc: "Delays in emergency alert delivery to medical staff." },
      { id: "p2", title: "Inventory Loss", desc: "Inability to track mobile medical equipment in real-time." },
      { id: "p3", title: "Traffic Congestion", desc: "Poor elevator and corridor management during peak hours." }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Factories",
    slug: "manufacturing",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    description: "Industrial IoT and automation layers that turn factories into intelligent, data-driven production powerhouses.",
    stats: [
      { label: "Plants", value: "15" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Output", value: "+30%" },
      { label: "Enterprises", value: "30+" }
    ],
    subdomains: [
      { id: "predictive-maint", name: "Predictive Maintenance", slug: "maintenance" },
      { id: "logistics-auto", name: "Logistics Automation", slug: "logistics" },
      { id: "energy-mgmnt", name: "Industrial Energy Management", slug: "energy" }
    ],
    problems: [
      { id: "p1", title: "Sudden Downtime", desc: "Machine failures causing massive production halts." },
      { id: "p2", title: "Quality Variance", desc: "Manual quality checks leading to high defect rates." },
      { id: "p3", title: "Hazard Risks", desc: "Difficulty monitoring environmental safety in real-time." }
    ]
  },
  {
    id: "retail",
    name: "Retail & Commercial",
    slug: "retail",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    description: "Smart retail ecosystems enhancing customer experiences and physical store efficiency through technology.",
    stats: [
      { label: "Outlets", value: "200+" },
      { label: "Footfall", value: "+15%" },
      { label: "Sales", value: "+20%" },
      { label: "Brands", value: "50+" }
    ],
    subdomains: [
      { id: "footfall-analytics", name: "Footfall Analytics", slug: "analytics" },
      { id: "smart-shelving", name: "Smart Shelving", slug: "shelving" },
      { id: "digital-signage", name: "Interactive Signage", slug: "signage" }
    ],
    problems: [
      { id: "p1", title: "Stockouts", desc: "Manual inventory checks missing high-demand item shortages." },
      { id: "p2", title: "Queue Length", desc: "Poor staff allocation during unexpected crowd surges." },
      { id: "p3", title: "Theft", desc: "Blind spots in traditional surveillance systems." }
    ]
  }
];
