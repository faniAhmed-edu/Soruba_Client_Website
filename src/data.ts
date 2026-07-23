/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// @ts-ignore
import heroDashboard from "./assets/images/hero-section.png";
// @ts-ignore
import itConsultation from "./assets/images/Team Meeting.png";
// @ts-ignore
import webDevImg from "./assets/images/Web Development.png";
// @ts-ignore
import platformIntegrationImg from "./assets/images/Platform Integration.png";
// @ts-ignore
import networkSecurityImg from "./assets/images/Network Security.png";
// @ts-ignore
import itManagementImg from "./assets/images/IT Management.png";
// @ts-ignore
import managedITImg from "./assets/images/Managed IT Services.png";

// @ts-ignore
import blogThumb1 from "./assets/images/Thumbnail_1.png";
// @ts-ignore
import blogThumb2 from "./assets/images/Thumbnail_2.png";
// @ts-ignore
import blogThumb3 from "./assets/images/Thumbnail_3.png";
// @ts-ignore
import blogThumb4 from "./assets/images/Thumbnail_4.png";
// @ts-ignore
import blogThumb5 from "./assets/images/Thumbnail_5.png";

// @ts-ignore
import svcCyberSecurity from "./assets/images/Cyber Security Solutions.png";
// @ts-ignore
import svcCompliance from "./assets/images/Complience & Risk Management.png";
// @ts-ignore
import svcCloudNetwork from "./assets/images/Cloud & Network Solutions.png";
// @ts-ignore
import svcHardware from "./assets/images/Hardware and Software Procurement.png";

// @ts-ignore
import indHealthcare from "./assets/images/Healthcare.png";
// @ts-ignore
import indGovernment from "./assets/images/Government.png";
// @ts-ignore
import indFinance from "./assets/images/Finance & Banking.png";
// @ts-ignore
import indEducation from "./assets/images/Education.png";
// @ts-ignore
import indEnterprise from "./assets/images/Enterrise & SMBs.png";

export { heroDashboard, itConsultation, svcCyberSecurity as cyberSecurityImg };

import { Service, Industry, Project, TeamMember, BlogPost, Testimonial, FAQItem } from "./types";

export const BUSINESS_INFO = {
  name: "Soruba LLC",
  tagline: "IT Manage Services Provider/MSSP",
  address: "Oregon, USA",
  phone: "+1 682-414-8516",
  email: "support@soruballc.com",
  hours: "Mon–Friday, 09am–05pm",
  website: "soruballc.com"
};

export const SERVICES: Service[] = [
  {
    id: "managed-it",
    title: "Managed IT Services",
    slug: "it-consultancy", // Maps to the featured consultancy route
    shortDesc: "Offer end-to-end solutions designed to keep your business secure, efficient, and future-ready.",
    longDesc: "Our Managed IT Services offer end-to-end solutions designed to keep your IT infrastructure secure, efficient, and future-ready. We provide proactive monitoring, maintenance, and support to ensure seamless business operations with minimal downtime. Whether your organization requires advanced endpoint security, cloud migration support, or IT compliance solutions, we deliver tailored services that align with your specific business goals.",
    icon: "Cpu",
    imageUrl: managedITImg,
    offerings: [
      "24/7 IT Support & Helpdesk Assistance",
      "IT Infrastructure Management & Optimization",
      "Cloud Hosting & Seamless Migration (AWS, Azure, GCP)",
      "Endpoint Management & Advanced Protection",
      "Comprehensive IT Compliance & Security Audits"
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security Solutions",
    slug: "cyber-security",
    shortDesc: "Protect your critical digital assets with multi-layered, proactive defense and active response.",
    longDesc: "With cyber threats becoming more sophisticated, our Cybersecurity Solutions provide a multi-layered defense strategy to protect your critical assets. We implement cutting-edge security measures, monitor threats 24/7, and respond to incidents swiftly to minimize risks and ensure operations.",
    icon: "ShieldAlert",
    imageUrl: svcCyberSecurity,
    offerings: [
      "Managed Detection & Response (MDR)",
      "SIEM & Security Operations Center (SOC) as a Service",
      "Cloud Security across AWS, Azure, and GCP",
      "Zero Trust Security Framework Implementation",
      "Identity & Access Management (IAM)",
      "Ransomware Protection & Threat Intelligence"
    ]
  },
  {
    id: "database-security",
    title: "Database Security",
    slug: "database-security",
    shortDesc: "Secure your critical database architectures and defend enterprise records against cyber theft.",
    longDesc: "Your database is the core of your digital storage. We deploy state-of-the-art encryption, access control layers, continuous vulnerability scanners, and backup systems to protect high-value business databases and relational systems from leaks.",
    icon: "Database",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    offerings: [
      "Real-time SQL injection protection & active blocking",
      "Transparent Data Encryption (TDE) for rest and transit",
      "Database access audits & anomalous activity alarms",
      "Multi-region backup security with cold storage locks"
    ]
  },
  {
    id: "app-development",
    title: "Health App Development",
    slug: "app-development",
    shortDesc: "Create HIPAA-compliant medical application platforms designed with cybersecurity first.",
    longDesc: "We specialize in building secure, reliable, and HIPAA-compliant medical applications. From telehealth software integrations to medical database synchronization, we construct patient-facing and provider-facing systems with built-in audit trails and top-tier compliance architecture.",
    icon: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    offerings: [
      "HIPAA-compliant software development & audit tracing",
      "Secure API integrations for Electronic Health Records (EHR)",
      "Multi-factor authentication & role-based medical access",
      "Penetration-tested healthcare database interfaces"
    ]
  },
  {
    id: "cloud-network",
    title: "Cloud & Network Solutions",
    slug: "cloud-network",
    shortDesc: "Scalable, secure cloud integrations and optimized networks engineered for high availability.",
    longDesc: "We offer scalable and secure Cloud & Network Solutions that enhance operational agility, improve connectivity, and support digital transformation initiatives. Our team of experts helps businesses integrate cutting-edge cloud technologies and optimize network infrastructure for peak efficiency and robust scalability.",
    icon: "Cloud",
    imageUrl: svcCloudNetwork,
    offerings: [
      "Network Design, Segmenting & Dynamic Optimization",
      "Virtualized & On-Prem Hybrid Data Center Setup",
      "Hybrid & Multi-Cloud Integrations (AWS, Azure, Google Cloud)",
      "Software-Defined Networking (SDN) Architectures",
      "Disaster Recovery & Solid Business Continuity Planning"
    ]
  },
  {
    id: "compliance-risk",
    title: "Compliance & Risk Management",
    slug: "compliance-risk",
    shortDesc: "Align with regulatory models and minimize business risk via expert cybersecurity frameworks.",
    longDesc: "Meeting industry regulations and managing cybersecurity risks can be complex. Our Compliance & Risk Management solutions help businesses stay compliant with regulatory standards while minimizing vulnerabilities and preparing for strict official compliance audits.",
    icon: "FileCheck",
    imageUrl: svcCompliance,
    offerings: [
      "HIPAA, NIST, GDPR, CMMC, and PCI-DSS compliance audits",
      "Full Security Risk Assessments & External/Internal Pen Testing",
      "DevSecOps pipeline security enforcement",
      "Policy & Corporate Governance Framework Implementation"
    ]
  },
  {
    id: "hardware-software",
    title: "Hardware and Software Procurement",
    slug: "hardware-software",
    shortDesc: "Strategic procurement solutions with premier global tech partnerships to deliver maximum value.",
    longDesc: "When making IT purchasing decisions, businesses need more than just a catalog of hardware and software—they need a strategic partner. We have built strong relationships with leading OEM vendors, ensuring access to cutting-edge hardware, software, and services that align with your business objectives, optimizing costs while securing the top-tier technology your organization needs.",
    icon: "ShoppingBag",
    imageUrl: svcHardware,
    offerings: [
      "Comprehensive OEM hardware sourcing with major brands",
      "Corporate software licensing management & contract reviews",
      "Full technology deployment, config, and enrollment",
      "End-to-end device lifespan support and hardware decommissioning"
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    slug: "healthcare",
    text: "We provide HIPAA-compliant IT and security solutions that ensure patient data protection, secure infrastructure, and regulatory adherence for hospitals, clinics, and healthcare providers. Our solutions help prevent data breaches and optimize IT operations, enhancing patient care and operational efficiency.",
    icon: "ShieldPlus",
    imageUrl: indHealthcare
  },
  {
    id: "government",
    title: "Government",
    slug: "government",
    text: "Our secure cloud and endpoint protection solutions help public sector organizations defend against cyber threats and maintain compliance with government regulations. We implement robust security frameworks that safeguard critical infrastructure and sensitive government data.",
    icon: "Building2",
    imageUrl: indGovernment
  },
  {
    id: "finance",
    title: "Finance & Banking",
    slug: "finance",
    text: "Financial institutions rely on our solutions for regulatory compliance, fraud prevention, and advanced cybersecurity. We deliver end-to-end security services to protect financial transactions, secure sensitive customer data, and ensure adherence to strict regulatory guidelines such as PCI-DSS and FFIEC.",
    icon: "Landmark",
    imageUrl: indFinance
  },
  {
    id: "education",
    title: "Education",
    slug: "education",
    text: "We support K-12 and higher education institutions with cybersecurity and IT solutions that protect student data, enhance learning environments, and ensure compliance with data privacy laws such as FERPA. Our cloud and network solutions enable seamless digital transformation and remote learning capabilities.",
    icon: "GraduationCap",
    imageUrl: indEducation
  },
  {
    id: "enterprise",
    title: "Enterprise & SMBs",
    slug: "enterprise",
    text: "From small businesses to large enterprises, we provide scalable IT solutions that enhance operational efficiency, security, and growth. Our tailored services include cloud infrastructure, IT support, and cybersecurity strategies designed to protect sensitive business data and support digital innovation.",
    icon: "Building",
    imageUrl: indEnterprise
  }
];

export const PROJECTS: Project[] = [
  {
    id: "platform-integration",
    title: "Platform Integration",
    category: "Technology",
    imageUrl: platformIntegrationImg,
    slug: "platform-integration",
    challenge: "A leading regional logistics firm struggled to sync real-time cargo trackers with their internal ERP system. Stale records resulted in delivery bottlenecks and user friction across five distribution centers.",
    solution: "We engineered a secure cloud middleware system using serverless API microservices. This middleware parses, secures, and pushes data streams dynamically using TLS 1.3 encryption and access tokens.",
    results: "Operations achieved true zero-latency status. Synchronization delays plummeted from 45 minutes to sub-second updates, eliminating data anomalies and increasing client satisfaction by 40%.",
    technologies: ["Node.js", "AWS API Gateway", "DynamoDB", "JWT Authentication", "Docker"]
  },
  {
    id: "network-security",
    title: "Network Security",
    category: "Security",
    imageUrl: networkSecurityImg,
    slug: "network-security",
    challenge: "An energy provider faced persistent unauthorized connection attempts on their corporate local network, posing risks to critical infrastructure controls and customer databases.",
    solution: "We deployed an enterprise Zero Trust Network Architecture. This included multi-factor network authentication, segmenting the internal network into high-security zones, and configuring real-time AI-based threat monitoring.",
    results: "Vulnerabilities were sealed. All subsequent unauthorized access attempts were blocked instantly, and the IT security posture rating increased to an A+ scale score.",
    technologies: ["Palo Alto Networks", "Fortinet Firewalls", "SIEM Analytics", "Identity Access Management"]
  },
  {
    id: "web-development",
    title: "Web Development",
    category: "Solution",
    imageUrl: webDevImg,
    slug: "web-development",
    challenge: "A multi-office real estate corporation required a secure, fast, and responsive portal capable of storing thousands of private legal contracts with custom-level permissions.",
    solution: "We built a premium, responsive React-based client web application backed by an encrypted Node backend. Built with multi-level role-based access control, file scanning, and secure AWS S3 storage vaults.",
    results: "Document processing time was reduced by 60%. Real estate agents could safely upload and sign legal documents from mobile devices with zero breach risks.",
    technologies: ["React", "TypeScript", "Node.js", "AWS S3 Encrypted Storage", "Tailwind CSS"]
  },
  {
    id: "it-management",
    title: "IT Management",
    category: "Management",
    imageUrl: itManagementImg,
    slug: "it-management",
    challenge: "An Oregon enterprise was crippled by chronic server downtime, unpatched workstations, and random ransomware vulnerabilities, costing thousands in lost productivity.",
    solution: "We took over as their Managed IT Services Provider (MSSP). Deployed our 24/7 endpoint protection, central automated patching agent, cloud backups, and proactive security monitoring.",
    results: "System uptime rose to a perfect 99.99%. No security incidents have been recorded since, and helpdesk tickets dropped by 75% due to proactive optimization.",
    technologies: ["Soruba RMM Engine", "SentinelOne Endpoint Protection", "Veeam Cloud Backups"]
  },
  {
    id: "ai-development",
    title: "AI Development",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    slug: "ai-development",
    challenge: "A nationwide medical equipment seller needed to automate the categorization and routing of support queries containing highly confidential patient details.",
    solution: "We developed an on-premise, secure machine learning model that automatically filters queries, extracts vital intent tags, and safely masks any HIPAA-sensitive personal health information (PHI) before routing.",
    results: "Query handling sped up by 80% while retaining total compliance. Private patient details are never exposed to unauthorized personnel or external models.",
    technologies: ["Python", "TensorFlow", "HuggingFace Transformers", "HIPAA Masking Engine"]
  },
  {
    id: "design-solutions",
    title: "Design Solutions",
    category: "Solutions",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    slug: "design-solutions",
    challenge: "An online financial consultancy had a cluttered, outdated web presence that failed to convey trust or appeal to high-net-worth Oregon-based investors.",
    solution: "Our team executed a full brand design refresh. We created high-contrast typography schemas, clean SVG interactive elements, and a trustworthy corporate aesthetic that prioritized user clarity and security.",
    results: "Conversion rates on the new corporate layout surged by 55%, and the average duration of client site visits increased to over 4 minutes.",
    technologies: ["UI/UX Research", "Figma", "Tailwind CSS Responsive Design", "Framer Motion"]
  },
  {
    id: "analytic-solutions",
    title: "Analytic Solutions",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    slug: "analytic-solutions",
    challenge: "A manufacturing hub had zero visibility into real-time network traffic patterns, leading to frequent peak-hour congestion and operational slowing.",
    solution: "We deployed network telemetry taps paired with a customized Grafana and SIEM dashboard to visualize and categorize data throughput across all physical hardware systems.",
    results: "Network congestion was resolved permanently. The company rerouted high-bandwidth database backups to non-operational hours, ensuring seamless factory floor connectivity.",
    technologies: ["Grafana", "Prometheus", "Network Telemetry Tap", "Cisco Catalyst"]
  },
  {
    id: "software-development",
    title: "Software Development",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    slug: "software-development",
    challenge: "An Oregon education board required a centralized, secure portal to track and administer staff technology credentials across 12 distinct school districts.",
    solution: "We developed a lightweight, blazing-fast web software portal equipped with automated email alerts, active directory integration, and simple administrator tools.",
    results: "Replaced an outdated, manual spreadsheet workflow with an automated database. Administration errors were slashed to zero.",
    technologies: ["React", "TypeScript", "Vite", "Express", "Active Directory Sync"]
  }
];

export const TEAM: TeamMember[] = [
  {
    id: "cameron",
    name: "Cameron Williamson",
    role: "Scrum Master",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "cameron-williamson",
    bio: "With over 8 years of Agile project leadership, Cameron ensures our engineering and operations sprints are delivered with pinpoint accuracy. He specializes in optimizing communication between enterprise clients and technical development teams, ensuring Soruba projects are finalized on schedule.",
    skills: [
      { name: "Agile Project Coordination", percentage: 95 },
      { name: "DevOps & SRE Alignment", percentage: 88 },
      { name: "Client Communication", percentage: 92 }
    ]
  },
  {
    id: "leslie",
    name: "Leslie Alexander",
    role: "Engineering Lead",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "leslie-alexander",
    bio: "Leslie directs the core architecture of our server, network, and cloud deployments. Her deep expertise in multi-cloud engineering (AWS, Azure) and complex network segmentation ensures that Soruba clients operate on secure, highly redundant modern infrastructures.",
    skills: [
      { name: "Cloud Architecture", percentage: 96 },
      { name: "Network Infrastructure", percentage: 94 },
      { name: "System Redundancy", percentage: 90 }
    ]
  },
  {
    id: "ronald",
    name: "Ronald Richards",
    role: "UI/UX Lead Designer",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "ronald-richards",
    bio: "Ronald is a senior visual designer who believes cybersecurity platforms can be both hyper-secure and visually elegant. He leads the user experience and branding direction, crafting intuitive interfaces that simplify security management for client stakeholders.",
    skills: [
      { name: "UI/UX Visual Design", percentage: 95 },
      { name: "Interactive Prototyping", percentage: 92 },
      { name: "Tailwind CSS Styling", percentage: 88 }
    ]
  },
  {
    id: "darrell",
    name: "Darrell Steward",
    role: "Web Engineer",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80",
    slug: "darrell-steward",
    bio: "Darrell is a frontend wizard specializing in React and responsive TypeScript architectures. He works hand-in-hand with Ronald to translate high-fidelity designs into pixel-perfect, accessible, and fast-loading web realities.",
    skills: [
      { name: "React & TypeScript", percentage: 96 },
      { name: "Responsive CSS Frameworks", percentage: 93 },
      { name: "Web Performance & SEO", percentage: 90 }
    ]
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Every Small Business Needs a Virtual CISO to Stay Secure and Competitive",
    date: "May 1, 2026",
    category: "Cyber Security",
    excerpt: "In a world where cyber threats are growing by the day, a vCISO is not just helpful — it's essential for staying competitive, compliant, and structurally secure.",
    slug: "why-every-small-business-needs-a-virtual-ciso-to-stay-secure-and-competitive",
    tags: ["Business", "Technology", "Cybersecurity"],
    author: "Soruba LLC Security Editorial",
    imageUrl: blogThumb1,
    content: [
      "Our friends at Cyntry just dropped a great post on why every small business should consider having a Virtual CISO. In a world where cyber threats are growing by the day, this post explains why a vCISO is not just helpful — it's essential for staying competitive and safe.",
      "For small and medium-sized businesses (SMBs), hiring a full-time, in-house Chief Information Security Officer (CISO) is often financially out of reach. Executive cybersecurity salaries, benefits, and recruitment costs can easily consume a significant portion of a growing company's annual budget. However, the cyber threats facing SMBs are identical to those targeted at massive conglomerates: ransomware, data theft, spear-phishing, and supply chain compromises.",
      "This is where a Virtual CISO (vCISO) changes the equation. A vCISO provides your organization with on-demand access to executive-level cybersecurity guidance, strategy, and compliance management at a fraction of the cost of a full-time hire. You gain the elite expertise of a veteran cybersecurity professional who understands regulatory frameworks (HIPAA, PCI-DSS, NIST) and can align security initiatives directly with your business goals.",
      "At Soruba LLC, we specialize in delivering vCISO advisory services that bridge the gap between complex technical safeguards and corporate boardrooms. A vCISO will lead risk assessments, draft security policies, manage security team operations, and serve as an authoritative figure to reassure your corporate clients and insurance underwriters that your data is robustly secured. Investing in a vCISO is not just about defending against hacks — it's about building a foundation of digital trust that drives business growth."
    ]
  },
  {
    id: "blog-2",
    title: "Why Zero Trust Security is the Future of Business IT",
    date: "March 13, 2026",
    category: "IT Consultancy",
    excerpt: "Traditional perimeter-based security models are proving inadequate. The Zero Trust Security framework is emerging as the gold standard for modern business safety.",
    slug: "why-zero-trust-security-is-the-future-of-business-it",
    tags: ["Technology", "Security", "Zero-Trust"],
    author: "Soruba LLC Cybersecurity Team",
    imageUrl: blogThumb2,
    content: [
      "As cyber threats become more sophisticated, traditional perimeter-based security models are proving inadequate. The Zero Trust Security framework is emerging as the gold standard for modern businesses.",
      "The core philosophy of Zero Trust is simple: 'Never trust, always verify.' In a traditional 'castle-and-moat' model, anyone inside the network is deemed trustworthy. However, if a hacker steals a single set of employee credentials, they gain unlimited access to roam laterally throughout your entire internal infrastructure.",
      "Zero Trust eliminates this fatal vulnerability. By requiring continuous authentication, strictly segmenting internal networks, enforcing least-privilege access rights, and performing real-time device health validation, Zero Trust ensures that even if an account is compromised, the attacker is immediately contained and neutralised.",
      "At Soruba, we help organizations transition from weak perimeter security to an advanced Zero Trust framework. This transition protects your remote staff, secures multi-cloud environments, and provides executive leadership with complete peace of mind."
    ]
  },
  {
    id: "blog-3",
    title: "The Future of Cybersecurity: Emerging Threats & Best Practices",
    date: "April 27, 2026",
    category: "Cyber Security",
    excerpt: "Cybersecurity is rapidly evolving. We examine the latest threats, such as AI-powered attacks, and discuss how businesses can implement proactive defenses.",
    slug: "the-future-of-cybersecurity-emerging-threats-best-practices",
    tags: ["Technology", "AI", "Cybersecurity"],
    author: "Soruba LLC Research",
    imageUrl: blogThumb3,
    content: [
      "Cybersecurity is rapidly evolving. This blog examines the latest threats, such as AI-powered attacks and supply chain vulnerabilities, and discusses how businesses can implement proactive defense mechanisms.",
      "Hackers are now utilizing sophisticated artificial intelligence engines to write custom malware and generate highly convincing, personalized phishing campaigns at scale. These 'deepfake' social engineering tactics can bypass standard email filters and dupe even tech-savvy staff members.",
      "To counter AI-powered threats, businesses must fight fire with fire. This means employing AI-driven threat detection models that analyze anomalies in network telemetry, automating software patches, and implementing robust employee simulation training.",
      "We recommend starting with a comprehensive vulnerability assessment to identify critical gaps in your defense perimeter. Soruba is ready to execute these advanced audits and assist you in securing your digital workspace."
    ]
  },
  {
    id: "blog-4",
    title: "Cloud Security Strategies: How to Protect Your Digital Infrastructure",
    date: "April 27, 2026",
    category: "Database Security",
    excerpt: "Learn how to establish multi-cloud security vaults, lock database systems, and prevent accidental data leaks.",
    slug: "cloud-security-strategies-how-to-protect-your-digital-infrastructure",
    tags: ["Cloud", "Database", "Security"],
    author: "Soruba LLC Cloud Solutions Group",
    imageUrl: blogThumb4,
    content: [
      "Many companies mistakenly assume that migrating systems to AWS, Azure, or Google Cloud automatically makes them secure. In reality, cloud security operates on a 'Shared Responsibility Model.' While cloud providers secure the physical data centers, YOU are responsible for securing the data you store inside them.",
      "This post details essential strategies to prevent misconfigured storage buckets, lock down virtual server ports, and deploy identity access boundaries to keep corporate databases safe from unauthorized intrusion.",
      "By utilizing robust continuous security audits, encrypting all files at rest and in transit, and monitoring console actions, you can build a highly resilient cloud infrastructure.",
      "Our team at Soruba excels at securing legacy-to-cloud transitions and auditing existing cloud platforms for compliance anomalies. Reach out today to schedule a secure cloud review."
    ]
  },
  {
    id: "blog-5",
    title: "The Role of AI & Automation in Cyber Threat Detection",
    date: "April 27, 2026",
    category: "Cyber Security",
    excerpt: "How automated SIEM and Security Operations Centers identify and block threats in fractions of a second.",
    slug: "the-role-of-ai-automation-in-cyber-threat-detection",
    tags: ["AI", "Automation", "Threat-Hunting"],
    author: "Soruba LLC Threat Lab",
    imageUrl: blogThumb5,
    content: [
      "In modern business, cyberattacks strike in milliseconds. Waiting for a human security analyst to review logs, identify a breach, and manually close a port is too slow. Automation is the only way to defend enterprise assets in real time.",
      "This article describes how AI-driven SIEM (Security Information and Event Management) platforms parse terabytes of server logs, identify minute behavior anomalies, and execute automated playbooks to isolate infected devices within seconds.",
      "By leveraging automated endpoint response, your IT team is freed from alert fatigue and can focus on long-term strategy rather than constantly putting out fires.",
      "Learn how Soruba's 24/7 Security Operations Center utilizes these automated technologies to provide unparalleled defense for our Oregon business partners."
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    title: "Healthcare Institution Enhances Data Security & Compliance",
    body: "A leading healthcare provider faced challenges in securing patient data while ensuring HIPAA compliance. Our team implemented a robust cybersecurity framework, including endpoint encryption, 24/7 monitoring, and access control policies. As a result, the institution saw a 60% reduction in security incidents and full regulatory compliance.",
    clientName: "Dr. Arthur Ike",
    clientRole: "Chief Medical Officer"
  },
  {
    id: "test-2",
    title: "Financial Institution Strengthens Fraud Prevention & Compliance",
    body: "A regional bank needed an advanced fraud detection system and compliance strategy for PCI-DSS. We deployed AI-driven threat analytics and SIEM solutions to monitor transactions in real time. The bank significantly reduced fraudulent activities and streamlined its compliance reporting, enhancing customer trust.",
    clientName: "Marcus Sterling",
    clientRole: "VP of Risk Operations"
  },
  {
    id: "test-3",
    title: "E-Commerce Business Scales Securely with Cloud Infrastructure",
    body: "A fast-growing e-commerce company faced challenges with scalability and cloud security. We migrated their operations to a hybrid cloud model with advanced security controls, automated DevSecOps practices, and disaster recovery solutions. The business achieved a 99.9% uptime, improved application performance, and robust security resilience.",
    clientName: "Sarah Jenkins",
    clientRole: "Director of Digital Commerce"
  },
  {
    id: "test-4",
    title: "Government Agency Implements Zero Trust Architecture",
    body: "We successfully implemented a complete Zero Trust architecture for a public-sector regional office, requiring secure identity access, segmented internal networks, and device-health checks before files could be modified. This resulted in an immediate 100% defense score during compliance reviews and vastly improved public-sector security.",
    clientName: "Honorary David Cho",
    clientRole: "Director of Public Services"
  },
  {
    id: "test-5",
    title: "McLaran Leadership Foundation Transforms Community Initiative with Technology",
    body: "Soruba developed a centralized project coordination dashboard that enhanced collaboration, streamlined communication, and provided real-time visibility across multiple teams. Their strategic use of technology helped transform a complex community initiative into a well-organized, measurable, and impactful project. We highly recommend Soruba to organizations seeking innovative digital solutions that drive efficiency and meaningful results.",
    clientName: "McLaran Leadership Foundation",
    clientRole: "Salem, Oregon"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is included in Soruba’s managed IT services?",
    answer: "Our managed IT services include proactive monitoring, helpdesk support, infrastructure management, endpoint protection, cloud support, compliance guidance, and ongoing technology optimization."
  },
  {
    question: "How can Soruba improve our cybersecurity posture?",
    answer: "We help identify risks, implement layered protection, monitor threats, strengthen identity access, protect endpoints, and create response plans to reduce business security exposure."
  },
  {
    question: "Do you support small and medium-sized businesses?",
    answer: "Yes. Soruba provides scalable IT and cybersecurity solutions for SMBs, enterprises, healthcare, government, education, and financial organizations."
  },
  {
    question: "Can Soruba help with compliance requirements?",
    answer: "Yes. We support compliance needs such as HIPAA, NIST, GDPR, CMMC, PCI-DSS, and security audit preparation."
  }
];

export const STATS = [
  { label: "Satisfied Clients", value: 120, suffix: "+" },
  { label: "Finished Projects", value: 65, suffix: "+" },
  { label: "Skilled Experts", value: 145, suffix: "+" },
  { label: "Media Posts", value: 90, suffix: "+" }
];

export const PARTNERS = [
  "Microsoft",
  "Amazon Web Services AWS",
  "Google Cloud",
  "Palo Alto Networks",
  "CrowdStrike",
  "SonicWall",
  "Fortinet",
  "WatchGuard"
];
