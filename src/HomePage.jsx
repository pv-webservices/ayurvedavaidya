import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, Icon, Button, Eyebrow, Reveal, Branch, Flourish, Wave } from './ui'

const base = '/images/ayurveda/'
const pillars = [
  { title: 'Ayurveda', image: 'reference-hero.webp', icon: 'leaf', text: <>Time-tested healing<br/>for modern living.</>, to: 'ayurveda' },
  { title: 'Diet', image: 'pillar-nutrition.webp', icon: 'bowl', text: <>Nourishment for<br/>a balanced life.</>, to: 'nutrition' },
  { title: 'Yoga', image: 'pillar-yoga.webp', icon: 'lotus', text: <>Strengthen body.<br/>Calm the mind.</>, to: 'yoga' },
  { title: 'Wellness', image: 'pillar-mind-body.webp', icon: 'leaf', text: <>Holistic care for<br/>a brighter tomorrow.</>, to: 'mind-body-wellness' },
]
const journeys = [
  ['Detox & Rejuvenation', 'Cleanse. Restore. Renew.', 'program-rejuvenation.webp'],
  ['Immunity Boost', 'Stronger Today. Healthier Tomorrow.', 'program-preventive.webp'],
  ['Stress Management', 'Find Calm. Live Better.', 'pillar-yoga.webp'],
  ['Weight Balance', 'Natural Solutions. Lasting Results.', 'program-metabolic.webp'],
]
const stories = [
  { quote: 'AyurvedaVaidya.com helped me regain my energy and balance naturally. Truly life-changing!', name: 'Priya Sharma', city: 'Bengaluru', initials: 'PS' },
  { quote: 'The personalized diet and yoga plan made a huge difference in my health. Highly recommended!', name: 'Rahul Mehta', city: 'Mumbai', initials: 'RM' },
  { quote: 'Authentic, compassionate and professional. I feel healthier and happier every day.', name: 'Anita Kapoor', city: 'Delhi', initials: 'AK' },
  { quote: 'The thoughtful wellness guidance helped me build a calmer and more balanced daily routine.', name: 'Meera Iyer', city: 'Chennai', initials: 'MI' },
]
const posts = [
  ['5 Ayurvedic Herbs for a Stronger Immune System', 'article-ayurveda.webp', 'Mar 10, 2024', '5 min read'],
  ['Healthy Eating Made Simple with Ayurveda', 'pillar-nutrition.webp', 'Mar 5, 2024', '4 min read'],
  ['How Yoga Transforms Your Mind and Body', 'pillar-yoga.webp', 'Feb 26, 2024', '6 min read'],
]

function Hero() {
  return <section className="hero forest-surface" aria-labelledby="hero-title">
    <div className="hero-copy"><Eyebrow>Holistic healing for a brighter you</Eyebrow>
      <h1 id="hero-title">{['Ancient', 'Wisdom.', 'Modern', 'Wellbeing.'].map((line, i) => <span key={line} style={{ '--line': i }}>{line}</span>)}</h1>
      <p>Personalized Ayurveda, Nutrition, Yoga &amp; Wellness<br className="desktop-break"/> for a Healthier, Happier Life.</p>
      <Button to="/book-consultation">Book a Consultation</Button>
      <div className="trust-row">{[['leaf','Natural','Healing'],['lotus','Personalized','Care'],['heart','Holistic','Wellbeing']].map(([type,a,b]) => <div key={a}><Icon type={type}/><span>{a}<br/>{b}</span></div>)}</div>
    </div>
    <div className="hero-photo">
      <svg className="hero-art" viewBox="0 0 800 780" preserveAspectRatio="none" aria-hidden="true">
        <defs><clipPath id="hero-image-clip"><path d="M160-20C-70 230-30 560 310 710C500 800 685 800 820 722V-20Z"/></clipPath></defs>
        <image href={`${base}reference-hero.webp`} x="0" y="0" width="800" height="780" preserveAspectRatio="xMinYMid slice" clipPath="url(#hero-image-clip)"/>
        <path className="hero-arc" d="M160-20C-70 230-30 560 310 710C500 800 685 800 820 722"/>
      </svg>
      <blockquote className="hero-quote">“Balance<br/>Heals<br/>Everything”<Flourish/></blockquote>
      <div className="hero-health"><strong>Good Health</strong><span>A natural way of life</span><Icon/></div>
    </div>
    <Wave variant="hero"/>
  </section>
}

function Philosophy() {
  return <section className="philosophy paper-surface" aria-labelledby="philosophy-title">
    <Branch className="philosophy-branch"/>
    <div className="container philosophy-grid">
      <Reveal className="philosophy-copy"><Eyebrow>Our philosophy</Eyebrow><h2 id="philosophy-title">Rooted in Tradition.<br/>Designed for Today.</h2><p>At AyurvedaVaidya.com, we bring the timeless wisdom of Ayurveda into modern life. Our approach blends authentic knowledge, personalized guidance and compassionate care to help you achieve lasting wellbeing — naturally.</p><Button to="/about">Our Story</Button></Reveal>
      <Reveal className="philosophy-art" delay={100}><img className="sage-art" src={`${base}reference-sage.webp`} width="864" height="1152" alt="" aria-hidden="true"/><blockquote><span className="quote-open" aria-hidden="true">“</span>“True wellness<br/>is a balance of<br/>body, mind and spirit.”<Flourish/></blockquote></Reveal>
      <Reveal className="principles" delay={180}>{['Authentic Knowledge','Modern Application','Personalized Care','A Healthier Tomorrow'].map((text, i) => <div key={text}><span className="principle-icon"><Icon type={i % 2 ? 'leaf' : 'shield'}/></span><span>{text}</span></div>)}</Reveal>
    </div>
  </section>
}

function Pillars() {
  return <section className="pillars forest-surface" aria-labelledby="pillars-title"><div className="container">
    <Reveal className="section-heading centered"><Eyebrow>A complete approach</Eyebrow><h2 id="pillars-title">Our Wellness Pillars</h2><p>Four paths. One healthier, happier you.</p></Reveal>
    <div className="pillar-grid">{pillars.map((p,i) => <Reveal key={p.title} delay={i*85}><Link className="pillar-card" to={`/services/${p.to}`}><div className="card-image"><img src={base+p.image} alt="" width="600" height="330" loading="lazy"/></div><div className="pillar-body"><Icon type={p.icon}/><h3>{p.title}</h3><p>{p.text}</p><span>Explore <Arrow/></span></div></Link></Reveal>)}</div>
  </div></section>
}

function WhyChoose() {
  return <section className="why paper-surface" aria-labelledby="why-title"><Branch className="why-branch-top"/><Branch className="why-branch-bottom"/>
    <div className="container why-grid"><Reveal className="why-copy"><Eyebrow>Why choose us</Eyebrow><h2 id="why-title">More Than Care.<br/>A Healthier Tomorrow.</h2><p>We combine authentic Ayurvedic wisdom with modern scientific understanding to create personalized solutions for your unique journey.</p><Button to="/services">Our Approach</Button></Reveal>
      <div className="benefit-grid">{[['person','Personalized','Treatment Plans'],['leaf','Natural & Safe','Therapies'],['people','Experienced','Vaidyas & Experts'],['lotus','Holistic Mind–Body','Approach']].map(([icon,a,b],i) => <Reveal key={a} delay={i*80}><div className="benefit"><span><Icon type={icon}/></span><p>{a}<br/>{b}</p></div></Reveal>)}</div>
    </div><div className="landscape"><img src={`${base}why-choose-us.webp`} alt="Green foothills in the soft light of sunrise" loading="lazy"/><div>Healthy<br/>People<br/>Happier<br/>Worlds<Flourish/></div></div>
  </section>
}

function Programs() {
  return <section className="programs paper-surface" aria-labelledby="programs-title"><div className="container"><Reveal className="heading-row"><div><Eyebrow>Our programs</Eyebrow><h2 id="programs-title">Healing Journeys for Every Need</h2><p>Choose from our specialized programs, thoughtfully designed for your wellbeing.</p></div><Button to="/programs">View All Programs</Button></Reveal>
    <div className="program-grid">{journeys.map(([title,text,image],i) => <Reveal key={title} delay={i*75}><Link className="program-card" to="/programs"><div className="card-image"><img src={base+image} alt="" loading="lazy" width="600" height="280"/></div><div className="program-body"><h3>{title}</h3><p>{text}</p><span>Learn More <Arrow/></span></div></Link></Reveal>)}</div>
  </div></section>
}

function Experts() {
  return <section className="experts forest-surface" aria-labelledby="experts-title"><Branch className="experts-branch"/><div className="container expert-grid">
    <Reveal className="expert-quote"><blockquote>“Healing<br/>begins with<br/>listening.”</blockquote><span>— Our Vaidya</span></Reveal>
    <Reveal className="expert-portrait"><img src={`${base}doctor-portrait.webp`} width="760" height="878" alt="Portrait of one of our doctors in a white coat with a stethoscope" loading="lazy"/></Reveal>
    <Reveal className="expert-copy" delay={100}><Eyebrow>Meet our experts</Eyebrow><h2 id="experts-title">Guided by Experience.<br/>Driven by Compassion.</h2><p>Our team of experienced Ayurvedic doctors and wellness experts are dedicated to helping you live a healthier, more balanced life.</p><Button to="/about">Meet Our Team</Button></Reveal>
    <Reveal className="expert-values" delay={180}><div><strong>Personal</strong><span>Care designed around you</span></div><div><strong>Holistic</strong><span>A connected approach</span></div><div><strong>Natural</strong><span>Rooted in Ayurveda</span></div></Reveal>
  </div><Wave/></section>
}

function Testimonials() {
  const [index,setIndex] = useState(0)
  return <section className="testimonials paper-surface" aria-labelledby="testimonials-title"><div className="container"><Reveal className="testimonial-head"><div><Eyebrow>Real stories. Real wellbeing.</Eyebrow><h2 id="testimonials-title">What Our Patients Say</h2></div><div className="carousel-controls"><button type="button" aria-label="Previous testimonials" onClick={()=>setIndex(i=>(i+stories.length-1)%stories.length)}>‹</button><button type="button" aria-label="Next testimonials" onClick={()=>setIndex(i=>(i+1)%stories.length)}>›</button></div></Reveal>
    <div className="testimonial-grid" aria-live="polite">{stories.map((_,i)=>{const storyIndex=(i+index)%stories.length;const s=stories[storyIndex];return <article className="testimonial-card" key={s.name}><p>“{s.quote}”</p><div className="patient"><span className={`patient-avatar avatar-${storyIndex}`} aria-hidden="true">{s.initials}</span><span><strong>{s.name}</strong><small>{s.city}</small></span><span className="stars" aria-label="5 out of 5 stars">★★★★★</span></div></article>})}</div>
  </div></section>
}

function Articles() {
  return <section className="articles paper-surface" aria-labelledby="articles-title"><div className="container"><Reveal className="heading-row"><div><Eyebrow>Insights for a healthier you</Eyebrow><h2 id="articles-title">From Our Blog</h2><p>Explore expert advice, wellness tips and Ayurvedic wisdom.</p></div><Button to="/articles">View All Articles</Button></Reveal>
    <div className="article-grid">{posts.map(([title,image,date,time],i)=><Reveal key={title} delay={i*85}><Link className="article-card" to="/articles"><div className="card-image"><img src={base+image} alt="" loading="lazy" width="720" height="260"/></div><div><h3>{title}</h3><p className="article-meta">{date}<span>·</span>{time}</p></div></Link></Reveal>)}</div>
  </div></section>
}

function ConsultationCTA() {
  return <section className="consult-cta forest-surface"><Branch className="cta-branch"/><div className="container cta-grid"><Reveal><Eyebrow>Take the first step today</Eyebrow><h2>Your Journey to Better<br/>Health Begins Here.</h2></Reveal><Reveal delay={100}><p>Book a consultation and let our experts<br/>guide you to a healthier, happier you.</p><Button to="/book-consultation">Book a Consultation</Button></Reveal></div><img className="cta-photo" src={`${base}cta-ayurveda.webp`} alt="" aria-hidden="true" loading="lazy"/></section>
}

export default function HomePage() {
  return <main id="main-content" className="homepage"><Hero/><Philosophy/><Pillars/><WhyChoose/><Programs/><Experts/><Testimonials/><Articles/><ConsultationCTA/></main>
}
