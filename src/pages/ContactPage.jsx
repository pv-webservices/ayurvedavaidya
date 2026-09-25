import { useMemo, useState } from 'react'
import { PageHero } from '../components/Blocks'
import { DEFAULT_COUNTRY, DIAL_CODES, getCountryOptions } from '../countryCodes'
import { CONTACT, FORM_ENDPOINT, IMG, SERVICES } from '../data'
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

/** Phone input with a country dialling-code picker; the native select stays invisible over a compact "IN +91" chip. */
function PhoneField({ country, onCountryChange }) {
  const { t, lang } = useI18n()
  const options = useMemo(() => getCountryOptions(lang), [lang])
  return <label htmlFor="booking-phone">{t('contact.form.phone')}
    <span className="phone-field">
      <span className="country-picker">
        <span className="country-picker-value" aria-hidden="true">{country} +{DIAL_CODES[country]}<Icon name="chevron"/></span>
        <select name="country" aria-label={t('contact.form.countryCode')} value={country} onChange={(e) => onCountryChange(e.target.value)} autoComplete="country">
          {options.map((c) => <option key={c.iso} value={c.iso}>{c.name} (+{c.dial})</option>)}
        </select>
      </span>
      <input id="booking-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel-national" pattern="[\d\s\-\(\)]{5,20}"/>
    </span>
  </label>
}

function BookingForm() {
  const { t } = useI18n()
  const f = (key) => t(`contact.form.${key}`)
  const [status, setStatus] = useState({ tone: '', text: '' })
  const [isSending, setIsSending] = useState(false)
  const [country, setCountry] = useState(DEFAULT_COUNTRY)

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      setStatus({ tone: 'error', text: f('invalid') })
      return
    }
    const data = new FormData(form)
    const field = (key) => data.get(key) || '—'
    // Readable English labels so every enquiry arrives in the same format, whatever the site language.
    const payload = {
      Name: field('name'), email: field('email'), Phone: `+${DIAL_CODES[country]} ${field('phone')}`,
      'Consultation area': field('area'), 'Consultation mode': field('mode'),
      'Preferred date': field('date'), 'Preferred time': field('time'), Message: field('message'),
      _subject: `New consultation request — ${data.get('name')}`,
      _template: 'table',
      _honey: data.get('_honey') || '',
    }
    setIsSending(true)
    setStatus({ tone: '', text: f('sending') })
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || String(json.success) !== 'true') {
        // FormSubmit explains refusals (e.g. "This form needs Activation…"); show that reason next to the generic error.
        setStatus({ tone: 'error', text: json.message ? `${f('error')} (${json.message})` : f('error') })
        return
      }
      form.reset()
      setCountry(DEFAULT_COUNTRY)
      setStatus({ tone: 'success', text: f('success') })
    } catch {
      setStatus({ tone: 'error', text: f('error') })
    } finally {
      setIsSending(false)
    }
  }

  return <form className="booking-form" onSubmit={submit} noValidate>
    <h2>{t('contact.formTitle')}</h2>
    <input type="text" name="_honey" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <label>{f('name')}<input name="name" required autoComplete="name"/></label>
    <div className="form-row">
      <label>{f('email')}<input name="email" type="email" required autoComplete="email"/></label>
      <PhoneField country={country} onCountryChange={setCountry}/>
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
    <Button type="submit" icon="mail" disabled={isSending} aria-busy={isSending}>{isSending ? f('sending') : f('submit')}</Button>
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
