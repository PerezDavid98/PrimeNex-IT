/**
 * Single source of truth for every string on the site.
 * Copy is taken from the PrimeNex IT company profile and the previous site.
 */

export const site = {
  name: "PrimeNex IT",
  domain: "primenexit.net",
  url: "https://www.primenexit.net",
  tagline: "Technology partner for digital transformation",
  location: "Cartago, Costa Rica",
  phone: "+(506) 6469-5005",
  phoneHref: "+50664695005",
  email: "contacto@primenexit.com",
  linkedin: "https://www.linkedin.com/company/primenex-it",
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
} as const;

/**
 * Click-to-chat. No API, no Meta account, no per-message cost: wa.me opens the
 * visitor's own WhatsApp with the conversation already addressed to us.
 *
 * `number` must be digits only, country code first, no plus sign or spaces.
 * `prefill` is what the visitor sees typed in the box — they can edit it before
 * sending, so keep it short and let them say the real thing.
 */
export const whatsapp = {
  number: "50664695005",
  label: "WhatsApp",
  aria: "Chat with us on WhatsApp",
  prefill: "Hello PrimeNex IT, I would like to talk about a project.",
} as const;

export const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
  whatsapp.prefill,
)}`;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  kicker: "Cartago, Costa Rica",
  headline: "We engineer the systems your business runs on.",
  lede:
    "PrimeNex IT delivers cutting-edge technological solutions tailored to the modern market's most demanding needs. Our team of dedicated and skilled professionals ensures every project is executed with precision, dedication, and an unwavering focus on excellence.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Services", href: "#services" },
};

/** Four-line index shown beside the headline. Mirrors the service tabs. */
export const practiceIndex = [
  { n: "01", label: "Embedded", href: "#services" },
  { n: "02", label: "Web", href: "#services" },
  { n: "03", label: "Data", href: "#services" },
  { n: "04", label: "Infrastructure", href: "#services" },
];

/** Descriptive facts only — no invented metrics. */
export const facts = [
  { label: "Based in", value: "Cartago, Costa Rica" },
  { label: "Time zone", value: "GMT-6, nearshore" },
  { label: "Scope", value: "Hardware to interface" },
  { label: "Engagement", value: "Design, build, support" },
];

export type ServiceGroup = {
  id: string;
  tab: string;
  index: string;
  headline: string;
  blurb: string;
  items: { title: string; body?: string; bullets?: string[] }[];
};

export const services: ServiceGroup[] = [
  {
    id: "it-support",
    tab: "IT Support",
    index: "01",
    headline: "Modernize the stack you already depend on",
    blurb:
      "We take the systems running your business today and make them faster, cheaper and ready for what comes next.",
    items: [
      {
        title: "Digital transformation",
        body:
          "Implementation of advanced technological solutions that enable companies to modernize their processes, improve operational efficiency, and adapt to the demands of the digital market.",
      },
      {
        title: "CRM & ERP management with AI and chatbots",
        body:
          "Comprehensive management of CRM and ERP systems, optimizing their performance and functionality through the integration of artificial intelligence and chatbots, enhancing customer interaction and process automation.",
      },
      {
        title: "Database management, redesign and migration",
        body:
          "Specialized services in database redesign and migration, ensuring that critical data is managed securely and efficiently, with an optimized structure for fast and reliable access.",
      },
    ],
  },
  {
    id: "web",
    tab: "Web",
    index: "02",
    headline: "Platforms built to carry your growth",
    blurb:
      "Robust, secure and scalable products — front to back, shipped on current technology and best practices.",
    items: [
      {
        title: "Website development, back-end and front-end",
        body:
          "Development of robust and scalable websites, both frontend and backend, using the latest technologies to ensure optimal performance and an excellent user experience.",
      },
      {
        title: "Database creation",
        body:
          "Creation of efficient and secure databases, designed to handle large volumes of information and ensure data integrity and availability.",
      },
      {
        title: "Servers and hosting",
        body:
          "High availability hosting services, with specialized technical support to ensure your website is always online and running smoothly.",
      },
    ],
  },
  {
    id: "data",
    tab: "Data Analysis",
    index: "03",
    headline: "Turn the data you already collect into decisions",
    blurb:
      "From raw records to the dashboard your leadership team opens every morning.",
    items: [
      {
        title: "Data mining",
        body:
          "Application of advanced data mining techniques to discover hidden patterns and trends, providing valuable insights for decision-making.",
      },
      {
        title: "Dashboard creation",
        body:
          "Design and development of interactive dashboards that let you visualize key data clearly and concisely, making it easy to monitor and analyze performance indicators.",
      },
      {
        title: "Business intelligence",
        body:
          "Business Intelligence solutions that transform data into actionable information, helping companies make informed and strategic decisions.",
      },
    ],
  },
  {
    id: "embedded",
    tab: "Embedded Systems",
    index: "04",
    headline: "Where the silicon meets the software",
    blurb:
      "Hardware and firmware designed together, so the product is efficient, manufacturable and cost-aware.",
    items: [
      {
        title: "Outsourcing",
        body:
          "Outsourcing services in embedded systems, allowing companies to externalize the development and maintenance of their critical systems, ensuring quality and efficiency at every stage of the process.",
      },
      {
        title: "Hardware design and development",
        bullets: [
          "PCB design — custom boards for embedded systems.",
          "Hardware prototyping — building and testing prototypes to validate designs before mass production.",
          "Component selection and integration — microcontrollers, sensors, actuators and supporting electronics.",
        ],
      },
      {
        title: "Embedded systems optimization",
        bullets: [
          "Performance optimization — tuning systems to run at maximum efficiency.",
          "Energy consumption reduction — strategies that minimize power draw.",
          "Cost reduction — analysis that lowers manufacturing and operating cost.",
        ],
      },
    ],
  },
];

/**
 * Disciplines, each with the concrete work it covers. Keyword lists are drawn
 * from the service descriptions rather than invented.
 */
export const capabilities = [
  {
    title: "Embedded systems",
    caption: "Hardware and firmware, designed together",
    includes: ["PCB design", "Firmware", "Prototyping", "Component selection"],
  },
  {
    title: "Web platforms",
    caption: "Front to back, built to scale",
    includes: ["Front-end", "Back-end", "Hosting", "High availability"],
  },
  {
    title: "Data and BI",
    caption: "From raw records to decisions",
    includes: ["Data mining", "Dashboards", "Business intelligence"],
  },
  {
    title: "Infrastructure",
    caption: "The systems your operation depends on",
    includes: ["Databases", "CRM", "ERP", "Redesign and migration"],
  },
  {
    title: "UX and UI",
    caption: "Interfaces that enhance the experience",
    includes: ["Interface design", "User experience", "Usability"],
  },
  {
    title: "IT support and training",
    caption: "So your team can run it without us",
    includes: ["Digital transformation", "Automation", "Team enablement"],
  },
];

/** Full-bleed reverse statement, condensed from the company profile. */
export const statement = {
  label: "Specialization",
  body:
    "We specialize in a broad range of technological services — from embedded systems that combine hardware and software into efficient, customized solutions, to intuitive interfaces that enhance user experience, to the databases and CRM systems that keep your infrastructure operational, efficient and optimized at all times.",
};

export const about = {
  mission:
    "At PrimeNex IT, we empower businesses with advanced technological solutions focused on digital transformation. We provide training and IT support, covering software, hardware, embedded systems, and database and CRM management. We are committed to being a reliable partner that helps overcome technological challenges and maintain competitiveness.",
  vision:
    "To be the leading strategic partner in technology and IT training, driving digital transformation. We aspire to lead innovation and set new standards of quality and service, helping our clients reach their full potential in a digital world.",
  commitment:
    "PrimeNex IT is committed to delivering high-quality results, building long-lasting relationships based on trust, transparency, and the tangible value we bring to every business we partner with.",
  objectives: [
    {
      title: "Lead digital transformation",
      body:
        "Become the primary strategic partner for our clients in their digital transformation processes, providing innovative and customized solutions that optimize their operations.",
    },
    {
      title: "Excellence in development and support",
      body:
        "Maintain an exceptional standard of quality across software development, embedded systems, UX/UI, and database and CRM support, ensuring total customer satisfaction.",
    },
    {
      title: "Continuous innovation",
      body:
        "Establish a continuous process of innovation in our technological solutions, keeping our services and products at the forefront of the market.",
    },
    {
      title: "Market expansion",
      body:
        "Expand our presence in key markets by offering differentiated and competitive technological services, reaching new clients and industry sectors.",
    },
    {
      title: "Sustainability and social responsibility",
      body:
        "Implement sustainable and socially responsible business practices, contributing to the community and the well-being of the environment where we operate.",
    },
  ],
};

export const countries = [
  "Costa Rica", "United States", "Mexico", "Panama", "Guatemala", "Honduras",
  "Nicaragua", "El Salvador", "Colombia", "Argentina", "Brazil", "Chile", "Peru",
  "Uruguay", "Paraguay", "Bolivia", "Ecuador", "Venezuela", "Dominican Republic",
  "Cuba", "Puerto Rico", "Canada", "Spain", "Portugal", "United Kingdom", "Ireland",
  "France", "Germany", "Netherlands", "Belgium", "Switzerland", "Austria", "Italy",
  "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic", "Romania",
  "Greece", "Turkey", "Israel", "United Arab Emirates", "Saudi Arabia", "Qatar",
  "India", "China", "Japan", "South Korea", "Singapore", "Malaysia", "Indonesia",
  "Philippines", "Thailand", "Vietnam", "Australia", "New Zealand", "South Africa",
  "Nigeria", "Kenya", "Egypt", "Morocco", "Other",
];
