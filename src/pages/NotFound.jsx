import { PageHero } from '../components/Blocks'
import { useI18n, usePageTitle } from '../i18n'
import { Button } from '../ui'

export default function NotFound() {
  const { t } = useI18n()
  usePageTitle(t('notFound.title'))
  return <main id="main-content">
    <PageHero eyebrow="404" title={t('notFound.title')} lead={t('notFound.text')}>
      <Button to="/">{t('notFound.home')}</Button>
    </PageHero>
  </main>
}
