export interface TimelineMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  metric?: TimelineMetric;
  verified: boolean;
}

export interface GrowthChartPoint {
  year: number;
  value: number;
  displayValue?: string;
}

export interface GrowthChartSeries {
  title: string;
  points: GrowthChartPoint[];
}

export interface MissionVisionData {
  eyebrow: string;
  h2: string;
  mission: string;
  vision: string;
}

export interface FounderMessageData {
  eyebrow: string;
  h2: string;
  quote: string;
  attributionLine1: string;
  attributionLine2: string;
  photoPath: string;
  photoAlt: string;
  media: {
    label: string;
    items: string[];
    caption: string;
  };
  talks: {
    label: string;
    text: string;
  };
}

export const COMPANY_STORY = {
  eyebrow: 'OUR STORY',
  h2: 'The Story of Hackup Technology',
  intro: 'Hackup began when founder Dr. Dinesh Paranthagan, an ethical hacker and penetration tester, saw two gaps: businesses lacked affordable, practitioner-grade security, and colleges lacked hands-on cyber training. Hackup was built to close both.',
  closingMicrocopy: 'And we are still growing.',
  milestones: [
    {
      year: '2013',
      title: 'The beginning',
      description: 'Hackup Technology starts in Coimbatore as a cybersecurity training company with one goal: hands-on, practical security education.',
      verified: true,
    },
    {
      year: '2014',
      title: 'First college partnerships',
      description: 'Partnered with 10 colleges to bring ethical hacking and cybersecurity training to campuses.',
      metric: { value: 10, label: 'colleges' },
      verified: true,
    },
    {
      year: '2016',
      title: 'Launch of cybersecurity services',
      description: 'Started VAPT (vulnerability assessment and penetration testing) services and secured our first 10 business clients.',
      metric: { value: 10, label: 'business clients' },
      verified: true,
    },
    {
      year: '2018',
      title: '50 college MoUs',
      description: 'Signed MoUs with 50 colleges for cybersecurity training and academic collaboration.',
      metric: { value: 50, label: 'college MoUs' },
      verified: true,
    },
    {
      year: '2019',
      title: '50+ clients',
      description: 'Our services grew to more than 50 businesses.',
      metric: { value: 50, suffix: '+', label: 'business clients' },
      verified: true,
    },
    {
      year: '2020',
      title: '100 colleges',
      description: 'Reached 100 colleges with our training and institutional services.',
      metric: { value: 100, label: 'colleges' },
      verified: true,
    },
    {
      year: '2022',
      title: 'Academic leadership',
      description: 'Became a Board of Studies (BoS) and Academic Council member for 30+ colleges and 5+ universities, and served as a jury member for the Smart India Hackathon (SIH).',
      metric: { value: 30, suffix: '+', label: 'colleges on BoS / Academic Council' },
      verified: true,
    },
    {
      year: '2023',
      title: 'Nearly 50 AICTE FDPs',
      description: 'Ran nearly 50 AICTE Faculty Development Programmes in cybersecurity.',
      metric: { value: 50, prefix: '~', label: 'AICTE FDPs' },
      verified: true,
    },
    {
      year: '2024',
      title: 'Going global',
      description: 'Became a global partner.',
      verified: true,
    },
    {
      year: '2025',
      title: '2 lakh+ learners',
      description: 'Students trained passed 2,00,000.',
      // CLIENT TO CONFIRM
      metric: { value: 2, suffix: ' lakh+', label: 'learners trained' },
      verified: true,
    },
    {
      year: '2026',
      title: 'Full-spectrum security services',
      // CLIENT TO CONFIRM
      description: 'Expanded into SOC, VAPT and ISO audit services in association with TÜV SÜD.',
      verified: true,
    },
  ] as TimelineMilestone[],
  charts: {
    title: 'Growth at a glance',
    seriesA: {
      title: 'Colleges reached',
      points: [
        { year: 2014, value: 10 },
        { year: 2018, value: 50 },
        { year: 2020, value: 100 },
      ],
    } as GrowthChartSeries,
    seriesB: {
      title: 'Business clients',
      points: [
        { year: 2016, value: 10 },
        { year: 2019, value: 50, displayValue: '50+' },
      ],
    } as GrowthChartSeries,
  },
};

export const MISSION_VISION: MissionVisionData = {
  eyebrow: 'PURPOSE',
  h2: 'Our Mission & Vision',
  mission: "To make organisations cyber-resilient and to build India's next generation of skilled, ethical security professionals through practical, hands-on expertise.",
  vision: "To be India's most trusted practitioner-led cybersecurity and training partner, starting from Coimbatore and serving the world.",
};

export const FOUNDER_MESSAGE: FounderMessageData = {
  eyebrow: 'FROM THE FOUNDER',
  h2: 'A Message from Our Founder',
  quote: "Cybersecurity is not a product you buy once – it is an art you practise every day. At Hackup, we protect what you build and train the people who will protect tomorrow. Let's secure your future together.",
  attributionLine1: '– Dr. Dinesh Paranthagan',
  attributionLine2: 'Founder & CEO, Hackup Technology',
  photoPath: '/images/dr_dinesh_paranthagan.jpg',
  photoAlt: 'Dr. Dinesh Paranthagan, Founder & CEO, Hackup Technology',
  media: {
    label: 'In the Media',
    items: ['Dinamalar', 'Puthiya Thalaimurai', 'Thanthi TV'],
    caption: 'Cyber-safety and cybercrime awareness.',
  },
  talks: {
    label: 'Talks & Programmes',
    text: 'Resource person for college workshops, FDPs and school cyber-safety programmes.',
  },
};

export const WHATSAPP_CONFIG = {
  href: 'https://wa.me/919362012339?text=Hello%20Hackup%20Technology,%20I%20would%20like%20to%20enquire%20about%20cybersecurity%20services.',
  ariaLabel: 'Chat with Hackup Technology on WhatsApp',
};
