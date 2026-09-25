import { Link } from 'react-router-dom'
import { ContactCTA, PageHero } from '../components/Blocks'
import { SERVICES } from '../data'
import { useI18n, usePageTitle } from '../i18n'
import { Reveal, tilt } from '../motion'
import { Button, Eyebrow, Icon } from '../ui'

function ServiceBand({ service, index, headingLevel = 'h2' }) {
  const { t } = useI18n()
  const item = t(`services.items.${service.key}`)
  const Heading = headingLevel
  return <article className={`service-band ${index % 2 ? 'is-flipped' : ''}`} id={service.key}>
    <Reveal variant={index % 2 ? 'right' : 'left'} className="service-media">
      <img src={service.image} alt="" loading="lazy" width="1200" height="896"/>
      <span className="service-index">0{index + 1}</span>
    </Reveal>
    <Reveal variant="up" delay={120} className="service-copy">
      <Eyebrow><Icon name={service.icon}/> {item.title}</Eyebrow>
      <Heading>{item.subtitle}</Heading>
      <p className="section-lead">{item.short}</p>
      <h3 className="mini-title">{t('services.covers')}</h3>
      <ul className="service-items">{item.list.map((x) => <li key={x}><Icon name="check"/>{x}</li>)}</ul>
      <Button to="/book-consultation/" icon="calendar">{t('services.discuss')}</Button>
    </Reveal>
  </article>
}

export default function ServicesPage({ single }) {
  const { t } = useI18n()
  const service = single ? SERVICES.find((s) => s.key === single) : null
  const item = service ? t(`services.items.${service.key}`) : null
  usePageTitle(item ? item.title : t('services.pageTitle'))

  const list = service ? [service] : SERVICES
  const others = service ? SERVICES.filter((s) => s.key !== service.key) : []

  return <main id="main-content">
    <PageHero eyebrow={item ? item.title : t('services.pageEyebrow')} title={item ? item.subtitle : t('services.pageTitle')} lead={item ? item.short : t('services.pageLead')} image={service?.image}/>
    <section className="section services-list">
      <div className="container">
        {list.map((s) => <ServiceBand key={s.key} service={s} index={SERVICES.indexOf(s)}/>)}
      </div>
    </section>
    {others.length > 0 && <section className="section other-services">
      <div className="container">
        <Reveal variant="up"><h2 className="principles-title">{t('services.others')}</h2></Reveal>
        <div className="mini-card-grid">
          {others.map((s, i) => <Reveal key={s.key} variant="up" delay={i * 90}>
            <Link to={`/services/${s.key}/`} className="mini-card tilt" {...tilt}>
              <img src={s.image} alt="" loading="lazy" width="1200" height="896"/>
              <span className="mini-card-body"><Icon name={s.icon}/><strong>{t(`services.items.${s.key}.title`)}</strong><small>{t(`services.items.${s.key}.subtitle`)}</small><Icon name="arrow" className="mini-card-arrow"/></span>
            </Link>
          </Reveal>)}
        </div>
      </div>
    </section>}
    <ContactCTA/>
  </main>
}
