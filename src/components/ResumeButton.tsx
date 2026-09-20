import { ArrowUpRight, FileText } from 'lucide-react'
import { profile } from '../data/profile'

type ResumeButtonProps = {
  className?: string
  showExternalLabel?: boolean
}

export function ResumeButton({ className = '', showExternalLabel = false }: ResumeButtonProps) {
  return (
    <a
      className={`resume-button ${className}`.trim()}
      href={profile.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Gatwech Kuol Nyoak's professional resume"
    >
      <FileText size={17} aria-hidden="true" />
      <span>{showExternalLabel ? 'Open CV in New Tab' : 'View Resume'}</span>
      {showExternalLabel ? <ArrowUpRight className="resume-button-arrow" size={15} aria-hidden="true" /> : null}
    </a>
  )
}