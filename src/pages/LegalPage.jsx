import { PageHero } from '../components/Blocks'
import { CONTACT } from '../data'
import { useI18n, usePageTitle } from '../i18n'

export default function LegalPage({ type }) {
  const { t } = useI18n()
  const title = t(`legal.${type}`)
  usePageTitle(title)
  return <main id="main-content">
    <PageHero eyebrow={t('legal.eyebrow')} title={title} lead={t('legal.draft')}/>
    <section className="section legal-page">
      <div className="container legal-body">
        {type === 'disclaimer' && <p className="doctor-lead">{t('legal.disclaimerText')}</p>}
        <h2>{t('legal.reviewTitle')}</h2>
        <p>{t('legal.reviewText')}</p>
        <p><a href={CONTACT.emailHref}>{CONTACT.email}</a> · <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
      </div>
    </section>
  </main>
}
