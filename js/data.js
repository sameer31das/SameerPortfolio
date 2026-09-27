/* ==========================================================================
   PORTFOLIO CONTENT
   --------------------------------------------------------------------------
   Every section of the site reads its text from this file.
   To update the portfolio (new job, new project, new skill), edit it here —
   no HTML or CSS changes needed.
   ========================================================================== */

window.PORTFOLIO = {
  profile: {
    name: 'Sameer Kumar Das',
    initials: 'SD',
    headline: 'Technical Architect | Full-Stack & Cloud Solutions | AI-Augmented Engineering',
    status: 'Sr. Technical Specialist (Architecture Lead) @ Synechron · Bengaluru',
    // Cycled by the typewriter in the hero: const role = "…";
    roles: [
      'Technical Architect',
      'Full-Stack Architect',
      'Cloud Solutions Architect',
      'AI-Augmented Engineer',
      'Angular & .NET Lead',
    ],
    tagline:
      '16+ years designing and leading enterprise-scale, full-stack solutions for banking, fintech, e-commerce and education. Angular and .NET platforms, cloud-ready on Azure, now accelerated with Claude, MCP and Spec-Driven Development.',
    location: 'Bengaluru, India',
    email: 'sameer31.das@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sameer-das-66b69787',
    linkedinLabel: 'linkedin.com/in/sameer-das-66b69787',
    resume: 'assets/Sameer_Kumar_Das_Resume.pdf',
    resumeFileName: 'Sameer_Kumar_Das_CV.pdf',
    photo: 'assets/photo.jpg', // square image; shown in a circular frame. null shows the "SD" monogram
  },

  // Terminal boot sequence shown once per browser session
  intro: [
    { cmd: 'whoami' },
    { out: 'sameer kumar das — technical architect · full-stack · cloud · ai' },
    { cmd: 'npm run build:career' },
    { out: '✔ 6 companies · 6 key projects · 16+ years', tone: 'ok' },
    { out: '✔ compiled with 0 errors', tone: 'ok' },
    { cmd: 'open portfolio' },
  ],

  stats: [
    { value: 16, suffix: '+', label: 'Years experience' },
    { value: 6, suffix: '', label: 'Companies' },
    { value: 6, suffix: '', label: 'Key architecture projects' },
    { value: 4, suffix: '', label: 'Certifications' },
  ],

  hero: {
    // Floating chips around the code window
    badges: [
      { label: 'Angular 18', short: 'NG', color: '#DD0031' },
      { label: 'TypeScript', short: 'TS', color: '#3178C6' },
      { label: '.NET Core', short: 'C#', color: '#7B4FE0' },
      { label: 'Claude AI', short: 'AI', color: '#D97757' },
      { label: 'Azure', short: 'Az', color: '#0078D4' },
    ],
    // Rendered as a typed-out TypeScript object
    code: {
      comment: 'sameer.ts · career v7.0 (AI-augmented)',
      variable: 'sameer',
      type: 'Architect',
      fields: [
        ['role', 'Technical Architect'],
        ['experience', '16+ years'],
        ['frontend', ['Angular 1–18', 'NgRx', 'RxJS']],
        ['backend', ['.NET Core', 'C#', 'Web API', 'SQL']],
        ['cloud', ['Azure', 'Docker', 'Kubernetes']],
        ['ai', ['Claude', 'MCP', 'SDD', 'Copilot']],
        ['domains', ['Banking', 'Fintech', 'IoT']],
        ['basedIn', 'Bengaluru, IN'],
      ],
    },
  },

  // Heading for each section. `highlight` must match words in `title` exactly.
  sections: {
    about: {
      eyebrow: 'about',
      title: 'Sixteen years of architecting enterprise software.',
      highlight: 'enterprise software.',
    },
    journey: {
      eyebrow: 'career journey',
      title: 'My career, as a release history.',
      highlight: 'release history.',
      lead: 'Six companies, from vendor web apps to owning the front-end architecture of a top-tier investment bank.',
    },
    skills: {
      eyebrow: 'skills',
      title: 'The stack I architect with.',
      highlight: 'architect with.',
    },
    ai: {
      eyebrow: 'ai-augmented development · 2025 → now',
      title: 'Building with AI as a co-developer.',
      highlight: 'co-developer.',
      lead: 'Driving AI-augmented engineering across teams: specs first, Claude and MCP in the loop, and automated review before anything merges.',
    },
    projects: {
      eyebrow: 'key architecture projects',
      title: 'Selected enterprise work.',
      highlight: 'enterprise work.',
    },
    credentials: {
      eyebrow: 'credentials',
      title: 'Certifications, education & recognition.',
      highlight: 'recognition.',
    },
    contact: {
      eyebrow: 'contact',
      title: "Let's build something together.",
      highlight: 'together.',
      lead: 'Have an architecture challenge, a role or an Angular / .NET / AI problem to talk through? My inbox is open.',
    },
  },

  about: {
    facts: [
      { label: 'Currently', value: 'Sr. Technical Specialist (Architecture Lead), Synechron' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Domains', value: 'Banking · Fintech · E-commerce · Education' },
      { label: 'Focus', value: 'Solution architecture · Cloud · AI-augmented delivery' },
    ],
  },

  // The "how I ship with AI" panel in the AI section
  aiPipeline: [
    { name: 'spec.md', hint: 'architecture spec first' },
    { name: 'Claude', hint: 'design, generate, refactor' },
    { name: 'MCP servers', hint: 'tools, data & APIs in context' },
    { name: 'Playwright', hint: 'validate against the spec' },
    { name: 'Pull request', hint: 'Copilot + Claude review' },
  ],

  // Filter labels for the projects grid, in display order
  projectDomains: {
    banking: 'Banking',
    iot: 'IoT',
    cloud: 'Cloud & DevOps',
    security: 'Security',
    retail: 'Retail',
  },

  summary:
    'Technical Architect with 16+ years of experience designing and leading enterprise-scale, full-stack solutions across banking, fintech, e-commerce and education. I architect front-end platforms (Angular 1–18) and back-end services (.NET Core, Web API, SQL Server), modernise legacy systems, and define scalable, secure, cloud-ready architectures on Azure, Docker and Kubernetes. I am currently driving adoption of AI-augmented engineering — Claude AI-based development, Model Context Protocol (MCP) server integration and Spec-Driven Development (SDD) — to accelerate delivery and improve code quality across teams. I translate business and regulatory requirements into technical strategy, lead cross-functional Agile teams, and partner with stakeholders to deliver measurable outcomes.',

  domains: ['Banking', 'Fintech', 'E-commerce', 'Education'],

  competencies: [
    'Technical & Solution Architecture',
    'Enterprise Application & System Design',
    'Legacy Application Modernization',
    'Cloud Architecture — Azure, Docker, Kubernetes',
    'Front-End Architecture — Angular 1–18',
    'Back-End Architecture — .NET Core, Web API',
    'Microservices & REST API Design',
    'AI-Augmented Development — Claude, MCP, SDD',
    'Technology Strategy & Architecture Reviews',
    'Agile / Scrum / TDD · CI-CD Pipelines',
    'Cross-Functional Team Leadership & Mentoring',
    'Stakeholder Management',
  ],

  skills: [
    { group: 'Front-End', items: ['Angular 1–18', 'TypeScript', 'NgRx/Store', 'RxJS', 'HTML5', 'CSS3'] },
    { group: 'Back-End', items: ['C#', 'ASP.NET MVC', 'Web API 2.0', '.NET Core', 'Entity Framework 6', 'MSSQL'] },
    { group: 'Cloud & DevOps', items: ['Azure', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'TFS', 'SVN', 'Jenkins', 'Sonar'] },
    { group: 'AI & Modern Practices', items: ['Claude AI (Full-Stack)', 'MCP Integration', 'GitHub Copilot', 'Spec-Driven Development'] },
    { group: 'Scripting', items: ['PowerShell', 'Pine-Script', 'Node.js', 'JavaScript'] },
  ],

  aiPractices: [
    {
      icon: 'spark',
      title: 'Claude Full-Stack Developer',
      text: 'Architecting and building end-to-end applications with Claude AI as a co-developer, from system design through code generation, review and deployment automation.',
    },
    {
      icon: 'plug',
      title: 'MCP (Model Context Protocol) Integration',
      text: 'Designing MCP server integrations that connect Claude with external tools, databases and APIs, enabling context-aware AI assistance across the development lifecycle.',
    },
    {
      icon: 'spec',
      title: 'Spec-Driven Development (SDD)',
      text: 'Defining machine-readable architecture specifications, then using Claude, GitHub and Playwright to generate, validate and iterate on production-quality code aligned to the spec contract.',
    },
    {
      icon: 'git',
      title: 'GitHub AI Workflows',
      text: 'Establishing GitHub Copilot, GitHub Actions and Claude-based automation for PR reviews, code suggestions and intelligent CI/CD pipelines.',
    },
  ],

  // Oldest first — the career journey reads as a release history
  experience: [
    {
      version: 'v1.0',
      role: 'Software Engineer',
      company: 'Cyber Wizard Pvt Ltd',
      start: 'Jan 2010',
      end: 'Dec 2011',
      bullets: ['Developed and supported vendor-based web applications during early career.'],
    },
    {
      version: 'v2.0',
      role: 'Senior Software Engineer',
      company: 'Nexus Technoware Solution Pvt Ltd',
      start: 'Dec 2011',
      end: 'Jan 2014',
      bullets: ['Developed and maintained vendor-based web applications; led in-house web product development.'],
    },
    {
      version: 'v3.0',
      role: 'Senior Software Engineer',
      company: 'Adeptpros IT Solutions Pvt Ltd',
      start: 'Jan 2014',
      end: 'Aug 2014',
      bullets: ['Contributed to education product development for Houghton Mifflin Harcourt (US).'],
    },
    {
      version: 'v4.0',
      role: 'Consultant',
      company: 'Capgemini India Pvt Ltd',
      start: 'Oct 2014',
      end: 'Jul 2016',
      bullets: [
        'Delivered full-stack architecture and development for Coca-Cola US — TUIDD (Teradata migration) and ECMA projects.',
        'Designed and built the ECMA module from scratch using AngularJS, IndexedDB, Bootstrap, Underscore.js and Lo-Dash.',
      ],
    },
    {
      version: 'v5.0',
      role: 'Tech Lead (Technical Architecture)',
      company: 'Harman Connected Services (India) Pvt Ltd',
      start: 'Jul 2016',
      end: 'May 2022',
      bullets: [
        'Led architecture and delivery for teams of 4–12 engineers across IoT (Device Management) and security (AlarmNet360) domains.',
        'Architected the Device Management application for Landis+Gyr using Angular 12+ and NgRx/Redux, defining secure integration patterns with Head-End System (HES) servers.',
        "Designed the technical architecture for Honeywell's ESM platform: C#, Angular 4, Node.js, Azure, .NET Core, Docker, Kubernetes.",
        'Represented engineering in client requirement-gathering sessions in Finland; recognised for on-time, architecture-driven delivery.',
      ],
    },
    {
      version: 'v6.0',
      role: 'Sr. Technical Specialist (Architecture Lead)',
      company: 'Synechron Pvt Ltd, Bengaluru',
      start: 'Jun 2022',
      end: 'Present',
      bullets: [
        'Own front-end architecture for a large-scale fixed-income banking application for a top-tier investment bank.',
        'Led the architecture migration of legacy AngularJS (controllers, view models) to Angular 13–18 with TypeScript and NgRx, defining the target state and migration roadmap.',
        'Architected account details, price details and client buy-allocation components, setting reusable design patterns adopted across the platform.',
        'Introduced Spec-Driven Development practices and Claude AI tooling to accelerate sprint delivery and reduce defect rates.',
        'Defined and integrated MCP server architecture to streamline developer tooling and automate repetitive workflows.',
        'Set standards for reviewing AI-generated code and led architectural decision-making for scalable, maintainable solutions.',
      ],
    },
    {
      version: 'v7.0',
      role: 'AI-Augmented Engineering',
      company: 'Within the Synechron role',
      start: '2025',
      end: 'Present',
      milestone: true,
      bullets: [
        'Claude as a full-stack co-developer, MCP server architecture, Spec-Driven Development and GitHub AI workflows — rolled out across teams.',
      ],
    },
  ],

  projects: [
    {
      id: 'raa',
      name: 'RAA (Reasonable Alternative Analysis)',
      client: 'Morgan Stanley',
      role: 'Sr. Technical Specialist (Architecture)',
      domain: 'banking',
      stack: ['Angular 16+', 'Spring Boot', 'ZooKeeper', 'Annuity Pro', 'Alts OE'],
      description:
        'Architected a regulatory compliance platform that lets financial advisors create, manage and attest RAA orders, with automated workflows, role-based access and full audit trails. Designed the integration architecture with multiple order-entry systems (Annuity Pro, Alts OE, DAT) to enforce compliance checks, using dynamic ZooKeeper-driven configuration and Sentinel OIDC authentication.',
    },
    {
      id: 'fi-ticket',
      name: 'Fixed Income Ticket (FI Ticket)',
      client: 'Morgan Stanley',
      role: 'Sr. Technical Specialist (Architecture)',
      domain: 'banking',
      stack: ['Angular 16+', 'TypeScript', 'NgRx/Store', 'Node.js', 'Web API 2.0'],
      description:
        'Designed the target architecture for a financial analyst platform placing Buy, Sell, Bid Wanted and Bid Cross trade orders. Led the migration architecture from legacy ASP.NET MVC/AngularJS to Angular 13+ and Web API 2.0; architected account, price and client buy-allocation components. Applied SDD and Claude AI tooling to accelerate feature delivery.',
    },
    {
      id: 'device-management',
      name: 'Device Management (DM)',
      client: 'Landis+Gyr',
      role: 'Sr. Technical Consultant (Architecture)',
      domain: 'iot',
      teamSize: 10,
      stack: ['Angular 12+', 'TypeScript', 'NgRx/Store', 'Redux'],
      description:
        'Led the presentation-layer architecture for a web application managing configuration and scheduling of Grid Stream metering devices, enabling secure communication with HES servers.',
    },
    {
      id: 'esm',
      name: 'ESM (Infrastructure Management)',
      client: 'Honeywell',
      role: 'Technical Consultant (Architecture)',
      domain: 'cloud',
      teamSize: 4,
      stack: ['C#', 'SQLite', 'Angular 4', 'Node.js', 'TypeScript', 'WCF', 'Web API', 'Azure', '.NET Core', 'Kubernetes', 'Docker'],
      description:
        'Architected a tool for deploying and managing infrastructure, with a simplified UI for complex agent-based workflows and real-time deployment visibility.',
    },
    {
      id: 'alarmnet-360',
      name: 'AlarmNet 360',
      client: 'Honeywell',
      role: 'Full-Stack Developer',
      domain: 'security',
      teamSize: 12,
      stack: ['MVC3', 'SQL Server 2012', 'Angular 1/2', 'TypeScript', 'SignalR', 'WCF', 'Enterprise Library 6.0', 'Azure', 'Kubernetes'],
      description:
        'Contributed to the architecture and development of a security panel management platform for account creation, communicator registration and remote service activation across desktop and mobile.',
    },
    {
      id: 'tuidd-ecma',
      name: 'TUIDD & ECMA',
      client: 'Coca-Cola (TCCC)',
      role: 'Full-Stack Developer',
      domain: 'retail',
      teamSize: 6,
      stack: ['AngularJS', 'jQuery', 'HTML5', 'CSS3', 'Bootstrap', 'Teradata', 'MVC4', 'Entity Framework', 'IndexedDB'],
      description:
        'Migrated 212 CBS UI screens to the TUIDD platform and built the ECMA module from scratch for promotions and outlet management.',
    },
  ],

  certifications: [
    { code: 'GH-600', name: 'GitHub Certified: Agentic AI Developer', issuer: 'GitHub' },
    { code: 'MCP', name: 'Microsoft Certified Professional', issuer: 'Microsoft' },
    { code: 'AIF-C01', name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services' },
    { code: 'AZ-900', name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft' },
  ],

  education: [
    { degree: 'M.Sc. (IT)', year: '2012', school: 'Kuvempu University' },
    { degree: 'GNIIT', year: '2010', school: 'NIIT' },
    { degree: 'B.Sc. (IT)', year: '2009', school: 'Kuvempu University' },
    { degree: 'XII Science', year: '2006', school: 'CHSE' },
  ],

  accomplishments: [
    'Received the PROJECT STAR award for multiple initiatives driving financial and functional project growth.',
    'Travelled to Finland multiple times for client requirement gathering; commended for on-schedule, architecture-driven delivery.',
    'Automated manual processes, improving accuracy and reducing operational overhead.',
    'Fine-tuned business and system processes, delivering measurable improvements in performance and stability.',
    'Pioneered adoption of Claude AI and MCP tooling within the team, elevating overall sprint velocity.',
  ],
};
