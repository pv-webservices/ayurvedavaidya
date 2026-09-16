import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { articles, programs, services } from './content'
import HomePage from './HomePage'
import { Arrow, Leaf, Button, Eyebrow } from './ui'

function Logo({footer=false}) {
  return <Link to="/" className={footer?'brand brand-footer':'brand'} aria-label="AyurvedaVaidya home"><img src={footer?'/images/ayurveda/ayurvedavaidya-logo-transparent.webp':'/images/ayurveda/reference-header-logo.webp'} alt="AyurvedaVaidya.com — Ancient Wisdom. Modern Wellbeing."/></Link>
}
const NavChevron = () => <svg className="nav-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg>

function Header(){
 const [open,setOpen]=useState(false),[servicesOpen,setServicesOpen]=useState(false)
 const loc=useLocation(), menuButtonRef=useRef(null), drawerRef=useRef(null), dropRef=useRef(null)
 useEffect(()=>{setOpen(false);setServicesOpen(false)},[loc.pathname])
 useEffect(()=>{
   document.body.classList.toggle('nav-open',open)
   const focusTimer=open?setTimeout(()=>drawerRef.current?.querySelector('.drawer-close')?.focus(),50):null
   const keys=e=>{
     if(e.key==='Escape'){setOpen(false);setServicesOpen(false);(open?menuButtonRef:dropRef).current?.focus()}
     if(e.key==='Tab'&&open&&drawerRef.current){
       const els=[...drawerRef.current.querySelectorAll('a,button:not([disabled])')]
       const first=els[0],last=els.at(-1)
       if(!drawerRef.current.contains(document.activeElement)){e.preventDefault();(e.shiftKey?last:first)?.focus()}
       else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
       else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
     }
   }
   window.addEventListener('keydown',keys)
   return()=>{if(focusTimer!==null)clearTimeout(focusTimer);window.removeEventListener('keydown',keys);document.body.classList.remove('nav-open')}
 },[open])
 const links=[['Home','/'],['About','/about'],['Diet','/services/nutrition'],['Yoga','/services/yoga'],['Wellness','/services/mind-body-wellness'],['Blog','/articles'],['Contact','/book-consultation']]
 return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="nav-shell"><Logo/><nav className="desktop-nav" aria-label="Primary navigation">
   {links.slice(0,2).map(([name,to])=><NavLink key={name} to={to}>{name}</NavLink>)}
   <div className="menu-wrap" onMouseLeave={()=>setServicesOpen(false)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setServicesOpen(false)}}>
     <button ref={dropRef} className="nav-drop" aria-controls="ayurveda-menu" aria-expanded={servicesOpen} onClick={()=>setServicesOpen(v=>!v)}>Ayurveda <NavChevron/></button>
     <div id="ayurveda-menu" className={`mega-menu ${servicesOpen?'open':''}`} inert={!servicesOpen}>
       <div className="mega-intro"><Leaf/><span>AYURVEDA 360°</span><strong>Four dimensions.<br/>One personal plan.</strong><Link to="/services">Explore all services <Arrow/></Link></div>
       {services.map(s=><div key={s.key} className="mega-col"><Link className="mega-title" to={`/services/${s.key}`}>{s.title}</Link>{s.items.slice(0,4).map(x=><Link key={x} to={`/services/${s.key}`}>{x}</Link>)}</div>)}
     </div>
   </div>{links.slice(2).map(([name,to])=><NavLink key={name} to={to}>{name}</NavLink>)}
 </nav><Button to="/book-consultation" tone="green" className="header-cta">Book a Consultation</Button><button ref={menuButtonRef} className="menu-toggle" aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}><span/><span/></button></div>
 <div ref={drawerRef} role="dialog" aria-modal={open?true:undefined} aria-label="Navigation menu" className={`drawer ${open?'open':''}`} inert={!open} aria-hidden={!open}><button className="drawer-close" onClick={()=>{setOpen(false);menuButtonRef.current?.focus()}} aria-label="Close navigation">×</button><Logo/><nav aria-label="Mobile navigation">{links.slice(0,2).map(([name,to])=><NavLink key={name} to={to}>{name}</NavLink>)}<button aria-expanded={servicesOpen} onClick={()=>setServicesOpen(v=>!v)}>Ayurveda <NavChevron/></button>{servicesOpen&&<div className="mobile-services">{services.map(s=><Link key={s.key} to={`/services/${s.key}`}>{s.title}</Link>)}</div>}{links.slice(2).map(([name,to])=><NavLink key={name} to={to}>{name}</NavLink>)}</nav><Button to="/book-consultation">Book a Consultation</Button></div>{open&&<button className="drawer-scrim" onClick={()=>{setOpen(false);menuButtonRef.current?.focus()}} aria-label="Close menu"/>}
 </header></>
}

function Footer(){
 const [status,setStatus]=useState('')
 const subscribe=e=>{e.preventDefault();setStatus('Newsletter signup is not connected yet. Please contact us for updates.')}
 return <footer className="site-footer paper-surface"><div className="container footer-grid"><div><Logo footer/></div>
 <div><h3>Quick Links</h3>{[['Home','/'],['About','/about'],['Programs','/programs'],['Blog','/articles'],['Contact','/book-consultation']].map(([name,to])=><Link key={name} to={to}>{name}</Link>)}</div>
 <div><h3>Our Services</h3>{services.map(s=><Link key={s.key} to={`/services/${s.key}`}>{s.key==='nutrition'?'Diet & Nutrition':s.title}</Link>)}<Link to="/book-consultation">Consultations</Link></div>
 <div className="newsletter"><h3>Stay Connected</h3><p>Join our newsletter for wellness<br/>insights and updates.</p><form onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required/><button aria-label="Subscribe to newsletter"><Arrow/></button></form><p className="newsletter-status" role="status">{status}</p><Link className="stay-connected" to="/book-consultation"><Leaf/> Let's begin a conversation <Arrow/></Link></div>
 </div><div className="footer-bottom"><div className="container"><span>© {new Date().getFullYear()} AyurvedaVaidya.com. All rights reserved.</span><span className="live"><Leaf/>Live Naturally. Live Fully.</span></div></div>
 <div className="container legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link><Link to="/disclaimer">Wellness Disclaimer</Link></div></footer>
}

const pageCopy={
 about:{eyebrow:'Our philosophy',title:'Rooted in tradition. Designed for modern life.',intro:'AyurvedaVaidya brings Ayurveda, nutrition, yoga and mind–body wellness into one thoughtful, personalized approach.',body:'Our work begins by listening. We consider individual constitution, routines, food, movement, rest and the realities of everyday life before suggesting an appropriate wellness path.'},
 programs:{eyebrow:'Focused wellness journeys',title:'Programs designed around real life.',intro:'Explore supportive, personalized programs spanning rejuvenation, metabolic wellbeing, stress and sleep, and seasonal wellness.',body:'Each program is designed to complement appropriate medical care where needed. Recommendations are tailored after consultation rather than prescribed through a generic online checklist.'},
 ayurveda:{eyebrow:'Ayurveda, thoughtfully applied',title:'Ancient perspective. Practical guidance.',intro:'Discover personalized Ayurvedic wellness guidance grounded in individual constitution, daily rhythms and seasonal context.',body:'Our approach translates traditional principles into clear, practical routines for contemporary life while avoiding one-size-fits-all claims.'},
 articles:{eyebrow:'The AyurvedaVaidya journal',title:'Ideas for considered wellbeing.',intro:'Educational perspectives on Ayurveda, nutrition, yoga and the mind–body relationship.',body:'Articles are prepared for general education and should not replace individualized health advice.'}
}

function EditorialPage({type}){const c=pageCopy[type];return <main id="main-content"><section className="inner-hero"><div className="container"><Eyebrow>{c.eyebrow}</Eyebrow><h1>{c.title}</h1><p>{c.intro}</p></div></section><section className="section inner-content"><div className="container editorial-grid"><div><h2>A more connected view of wellbeing.</h2><p>{c.body}</p><Button to="/book-consultation">Book a Consultation</Button></div><div className="editorial-note"><Leaf/><blockquote>“Small, consistent choices shape the rhythm of wellbeing.”</blockquote></div></div>{type==='programs'&&<div className="container program-grid inner-cards">{programs.map(p=><Link className="program-card" to="/book-consultation" key={p.title}><img src={p.image} alt=""/><div><h3>{p.title}</h3><p>{p.text}</p><span>Enquire <Arrow/></span></div></Link>)}</div>}{type==='articles'&&<div className="container article-grid inner-cards">{articles.map(a=><article className="article-card" key={a.title}><img src={a.image} alt=""/><div><span className="category">{a.category}</span><h3>{a.title}</h3><p>Editorial content placeholder — publication details to be supplied.</p></div></article>)}</div>}</section></main>}

function ServicesPage({single}){const data=single?services.find(s=>s.key===single):null;return <main id="main-content"><section className="inner-hero services-hero"><div className="container"><Eyebrow>{data?data.title:'Ayurveda 360°'}</Eyebrow><h1>{data?data.subtitle:'Four dimensions. One personalized path.'}</h1><p>{data?data.short:'Explore a connected approach bringing Ayurveda, nutrition, yoga and mind–body wellness together.'}</p></div></section><section className="section services-list"><div className="container">{(data?[data]:services).map((s,i)=><article className="service-band" key={s.key}><div className="service-index">0{i+1}</div><div><Eyebrow>{s.title}</Eyebrow><h2>{s.subtitle}</h2><p>{s.short}</p><Button to="/book-consultation">Discuss Your Needs</Button></div><div className="service-items">{s.items.map(x=><div key={x}><Leaf/><span>{x}</span></div>)}</div></article>)}</div></section></main>}

function Booking(){const [status,setStatus]=useState(''); const submit=e=>{e.preventDefault();if(!e.currentTarget.checkValidity()){setStatus('Please complete all required fields.');return}setStatus('Your details are ready. Booking delivery is not connected yet; no appointment has been created.')};return <main id="main-content"><section className="inner-hero booking-hero"><div className="container"><Eyebrow>Begin with a conversation</Eyebrow><h1>Book Your Consultation</h1><p>Tell us how you would like to begin. Please do not include detailed medical history or emergency information in this form.</p></div></section><section className="section booking-section"><div className="container booking-grid"><div><Eyebrow>What to expect</Eyebrow><h2>A thoughtful first step.</h2><p>This form captures only the contact and scheduling details needed for an initial conversation. A secure booking or email service must be connected before launch.</p><div className="form-note"><Leaf/><span>For emergencies, contact your local emergency service. This form is not monitored for urgent care.</span></div></div><form className="booking-form" onSubmit={submit} noValidate><label>Full name<input name="name" required autoComplete="name"/></label><div className="form-row"><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Phone<input name="phone" type="tel" required autoComplete="tel"/></label></div><div className="form-row"><label>Preferred consultation area<select required defaultValue=""><option value="" disabled>Select an area</option>{services.map(s=><option key={s.key}>{s.title}</option>)}</select></label><label>Consultation mode<select required defaultValue=""><option value="" disabled>Select a mode</option><option>Online</option><option>In person</option><option>Phone</option></select></label></div><div className="form-row"><label>Preferred date<input name="date" type="date" required/></label><label>Preferred time<input name="time" type="time" required/></label></div><label>Optional message<textarea name="message" rows="4" placeholder="A short note about what you would like support with (no detailed medical history)."/></label><label className="consent"><input type="checkbox" required/><span>I agree that AyurvedaVaidya may use these details to respond to my consultation request and I have read the privacy notice.</span></label><button className="btn btn-gold" type="submit">Request Consultation <Arrow/></button><p className="form-status" role="status">{status}</p></form></div></section></main>}

function Legal({type}){const title={privacy:'Privacy Policy',terms:'Terms of Use',disclaimer:'Medical & Wellness Disclaimer'}[type];return <main id="main-content"><section className="inner-hero short"><div className="container"><Eyebrow>Website information</Eyebrow><h1>{title}</h1><p>Draft placeholder page. Final content must be supplied and reviewed before launch.</p></div></section><section className="section legal-page"><div className="container"><h2>Content review required</h2><p>This page is intentionally not populated with fabricated legal terms. Connect the final, professionally reviewed copy before publishing the site.</p>{type==='disclaimer'&&<p>Information on this website is intended for general educational and wellness purposes and is not a substitute for individualized medical advice, diagnosis or emergency care.</p>}</div></section></main>}

function ScrollTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});const labels={'/':'Ayurveda, Nutrition, Yoga & Mind-Body Wellness','/about':'About','/services':'Services','/programs':'Wellness Programs','/ayurveda':'Ayurveda','/articles':'Wellness Articles','/book-consultation':'Book a Consultation','/privacy':'Privacy Policy','/terms':'Terms of Use','/disclaimer':'Medical & Wellness Disclaimer'};const service=services.find(s=>pathname===`/services/${s.key}`);document.title=`${service?service.title:labels[pathname]||'AyurvedaVaidya'} | AyurvedaVaidya`},[pathname]);return null}
function App(){return <><ScrollTop/><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/about" element={<EditorialPage type="about"/>}/><Route path="/programs" element={<EditorialPage type="programs"/>}/><Route path="/ayurveda" element={<EditorialPage type="ayurveda"/>}/><Route path="/articles" element={<EditorialPage type="articles"/>}/><Route path="/services" element={<ServicesPage/>}/>{services.map(s=><Route key={s.key} path={`/services/${s.key}`} element={<ServicesPage single={s.key}/>}/>) }<Route path="/book-consultation" element={<Booking/>}/><Route path="/privacy" element={<Legal type="privacy"/>}/><Route path="/terms" element={<Legal type="terms"/>}/><Route path="/disclaimer" element={<Legal type="disclaimer"/>}/><Route path="*" element={<EditorialPage type="about"/>}/></Routes><Footer/></>}

export default App
