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
    headline: 'AI Solutions Engineer | Full-Stack Developer | Angular | .NET',
    status: 'Sr. Technical Specialist @ Synechron · Bengaluru',
    // Cycled by the typewriter in the hero: const role = "…";
    roles: [
      'AI Solutions Engineer',
      'Full-Stack Developer',
      'Angular Specialist',
      '.NET Engineer',
      'Tech Lead',
    ],
    tagline:
      '12+ years building enterprise web apps for banking, fintech, e-commerce and education with Angular, TypeScript and .NET. Now shipping faster with Claude, MCP and Spec-Driven Development.',
    location: 'Bengaluru, India',
    email: 'sameer31.das@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sameer-das-66b69787',
    linkedinLabel: 'linkedin.com/in/sameer-das-66b69787',
    resume: 'assets/Sameer_Kumar_Das_Resume.pdf',
    resumeFileName: 'Sameer_Kumar_Das_Resume.pdf',
    photo: null, // e.g. 'assets/photo.jpg' — add when available
  },

  // Terminal boot sequence shown once per browser session
  intro: [
    { cmd: 'whoami' },
    { out: 'sameer kumar das — full-stack · angular · .net · ai' },
    { cmd: 'npm run build:career' },
    { out: '✔ 5 companies · 6 projects · 12+ years', tone: 'ok' },
    { out: '✔ compiled with 0 errors', tone: 'ok' },
    { cmd: 'open portfolio' },
  ],

  stats: [
    { value: 12, suffix: '+', label: 'Years in software' },
    { value: 7, suffix: '+', label: 'Years of Angular' },
    { value: 6, suffix: '', label: 'Enterprise projects' },
    { value: 5, suffix: '', label: 'Companies' },
  ],

  hero: {
    // Floating chips around the code window
    badges: [
      { label: 'Angular 18', short: 'NG', color: '#DD0031' },
      { label: 'TypeScript', short: 'TS', color: '#3178C6' },
      { label: '.NET Core', short: 'C#', color: '#7B4FE0' },
      { label: 'Claude AI', short: 'AI', color: '#D97757' },
      { label: 'MCP', short: 'M', color: '#10B981' },
    ],
    // Rendered as a typed-out TypeScript object
    code: {
      comment: 'sameer.ts · career v6.0 (AI-augmented)',
      variable: 'sameer',
      type: 'Engineer',
      fields: [
        ['experience', '12+ years'],
        ['angular', 'v1 → v18 (7+ yrs)'],
        ['frontend', ['TypeScript', 'RxJS', 'NgRx']],
        ['backend', ['.NET', 'C#', 'Web API', 'SQL']],
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
      title: 'Twelve years of shipping enterprise software.',
      highlight: 'enterprise software.',
    },
    journey: {
      eyebrow: 'career journey',
      title: 'My career, as a release history.',
      highlight: 'release history.',
      lead: 'Five companies, from vendor web apps to the front-end architecture of a top-tier investment bank.',
    },
    skills: {
      eyebrow: 'skills',
      title: 'The stack I work in every day.',
      highlight: 'every day.',
    },
    ai: {
      eyebrow: 'ai-augmented development · 2025 → now',
      title: 'Building with AI as a co-developer.',
      highlight: 'co-developer.',
      lead: 'Recent upskilling and hands-on practice: specs first, Claude and MCP in the loop, and automated review before anything merges.',
    },
    projects: {
      eyebrow: 'key projects',
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
      lead: 'Have a role, a project or an Angular / .NET / AI problem to talk through? My inbox is open.',
    },
  },

  about: {
    facts: [
      { label: 'Currently', value: 'Sr. Technical Specialist, Synechron' },
      { label: 'Based in', value: 'Bengaluru, India' },
      { label: 'Domains', value: 'Banking · Fintech · E-commerce · Education' },
      { label: 'Focus', value: 'Angular · .NET · AI-augmented delivery' },
    ],
  },

  // The "how I ship with AI" panel in the AI section
  aiPipeline: [
    { name: 'spec.md', hint: 'write the contract first' },
    { name: 'Claude', hint: 'plan, generate, refactor' },
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
    'Results-driven Full-Stack Engineer with 12+ years of software development experience, including 7+ years of hands-on Angular. I design, build and maintain enterprise web applications with Angular, TypeScript, JavaScript, HTML5, CSS3, .NET, C#, ASP.NET Web API, REST APIs, SQL Server and Azure, working in Agile/Scrum teams. I use Claude, GitHub Copilot, the Model Context Protocol (MCP) and Spec-Driven Development (SDD) to build production-grade AI-powered applications. I have modernised legacy systems, improved application performance, led cross-functional teams, and delivered scalable solutions across banking, fintech, e-commerce and education.',

  domains: ['Banking', 'Fintech', 'E-commerce', 'Education'],

  competencies: [
    'Angular 1–18 (Primary)',
    'NgRx / State Management',
    'TypeScript, PineScript & RxJS',
    'Agile / Scrum / TDD',
    'C# / ASP.NET / Web API',
    '.NET Core / Azure / Docker',
    'SQL Server',
    'Git / GitHub / Jenkins / TFS',
    'Claude AI Full-Stack Dev',
    'MCP Server Integration',
    'Spec-Driven Development',
    'Kubernetes / CI-CD Pipelines',
  ],

  skills: [
    { group: 'Primary', items: ['Angular 1–18', 'TypeScript', 'NgRx/Store', 'RxJS', 'HTML5', 'CSS3'] },
    { group: 'Secondary', items: ['C#', 'ASP.NET MVC', 'Web API 2.0', '.NET Core', 'EF6', 'MSSQL', 'Azure', 'Docker', 'Kubernetes'] },
    { group: 'AI', items: ['Claude AI (Full-Stack)', 'MCP Integration', 'GitHub Copilot', 'Spec-Driven Development'] },
    { group: 'DevOps', items: ['Git', 'GitHub', 'TFS', 'SVN', 'Jenkins', 'Tortoise Git', 'VS Code', 'Sonar'] },
    { group: 'Scripting', items: ['PowerShell', 'Pine-Script', 'Node.js', 'JavaScript'] },
  ],

  aiPractices: [
    {
      icon: 'spark',
      title: 'Claude Full-Stack Developer',
      text: 'Designing and building end-to-end applications with Claude AI as a co-developer, from architecture design through code generation, review and deployment automation.',
    },
    {
      icon: 'plug',
      title: 'MCP (Model Context Protocol) Integration',
      text: 'Integrating MCP servers into development workflows to connect Claude with external tools, databases and APIs, enabling context-aware AI assistance across the full development lifecycle.',
    },
    {
      icon: 'spec',
      title: 'Spec-Driven Development (SDD)',
      text: 'Writing detailed machine-readable specifications first, then using Claude, GitHub and Playwright to generate, validate and iterate on production-quality code that adheres to the spec contract.',
    },
    {
      icon: 'git',
      title: 'GitHub AI Workflows',
      text: 'Using GitHub Copilot, GitHub Actions and Claude integrations for automated PR reviews, code suggestions and intelligent CI/CD pipelines.',
    },
  ],

  // Oldest first — the career journey reads as a release history
  experience: [
    {
      version: 'v1.0',
      role: 'Software Engineer',
      company: 'Nexus Technoware Solution Pvt Ltd',
      start: 'Jan 2012',
      end: 'Jan 2014',
      bullets: ['Developed and maintained vendor-based web applications; led in-house web product development.'],
    },
    {
      version: 'v2.0',
      role: 'Senior Software Engineer',
      company: 'Adeptpros IT Solutions Pvt Ltd',
      start: 'Jan 2014',
      end: 'Aug 2014',
      bullets: ['Education product development for Houghton Mifflin Harcourt (US) client.'],
    },
    {
      version: 'v3.0',
      role: 'Consultant',
      company: 'Capgemini India Pvt Ltd',
      start: 'Oct 2014',
      end: 'Jul 2016',
      bullets: [
        'Full-stack development for Coca-Cola US — TUIDD (Teradata migration) and ECMA projects.',
        'Built the ECMA module from scratch: AngularJS, IndexedDB, Bootstrap, UnderscoreJS, lo-dash.',
      ],
    },
    {
      version: 'v4.0',
      role: 'Tech Lead',
      company: 'Harman Connected Services (India) Pvt Ltd',
      start: 'Jul 2016',
      end: 'May 2022',
      bullets: [
        'Led teams of 4–12 across IoT (Device Management) and security domain (AlarmNet360) projects.',
        'Built the Device Management app for Landis+Gyr: Angular 12+, NgRx/Redux, communicating with HES servers.',
        'Delivered ESM for Honeywell: C#, Angular 4, Node.js, Azure, .NET Core, Docker, Kubernetes.',
        'Travelled to Finland for client requirement-gathering; received formal recognition for on-time delivery.',
      ],
    },
    {
      version: 'v5.0',
      role: 'Sr. Technical Specialist',
      company: 'Synechron Pvt Ltd, Bengaluru',
      start: 'Jun 2022',
      end: 'Present',
      bullets: [
        'Lead front-end architecture for a large-scale fixed-income banking application for a top-tier investment bank.',
        'Migrated legacy AngularJS (controllers, view models) to Angular 13–18 with TypeScript and NgRx.',
        'Architected account details, price details and client buy-allocation components using Angular, HTML5, CSS3.',
        'Applying SDD practices and Claude AI to accelerate sprint delivery and reduce defect rates.',
        'Integrated MCP servers to streamline developer tooling and automate repetitive workflows.',
        'Debugging and reviewing AI-generated code while leading architectural decisions for scalable, maintainable solutions.',
      ],
    },
    {
      version: 'v6.0',
      role: 'AI-Augmented Engineer',
      company: 'Within the Synechron role',
      start: '2025',
      end: 'Present',
      milestone: true,
      bullets: [
        'Claude as a full-stack co-developer, MCP server integration, Spec-Driven Development and GitHub AI workflows.',
      ],
    },
  ],

  projects: [
    {
      id: 'raa',
      name: 'RAA (Reasonable Alternative Analysis)',
      client: 'Large Investment Bank',
      role: 'Sr. Technical Specialist',
      domain: 'banking',
      stack: ['Angular 16+', 'Spring Boot', 'ZooKeeper', 'Annuity Pro', 'Alts OE'],
      description:
        'Regulatory compliance platform that lets financial advisors create, manage and attest Reasonable Alternative Analysis orders, with automated workflows, role-based access and full audit trails. Integrated with multiple order-entry systems (Annuity Pro, Alts OE, DAT) to enforce compliance checks, with dynamic ZooKeeper-driven configuration and Sentinel OIDC authentication.',
    },
    {
      id: 'fi-ticket',
      name: 'Fixed Income Ticket (FI Ticket)',
      client: 'Large Investment Bank',
      role: 'Sr. Technical Specialist',
      domain: 'banking',
      stack: ['Angular 16+', 'TypeScript', 'NgRx/Store', 'Node.js', 'Web API 2.0'],
      description:
        'Financial analyst platform for placing Buy, Sell, Bid Wanted and Bid Cross trade orders. Migrated the legacy ASP.NET MVC & AngularJS codebase to Angular 13+ and Web API 2.0. Architected account details, price details and client buy-allocation components. Applied SDD and Claude AI tooling to accelerate feature delivery.',
    },
    {
      id: 'device-management',
      name: 'Device Management (DM)',
      client: 'Landis+Gyr',
      role: 'Sr. Technical Consultant',
      domain: 'iot',
      teamSize: 10,
      stack: ['Angular 12+', 'TypeScript', 'NgRx/Store', 'Redux'],
      description:
        'Web application for managing configuration and scheduling of Grid Stream metering devices. Led the presentation-layer architecture, enabling secure communication with Head End System (HES) servers.',
    },
    {
      id: 'esm',
      name: 'ESM (Infrastructure Management)',
      client: 'Honeywell',
      role: 'Technical Consultant',
      domain: 'cloud',
      teamSize: 4,
      stack: ['C#', 'SQLite', 'Angular 4', 'Node.js', 'TypeScript', 'WCF', 'Web API', 'Azure', '.NET Core', 'Kubernetes', 'Docker'],
      description:
        'Tool for deploying and managing infrastructure, with a simplified UI for complex agent-based workflows. Provided real-time deployment status and better visibility into agent performance.',
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
        'Next-generation security panel management platform for account creation, communicator registration and remote service activation across desktop and mobile. Resolved bottlenecks and developed new features.',
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
        'Migrated 212 CBS UI screens to the TUIDD platform and built the ECMA module from scratch for promotions and outlet management, enabling CBS analysts to maintain the product and store data that feeds Wall Street sales reports.',
    },
  ],

  certifications: [
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
    'Travelled to Finland multiple times for client requirement gathering; commended for on-schedule delivery.',
    'Automated manual processes significantly, improving accuracy and reducing operational overhead.',
    'Fine-tuned business processes, leading to measurable improvements in system performance and stability.',
    'Pioneered adoption of Claude AI and MCP tooling within the team, raising overall sprint velocity.',
  ],
};
