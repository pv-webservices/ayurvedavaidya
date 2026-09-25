import { Link, useParams } from 'react-router-dom'
import { ArticleCard, ContactCTA, PageHero } from '../components/Blocks'
import { POSTS } from '../data'
import { useI18n, usePageTitle } from '../i18n'
import { Reveal } from '../motion'
import { Icon } from '../ui'
import NotFound from './NotFound'

export function ArticlesPage() {
  const { t } = useI18n()
  usePageTitle(t('journal.title'))
  return <main id="main-content">
    <PageHero eyebrow={t('journal.eyebrow')} title={t('journal.title')} lead={t('journal.lead')} image={POSTS[0].image}/>
    <section className="section journal">
      <div className="container article-grid">{POSTS.map((post, i) => <ArticleCard key={post.slug} post={post} delay={i * 110}/>)}</div>
    </section>
    <ContactCTA/>
  </main>
}

export function ArticlePage() {
  const { slug } = useParams()
  const { t } = useI18n()
  const post = POSTS.find((p) => p.slug === slug)
  const copy = post ? t(`journal.posts.${post.slug}`) : null
  usePageTitle(copy?.title ?? t('notFound.title'))
  if (!post) return <NotFound/>

  const others = POSTS.filter((p) => p.slug !== slug)
  return <main id="main-content">
    <PageHero eyebrow={copy.category} title={copy.title} lead={`${post.minutes} ${t('journal.minRead')}`} image={post.image}/>
    <section className="section article-page">
      <div className="container article-layout">
        <article className="article-content">
          <Link to="/articles/" className="back-link"><Icon name="left"/>{t('journal.back')}</Link>
          <p className="article-excerpt">{copy.excerpt}</p>
          {copy.body.map((para, i) => <Reveal key={para} variant="up" delay={i * 60}><p>{para}</p></Reveal>)}
          <p className="article-disclaimer"><Icon name="shield"/>{t('journal.disclaimer')}</p>
        </article>
        <aside className="article-aside">
          <h2 className="mini-title">{t('journal.eyebrow')}</h2>
          {others.map((p) => <Link key={p.slug} to={`/articles/${p.slug}/`} className="aside-post">
            <img src={p.image} alt="" loading="lazy" width="720" height="480"/>
            <span><small>{t(`journal.posts.${p.slug}.category`)}</small>{t(`journal.posts.${p.slug}.title`)}</span>
          </Link>)}
        </aside>
      </div>
    </section>
    <ContactCTA/>
  </main>
}
