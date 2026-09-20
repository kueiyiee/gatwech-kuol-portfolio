import {
  Archive,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarDays,
  ChartNoAxesCombined,
  CircleCheck,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  FileText,
  Files,
  FolderKanban,
  FolderOpen,
  FolderTree,
  GitBranch,
  GraduationCap,
  House,
  Keyboard,
  Languages,
  Layers3,
  ListChecks,
  LockKeyhole,
  Mail,
  MapPin,
  MoreHorizontal,
  Monitor,
  MonitorCog,
  Moon,
  Network,
  Phone,
  Receipt,
  ReceiptText,
  RefreshCw,
  ScanSearch,
  School,
  SearchCheck,
  Send,
  ShieldCheck,
  Sun,
  Table2,
  Target,
  UserRound,
  UsersRound,
  WalletCards,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { profile } from './data/profile'
import { siteConfig } from './config/site'
import { ResumeButton } from './components/ResumeButton'

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const educationTimeline = [
  {
    id: 1,
    institution: 'Gambella University',
    qualification: 'B.A. Accounting and Finance',
    period: '2019–2023',
    icon: GraduationCap,
    featured: true,
  },
  {
    id: 2,
    institution: 'DICAC / RRAD Pugnido Secondary and Preparatory School',
    qualification: 'ESSLCE',
    period: '2016–2018',
    icon: School,
    featured: false,
  },
  {
    id: 3,
    institution: 'RRS Number 2, Pugnido Primary School',
    qualification: 'Primary School Leaving Certificate Examination',
    period: '2006–2015',
    icon: BookOpen,
    featured: false,
  },
] as const

const capabilityCards = [
  {
    id: 'finance',
    number: '01',
    title: 'Finance Operations',
    label: 'Finance Operations',
    icon: WalletCards,
    description: 'Transaction, expense, payment, cash and documentation support.',
    items: [
      { label: 'Financial transaction processing', icon: ArrowLeftRight },
      { label: 'Accounts payable support', icon: ReceiptText },
      { label: 'Expense support', icon: Receipt },
      { label: 'Cash management', icon: Banknote },
      { label: 'Payment support', icon: CreditCard },
      { label: 'Financial documentation', icon: FileText },
    ],
  },
  {
    id: 'controls',
    number: '02',
    title: 'Accounting & Controls',
    label: 'Accounting & Controls',
    icon: ShieldCheck,
    description: 'Reconciliation, controls, compliance and audit documentation support.',
    items: [
      { label: 'Account reconciliation', icon: RefreshCw },
      { label: 'Internal controls', icon: ShieldCheck },
      { label: 'Compliance', icon: BadgeCheck },
      { label: 'Audit documentation', icon: ClipboardCheck },
      { label: 'Supporting schedules', icon: ListChecks },
      { label: 'Expenditure tracking', icon: ChartNoAxesCombined },
    ],
  },
  {
    id: 'reporting',
    number: '03',
    title: 'Reporting',
    label: 'Reporting',
    icon: FileBarChart,
    description: 'Reporting, information review, records and data accuracy support.',
    items: [
      { label: 'Financial reporting support', icon: FileBarChart },
      { label: 'Financial information review', icon: SearchCheck },
      { label: 'Record management', icon: Archive },
      { label: 'Data accuracy', icon: CircleCheck },
      { label: 'Documentation', icon: Files },
    ],
  },
  {
    id: 'digital',
    number: '04',
    title: 'Digital & Administrative',
    label: 'Digital & Administrative',
    icon: MonitorCog,
    description: 'Microsoft Office, data entry, records and filing support.',
    items: [
      { label: 'Microsoft Office', icon: Monitor },
      { label: 'Spreadsheet-based data entry', icon: Table2 },
      { label: 'Digital record management', icon: FolderKanban },
      { label: 'Filing systems', icon: FolderOpen },
      { label: 'Data entry', icon: Keyboard },
      { label: 'Accuracy checking', icon: ScanSearch },
    ],
  },
] as const

const experienceResponsibilityMatrix = [
  {
    step: '01',
    title: 'Transaction support',
    icon: ArrowLeftRight,
    description: 'Supported processing and checking of financial transactions and supporting documentation.',
  },
  {
    step: '02',
    title: 'Record management',
    icon: FileText,
    description: 'Maintained organized financial records and filing systems for audit and reference purposes.',
  },
  {
    step: '03',
    title: 'Cash & payments',
    icon: WalletCards,
    description: 'Supported cash, payment and expense-related processes in line with organizational procedures.',
  },
  {
    step: '04',
    title: 'Reconciliation',
    icon: RefreshCw,
    description: 'Assisted with account reconciliation and identification of discrepancies for follow-up and correction.',
  },
  {
    step: '05',
    title: 'Reporting',
    icon: FileBarChart,
    description: 'Supported preparation and review of financial information and routine reports.',
  },
  {
    step: '06',
    title: 'Control & accountability',
    icon: ShieldCheck,
    description: 'Applied internal controls, confidentiality, accuracy and accountability when handling financial information.',
  },
] as const

const focusModules = [
  {
    index: '01',
    title: 'Accounting Operations',
    description: 'Support for structured accounting activities and routine financial processes.',
    icon: Calculator,
    variant: 'primary',
    cluster: 'primary',
    metadata: 'PRIMARY AREA',
  },
  {
    index: '02',
    title: 'Financial Administration',
    description: 'Support for organized financial administration, records and related procedures.',
    icon: ClipboardCheck,
    variant: 'administration',
    cluster: 'secondary',
    metadata: 'ADMINISTRATION',
  },
  {
    index: '03',
    title: 'Finance Support',
    description: 'Practical support across day-to-day finance activities and documentation.',
    icon: BriefcaseBusiness,
    variant: 'administration',
    cluster: 'secondary',
    metadata: 'SUPPORT',
  },
  {
    index: '04',
    title: 'Financial Documentation',
    description: 'Organized handling, checking and maintenance of financial documentation.',
    icon: FileText,
    variant: 'control',
    cluster: 'control',
    metadata: 'DOCUMENTATION',
  },
  {
    index: '05',
    title: 'Reconciliation Support',
    description: 'Support for account reconciliation and identification of discrepancies for follow-up.',
    icon: RefreshCw,
    variant: 'control',
    cluster: 'control',
    metadata: 'CONTROL',
  },
  {
    index: '06',
    title: 'Financial Reporting Support',
    description: 'Support for reviewing financial information and routine reporting.',
    icon: FileBarChart,
    variant: 'control',
    cluster: 'control',
    metadata: 'REPORTING',
  },
  {
    index: '07',
    title: 'NGO / Humanitarian Finance',
    description: 'Experience and professional exposure within a humanitarian / NGO environment.',
    icon: Building2,
    variant: 'sector',
    cluster: 'sector',
    metadata: 'SECTOR CONTEXT',
  },
] as const

type AmbientNode = {
  x: number
  y: number
  radius: number
  opacity: number
  color: 'primary' | 'secondary'
  symbol: '$' | '%' | '+' | '01' | ''
  vx: number
  vy: number
}

function AmbientDataNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visibility = new IntersectionObserver(([entry]) => {
      canvas.dataset.visible = String(entry.isIntersecting)
    })
    visibility.observe(canvas)

    let animationFrame = 0
    let width = 0
    let height = 0
    let nodes: AmbientNode[] = []

    const getNodeCount = () => {
      if (window.innerWidth <= 420) return 16
      if (window.innerWidth <= 768) return 30
      return 48
    }

    const resetNode = (node: AmbientNode) => {
      node.x = Math.random() * width
      node.y = Math.random() * height
      node.radius = 1.2 + Math.random() * 1.4
      node.opacity = 0.3 + Math.random() * 0.2
      node.color = Math.random() > 0.72 ? 'secondary' : 'primary'
      node.symbol = Math.random() > 0.78 ? (['$', '%', '+', '01'][Math.floor(Math.random() * 4)] as AmbientNode['symbol']) : ''
      const angle = Math.random() * Math.PI * 2
      const speed = 0.1 + Math.random() * 0.15
      node.vx = Math.cos(angle) * speed
      node.vy = Math.sin(angle) * speed
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      nodes = Array.from({ length: getNodeCount() }, () => ({
        x: 0,
        y: 0,
        radius: 1,
        opacity: 0.1,
        color: 'primary' as const,
        symbol: '',
        vx: 0,
        vy: 0,
      }))
      nodes.forEach(resetNode)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const isLight = document.documentElement.dataset.theme === 'light'
      const primary = isLight ? '15, 88, 82' : '79, 209, 197'
      const secondary = isLight ? '16, 68, 86' : '56, 189, 248'
      const lineColor = isLight ? '18, 63, 65' : '79, 209, 197'
      const connectionDistance = width <= 768 ? 128 : 172

      nodes.forEach((node) => {
        if (!reducedMotion.matches && canvas.dataset.visible !== 'false') {
          node.x += node.vx
          node.y += node.vy
          if (node.x < -8 || node.x > width + 8 || node.y < -8 || node.y > height + 8) resetNode(node)
        }

        context.shadowBlur = 0
        nodes.forEach((other) => {
          if (node === other) return
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance > connectionDistance || node.x > width * 0.46 && node.x < width * 0.66 && node.y < height * 0.54) return
          const opacity = (1 - distance / connectionDistance) * (isLight ? 0.34 : 0.17)
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(other.x, other.y)
          context.strokeStyle = `rgba(${lineColor}, ${opacity})`
          context.lineWidth = isLight ? 1.05 : 0.65
          context.stroke()
        })

        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.shadowColor = `rgba(${node.color === 'primary' ? primary : secondary}, ${isLight ? 0.42 : 0.2})`
        context.shadowBlur = isLight ? 7 : 3
        context.fillStyle = `rgba(${node.color === 'primary' ? primary : secondary}, ${node.opacity * (isLight ? 1.5 : 1.1)})`
        context.fill()
        context.shadowBlur = 0

        if (node.symbol) {
          context.font = '600 8px monospace'
          context.fillStyle = `rgba(${node.color === 'primary' ? primary : secondary}, ${isLight ? 0.58 : 0.2})`
          context.fillText(node.symbol, node.x + 4, node.y - 4)
        }
      })

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      visibility.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="ambient-network" aria-hidden="true" />
}

function FacebookGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V7.1c0-.9.3-1.6 1.7-1.6H16V2.5c-.6-.1-1.7-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v2.7H6v3.2h2.5v8h5Z" />
    </svg>
  )
}

type BriefPhase = 'visible' | 'leaving' | 'done'

function ProfessionalBrief({ phase, mode }: { phase: BriefPhase; mode: 'full' | 'short' }) {
  if (phase === 'done') return null

  return (
    <div className={`professional-brief professional-brief-${phase} professional-brief-${mode}`} role="status" aria-live="polite">
      <div className="brief-frame">
        <div className="brief-identity">
          <span className="brief-overline">GATWECH KUOL NYOAK</span>
          <strong>ACCOUNTING &amp; FINANCE</strong>
        </div>

        <div className="brief-data-line" aria-hidden="true">
          <span className="brief-data-fragment fragment-one">01</span>
          <span className="brief-data-fragment fragment-two">FIN</span>
          <span className="brief-data-fragment fragment-three">2026</span>
          <span className="brief-data-fragment fragment-four">REPORT</span>
        </div>

        <div className="brief-progress-block">
          <div className="brief-progress-label">
            <span>INITIALIZING EXPERIENCE</span>
            <span>00 — 100</span>
          </div>
          <div className="brief-progress-track" aria-hidden="true"><span /></div>
        </div>

        <div className="brief-metadata" aria-hidden="true">
          <span>PRECISION</span>
          <span>ACCOUNTABILITY</span>
          <span>FINANCIAL INSIGHT</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formNotice, setFormNotice] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [briefPhase, setBriefPhase] = useState<BriefPhase>('visible')
  const [briefMode, setBriefMode] = useState<'full' | 'short'>('full')
  const briefStartedRef = useRef(false)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'

    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    if (briefStartedRef.current) return
    briefStartedRef.current = true

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let returningVisitor = false

    try {
      returningVisitor = window.sessionStorage.getItem('gk-professional-brief-seen') === 'true'
      window.sessionStorage.setItem('gk-professional-brief-seen', 'true')
    } catch {
      returningVisitor = true
    }

    const mode = returningVisitor ? 'short' : 'full'
    setBriefMode(mode)
    const revealDelay = reducedMotion ? 260 : mode === 'full' ? 1650 : 850
    const leaveTimer = window.setTimeout(() => setBriefPhase('leaving'), revealDelay)
    const removeTimer = window.setTimeout(() => setBriefPhase('done'), revealDelay + (reducedMotion ? 220 : 620))

  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-nav, .menu-toggle')) {
        setMobileMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMobileMenuOpen(false)
        menuTriggerRef.current?.focus()
        return
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

      const items = Array.from(document.querySelectorAll<HTMLElement>('.mobile-nav [role="menuitem"]'))
      if (!items.length) return

      event.preventDefault()
      const currentIndex = items.indexOf(document.activeElement as HTMLElement)
      const nextIndex = event.key === 'ArrowDown'
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length

      items[nextIndex].focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrollProgress(progress)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '0px 0px -50% 0px', threshold: [0.2, 0.5, 0.8] },
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    if (!form.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief message with at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === 'loading' || !validate()) return

    setStatus('loading')
    setFormNotice('')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service is not configured.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          time: new Date().toLocaleString(),
          to_email: 'gatwechjockduop@gmail.com',
          cc_email: 'kuolnyok@gmail.com',
        },
        publicKey,
      )

      setStatus('success')
      setFormNotice('Message sent successfully. Thank you for reaching out.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
      setFormNotice('Something went wrong while sending your message. Please try again.')
    }
  }

  const navLabelIcons = {
    Home: House,
    About: UserRound,
    Experience: BriefcaseBusiness,
    Capabilities: Layers3,
    Education: GraduationCap,
    Focus: Target,
    Contact: Send,
  }

  return (
    <div className={`page-shell ${briefPhase === 'done' ? 'opening-complete' : ''}`}>
      <AmbientDataNetwork />
      <ProfessionalBrief phase={briefPhase} mode={briefMode} />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <header className="topbar" id="home">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="Go to home section">
            <span className="brand-mark">GK</span>
            <span className="brand-text">Gatwech Kuol Nyoak</span>
          </a>

          <nav className="main-nav" aria-label="Primary navigation">
            {profile.navigation.map((item) => {
              const Icon = navLabelIcons[item.label as keyof typeof navLabelIcons]

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span aria-hidden="true">{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</span>
            </button>
            <button
              type="button"
              className="menu-toggle"
              ref={menuTriggerRef}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-haspopup="menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <MoreHorizontal size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

      </header>

      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile navigation" role="menu">
          {profile.navigation.map((item) => {
            const Icon = navLabelIcons[item.label as keyof typeof navLabelIcons]

            return (
              <a
                key={item.label}
                href={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                role="menuitem"
                onClick={() => {
                  setMobileMenuOpen(false)
                  menuTriggerRef.current?.focus()
                }}
              >
                {Icon ? <Icon size={15} aria-hidden="true" /> : null}
                <span>{item.label}</span>
              </a>
            )
          })}
      </nav>

      <main>
        <section className="hero section-pad" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true"><span /></span>
                Accounting &amp; Finance Professional
              </p>

              <div className="hero-title-wrap">
                <p className="hero-kicker">Professional profile</p>
                <h1>Gatwech Kuol Nyoak</h1>
              </div>

              <p className="supporting-line">Supporting accurate, accountable and reliable financial operations.</p>

              <p className="location-strap">
                <MapPin size={16} aria-hidden="true" />
                Nyirol County · Jonglei State · South Sudan
              </p>

              <p className="hero-intro">Open to accounting, finance and humanitarian-sector opportunities.</p>

              <div className="hero-actions">
                <ResumeButton className="resume-button-hero" />
                <a className="button button-secondary" href="#experience">
                  <span>View Experience</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="button button-ghost" href="#contact">
                  <span>Contact Me</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <a className="hero-conversion-note" href="#contact" aria-label="Contact Gatwech Kuol Nyoak about a professional enquiry">
                <Mail size={15} aria-hidden="true" />
                <span>Finance, administration and humanitarian-sector enquiries welcome.</span>
                <ArrowRight className="hero-conversion-arrow" size={14} aria-hidden="true" />
              </a>

              <p className="hiring-signal">
                <span aria-hidden="true" />
                Available for purpose-driven professional opportunities
              </p>

              <div className="hero-snapshot" aria-label="Professional snapshot">
                <span className="snapshot-heading">Professional snapshot</span>
                <div className="snapshot-item">
                  <span className="snapshot-label">
                    <BriefcaseBusiness size={13} aria-hidden="true" />
                    Role
                  </span>
                  <strong>Finance Assistant</strong>
                </div>
                <div className="snapshot-item">
                  <span className="snapshot-label">
                    <GraduationCap size={13} aria-hidden="true" />
                    Education
                  </span>
                  <strong>BA Accounting &amp; Finance</strong>
                </div>
                <div className="snapshot-item">
                  <span className="snapshot-label">
                    <Building2 size={13} aria-hidden="true" />
                    Sector
                  </span>
                  <strong>NGO / Humanitarian</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Executive profile visual">
              <div className="hero-profile-panel">
                <div className="portrait-stage">
                  <div className="orbital-system" aria-hidden="true">
                    <span className="orbital-ring orbital-ring-primary" />
                    <span className="orbital-ring orbital-ring-secondary"><span className="orbital-marker" /></span>
                    <span className="orbital-label orbital-label-top">PRECISION</span>
                    <span className="orbital-label orbital-label-side">FINANCE</span>
                    <span className="orbital-label orbital-label-bottom">INSIGHT</span>
                  </div>

                  <div className="portrait-image-frame">
                    <img
                      className="hero-portrait"
                      src={siteConfig.imageUrl}
                      alt="Gatwech Kuol Nyoak — Accounting and Finance Professional"
                      width="720"
                      height="900"
                      fetchPriority="high"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="value-strip" aria-label="Professional values">
              {profile.values.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad about-system" id="about">
          <div className="container about-architecture">
            <div className="about-intro">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><UserRound size={14} /></span>
                01 / ABOUT
              </p>
              <h2>Accuracy and accountability in practice.</h2>

              <div className="about-copy">
                <p>
                  Accounting and Finance professional with academic training in accounting and finance and practical experience supporting financial operations within a humanitarian environment. Focused on accuracy, accountability, documentation, confidentiality and reliable financial administration.
                </p>
              </div>

            </div>

            <aside
              className="professional-panel"
              aria-label="Professional snapshot"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                const x = ((event.clientX - rect.left) / rect.width) * 100
                const y = ((event.clientY - rect.top) / rect.height) * 100
                event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
                event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
              }}
            >
              <div className="panel-header">PROFESSIONAL SNAPSHOT</div>

              <div className="profile-detail">
                <span className="detail-icon" aria-hidden="true"><GraduationCap size={15} /></span>
                <div>
                  <span className="detail-label">Education</span>
                  <strong>BA Accounting &amp; Finance</strong>
                </div>
              </div>

              <div className="profile-detail">
                <span className="detail-icon" aria-hidden="true"><Calculator size={15} /></span>
                <div>
                  <span className="detail-label">Professional Focus</span>
                  <strong>Accounting &amp; Finance</strong>
                </div>
              </div>

              <div className="profile-detail">
                <span className="detail-icon" aria-hidden="true"><BriefcaseBusiness size={15} /></span>
                <div>
                  <span className="detail-label">Experience</span>
                  <strong>Finance Assistant</strong>
                </div>
              </div>

              <div className="profile-detail">
                <span className="detail-icon" aria-hidden="true"><Building2 size={15} /></span>
                <div>
                  <span className="detail-label">Sector Exposure</span>
                  <strong>Humanitarian / NGO</strong>
                </div>
              </div>

              <div className="profile-detail">
                <span className="detail-icon" aria-hidden="true"><MapPin size={15} /></span>
                <div>
                  <span className="detail-label">Location</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-pad experience-system" id="experience">
          <div className="container experience-shell">
            <div className="section-heading-wrap compact-head experience-heading">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><BriefcaseBusiness size={14} /></span>
                02 / EXPERIENCE
              </p>
              <h2>Professional experience.</h2>
              <p className="experience-supporting">Practical finance experience within an international humanitarian environment.</p>
            </div>

            <div className="experience-layout">
              <nav className="experience-rail" aria-label="Experience navigation">
                <div className="rail-item active">
                  <span className="rail-index">01</span>
                  <span className="rail-name">MSF Spain</span>
                </div>
                <div className="rail-item">
                  <span className="rail-index">02</span>
                  <span className="rail-name">HDC</span>
                </div>
              </nav>

              <div className="experience-panel">
                <div className="experience-header">
                  <div className="experience-company-block">
                    <p className="experience-company">Médecins Sans Frontières (MSF) Spain</p>
                    <h3>Finance Assistant</h3>
                  </div>

                  <div className="experience-meta">
                    <span>2023 — 2025</span>
                    <span>Humanitarian / NGO environment</span>
                  </div>
                </div>

                <div className="experience-grid">
                  {experienceResponsibilityMatrix.map((item) => {
                    const Icon = item.icon

                    return (
                      <article key={item.step} className="responsibility-row">
                        <div className="responsibility-index">{item.step}</div>
                        <div className="responsibility-icon" aria-hidden="true">
                          <Icon size={15} />
                        </div>
                        <div className="responsibility-body">
                          <span className="responsibility-title">{item.title}</span>
                          <p>{item.description}</p>
                        </div>
                      </article>
                    )
                  })}
                </div>

              </div>
            </div>

            <div className="secondary-experience">
              <div className="secondary-card">
                <div className="secondary-label">02</div>
                <div className="secondary-body">
                  <p className="secondary-org">Humanitarian Development Consortium (HDC)</p>
                  <h3>Protection Monitoring</h3>
                  <div className="secondary-meta">
                    <span>2026</span>
                    <span>Context provided</span>
                  </div>
                  <p className="secondary-description">
                    Supported humanitarian protection efforts through field-level monitoring, community engagement, documentation and analysis of protection concerns. Collected and communicated relevant information to support reporting, referrals, advocacy and humanitarian decision-making.
                  </p>
                  <div className="secondary-responsibilities">
                    <span className="secondary-subheading">Key responsibilities</span>
                    <ul>
                      <li>Conducted field-level protection monitoring and observation.</li>
                      <li>Documented protection concerns, risks and incidents accurately and confidentially.</li>
                      <li>Engaged with communities and key informants to gather relevant information.</li>
                      <li>Identified and analyzed emerging protection trends and needs.</li>
                      <li>Supported reporting, referrals, advocacy and humanitarian response activities.</li>
                      <li>Applied confidentiality, informed consent, do-no-harm and respect for affected communities.</li>
                    </ul>
                  </div>
                  <div className="secondary-areas">
                    <span className="secondary-subheading">Core areas</span>
                    <div className="secondary-area-list">
                      <span>Protection Monitoring</span>
                      <span>Community Engagement</span>
                      <span>Data Collection</span>
                      <span>Reporting</span>
                      <span>Humanitarian Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className="section-pad capabilities-section" id="skills">
          <div className="container">
            <div className="section-heading-wrap compact-head capability-heading">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><Layers3 size={14} /></span>
                03 / CAPABILITIES
              </p>
              <h2>Core capabilities.</h2>
              <p className="capability-supporting">Practical support across finance operations, controls, reporting and administration.</p>
            </div>

            <div className="capability-architecture" aria-label="Professional capability groups">
              <div className="capability-dashboard">
                {capabilityCards.map((card, index) => {
                  const Icon = card.icon

                  return (
                    <article
                      key={card.id}
                      className={`capability-card ${index === 0 ? 'featured' : ''}`}
                      style={{ animationDelay: `${index * 140}ms` }}
                    >
                      <div className="capability-card-header">
                        <span className="capability-icon-wrap" aria-hidden="true">
                          <Icon size={20} />
                        </span>
                        <span className="capability-card-tag">{card.number} / {card.label}</span>
                      </div>

                      <h3>{card.title}</h3>
                      <p>{card.description}</p>

                      <div className={`capability-item-list ${card.title === 'Accounting & Controls' ? 'two-column' : ''}`}>
                        {card.items.map((item) => {
                          const ItemIcon = item.icon

                          return (
                            <div key={item.label} className="capability-item">
                              <span className="capability-item-icon" aria-hidden="true">
                                <ItemIcon size={15} />
                              </span>
                              <span className="capability-item-label">{item.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <p className="capability-footer">Capabilities developed through academic preparation and practical financial operations experience.</p>
          </div>
        </section>

        <section className="section-pad education-journey-section" id="education">
          <div className="container">
            <div className="section-heading-wrap compact-head education-heading">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><GraduationCap size={14} /></span>
                04 / EDUCATION
              </p>
              <h2>Education</h2>
            </div>

            <div className="education-journey-wrap">
              <aside className="education-side-panel" aria-label="Academic journey overview">
                <span className="journey-kicker">Academic Journey</span>
                <div className="journey-count">
                  <strong>03</strong>
                  <span>Milestones</span>
                </div>
                <div className="journey-steps" aria-label="Education timeline steps">
                  <div className="journey-step">
                    <span>2006</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="journey-step">
                    <span>2016</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="journey-step">
                    <span>2019</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="journey-step">
                    <span>2023</span>
                    <i aria-hidden="true" />
                  </div>
                </div>
              </aside>

              <div className="education-journey" aria-label="Education timeline">
                {educationTimeline.map((item, index) => {
                  const Icon = item.icon
                  const isRightAligned = index % 2 === 1

                  return (
                    <article
                      key={item.institution}
                      className={`education-timeline-item ${isRightAligned ? 'is-right' : 'is-left'} ${item.featured ? 'is-featured' : ''}`}
                    >
                      <div className="timeline-node" aria-hidden="true">
                        <span>{String(item.id).padStart(2, '0')}</span>
                      </div>

                      <div className="education-card">
                        <div className="education-card-top">
                          <span className="education-icon" aria-hidden="true">
                            <Icon size={18} />
                          </span>
                        </div>

                        <h3>{item.institution}</h3>
                        <p className="education-qualification">{item.qualification}</p>
                        {item.period ? <span className="education-period">{item.period}</span> : null}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

          </div>
        </section>

        <section className="section-pad focus-section" id="focus">
          <div className="container focus-summary">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><Target size={14} /></span>
                PROFESSIONAL FOCUS
              </p>
              <h2>Where his background can contribute.</h2>
              <p className="focus-supporting">
                Accounting operations, financial administration, finance support, financial documentation, reconciliation support, financial reporting support and NGO/humanitarian finance.
              </p>
            </div>
            <div className="focus-summary-list" aria-label="Professional focus areas">
              {profile.focusAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
          </div>
        </section>

        <section className="section-pad resume-section" id="resume" aria-labelledby="resume-heading">
          <div className="container">
            <div className="resume-card">
              <div className="resume-card-mark" aria-hidden="true">
                <FileText size={24} />
              </div>
              <div className="resume-card-copy">
                <p className="eyebrow"><span className="eyebrow-icon" aria-hidden="true"><FileText size={14} /></span> PROFESSIONAL RESUME</p>
                <h2 id="resume-heading">Gatwech Kuol Nyoak</h2>
                <p className="resume-card-title">Accounting &amp; Finance Professional</p>
                <p>Explore my professional background, accounting and finance experience, humanitarian-sector exposure, education and core capabilities.</p>
              </div>
              <div className="resume-card-action">
                <ResumeButton showExternalLabel />
                <span className="resume-card-note">Opens securely in a new tab</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad future-architecture-section" aria-labelledby="future-work-heading">
          <div className="container future-work">
            <div className="future-intro">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><Layers3 size={14} /></span>
                PROFESSIONAL DEVELOPMENT
              </p>
              <h2 id="future-work-heading">Future professional work.</h2>
              <p>
                A foundation for future projects, case studies, certificates, reports, financial analysis and professional resources.
              </p>
            </div>

            <div className="future-category-list" aria-label="Future professional work categories">
              {['Projects', 'Financial Analysis', 'Reports', 'Certificates', 'Case Studies', 'Resources'].map((category, index) => (
                <span key={category} className="future-category">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><Send size={14} /></span>
                GET IN TOUCH
              </p>
              <h2>Let&apos;s connect.</h2>
              <p>
                Have a question, professional opportunity, or something you&apos;d like to discuss? I&apos;d be glad to hear from you.
              </p>
              <p className="contact-availability">
                <span aria-hidden="true" /> Available for serious professional enquiries
              </p>

              <div className="contact-list">
                <a href={`mailto:${profile.email}`} aria-label="Email Gatwech Kuol Nyoak">
                  <Mail size={16} aria-hidden="true" />
                  <span>Email · {profile.email}</span>
                </a>
                <a href={`tel:${profile.phone}`} aria-label="Call Gatwech Kuol Nyoak">
                  <Phone size={16} aria-hidden="true" />
                  <span>Phone · +211 917 526 617</span>
                </a>
                <span aria-label="Location of Gatwech Kuol Nyoak">
                  <MapPin size={16} aria-hidden="true" />
                  <span>Location · Nyirol County · Jonglei State · South Sudan</span>
                </span>
              </div>

              <div className="contact-actions" aria-label="Direct contact actions">
                <a className="button button-secondary contact-email-button" href={`mailto:${profile.email}`}>
                  <Mail size={16} aria-hidden="true" />
                  <span>Email Directly</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              {profile.socialLinks.length > 0 && (
                <div className="social-links" aria-label="Social links">
                  {profile.socialLinks
                    .filter((link) => link.enabled)
                    .map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={link.ariaLabel || `Visit ${link.label}`}
                      >
                        <span className="social-icon" aria-hidden="true">
                          <ArrowUpRight size={16} />
                        </span>
                        <span>{link.label} · Professional Profile</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    ))}
                </div>
              )}
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Professional enquiry form">
              <div className="contact-form-header">
                <div>
                  <span className="contact-form-kicker">MESSAGE CENTER</span>
                  <strong>Start a conversation</strong>
                  <small>Share the role, project or finance need you would like to discuss.</small>
                </div>
                <span className="contact-form-status"><span aria-hidden="true" /> AVAILABLE</span>
              </div>

              <div className="field-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
              </div>

              <div className="field-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  value={form.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
              </div>

              <div className="field-row">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  required
                  value={form.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}
              </div>

              <div className="field-row">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="How can I help?"
                  required
                  value={form.subject}
                  onChange={(event) => handleChange('subject', event.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && <span id="subject-error" className="field-error">{errors.subject}</span>}
              </div>

              <div className="field-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me a little about the opportunity or finance need..."
                  required
                  value={form.message}
                  onChange={(event) => handleChange('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
              </div>

              <button className="button button-primary form-button" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <Send size={16} aria-hidden="true" />
              </button>

              {formNotice && (
                <div className={`form-notice form-notice-${status}`} role={status === 'error' ? 'alert' : 'status'} aria-live="polite">
                  {status === 'success' && <CircleCheck size={19} strokeWidth={2.2} aria-hidden="true" />}
                  <span>{formNotice}</span>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="section-pad language-section" aria-labelledby="languages-heading">
          <div className="container">
            <div className="section-heading-wrap compact-head language-heading">
              <p className="eyebrow">
                <span className="eyebrow-icon" aria-hidden="true"><Languages size={14} /></span>
                LANGUAGES
              </p>
              <h2 id="languages-heading">Languages</h2>
              <div className="section-divider" aria-hidden="true" />
            </div>

            <div className="language-grid" aria-label="Language communication profile">
              {profile.languages.map((item) => {
                const code = item.language === 'English' ? 'EN' : item.language === 'Nuer' ? 'NU' : 'AR'
                const proficiency =
                  item.language === 'English'
                    ? 'Professional working proficiency'
                    : item.language === 'Nuer'
                      ? 'Native'
                      : item.language === 'Arabic'
                        ? 'Speaking only'
                        : item.proficiency

                return (
                  <article key={item.language} className="language-card">
                    <div className="language-badge" aria-label={`${item.language} abbreviation`}>{code}</div>
                    <h3>{item.language}</h3>
                    <p className="language-status">
                      <span className="status-dot" aria-hidden="true" />
                      {proficiency}
                    </p>
                  </article>
                )
              })}
            </div>

            <div className="language-summary" aria-label="Language count">
              <span>03</span>
              <span>LANGUAGES</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-shell">
          <div className="footer-top">
            <div className="footer-brand" aria-label="Professional identity">
              <div>
                <p className="footer-name">Gatwech Kuol Nyoak</p>
                <p className="footer-title">Accounting &amp; Finance Professional</p>
              </div>
            </div>

            <div className="footer-contact" aria-label="Contact and location">
              <div className="footer-meta-item">
                <MapPin size={16} aria-hidden="true" />
                <span aria-label="Location: Nyirol County, Jonglei State, South Sudan">Nyirol County, Jonglei State, South Sudan</span>
              </div>

              {profile.socialLinks.length > 0 && (
                <a
                  href={profile.socialLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={profile.socialLinks[0].ariaLabel || 'Visit Gatwech Kuol Nyoak on Facebook'}
                >
                  <span className="footer-social-icon" aria-hidden="true">
                    <FacebookGlyph size={14} />
                  </span>
                  <span>Facebook</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Gatwech Kuol Nyoak. All rights reserved.</span>
            <div className="developer-attribution" aria-label="Website developer attribution">
              <span>Designed &amp; developed by </span>
              <a
                href="https://www.kueiyiee.tech/"
                target="_blank"
                rel="noopener noreferrer"
                title="Kuei Poch Kuei — Full-Stack Developer"
                aria-label="Visit Kuei Poch Kuei's professional website"
              >
                Kuei Poch Kuei
              </a>
              <small>Computer Science Student · Full-Stack Developer</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
