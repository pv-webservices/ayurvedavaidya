import { ContactCTA, PageHero, ProgramStack } from '../components/Blocks'
import { IMG } from '../data'
import { useI18n, usePageTitle } from '../i18n'

export default function ProgramsPage() {
  const { t } = useI18n()
  usePageTitle(t('programs.eyebrow'))
  return <main id="main-content">
    <PageHero eyebrow={t('programs.eyebrow')} title={t('programs.pageTitle')} lead={t('programs.pageLead')} image={`${IMG}svc-shirodhara.webp`}/>
    <section className="section programs programs-page">
      <div className="container stack-solo"><ProgramStack headingLevel="h2"/></div>
    </section>
    <ContactCTA/>
  </main>
}
