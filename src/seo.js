// Search-engine metadata for every public route. Plain JS (no JSX) so both the app and the
// post-build prerender script (scripts/prerender.mjs) can import it. Copy is taken from the
// English dictionary, which is what search engines see (the chosen language lives in localStorage).
import { CONTACT, DOCTOR_IMAGES, IMG, LOGO, POSTS, QUALIFICATIONS, SERVICES } from './data.js'
import en from './i18n/en.js'

export const SITE_URL = 'https://ayurvedavaidya.com'
export const SITE_NAME = 'AyurvedaVaidya'
const DEFAULT_IMAGE = { src: DOCTOR_IMAGES.portrait, w: 760, h: 878 }
// Fallback page-hero background (PageHero in components/Blocks.jsx) — preloaded as the likely LCP image.
const PAGE_HERO_FALLBACK = `${IMG}hero-clinic.webp`

export const absoluteUrl = (path) => `${SITE_URL}${path}`
/** Public page URLs end in a slash: each route is published as a folder with an index.html, which
 * any static host serves as-is (no rewrite rules needed). Route paths in this file stay slash-free. */
export const pagePath = (path) => (path === '/' ? '/' : `${path}/`)
export const pageUrl = (path) => absoluteUrl(pagePath(path))

const titled = (text) => `${text} | ${SITE_NAME}`

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: absoluteUrl(LOGO),
  slogan: en.meta.tagline,
  email: CONTACT.email,
  telephone: CONTACT.phone.replace(/\s/g, ''),
}

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION['@id'] },
}

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/about/#person`,
  name: en.doctor.name,
  url: pageUrl('/about'),
  image: absoluteUrl(DOCTOR_IMAGES.portrait),
  jobTitle: 'Director & Chief Medical Officer',
  description: en.doctor.about[0],
  honorificSuffix: QUALIFICATIONS.slice(0, 3).join(', '),
  worksFor: { '@type': 'Organization', name: 'Ayurveda Clinic' },
  knowsAbout: ['Ayurveda', 'Clinical Psychology', 'Nutrition', 'Yoga', 'Integrative Healthcare'],
}

function breadcrumbs(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: pageUrl(path) })),
  }
}

const serviceRoutes = SERVICES.map((s) => {
  const item = en.services.items[s.key]
  const path = `/services/${s.key}`
  return {
    path,
    title: titled(item.subtitle),
    description: item.short,
    image: { src: s.image, w: 1200, h: 896 },
    hero: s.image,
    schema: [
      { '@type': 'Service', name: item.subtitle, serviceType: item.title, description: item.short, url: pageUrl(path), provider: { '@id': ORGANIZATION['@id'] }, category: item.list.slice(0, 6) },
      breadcrumbs([['Home', '/'], [en.services.pageTitle, '/services'], [item.title, path]]),
    ],
  }
})

const articleRoutes = POSTS.map((p) => {
  const post = en.journal.posts[p.slug]
  const path = `/articles/${p.slug}`
  return {
    path,
    type: 'article',
    title: titled(post.title),
    description: post.excerpt,
    image: { src: p.image, w: 1024, h: 768 },
    hero: p.image,
    schema: [breadcrumbs([['Home', '/'], ['Journal', '/articles'], [post.title, path]])],
  }
})

const legalRoute = (type) => ({ path: `/${type}`, title: titled(en.legal[type]), description: en.legal.pages[type].description, hero: PAGE_HERO_FALLBACK })

/** Every public route. `noindex` routes are kept out of the sitemap and carry a robots noindex tag. */
export const ROUTES = [
  {
    path: '/',
    title: `${SITE_NAME} | ${en.meta.homeTitle}`,
    description: 'Personal Ayurvedic consultations with Dr. Tejendra Singh — BAMS, MD (Ayu.), MAPC (Clin. Psych.) — bringing Ayurveda, clinical psychology, nutrition and yoga together. Online, phone and in-clinic.',
    schema: [WEBSITE],
  },
  {
    path: '/about',
    type: 'profile',
    title: titled('Dr. Tejendra Singh — Ayurvedic Physician & Academician'),
    description: 'Dr. Tejendra Singh — BAMS, MD (Ayu.), MAPC (Clin. Psych.) — Ayurvedic physician, academician and Director & CMO at Ayurveda Clinic. Qualifications, professional journey and approach to care.',
    image: { src: DOCTOR_IMAGES.alt, w: 1035, h: 1196 },
    hero: DOCTOR_IMAGES.alt,
    schema: [{ '@type': 'ProfilePage', url: pageUrl('/about'), mainEntity: PERSON }],
  },
  {
    path: '/services',
    title: titled('Ayurveda, Nutrition, Yoga & Mind–Body Consultations'),
    description: `${en.services.pageLead} Every consultation is led by Dr. Tejendra Singh.`,
    hero: PAGE_HERO_FALLBACK,
    schema: [breadcrumbs([['Home', '/'], [en.services.pageTitle, '/services']])],
  },
  ...serviceRoutes,
  {
    path: '/programs',
    title: titled('Ayurvedic Wellness Programs'),
    description: 'Physician-supervised programs for detox & rejuvenation, weight & metabolic balance, stress & sleep, and seasonal & preventive wellness.',
    image: { src: `${IMG}svc-shirodhara.webp`, w: 1200, h: 896 },
    hero: `${IMG}svc-shirodhara.webp`,
  },
  {
    path: '/articles',
    title: titled('Journal — Ayurveda, Nutrition & Wellbeing Articles'),
    description: en.journal.lead,
    hero: POSTS[0].image,
  },
  ...articleRoutes,
  {
    path: '/book-consultation',
    title: titled('Book a Consultation with Dr. Tejendra Singh'),
    description: `Book an online, phone or in-clinic consultation with Dr. Tejendra Singh. Call ${CONTACT.phone}, email ${CONTACT.email}, or send a consultation request.`,
    image: { src: `${IMG}svc-assessment.webp`, w: 1200, h: 896 },
    hero: `${IMG}svc-assessment.webp`,
  },
  legalRoute('privacy'),
  legalRoute('terms'),
  legalRoute('disclaimer'),
]

export const NOT_FOUND_META = { path: null, title: titled(en.notFound.title), description: en.notFound.text, noindex: true, hero: PAGE_HERO_FALLBACK }

/** Duplicate app routes → preferred route. Published as redirect pages (see scripts/prerender.mjs). */
export const REDIRECTS = { '/contact': '/book-consultation', '/ayurveda': '/services/ayurveda' }

export function getRouteMeta(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const path = REDIRECTS[clean] ?? clean
  return ROUTES.find((r) => r.path === path) ?? null
}

/** Resolved head values for a route (or the 404 meta). */
export function headFor(route) {
  const image = route.image ?? DEFAULT_IMAGE
  return {
    title: route.title,
    description: route.description,
    robots: route.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    canonical: route.path && !route.noindex ? pageUrl(route.path) : null,
    ogType: route.type ?? 'website',
    image: { ...image, url: absoluteUrl(image.src) },
  }
}

/**
 * Head tags (besides <title> and JSON-LD) as data: [attribute, key, value] for <meta>,
 * or ['rel', 'canonical', href] for the canonical <link>. A null value means "omit".
 */
export function headTags(route) {
  const h = headFor(route)
  return [
    ['name', 'description', h.description],
    ['name', 'robots', h.robots],
    ['rel', 'canonical', h.canonical],
    ['property', 'og:site_name', SITE_NAME],
    ['property', 'og:type', h.ogType],
    ['property', 'og:title', h.title],
    ['property', 'og:description', h.description],
    ['property', 'og:url', h.canonical],
    ['property', 'og:image', h.image.url],
    ['property', 'og:image:width', String(h.image.w)],
    ['property', 'og:image:height', String(h.image.h)],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', h.title],
    ['name', 'twitter:description', h.description],
    ['name', 'twitter:image', h.image.url],
  ]
}

/** JSON-LD graph: the organization on every page plus page-specific nodes. */
export function jsonLdFor(route) {
  if (!route.path || route.noindex) return null
  return { '@context': 'https://schema.org', '@graph': [ORGANIZATION, ...(route.schema ?? [])] }
}
