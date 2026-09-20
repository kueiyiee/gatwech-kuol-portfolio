export type SocialLink = {
  label: string
  url: string
  enabled: boolean
  ariaLabel: string
}

export const profile = {
  name: 'Gatwech Kuol Nyoak',
  title: 'Accounting & Finance Professional',
  email: 'kuolnyok@gmail.com',
  phone: '+211917526617',
  location: 'Nyirol County, Jonglei State, South Sudan',
  summary:
    'Results-focused finance professional seeking opportunities in accounting, finance assistant, accounts assistant, finance & administration, and NGO/humanitarian finance. Able to support daily finance operations, maintain accurate records, check supporting documents, assist with reconciliations, and contribute to timely financial reporting while working professionally under pressure.',
  intro:
    'Accounting and Finance professional with a Bachelor of Arts in Accounting and Finance and approximately two years of practical Finance Assistant experience with MSF Spain. Experienced in supporting financial documentation, transaction processing, payment and cash processes, record keeping, reconciliation and reporting in line with internal procedures.',
  resumeUrl: 'https://drive.google.com/file/d/1T18Hojoxlcw8O5YkUlbN_hBJK9l2hS4J/view?usp=drivesdk',
  socialLinks: [
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/share/17jmtbbSMQ/',
      enabled: true,
      ariaLabel: 'Visit Gatwech Kuol Nyoak on Facebook',
    },
  ] as SocialLink[],
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Focus', href: '#focus' },
    { label: 'Contact', href: '#contact' },
  ],
  experience: [
    {
      organization: 'Médecins Sans Frontières (MSF) Spain',
      role: 'Finance Assistant',
      period: '2023–2025',
      location: 'Humanitarian / NGO environment',
      details: [
        'Supported day-to-day finance and accounting activities in a humanitarian/NGO environment.',
        'Assisted with processing and checking financial transactions and supporting documentation.',
        'Maintained organized financial records and filing systems for audit and reference purposes.',
        'Supported cash, payment and expense-related processes in line with organizational procedures.',
        'Assisted with account reconciliation and identification of discrepancies for follow-up and correction.',
        'Supported preparation and review of financial information and routine reports.',
        'Applied internal controls, confidentiality, accuracy and accountability when handling financial information.',
        'Worked collaboratively with programme, logistics, administration and finance colleagues in a multicultural humanitarian setting.',
      ],
      emphasis: true,
    },
    {
      organization: 'Humanitarian Development Consortium (HDC)',
      role: 'Protection Monitoring',
      period: '2026',
      location: 'Context provided',
      details: [
        'Conducted field-level protection monitoring and observation.',
        'Documented protection concerns, risks and incidents accurately and confidentially.',
        'Engaged with communities and key informants to gather relevant information.',
        'Identified and analyzed emerging protection trends and needs.',
        'Supported reporting, referrals, advocacy and humanitarian response activities.',
        'Applied confidentiality, informed consent, do-no-harm and respect for affected communities.',
      ],
      emphasis: false,
    },
  ],
  education: [
    {
      school: 'Gambella University',
      degree: 'Bachelor of Arts — Accounting and Finance',
      period: '2019–2023',
    },
    {
      school: 'DICAC / RRAD Pugnido Secondary and Preparatory School',
      degree: 'Ethiopia Secondary School Leaving Certificate Examination (ESSLCE)',
      period: '2016–2018',
    },
    {
      school: 'RRS number 2, Pugnido Primary School',
      degree: 'Primary School Leaving Certificate Examination, Pugnido 1 Refugees Camp',
      period: '2006–2015',
    },
  ],
  skills: [
    {
      title: 'Finance Operations',
      items: ['Financial transaction processing', 'Accounts payable support', 'Expense support', 'Cash management', 'Payment support', 'Financial documentation'],
    },
    {
      title: 'Accounting & Controls',
      items: ['Account reconciliation', 'Internal controls', 'Compliance', 'Audit documentation', 'Supporting schedules', 'Expenditure tracking'],
    },
    {
      title: 'Reporting',
      items: ['Financial reporting support', 'Financial information review', 'Record management', 'Data accuracy', 'Documentation'],
    },
    {
      title: 'Digital & Administrative',
      items: ['Microsoft Office', 'Spreadsheet-based data entry', 'Digital record management', 'Filing systems', 'Data entry', 'Accuracy checking'],
    },
  ],
  values: [
    'Accuracy',
    'Integrity',
    'Accountability',
    'Confidentiality',
    'Teamwork',
    'Adaptability',
  ],
  languages: [
    { language: 'English', proficiency: 'Professional working proficiency' },
    { language: 'Nuer', proficiency: 'Native' },
    { language: 'Arabic', proficiency: 'Speaking only' },
  ],
  focusAreas: [
    'Accounting Operations',
    'Financial Administration',
    'Finance Support',
    'Financial Documentation',
    'Reconciliation Support',
    'Financial Reporting Support',
    'NGO/Humanitarian Finance',
  ],
  futureModules: [
    'Professional Projects',
    'Financial Analysis',
    'Excel Work',
    'Dashboards',
    'Reports',
    'Certificates',
    'Case Studies',
    'Articles',
    'Professional Documents',
    'Testimonials',
    'Resources',
  ],
  footerYear: new Date().getFullYear(),
}
