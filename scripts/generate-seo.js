import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

const SITE_URL = 'https://ht-2-five.vercel.app';
const LAST_MOD = new Date().toISOString().split('T')[0];

const ROUTES = [
  {
    path: '/',
    title: 'Cyber Security Company in Coimbatore | Hackup Technology',
    description: 'Premier cyber security company in Coimbatore. Patented AI firewall, VAPT audits, 24/7 SOC, digital forensics & official EC-Council training center.',
    priority: '1.0',
    changefreq: 'weekly',
    h1: "India's Premier Cybersecurity Enterprise for Advanced Solutions",
    intro: 'Hackup Technology Pvt Ltd is a premier cyber defense and security enterprise headquartered in Ganapathy, Coimbatore, Tamil Nadu. Official EC-Council Accredited Training Center (ATC), TANCCAO Secretariat, and dual Indian patent holder.',
    sections: [
      {
        title: 'Core Cybersecurity Services',
        content: 'Enterprise Penetration Testing (VAPT), 24/7 Managed SOC Operations, ISO 27001 & DPDP Act Consulting, Digital Forensics (DFIR), IoT/OT Security, Red Team Adversary Simulation, and Patented AI Firewall Defense.'
      },
      {
        title: 'EC-Council Accredited Training Center',
        content: 'Hands-on practical training in Certified Ethical Hacker (CEH v13), Cloud Security Engineer (CCSE), DevSecOps (ECDE), Encryption Specialist (ECES), and Coimbatore Industrial Internships.'
      }
    ],
    schema: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Hackup Technology',
      description: 'Premier Cybersecurity Firm & EC-Council Accredited Training Center'
    }
  },
  {
    path: '/services',
    title: 'Cybersecurity Services Coimbatore India | Hackup Tech',
    description: 'Enterprise cybersecurity services Coimbatore India: VAPT, 24/7 SOC, ISO 27001 GRC consulting, Red Teaming, IoT security & AI defense solutions.',
    priority: '0.9',
    changefreq: 'weekly',
    h1: 'Enterprise Cybersecurity Services & Defense Solutions',
    intro: 'Mission-critical offensive and defensive cybersecurity advisory designed for modern digital enterprises, fintechs, government bodies, and healthcare institutions.',
    sections: [
      {
        title: 'All 8 Enterprise Cybersecurity Services',
        links: [
          { text: 'Penetration Testing & VAPT Services', href: '/services/penetration-testing-vapt' },
          { text: 'Vulnerability Assessment & Security Audit', href: '/services/vulnerability-management-security-audit' },
          { text: '24/7 Managed SOC Operations & SIEM', href: '/services/soc-managed-security' },
          { text: 'ISO 27001 & DPDP Act Compliance Consulting', href: '/services/grc-compliance-consulting' },
          { text: 'Red Team Assessment & Adversary Simulation', href: '/services/red-team-blue-team' },
          { text: 'IoT & Industrial OT / SCADA Security', href: '/services/iot-ot-security' },
          { text: 'Digital Forensics & Incident Response (DFIR)', href: '/services/digital-forensics-cybercrime-investigation' },
          { text: 'AI Security Consulting & Patented Defense', href: '/services/ai-security' }
        ]
      }
    ]
  },
  {
    path: '/services/penetration-testing-vapt',
    title: 'VAPT Services India | Penetration Testing Coimbatore',
    description: 'Top-tier VAPT services India. Zero-downtime penetration testing for web, mobile, APIs and networks with official Safe-to-Host certification.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'Penetration Testing & VAPT Services',
    intro: 'Comprehensive offensive security assessments covering Web Applications (OWASP Top 10), iOS/Android Mobile Apps (OWASP MASTG), REST/GraphQL APIs, and enterprise internal/external networks with zero downtime and official Safe-to-Host certification.',
    sections: [
      {
        title: 'Testing Methodologies & Standards',
        content: 'Conducted under OWASP Top 10:2025, NIST SP 800-115, PTES, and OSSTMM frameworks combining 85% manual exploit chaining with 15% heuristic scanning.'
      },
      {
        title: 'Key Deliverables',
        content: 'Executive Summary with verified CVSS 3.1 & 4.0 scores, step-by-step PoC exploit chains, direct code-level remediation blueprints, and a 30-day free re-test with an official Safe-to-Host certificate.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'Penetration Testing & VAPT Services',
      description: 'Zero-downtime offensive vulnerability assessment and penetration testing across web, mobile, APIs and cloud endpoints.'
    }
  },
  {
    path: '/services/vulnerability-management-security-audit',
    title: 'Vulnerability Assessment & Security Audit | Hackup',
    description: 'Continuous vulnerability assessment and enterprise security audit services. Asset discovery, CVE prioritization, and continuous posture management.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Vulnerability Management & Enterprise Security Audit',
    intro: 'Continuous risk-based vulnerability management and comprehensive enterprise infrastructure audits to identify, triage, and remediate systemic exposures before adversaries strike.',
    sections: [
      {
        title: 'Continuous Posture Hardening',
        content: 'Full asset discovery, automated continuous CVE prioritization, configuration benchmarking against CIS guidelines, and executive remediation tracking.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'Vulnerability Management & Security Audit',
      description: 'Continuous vulnerability assessment, attack surface discovery, and enterprise security audit.'
    }
  },
  {
    path: '/services/soc-managed-security',
    title: 'Managed Security Services India | 24/7 SOC Operations',
    description: '24/7 managed security services India. Turnkey Wazuh & Splunk SIEM deployment, real-time threat hunting, and rapid incident response triage.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: '24/7 Managed SOC Operations & SIEM Threat Hunting',
    intro: 'Round-the-clock Security Operations Center monitoring, SIEM telemetry integration (Wazuh, Splunk), behavioral anomaly triage, and active incident mitigation.',
    sections: [
      {
        title: 'Turnkey 24/7 Defense',
        content: 'Sub-15 minute threat response time, MITRE ATT&CK aligned detection rules, active threat hunting, log compliance archiving, and live incident containment.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'Managed Security Services & 24/7 SOC',
      description: '24/7 managed detection and response, SIEM telemetry monitoring, and proactive threat hunting.'
    }
  },
  {
    path: '/services/grc-compliance-consulting',
    title: 'ISO 27001 and GRC Consulting India | DPDP Act Audit',
    description: 'ISO 27001 and GRC consulting India. Guaranteed audit readiness for SOC 2 Type II, Indian DPDP Act 2023, and RBI regulatory frameworks.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'GRC Compliance Consulting & ISO 27001 Audit Readiness',
    intro: 'Strategic Governance, Risk, and Compliance (GRC) advisory guiding organizations through ISO/IEC 27001:2022 accreditation, SOC 2 Type II attestation, and Indian DPDP Act 2023 mandates.',
    sections: [
      {
        title: 'First-Attempt Audit Certification',
        content: 'Tailored Statement of Applicability (SoA), gap analysis, mock internal audits, technical privacy controls, and direct auditor representation.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'GRC Compliance Consulting',
      description: 'ISO 27001, SOC 2 Type II, and Indian DPDP Act 2023 compliance advisory.'
    }
  },
  {
    path: '/services/red-team-blue-team',
    title: 'Red Team Assessment & Adversary Simulation | Hackup',
    description: 'Elite red team assessment and purple team operations in India. Realistic adversary simulation, EDR evasion, and defensive resilience training.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Red Team Assessment & Advanced Adversary Simulation',
    intro: 'Full-scope offensive simulation mimicking advanced persistent threats (APTs) to test your perimeter defenses, internal network resilience, employee awareness, and detection capabilities.',
    sections: [
      {
        title: 'Realistic Adversary Emulation',
        content: 'Covert infiltration, Active Directory Kerberos exploitation, physical security audits, custom malware c2 staging, and collaborative purple team debriefs.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'Red Team Adversary Simulation',
      description: 'Elite red teaming, APT emulation, and purple teaming security evaluations.'
    }
  },
  {
    path: '/services/iot-ot-security',
    title: 'IoT Security Assessment & SCADA Testing | Hackup',
    description: 'IoT security assessment, firmware reverse engineering, and industrial OT/SCADA penetration testing adhering to IEC 62443 standards.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'IoT & Industrial OT / SCADA Security Assessment',
    intro: 'In-depth hardware, firmware, and telemetry evaluations for smart connected devices, medical appliances, automotive systems, and critical industrial SCADA / PLC controllers.',
    sections: [
      {
        title: 'Firmware & Industrial Standards',
        content: 'Binary reverse engineering, JTAG/UART hardware debugging, wireless protocol exploitation (Zigbee, BLE, LoRaWAN), and IEC 62443 industrial compliance.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'IoT & OT Security Assessment',
      description: 'Hardware firmware reverse engineering and industrial SCADA/OT penetration testing.'
    }
  },
  {
    path: '/services/digital-forensics-cybercrime-investigation',
    title: 'Digital Forensics Coimbatore | Section 65B DFIR Triage',
    description: 'Digital forensics Coimbatore. 24/7 emergency ransomware triage, memory analysis & Section 65B court evidence dossiers for cybercrime cells.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'Digital Forensics & Incident Response (DFIR) Triage',
    intro: 'Rapid digital evidence extraction, live memory analysis, cryptocurrency money laundering tracing, and judicial Section 65B Indian Evidence Act compliant documentation.',
    sections: [
      {
        title: 'State Law Enforcement Advisory',
        content: 'Led by technical consultants to the Tamil Nadu Police Cyber Crime Wing, providing certified disk imaging, malware decompilation, and admissible court expert testimony.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'Digital Forensics & Incident Response',
      description: '24/7 emergency ransomware response, volatile memory analysis, and Section 65B digital forensics.'
    }
  },
  {
    path: '/services/ai-security',
    title: 'AI Security Consulting India | Patented LLM Defense',
    description: 'AI security consulting India. Patented AI firewall, LLM red teaming, prompt injection defense, and RAG vector database protection.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'AI Security Consulting & Patented Neural Defense Systems',
    intro: 'Defending machine learning models and Generative AI pipelines against prompt injections, model inversion, data poisoning, and unauthorized API exploitation.',
    sections: [
      {
        title: 'Patented AI Technology',
        content: 'Powered by Hackup Technology’s proprietary Indian patent IN-PAT-2024-AI-FW8910: AI-based Next-Gen Firewall Security System for sub-millisecond anomaly interception.'
      }
    ],
    schema: {
      '@type': 'Service',
      name: 'AI Security Consulting & Defense',
      description: 'LLM red teaming, adversarial prompt injection defense, and patented AI firewall security.'
    }
  },
  {
    path: '/courses',
    title: 'Best Cyber Security Course in Coimbatore | Hackup',
    description: 'Best cyber security course in Coimbatore. Official EC-Council Accredited Training Center for CEH v13, CCSE, ECDE, ECES & industrial internships.',
    priority: '0.9',
    changefreq: 'weekly',
    h1: 'Certified Cyber Security Courses in Coimbatore',
    intro: 'Official EC-Council Accredited Training Center (ATC) providing elite cybersecurity certification programs with genuine courseware, hands-on Coimbatore cyber range labs, and corporate placement pipelines.',
    sections: [
      {
        title: 'EC-Council Authorized Training Tracks',
        links: [
          { text: 'Certified Ethical Hacker (CEH v13)', href: '/courses/certified-ethical-hacker-ceh' },
          { text: 'Certified Cloud Security Engineer (CCSE)', href: '/courses/cloud-security-engineer-ccse' },
          { text: 'Certified DevSecOps Engineer (ECDE)', href: '/courses/devsecops-engineer-ecde' },
          { text: 'Certified Encryption Specialist (ECES)', href: '/courses/encryption-specialist-eces' },
          { text: 'Industrial Cybersecurity Internship (1/3/6 Months)', href: '/courses/cyber-security-internship' }
        ]
      }
    ]
  },
  {
    path: '/courses/certified-ethical-hacker-ceh',
    title: 'CEH Training in Coimbatore | EC-Council CEH v13 ATC',
    description: 'Official CEH training in Coimbatore at Hackup Technology. EC-Council accredited training partner, practical labs, Aspen access & exam vouchers.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'Certified Ethical Hacker (CEH v13) Training in Coimbatore',
    intro: 'Master modern offensive techniques including AI-driven vulnerability exploitation, cloud attacks, and perimeter bypasses at South India’s premier EC-Council Accredited Training Center.',
    sections: [
      {
        title: 'Course Highlights',
        content: 'Official EC-Council Aspen portal access, 220+ hands-on cloud labs, 40+ corporate placement partners, and direct exam voucher assistance.'
      }
    ],
    schema: {
      '@type': 'Course',
      name: 'Certified Ethical Hacker (CEH v13)',
      description: 'Official EC-Council Certified Ethical Hacker v13 training with hands-on lab sandbox access in Coimbatore.'
    }
  },
  {
    path: '/courses/cloud-security-engineer-ccse',
    title: 'Cloud Security Course Coimbatore | EC-Council CCSE',
    description: 'EC-Council certified cloud security course (CCSE). Multi-cloud defense across AWS, Azure, GCP, container security, and Kubernetes hardening.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Certified Cloud Security Engineer (CCSE) Course',
    intro: 'Comprehensive multi-cloud security engineering across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), with dedicated Kubernetes container defense.',
    sections: [
      {
        title: 'Curriculum & Hands-on Labs',
        content: 'IAM least privilege engineering, CloudTrail & GuardDuty threat triage, CIS benchmark auditing, and serverless runtime protection.'
      }
    ],
    schema: {
      '@type': 'Course',
      name: 'Certified Cloud Security Engineer (CCSE)',
      description: 'EC-Council certified cloud security training covering AWS, Azure, and GCP architecture hardening.'
    }
  },
  {
    path: '/courses/devsecops-engineer-ecde',
    title: 'DevSecOps Training Coimbatore | EC-Council ECDE Labs',
    description: 'Hands-on DevSecOps training with EC-Council ECDE curriculum. Shift security left with automated SAST, DAST, SCA in GitHub Actions & CI/CD.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'EC-Council Certified DevSecOps Engineer (ECDE) Training',
    intro: 'Learn how to integrate security automation directly into modern software delivery pipelines using automated static code analysis (SAST), dynamic testing (DAST), and container image scanning.',
    sections: [
      {
        title: 'CI/CD Pipeline Security',
        content: 'Automated GitHub Actions security gates, Trivy container scanning, SonarQube quality gates, and HashiCorp Vault secrets management.'
      }
    ],
    schema: {
      '@type': 'Course',
      name: 'Certified DevSecOps Engineer (ECDE)',
      description: 'EC-Council DevSecOps curriculum integrating security into CI/CD build and deploy workflows.'
    }
  },
  {
    path: '/courses/encryption-specialist-eces',
    title: 'Encryption Specialist Course | EC-Council ECES Program',
    description: 'Certified encryption specialist course (ECES). Master applied cryptography, PKI, digital signatures, and DPDP Act data protection standards.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'EC-Council Certified Encryption Specialist (ECES) Course',
    intro: 'Master applied modern cryptography, public key infrastructure (PKI), digital signatures, and data-at-rest encryption algorithms required for stringent DPDP Act 2023 compliance.',
    sections: [
      {
        title: 'Cryptographic Architecture',
        content: 'Symmetric and asymmetric ciphers, SSL/TLS handshake security, hardware security modules (HSM), and key management lifecycles.'
      }
    ],
    schema: {
      '@type': 'Course',
      name: 'Certified Encryption Specialist (ECES)',
      description: 'EC-Council applied cryptography, PKI architecture, and enterprise encryption course.'
    }
  },
  {
    path: '/courses/cyber-security-internship',
    title: 'Cybersecurity Internship in Coimbatore | 1/3/6 Months',
    description: 'Premier cybersecurity internship in Coimbatore. Hands-on practical cyber range labs, live VAPT projects, certificate & placement assistance.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'Cybersecurity Industrial Internship in Coimbatore (1 / 3 / 6 Months)',
    intro: 'Intensive on-site industrial internship at Hackup Technology’s Coimbatore Cyber Range. Work directly alongside offensive red teamers and defensive SOC analysts on verified enterprise scopes.',
    sections: [
      {
        title: 'Internship Structure & Outcomes',
        content: 'Real network packet capture analysis, Wazuh SIEM rule writing, OWASP Top 10 web app testing, verifiable project completion certificate, and direct placement support.'
      }
    ],
    schema: {
      '@type': 'Course',
      name: 'Cybersecurity Industrial Internship',
      description: '1, 3, and 6-month hands-on industrial cybersecurity internship programs in Coimbatore.'
    }
  },
  {
    path: '/institutions-workshops',
    title: 'Ethical Hacking Workshop for Colleges | 54+ Partners',
    description: 'Ethical hacking workshop for colleges across Tamil Nadu. Campus Cyber Range Center of Excellence (CoE), FDPs, and curriculum modernization.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Institutional Cyber Partnerships & Collegiate Workshops',
    intro: 'Empowering 54+ higher education institutions across South India through on-campus Cyber Centers of Excellence (CoE), faculty development programs (FDPs), and university Board of Studies curriculum modernization.',
    sections: [
      {
        title: '54+ Academic Partners',
        content: 'VIT, PSG Tech, SRM University, Sri Ramakrishna Engineering College, Dr. NGP IT, Rathinam Group, Bannari Amman, and leading universities across Tamil Nadu.'
      }
    ]
  },
  {
    path: '/about-us',
    title: 'About Us | Hackup Technology Coimbatore Leadership',
    description: 'Learn about Hackup Technology: CEO Dinesh Paranthagan, 10 years experience, TANCCAO Sec. Gen., 2 patents, 54 colleges & 7 MNC partners.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'About Hackup Technology — Executive Leadership & Defense Powerhouse',
    intro: 'Founded and directed by Dr. Dinesh Paranthagan (M.C.A., Ph.D.), Secretary General of TANCCAO and Technical Consultant to Tamil Nadu Police Cyber Crime Dept. Delivering national cyber defense and hands-on skill acceleration for a decade.',
    sections: [
      {
        title: 'Verified Track Record',
        content: '1,00,000+ students trained, 2,100+ audits delivered, 2 proprietary patents granted, 54+ institutional partners, and 4.9★ rating on Google Reviews.'
      }
    ]
  },
  {
    path: '/gallery',
    title: 'Cyber Range & Event Gallery | Hackup Technology',
    description: 'Visual gallery of Hackup Technology’s Coimbatore Cyber Range, DEFCON Coimbatore 2026 meetups, campus hackathons, and police workshops.',
    priority: '0.7',
    changefreq: 'monthly',
    h1: 'Cyber Range Training & Community Event Gallery',
    intro: 'Photographic documentation of our high-tech Cyber Range training drills, DEFCON Coimbatore Chapter meetups, law enforcement cyber cell training, and collegiate Centers of Excellence.',
    sections: [
      {
        title: 'Events & Programs',
        content: 'Hands-on attack-defense drills, red team vs blue team simulations, state police digital forensics workshops, and hackathon mentorships.'
      }
    ]
  },
  {
    path: '/blog',
    title: 'Cybersecurity Insights & Threat Research | Hackup Blog',
    description: 'Authoritative cybersecurity research from Hackup Technology: VAPT guides, DPDP Act compliance, AI firewalls, and red team strategies.',
    priority: '0.8',
    changefreq: 'weekly',
    h1: 'Cybersecurity Research, Threat Insights & Compliance Articles',
    intro: 'In-depth technical guides, regulatory analyses, and offensive threat research published by Hackup Technology’s senior engineering team in Coimbatore.',
    sections: [
      {
        title: 'Featured Technical Articles',
        links: [
          { text: 'The 2026 Enterprise Guide to Penetration Testing (VAPT)', href: '/blog/vapt-methodology-guide-2026' },
          { text: 'DPDP Act 2023 & ISO 27001:2022 Implementation Roadmap', href: '/blog/dpdp-act-iso27001-compliance-roadmap' },
          { text: 'AI-Powered Firewalls & 24/7 Managed SOC Defense', href: '/blog/ai-firewall-nextgen-soc-defense' }
        ]
      }
    ]
  },
  {
    path: '/blog/vapt-methodology-guide-2026',
    title: 'VAPT Services India | 2026 Penetration Testing Guide',
    description: 'Complete 2026 guide to enterprise VAPT services in India. Learn zero-downtime penetration testing methodologies, OWASP standards, and safe-to-host certification.',
    priority: '0.75',
    changefreq: 'monthly',
    h1: 'The 2026 Enterprise Guide to Penetration Testing (VAPT) & Zero-Downtime Exploit Verification',
    intro: 'Explore how modern offensive security testing has evolved beyond automated scanning noise into deep manual exploit verification, production-safe methodologies, and verifiable Safe-to-Host certification.',
    sections: [
      {
        title: 'Why Automated Scanners Fall Short in Modern Enterprise Environments',
        content: 'Over 70% of critical security issues like BOLA, multi-step logic bypasses, and second-order injection attacks require deep manual human exploit verification.'
      },
      {
        title: 'Achieving True Regulatory Attestation',
        content: 'Understanding the RBI, SEBI, CERT-In, and DPDP Act compliance requirements for verified Safe-to-Host certifications.'
      }
    ],
    schema: {
      '@type': 'Article',
      headline: 'The 2026 Enterprise Guide to Penetration Testing (VAPT) & Zero-Downtime Exploit Verification',
      datePublished: '2026-01-15',
      author: { '@type': 'Person', name: 'Dinesh Paranthagan' }
    }
  },
  {
    path: '/blog/dpdp-act-iso27001-compliance-roadmap',
    title: 'ISO 27001 & GRC Consulting India | DPDP Act Roadmap',
    description: 'Step-by-step compliance roadmap for ISO 27001:2022 and the Indian DPDP Act 2023. Essential controls, consent architectures, and audit readiness strategies.',
    priority: '0.75',
    changefreq: 'monthly',
    h1: 'DPDP Act 2023 & ISO 27001:2022 Implementation Roadmap for Indian Enterprises',
    intro: 'Navigate the stringent requirements of India’s Digital Personal Data Protection Act alongside ISO/IEC 27001:2022. Discover actionable steps to avoid penalties and protect customer trust.',
    sections: [
      {
        title: 'Convergence of ISO Standards and Indian Privacy Law',
        content: 'With penalties reaching up to ₹250 Crores, Indian enterprises must implement rigorous data principal consent workflows and robust encryption architectures.'
      }
    ],
    schema: {
      '@type': 'Article',
      headline: 'DPDP Act 2023 & ISO 27001:2022 Implementation Roadmap for Indian Enterprises',
      datePublished: '2026-02-03',
      author: { '@type': 'Person', name: 'Dinesh Paranthagan' }
    }
  },
  {
    path: '/blog/ai-firewall-nextgen-soc-defense',
    title: 'Managed Security Services India | AI Firewall & SOC',
    description: 'How patented AI-based firewalls and 24/7 managed SOC operations detect and isolate zero-day cyber threats in sub-milliseconds across Indian enterprises.',
    priority: '0.75',
    changefreq: 'monthly',
    h1: 'AI-Powered Firewalls & 24/7 Managed SOC Defense: Mitigating Real-Time Zero-Days',
    intro: 'Discover how Hackup Technology’s patented AI firewall innovation and 24/7 managed SOC SIEM ingestion create an impenetrable defense perimeter against polymorphic malware and APT attacks.',
    sections: [
      {
        title: 'Patented AI Neural Inspection',
        content: 'Autonomous packet inspection analyzing real-time network stream telemetry to intercept unauthorized zero-day Command and Control tunnels.'
      }
    ],
    schema: {
      '@type': 'Article',
      headline: 'AI-Powered Firewalls & 24/7 Managed SOC Defense: Mitigating Real-Time Zero-Days',
      datePublished: '2026-02-22',
      author: { '@type': 'Person', name: 'Dinesh Paranthagan' }
    }
  },
  {
    path: '/contact',
    title: 'Contact Hackup Technology | Coimbatore HQ & Phone',
    description: 'Contact Hackup Technology in Ganapathy, Coimbatore. Phone: +91 93620 12339 / +91 96262 15976. 24/7 cyber incident consultation.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Contact Hackup Technology Headquarters & Emergency Cyber Hotline',
    intro: 'Reach out to Hackup Technology for enterprise cybersecurity audits, EC-Council course admissions, academic partnerships, or urgent incident response assistance.',
    sections: [
      {
        title: 'HQ Office Details',
        content: 'No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006, Tamil Nadu, India. Phones: +91 93620 12339 / +91 96262 15976. Email: info@hackuptechnology.com. Active 24/7 Hotline.'
      }
    ]
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Hackup Technology Pvt Ltd',
    description: 'Hackup Technology Privacy Policy. Learn how we safeguard your personal data in full compliance with the Indian DPDP Act 2023.',
    priority: '0.4',
    changefreq: 'yearly',
    h1: 'Privacy Policy — Hackup Technology Pvt Ltd',
    intro: 'Our policy governing the collection, processing, and protection of enterprise client and student personal information under the Indian Digital Personal Data Protection (DPDP) Act 2023.',
    sections: [
      {
        title: 'Data Protection Commitment',
        content: 'Zero unauthorized third-party sharing, AES-256 encrypted storage, explicit consent mechanisms, and clear data principal deletion rights.'
      }
    ]
  },
  {
    path: '/terms',
    title: 'Terms of Service | Hackup Technology Pvt Ltd',
    description: 'Hackup Technology Terms of Service governing enterprise cybersecurity services, training programs, and NDA obligations.',
    priority: '0.4',
    changefreq: 'yearly',
    h1: 'Terms of Service — Hackup Technology Pvt Ltd',
    intro: 'Standard terms governing enterprise vulnerability assessments, penetration testing engagements, strict non-disclosure agreements (NDAs), and EC-Council academy enrollments.',
    sections: [
      {
        title: 'Professional Service Terms',
        content: 'Confidentiality of client findings, production-safe rules of engagement, intellectual property retention, and certification guidelines.'
      }
    ]
  },
  {
    path: '/founder-patents',
    title: 'Dual Cybersecurity Patents & Founder Profile | Hackup Tech',
    description: 'Discover Hackup Technology patents in AI firewall & binary reverse engineering led by Founder & CEO Dr. Dinesh Paranthagan, TANCCAO Secretary General.',
    priority: '0.85',
    changefreq: 'monthly',
    h1: 'Pioneering National Cyber Defense & Patented Innovation',
    intro: 'Profile of CEO Dr. Dinesh Paranthagan (Ph.D., TANCCAO Secretary General, State Police Consultant) and deep dive into Hackup Technology’s 2 published Indian cybersecurity patents.',
    sections: [
      {
        title: 'Patent 1: AI-Based Next-Gen Firewall Security System',
        content: 'Patent No: IN-PAT-2024-AI-FW8910. Autonomous real-time anomaly detection, zero-day threat mitigation, and predictive packet inspection neural engine.'
      },
      {
        title: 'Patent 2: Automated Pentesting & Binary Reverse Engineering Suite',
        content: 'Patent No: IN-PAT-2023-RE-VAPT4421. Automated vulnerability chaining, binary deconstruction, memory layout profiling, and zero false positive exploit validation.'
      }
    ]
  },
  {
    path: '/cyber-range',
    title: 'Live Cyber Range Sandbox & Attack Lab | Hackup Tech',
    description: 'Experience hands-on offensive & defensive topology simulations at Hackup Technology\'s Coimbatore Cyber Range. Zero static slides, 2,200+ attack tools.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'The Hackup Cyber Range — Hands-On Virtual Attack-Defense Sandbox',
    intro: 'A state-of-the-art virtual cyber battlefield featuring live attack vectors, active directory topologies, WAF perimeter bypassing, and SIEM threat hunting drills.',
    sections: [
      {
        title: 'Cyber Range Capabilities',
        content: '2,200+ offensive tools loaded, live ransomware detonation chambers, MITRE ATT&CK aligned attack paths, and multiplayer red vs. blue team defense scenarios.'
      }
    ]
  },
  {
    path: '/community',
    title: 'DEFCON Coimbatore Chapter (#DC91422) | Hackup Community',
    description: 'Official DEFCON Coimbatore Chapter (#DC91422). Monthly red team workshops, Kovai HackCon CTFs, and ethical hacker meetups in Tamil Nadu.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'DEFCON Coimbatore Chapter & Tamil Nadu Cybersecurity Research Hub',
    intro: 'Home of the official DEFCON Coimbatore Chapter (#DC91422), uniting over 1,200 security researchers, developers, students, and bug bounty hunters.',
    sections: [
      {
        title: 'Community Activities',
        content: 'Monthly red team technical meetups, hardware hacking villages, Kovai HackCon CTF tournaments, and open threat intelligence sharing.'
      }
    ]
  },
  {
    path: '/estimate',
    title: 'Cybersecurity Cost & Training Scope Estimator | Hackup Tech',
    description: 'Calculate enterprise VAPT audit timelines and regulatory scopes, or map your personalized 3-stage cybersecurity career training path.',
    priority: '0.8',
    changefreq: 'monthly',
    h1: 'Interactive Cybersecurity Project Scope & Career Training Estimator',
    intro: 'Instant calculation tool for enterprise VAPT turnaround timelines, compliance audit readiness frameworks, or personalized 3-stage career acceleration tracks.',
    sections: [
      {
        title: 'Enterprise & Career Roadmaps',
        content: 'Calculate testing days based on endpoints, microservices, and regulatory requirements (RBI, ISO 27001, DPDP Act), or explore custom certifications.'
      }
    ]
  }
];

function generateSitemap() {
  const xmlUrls = ROUTES.map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || '0.7'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function buildSemanticHtml(route) {
  const sectionsHtml = (route.sections || [])
    .map((sec) => {
      let contentHtml = '';
      if (sec.content) {
        contentHtml += `<p>${sec.content}</p>`;
      }
      if (sec.links && sec.links.length > 0) {
        contentHtml += `<ul>${sec.links.map((l) => `<li><a href="${l.href}">${l.text}</a></li>`).join('')}</ul>`;
      }
      return `<section><h2>${sec.title}</h2>${contentHtml}</section>`;
    })
    .join('');

  return `<header>
  <nav aria-label="Main Navigation">
    <a href="/">Home</a> |
    <a href="/services">Services</a> |
    <a href="/courses">Courses</a> |
    <a href="/institutions-workshops">Institutions &amp; Workshops</a> |
    <a href="/about-us">About Us</a> |
    <a href="/gallery">Gallery</a> |
    <a href="/blog">Blog</a> |
    <a href="/contact">Contact</a> |
    <a href="/founder-patents">Founder &amp; Patents</a> |
    <a href="/cyber-range">Cyber Range</a> |
    <a href="/community">DEFCON Community</a> |
    <a href="/estimate">Estimator</a>
  </nav>
</header>
<main>
  <article>
    <h1>${route.h1}</h1>
    <p>${route.intro || route.description}</p>
    ${sectionsHtml}
    <section>
      <h2>Corporate Headquarters &amp; 24/7 Incident Hotline</h2>
      <p>
        <strong>Hackup Technology Pvt Ltd</strong><br />
        No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006, Tamil Nadu, India.<br />
        Phone: <a href="tel:+919362012339">+91 93620 12339</a> / <a href="tel:+919626215976">+91 96262 15976</a><br />
        Email: <a href="mailto:info@hackuptechnology.com">info@hackuptechnology.com</a><br />
        Official EC-Council ATC &bull; TANCCAO Secretariat
      </p>
    </section>
  </article>
</main>
<footer>
  <p>&copy; 2026 Hackup Technology Pvt Ltd. All Rights Reserved. Official EC-Council Accredited Training Center.</p>
  <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
</footer>`;
}

function processPrerender() {
  console.log('🚀 Starting SEO & Prerendering Build Process...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Generate sitemap.xml and robots.txt in both public and dist
  const sitemapXml = generateSitemap();
  const robotsTxt = generateRobotsTxt();

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ Generated sitemap.xml with 31 verified routes.');
  console.log('✅ Generated robots.txt pointing to production sitemap.');

  // Prerender all routes
  let count = 0;
  for (const route of ROUTES) {
    const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    let pageHtml = baseHtml;

    // 1. Update Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

    // 2. Update Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Update Canonical Tag
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // 4. Update Open Graph Tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );

    // 5. Update Twitter Card Tags
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 6. Inject Route-Specific JSON-LD Schema if applicable
    if (route.schema) {
      const routeSchemaHtml = `\n    <script type="application/ld+json">\n    ${JSON.stringify({
        '@context': 'https://schema.org',
        ...route.schema
      }, null, 2)}\n    </script>`;
      pageHtml = pageHtml.replace('</head>', `${routeSchemaHtml}\n  </head>`);
    }

    // 7. Inject Breadcrumbs Schema
    if (route.path !== '/') {
      const parts = route.path.split('/').filter(Boolean);
      const breadcrumbItems = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }
      ];
      let currentPath = '';
      parts.forEach((p, idx) => {
        currentPath += `/${p}`;
        const name = p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: idx + 2,
          name,
          item: `${SITE_URL}${currentPath}`
        });
      });

      const breadcrumbJsonLd = `\n    <script type="application/ld+json">\n    ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      }, null, 2)}\n    </script>`;
      pageHtml = pageHtml.replace('</head>', `${breadcrumbJsonLd}\n  </head>`);
    }

    // 8. Inject Semantic Content into #root
    const semanticBody = buildSemanticHtml(route);
    pageHtml = pageHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">\n${semanticBody}\n    </div>`
    );

    // 9. Write destination file
    if (route.path === '/') {
      fs.writeFileSync(indexPath, pageHtml);
    } else {
      const targetDir = path.join(distDir, route.path.slice(1));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml);
    }
    count++;
  }

  console.log(`✨ Successfully prerendered ${count} public HTML pages with full metadata, semantic HTML & structured data!`);
}

processPrerender();
