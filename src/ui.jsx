import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export const Arrow = () => <span className="arrow" aria-hidden="true">→</span>
export function Icon({ type = 'leaf', className = '' }) {
  const paths = {
    leaf: <><path d="M18 30C8 30 4 23 4 13c9 2 14 7 14 17Zm0 0c0-12 5-20 14-24 0 13-4 21-14 24Zm0 0V15M8 18l10 12L28 12"/><path d="M18 21C12 15 13 8 18 3c5 6 6 12 0 18Z"/></>,
    lotus: <><path d="M18 28C9 20 11 10 18 3c7 7 9 17 0 25Zm0 0C7 26 3 18 5 10c9 2 13 8 13 18Zm0 0c11-2 15-10 13-18-9 2-13 8-13 18Z"/><path d="M18 29C7 31 2 26 1 19m17 10c11 2 16-3 17-10"/></>,
    heart: <path d="M18 31 4 17C-5 6 9-2 18 8 27-2 41 6 32 17Z"/>,
    bowl: <><path d="M3 17h30c-1 12-9 16-15 16S4 29 3 17ZM9 17C4 10 9 6 13 9m9 8c5-7 11-8 13-4M16 16c-4-9-1-14 3-15 5 7 4 12-3 15Z"/><path d="M12 9l6 8m1-10-1 10"/></>,
    person: <><circle cx="18" cy="10" r="6"/><path d="M12 17C5 20 4 25 4 32h28c0-7-1-12-8-15"/></>,
    people: <><circle cx="18" cy="9" r="5"/><circle cx="7" cy="14" r="4"/><circle cx="29" cy="14" r="4"/><path d="M9 32V23c0-6 18-6 18 0v9ZM9 21C2 19 1 25 1 31h8m18-10c7-2 8 4 8 10h-8"/></>,
    shield: <><path d="M18 2 32 8c0 15-5 22-14 26C9 30 4 23 4 8Z"/><path d="m11 18 5 5 10-12"/></>,
  }
  return <svg className={`leaf-icon ${className}`} viewBox="0 0 36 36" fill="none" aria-hidden="true">{paths[type] || paths.leaf}</svg>
}
export const Leaf = (props) => <Icon {...props}/>
export function Button({ to, children, tone = 'gold', className = '' }) {
  return <Link className={`btn btn-${tone} ${className}`} to={to}>{children}<Arrow/></Link>
}
export function Eyebrow({ children }) { return <div className="eyebrow">{children}</div> }
export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el?.classList.add('is-visible'); return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('is-visible'); observer.disconnect() }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>
}
export function Branch({ className = '' }) {
  return <img className={`branch ${className}`} src="/images/ayurveda/reference-branch.webp" alt="" aria-hidden="true" width="1536" height="768"/>
}
export function Flourish() { return <span className="flourish" aria-hidden="true"><span/><Icon/><span/></span> }
export function Wave({ className = '', variant = 'bottom' }) {
  const paths = {
    hero: 'M0 10C150 130 340 5 650 40S1150 145 1440 70V100H0Z',
    bottom: 'M0 42C240 132 420 3 730 30S1200 138 1440 48V100H0Z',
  }
  return <svg className={`wave ${className}`} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d={paths[variant] || paths.bottom}/></svg>
}
