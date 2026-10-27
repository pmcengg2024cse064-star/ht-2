import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  ExternalLink,
  Bot,
  RotateCcw,
  Minimize2,
  Maximize2,
  Mail,
  ShieldCheck,
  GraduationCap,
  Calendar,
  Award
} from 'lucide-react';
import { COMPANY_FACTS, FOUNDER_PROFILE, CYBER_PATENTS } from '../../data/cyberData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'audit' | 'demo' | 'call' | 'email' | 'internship' | 'link';
    payload?: string;
  }[];
}

interface CyberChatbotProps {
  onOpenAudit?: (serviceTitle?: string) => void;
  onBookDemo?: (courseTitle?: string) => void;
}

// ----------------------------------------------------------------------
// ROUTE-SPECIFIC PROMPT SUGGESTIONS
// ----------------------------------------------------------------------

const CORPORATE_PROMPTS = [
  { label: '🏢 About Hackup & Track Record', query: 'Tell me about Hackup Technology and its credentials.' },
  { label: '👨‍💼 Founder Dinesh Paranthagan & Patents', query: 'Tell me about Founder & CEO Dinesh Paranthagan and his patents.' },
  { label: '🛡️ Enterprise Security Solutions', query: 'What enterprise cybersecurity and VAPT services do you offer?' },
  { label: '👮 Police & Government Advisory', query: 'What is Hackup’s involvement with Police and Government cyber advisory?' },
  { label: '📍 Coimbatore HQ & Contact', query: 'Where is your Coimbatore center located and what are your contact numbers?' },
  { label: '💼 Cybersecurity Internships', query: 'How does the cybersecurity industrial internship program work?' }
];

const SERVICES_PROMPTS = [
  { label: '🛡️ Enterprise VAPT Audit', query: 'What is included in your Enterprise VAPT audit methodology?' },
  { label: '🚨 24/7 Managed SOC & Incident Hotline', query: 'Tell me about your 24/7 Managed SOC and incident response hotline.' },
  { label: '📋 ISO 27001 & DPDP Act Compliance', query: 'How do you help organizations achieve ISO 27001 and DPDP Act compliance?' },
  { label: '🎯 Red Team Simulation', query: 'What is Hackup’s Red Team and adversary simulation service?' },
  { label: '🤖 AI Security & Patented Firewall', query: 'Tell me about your patented AI firewall and AI security consulting.' },
  { label: '📞 Request Scoped Proposal', query: 'How do I request a scoped audit proposal for my organization?' }
];

const COURSES_PROMPTS = [
  { label: '🎓 Certified Ethical Hacker (CEH v13)', query: 'Tell me about the CEH v13 AI-powered training curriculum and duration.' },
  { label: '🧪 Practical Cyber Labs & Sandbox', query: 'How do your hands-on practical cyber range labs work?' },
  { label: '☁️ Cloud Security (CCSE) Training', query: 'What is covered in the EC-Council Cloud Security Engineer (CCSE) training?' },
  { label: '🔐 DevSecOps & Cryptography', query: 'What are the DevSecOps and encryption training tracks?' },
  { label: '🏫 Training & Labs for Colleges', query: 'How does Hackup partner with colleges for cyber labs and workshops?' },
  { label: '📥 Syllabus, Fees & Admissions', query: 'How do I get the course syllabus and speak with a training advisor?' }
];

export const CyberChatbot: React.FC<CyberChatbotProps> = ({
  onOpenAudit,
  onBookDemo
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isServices = location.pathname.startsWith('/services');
  const isCourses = location.pathname.startsWith('/courses');
  const isCorporate = !isServices && !isCourses;

  // Determine active prompt suggestions based on route
  const activePrompts = isServices 
    ? SERVICES_PROMPTS 
    : isCourses 
    ? COURSES_PROMPTS 
    : CORPORATE_PROMPTS;

  const getGreetingMessage = (path: string): Message => {
    if (path.startsWith('/services')) {
      return {
        id: 'welcome-services',
        sender: 'bot',
        text: 'Greetings! I am Aegis, Hackup Technology\'s AI Cyber Assistant. How can I assist you with our Enterprise VAPT, 24/7 Managed SOC, or Compliance Audits today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Request Scoped VAPT', actionType: 'audit', payload: 'Enterprise VAPT' },
          { label: 'Call 24/7 Hotline', actionType: 'call', payload: '+919362012339' },
        ]
      };
    }
    if (path.startsWith('/courses')) {
      return {
        id: 'welcome-courses',
        sender: 'bot',
        text: 'Greetings! I am Aegis, Hackup Technology\'s AI Cyber Assistant. How can I help you explore our EC-Council Training programs, hands-on Cyber Labs, or Industrial Internships today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Explore CEH v13 AI', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
          { label: 'Apply for Internship', actionType: 'internship' },
        ]
      };
    }
    return {
      id: 'welcome-corporate',
      sender: 'bot',
      text: 'Greetings! I am Aegis, Hackup Technology\'s official AI Cyber Advisor. How can I assist you with our company overview, founder profile, enterprise security services, or training programs today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'Enterprise Security', actionType: 'audit', payload: 'Enterprise VAPT' },
        { label: 'Training & Certifications', actionType: 'demo', payload: 'CEH v13' },
      ]
    };
  };

  const [messages, setMessages] = useState<Message[]>([
    getGreetingMessage(location.pathname)
  ]);

  // Update initial greeting when user navigates to a new section, if they haven't started chatting yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [getGreetingMessage(location.pathname)];
      }
      return prev;
    });
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isMinimized]);

  // ----------------------------------------------------------------------
  // COMPREHENSIVE KNOWLEDGE ENGINE
  // ----------------------------------------------------------------------
  const generateResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. GREETINGS & CASUAL INTERACTION
    if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|greetings)\b/i.test(q)) {
      if (isServices) {
        return {
          text: 'Hello! I am Aegis, Hackup Technology\'s AI Cyber Assistant. I am here to help you scope penetration testing (VAPT), deploy 24/7 Managed SOC operations, or evaluate compliance for your organization. How can I assist you today?',
          actions: [
            { label: 'Request Scoped VAPT', actionType: 'audit', payload: 'Enterprise VAPT' },
            { label: 'Managed SOC Hotline', actionType: 'call', payload: '+919362012339' }
          ]
        };
      }
      if (isCourses) {
        return {
          text: 'Hello! I am Aegis, Hackup Technology\'s AI Cyber Assistant. I can help you choose the right EC-Council certification, arrange access to practical cyber range labs, or guide you through internship admissions. What would you like to explore?',
          actions: [
            { label: 'Explore CEH v13', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
            { label: 'Cyber Internship Details', actionType: 'internship' }
          ]
        };
      }
      return {
        text: 'Hello! I am Aegis, Hackup Technology\'s AI Cyber Assistant. I can assist you with our enterprise security solutions, accredited training programs, patent-backed IP, or connect you directly with our leadership team. What can I help you with today?',
        actions: [
          { label: 'Enterprise Cybersecurity', actionType: 'audit', payload: 'Enterprise VAPT' },
          { label: 'Training & Academy', actionType: 'demo', payload: 'CEH v13' },
          { label: 'Founder & Leadership', actionType: 'link', payload: '/founder-patents' }
        ]
      };
    }

    // 2. FOUNDER BIO & COMPLETE DETAILS (Dr. Dinesh Paranthagan)
    if (
      q.includes('dinesh') ||
      q.includes('founder') ||
      q.includes('ceo') ||
      q.includes('paranthagan') ||
      q.includes('leadership') ||
      q.includes('who started') ||
      q.includes('who is the head')
    ) {
      return {
        text: 'Executive Leadership Profile: Dr. Dinesh Paranthagan (M.C.A., Ph.D.)\n\n' +
              'Role & Designation: Founder and Chief Executive Officer of Hackup Technology Pvt Ltd.\n\n' +
              'Industry Experience: Over 13 years of offensive cybersecurity, VAPT, and digital forensics expertise as an active ethical hacker.\n\n' +
              'State & National Positions:\n' +
              '• Secretary General – TANCCAO (Tamil Nadu Cyber Crime Action Organization).\n' +
              '• Technical Consultant – Tamil Nadu Police Cyber Crime Department, assisting in high-profile cryptocurrency tracing, ransomware triage, and Section 65B judicial cyber evidence preservation.\n' +
              '• National Mentor – Smart India Hackathon (SIH) under the Ministry of Education & AICTE.\n' +
              '• Board of Studies (BOS) Member across 8 universities, modernizing cyber defense curricula.\n' +
              '• Dual Patent Holder for sovereign Indian AI defense and offensive reverse engineering architectures.\n\n' +
              'Track Record: Personally trained over 1,00,000 students and delivered 2,100+ commercial enterprise audits.\n\n' +
              'Direct Email: dinesh@hackuptechnology.com\n' +
              'Office: Ganapathy, Coimbatore HQ.',
        actions: [
          { label: 'Book Executive Advisory', actionType: 'audit', payload: 'Executive Consultation with Dr. Dinesh Paranthagan' },
          { label: 'Call Founder Desk', actionType: 'call', payload: '+919362012339' },
          { label: 'Email Dr. Dinesh', actionType: 'email', payload: 'dinesh@hackuptechnology.com' }
        ]
      };
    }

    // 3. INTELLECTUAL PROPERTY & DUAL PATENTS
    if (
      q.includes('patent') || 
      q.includes('intellectual property') || 
      q.includes('in-pat') || 
      q.includes('neural') ||
      q.includes('reverse engineering tool') ||
      q.includes('ai firewall')
    ) {
      return {
        text: 'Proprietary Intellectual Property & Published Patents:\n\n' +
              'Hackup Technology holds 2 published Indian cybersecurity patents developed under the leadership of Dr. Dinesh Paranthagan:\n\n' +
              '1. AI-Based Next-Gen Firewall Security System (IN-PAT-2024-AI-FW8910, Granted 2024):\n' +
              'Autonomous real-time anomaly detection engine with sub-millisecond classification latency. Inspects multi-terabit network telemetry and filters encrypted C2 botnet traffic without SSL termination latency.\n\n' +
              '2. Automated Pentesting & Binary Reverse Engineering Suite (IN-PAT-2023-RE-VAPT4421, Granted 2023):\n' +
              'Automated multi-stage vulnerability chaining linking low-tier leaks to verified remote code execution, deep memory layout profiling, zero false-positive exploit validation, and automated Section 65B court evidence generation.',
        actions: [
          { label: 'Consult on Patented AI Defense', actionType: 'audit', payload: 'Patented AI Defense Inquiry' },
          { label: 'Call Engineering Team', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 4. COMPANY OVERVIEW, STATS, RATINGS & CREDENTIALS
    if (
      q.includes('about company') || 
      q.includes('about hackup') || 
      q.includes('company overview') || 
      q.includes('track record') || 
      q.includes('history') || 
      q.includes('when founded') ||
      q.includes('rating') ||
      q.includes('reviews') ||
      q.includes('credibility')
    ) {
      return {
        text: 'About Hackup Technology Pvt Ltd:\n\n' +
              'Headquarters: Ganapathy, Coimbatore, Tamil Nadu, India.\n' +
              'Founded: 2013 (13+ years of continuous cybersecurity leadership).\n' +
              'Accreditation: Official EC-Council Accredited Training Center (ATC).\n\n' +
              'Verified Enterprise Track Record:\n' +
              '• 1,00,000+ Students & Professionals Trained.\n' +
              '• 2,100+ Enterprise Security Audits Delivered.\n' +
              '• 54+ Academic Partner Institutions (VIT, PSG Tech, SRM, MCC, Bannari Amman, etc.).\n' +
              '• 7 MNC Corporate Partner Collaborations.\n' +
              '• 4.9 Star Rating across 3,398+ verified Google reviews.\n' +
              '• Host of DEFCON Coimbatore Chapter (#DC91422).\n' +
              '• 2 Published Indian Cybersecurity Patents.',
        actions: [
          { label: 'Explore Enterprise Services', actionType: 'audit', payload: 'Enterprise Security' },
          { label: 'Explore Training Programs', actionType: 'demo', payload: 'CEH v13' },
          { label: 'Contact Coimbatore HQ', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 5. EMERGENCY BREACH, ACTIVE INCIDENT, DFIR
    if (
      q.includes('emergency') || 
      q.includes('incident') || 
      q.includes('breach') || 
      q.includes('hacked') || 
      q.includes('ransomware') || 
      q.includes('dfir') || 
      q.includes('forensic') ||
      q.includes('compromised')
    ) {
      return {
        text: '24/7 Digital Forensics & Emergency Incident Response (DFIR):\n\n' +
              'If your organization is experiencing an active intrusion, data leak, or ransomware attack, our certified DFIR response team is on standby 24/7:\n\n' +
              '• Immediate Threat Containment: Isolating compromised endpoints, stopping lateral movement, and severing C2 channels.\n' +
              '• Live RAM & Disk Forensics: Bitstream disk imaging, memory forensics, and artifact timeline reconstruction.\n' +
              '• Legal Evidence Preservation: Court-admissible Section 65B Indian Evidence Act certification.\n' +
              '• Regulatory Compliance: Mandatory CERT-In cyber incident reporting assistance within statutory 6-hour windows.\n\n' +
              'Direct Emergency Incident Hotline: +91 93620 12339 / +91 96262 15976.',
        actions: [
          { label: 'Call 24/7 Hotline Now', actionType: 'call', payload: '+919362012339' },
          { label: 'Request Emergency Audit', actionType: 'audit', payload: 'Emergency Incident Containment' }
        ]
      };
    }

    // 6. VAPT & PENETRATION TESTING
    if (
      q.includes('vapt') || 
      q.includes('penetration testing') || 
      q.includes('pen test') || 
      q.includes('vulnerability assessment') || 
      q.includes('web audit') || 
      q.includes('mobile audit') ||
      q.includes('api audit')
    ) {
      return {
        text: 'High-Assurance Enterprise VAPT Services:\n\n' +
              'Hackup Technology provides zero-downtime penetration testing across all digital assets:\n\n' +
              '• Web Application VAPT: OWASP Top 10, complex business logic flaws, zero-day vulnerabilities.\n' +
              '• Mobile Security: iOS & Android binary deconstruction, jailbreak/root bypass detection, local storage analysis.\n' +
              '• Cloud & Container Infrastructure: AWS, Azure, GCP misconfigurations, Kubernetes and Docker cluster hardening.\n' +
              '• API Security: REST, GraphQL, SOAP, JWT and OAuth authorization bypass testing.\n' +
              '• Deliverables: Executive risk scorecards, detailed technical remediation guides, developer walkthroughs, and verified Safe-to-Host certification upon retesting.',
        actions: [
          { label: 'Request Scoped VAPT Proposal', actionType: 'audit', payload: 'Enterprise VAPT Audit' },
          { label: 'Speak with Lead Auditor', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 7. MANAGED SOC & SIEM OPERATIONS
    if (
      q.includes('soc') || 
      q.includes('siem') || 
      q.includes('monitoring') || 
      q.includes('wazuh') || 
      q.includes('splunk') || 
      q.includes('threat hunting') ||
      q.includes('managed security')
    ) {
      return {
        text: '24/7 Managed SOC & SIEM Operations:\n\n' +
              'Continuous real-time cyber defense for enterprise perimeters:\n\n' +
              '• 24/7 Threat Monitoring: Multi-source event ingestion across firewalls, endpoints, servers, and cloud tenants.\n' +
              '• SIEM & AI Analytics: Telemetry correlation using Splunk, Wazuh, and proprietary behavioral anomaly algorithms.\n' +
              '• Proactive Threat Hunting: MITRE ATT&CK framework mapping to identify hidden adversaries before data exfiltration.\n' +
              '• Rapid Incident Isolation: Automated playbooks (SOAR) backed by dedicated Tier-1 to Tier-3 incident response engineers.',
        actions: [
          { label: 'Request SOC Consultation', actionType: 'audit', payload: 'Managed SOC Deployment' },
          { label: 'Call Operations Center', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 8. COMPLIANCE (ISO 27001, DPDP ACT, SOC 2)
    if (
      q.includes('compliance') || 
      q.includes('iso') || 
      q.includes('27001') || 
      q.includes('dpdp') || 
      q.includes('data privacy') || 
      q.includes('soc 2') || 
      q.includes('grc')
    ) {
      return {
        text: 'Governance, Risk & Compliance (GRC) Consulting:\n\n' +
              'Guaranteed audit readiness and regulatory alignment for Indian and international frameworks:\n\n' +
              '• ISO 27001:2022: ISMS architecture, gap assessments, risk registers, internal audits, and certification support.\n' +
              '• Indian DPDP Act 2023: Data fiduciary compliance, consent managers, data mapping, and cross-border transfer policies.\n' +
              '• SOC 2 Type I & Type II: Trust Services Criteria readiness, continuous compliance monitoring, and evidence gathering.\n' +
              '• CERT-In & RBI Guidelines: Cybersecurity directives for banking, fintech, and digital enterprise infrastructure.',
        actions: [
          { label: 'Schedule Compliance Scoping', actionType: 'audit', payload: 'ISO 27001 and DPDP Compliance' },
          { label: 'Call Compliance Advisory', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 9. RED TEAMING & ADVERSARY SIMULATION
    if (
      q.includes('red team') || 
      q.includes('adversary') || 
      q.includes('simulation') || 
      q.includes('social engineering') || 
      q.includes('phishing simulation')
    ) {
      return {
        text: 'Red Team & Advanced Adversary Simulation:\n\n' +
              'Full-scope unannounced attack drills mimicking sophisticated APT adversaries:\n\n' +
              '• Multi-Vector Intrusions: Combining external network exploitation, credential stuffing, and supply chain pivoting.\n' +
              '• Social Engineering: Targeted spear-phishing, credential harvesting, voice pretexting, and physical security testing.\n' +
              '• Evasion & Lateral Movement: Bypassing EDR/XDR controls and extracting crown-jewel database credentials.\n' +
              '• Defensive Blue Team Debrief: Actionable threat matrix and hardening blueprint.',
        actions: [
          { label: 'Request Red Team Scoping', actionType: 'audit', payload: 'Red Team Adversary Simulation' }
        ]
      };
    }

    // 10. CEH v13 (CERTIFIED ETHICAL HACKER) & EC-COUNCIL TRAINING
    if (
      q.includes('ceh') || 
      q.includes('ethical hack') || 
      q.includes('ec-council') || 
      q.includes('certification') || 
      q.includes('course') || 
      q.includes('training')
    ) {
      return {
        text: 'Official EC-Council Cybersecurity Training Programs:\n\n' +
              'Hackup Technology is an authorized EC-Council Accredited Training Center (ATC). Every program includes authentic Aspen digital courseware, international certification exam vouchers, and practical lab access:\n\n' +
              '1. Certified Ethical Hacker (CEH v13 AI-Powered): Flagship 60-Hour offensive security program covering 20 domains from footprinting to cloud hacking and AI-assisted exploitation.\n' +
              '2. Certified Cloud Security Engineer (CCSE): 45-Hour deep-dive across AWS, Azure, GCP, and Kubernetes defense.\n' +
              '3. Certified DevSecOps Engineer (ECDE): 40-Hour curriculum integrating automated security into CI/CD pipelines.\n' +
              '4. Certified Encryption Specialist (ECES): 35-Hour applied cryptography and PKI program.\n\n' +
              'Flexible Modes: In-person physical sessions at our Ganapathy, Coimbatore Cyber Lab or 100% live instructor-led online batches with cloud virtual labs.',
        actions: [
          { label: 'Download CEH Syllabus', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
          { label: 'Talk to Training Advisor', actionType: 'call', payload: '+919597775522' }
        ]
      };
    }

    // 11. CYBER RANGE & PRACTICAL LABS
    if (
      q.includes('lab') || 
      q.includes('range') || 
      q.includes('sandbox') || 
      q.includes('practical') || 
      q.includes('hands-on') || 
      q.includes('hands on')
    ) {
      return {
        text: 'Coimbatore Cyber Range & Practical Sandbox Labs:\n\n' +
              'Mastery requires real-world execution. Over 60% of our training time is spent executing hands-on attacks in simulated environments:\n\n' +
              '• Physical Coimbatore Cyber Range: 60+ workstation dedicated cyber warfare lab in Ganapathy.\n' +
              '• Web-Accessible Cloud Sandboxes: 24/7 remote lab access for practice anytime, anywhere.\n' +
              '• 200+ Live Attack Scenarios: Active Directory forest compromise, buffer overflows, kernel exploits, wireless pivoting, and forensic triage.\n' +
              '• Real practitioner mentorship from active red teamers and forensics investigators.',
        actions: [
          { label: 'Book Cyber Lab Tour', actionType: 'demo', payload: 'Coimbatore Cyber Lab Visit' },
          { label: 'Explore Lab Scenarios', actionType: 'demo', payload: 'Cyber Range Labs' }
        ]
      };
    }

    // 12. CYBERSECURITY INTERNSHIPS
    if (
      q.includes('intern') || 
      q.includes('student') || 
      q.includes('fresher') || 
      q.includes('stipend') || 
      q.includes('college project')
    ) {
      return {
        text: 'Cybersecurity Industrial Internship Program:\n\n' +
              'Designed for engineering students, BCA/MCA graduates, and freshers to acquire verified industry work experience:\n\n' +
              '• Tracks: 1-Month, 3-Month, and 6-Month intensive options (Offline at Coimbatore Lab or Live Online).\n' +
              '• Practical Scope: Vulnerability assessment, bug hunting methodologies, incident response simulation, and documentation.\n' +
              '• Career Outcomes: Verified industrial internship certificate, LinkedIn recommendation from Dr. Dinesh Paranthagan, placement referrals to 40+ hiring partners, and stipend eligibility for top performers.',
        actions: [
          { label: 'Apply for Internship', actionType: 'internship' },
          { label: 'Talk to Academic Coordinator', actionType: 'call', payload: '+919597775522' }
        ]
      };
    }

    // 13. COLLEGES, MoUs & ACADEMIC WORKSHOPS
    if (
      q.includes('college') || 
      q.includes('university') || 
      q.includes('mou') || 
      q.includes('coe') || 
      q.includes('workshop') || 
      q.includes('fdp') || 
      q.includes('faculty') || 
      q.includes('curriculum')
    ) {
      return {
        text: 'Collegiate MoUs, Cyber CoE & Academic Partnerships:\n\n' +
              'Hackup Technology partners with 54+ premier engineering colleges and universities across Tamil Nadu (including VIT, PSG Tech, SRM, MCC, and SREC):\n\n' +
              '• Campus Cyber Center of Excellence (CoE): Setup of dedicated on-campus cyber labs and range infrastructure.\n' +
              '• Faculty Development Programs (FDPs): Advanced technical training for professors on offensive security, DFIR, and modern standards.\n' +
              '• Student Bootcamps & CTFs: Hands-on ethical hacking hackathons and national SIH mentorship.\n' +
              '• Board of Studies (BOS) Advisory: Modernizing degree curricula with industrial cybersecurity credits.',
        actions: [
          { label: 'Request College MoU Proposal', actionType: 'audit', payload: 'College Cyber CoE & MoU' },
          { label: 'Call Academic Director', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // 14. DEFCON & COMMUNITY
    if (
      q.includes('defcon') || 
      q.includes('dc91422') || 
      q.includes('community') || 
      q.includes('meetup') || 
      q.includes('ctf')
    ) {
      return {
        text: 'DEFCON Coimbatore Chapter (#DC91422):\n\n' +
              'Hackup Technology is the proud host of the official DEFCON Coimbatore Chapter:\n\n' +
              '• Monthly Research Meetups: Open technical talks, exploit deconstructions, and hardware hacking demonstrations.\n' +
              '• Flagship DEFCON Coimbatore 2026: Annual gathering of security professionals, bug bounty hunters, students, and enthusiasts.\n' +
              '• Community CTFs: Free, open-to-all capture the flag challenges with mentorship and hardware prizes.\n' +
              '• Non-profit, open knowledge sharing for passionate ethical hackers.',
        actions: [
          { label: 'View DEFCON Info', actionType: 'link', payload: '/community' }
        ]
      };
    }

    // 15. LOCATION, ADDRESS & PHYSICAL VISIT
    if (
      q.includes('location') || 
      q.includes('address') || 
      q.includes('where is') || 
      q.includes('headquarters') || 
      q.includes('office') || 
      q.includes('ganapathy') || 
      q.includes('coimbatore') ||
      q.includes('timings') ||
      q.includes('hours')
    ) {
      return {
        text: 'Hackup Technology Headquarters & Center Location:\n\n' +
              'Address: No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006, Tamil Nadu, India.\n' +
              'Landmark: Near Ganapathy Bus Stop / Textool area.\n\n' +
              'Contact Numbers: +91 93620 12339 / +91 96262 15976\n' +
              'Training Desk: +91 95977 75522\n' +
              'Official Email: info@hackuptechnology.com\n\n' +
              'Working Hours: Monday to Saturday: 9:00 AM – 7:30 PM.\n' +
              'Emergency DFIR Hotline: Active 24 Hours / 7 Days a week.',
        actions: [
          { label: 'Call Office Now', actionType: 'call', payload: '+919362012339' },
          { label: 'Email info@hackuptechnology.com', actionType: 'email', payload: 'info@hackuptechnology.com' }
        ]
      };
    }

    // 16. CONTACT & ENQUIRY DETAILS
    if (
      q.includes('contact') || 
      q.includes('phone') || 
      q.includes('number') || 
      q.includes('email') || 
      q.includes('whatsapp') || 
      q.includes('call') ||
      q.includes('reach') ||
      q.includes('enquiry')
    ) {
      return {
        text: 'Hackup Technology Official Contact Directory:\n\n' +
              '• Primary Executive & Audit Desk: +91 93620 12339\n' +
              '• 24/7 Incident Emergency Line: +91 96262 15976\n' +
              '• Academy & Training Admissions: +91 95977 75522\n' +
              '• General Inquiries: info@hackuptechnology.com\n' +
              '• Founder & CEO Desk: dinesh@hackuptechnology.com\n' +
              '• Office Location: No.4, First Street, Sri Venkatesapuram, Ganapathy, Coimbatore - 641006, Tamil Nadu.\n\n' +
              'Feel free to give us a call or send an email; our security advisors are ready to assist you.',
        actions: [
          { label: 'Call +91 93620 12339', actionType: 'call', payload: '+919362012339' },
          { label: 'Call Training +91 95977 75522', actionType: 'call', payload: '+919597775522' },
          { label: 'Email info@hackuptechnology.com', actionType: 'email', payload: 'info@hackuptechnology.com' }
        ]
      };
    }

    // 17. POLITE FALLBACK WHEN AN ANSWER IS UNKNOWN
    return {
      text: 'I apologize, but I do not have verified information regarding that specific inquiry in my knowledge base.\n\n' +
            'To ensure you receive accurate and up-to-date details, please contact our expert team directly:\n\n' +
            '• Phone: +91 93620 12339 / +91 96262 15976\n' +
            '• Training Desk: +91 95977 75522\n' +
            '• Email: info@hackuptechnology.com\n' +
            '• Office: Ganapathy, Coimbatore HQ (Mon - Sat, 9:00 AM - 7:30 PM)\n\n' +
            'Would you like to speak directly with an advisor or submit a consultation request?',
      actions: [
        { label: 'Call +91 93620 12339', actionType: 'call', payload: '+919362012339' },
        { label: 'Request Consultation', actionType: 'audit', payload: 'General Consultation Inquiry' },
        { label: 'Email Our Team', actionType: 'email', payload: 'info@hackuptechnology.com' }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.actionType === 'audit') {
      if (onOpenAudit) onOpenAudit(action.payload || 'Enterprise VAPT');
    } else if (action.actionType === 'demo') {
      if (onBookDemo) onBookDemo(action.payload || 'CEH v13');
    } else if (action.actionType === 'call') {
      window.location.href = `tel:${action.payload || '+919362012339'}`;
    } else if (action.actionType === 'email') {
      window.location.href = `mailto:${action.payload || 'info@hackuptechnology.com'}`;
    } else if (action.actionType === 'internship') {
      if (onBookDemo) onBookDemo('Cybersecurity Internship Program');
    } else if (action.actionType === 'link' && action.payload) {
      window.location.href = action.payload;
    }
  };

  const resetChat = () => {
    setMessages([getGreetingMessage(location.pathname)]);
  };

  // ----------------------------------------------------------------------
  // CLEAN, PREMIUM ASTERISK-FREE TEXT FORMATTER
  // ----------------------------------------------------------------------
  const renderCleanMessage = (rawText: string, isBot: boolean) => {
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
      const lineContent = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : line;

      // Extract **bold** tokens and remove any asterisks entirely
      const parts: React.ReactNode[] = [];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(lineContent)) !== null) {
        if (match.index > lastIndex) {
          parts.push(lineContent.substring(lastIndex, match.index).replace(/\*/g, ''));
        }
        parts.push(
          <strong 
            key={`${lineIdx}-${match.index}`} 
            className={isBot ? "font-bold text-slate-900" : "font-bold text-white"}
          >
            {match[1].replace(/\*/g, '')}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < lineContent.length) {
        parts.push(lineContent.substring(lastIndex).replace(/\*/g, ''));
      }

      const finalContent = parts.length > 0 ? parts : lineContent.replace(/\*/g, '');

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start space-x-2 my-1">
            <span 
              className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                isBot ? 'bg-[#881337]' : 'bg-white/80'
              }`} 
            />
            <span className="flex-1 leading-relaxed">{finalContent}</span>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-0.5 leading-relaxed">
          {finalContent}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. FLOATING CHAT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Notification Ping Badge when closed */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#881337] text-[9px] font-mono font-bold text-white items-center justify-center shadow-sm">
                1
              </span>
            </span>
          )}

          <button
            onClick={() => {
              setIsOpen((prev) => !prev);
              setIsMinimized(false);
            }}
            className="group flex items-center space-x-2.5 px-3.5 py-3 rounded-2xl bg-white border border-rose-200 text-slate-900 shadow-xl hover:border-[#881337] hover:shadow-2xl transition-all cursor-pointer backdrop-blur-xl"
            aria-label="Open Hackup AI Cyber Assistant"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#BE123C] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-white" />
            </div>
            
            <div className="hidden sm:block text-left">
              <div className="text-xs font-mono font-bold text-slate-900 group-hover:text-[#881337] transition-colors flex items-center space-x-1.5">
                <span>Hackup AI</span>
                <Sparkles className="w-3 h-3 text-[#881337]" />
              </div>
              <div className="text-[9px] font-mono text-emerald-600 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online • 24/7 Advisor</span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>

      {/* 2. CHAT DRAWER / WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '580px'
            }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[430px] rounded-3xl bg-white border-2 border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-2xl transition-all ${
              isMinimized ? 'h-auto' : 'h-[580px]'
            }`}
          >
            
            {/* Header */}
            <div className="bg-[#881337] border-b border-[#5B0E1B] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-rose-200 p-0.5 shadow-md">
                  <img
                    src="/images/hackup_logo.png"
                    alt="Hackup Technology Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                <div>
                  <div className="font-serif-header font-bold text-sm tracking-wide flex items-center space-x-1.5 text-white">
                    <span>Aegis Cyber Assistant</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-900/60 text-rose-200 border border-rose-400/40 font-mono font-bold">
                      AI
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-rose-100/90">
                    Official Hackup Technology Advisor
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-slate-300">
                <button
                  onClick={resetChat}
                  title="Reset Conversation"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized((prev) => !prev)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body (Hidden if minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-xs font-sans">
                  
                  {messages.map((msg) => {
                    const isBot = msg.sender === 'bot';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1.5`}
                      >
                        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 px-1">
                          <span>{isBot ? 'Aegis AI' : 'You'}</span>
                          <span>&bull;</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            isBot
                              ? 'bg-white text-slate-800 border border-rose-100/80 shadow-sm'
                              : 'bg-[#881337] text-white font-medium shadow-md'
                          }`}
                        >
                          {renderCleanMessage(msg.text, isBot)}
                        </div>

                        {/* Action buttons inside message */}
                        {isBot && msg.actions && msg.actions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1 max-w-[92%]">
                            {msg.actions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(act)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 hover:border-rose-400 font-mono text-[11px] font-bold shadow-xs transition-all cursor-pointer hover:scale-101"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-2 p-3 rounded-2xl bg-white border border-rose-100/80 shadow-sm w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Context-Aware Quick Suggestion Chips */}
                <div className="px-3 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
                  {activePrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt.query)}
                      className="whitespace-nowrap px-2.5 py-1.5 rounded-full bg-white hover:bg-rose-50 hover:text-[#881337] hover:border-rose-300 text-[10px] font-mono text-slate-700 border border-slate-200 transition-colors shrink-0 cursor-pointer shadow-2xs font-medium"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isServices 
                        ? "Ask about VAPT audits, 24/7 SOC, ISO 27001, DPDP Act..." 
                        : isCourses 
                        ? "Ask about CEH v13, cloud security, cyber labs, fees..." 
                        : "Ask about Hackup, Dr. Dinesh Paranthagan, patents, services..."
                    }
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#881337] transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-xl bg-[#881337] hover:bg-[#6e0f2c] text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-md"
                    title="Send Message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
