/**
 * portfolioContext.js
 *
 * This is the ONLY source of truth the chatbot is allowed to draw facts from.
 * Synced directly from index.html on 2026-08-15 — re-run this sync (or edit
 * by hand) whenever the live site changes, so the bot never drifts out of
 * date with what visitors actually see on the page.
 */

const portfolioContext = {
  name: "Vinayak Sharma",
  title: "Computer Science Engineering Student, Web Developer & Software Testing Intern",

  summary:
    "Second-year B.Tech Computer Science & Engineering student at Modern Institute of " +
    "Technology and Research Centre (MITRC), Alwar, with a CGPA of 8.37. Full-stack web " +
    "developer working with React.js on the frontend and FastAPI + MongoDB on the backend, " +
    "with deep core CS skills in DSA, DBMS, and Object-Oriented Programming. Completed a " +
    "Software Testing internship at Wurkify (manual testing, SDLC/STLC) and currently serves " +
    "as GeeksforGeeks Campus Mantri. Holds 7 certifications spanning React.js, JavaScript, " +
    "Generative AI, and AI Agent Building.",

  mission:
    "To leverage technology and continuous learning to build impactful, user-centric " +
    "solutions that solve real-world problems and inspire the next generation of developers.",
  vision:
    "To grow into a full-stack engineer and tech community leader who bridges the gap " +
    "between innovation and implementation — creating software that makes a meaningful " +
    "difference in people's lives.",

  education: [
    {
      degree: "Bachelor of Technology – Computer Science & Engineering",
      school: "Modern Institute of Technology and Research Centre (MITRC)",
      location: "Alwar, India",
      year: "Aug 2024 – May 2028",
      details: "CGPA: 8.37",
      highlights: [
        "Core specializations in Data Structures & Algorithms, Database Management Systems, and Object-Oriented Programming",
        "Active campus leader as GeeksforGeeks Campus Mantri, driving inter-college coding culture and student engagement initiatives",
        "Practical full-stack project experience spanning React.js frontends, FastAPI backends, and MongoDB databases",
      ],
    },
    {
      degree: "Class XII – Science Stream (PCM)",
      school: "National Academy Sr. Secondary Public School",
      location: "Alwar, India",
      year: "Apr 2021 – Jun 2022",
      details: "66%",
    },
    {
      degree: "Class X",
      school: "Adinath Senior Secondary School",
      location: "Alwar, India",
      year: "Apr 2023 – Jun 2024",
      details: "81.6%",
    },
  ],

  experience: [
    {
      role: "Software Testing Intern",
      company: "Wurkify",
      location: "Remote",
      period: "Aug 2025 – Nov 2025",
      type: "Internship",
      responsibilities: [
        "Performed manual testing to identify UI and functional defects across live web applications",
        "Designed and executed structured test cases covering functional, regression, and edge-case scenarios",
        "Documented and reported bugs using structured documentation practices for efficient developer handoffs",
        "Applied SDLC and STLC methodologies and collaborated cross-functionally with developers",
      ],
      achievements: [
        "Improved defect detection coverage through systematic test case design across multiple modules",
        "Delivered clear, reproducible bug reports that streamlined developer resolution cycles",
      ],
    },
    {
      role: "Campus Mantri",
      company: "GeeksforGeeks",
      location: "Alwar, Rajasthan, India",
      period: "2026 – Present",
      type: "Campus Ambassador",
      responsibilities: [
        "Promoted DSA and competitive coding culture among fellow students on campus",
        "Actively participated in and encouraged the daily Problem of the Day (POTD) initiative",
        "Organized coding awareness activities, workshops, and student engagement events",
        "Represented GeeksforGeeks as an official campus point-of-contact",
      ],
      achievements: [
        "Grew campus coding community participation through consistent event organization and peer mentorship",
        "Earned the official GeeksforGeeks Campus Mantri Certificate",
      ],
    },
  ],

  projects: [
    {
      title: "To-Do List Web App",
      type: "Personal Project",
      year: "2025",
      tech: ["React.JS", "JavaScript", "HTML", "CSS"],
      description:
        "A fully functional task management web application built with React.js featuring " +
        "real-time add, delete, and update task capabilities, with state managed via React Hooks " +
        "(useState/useEffect).",
      keyOutcomes: [
        "Demonstrated proficiency in React.js component architecture, props, and useState/useEffect hooks",
        "Produced a polished, minimal UI that prioritizes clarity and ease of use",
      ],
    },
    {
      title: "Doctor Prescription Management System",
      type: "In-Progress Project",
      year: "2026 – Present",
      tech: ["HTML", "CSS", "JavaScript", "Web Development"],
      description:
        "A healthcare-focused web application to digitize and streamline prescription management " +
        "for doctors and patients, reducing manual errors and improving accessibility of patient " +
        "records. Future scope includes billing and medicine inventory management.",
      keyOutcomes: [
        "Digitizing prescription workflows to eliminate paper-based inefficiencies and reduce transcription errors",
        "Building secure storage and retrieval mechanisms for patient prescription records with a clean access interface",
        "Designing a dual-role interface accessible for both doctors and patients with minimal learning curve",
      ],
    },
    {
      title: "MeatPulse – Event & Internship Platform",
      type: "Personal Project",
      year: "2026",
      tech: ["FastAPI", "MongoDB", "JWT", "Python", "REST API"],
      description:
        "A full-featured backend platform for managing events and internship listings with dual-role " +
        "support for Organizers and Seekers — 18 production-ready REST APIs, JWT-based authentication, " +
        "file uploads, real-time notifications, and role-specific dashboards.",
      keyOutcomes: [
        "Architected a scalable backend with 18 REST APIs supporting distinct Organizer and Seeker permissions and workflows",
        "Implemented JWT authentication for secure, stateless sessions and protected API endpoints",
        "Built file upload, notification dispatch, and dashboard features for a complete production-ready platform",
      ],
    },
  ],

  skills: {
    programmingLanguages: ["C (80%)", "C++ (83%)", "Java (78%)"],
    frontend: ["HTML / CSS (90%)", "JavaScript (86%)", "React.JS (84%)"],
    backendAndDatabases: ["FastAPI (76%)", "MongoDB (75%)", "MySQL (78%)"],
    toolsAndPlatforms: ["Git (85%)", "VS Code (92%)", "AI Tools – Claude, Grok (82%)"],
    csFundamentals: [
      "Data Structures & Algorithms (83%)",
      "Database Management Systems (79%)",
      "Object-Oriented Programming (81%)",
    ],
    soft: [
      "Leadership (88%)",
      "Public Speaking (82%)",
      "Event Management (85%)",
      "Writing (80%)",
      "Time Management (85%)",
    ],
  },

  certifications: [
    { title: "Web Applications Development using React JS", provider: "Skilloceans", year: "2024" },
    { title: "JavaScript Programming – Self Paced", provider: "GeeksForGeeks", year: "2024" },
    { title: "React JS Development – Self Paced", provider: "GeeksForGeeks", year: "2024" },
    {
      title: "Build with AI Agent Builder Camp",
      provider: "Google for Developers × GeeksForGeeks",
      year: "2024–2025",
    },
    { title: "Generative AI Mastermind Workshop", provider: "Outskill", year: "2024–2025" },
    { title: "Internship Certificate", provider: "Wurkify", year: "2025" },
    { title: "Campus Mantri Certificate", provider: "GeeksForGeeks", year: "2024" },
  ],

  achievements: {
    stats: { yearsExperience: "1+", certifications: "7+", projects: 3, awards: 2 },
    highlights: [
      "Software Testing Intern at Wurkify (2025) — hands-on manual testing, test case design, and SDLC/STLC methodologies",
      "GeeksforGeeks Campus Mantri (2024) — recognized for leadership in promoting DSA culture and organizing campus coding events",
      "AI Agent Builder Camp Participant (Google for Developers × GeeksForGeeks, 2024–2025)",
      "Generative AI Mastermind Workshop graduate (Outskill, 2024–2025)",
    ],
  },

  contact: {
    email: "Vinayaksharma2289@gmail.com",
    phone: "+91-8740007342",
    location: "Alwar, Rajasthan, India",
    linkedin: "https://linkedin.com/in/Vinayak2922k",
    github: "https://github.com/Vinayak2922k",
  },
};

module.exports = portfolioContext;
