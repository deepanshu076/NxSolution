export const domainNames = [
  "Colleges", "Schools", "Coaching Institutes", "Hostels", "Offices", "IT Companies", "Startups", "Banks", "Government Offices", "Apartments", "Housing Societies", "Gated Communities", "PG (Paying Guest)", "Rental Spaces", "Hotels", "Factories", "Airports"
];

export const subdomainsMap: Record<string, string[]> = {
  "Colleges": [
    "Main Gate / Entry Area", "Reception / Help Desk", "Admin Block", "Faculty Cabins / Staff Room",
    "Classrooms", "Computer Labs", "Library", "Seminar Hall / Auditorium", "Accounts Office",
    "Training & Placement Cell", "Parking Area", "Hostel Block"
  ],
  "Schools": [
    "Main Gate / Entry Area", "Reception / Visitor Desk", "Admin Office", "Principal / Management Office",
    "Staff Room", "Classrooms", "Computer Lab", "Library", "Activity / Play Area", "Transport / Bus Area",
    "Cafeteria / Canteen", "Corridors / Common Areas"
  ],
  "Coaching Institutes": [
    "Main Entrance / Entry Area", "Reception / Front Desk", "Waiting Area", "Admin Office",
    "Faculty Cabins", "Classrooms", "Computer Lab / Test Room", "Student Help Desk",
    "Accounts / Fee Counter", "Corridors / Common Areas", "Pantry / Break Area", "Parking Area"
  ],
  "Hostels": [
    "Main Gate / Entry Area", "Reception / Security Desk", "Resident Rooms", "Common Area / Lounge",
    "Dining Area / Mess", "Kitchen Area", "Washrooms / Bathrooms", "Laundry Area", "Warden Room / Office",
    "Visitor Area", "Corridors / Staircase", "Parking Area"
  ],
  "Offices": [
    "Main Entrance / Entry Area", "Reception / Front Desk", "Workstations / Open Workspace", "Meeting Rooms",
    "Conference Rooms", "Manager / Executive Cabins", "HR / Admin Office", "Server Room / IT Room",
    "Breakout / Collaboration Areas", "Cafeteria / Pantry", "Parking Area", "Security Room / Control Room"
  ],
  "IT Companies": [
    "Main Entrance / Access Gate", "Reception / Visitor Desk", "Developer Workstations", "Team Collaboration Areas",
    "Meeting Rooms", "Conference / Presentation Room", "Server Room / Data Center", "Network / IT Operations Room",
    "Manager / Lead Cabins", "Cafeteria / Breakout Zone", "Innovation / Testing Lab", "Parking Area"
  ],
  "Startups": [
    "Entry / Access Area", "Reception / Welcome Desk", "Open Workspaces", "Collaboration / Discussion Zones",
    "Meeting Rooms", "Founder / Core Team Area", "Flexible Work Pods", "Creative / Brainstorm Area",
    "Breakout / Chill Zone", "Pantry / Coffee Area", "Storage / Utility Area", "Parking Area"
  ],
  "Government Offices": [
    "Main Entrance / Security Gate", "Visitor Entry & Verification Area", "Reception / Help Desk",
    "Waiting Area (Public)", "Public Service Counters", "Officer Cabins / Departments", "Admin Office",
    "Records / Document Storage Room", "Meeting / Conference Room", "Control Room / Security Room",
    "Corridors / Common Areas", "Parking Area"
  ]
};

export const domains = domainNames.map((name, index) => {
  const colors = ["#B5D4F4", "#C0DD97", "#F7C1C1", "#CECBF6", "#FAC775", "#9FE1CB", "#D3D1C7", "#F4C0D1"];
  const images = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", // Education
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", // Office
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", // Residential
    "https://images.unsplash.com/photo-1586773860418-d3b3a998ddd6?w=800&q=80", // Healthcare
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", // Manufacturing
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80", // Retail
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", // Logistics
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"  // Civic/Gov
  ];
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name,
    color: colors[index % colors.length],
    image: images[index % images.length],
    sub: subdomainsMap[name] ? subdomainsMap[name].join(' · ') : "Smart · Integrated · Monitored",
    subdomains: subdomainsMap[name] || ["Smart", "Integrated", "Monitored"]
  };
});
