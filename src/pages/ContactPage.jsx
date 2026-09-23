import { useState } from 'react'
import { PageHero } from '../components/Blocks'
import { CONTACT, IMG, SERVICES, buildMailto } from '../data'
import { useI18n, usePageTitle } from '../i18n'
import { Reveal, tilt } from '../motion'
import { Button, Eyebrow, Icon } from '../ui'

function ContactCards() {
  const { t } = useI18n()
  const cards = [
    { icon: 'phone', label: t('contact.phoneLabel'), value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: 'mail', label: t('contact.emailLabel'), value: CONTACT.email, href: CONTACT.emailHref },
    { icon: 'pin', label: t('contact.clinicLabel'), value: t('contact.clinicValue') },
    { icon: 'video', label: t('contact.modesLabel'), value: t('contact.modesValue') },
  ]
  return <div className="contact-cards">
    {cards.map((c, i) => {
      const inner = <><span className="contact-icon"><Icon name={c.icon}/></span><span><small>{c.label}</small><strong>{c.value}</strong></span></>
      return <Reveal key={c.label} variant="up" delay={i * 80}>
        {c.href ? <a className="contact-card tilt" href={c.href} {...tilt}>{inner}</a> : <div className="contact-card tilt" {...tilt}>{inner}</div>}
      </Reveal>
    })}
  </div>
}

function BookingForm() {
  const { t } = useI18n()
  const f = (key) => t(`contact.form.${key}`)
  const [status, setStatus] = useState({ tone: '', text: '' })

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      setStatus({ tone: 'error', text: f('invalid') })
      return
    }
    const data = new FormData(form)
    const line = (label, key) => `${label}: ${data.get(key) || '—'}`
    const url = buildMailto(`${f('subject')} — ${data.get('name')}`, [
      line(f('name'), 'name'), line(f('email'), 'email'), line(f('phone'), 'phone'),
      line(f('area'), 'area'), line(f('mode'), 'mode'), line(f('date'), 'date'), line(f('time'), 'time'),
      '', line(f('message'), 'message'),
    ])
    window.location.href = url
    setStatus({ tone: 'success', text: f('success') })
  }

  return <form className="booking-form" onSubmit={submit} noValidate>
    <h2>{t('contact.formTitle')}</h2>
    <label>{f('name')}<input name="name" required autoComplete="name"/></label>
    <div className="form-row">
      <label>{f('email')}<input name="email" type="email" required autoComplete="email"/></label>
      <label>{f('phone')}<input name="phone" type="tel" required autoComplete="tel"/></label>
    </div>
    <div className="form-row">
      <label>{f('area')}<select name="area" required defaultValue=""><option value="" disabled>{f('areaPlaceholder')}</option>{SERVICES.map((s) => <option key={s.key}>{t(`services.items.${s.key}.title`)}</option>)}</select></label>
      <label>{f('mode')}<select name="mode" required defaultValue=""><option value="" disabled>{f('modePlaceholder')}</option>{f('modes').map((m) => <option key={m}>{m}</option>)}</select></label>
    </div>
    <div className="form-row">
      <label>{f('date')}<input name="date" type="date" required min={new Date().toISOString().slice(0, 10)}/></label>
      <label>{f('time')}<input name="time" type="time" required/></label>
    </div>
    <label>{f('message')}<textarea name="message" rows="4" placeholder={f('messagePlaceholder')}/></label>
    <label className="consent"><input type="checkbox" name="consent" required/><span>{f('consent')}</span></label>
    <Button type="submit" icon="mail">{f('submit')}</Button>
    <p className={`form-status ${status.tone}`} role="status">{status.text}</p>
  </form>
}

export default function ContactPage() {
  const { t } = useI18n()
  usePageTitle(t('contact.title'))
  return <main id="main-content">
    <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('contact.lead')} image={`${IMG}svc-assessment.webp`}/>
    <section className="section contact-section">
      <div className="container">
        <ContactCards/>
        <div className="booking-grid">
          <Reveal variant="left" className="booking-aside">
            <Eyebrow>{t('contact.expectTitle')}</Eyebrow>
            <ol className="expect-list">{t('contact.expectList').map((x, i) => <li key={x}><span>0{i + 1}</span>{x}</li>)}</ol>
            <div className="form-note"><Icon name="shield"/><span>{t('contact.emergency')}</span></div>
          </Reveal>
          <Reveal variant="up" delay={120}><BookingForm/></Reveal>
        </div>
      </div>
    </section>
  </main>
}
