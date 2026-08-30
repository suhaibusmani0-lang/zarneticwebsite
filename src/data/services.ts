export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: string
  color: string
  colorClass: string
  features: string[]
  deliverables: string[]
  whatsappMessage: string
  faqs: { question: string; answer: string }[]
  colSpan: string
}

export const services: Service[] = [
  {
    slug: 'legal-ngo-compliance',
    title: 'Legal & NGO Compliance',
    shortTitle: 'Legal & NGO',
    description:
      'NGO Registration (12A, 80G, FCRA), Company Incorporation, and FSSAI License experts.',
    longDescription:
      'Zarnetic provides end-to-end legal and NGO compliance services in Delhi, India. Our team of expert lawyers and compliance officers handle everything from NGO Registration (12A, 80G, FCRA) to Company Incorporation (Private Limited, LLP, OPC), FSSAI Food License, Trademark Registration, and annual compliance filings. We have successfully completed 100+ NGO registrations with a 100% approval rate.',
    icon: 'Scale',
    color: '#f97316',
    colorClass: 'orange-500',
    features: [
      'NGO Registration — 12A, 80G, FCRA',
      'Company Incorporation — Pvt Ltd, LLP, OPC',
      'FSSAI Food License & Renewal',
      'Trademark & Copyright Registration',
      'Annual Compliance & Audit Filing',
      'Legal Documentation & Drafting',
    ],
    deliverables: [
      'Registration certificates',
      'Compliance documentation',
      'Legal advisory report',
      'Annual filing support',
    ],
    whatsappMessage:
      'Hi Zarnetic, I want to inquire about Legal & NGO Registration services (12A/80G/FCRA).',
    faqs: [
      {
        question: 'How long does NGO registration (12A, 80G) take in Delhi?',
        answer:
          'Typically, 12A registration takes 30-45 days and 80G registration takes 45-60 days after submission of all required documents. Zarnetic handles the entire process end-to-end with a 100% approval track record.',
      },
      {
        question: 'What is the cost of FCRA registration in India?',
        answer:
          'FCRA registration costs vary based on organization type and compliance requirements. Contact Zarnetic for a detailed, transparent quote tailored to your NGO\'s specific needs.',
      },
      {
        question: 'Can Zarnetic handle company incorporation for startups?',
        answer:
          'Yes. We handle Private Limited, LLP, and One Person Company (OPC) incorporations with complete documentation, PAN, TAN, GST registration, and bank account setup.',
      },
    ],
    colSpan: 'md:col-span-7',
  },
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    shortTitle: 'Software',
    description:
      'High-performance custom web and enterprise applications built for scale.',
    longDescription:
      'Zarnetic\'s software engineering team builds custom web applications, enterprise software, mobile apps, and SaaS platforms using modern tech stacks including React, Next.js, Node.js, Python, and cloud-native architectures. We follow agile development methodology with CI/CD pipelines for rapid, reliable delivery.',
    icon: 'Code',
    color: '#3b82f6',
    colorClass: 'blue-500',
    features: [
      'Custom Web Application Development',
      'Enterprise Software Solutions',
      'Mobile App Development (React Native)',
      'SaaS Platform Architecture',
      'API Design & Microservices',
      'Database Design & Optimization',
    ],
    deliverables: [
      'Production-ready application',
      'Source code & documentation',
      'CI/CD pipeline setup',
      'Post-launch support (3 months)',
    ],
    whatsappMessage:
      'Hi Zarnetic, I am looking for Custom Software Development solutions for my business.',
    faqs: [
      {
        question: 'What tech stack does Zarnetic use for software development?',
        answer:
          'We primarily use React/Next.js for frontend, Node.js/Python for backend, PostgreSQL/MongoDB for databases, and AWS/Azure for cloud infrastructure. We select the best stack based on your specific project requirements.',
      },
      {
        question: 'How long does custom software development take?',
        answer:
          'Timelines vary by complexity. A standard web application takes 8-12 weeks, while enterprise solutions may take 16-24 weeks. We follow agile sprints with bi-weekly deliverables so you see progress throughout.',
      },
      {
        question: 'Do you provide post-launch maintenance and support?',
        answer:
          'Yes, all projects include 3 months of free post-launch support. We also offer annual maintenance contracts for ongoing feature development, security patches, and performance monitoring.',
      },
    ],
    colSpan: 'md:col-span-5',
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud & DevOps',
    description:
      'Scalable cloud architecture and automated pipelines for 99.9% uptime.',
    longDescription:
      'Zarnetic\'s Cloud & DevOps practice designs and manages enterprise-grade cloud infrastructure on AWS, Azure, and GCP. We implement Infrastructure as Code (Terraform), container orchestration (Docker & Kubernetes), CI/CD pipelines, and 24/7 monitoring to ensure 99.9% uptime for your mission-critical applications.',
    icon: 'Cloud',
    color: '#10b981',
    colorClass: 'emerald-500',
    features: [
      'AWS, Azure & GCP Architecture',
      'Docker & Kubernetes Orchestration',
      'CI/CD Pipeline Automation',
      'Infrastructure as Code (Terraform)',
      '24/7 Monitoring & Alerting',
      'Cloud Migration & Optimization',
    ],
    deliverables: [
      'Cloud architecture blueprint',
      'Automated deployment pipeline',
      'Monitoring dashboard',
      'Disaster recovery plan',
    ],
    whatsappMessage:
      'Hi Zarnetic, I need help with Cloud Infrastructure and DevOps setup.',
    faqs: [
      {
        question: 'Which cloud platform does Zarnetic recommend — AWS, Azure, or GCP?',
        answer:
          'The choice depends on your specific needs. AWS is ideal for startups and scalability, Azure for enterprise Microsoft ecosystems, and GCP for data-heavy AI/ML workloads. We provide a free consultation to recommend the best fit.',
      },
      {
        question: 'Can Zarnetic migrate our existing infrastructure to the cloud?',
        answer:
          'Absolutely. We have completed seamless cloud migrations for 50+ clients with zero downtime. Our migration process includes assessment, planning, execution, testing, and post-migration optimization.',
      },
      {
        question: 'What does 99.9% uptime mean in practice?',
        answer:
          '99.9% uptime means less than 8.7 hours of downtime per year. We achieve this through redundant architecture, auto-scaling, health checks, and 24/7 monitoring with automated incident response.',
      },
    ],
    colSpan: 'md:col-span-5',
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security',
    shortTitle: 'Cyber Security',
    description:
      'Professional penetration testing and data protection audits.',
    longDescription:
      'Zarnetic\'s cybersecurity division provides comprehensive security assessments including penetration testing, vulnerability scanning, security audits, compliance checks (ISO 27001, GDPR), and incident response planning. Our certified security professionals protect your digital assets against modern cyber threats.',
    icon: 'ShieldCheck',
    color: '#a855f7',
    colorClass: 'purple-500',
    features: [
      'Penetration Testing & Ethical Hacking',
      'Vulnerability Assessment & Scanning',
      'ISO 27001 Compliance Audit',
      'Data Protection & GDPR Compliance',
      'Security Architecture Review',
      'Incident Response Planning',
    ],
    deliverables: [
      'Security assessment report',
      'Vulnerability remediation plan',
      'Compliance certification support',
      'Security monitoring setup',
    ],
    whatsappMessage:
      'Hi Zarnetic, I want to conduct a Cybersecurity Audit for my organization.',
    faqs: [
      {
        question: 'What is penetration testing and why does my business need it?',
        answer:
          'Penetration testing simulates real-world cyberattacks to identify vulnerabilities in your systems before malicious hackers exploit them. Every business handling sensitive data should conduct annual pentests to maintain security posture.',
      },
      {
        question: 'Is Zarnetic ISO 27001 certified?',
        answer:
          'Yes, Zarnetic holds ISO 27001 certification for information security management. We help organizations achieve their own ISO 27001 certification through gap analysis, policy development, and audit preparation.',
      },
      {
        question: 'How often should a security audit be conducted?',
        answer:
          'We recommend comprehensive security audits annually, with quarterly vulnerability scans and continuous monitoring. For high-risk industries (fintech, healthcare), more frequent assessments are advisable.',
      },
    ],
    colSpan: 'md:col-span-7',
  },
  {
    slug: 'ai-data-science',
    title: 'AI & Data Science',
    shortTitle: 'AI & Data',
    description:
      'Transforming raw data into actionable business intelligence using AI.',
    longDescription:
      'Zarnetic\'s AI & Data Science team builds intelligent solutions that turn raw data into business value. From predictive analytics and recommendation engines to natural language processing and computer vision, we leverage cutting-edge machine learning frameworks to create AI-powered products that drive measurable business outcomes.',
    icon: 'Database',
    color: '#ec4899',
    colorClass: 'pink-500',
    features: [
      'Predictive Analytics & Forecasting',
      'Natural Language Processing (NLP)',
      'Computer Vision & Image Recognition',
      'Recommendation Engine Development',
      'Business Intelligence Dashboards',
      'Data Pipeline & ETL Architecture',
    ],
    deliverables: [
      'Trained ML model & API',
      'Data pipeline architecture',
      'Analytics dashboard',
      'Model performance report',
    ],
    whatsappMessage:
      'Hi Zarnetic, I\'m interested in AI & Data Science solutions.',
    faqs: [
      {
        question: 'What AI and machine learning frameworks does Zarnetic use?',
        answer:
          'We work with TensorFlow, PyTorch, scikit-learn, Hugging Face Transformers, and OpenAI APIs. The framework selection depends on the use case — deep learning for vision/NLP, traditional ML for tabular data.',
      },
      {
        question: 'Can AI really improve my business operations?',
        answer:
          'Absolutely. Our AI solutions have helped clients achieve 40% improvement in sales prediction accuracy, 60% reduction in customer support costs through chatbots, and 30% increase in user engagement through recommendation engines.',
      },
      {
        question: 'How much data do I need to get started with AI?',
        answer:
          'It depends on the use case. Some solutions work with as little as 1,000 data points, while complex deep learning models need larger datasets. We can also use pre-trained models and transfer learning to work with limited data.',
      },
    ],
    colSpan: 'md:col-span-5',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}

