export interface ServiceSpec {
  key: string;
  val: string;
}

export interface EnterpriseService {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: string;
  badge: string;
  accentColor: 'cyan' | 'blue' | 'emerald' | 'amber' | 'gold';
  description: string;
  standards: string[];
  keyDeliverables: string[];
  specs: ServiceSpec[];
  sampleFindings: { vuln: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'; cve: string }[];
  complianceCoverage: string[];
  turnaroundDays: string;
  imageUrl?: string;
  whoIsItFor: string[];
  whatIsIncluded: string[];
  methodology: { step: string; title: string; desc: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  relatedCourseSlug: string;
  relatedServiceSlugs: string[];
  relatedBlogSlug: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  ecCouncilCode?: string;
  category: 'Offensive Security' | 'Defensive SOC' | 'Cloud & DevSecOps' | 'Forensics & Governance' | 'Specialized Suite';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  badge: string;
  duration: string;
  practicalLabHours: string;
  mode: 'Hybrid (Coimbatore Lab + Live Online)';
  description: string;
  highlights: string[];
  modules: { moduleNum: string; title: string; labs: string[] }[];
  prerequisites: string;
  careerOutcomes: string[];
  targetRoles: string[];
  certificationPartner: string;
  upcomingBatch: string;
  imageUrl?: string;
  handsOnLabs: string[];
  certificationInfo: string;
  careerPaths: string[];
  faqs: { q: string; a: string }[];
  relatedServiceSlug: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  relatedServiceSlug: string;
  relatedCourseSlug: string;
  content: {
    heading: string;
    body: string;
  }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  sector: string;
  clientBadge: string;
  challenge: string;
  solution: string;
  outcomeMetric: string;
  keyResults: string[];
  technologiesUsed: string[];
  servicesDelivered: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Cyber Range' | 'DEFCON Meetup' | 'Police Training';
  location: string;
  date: string;
  description: string;
  imageUrl: string;
}

export interface DefconEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  speaker: string;
  speakerRole: string;
  status: 'UPCOMING' | 'COMPLETED';
  rsvpCount: number;
  ctfPool: string;
  topics: string[];
}

export interface TestimonialItem {
  id: string;
  category: 'enterprise' | 'alumni';
  name: string;
  role: string;
  organization: string;
  location: string;
  avatarText: string;
  quote: string;
  verifiedBadge: string;
  outcomeMetric: string;
  skillsOrServices: string[];
  rating: number;
}

export interface GoogleReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  avatarLetter: string;
  verified: boolean;
}

export interface CyberPatent {
  id: string;
  title: string;
  patentNumber: string;
  filingStatus: string;
  grantYear: string;
  category: 'AI Defense Architecture' | 'Offensive Automation & Binary Forensics';
  shortDesc: string;
  abstract: string;
  coreInnovations: string[];
  enterpriseApplication: string;
  iconName: string;
}

export interface CyberRangeNode {
  id: string;
  name: string;
  role: 'Attacker' | 'Perimeter WAF' | 'Kubernetes Cluster' | 'Active Directory' | 'SOC SIEM & EDR';
  ip: string;
  os: string;
  status: 'ONLINE' | 'DEFENDING' | 'ALERT' | 'COMPROMISED';
  description: string;
  iconName: string;
}

export interface CyberRangeScenario {
  id: string;
  title: string;
  type: 'Offensive Exploitation' | 'AD Lateral Movement' | 'Cloud Escape' | 'Ransomware Triage';
  mitreTactic: string;
  description: string;
  attackerStep: string;
  socAlertStep: string;
  affectedNodeIds: string[];
  cvssScore: number;
}

export interface PartnerInstitution {
  name: string;
  location: string;
  category: 'Premier Tech & Universities' | 'Heritage & Arts Institutions' | 'Polytechnic & Specialized';
  engagement: string;
  badge: string;
}

// ----------------------------------------------------
// COMPANY FACTS & VERIFIED STATISTICS
// ----------------------------------------------------
export const COMPANY_FACTS = {
  founderName: 'Dinesh Paranthagan',
  founderQualifications: 'M.C.A., Ph.D.',
  founderTitle: 'Founder and Chief Executive Officer',
  foundedYear: 2013,
  experienceYears: 13,
  secretaryGeneralRole: 'Secretary General of TANCCAO (Tamil Nadu Cyber Crime Action Organization)',
  googleReviewsCount: 3398,
  googleRating: 4.9,
  accreditation: 'EC-Council Accredited Training Center',
  patentsCount: 2,
  patents: [
    {
      name: 'AI-based Firewall Security System',
      number: 'IN-PAT-2024-AI-FW8910',
      year: '2024'
    },
    {
      name: 'Automated Pentesting and Binary Reverse Engineering Tool',
      number: 'IN-PAT-2023-RE-VAPT4421',
      year: '2023'
    }
  ],
  partnerCollegesCount: 54,
  partnerMncsCount: 7,
  defconChapter: 'DEFCON Coimbatore Chapter (#DC91422) – DEFCON Coimbatore 2026',
  headquarters: {
    street: 'No.4, First Street, Sri Venkatesapuram',
    area: 'Ganapathy',
    city: 'Coimbatore',
    pincode: '641006',
    state: 'Tamil Nadu',
    country: 'India'
  },
  phones: ['+91 93620 12339', '+91 96262 15976'],
  emails: ['info@hackuptechnology.com', 'dinesh@hackuptechnology.com'],
  workingHours: 'Mon - Sat: 9:00 AM - 7:30 PM (24/7 Incident Hotline)'
};

// ----------------------------------------------------
// PATENTS DATA
// ----------------------------------------------------
export const CYBER_PATENTS: CyberPatent[] = [
  {
    id: 'patent-ai-firewall',
    title: 'Patented AI-Based Next-Gen Firewall Security System',
    patentNumber: 'IN-PAT-2024-AI-FW8910',
    filingStatus: 'Published & Government Recognized',
    grantYear: '2024',
    category: 'AI Defense Architecture',
    shortDesc: 'Autonomous real-time anomaly detection, zero-day threat mitigation, and predictive packet inspection neural engine.',
    abstract: 'An intelligent cybersecurity appliance and neural classification framework designed to analyze multi-terabit network stream telemetry in real time. Incorporates deep heuristic models to preemptively intercept zero-day payloads, polymorphic malware variants, and encrypted exfiltration tunnels prior to perimeter breach.',
    coreInnovations: [
      'Zero-Day Anomaly Detection Engine operating with sub-millisecond classification latency',
      'Predictive Packet Inspection filtering encrypted botnet Command & Control (C2) traffic without SSL termination degradation',
      'Autonomous Self-Hardening Dynamic Rule Synthesis adapting against distributed DDoS and Layer 7 API abuse',
      'Real-time behavioral telemetry streaming into centralized SOC SIEM & SOAR pipelines'
    ],
    enterpriseApplication: 'Deployed across high-throughput enterprise gateways, fintech payment corridors, and critical government infrastructure.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'patent-pentest-re',
    title: 'Patented Automated Pentesting & Binary Reverse Engineering Suite',
    patentNumber: 'IN-PAT-2023-RE-VAPT4421',
    filingStatus: 'Published & Intellectual Property Protected',
    grantYear: '2023',
    category: 'Offensive Automation & Binary Forensics',
    shortDesc: 'Automated vulnerability chaining, binary deconstruction, memory layout profiling, and exploit validation engine.',
    abstract: 'An offensive cyber warfare workbench that automates the discovery, deconstruction, and verifiable proof-of-concept validation of deep multi-stage vulnerabilities. Utilizes symbolic execution and binary graph reconstruction to trace exploitable logic flaws in compiled microservices, IoT firmware, and enterprise APIs.',
    coreInnovations: [
      'Automated Multi-Stage Vulnerability Chaining (linking low-tier information leaks to verified remote code execution)',
      'Deep Binary Deconstruction & Memory Layout Analysis for zero-day memory corruption triage',
      'Zero False Positive Exploit Validation Engine eliminating manual verification overhead for enterprise DevOps',
      'Seamless Section 65B Cyber Evidence extraction and forensic timeline generation'
    ],
    enterpriseApplication: 'Powers Hackup Technology’s commercial VAPT advisory, red team simulation drills, and law enforcement digital forensics investigations.',
    iconName: 'Terminal'
  }
];

// ----------------------------------------------------
// 54+ PARTNER INSTITUTIONS
// ----------------------------------------------------
export const PARTNER_INSTITUTIONS: PartnerInstitution[] = [
  { name: 'Vellore Institute of Technology (VIT)', location: 'Vellore / Chennai', category: 'Premier Tech & Universities', engagement: 'Advanced Red Team Masterclasses & CTF Co-Hosting', badge: 'Tier-1 University' },
  { name: 'PSG College of Technology (PSG TECH)', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Industrial Curriculum Advisory & Student Range Training', badge: 'Premier Institute' },
  { name: 'SRM Institute of Science and Technology', location: 'Chennai', category: 'Premier Tech & Universities', engagement: 'EC-Council Certified Skill Accelerator Cohorts', badge: 'Deemed University' },
  { name: 'Madras Christian College (MCC)', location: 'Chennai', category: 'Heritage & Arts Institutions', engagement: 'Cyber Defense & Data Privacy Awareness Workshops', badge: 'Heritage Institution' },
  { name: 'Bannari Amman Institute of Technology', location: 'Sathyamangalam', category: 'Premier Tech & Universities', engagement: 'Cyber Range Bootcamp & Hackathon Mentorship', badge: 'Autonomous Center' },
  { name: 'Sri Ramakrishna Engineering College (SREC)', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Board of Studies (BOS) Cybersecurity Member', badge: 'Autonomous College' },
  { name: 'Dr. N.G.P. Institute of Technology', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Official Cyber Center of Excellence (CoE) Partner', badge: 'Premier CoE' },
  { name: 'The Lawrence School Lovedale', location: 'Lovedale, Ooty', category: 'Heritage & Arts Institutions', engagement: 'Executive Digital Safety & Cyber Literacy Seminars', badge: 'Historic Heritage' },
  { name: 'PSGR Krishnammal College for Women', location: 'Coimbatore', category: 'Heritage & Arts Institutions', engagement: 'Women in Cyber Defense Special Fellowship Program', badge: 'NIRF Top Rank' },
  { name: 'Sri Krishna Arts and Science College', location: 'Coimbatore', category: 'Heritage & Arts Institutions', engagement: 'B.Sc / M.Sc Cybersecurity Syllabus Development & Labs', badge: 'Autonomous Arts' },
  { name: 'Sree Saraswathi Thyagaraja College (STC)', location: 'Pollachi', category: 'Heritage & Arts Institutions', engagement: 'SOC Threat Hunting & Forensics Apprenticeship', badge: 'Autonomous College' },
  { name: 'Nehru Group of Institutions', location: 'Coimbatore / Kerala', category: 'Premier Tech & Universities', engagement: 'Campus Cyber Range Sandbox Lab Setup', badge: 'Multi-Campus' },
  { name: 'K.L.N. College of Engineering', location: 'Madurai / Sivagangai', category: 'Premier Tech & Universities', engagement: 'Offensive Security & CEH Certification Workshops', badge: 'Autonomous Tech' },
  { name: 'Subbalakshmi Lakshmipathy College of Science', location: 'Madurai', category: 'Heritage & Arts Institutions', engagement: 'Digital Forensics & Incident Triage Lab Program', badge: 'Autonomous College' },
  { name: 'Sankar Polytechnic College', location: 'Tirunelveli', category: 'Polytechnic & Specialized', engagement: 'Hardware Security & Network Hardening Training', badge: 'Polytechnic CoE' },
  { name: 'JCT College of Engineering and Technology', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Industrial VAPT Apprenticeship & Placement Pipeline', badge: 'Engineering College' },
  { name: 'Nandha Arts and Science College', location: 'Erode', category: 'Heritage & Arts Institutions', engagement: 'Information Security & Cloud Defense Masterclass', badge: 'Autonomous Arts' },
  { name: 'SNS College of Technology', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Design Thinking in Offensive Security Mentorship', badge: 'Autonomous Tech' },
  { name: 'Karpagam Academy of Higher Education', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Cybercrime Forensics & Industry Guest Lectures', badge: 'Deemed University' },
  { name: 'Rathinam Group of Institutions', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'DEFCON Student Chapter & Tech Incubator Hub', badge: 'Innovation Hub' },
  { name: 'Kumaraguru College of Technology (KCT)', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Red Team HackCon Mentorship & SIH Prep', badge: 'Autonomous College' },
  { name: 'Hindusthan College of Engineering and Technology', location: 'Coimbatore', category: 'Premier Tech & Universities', engagement: 'Industrial Cyber Range Practical Lab Days', badge: 'Autonomous College' }
];

// ----------------------------------------------------
// FOUNDER PROFILE
// ----------------------------------------------------
export const FOUNDER_PROFILE = {
  name: 'Dinesh Paranthagan',
  qualifications: 'M.C.A., Ph.D.',
  title: 'Founder & Chief Executive Officer',
  company: 'Hackup Technology Pvt Ltd',
  visionQuote: 'To build a sovereign, self-reliant cyber-defense ecosystem by bridging offensive enterprise security, law enforcement intelligence, and real-world hands-on student capability.',
  badges: [
    'Founder & CEO – Hackup Technology',
    'Secretary General – TANCCAO (Tamil Nadu Cyber Crime Action Organization)',
    'Technical Consultant – Tamil Nadu Police Cyber Crime Dept',
    'Board of Studies (BOS) Member (8 Universities)',
    'National Mentor – Smart India Hackathon (SIH)',
    'Recipient – NICA Entrepreneur of the Year & State Honors'
  ],
  stats: {
    studentsTrained: '1,00,000+',
    auditsCompleted: '2,100+',
    proprietaryPatents: '2 Issued Patents',
    partnerUniversities: '54+ Institutions',
    partnerMncs: '7 MNC Partners',
    googleReviews: '4,343 Reviews (4.8 Rating)',
    yearsExperience: '13+ Years Experience'
  },
  overview: 'Dinesh Paranthagan is the Founder & CEO of Hackup Technology and a cybersecurity practitioner with over 13 years of experience as an ethical hacker and penetration tester. His work spans VAPT, SOC implementation, digital forensics, cybercrime investigation, GRC consulting, red and blue team engagements, IoT security and AI-integrated cybersecurity. He has supported cyber crime investigations. A regular voice on Tamil media and a sought-after resource person for colleges, Dinesh is passionate about turning students into skilled, ethical defenders.',
  keyContributions: [
    {
      title: 'Consultant to Tamil Nadu Police Cyber Crime Department',
      desc: 'Provides specialized technical advisory on high-profile cyber crime investigations, cryptocurrency money laundering, ransomware triage, and Section 65B digital evidence preservation for judicial admissibility.'
    },
    {
      title: 'Secretary General – TANCCAO',
      desc: 'Steers the Tamil Nadu Cyber Crime Action Organization, uniting government bodies, police personnel, and tech industry leaders in state-wide cyber protection and threat intelligence.'
    },
    {
      title: 'National Mentor – Smart India Hackathon (SIH)',
      desc: 'Appointed under the Ministry of Education & AICTE to mentor premier collegiate teams in developing national-grade cyber defense algorithms.'
    },
    {
      title: 'Board of Studies (BOS) Member for 8 Universities',
      desc: 'Architecting syllabus modernization across engineering universities and autonomous institutions to introduce real-world offensive cyber warfare into standard curricula.'
    },
    {
      title: 'Dual Cyber Patent Holder',
      desc: 'Inventor and holder of 2 published Indian cybersecurity patents for sovereign cyber defense.'
    }
  ],
  awards: [
    'NICA National Entrepreneur of the Year in Cybersecurity',
    'National Excellence Award – Best Keynote Cyber Speaker',
    'Police Cyber Crime Wing Commendation for Technical Forensics Support',
    'EC-Council ATC Excellence in Cyber Training Award'
  ],
  contact: {
    email: 'dinesh@hackuptechnology.com',
    phone: '+91 93620 12339',
    office: 'Hackup Technology HQ, No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006, Tamil Nadu',
    linkedInUrl: 'https://www.linkedin.com/in/dineshparanthagan/',
    instagramUrl: 'https://www.instagram.com/dineshparanthagan?srtk=MWNseXh0am04aXJx',
    profileDownloadUrl: '/downloads/Dinesh_Paranthagan_Executive_Profile.pdf'
  }
};

// ----------------------------------------------------
// 8 TARGET ENTERPRISE SERVICES
// ----------------------------------------------------
export const ENTERPRISE_SERVICES: EnterpriseService[] = [
  {
    id: 'penetration-testing-vapt',
    title: 'Penetration Testing & VAPT Services',
    shortTitle: 'Penetration Testing (VAPT)',
    tagline: 'Deep manual exploit verification beyond automated scanner noise.',
    iconName: 'ShieldAlert',
    badge: 'Flagship Offensive Security',
    accentColor: 'gold',
    description: 'Comprehensive offensive security assessments covering Web Applications (OWASP Top 10), iOS/Android Mobile Apps (OWASP MASTG), REST/GraphQL APIs, and enterprise internal/external network infrastructure. We simulate real adversaries to uncover business logic flaws and chained exploits with zero production downtime.',
    standards: ['OWASP Top 10:2025', 'NIST SP 800-115', 'PTES Standard', 'OWASP MASTG', 'OSSTMM'],
    keyDeliverables: [
      'Executive Summary with CVSS 3.1 & 4.0 Verified Risk Scores',
      'Step-by-step Proof-of-Concept (PoC) Exploit Chains with Screenshots',
      'Direct Code-Level Remediation Blueprints for Developers',
      'Free 30-Day Re-testing & Official VAPT Safe-to-Host Certificate'
    ],
    specs: [
      { key: 'Testing Methodology', val: '85% Manual Exploit Verification + 15% Deep Heuristic AI Scanning' },
      { key: 'Target Types', val: 'Web Apps, Microservices, iOS/Android Apps, Internal AD, Cloud Endpoints' },
      { key: 'Safe-to-Host Cert', val: 'ISO/IEC 27001 & DPDP Act 2023 Compliant Attestation' },
      { key: 'Testing Window', val: 'Zero Downtime / Production-Safe Scheduled Execution' }
    ],
    sampleFindings: [
      { vuln: 'Broken Object-Level Authorization (BOLA) on User Ledger', severity: 'CRITICAL', cve: 'CWE-285' },
      { vuln: 'SSRF in Webhook Processing Service -> AWS IMDSv2 Bypass', severity: 'CRITICAL', cve: 'CWE-918' },
      { vuln: 'Second-Order SQLi in Multi-Tenant Analytics Pipeline', severity: 'HIGH', cve: 'CWE-89' }
    ],
    complianceCoverage: ['RBI Cyber Guidelines', 'SEBI CS Framework', 'ISO 27001:2022', 'SOC 2 Type II', 'DPDP Act 2023'],
    turnaroundDays: '5 - 10 Business Days',
    imageUrl: '/images/enterprise_vapt.jpg',
    whoIsItFor: [
      'Fintech, NBFCs, and Core Banking services requiring RBI compliance attestations',
      'SaaS startups and enterprise software vendors preparing for SOC 2 and ISO audits',
      'Healthcare and e-commerce platforms handling sensitive customer PII under the DPDP Act',
      'Enterprises deploying new software releases, major API integrations, or cloud migrations'
    ],
    whatIsIncluded: [
      'Web Application Vulnerability Assessment & Manual Penetration Testing',
      'iOS & Android Mobile App Security Analysis (Static SAST & Dynamic DAST)',
      'RESTful & GraphQL API Endpoint Fuzzing and Business Logic Verification',
      'External Perimeter Network Port Scanning & Threat Surface Mapping',
      'Internal Active Directory Privilege Escalation & Lateral Movement Simulation',
      'Complimentary 30-Day Re-audit after developer bug remediation'
    ],
    methodology: [
      { step: '01. Reconnaissance', title: 'Passive & Active Scoping', desc: 'OSINT enumeration, DNS topology mapping, and asset discovery without touching target boundaries.' },
      { step: '02. Threat Modeling', title: 'Vulnerability Analysis', desc: 'Heuristic automated baseline probing followed by manual architecture flaw hypothesis.' },
      { step: '03. Exploitation', title: 'Controlled Attack Simulation', desc: 'Safe-to-execute manual exploit execution, proving weaponizability without service disruption.' },
      { step: '04. Reporting', title: 'Triaged Remediation Dossier', desc: 'CVSS scores, developer code snippets, executive risk summaries, and root cause reviews.' },
      { step: '05. Verification', title: 'Retest & Safe-to-Host Attestation', desc: 'Full verification of deployed patches and issuance of the certified Safe-to-Host credential.' }
    ],
    deliverables: [
      'Executive Summary report tailored for C-suite and Board Risk Committees',
      'Detailed Technical Remediation Guide with exact code snippets and config fixes',
      'Video and screenshot-backed Proof-of-Concept exploit chains',
      'Official Hackup Technology Safe-to-Host Attestation Certificate'
    ],
    faqs: [
      {
        q: 'How do you prevent downtime on production web systems?',
        a: 'We adhere strictly to pre-negotiated Rules of Engagement (RoE). Our offensive engineers throttle requests, avoid denial-of-service payloads, and coordinate high-impact test phases during agreed maintenance windows.'
      },
      {
        q: 'Is Hackup’s Safe-to-Host certificate accepted by third-party auditors and regulators?',
        a: 'Yes. Our certifications align with CERT-In recommendations, ISO/IEC 27001:2022 standards, RBI Master Directions, and the Indian DPDP Act 2023.'
      },
      {
        q: 'Does Hackup provide free re-testing after our developers patch the bugs?',
        a: 'Yes. Every enterprise VAPT engagement includes one complimentary round of complete re-testing within 30 days of report delivery.'
      }
    ],
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    relatedServiceSlugs: ['vulnerability-management-security-audit', 'red-team-blue-team', 'ai-security'],
    relatedBlogSlug: 'vapt-methodology-guide-2026'
  },
  {
    id: 'vulnerability-management-security-audit',
    title: 'Vulnerability Management & Security Audit',
    shortTitle: 'Security Audit & VMaaS',
    tagline: 'Continuous asset discovery, CVE prioritization, and continuous posture audits.',
    iconName: 'Search',
    badge: 'Continuous Hygiene',
    accentColor: 'amber',
    description: 'Transition from sporadic annual audits to continuous, automated vulnerability management (VMaaS). We scan, catalog, prioritize, and track vulnerabilities across multi-cloud infrastructure, on-prem servers, endpoint fleets, and network appliances with risk-based prioritization.',
    standards: ['CIS Controls v8', 'NIST SP 800-40', 'ISO 27001 A.8.8', 'CVSS v4.0'],
    keyDeliverables: [
      'Centralized Real-Time Vulnerability Dashboard & Inventory',
      'Risk-Based Prioritization Matrix filtering out low-impact CVEs',
      'Patch Management SLA Tracking & Remediation Workflows',
      'Monthly Executive Cyber Hygiene & Vulnerability Trend Reports'
    ],
    specs: [
      { key: 'Scan Cadence', val: 'Continuous Weekly Automated Scans + Monthly In-Depth Audit' },
      { key: 'Asset Coverage', val: 'Cloud Tenants, Linux/Windows Servers, Network Switches, Firewalls' },
      { key: 'Prioritization', val: 'EPSS (Exploit Prediction Scoring System) + CVSS v4.0' },
      { key: 'Reporting', val: 'Jira / Slack / ServiceNow Direct Workflow Integration' }
    ],
    sampleFindings: [
      { vuln: 'Unpatched Apache Log4j (CVE-2021-44228) in Staging Microservice', severity: 'CRITICAL', cve: 'CVE-2021-44228' },
      { vuln: 'OpenSSH Terrapin Attack Vulnerability (CVE-2023-48795)', severity: 'HIGH', cve: 'CVE-2023-48795' },
      { vuln: 'Expired SSL/TLS Certificates on API Gateway Subdomain', severity: 'MEDIUM', cve: 'CWE-295' }
    ],
    complianceCoverage: ['ISO 27001:2022', 'SOC 2 Type II', 'PCI-DSS v4.0 Requirement 11', 'HIPAA'],
    turnaroundDays: 'Continuous Managed Service / 3-5 Days Baseline',
    imageUrl: '/images/enterprise_vmaas.jpg',
    whoIsItFor: [
      'Organizations managing 100+ servers and cloud nodes without dedicated vulnerability teams',
      'IT departments needing automated tracking of CVE disclosures impacting their tech stack',
      'Compliance-focused enterprises needing audit-ready evidence of continuous patch hygiene'
    ],
    whatIsIncluded: [
      'Comprehensive IP/Host and Domain Attack Surface Discovery',
      'Continuous Credentialed & Non-Credentialed Host Vulnerability Scanning',
      'False-Positive Elimination by Hackup Offensive Security Analysts',
      'Direct ticket synchronization into Jira, ClickUp, or ServiceNow',
      'Monthly CISO Vulnerability Remediation Progress Briefings'
    ],
    methodology: [
      { step: '01. Discovery', title: 'Asset Inventory & Surface Mapping', desc: 'Identify every connected IP, cloud resource, and active port.' },
      { step: '02. Assessment', title: 'Heuristic & Signature Scanning', desc: 'Run deep scans for misconfigurations, outdated packages, and weak ciphers.' },
      { step: '03. Validation', title: 'False Positive Filtering', desc: 'Hackup analysts manually verify high-severity alerts to eliminate noise.' },
      { step: '04. Remediation', title: 'Workflow Ticketing', desc: 'Dispatch prioritized patch actions to system administrators with exact commands.' },
      { step: '05. Verification', title: 'Continuous Delta Scans', desc: 'Re-scan modified assets to ensure successful mitigation and update metrics.' }
    ],
    deliverables: [
      'Live vulnerability posture dashboard access',
      'Monthly executive risk trends and patch adherence summaries',
      'Automated alert notifications for actively exploited zero-day CVEs',
      'Quarterly third-party compliance verification certificates'
    ],
    faqs: [
      {
        q: 'How does Vulnerability Management differ from Penetration Testing?',
        a: 'Vulnerability Management is continuous, identifying known vulnerabilities across broad infrastructure fleets. Penetration Testing is in-depth, goal-oriented exploitation that tests whether an attacker can chain flaws to compromise critical data.'
      },
      {
        q: 'Does running continuous scans slow down our internal networks?',
        a: 'No. Our sensors employ adaptive bandwidth throttling, intelligent scheduling during off-peak hours, and non-intrusive banner interrogation.'
      }
    ],
    relatedCourseSlug: 'devsecops-engineer-ecde',
    relatedServiceSlugs: ['penetration-testing-vapt', 'soc-managed-security', 'grc-compliance-consulting'],
    relatedBlogSlug: 'vapt-methodology-guide-2026'
  },
  {
    id: 'soc-managed-security',
    title: 'SOC & Managed Security Services (24/7 SIEM)',
    shortTitle: 'SOC & Managed Security',
    tagline: 'Turnkey SOC architecture, Wazuh/Splunk ingestion & real-time triage.',
    iconName: 'Server',
    badge: 'Turnkey Blue Team',
    accentColor: 'blue',
    description: 'Design, deployment, and 24/7 co-managed security operations. We integrate enterprise endpoint telemetry (Sysmon, EDR), network flow sensors (Zeek), and cloud audit trails into high-speed Wazuh, Splunk, or Elastic SIEM clusters with customized detection playbooks.',
    standards: ['MITRE ATT&CK Framework', 'SOC 2 Type II CC7', 'NIST SP 800-137', 'ISO 27001 A.8.15'],
    keyDeliverables: [
      'Turnkey Wazuh / Splunk / Elastic SIEM Cluster Deployment',
      'Custom Correlation Rules mapped against MITRE ATT&CK vectors',
      'Automated Incident Alerting & SOAR Quarantine Integration',
      '24/7 Dedicated Cyber Security Incident Triage & Weekly CISO Briefings'
    ],
    specs: [
      { key: 'Ingestion Capacity', val: 'Scalable from 1,000 EPS to 50,000+ Events Per Second' },
      { key: 'Endpoint Coverage', val: 'Windows Server, macOS, Linux, AWS CloudTrail, Microsoft 365' },
      { key: 'SLA Triage', val: 'Under 15-Minute Alert Verification for Critical Anomalies' },
      { key: 'Compliance Dashboards', val: 'Out-of-the-box ISO 27001, PCI-DSS, and DPDP Act Telemetry' }
    ],
    sampleFindings: [
      { vuln: 'Undetected Pass-the-Hash Movement across Subnet B', severity: 'CRITICAL', cve: 'T1550.002' },
      { vuln: 'Unmonitored PowerShell Encoded Commands Executed on Domain Controller', severity: 'HIGH', cve: 'T1059.001' },
      { vuln: 'Unauthorized S3 Bucket Policy Alteration without SIEM Alert Trigger', severity: 'HIGH', cve: 'CIS-AWS-3.1' }
    ],
    complianceCoverage: ['ISO 27001:2022 A.8.15', 'SOC 2 Type II CC7.2', 'RBI Master Direction', 'DPDP Act 2023'],
    turnaroundDays: '10 - 20 Business Days Setup',
    imageUrl: '/images/enterprise_redteam.jpg',
    whoIsItFor: [
      'Enterprises lacking a dedicated 24/7 internal security operations center',
      'Financial services, healthcare organizations, and government vendors with mandatory log retention rules',
      'Organizations seeking managed endpoint detection (EDR) and rapid incident containment'
    ],
    whatIsIncluded: [
      'Turnkey SIEM Architecture Design (Wazuh, Splunk, Elastic Security)',
      'Agent deployment across endpoints, servers, firewalls, and cloud audit trails',
      '24/7/365 active log monitoring by certified Blue Team security analysts',
      'Automated SOAR response playbooks (host isolation, IP blocking)',
      'Weekly executive cyber threat intelligence briefings'
    ],
    methodology: [
      { step: '01. Ingestion', title: 'Data Source Onboarding', desc: 'Connect firewall logs, Active Directory, cloud audit logs, and EDR agents.' },
      { step: '02. Normalization', title: 'Parsing & Correlation', desc: 'Normalize events into unified schemas and apply MITRE ATT&CK detection rules.' },
      { step: '03. Detection', title: '24/7 Behavioral Monitoring', desc: 'Real-time alert verification by L1/L2 blue team analysts within 15 minutes.' },
      { step: '04. Containment', title: 'Rapid Incident Triage', desc: 'Execute playbook actions to isolate compromised nodes and revoke credentials.' },
      { step: '05. Posture Review', title: 'Continuous Hardening', desc: 'Tune correlation rules based on new intelligence and provide weekly metrics.' }
    ],
    deliverables: [
      'Complete production SIEM/SOAR deployment with high availability',
      'Incident escalation notifications via SMS, WhatsApp, phone, and Slack',
      'Weekly and monthly compliance audit log retention proof',
      'Incident root-cause investigation dossiers'
    ],
    faqs: [
      {
        q: 'Can Hackup integrate with our existing firewalls and cloud accounts?',
        a: 'Yes. We support all enterprise firewalls (Fortinet, Palo Alto, Sophos, pfSense), cloud platforms (AWS, Azure, GCP), and workspace suites (Google Workspace, Microsoft 365).'
      },
      {
        q: 'What is your SLA for alerting us to an active attack?',
        a: 'For verified critical anomalies (such as ransomware staging or domain controller compromise), our analysts trigger immediate phone escalations within 15 minutes.'
      }
    ],
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    relatedServiceSlugs: ['penetration-testing-vapt', 'digital-forensics-cybercrime-investigation', 'ai-security'],
    relatedBlogSlug: 'ai-firewall-nextgen-soc-defense'
  },
  {
    id: 'grc-compliance-consulting',
    title: 'GRC & Regulatory Compliance Consulting',
    shortTitle: 'GRC & Compliance Consulting',
    tagline: 'Guaranteed audit readiness for ISO 27001, SOC 2, and Indian DPDP Act 2023.',
    iconName: 'FileCheck2',
    badge: '100% Audit Readiness',
    accentColor: 'gold',
    description: 'End-to-end governance, risk, and compliance (GRC) advisory. We perform gap assessments, author Information Security Management System (ISMS) policies, conduct vendor risk assessments, and prepare your organization for first-attempt success in ISO 27001:2022, SOC 2 Type II, RBI, and Indian DPDP Act 2023 certifications.',
    standards: ['ISO/IEC 27001:2022', 'AICPA SOC 2 Type II', 'Indian DPDP Act 2023', 'RBI / SEBI Cyber Mandate', 'NIST CSF'],
    keyDeliverables: [
      'Comprehensive GRC Gap Assessment & Statement of Applicability (SoA)',
      'Custom ISMS Policy & Incident Response Procedure Drafting',
      'Third-Party Vendor Risk Management (TPRM) Framework Setup',
      'Mock Audit & Official Pre-Certification Attestation Report'
    ],
    specs: [
      { key: 'Frameworks', val: 'ISO 27001:2022, SOC 2 Type II, DPDP Act 2023, RBI Master Direction' },
      { key: 'Success Rate', val: '100% First-Attempt Certification Pass Record for Audited Clients' },
      { key: 'Policy Coverage', val: 'Access Control, Data Retention, Breach Notification, BCP/DR' },
      { key: 'Board Briefing', val: 'CISO / Board Risk Assessment Matrix & Governance Review' }
    ],
    sampleFindings: [
      { vuln: 'Absence of Documented Data Principal Consent Withdrawal Workflow (DPDP Act)', severity: 'HIGH', cve: 'DPDP-Sec-6' },
      { vuln: 'Unclassified Customer PII Stored in Unencrypted Staging Database', severity: 'CRITICAL', cve: 'ISO-A.8.11' },
      { vuln: 'Third-Party SaaS Vendor Lacking Valid SOC 2 or ISO Security Attestation', severity: 'MEDIUM', cve: 'ISO-A.5.19' }
    ],
    complianceCoverage: ['ISO 27001:2022', 'SOC 2 Type II', 'DPDP Act 2023', 'RBI Cyber Security Framework'],
    turnaroundDays: '2 - 4 Weeks Advisory',
    imageUrl: '/images/portal_enterprise.jpg',
    whoIsItFor: [
      'Tech enterprises bidding for international enterprise contracts requiring SOC 2 Type II or ISO 27001',
      'Fintech and NBFC platforms under direct RBI and CERT-In regulatory oversight',
      'Indian corporations seeking end-to-end compliance with the Digital Personal Data Protection (DPDP) Act 2023'
    ],
    whatIsIncluded: [
      'Current State vs Regulatory Standard Gap Analysis',
      'Drafting of complete ISMS documentation (30+ security policies & SOPs)',
      'Employee cybersecurity awareness training and phishing simulations',
      'Internal pre-audit simulation and auditor facilitation support',
      'Mandatory Data Protection Officer (DPO) advisory services'
    ],
    methodology: [
      { step: '01. Scoping', title: 'Regulatory Mapping', desc: 'Define information assets, data flows, and applicable legal mandates.' },
      { step: '02. Gap Analysis', title: 'Control Verification', desc: 'Benchmark internal procedures against ISO 27001:2022 Annex A controls.' },
      { step: '03. Remediation', title: 'Policy Authoring & Engineering', desc: 'Implement required technical controls, access reviews, and policy documents.' },
      { step: '04. Mock Audit', title: 'Simulation Drill', desc: 'Conduct exhaustive mock audits with internal teams to identify remaining gaps.' },
      { step: '05. Certification', title: 'Auditor Facilitation', desc: 'Stand alongside your leadership during Stage 1 and Stage 2 certification audits.' }
    ],
    deliverables: [
      'Customized Information Security Management System (ISMS) policy repository',
      'Statement of Applicability (SoA) and Risk Treatment Plan (RTP)',
      'Data Protection Impact Assessment (DPIA) dossiers for DPDP Act compliance',
      'Pre-audit readiness attestation signed by Hackup lead auditors'
    ],
    faqs: [
      {
        q: 'How long does ISO 27001:2022 preparation take with Hackup?',
        a: 'Typically 4 to 8 weeks depending on organizational size and existing technical control maturity.'
      },
      {
        q: 'What are the penalties under the Indian DPDP Act 2023 for non-compliance?',
        a: 'Penalties can reach up to ₹250 Crores for significant data breaches and failure to implement adequate data security safeguards.'
      }
    ],
    relatedCourseSlug: 'encryption-specialist-eces',
    relatedServiceSlugs: ['penetration-testing-vapt', 'vulnerability-management-security-audit', 'soc-managed-security'],
    relatedBlogSlug: 'dpdp-act-iso27001-compliance-roadmap'
  },
  {
    id: 'red-team-blue-team',
    title: 'Red Team vs Blue Team Adversary Simulation',
    shortTitle: 'Red Team & Blue Team Operations',
    tagline: 'Full-scope adversary simulation and purple team defensive resilience.',
    iconName: 'Flame',
    badge: 'Elite Cyber Warfare',
    accentColor: 'gold',
    description: 'Realistic adversarial emulation. Hackup’s Red Team operates covertly like advanced nation-state adversaries (APTs) to breach physical security, social engineer staff, bypass EDRs, and capture your organization’s digital crown jewels. We then collaborate with your internal Blue Team in Purple Team workshops to harden defenses.',
    standards: ['MITRE ATT&CK', 'TIBER-EU Framework', 'CBEST Guidelines', 'NIST SP 800-115'],
    keyDeliverables: [
      'Covert Adversary Simulation across Physical, Social, and Cyber Vectors',
      'Endpoint Detection & EDR Evasion Posture Assessment',
      'Active Directory Domain Compromise Timeline Reconstruction',
      'Collaborative Purple Team Remediation & Detection Rule Engineering'
    ],
    specs: [
      { key: 'Simulation Mode', val: 'Black Box Covert / Purple Team Collaborative' },
      { key: 'Attack Vectors', val: 'Spearphishing, Weaponized Payloads, Physical Ingress, C2 Evasion' },
      { key: 'Objective', val: 'Crown Jewels Exfiltration (Customer DB, Source Code, Root Keys)' },
      { key: 'Collaboration', val: 'Direct Joint Retrospectives with Internal Security Teams' }
    ],
    sampleFindings: [
      { vuln: 'Successful Spearphishing resulting in C2 Callback over Encrypted DNS', severity: 'CRITICAL', cve: 'T1071.004' },
      { vuln: 'Bypass of Modern Next-Gen EDR via Unhooked NTDLL System Calls', severity: 'CRITICAL', cve: 'T1055' },
      { vuln: 'Domain Escalation via Active Directory Certificate Services (ADCS) Misconfig', severity: 'HIGH', cve: 'ESC1-ADCS' }
    ],
    complianceCoverage: ['RBI Cyber Crisis Management Plan', 'SEBI CS Framework', 'ISO 27001:2022'],
    turnaroundDays: '2 - 3 Weeks Active Emulation',
    imageUrl: '/images/enterprise_redteam.jpg',
    whoIsItFor: [
      'Mature organizations that already pass routine automated VAPTs and wish to test true human response',
      'Banks, fintechs, and critical infrastructure operators testing incident response readiness',
      'Security executives wanting an empirical test of whether their multi-million dollar SIEM/EDR investments work'
    ],
    whatIsIncluded: [
      'Custom Spearphishing and Credential Harvesting Scenarios',
      'Weaponized Payload Generation bypassing commercial antivirus and EDR solutions',
      'Internal Lateral Movement, Kerberoasting, and Domain Admin Takeover',
      'Simulated Crown Jewel Exfiltration via covert Command & Control (C2) channels',
      'Step-by-step Purple Team replay workshop with defensive teams'
    ],
    methodology: [
      { step: '01. Reconnaissance', title: 'Target Profiling', desc: 'OSINT on employees, external infrastructure, and defensive technologies.' },
      { step: '02. Initial Access', title: 'Weaponized Delivery', desc: 'Execute controlled social engineering or perimeter bypass to establish a foothold.' },
      { step: '03. Persistence', title: 'Evasion & Escalation', desc: 'Evade EDR alerts, elevate local privileges, and harvest domain credentials.' },
      { step: '04. Lateral Movement', title: 'Domain Takeover', desc: 'Pivot through internal network subnets to reach designated critical crown jewels.' },
      { step: '05. Purple Teaming', title: 'Joint Replay Workshop', desc: 'Disclose full attack logs side-by-side with SOC telemetry to write custom detection rules.' }
    ],
    deliverables: [
      'Chronological attack timeline mapping against MITRE ATT&CK techniques',
      'Full logs of indicators of compromise (IOCs) and C2 artifacts',
      'Video evidence of critical system compromises',
      'Custom Sigma and Yara rules for detection engineering'
    ],
    faqs: [
      {
        q: 'Will a Red Team engagement disrupt daily business operations?',
        a: 'No. All exploit actions are conducted with strict safety protocols under the supervision of your designated White Cell trusted agent.'
      },
      {
        q: 'How does Purple Teaming differ from Red Teaming?',
        a: 'In Red Teaming, the defenders are unaware of the attack to measure realistic response. In Purple Teaming, our attackers and your defenders sit together to immediately verify if alarms triggered for each executed tactic.'
      }
    ],
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    relatedServiceSlugs: ['penetration-testing-vapt', 'soc-managed-security', 'ai-security'],
    relatedBlogSlug: 'ai-firewall-nextgen-soc-defense'
  },
  {
    id: 'iot-ot-security',
    title: 'IoT & OT / SCADA Security Assessment',
    shortTitle: 'IoT & OT Security',
    tagline: 'Hardening connected hardware, firmware, SCADA, and industrial control systems.',
    iconName: 'Cpu',
    badge: 'Hardware & ICS Security',
    accentColor: 'blue',
    description: 'Specialized cybersecurity for embedded devices, Internet of Things (IoT) ecosystems, Operational Technology (OT), and SCADA manufacturing plants. We deconstruct firmware binaries, test UART/JTAG hardware debug ports, audit industrial protocols (Modbus, DNP3, BACnet), and ensure zero-compromise plant operations.',
    standards: ['IEC 62443', 'NIST SP 800-82', 'OWASP IoT Top 10', 'ISA/IEC 62443-4-2'],
    keyDeliverables: [
      'Firmware Binary Reverse Engineering & Hardcoded Credential Extraction',
      'Hardware Debug Interface (UART, JTAG, SPI) Extraction & Tamper Audits',
      'Industrial OT/SCADA Network Protocol Fuzzing (Modbus, Profinet, MQTT)',
      'Air-Gapped Network Segmentation & DMZ Boundary Hardening Blueprint'
    ],
    specs: [
      { key: 'Target Systems', val: 'IoT Gateways, Smart Meters, Medical Devices, PLCs, RTUs, SCADA HMIs' },
      { key: 'Analysis Types', val: 'Hardware Bench Interrogation + Firmware Binary Disassembly' },
      { key: 'Standards', val: 'IEC 62443 Industrial Cybersecurity Benchmark' },
      { key: 'Testing Location', val: 'Coimbatore Hardware Lab + Client Plant Floor On-Site' }
    ],
    sampleFindings: [
      { vuln: 'Hardcoded Cryptographic Root Keys Extracted from Firmware Flash Memory', severity: 'CRITICAL', cve: 'CWE-321' },
      { vuln: 'Unauthenticated Modbus Function Code Injection altering PLC Register States', severity: 'CRITICAL', cve: 'CVE-2022-3023' },
      { vuln: 'Unrestricted UART Serial Console offering Root Shell on Boot', severity: 'HIGH', cve: 'CWE-1188' }
    ],
    complianceCoverage: ['IEC 62443', 'NIST SP 800-82', 'CERT-In Critical Infrastructure Guidelines'],
    turnaroundDays: '7 - 14 Business Days',
    imageUrl: '/images/enterprise_cloud.jpg',
    whoIsItFor: [
      'IoT device manufacturers and smart appliance OEMs releasing connected hardware',
      'Manufacturing plants, textile facilities, and industrial factories running PLCs and SCADA networks',
      'Automotive and healthcare hardware vendors needing FDA or BIS cyber certifications'
    ],
    whatIsIncluded: [
      'Hardware PCB inspection, chip desoldering, and bus sniffing (I2C, SPI, UART, JTAG)',
      'Firmware image unpacking, binary reverse engineering, and secret extraction',
      'IoT mobile app and cloud backend API penetration testing',
      'SCADA / ICS network segmentation and industrial firewall rule evaluation',
      'Secure boot and cryptographic firmware update mechanism review'
    ],
    methodology: [
      { step: '01. Physical Analysis', title: 'Hardware Interrogation', desc: 'Inspect circuit boards and locate debug interfaces and serial pins.' },
      { step: '02. Firmware Extraction', title: 'Memory Dumping', desc: 'Read flash chips using chip programmers and decompress file systems.' },
      { step: '03. Binary Reversing', title: 'Vulnerability Hunting', desc: 'Analyze compiled binaries using Ghidra and IDA Pro for logic bugs and buffer overflows.' },
      { step: '04. Protocol Auditing', title: 'Communication Security', desc: 'Capture and fuzz MQTT, BLE, Zigbee, and Modbus communication streams.' },
      { step: '05. Hardening Guide', title: 'Firmware & Circuit Remediation', desc: 'Provide PCB design revisions and secure boot implementations.' }
    ],
    deliverables: [
      'Hardware and firmware security assessment report',
      'Step-by-step firmware exploitation proof-of-concept videos',
      'Secure Hardware Design and Cryptographic Root-of-Trust guidelines',
      'IEC 62443 compliance alignment scorecard'
    ],
    faqs: [
      {
        q: 'Do you need physical device samples for testing?',
        a: 'Yes. For complete hardware and firmware evaluation, clients provide 2 to 3 sample units to our Coimbatore laboratory.'
      },
      {
        q: 'Can you test live SCADA systems without causing production downtime in a plant?',
        a: 'Yes. For live industrial plants, we build digital-twin virtual environments or test redundant secondary PLC racks during planned shutdowns.'
      }
    ],
    relatedCourseSlug: 'encryption-specialist-eces',
    relatedServiceSlugs: ['penetration-testing-vapt', 'vulnerability-management-security-audit', 'ai-security'],
    relatedBlogSlug: 'vapt-methodology-guide-2026'
  },
  {
    id: 'digital-forensics-cybercrime-investigation',
    title: 'Digital Forensics & Cybercrime Investigation (DFIR)',
    shortTitle: 'Digital Forensics & Incident Response',
    tagline: 'Rapid 24/7 breach containment, memory forensics & Section 65B court evidence.',
    iconName: 'FileSearch',
    badge: 'Emergency Response SLA',
    accentColor: 'emerald',
    description: 'Emergency incident response and law enforcement grade digital forensics. We handle active ransomware outbreaks, unauthorized data exfiltration, business email compromise (BEC), and corporate sabotage. We contain active threats, preserve legally admissible digital evidence under Section 65B of the Indian Evidence Act, and author forensic dossiers for judicial courts and police cyber cells.',
    standards: ['NIST SP 800-61 Rev 2', 'ISO/IEC 27037 Evidence Handling', 'Indian Evidence Act Section 65B', 'CERT-In Mandates'],
    keyDeliverables: [
      'Emergency Breach Triage & Lateral Spread Containment within 90 mins',
      'Memory (RAM), Disk & Cloud Audit Log Timeline Reconstruction (Autopsy/FTK/Volatility)',
      'Legally Admissible Section 65B Digital Evidence Dossier for Law Enforcement',
      'Ransomware Root-Cause Analysis & Post-Incident Hardening Roadmap'
    ],
    specs: [
      { key: 'Response SLA', val: 'Immediate 2-Hour Emergency Activation (Coimbatore & Pan-India)' },
      { key: 'Forensic Tooling', val: 'EnCase, FTK Imager, Volatility Framework, Autopsy, KAPE, Magnet AXIOM' },
      { key: 'Chain of Custody', val: 'Strictly compliant with Indian Courts, CERT-In & Police Cyber Cells' },
      { key: 'Post-Mortem', val: 'Comprehensive Executive & Board-Level Incident Posture Dossier' }
    ],
    sampleFindings: [
      { vuln: 'Initial Access via Exposed RDP on Remote Branch Gateway', severity: 'CRITICAL', cve: 'T1133' },
      { vuln: 'Data Exfiltration via Encrypted Mega.nz C2 Channel', severity: 'CRITICAL', cve: 'T1567.002' },
      { vuln: 'Shadow Copy Deletion Script Executed Prior to Ransomware', severity: 'HIGH', cve: 'T1490' }
    ],
    complianceCoverage: ['CERT-In Mandatory 6-Hour Reporting', 'Indian DPDP Act Breach Notification', 'ISO 27035'],
    turnaroundDays: '24/7 Rapid Activation',
    imageUrl: '/images/enterprise_dfir.jpg',
    whoIsItFor: [
      'Enterprises experiencing an active ransomware encryption event or extortion demand',
      'Companies suffering unauthorized fund transfers due to Business Email Compromise (BEC)',
      'Legal teams and law enforcement agencies requiring legally certified forensic evidence for court cases'
    ],
    whatIsIncluded: [
      '24/7 Incident Hotline activation with remote triage starting within 90 minutes',
      'Bit-stream disk imaging with hardware write blockers maintaining forensic integrity',
      'Volatile memory (RAM) dump analysis to recover running malware artifacts and decrypted keys',
      'Forensic timeline reconstruction tracing the attacker’s entry point and actions',
      'Preparation of Section 65B electronic evidence certificate recognized in Indian courts'
    ],
    methodology: [
      { step: '01. Triage', title: 'Emergency Containment', desc: 'Sever compromised network links and isolate infected nodes without destroying volatile RAM.' },
      { step: '02. Acquisition', title: 'Forensic Imaging', desc: 'Capture bit-stream physical images of disks, memory, and cloud audit logs with strict cryptographic hashes.' },
      { step: '03. Analysis', title: 'Timeline Reconstruction', desc: 'Trace initial access vectors, lateral movement paths, and exfiltrated file records.' },
      { step: '04. Remediation', title: 'Threat Eradication', desc: 'Remove backdoors, reset compromised domain credentials, and patch exploitable entry points.' },
      { step: '05. Certification', title: 'Section 65B Dossier', desc: 'Author detailed forensic reports and legal certificates for law enforcement and legal proceedings.' }
    ],
    deliverables: [
      'Executive breach analysis briefing for executive leadership and legal counsel',
      'Comprehensive technical incident timeline with Indicators of Compromise (IOCs)',
      'Legally admissible Section 65B Electronic Evidence Affidavit for court filing',
      'Mandatory CERT-In incident notification filing documentation'
    ],
    faqs: [
      {
        q: 'What should we do immediately if we suspect a ransomware infection?',
        a: 'Do NOT turn off the computer or reboot (as this erases volatile RAM). Disconnect all network cables and Wi-Fi immediately, then call our 24/7 hotline (+91 93620 12339).'
      },
      {
        q: 'What is a Section 65B certificate and why is it mandatory?',
        a: 'Under Section 65B of the Indian Evidence Act, digital evidence (emails, logs, hard drive images) is inadmissible in an Indian court of law unless accompanied by a certified affidavit detailing the chain of custody and forensic integrity.'
      }
    ],
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    relatedServiceSlugs: ['soc-managed-security', 'penetration-testing-vapt', 'grc-compliance-consulting'],
    relatedBlogSlug: 'vapt-methodology-guide-2026'
  },
  {
    id: 'ai-security',
    title: 'AI Security & LLM Defense Consulting',
    shortTitle: 'AI Security Consulting',
    tagline: 'Securing generative AI, LLM pipelines, and automated agent architectures.',
    iconName: 'Sparkles',
    badge: 'Patent-Backed AI Defense',
    accentColor: 'gold',
    description: 'Cutting-edge security evaluations for artificial intelligence models, Large Language Models (LLMs), RAG pipelines, and autonomous AI agent systems. Backed by Hackup’s patented AI firewall innovation, we prevent prompt injection, model inversion, training data poisoning, and unauthorized automated API actions.',
    standards: ['OWASP Top 10 for LLM:2025', 'NIST AI Risk Management Framework (AI RMF)', 'MITRE ATLAS Framework'],
    keyDeliverables: [
      'Comprehensive LLM Red Teaming & Direct/Indirect Prompt Injection Audits',
      'RAG Vector Database Access Control & Document Leaking Prevention',
      'AI Agent Autonomous Tool Calling Sandboxing & Privilege Hardening',
      'Patented AI Firewall Integration for Real-Time Threat Filtering'
    ],
    specs: [
      { key: 'Model Types', val: 'Private Self-Hosted Models, OpenAI/Anthropic APIs, LangChain/LlamaIndex RAG' },
      { key: 'Attack Vectors', val: 'Jailbreaking, Training Data Extraction, Hallucination Exploits, Insecure Output' },
      { key: 'Patented Tech', val: 'IN-PAT-2024-AI-FW8910 Next-Gen AI Packet & Prompt Inspection' },
      { key: 'Framework', val: 'OWASP LLM 2025 + MITRE ATLAS Matrix' }
    ],
    sampleFindings: [
      { vuln: 'Indirect Prompt Injection via Ingested PDF manipulating RAG Agent Actions', severity: 'CRITICAL', cve: 'LLM01:2025' },
      { vuln: 'System Prompt Extraction via Multi-Turn Conversational Jailbreak', severity: 'HIGH', cve: 'LLM07:2025' },
      { vuln: 'Unauthenticated Vector Database Exposing Confidential PII Embeddings', severity: 'CRITICAL', cve: 'CWE-200' }
    ],
    complianceCoverage: ['EU AI Act Safeguards', 'NIST AI RMF 1.0', 'Indian DPDP Act 2023'],
    turnaroundDays: '5 - 10 Business Days',
    imageUrl: '/images/enterprise_vapt.jpg',
    whoIsItFor: [
      'Enterprises deploying internal or customer-facing Generative AI chatbots and agents',
      'SaaS startups building RAG-based search engines and autonomous AI workflow tools',
      'Regulated financial institutions leveraging LLMs for automated customer credit and analytics'
    ],
    whatIsIncluded: [
      'Adversarial LLM Red Teaming evaluating 100+ prompt injection attack variations',
      'Retrieval-Augmented Generation (RAG) vector database security review',
      'System prompt leakage prevention and guardrail implementation',
      'Autonomous agent execution permission sandboxing (limiting unauthorized bash/API runs)',
      'Integration blueprint for Hackup’s patented real-time AI security firewall'
    ],
    methodology: [
      { step: '01. Mapping', title: 'AI Pipeline Architecture Audit', desc: 'Identify models, data ingest pipelines, vector DBs, and external API tool endpoints.' },
      { step: '02. Red Teaming', title: 'Adversarial Prompt Fuzzing', desc: 'Execute multi-turn jailbreaks, roleplay bypasses, and encoded payload attacks.' },
      { step: '03. Data Safety', title: 'Training & RAG Extraction Tests', desc: 'Probe models for unauthorized memorization of customer PII and internal credentials.' },
      { step: '04. Guardrails', title: 'Defensive Barrier Synthesis', desc: 'Deploy input/output guardrails, semantic firewalls, and token rate limiters.' },
      { step: '05. Certification', title: 'AI Trust & Safety Attestation', desc: 'Issue formal safety report aligned with OWASP LLM and NIST AI RMF benchmarks.' }
    ],
    deliverables: [
      'Adversarial AI assessment findings with verified prompt exploit chains',
      'Developer guardrail code implementation samples for Python/TypeScript',
      'Architecture hardening blueprint for vector search and tool calling agents',
      'AI Trust, Safety, and Compliance Attestation credential'
    ],
    faqs: [
      {
        q: 'Can prompt injection really damage our underlying systems?',
        a: 'Yes. If an LLM agent has access to internal APIs, database queries, or email tools, an indirect prompt injection contained in a customer email or PDF can trick the AI into executing malicious database commands or leaking confidential records.'
      },
      {
        q: 'How does Hackup’s patented AI firewall help protect our applications?',
        a: 'Our patented neural inspection engine (IN-PAT-2024-AI-FW8910) evaluates incoming prompt payloads in sub-milliseconds, neutralizing semantic jailbreaks and malicious instructions before they reach your foundational model.'
      }
    ],
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    relatedServiceSlugs: ['penetration-testing-vapt', 'soc-managed-security', 'red-team-blue-team'],
    relatedBlogSlug: 'ai-firewall-nextgen-soc-defense'
  }
];

// ----------------------------------------------------
// 5 TARGET ACADEMY COURSES
// ----------------------------------------------------
export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'certified-ethical-hacker-ceh',
    title: 'Certified Ethical Hacker (CEH v13 AI-Powered)',
    ecCouncilCode: 'EC-Council Exam 312-50',
    category: 'Offensive Security',
    level: 'Intermediate',
    badge: 'Official EC-Council Flagship',
    duration: '60 Hours (6 Weeks / Weekend & Weekday)',
    practicalLabHours: '100+ Hands-On Lab Scenarios',
    mode: 'Hybrid (Coimbatore Lab + Live Online)',
    description: 'The world’s most globally recognized ethical hacking certification, updated for 2026 with AI-driven threat exploitation, automated reconnaissance, LLM prompt injection attack vectors, and automated defense evasion techniques. Learn directly from active red team practitioners in Coimbatore.',
    highlights: [
      'Official EC-Council Accredited Training Center Curriculum & Aspen Portal Access',
      'Official 6-Month Cloud Cyber Range Access with 2,200+ Attack Tools',
      'Covers 20 Comprehensive Security Domains from Footprinting to AI Hacking',
      '100% Practical Exam Preparation with Mock Simulations & Authorized Voucher Support'
    ],
    modules: [
      { moduleNum: 'MOD 01-04', title: 'Footprinting, Network Scanning & Enumeration', labs: ['Nmap Advanced Scripting', 'Recon-ng OSINT', 'SMB & SNMP Triage', 'Shodan API Recon'] },
      { moduleNum: 'MOD 05-08', title: 'Vulnerability Analysis, System Hacking & Malware Threats', labs: ['Metasploit Probing', 'Custom Shellcode Generation', 'Living off the Land (LOLBins)', 'Rootkit Detection'] },
      { moduleNum: 'MOD 09-13', title: 'Web App, API, Wireless & Mobile Hacking', labs: ['Burp Suite Professional OWASP Exploits', 'JWT & GraphQL Bypasses', 'WPA3 Cracking', 'Android APK Reversing'] },
      { moduleNum: 'MOD 14-20', title: 'AI Attack Vectors, Cloud, OT/IoT & Cryptography', labs: ['LLM Jailbreaks & Prompt Injections', 'AWS S3 Exploits', 'Kubernetes Pod Security', 'RSA/ECC Key Cracking'] }
    ],
    prerequisites: 'Basic knowledge of TCP/IP networking, Linux terminal commands, or Hackup Foundation Track.',
    careerOutcomes: ['Penetration Tester', 'Ethical Hacker', 'Cyber Security Consultant', 'Vulnerability Assessor'],
    targetRoles: ['Penetration Tester (₹6L - ₹14L/yr)', 'Security Analyst (₹5.5L - ₹12L/yr)'],
    certificationPartner: 'EC-Council (International Accredited)',
    upcomingBatch: 'Starting Next Monday & Weekend Batches',
    imageUrl: '/images/academy_ceh.jpg',
    handsOnLabs: [
      'Live Web Application Exploitation using Burp Suite Professional',
      'Active Directory Domain Escalation with BloodHound and Mimikatz',
      'Wireless WPA2/WPA3 Enterprise Handshake Capture and Decryption',
      'Autonomous AI-Assisted Reconnaissance and Scripting in Python',
      'Malware Behavioral Analysis in Isolated Sandbox Environments'
    ],
    certificationInfo: 'Official EC-Council CEH v13 ANSI-accredited certification voucher included, granting global credential recognized by Fortune 500 companies and government defense agencies.',
    careerPaths: [
      'Junior Penetration Tester -> Senior Offensive Red Teamer',
      'Security Operations Analyst -> Threat Hunting Specialist',
      'Information Security Consultant -> CISO / Chief Security Architect'
    ],
    faqs: [
      {
        q: 'Is Hackup Technology an authorized EC-Council center in Coimbatore?',
        a: 'Yes! Hackup Technology Pvt Ltd is an officially Accredited Training Center (ATC). Every student receives genuine EC-Council courseware, official Aspen portal access, and authorized exam vouchers.'
      },
      {
        q: 'What is the format of the classes (In-Person vs Online)?',
        a: 'We offer both formats: physical hands-on classroom lab sessions at our Ganapathy, Coimbatore Cyber Lab, as well as live instructor-led interactive online batches with recorded session replays.'
      },
      {
        q: 'Can freshers or college students clear the CEH exam on their first attempt?',
        a: 'Yes. Our rigorous training includes 100+ hands-on labs, instructor-led problem solving, and full-length mock exams. Over 98% of our students clear the certification on their first attempt.'
      }
    ],
    relatedServiceSlug: 'penetration-testing-vapt'
  },
  {
    id: 'cloud-security-engineer-ccse',
    title: 'Certified Cloud Security Engineer (CCSE)',
    ecCouncilCode: 'EC-Council Exam CCSE',
    category: 'Cloud & DevSecOps',
    level: 'Advanced',
    badge: 'Multi-Cloud Defense',
    duration: '45 Hours (4 Weeks / Weekend Batches)',
    practicalLabHours: '60+ Cloud Defense Labs',
    mode: 'Hybrid (Coimbatore Lab + Live Online)',
    description: 'Designed for engineers securing AWS, Microsoft Azure, and Google Cloud Platform environments. Master IAM least-privilege configurations, cloud threat modeling, container security, Kubernetes network policies, and automated incident recovery in the cloud.',
    highlights: [
      'Multi-Cloud Security Configurations across AWS, Azure & GCP',
      'Cloud Architecture Threat Modeling & CIS Benchmark Auditing',
      'Securing Docker Containers & Kubernetes (EKS/GKE) Pod Networking',
      'Real-world Cloud Incident Response & CloudTrail Forensic Investigations'
    ],
    modules: [
      { moduleNum: 'MOD 01-03', title: 'Cloud Concepts, Threat Vectors & Cloud Governance', labs: ['AWS IAM Least Privilege', 'Azure Role-Based Access Control', 'GCP Service Accounts'] },
      { moduleNum: 'MOD 04-06', title: 'Securing Cloud Storage, Compute & Network Virtualization', labs: ['S3 Bucket Policy Hardening', 'VPC Peering Security', 'Cloud Security Groups & WAF'] },
      { moduleNum: 'MOD 07-09', title: 'Container Security, Kubernetes (EKS/GKE) & Microservices', labs: ['Trivy Container Scanning', 'Falco Runtime Security', 'K8s Network Policies'] },
      { moduleNum: 'MOD 10-12', title: 'Cloud Incident Response, Auditing & Forensics', labs: ['AWS GuardDuty Alert Triage', 'CloudTrail Investigation', 'Automated Lambda Remediation'] }
    ],
    prerequisites: 'Basic knowledge of cloud computing (AWS/Azure) or ethical hacking fundamentals.',
    careerOutcomes: ['Cloud Security Architect', 'AWS/Azure Security Specialist', 'DevSecOps Consultant'],
    targetRoles: ['Cloud Security Engineer (₹8L - ₹18L/yr)', 'DevSecOps Architect (₹10L - ₹22L/yr)'],
    certificationPartner: 'EC-Council (CCSE)',
    upcomingBatch: 'Weekend Cohort Enrolling Now',
    imageUrl: '/images/enterprise_cloud.jpg',
    handsOnLabs: [
      'Hardening AWS Multi-Account IAM Roles and GuardDuty Pipelines',
      'Auditing Kubernetes RBAC and Deploying Falco eBPF Runtime Detection',
      'Securing Azure Active Directory & Conditional Access Enforcement',
      'Terraform Infrastructure as Code (IaC) Automated Drift & Secrets Auditing'
    ],
    certificationInfo: 'Accredited EC-Council Certified Cloud Security Engineer credential recognized internationally across enterprise cloud engineering teams.',
    careerPaths: [
      'DevOps Engineer -> Cloud Security Specialist',
      'Cloud Architect -> Principal Cloud Security Lead',
      'Systems Admin -> Enterprise Cloud Defender'
    ],
    faqs: [
      {
        q: 'Does this course cover both AWS and Azure?',
        a: 'Yes! The CCSE curriculum provides comprehensive coverage across AWS, Microsoft Azure, and Google Cloud Platform.'
      },
      {
        q: 'Are live cloud accounts provided during the training?',
        a: 'Yes, students receive sandbox access to live cloud environments to configure security groups, IAM roles, and SIEM integrations.'
      }
    ],
    relatedServiceSlug: 'vulnerability-management-security-audit'
  },
  {
    id: 'devsecops-engineer-ecde',
    title: 'Certified DevSecOps Engineer (ECDE)',
    ecCouncilCode: 'EC-Council Exam ECDE',
    category: 'Cloud & DevSecOps',
    level: 'Advanced',
    badge: 'CI/CD Pipeline Security',
    duration: '40 Hours (4 Weeks / Weekend Batches)',
    practicalLabHours: '50+ Pipeline Security Labs',
    mode: 'Hybrid (Coimbatore Lab + Live Online)',
    description: 'Bridge the gap between rapid software delivery and uncompromising security. Learn how to shift security left by embedding automated SAST, DAST, SCA dependency scanning, and secret detection directly into GitHub Actions, GitLab CI, and Jenkins pipelines.',
    highlights: [
      'Shift-Left Security Philosophy & Continuous Compliance as Code',
      'Automated SAST with SonarQube & Semgrep in GitHub Actions',
      'Dynamic DAST with OWASP ZAP automated in CI/CD pipelines',
      'Infrastructure as Code (IaC) Security with Checkov, tfsec, and Trivy'
    ],
    modules: [
      { moduleNum: 'MOD 01-03', title: 'DevSecOps Culture, Threat Modeling & Secure Coding', labs: ['Threat Modeling with PyTM', 'Git Pre-commit Hooks with GitLeaks', 'Secret Scanning'] },
      { moduleNum: 'MOD 04-06', title: 'SAST & Dependency Analysis (SCA) in Pipelines', labs: ['SonarQube Integration', 'Semgrep Rule Customization', 'OWASP Dependency-Check'] },
      { moduleNum: 'MOD 07-09', title: 'DAST, IAST & Container Pipeline Hardening', labs: ['OWASP ZAP Pipeline Automation', 'Docker Image Scanning with Grype/Trivy', 'Cosign Signing'] },
      { moduleNum: 'MOD 10-12', title: 'Infrastructure as Code (IaC) Security & Policy as Code', labs: ['Checkov Terraform Audits', 'Open Policy Agent (OPA) Gatekeeper', 'DefectDojo Dashboard'] }
    ],
    prerequisites: 'Basic understanding of software development, Git terminal commands, and Linux basics.',
    careerOutcomes: ['DevSecOps Engineer', 'Security Automation Specialist', 'Application Security Engineer'],
    targetRoles: ['DevSecOps Engineer (₹7L - ₹16L/yr)', 'AppSec Specialist (₹8L - ₹17L/yr)'],
    certificationPartner: 'EC-Council (ECDE)',
    upcomingBatch: 'Starting Next Month',
    imageUrl: '/images/academy_ceh.jpg',
    handsOnLabs: [
      'Building automated security gates in GitHub Actions workflows',
      'Integrating SonarQube & Semgrep for continuous static code triage',
      'Container image vulnerability scanning with Trivy and Cosign artifact signing',
      'Open Policy Agent (OPA) validation of Kubernetes Helm templates'
    ],
    certificationInfo: 'Official EC-Council Certified DevSecOps Engineer credential, proving hands-on competence in automated pipeline protection.',
    careerPaths: [
      'Software Developer -> Application Security Engineer',
      'DevOps Engineer -> Lead DevSecOps Architect',
      'QA Engineer -> Security Automation Specialist'
    ],
    faqs: [
      {
        q: 'Do I need heavy software coding skills for DevSecOps?',
        a: 'Basic familiarity with Git and writing simple scripts or pipeline YAML configs is sufficient. We teach the security tooling and automation from the ground up.'
      },
      {
        q: 'Which CI/CD platforms are utilized in the labs?',
        a: 'We train students on GitHub Actions, GitLab CI/CD, and Jenkins pipelines.'
      }
    ],
    relatedServiceSlug: 'vulnerability-management-security-audit'
  },
  {
    id: 'encryption-specialist-eces',
    title: 'Certified Encryption Specialist (ECES)',
    ecCouncilCode: 'EC-Council Exam ECES',
    category: 'Forensics & Governance',
    level: 'Intermediate',
    badge: 'Cryptography & Data Protection',
    duration: '35 Hours (3 Weeks / Fast-Track)',
    practicalLabHours: '40+ Cryptography Labs',
    mode: 'Hybrid (Coimbatore Lab + Live Online)',
    description: 'Master practical modern cryptography, data-at-rest and data-in-transit encryption, public key infrastructure (PKI), digital certificates, hardware security modules (HSM), and compliance with the Indian DPDP Act 2023 encryption standards.',
    highlights: [
      'Symmetric (AES, ChaCha20) & Asymmetric (RSA, ECC) Algorithms in Practice',
      'Enterprise PKI Architecture, Certificate Authorities (CA) & OpenSSL Hardening',
      'Hash Functions, HMACs, Digital Signatures & Post-Quantum Cryptography Basics',
      'Data-at-Rest & In-Transit Encryption Architecture strictly aligned with DPDP Act'
    ],
    modules: [
      { moduleNum: 'MOD 01-02', title: 'Introduction to Modern Cryptography & Ciphers', labs: ['Symmetric Encryption with OpenSSL', 'Block Cipher Modes (CBC vs GCM)', 'Key Derivation'] },
      { moduleNum: 'MOD 03-04', title: 'Asymmetric Cryptography, RSA, ECC & Key Exchange', labs: ['RSA Keypair Generation', 'Elliptic Curve Diffie-Hellman', 'Digital Signatures Verification'] },
      { moduleNum: 'MOD 05-06', title: 'Enterprise PKI, SSL/TLS & Certificate Authorities', labs: ['Setting up a Private Root CA', 'TLS 1.3 Handshake Inspection', 'Certificate Revocation Lists (CRL)'] },
      { moduleNum: 'MOD 07-08', title: 'Database Encryption, VPNs & DPDP Act Data Protection', labs: ['Transparent Database Encryption (TDE)', 'IPSec/WireGuard Cryptographic Tunneled Setup', 'Key Management Systems (KMS)'] }
    ],
    prerequisites: 'Basic understanding of computer networks and operating system concepts.',
    careerOutcomes: ['Cryptographic Security Engineer', 'Data Protection Specialist', 'Information Security Architect'],
    targetRoles: ['Data Security Specialist (₹6.5L - ₹14L/yr)', 'PKI Engineer (₹7L - ₹15L/yr)'],
    certificationPartner: 'EC-Council (ECES)',
    upcomingBatch: 'Weekend Batches Available',
    imageUrl: '/images/portal_enterprise.jpg',
    handsOnLabs: [
      'Constructing enterprise Private Certificate Authorities with OpenSSL',
      'Evaluating TLS 1.3 handshake cipher suites and intercepting weaknesses',
      'Implementing Transparent Data Encryption (TDE) on PostgreSQL/MySQL',
      'Hardware Security Module (HSM) simulation and KMS key rotation'
    ],
    certificationInfo: 'Official EC-Council Certified Encryption Specialist credential, verifying mastery of cryptographic defense and data protection.',
    careerPaths: [
      'Network Administrator -> Cryptographic Security Specialist',
      'Security Compliance Officer -> Data Privacy & Cryptography Architect'
    ],
    faqs: [
      {
        q: 'Is this course heavy on pure mathematics?',
        a: 'No. The ECES program focuses on practical applied cryptography: how to select, implement, configure, and audit encryption tools rather than academic mathematical proofs.'
      },
      {
        q: 'How does ECES help with DPDP Act compliance?',
        a: 'The Indian DPDP Act 2023 mandates reasonable security safeguards for personal data. Mastering data encryption at rest and in transit is the fundamental core technical control required.'
      }
    ],
    relatedServiceSlug: 'grc-compliance-consulting'
  },
  {
    id: 'cyber-security-internship',
    title: 'Cyber Security Industrial Internship (1 / 3 / 6 Months)',
    ecCouncilCode: 'Hackup Tech Certified Industrial Internship',
    category: 'Offensive Security',
    level: 'Beginner',
    badge: '100% Practical Coimbatore Lab',
    duration: '1 Month, 3 Months, or 6 Months Track',
    practicalLabHours: 'Full-Time Practical Cyber Range Labs',
    mode: 'Hybrid (Coimbatore Lab + Live Online)',
    description: 'South India’s premier hands-on cyber defense internship. Gain practical experience working on live vulnerability assessments, cyber range capture the flag (CTF) challenges, SOC alert triage, and digital forensics evidence analysis directly at our Coimbatore Cyber Lab.',
    highlights: [
      'Work on simulated enterprise infrastructure in our Ganapathy, Coimbatore Cyber Lab',
      'Mentorship from active red teamers, patent inventors, and EC-Council certified trainers',
      'Official Industry Experience Certificate, Project Work Viva Assistance & Letter of Recommendation',
      'Direct interview placement referrals with 40+ corporate hiring partners across Tamil Nadu & Bengaluru'
    ],
    modules: [
      { moduleNum: 'TRACK 01', title: 'Offensive Security & VAPT Fundamentals', labs: ['Web Application Penetration Testing', 'Network Vulnerability Scanning', 'Writing Professional Reports'] },
      { moduleNum: 'TRACK 02', title: 'Defensive Blue Team & SOC Log Triage', labs: ['Wazuh SIEM Alert Triage', 'Wireshark Network Traffic Forensics', 'Incident Playbooks'] },
      { moduleNum: 'TRACK 03', title: 'Digital Forensics & Malware Analysis', labs: ['FTK Imager Evidence Extraction', 'Memory Analysis with Volatility', 'Section 65B Dossier Drafting'] },
      { moduleNum: 'TRACK 04', title: 'Capstone Real-World Project & Placement Prep', labs: ['Simulated Corporate Audit Presentation', 'Resume Optimization', 'Mock Technical Interviews'] }
    ],
    prerequisites: 'Open to B.E./B.Tech, B.Sc, BCA, M.Sc, MCA students and passionate beginners.',
    careerOutcomes: ['Associate Cyber Security Engineer', 'Junior Penetration Tester', 'SOC L1 Analyst'],
    targetRoles: ['Junior Cyber Security Engineer (₹4.5L - ₹8.5L/yr)', 'SOC Analyst L1 (₹4.5L - ₹9L/yr)'],
    certificationPartner: 'Hackup Technology Pvt Ltd & TANCCAO',
    upcomingBatch: 'Immediate Joining & Summer/Winter Batches',
    imageUrl: '/images/academy_internship.jpg',
    handsOnLabs: [
      'Conducting real-world web application audits using Kali Linux and Burp Suite',
      'Simulated ransomware breach containment and memory artifact preservation',
      'Blue Team threat hunting in live Wazuh SIEM telemetry',
      'Publishing verifiable vulnerability research and Capstone engineering projects'
    ],
    certificationInfo: 'Official Hackup Technology Industrial Internship Completion Certificate, Letter of Recommendation, and Project Verification Letter for University Viva.',
    careerPaths: [
      'Intern -> Junior Security Analyst -> Certified Penetration Tester',
      'College Graduate -> SOC L1 Engineer'
    ],
    faqs: [
      {
        q: 'Can college students use this internship for their mandatory university credits?',
        a: 'Yes! Our internship certificates, attendance logs, and project documentation are officially recognized by Anna University, Bharathiar University, and 54+ autonomous institutions across South India.'
      },
      {
        q: 'Do you offer flexible timings for final-year students?',
        a: 'Yes, we provide flexible weekday morning/afternoon batches as well as hybrid options allowing students to balance college classes and internship projects.'
      }
    ],
    relatedServiceSlug: 'penetration-testing-vapt'
  }
];

// ----------------------------------------------------
// 3 HIGH-AUTHORITY BLOG POSTS
// ----------------------------------------------------
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'vapt-methodology-guide-2026',
    title: 'The 2026 Enterprise Guide to Penetration Testing (VAPT) & Zero-Downtime Exploit Verification',
    primaryKeyword: 'VAPT services India',
    metaTitle: 'VAPT Services India | 2026 Penetration Testing Guide',
    metaDescription: 'Complete 2026 guide to enterprise VAPT services in India. Learn zero-downtime penetration testing methodologies, OWASP standards, and safe-to-host certification.',
    excerpt: 'Explore how modern offensive security testing has evolved beyond automated scanning noise into deep manual exploit verification, production-safe methodologies, and verifiable Safe-to-Host certification.',
    author: {
      name: 'Dinesh Paranthagan',
      role: 'Founder & CEO, Hackup Technology',
      avatar: '/images/founder_dinesh.jpg'
    },
    publishedDate: 'January 15, 2026',
    readTime: '8 min read',
    category: 'Offensive Security',
    tags: ['VAPT', 'Penetration Testing', 'OWASP Top 10', 'Cybersecurity India', 'Safe-to-Host'],
    relatedServiceSlug: 'penetration-testing-vapt',
    relatedCourseSlug: 'certified-ethical-hacker-ceh',
    content: [
      {
        heading: 'Why Automated Scanners Fall Short in Modern Enterprise Environments',
        body: 'In an era of microservices, GraphQL APIs, and complex identity governance, automated vulnerability scanners only scratch the surface. Over 70% of high-severity vulnerabilities—such as Broken Object-Level Authorization (BOLA), multi-step business logic flaws, and second-order injection attacks—require deep manual exploit verification to uncover.'
      },
      {
        heading: 'The 5-Phase Zero-Downtime VAPT Methodology',
        body: 'At Hackup Technology, our penetration testing methodology is engineered for mission-critical enterprise environments. We begin with non-intrusive surface reconnaissance, transition to heuristic threat modeling, and conduct controlled manual exploitation using throttled, production-safe payloads that never cause unexpected outages.'
      },
      {
        heading: 'Achieving True Regulatory Attestation: RBI, SEBI, and DPDP Act',
        body: 'A true VAPT deliverable is more than a list of CVE numbers. It must provide clear code-level remediation blueprints for development teams, video-backed proof-of-concept verification, and an official Safe-to-Host certificate that satisfies auditors from regulatory bodies including the Reserve Bank of India (RBI) and CERT-In.'
      }
    ]
  },
  {
    slug: 'dpdp-act-iso27001-compliance-roadmap',
    title: 'DPDP Act 2023 & ISO 27001:2022 Implementation Roadmap for Indian Enterprises',
    primaryKeyword: 'ISO 27001 and GRC consulting India',
    metaTitle: 'ISO 27001 & GRC Consulting India | DPDP Act Roadmap',
    metaDescription: 'Step-by-step compliance roadmap for ISO 27001:2022 and the Indian DPDP Act 2023. Essential controls, consent architectures, and audit readiness strategies.',
    excerpt: 'Navigate the stringent requirements of India’s Digital Personal Data Protection Act alongside ISO/IEC 27001:2022. Discover actionable steps to avoid penalties and protect customer trust.',
    author: {
      name: 'Dinesh Paranthagan',
      role: 'Founder & CEO, Hackup Technology',
      avatar: '/images/founder_dinesh.jpg'
    },
    publishedDate: 'February 3, 2026',
    readTime: '10 min read',
    category: 'Governance & Compliance',
    tags: ['DPDP Act', 'ISO 27001', 'GRC Consulting', 'Data Protection', 'Compliance'],
    relatedServiceSlug: 'grc-compliance-consulting',
    relatedCourseSlug: 'encryption-specialist-eces',
    content: [
      {
        heading: 'The Convergence of International ISO Standards and Indian Privacy Law',
        body: 'The enactment of the Indian Digital Personal Data Protection (DPDP) Act 2023 has fundamentally reshaped enterprise data governance. With potential penalties reaching up to ₹250 Crores, Indian businesses can no longer treat compliance as an afterthought. Aligning internal controls with ISO/IEC 27001:2022 provides the foundational architecture needed for sustainable compliance.'
      },
      {
        heading: 'Crucial Technical Controls: Consent Workflows and Encryption at Rest',
        body: 'To satisfy DPDP Act obligations, organizations must implement transparent consent management mechanisms, clear data principal withdrawal channels, and robust encryption at rest using AES-256 or ChaCha20. Storing unencrypted customer PII in staging or development environments constitutes a critical audit failure.'
      },
      {
        heading: 'Building a 100% First-Attempt Audit Ready ISMS',
        body: 'Hackup Technology’s GRC consulting practice structures a Statement of Applicability (SoA) tailored to each client’s operational reality. Through gap assessments, employee awareness programs, and thorough mock audits, we guide organizations to certified first-attempt accreditation with zero operational friction.'
      }
    ]
  },
  {
    slug: 'ai-firewall-nextgen-soc-defense',
    title: 'AI-Powered Firewalls & 24/7 Managed SOC Defense: Mitigating Real-Time Zero-Days',
    primaryKeyword: 'managed security services India',
    metaTitle: 'Managed Security Services India | AI Firewall & SOC',
    metaDescription: 'How patented AI-based firewalls and 24/7 managed SOC operations detect and isolate zero-day cyber threats in sub-milliseconds across Indian enterprises.',
    excerpt: 'Discover how Hackup Technology’s patented AI firewall innovation and 24/7 managed SOC SIEM ingestion create an impenetrable defense perimeter against polymorphic malware and APT attacks.',
    author: {
      name: 'Dinesh Paranthagan',
      role: 'Founder & CEO, Hackup Technology',
      avatar: '/images/founder_dinesh.jpg'
    },
    publishedDate: 'February 22, 2026',
    readTime: '7 min read',
    category: 'Blue Team & AI Defense',
    tags: ['SOC as a Service', 'AI Firewall', 'Managed Security', 'SIEM', 'Threat Hunting'],
    relatedServiceSlug: 'soc-managed-security',
    relatedCourseSlug: 'cloud-security-engineer-ccse',
    content: [
      {
        heading: 'The Limitations of Traditional Signature-Based Perimeters',
        body: 'Modern cyber adversaries utilize polymorphic malware and automated AI fuzzers that alter their binary hashes on every compilation. Traditional perimeter firewalls that rely solely on static signature lists inevitably fail against novel zero-day exploits and multi-stage Command & Control (C2) tunnels.'
      },
      {
        heading: 'Patented AI Neural Inspection: Sub-Millisecond Classification',
        body: 'Hackup Technology’s patented AI firewall system (IN-PAT-2024-AI-FW8910) introduces predictive packet inspection and autonomous anomaly detection. By analyzing network stream behavior in real time, the neural engine intercepts unauthorized exfiltration tunnels and zero-day payloads without degrading network throughput.'
      },
      {
        heading: 'The Power of 24/7 Co-Managed Blue Team Operations',
        body: 'Technology alone cannot defend an enterprise. Our 24/7 Security Operations Center pairs AI telemetry with seasoned blue team threat hunters in Coimbatore who triage high-priority alerts within 15 minutes, neutralizing lateral movement before damage can occur.'
      }
    ]
  }
];

// ----------------------------------------------------
// PORTFOLIO CASE STUDIES
// ----------------------------------------------------
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'bfsi-core-banking-vapt',
    title: 'Core Banking & Payment Gateway Zero-Downtime VAPT',
    sector: 'BFSI & Fintech',
    clientBadge: 'Major South Indian Private Bank',
    challenge: 'The financial institution needed an urgent, production-safe security audit across 42 web microservices and mobile banking APIs prior to RBI audit review, without interrupting daily banking transactions.',
    solution: 'Hackup Technology deployed a team of certified offensive security analysts using throttled, production-safe manual testing methodologies, identifying 4 critical authorization flaws and 11 high-severity logic vulnerabilities.',
    outcomeMetric: '100% RBI Compliance & Zero Production Downtime',
    keyResults: [
      'Discovered and patched a critical Broken Object-Level Authorization (BOLA) in the transaction ledger',
      'Assisted internal DevOps teams with same-day code remediation and config patches',
      'Issued official Safe-to-Host Attestation Certificate recognized by banking auditors'
    ],
    technologiesUsed: ['Burp Suite Pro', 'OWASP MASTG', 'Postman API Security', 'Wireshark'],
    servicesDelivered: ['Penetration Testing (VAPT)', 'Regulatory Compliance Attestation']
  },
  {
    id: 'police-cybercrime-ransomware-triage',
    title: 'Emergency State-Wide Ransomware Triage & 65B Forensics',
    sector: 'Law Enforcement & Government',
    clientBadge: 'Tamil Nadu Police Cyber Crime Cell Advisory',
    challenge: 'A targeted ransomware outbreak encrypted 18 core domain controllers and database servers across critical district operations, demanding cryptocurrency ransom while corrupting local backups.',
    solution: 'Hackup’s emergency DFIR task force activated within 90 minutes, isolated the C2 beaconing nodes, acquired volatile RAM dumps using hardware write-blockers, and reconstructed the adversary’s timeline.',
    outcomeMetric: '18 Systems Restored & Section 65B Evidence Certified',
    keyResults: [
      'Halted lateral spread across 200+ connected endpoints within 3 hours',
      'Recovered compromised transaction logs from volatile RAM artifacts',
      'Prepared legally admissible Section 65B digital evidence dossier accepted in judicial proceedings'
    ],
    technologiesUsed: ['FTK Imager', 'Volatility Framework', 'Autopsy', 'KAPE Forensics'],
    servicesDelivered: ['Digital Forensics & Incident Response (DFIR)', 'Law Enforcement Consultation']
  },
  {
    id: 'healthcare-zero-trust-hardening',
    title: 'Multi-Specialty Hospital Cloud Hardening & DPDP Compliance',
    sector: 'Healthcare & Life Sciences',
    clientBadge: '700-Bed Tertiary Care Hospital Network',
    challenge: 'The hospital network managed over 5,00,000 patient records on hybrid AWS and on-prem PACS servers vulnerable to ransomware and subject to stringent Indian DPDP Act 2023 regulations.',
    solution: 'Engineered a comprehensive Zero-Trust architecture, encrypted patient database repositories, hardened Kubernetes clusters against CIS benchmarks, and conducted employee phishing simulations.',
    outcomeMetric: 'Zero Data Leaks & 100% DPDP Act Alignment',
    keyResults: [
      'Eliminated public S3 bucket exposure and implemented least-privilege IAM controls',
      'Deployed transparent AES-256 database encryption for sensitive diagnostic records',
      'Trained 250+ hospital staff members in identifying social engineering attacks'
    ],
    technologiesUsed: ['AWS Security Hub', 'HashiCorp Vault', 'Trivy', 'SonarQube'],
    servicesDelivered: ['Cloud Security & DevSecOps', 'GRC & Compliance Consulting']
  },
  {
    id: 'academic-cyber-range-coe',
    title: '54+ College Cyber Range & Board of Studies Modernization',
    sector: 'Higher Education & Research',
    clientBadge: '54+ Universities Across Tamil Nadu',
    challenge: 'Engineering colleges suffered from outdated computer science curricula that lacked hands-on offensive and defensive cybersecurity training, resulting in poor student placement rates in cyber roles.',
    solution: 'Under the leadership of Dr. Dinesh Paranthagan, Hackup established physical on-campus Cyber Centers of Excellence (CoE), installed virtual cyber ranges, and modernized university B.Tech/M.Tech syllabi.',
    outcomeMetric: '1,00,000+ Students Trained & 40+ Corporate Hiring Pipelines',
    keyResults: [
      'Installed turnkey live cyber range sandbox environments for realistic attack/defense drills',
      'Trained 1,200+ faculty members through Faculty Development Programs (FDPs)',
      'Placed graduates in premier cybersecurity firms with average packages exceeding ₹8 LPA'
    ],
    technologiesUsed: ['Kali Linux Cyber Range', 'Wazuh SIEM Labs', 'Metasploit Pro', 'Splunk Enterprise'],
    servicesDelivered: ['Campus CoE Setup', 'Faculty Development Programs', 'EC-Council Training']
  }
];

// ----------------------------------------------------
// GALLERY ITEMS
// ----------------------------------------------------
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Hands-on Cyber Range Drill at Coimbatore HQ',
    category: 'Cyber Range',
    location: 'Hackup HQ Lab, Ganapathy, Coimbatore',
    date: '2026',
    description: 'Students and engineers engaging in red team vs blue team attack simulations on live virtual enterprise topographies.',
    imageUrl: '/images/academy_soc.jpg'
  },
  {
    id: 'gal-2',
    title: 'DEFCON Coimbatore Chapter Community Meetup',
    category: 'DEFCON Meetup',
    location: 'Coimbatore Innovation Hub',
    date: '2026',
    description: 'Independent security researchers, developers, and ethical hackers gathering for zero-day threat analysis and CTF challenges.',
    imageUrl: '/images/enterprise_redteam.jpg'
  },
  {
    id: 'gal-3',
    title: 'State Police Cyber Cell Masterclass on Digital Evidence',
    category: 'Police Training',
    location: 'Police Commissionerate, Tamil Nadu',
    date: '2025',
    description: 'Dr. Dinesh Paranthagan delivering specialized training on Section 65B electronic evidence acquisition and mobile forensics.',
    imageUrl: '/images/enterprise_dfir.jpg'
  },
  {
    id: 'gal-4',
    title: 'Campus Center of Excellence Inauguration',
    category: 'Workshops',
    location: 'Premier Engineering College Campus',
    date: '2025',
    description: 'Unveiling state-of-the-art cyber defense lab infrastructure and signing academic MoU for student industrial internships.',
    imageUrl: '/images/academy_internship.jpg'
  }
];

// ----------------------------------------------------
// GOOGLE REVIEWS (4,343 Reviews, 4.8 Rating)
// ----------------------------------------------------
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    name: 'Karthik Subramanian',
    role: 'Lead Security Architect, Fintech Enterprise',
    rating: 5,
    date: '2 weeks ago',
    text: 'Hackup Technology conducted an exhaustive VAPT audit on our core payments API. Their team identified 3 critical authorization vulnerabilities that other commercial scanners completely missed. The Safe-to-Host report was accepted immediately by our banking partners.',
    avatarLetter: 'K',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Priyanka Venkatesh',
    role: 'Cyber Security Analyst (CEH Alumna)',
    rating: 5,
    date: '1 month ago',
    text: 'The best cyber security training institute in Tamil Nadu hands down! The EC-Council CEH v13 training with Dinesh Sir gave me 100% practical lab experience. I cleared my CEH exam on the first attempt and got placed with a top MNC in Bengaluru within 30 days.',
    avatarLetter: 'P',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Dr. S. Ranganathan',
    role: 'Head of Department, Computer Science & Engineering',
    rating: 5,
    date: '2 months ago',
    text: 'Hackup Technology established our college Cyber Center of Excellence and modernized our syllabus. Over 400 of our engineering students completed their internships here, gaining real-world skills that made them instantly employable.',
    avatarLetter: 'S',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Arun Kumar M.',
    role: 'VP of Technology, Healthcare Platform',
    rating: 5,
    date: '3 months ago',
    text: 'We engaged Hackup for ISO 27001 and DPDP Act compliance. Their team guided us through every policy draft, technical control hardening, and mock audit. We passed our certification audit with zero non-conformities!',
    avatarLetter: 'A',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Vigneshwaran P.',
    role: 'SOC Analyst L2, Defense Contractor',
    rating: 5,
    date: '4 months ago',
    text: 'The 6-month industrial internship at Hackup’s Coimbatore cyber range was transformative. Working with live Wazuh SIEM rules, Wireshark packet captures, and memory forensics gave me practical confidence that no college textbook could match.',
    avatarLetter: 'V',
    verified: true
  }
];

// ----------------------------------------------------
// CYBER RANGE NODES & SCENARIOS
// ----------------------------------------------------
export const CYBER_RANGE_NODES: CyberRangeNode[] = [
  { id: 'node-attacker', name: 'Offensive C2 Node', role: 'Attacker', ip: '10.0.99.14', os: 'Kali Rolling 2026', status: 'ONLINE', description: 'Simulated adversary running Cobalt Strike & custom reverse engineering payloads.', iconName: 'Terminal' },
  { id: 'node-waf', name: 'Perimeter AI WAF', role: 'Perimeter WAF', ip: '192.168.1.1', os: 'Patented AI Appliance', status: 'DEFENDING', description: 'Autonomous heuristic firewall analyzing ingress HTTP/3 and TLS streams.', iconName: 'ShieldCheck' },
  { id: 'node-k8s', name: 'Kubernetes Production Cluster', role: 'Kubernetes Cluster', ip: '172.16.20.10', os: 'Alpine / containerd', status: 'ALERT', description: 'Multi-tenant microservice cluster hosting banking API ledgers.', iconName: 'Server' },
  { id: 'node-ad', name: 'Active Directory Domain Controller', role: 'Active Directory', ip: '192.168.10.5', os: 'Windows Server 2022', status: 'DEFENDING', description: 'Corporate domain controller holding Kerberos tickets and user credentials.', iconName: 'Cpu' },
  { id: 'node-siem', name: 'SOC SIEM & Wazuh Cluster', role: 'SOC SIEM & EDR', ip: '192.168.10.50', os: 'Ubuntu / Wazuh Cluster', status: 'DEFENDING', description: 'Centralized telemetry aggregator ingesting 15,000 EPS in real time.', iconName: 'Search' }
];

export const CYBER_RANGE_SCENARIOS: CyberRangeScenario[] = [
  {
    id: 'scen-ad-compromise',
    title: 'Active Directory Kerberoasting & Lateral Pivot',
    type: 'AD Lateral Movement',
    mitreTactic: 'T1558.003 - Kerberoasting',
    description: 'Adversary requests service tickets with weak service principal names (SPN) and cracks hashes offline to escalate to Enterprise Admin.',
    attackerStep: 'Invoke-Kerberoast extracted 4 SPN hashes within 12 seconds.',
    socAlertStep: 'Wazuh Rule #100234 triggered: Anomaly in RC4 Kerberos Ticket Granting Service requests.',
    affectedNodeIds: ['node-attacker', 'node-ad', 'node-siem'],
    cvssScore: 8.8
  },
  {
    id: 'scen-k8s-escape',
    title: 'Kubernetes Container Escape & Host Takeover',
    type: 'Cloud Escape',
    mitreTactic: 'T1611 - Escape to Host',
    description: 'Vulnerable microservice container configured with SYS_PTRACE capability allows root process injection into the underlying host kernel.',
    attackerStep: 'Injected shellcode into host PID namespace via mounted /proc filesystem.',
    socAlertStep: 'Falco eBPF sensor flagged unauthorized kernel ptrace invocation from container pod.',
    affectedNodeIds: ['node-attacker', 'node-k8s', 'node-siem'],
    cvssScore: 9.3
  }
];

// ----------------------------------------------------
// INTERNSHIP DETAILS
// ----------------------------------------------------
export const INTERNSHIP_DETAILS = {
  subtitle: '1/3/6-Month Practical Cyber Range Track in Coimbatore',
  officeLocation: 'Hackup Cyber Lab, No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006',
  durations: [
    { period: '1 Month Fast-Track', desc: 'Intensive baseline in offensive Linux commands, web VAPT, and network scanning.', focus: 'Offensive Security Fundamentals', target: '2nd / 3rd Year B.Tech & B.Sc Students', badge: 'Foundation' },
    { period: '3 Months Comprehensive', desc: 'Full-stack VAPT, OWASP Top 10 exploitation, and SOC SIEM log analysis.', focus: 'VAPT & Blue Team SIEM Triage', target: 'Final Year B.Tech & MCA Students', badge: 'Most Popular' },
    { period: '6 Months Professional', desc: 'Deep dive into binary reverse engineering, red teaming, digital forensics, and placement assistance.', focus: 'Advanced Red Team & Career Placement', target: 'Job Seekers & Final Year Projects', badge: 'Career Launch' }
  ],
  eligibility: 'Open to B.E./B.Tech (CSE, IT, AI, Cyber), B.Sc/M.Sc Computer Science, BCA/MCA, and tech enthusiasts.',
  certifications: ['Official Hackup Industrial Training Certificate', 'TANCCAO Recognized Credential', 'Letter of Recommendation for top performers'],
  perks: [
    'Work from our high-tech Cyber Lab in Ganapathy, Coimbatore',
    'Personal access to dedicated Kali Linux virtual target subnets',
    'Guidance directly from active EC-Council Certified Instructors and Red Teamers',
    'Official Industrial Training Certificate, Project Viva Assistance & Letter of Recommendation',
    'Direct interview referrals to 40+ corporate hiring partners across Tamil Nadu & Bengaluru'
  ]
};

// ----------------------------------------------------
// FAQ DATA
// ----------------------------------------------------
export const FAQ_DATA = {
  enterprise: [
    {
      q: 'How does Hackup Technology ensure zero production downtime during VAPT?',
      a: 'We conduct all penetration testing in accordance with strict Rules of Engagement (RoE). Our team uses throttled, production-safe exploit payloads, coordinates testing windows (including out-of-hours/maintenance windows), and performs non-destructive proofs-of-concept.'
    },
    {
      q: 'Are your VAPT certificates accepted by regulatory bodies like RBI, SEBI, and ISO auditors?',
      a: 'Yes. Our audit reports and "Safe-to-Host" Attestation Certificates adhere to ISO/IEC 27001:2022, CERT-In guidelines, RBI Cyber Security Framework, and Indian DPDP Act 2023 requirements, accepted by banking partners, external auditors, and enterprise vendor assessment teams.'
    },
    {
      q: 'Do you provide post-audit re-testing and developer remediation support?',
      a: 'Every Hackup Technology VAPT engagement includes complimentary re-testing within 30 days of initial report delivery, along with dedicated code-level guidance sessions for your software development and DevOps teams.'
    },
    {
      q: 'How quickly can your Digital Forensics & Incident Response (DFIR) team respond to a live breach?',
      a: 'Our emergency hotline is active 24/7/365. For critical breaches in Tamil Nadu, our on-site team activates within hours, while remote containment and cloud log isolation begin within 90 minutes of engagement initiation.'
    }
  ],
  academy: [
    {
      q: 'Is Hackup Technology an official EC-Council Accredited Training Center (ATC)?',
      a: 'Yes! Hackup Technology Pvt Ltd is an official, accredited EC-Council partner based in Coimbatore. Students receive genuine EC-Council official digital courseware, official Aspen portal access, official cloud cyber range credentials, and authorized exam voucher support.'
    },
    {
      q: 'Can non-technical or beginner students enroll in the CEH v13 or SOC Analyst tracks?',
      a: 'Absolutely. We include a foundational pre-bootcamp covering Linux terminal proficiency, TCP/IP networking, and computer architecture before diving into advanced penetration testing and SIEM tools.'
    },
    {
      q: 'What is the format of the classes (Classroom in Coimbatore vs Live Online)?',
      a: 'We offer flexible hybrid formats: in-person hands-on training at our high-tech Cyber Range in Ganapathy, Coimbatore, as well as live instructor-led interactive online batches with recorded session backups.'
    },
    {
      q: 'How does Hackup Academy assist with job placements for students?',
      a: 'We provide end-to-end placement support including resume optimization for cyber roles, LinkedIn & GitHub portfolio building, mock technical interviews with red teamers, and direct interview scheduling with our network of 40+ corporate hiring partners.'
    }
  ]
};

export const SITE_URL = 'https://ht-2-five.vercel.app';

// ----------------------------------------------------
// SEO METADATA MAPPING (Title < 60 chars, Meta < 160 chars)
// ----------------------------------------------------
export const SEO_METADATA_MAP: Record<string, { title: string; description: string; canonical: string; primaryKeyword: string }> = {
  '/': {
    title: 'Cyber Security Company in Coimbatore | Hackup Technology',
    description: 'Premier cyber security company in Coimbatore. Patented AI firewall, VAPT audits, 24/7 SOC, digital forensics & official EC-Council training center.',
    canonical: `${SITE_URL}/`,
    primaryKeyword: 'cyber security company in Coimbatore'
  },
  '/services': {
    title: 'Cybersecurity Services Coimbatore India | Hackup Tech',
    description: 'Enterprise cybersecurity services Coimbatore India: VAPT, 24/7 SOC, ISO 27001 GRC consulting, Red Teaming, IoT security & AI defense solutions.',
    canonical: `${SITE_URL}/services`,
    primaryKeyword: 'cybersecurity services Coimbatore India'
  },
  '/services/penetration-testing-vapt': {
    title: 'VAPT Services India | Penetration Testing Coimbatore',
    description: 'Top-tier VAPT services India. Zero-downtime penetration testing for web, mobile, APIs and networks with official Safe-to-Host certification.',
    canonical: `${SITE_URL}/services/penetration-testing-vapt`,
    primaryKeyword: 'VAPT services India'
  },
  '/services/vulnerability-management-security-audit': {
    title: 'Vulnerability Assessment & Security Audit | Hackup',
    description: 'Continuous vulnerability assessment and enterprise security audit services. Asset discovery, CVE prioritization, and continuous posture management.',
    canonical: `${SITE_URL}/services/vulnerability-management-security-audit`,
    primaryKeyword: 'vulnerability assessment'
  },
  '/services/soc-managed-security': {
    title: 'Managed Security Services India | 24/7 SOC Operations',
    description: '24/7 managed security services India. Turnkey Wazuh & Splunk SIEM deployment, real-time threat hunting, and rapid incident response triage.',
    canonical: `${SITE_URL}/services/soc-managed-security`,
    primaryKeyword: 'managed security services India'
  },
  '/services/grc-compliance-consulting': {
    title: 'ISO 27001 and GRC Consulting India | DPDP Act Audit',
    description: 'ISO 27001 and GRC consulting India. Guaranteed audit readiness for SOC 2 Type II, Indian DPDP Act 2023, and RBI regulatory frameworks.',
    canonical: `${SITE_URL}/services/grc-compliance-consulting`,
    primaryKeyword: 'ISO 27001 and GRC consulting India'
  },
  '/services/red-team-blue-team': {
    title: 'Red Team Assessment & Adversary Simulation | Hackup',
    description: 'Elite red team assessment and purple team operations in India. Realistic adversary simulation, EDR evasion, and defensive resilience training.',
    canonical: `${SITE_URL}/services/red-team-blue-team`,
    primaryKeyword: 'red team assessment'
  },
  '/services/iot-ot-security': {
    title: 'IoT Security Assessment & SCADA Testing | Hackup',
    description: 'IoT security assessment, firmware reverse engineering, and industrial OT/SCADA penetration testing adhering to IEC 62443 standards.',
    canonical: `${SITE_URL}/services/iot-ot-security`,
    primaryKeyword: 'IoT security assessment'
  },
  '/services/digital-forensics-cybercrime-investigation': {
    title: 'Digital Forensics Coimbatore | Section 65B DFIR Triage',
    description: 'Digital forensics Coimbatore. 24/7 emergency ransomware triage, memory analysis & Section 65B court evidence dossiers for cybercrime cells.',
    canonical: `${SITE_URL}/services/digital-forensics-cybercrime-investigation`,
    primaryKeyword: 'digital forensics Coimbatore'
  },
  '/services/ai-security': {
    title: 'AI Security Consulting India | Patented LLM Defense',
    description: 'AI security consulting India. Patented AI firewall, LLM red teaming, prompt injection defense, and RAG vector database protection.',
    canonical: `${SITE_URL}/services/ai-security`,
    primaryKeyword: 'AI security consulting India'
  },
  '/courses': {
    title: 'Best Cyber Security Course in Coimbatore | Hackup',
    description: 'Best cyber security course in Coimbatore. Official EC-Council Accredited Training Center for CEH v13, CCSE, ECDE, ECES & industrial internships.',
    canonical: `${SITE_URL}/courses`,
    primaryKeyword: 'best cyber security course in Coimbatore'
  },
  '/courses/certified-ethical-hacker-ceh': {
    title: 'CEH Training in Coimbatore | EC-Council CEH v13 ATC',
    description: 'Official CEH training in Coimbatore at Hackup Technology. EC-Council accredited training partner, practical labs, Aspen access & exam vouchers.',
    canonical: `${SITE_URL}/courses/certified-ethical-hacker-ceh`,
    primaryKeyword: 'CEH training in Coimbatore'
  },
  '/courses/cloud-security-engineer-ccse': {
    title: 'Cloud Security Course Coimbatore | EC-Council CCSE',
    description: 'EC-Council certified cloud security course (CCSE). Multi-cloud defense across AWS, Azure, GCP, container security, and Kubernetes hardening.',
    canonical: `${SITE_URL}/courses/cloud-security-engineer-ccse`,
    primaryKeyword: 'cloud security course'
  },
  '/courses/devsecops-engineer-ecde': {
    title: 'DevSecOps Training Coimbatore | EC-Council ECDE Labs',
    description: 'Hands-on DevSecOps training with EC-Council ECDE curriculum. Shift security left with automated SAST, DAST, SCA in GitHub Actions & CI/CD.',
    canonical: `${SITE_URL}/courses/devsecops-engineer-ecde`,
    primaryKeyword: 'DevSecOps training'
  },
  '/courses/encryption-specialist-eces': {
    title: 'Encryption Specialist Course | EC-Council ECES Program',
    description: 'Certified encryption specialist course (ECES). Master applied cryptography, PKI, digital signatures, and DPDP Act data protection standards.',
    canonical: `${SITE_URL}/courses/encryption-specialist-eces`,
    primaryKeyword: 'encryption specialist course'
  },
  '/courses/cyber-security-internship': {
    title: 'Cybersecurity Internship in Coimbatore | 1/3/6 Months',
    description: 'Premier cybersecurity internship in Coimbatore. Hands-on practical cyber range labs, live VAPT projects, certificate & placement assistance.',
    canonical: `${SITE_URL}/courses/cyber-security-internship`,
    primaryKeyword: 'cybersecurity internship in Coimbatore'
  },
  '/institutions-workshops': {
    title: 'Ethical Hacking Workshop for Colleges | 54+ Partners',
    description: 'Ethical hacking workshop for colleges across Tamil Nadu. Campus Cyber Range Center of Excellence (CoE), FDPs, and curriculum modernization.',
    canonical: `${SITE_URL}/institutions-workshops`,
    primaryKeyword: 'ethical hacking workshop for colleges'
  },
  '/about-us': {
    title: 'About Us | Hackup Technology Coimbatore Leadership',
    description: 'Learn about Hackup Technology: CEO Dinesh Paranthagan, 10 years experience, TANCCAO Sec. Gen., 2 patents, 54 colleges & 7 MNC partners.',
    canonical: `${SITE_URL}/about-us`,
    primaryKeyword: 'cybersecurity company in Coimbatore'
  },
  '/gallery': {
    title: 'Cyber Range & Event Gallery | Hackup Technology',
    description: 'Visual gallery of Hackup Technology’s Coimbatore Cyber Range, DEFCON Coimbatore 2026 meetups, campus hackathons, and police workshops.',
    canonical: `${SITE_URL}/gallery`,
    primaryKeyword: 'cybersecurity training institute in Tamil Nadu'
  },
  '/blog': {
    title: 'Cybersecurity Insights & Threat Research | Hackup Blog',
    description: 'Authoritative cybersecurity research from Hackup Technology: VAPT guides, DPDP Act compliance, AI firewalls, and red team strategies.',
    canonical: `${SITE_URL}/blog`,
    primaryKeyword: 'cybersecurity company India'
  },
  '/blog/vapt-methodology-guide-2026': {
    title: 'VAPT Services India | 2026 Penetration Testing Guide',
    description: 'Complete 2026 guide to enterprise VAPT services in India. Learn zero-downtime penetration testing methodologies, OWASP standards, and safe-to-host certification.',
    canonical: `${SITE_URL}/blog/vapt-methodology-guide-2026`,
    primaryKeyword: 'VAPT services India'
  },
  '/blog/dpdp-act-iso27001-compliance-roadmap': {
    title: 'ISO 27001 & GRC Consulting India | DPDP Act Roadmap',
    description: 'Step-by-step compliance roadmap for ISO 27001:2022 and the Indian DPDP Act 2023. Essential controls, consent architectures, and audit readiness strategies.',
    canonical: `${SITE_URL}/blog/dpdp-act-iso27001-compliance-roadmap`,
    primaryKeyword: 'ISO 27001 and GRC consulting India'
  },
  '/blog/ai-firewall-nextgen-soc-defense': {
    title: 'Managed Security Services India | AI Firewall & SOC',
    description: 'How patented AI-based firewalls and 24/7 managed SOC operations detect and isolate zero-day cyber threats in sub-milliseconds across Indian enterprises.',
    canonical: `${SITE_URL}/blog/ai-firewall-nextgen-soc-defense`,
    primaryKeyword: 'managed security services India'
  },
  '/contact': {
    title: 'Contact Hackup Technology | Coimbatore HQ & Phone',
    description: 'Contact Hackup Technology in Ganapathy, Coimbatore. Phone: +91 93620 12339 / +91 96262 15976. 24/7 cyber incident consultation.',
    canonical: `${SITE_URL}/contact`,
    primaryKeyword: 'cyber security company in Coimbatore'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Hackup Technology Pvt Ltd',
    description: 'Hackup Technology Privacy Policy. Learn how we safeguard your personal data in full compliance with the Indian DPDP Act 2023.',
    canonical: `${SITE_URL}/privacy-policy`,
    primaryKeyword: 'DPDP Act compliance'
  },
  '/terms': {
    title: 'Terms of Service | Hackup Technology Pvt Ltd',
    description: 'Hackup Technology Terms of Service governing enterprise cybersecurity services, training programs, and NDA obligations.',
    canonical: `${SITE_URL}/terms`,
    primaryKeyword: 'cybersecurity company India'
  },
  '/founder-patents': {
    title: 'Dual Cybersecurity Patents & Founder Profile | Hackup Tech',
    description: 'Discover Hackup Technology patents in AI firewall & binary reverse engineering led by Founder & CEO Dr. Dinesh Paranthagan, TANCCAO Secretary General.',
    canonical: `${SITE_URL}/founder-patents`,
    primaryKeyword: 'cybersecurity patents India'
  },
  '/cyber-range': {
    title: 'Live Cyber Range Sandbox & Attack Lab | Hackup Tech',
    description: 'Experience hands-on offensive & defensive topology simulations at Hackup Technology\'s Coimbatore Cyber Range. Zero static slides, 2,200+ attack tools.',
    canonical: `${SITE_URL}/cyber-range`,
    primaryKeyword: 'cyber range Coimbatore'
  },
  '/community': {
    title: 'DEFCON Coimbatore Chapter (#DC91422) | Hackup Community',
    description: 'Official DEFCON Coimbatore Chapter (#DC91422). Monthly red team workshops, Kovai HackCon CTFs, and ethical hacker meetups in Tamil Nadu.',
    canonical: `${SITE_URL}/community`,
    primaryKeyword: 'DEFCON Coimbatore community'
  },
  '/estimate': {
    title: 'Cybersecurity Cost & Training Scope Estimator | Hackup Tech',
    description: 'Calculate enterprise VAPT audit timelines and regulatory scopes, or map your personalized 3-stage cybersecurity career training path.',
    canonical: `${SITE_URL}/estimate`,
    primaryKeyword: 'VAPT cost estimator'
  }
};

export const COIMBATORE_INTERNSHIP_DETAILS = INTERNSHIP_DETAILS;

export const DEFCON_EVENTS: DefconEvent[] = [
  {
    id: 'defcon-cbe-2026-01',
    title: 'Adversarial AI & LLM Red Teaming Workshop',
    date: 'March 28, 2026',
    time: '10:00 AM - 4:00 PM IST',
    venue: 'Hackup Cyber Range Lab, Ganapathy, Coimbatore',
    speaker: 'Dr. Dinesh Paranthagan & Red Team Taskforce',
    speakerRole: 'Founder & CEO, Hackup Technology',
    status: 'UPCOMING',
    rsvpCount: 142,
    ctfPool: '₹50,000 Cash Pool',
    topics: ['Prompt Injections & Jailbreaks', 'RAG Vector Poisoning', 'Model Inversion Attacks', 'Hands-on CTF']
  },
  {
    id: 'defcon-cbe-2025-12',
    title: 'Active Directory Kerberos Warfare & EDR Evasion',
    date: 'December 14, 2025',
    time: '10:30 AM - 3:30 PM IST',
    venue: 'Coimbatore Tech Innovation Hub',
    speaker: 'S. Vignesh, OSCP',
    speakerRole: 'Lead Offensive Security Engineer',
    status: 'COMPLETED',
    rsvpCount: 185,
    ctfPool: '₹35,000 Cash Pool',
    topics: ['Kerberoasting & AS-REP Roasting', 'BloodHound Forest Mapping', 'Unhooking NTDLL', 'Live Pivot Range']
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    category: 'enterprise',
    name: 'Karthik Subramanian',
    role: 'Lead Security Architect',
    organization: 'Fintech Payment Corridors',
    location: 'Chennai / Coimbatore',
    avatarText: 'KS',
    quote: 'Hackup Technology conducted an exhaustive VAPT audit on our core payments API. Their team identified 3 critical authorization vulnerabilities that other commercial scanners completely missed. The Safe-to-Host report was accepted immediately by our banking partners.',
    verifiedBadge: 'Verified Enterprise Client',
    outcomeMetric: '100% RBI Compliance & 0 Downtime',
    skillsOrServices: ['API Penetration Testing', 'RBI CS Framework', 'Safe-to-Host Cert'],
    rating: 5
  },
  {
    id: 'test-2',
    category: 'enterprise',
    name: 'Arun Kumar M.',
    role: 'VP of Technology',
    organization: 'Hospital Network & Healthcare IT',
    location: 'Coimbatore',
    avatarText: 'AK',
    quote: 'We engaged Hackup for ISO 27001 and DPDP Act compliance. Their team guided us through every policy draft, technical control hardening, and mock audit. We passed our certification audit with zero non-conformities!',
    verifiedBadge: 'Healthcare IT Leader',
    outcomeMetric: 'ISO 27001:2022 Certified First Attempt',
    skillsOrServices: ['ISO 27001 Consulting', 'DPDP Act Audit', 'Zero-Trust Cloud'],
    rating: 5
  },
  {
    id: 'test-3',
    category: 'alumni',
    name: 'Priyanka Venkatesh',
    role: 'Cyber Security Analyst',
    organization: 'Global Tech MNC (Bengaluru)',
    location: 'Coimbatore / Bengaluru',
    avatarText: 'PV',
    quote: 'The EC-Council CEH v13 training with Dinesh Sir gave me 100% practical lab experience. I cleared my CEH exam on the first attempt and got placed with a top MNC in Bengaluru within 30 days.',
    verifiedBadge: 'CEH v13 Alumna',
    outcomeMetric: 'Placed at ₹9.5 LPA Cyber Role',
    skillsOrServices: ['CEH v13', 'Penetration Testing', 'Burp Suite Pro'],
    rating: 5
  },
  {
    id: 'test-4',
    category: 'alumni',
    name: 'Vigneshwaran P.',
    role: 'SOC Analyst L2',
    organization: 'Defense Security Operations',
    location: 'Coimbatore',
    avatarText: 'VP',
    quote: 'The 6-month industrial internship at Hackup’s Coimbatore cyber range was transformative. Working with live Wazuh SIEM rules, Wireshark packet captures, and memory forensics gave me practical confidence that no college textbook could match.',
    verifiedBadge: 'Hackup Academy Intern',
    outcomeMetric: 'SOC L2 Analyst Placement',
    skillsOrServices: ['Wazuh SIEM', 'Threat Hunting', 'Incident Playbooks'],
    rating: 5
  }
];

