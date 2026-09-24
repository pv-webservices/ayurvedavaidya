// Language-independent site data. All visible copy lives in src/i18n/*.js.

export const IMG = '/images/v2/'
const LEGACY = '/images/ayurveda/'

export const CONTACT = {
  email: 'ayurvedavaidya@gmail.com',
  emailHref: 'mailto:ayurvedavaidya@gmail.com',
  phone: '+91 78959 11809',
  phoneHref: 'tel:+917895911809',
}

export const LOGO = `${LEGACY}ayurvedavaidya-logo.webp`

export const DOCTOR_IMAGES = {
  portrait: `${IMG}dr-tejendra-portrait.webp`,
  desk: `${IMG}dr-tejendra-desk.webp`,
  alt: `${IMG}dr-tejendra-alt.webp`,
}

export const QUALIFICATIONS = ['BAMS', 'MD (Ayu.)', 'MAPC (Clin. Psych.)', 'DNHE', 'CCIC', 'CCIM', 'PhD Ayurveda (Sch.)']

export const SERVICES = [
  { key: 'ayurveda', icon: 'leaf', image: `${IMG}svc-nadi.webp` },
  { key: 'nutrition', icon: 'bowl', image: `${IMG}svc-diet.webp` },
  { key: 'yoga', icon: 'lotus', image: `${IMG}svc-yoga.webp` },
  { key: 'mind-body-wellness', icon: 'mind', image: `${IMG}svc-counselling.webp` },
]

export const PROGRAMS = [
  { key: 'rejuvenation', image: `${IMG}svc-shirodhara.webp` },
  { key: 'metabolic', image: `${LEGACY}program-metabolic.webp` },
  { key: 'stress', image: `${LEGACY}program-stress-sleep.webp` },
  { key: 'preventive', image: `${IMG}svc-dinacharya.webp` },
]

export const PROCESS_IMAGES = [`${IMG}svc-online.webp`, `${IMG}svc-assessment.webp`, `${IMG}svc-dinacharya.webp`, DOCTOR_IMAGES.desk]

export const GALLERY = [
  { src: `${IMG}clinic-visit-1.webp`, w: 1100, h: 828 },
  { src: `${IMG}clinic-visit-3.webp`, w: 826, h: 1280 },
  { src: `${IMG}clinic-visit-4.webp`, w: 960, h: 1280 },
  { src: `${IMG}clinic-visit-2.webp`, w: 569, h: 1209 },
  { src: `${IMG}clinic-visit-5.webp`, w: 960, h: 1280 },
  { src: DOCTOR_IMAGES.alt, w: 1035, h: 1196 },
]

// Real client meetups, academic events and yoga sessions for the homepage hero wall, split into three drifting columns.
const clientPhoto = (n, w, h, kind) => ({ src: `${IMG}clients/client-${String(n).padStart(2, '0')}.webp`, w, h, kind })
export const CLIENT_WALL = [
  [clientPhoto(6, 820, 608, 'meetup'), clientPhoto(9, 592, 820, 'event'), clientPhoto(1, 820, 541, 'meetup'), clientPhoto(14, 820, 615, 'yoga'), clientPhoto(12, 615, 820, 'meetup')],
  [clientPhoto(2, 820, 737, 'meetup'), clientPhoto(8, 820, 820, 'yoga'), clientPhoto(13, 820, 615, 'meetup'), clientPhoto(11, 820, 546, 'event'), clientPhoto(4, 439, 820, 'meetup')],
  [clientPhoto(7, 820, 608, 'meetup'), clientPhoto(15, 800, 820, 'event'), clientPhoto(10, 820, 379, 'meetup'), clientPhoto(3, 607, 820, 'meetup'), clientPhoto(16, 820, 615, 'yoga'), clientPhoto(5, 820, 486, 'yoga')],
]
export const CLIENT_AVATARS = [6, 12, 2, 7].map((n) => `${IMG}clients/client-${String(n).padStart(2, '0')}.webp`)

export const POSTS = [
  { slug: 'understanding-prakriti', image: `${LEGACY}article-ayurveda.webp`, minutes: 5 },
  { slug: 'balanced-ayurvedic-plate', image: `${LEGACY}article-nutrition.webp`, minutes: 4 },
  { slug: 'breath-movement-stress', image: `${LEGACY}article-yoga.webp`, minutes: 6 },
]

export const IMAGES = {
  hero: `${IMG}hero-clinic.webp`,
  cta: `${IMG}cta-botanical.webp`,
  online: `${IMG}svc-online.webp`,
  forest: `${LEGACY}reference-forest.webp`,
  branch: `${LEGACY}reference-branch.webp`,
}

/** Builds a mailto: URL with an encoded subject and body. */
export function buildMailto(subject, lines) {
  const body = lines.filter(Boolean).join('\n')
  return `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
