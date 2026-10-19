import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  FileText, 
  ExternalLink,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    actionType: 'audit' | 'demo' | 'call' | 'internship';
    payload?: string;
  }[];
}

interface CyberChatbotProps {
  onOpenAudit?: (serviceTitle?: string) => void;
  onBookDemo?: (courseTitle?: string) => void;
}

const INITIAL_PROMPTS = [
  { label: '🛡️ Enterprise VAPT Audit', query: 'Tell me about Enterprise VAPT and security audit services.' },
  { label: '🎓 CEH v13 & Academy', query: 'What courses and EC-Council certifications do you offer?' },
  { label: '🚨 Emergency Breach (24/7)', query: 'How do I report a security incident or breach to your DFIR team?' },
  { label: '💼 Cybersecurity Internship', query: 'How can I apply for the Cybersecurity Internship program?' },
  { label: '📍 Coimbatore Center & Contact', query: 'Where is your Coimbatore center located and what are your contact numbers?' },
  { label: '🏆 Founder Dinesh Kumar & Patents', query: 'Tell me about founder Dinesh Kumar and his patents.' },
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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Greetings! I am **Aegis**, Hackup Technology\'s AI Cyber Assistant. How can I assist you with our **Enterprise Cyber Defense** or **EC-Council Academy** today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'Request VAPT Audit', actionType: 'audit', payload: 'Enterprise VAPT' },
        { label: 'Explore CEH v13', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isMinimized]);

  const generateResponse = (userQuery: string): { text: string; actions?: Message['actions'] } => {
    const q = userQuery.toLowerCase();

    // Emergency or Incident
    if (q.includes('emergency') || q.includes('incident') || q.includes('breach') || q.includes('dfir') || q.includes('hacked')) {
      return {
        text: '🚨 **24/7 Digital Forensics & Incident Response (DFIR) Hotline**\n\nIf your organization has suffered a breach or active intrusion, our certified incident containment team is on standby 24/7.\n\n• **Direct Hotline:** +91 93620 12339 / +91 96262 15976\n• **Services:** Live ransomware triage, RAM & disk forensics, Section 65B legal evidence dossiers, CERT-In compliance filing.',
        actions: [
          { label: 'Call 24/7 Hotline Now', actionType: 'call', payload: '+919362012339' },
          { label: 'Request Emergency Audit', actionType: 'audit', payload: 'Emergency DFIR' }
        ]
      };
    }

    // Enterprise / VAPT / Audits
    if (q.includes('vapt') || q.includes('audit') || q.includes('enterprise') || q.includes('penetration') || q.includes('compliance') || q.includes('iso')) {
      return {
        text: '🛡️ **Hackup Enterprise Cybersecurity Solutions**\n\nWe provide high-assurance security engineering with zero business downtime:\n\n• **Full-Stack VAPT:** Web, iOS/Android mobile apps, APIs & Cloud infrastructure\n• **Red Teaming:** Adversary simulation & social engineering\n• **VMaaS:** Continuous attack surface risk scoring\n• **Compliance Readiness:** ISO 27001, SOC 2, and Indian DPDP Act 2023 attestation.',
        actions: [
          { label: 'Request Scoped VAPT Audit', actionType: 'audit', payload: 'Full-Stack VAPT' },
          { label: 'Call Enterprise Team', actionType: 'call', payload: '+919362012339' }
        ]
      };
    }

    // Academy / Courses / CEH
    if (q.includes('course') || q.includes('academy') || q.includes('ceh') || q.includes('ec-council') || q.includes('training') || q.includes('certif')) {
      return {
        text: '🎓 **Official EC-Council Accredited Training Center (ATC)**\n\nAll courses include genuine Aspen courseware, exam vouchers, and 100% practical lab hours on our Coimbatore Cyber Range:\n\n• **CEH v13 (AI-Powered):** Flagship ethical hacking curriculum\n• **CPENT:** Certified Penetration Testing Professional\n• **SOC Analyst:** Wazuh, Splunk SIEM & Threat Intel\n• **Modes:** Coimbatore Offline Lab + Live Interactive Online Batches.',
        actions: [
          { label: 'Download CEH Syllabus', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
          { label: 'Book Academy Counseling', actionType: 'demo', payload: 'Academy Advisory' }
        ]
      };
    }

    // Internship
    if (q.includes('intern') || q.includes('student') || q.includes('college') || q.includes('fresh') || q.includes('placement')) {
      return {
        text: '💼 **Hackup Cybersecurity Internship Program**\n\nDesigned for students and fresh graduates seeking hands-on industry exposure:\n\n• **Duration:** 1 Month to 6 Months (Online / Offline)\n• **Hands-on Focus:** Bug bounty methodologies, active lab exercises, vulnerability reporting\n• **Outcome:** Verified Certificate, LinkedIn recommendations, stipend eligibility for top performers, and placement referrals to 40+ hiring partners.',
        actions: [
          { label: 'Apply for Internship', actionType: 'internship' },
          { label: 'Explore Academy Courses', actionType: 'demo', payload: 'Internship Track' }
        ]
      };
    }

    // Founder / Patents / Dinesh Kumar
    if (q.includes('dinesh') || q.includes('founder') || q.includes('patent') || q.includes('ceo') || q.includes('leadership')) {
      return {
        text: '🏆 **Leadership & Intellectual Property**\n\n• **Founder & Chief Architect:** Mr. Dinesh Kumar\n• **Government Advisor:** Technical Consultant to Cyber Crime Police, Tamil Nadu\n• **Association:** General Secretary, TANCCAO (Tamil Nadu Cyber Crime Advocates Association)\n• **Issued Patents:**\n  1. Neural Traffic Anomaly Detection Hardware\n  2. Steganographic Zero-Day Exfiltration Defense Framework.',
        actions: [
          { label: 'Consult with Founder', actionType: 'audit', payload: 'Founder Executive Consultation' }
        ]
      };
    }

    // Location & Contact
    if (q.includes('contact') || q.includes('location') || q.includes('address') || q.includes('coimbatore') || q.includes('phone') || q.includes('email')) {
      return {
        text: '📍 **Hackup Technology Headquarters**\n\n• **Location:** Ganapathy, Coimbatore, Tamil Nadu, India\n• **Primary Phone:** +91 93620 12339\n• **Secondary Phone:** +91 96262 15976\n• **Official Email:** info@hackuptechnology.com\n• **Working Hours:** Mon - Sat: 9:00 AM - 7:00 PM (24/7 for DFIR Emergencies).',
        actions: [
          { label: 'Call Office Now', actionType: 'call', payload: '+919362012339' },
          { label: 'Book In-Person Visit', actionType: 'demo', payload: 'Campus Tour' }
        ]
      };
    }

    // Default Fallback
    return {
      text: 'Thank you for reaching out! I can assist you with:\n\n1. **Enterprise Cybersecurity Audits** (Web/Mobile/API VAPT, Cloud, Red Team)\n2. **EC-Council Certifications** (CEH v13, CPENT, SOC Analyst)\n3. **Cybersecurity Internship Programs**\n4. **24/7 Incident Breach Support**\n\nWhat would you like to explore next?',
      actions: [
        { label: 'Enterprise VAPT Audit', actionType: 'audit', payload: 'Enterprise VAPT' },
        { label: 'CEH v13 Certification', actionType: 'demo', payload: 'CEH v13' },
        { label: 'Call +91 93620 12339', actionType: 'call', payload: '+919362012339' }
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
    }, 600);
  };

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.actionType === 'audit') {
      if (onOpenAudit) onOpenAudit(action.payload || 'Enterprise VAPT');
    } else if (action.actionType === 'demo') {
      if (onBookDemo) onBookDemo(action.payload || 'CEH v13');
    } else if (action.actionType === 'call') {
      window.location.href = `tel:${action.payload || '+919362012339'}`;
    } else if (action.actionType === 'internship') {
      if (onBookDemo) onBookDemo('Cybersecurity Internship Program');
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Chat history cleared. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Request VAPT Audit', actionType: 'audit', payload: 'Enterprise VAPT' },
          { label: 'Explore CEH v13', actionType: 'demo', payload: 'CEH v13 AI-Powered' },
        ]
      }
    ]);
  };

  return (
    <>
      {/* 1. FLOATING CHAT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-20 sm:right-24 z-50">
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
              height: isMinimized ? 'auto' : '560px'
            }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[420px] rounded-3xl bg-white border-2 border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-2xl transition-all ${
              isMinimized ? 'h-auto' : 'h-[560px]'
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

              <div className="flex items-center space-x-1 text-slate-400">
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-xs font-sans">
                  
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
                          className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${
                            isBot
                              ? 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                              : 'bg-[#881337] text-white font-medium shadow-md'
                          }`}
                        >
                          {msg.text}
                        </div>

                        {/* Action buttons inside message */}
                        {isBot && msg.actions && msg.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1 max-w-[88%]">
                            {msg.actions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(act)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-200 hover:border-rose-400 font-mono text-[11px] font-bold shadow-sm transition-all cursor-pointer"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-3 h-3 ml-0.5" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200 w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#881337] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Chips */}
                <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto scrollbar-none flex gap-1.5 shrink-0">
                  {INITIAL_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt.query)}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 hover:text-[#881337] hover:border-rose-300 text-[10px] font-mono text-slate-700 border border-slate-200 transition-colors shrink-0 cursor-pointer shadow-2xs font-medium"
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
                    placeholder="Ask about VAPT, CEH v13, internships..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#881337] transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-xl bg-[#881337] hover:bg-[#5B0E1B] text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-md"
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
