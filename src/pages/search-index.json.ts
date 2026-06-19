import { getCollection } from 'astro:content';
import { getGlossary } from '../data/glossary';
import { type Lang, locales, localizePath, categoryLabel } from '../i18n/ui';

export const prerender = true;

interface SearchItem {
  id: string;
  lang: Lang;
  type: 'article' | 'tool' | 'glossary' | 'page';
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  text: string;
}

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_|~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const localized = {
  ru: {
    tools: 'Инструменты',
    glossary: 'Глоссарий',
    pages: 'Страница',
    toolItems: [
      ['FIDIC Tender Risk Lab', 'Оценка tender package: Contract Data, securities, ESHS, notices, DAAB, payment and design responsibility.', '/tools/tender-risk-lab'],
      ['Tender Clarification Generator', 'Генератор вопросов для clarification stage и commercial assumptions по tender risks.', '/tools/tender-clarification-generator'],
      ['Claim Readiness Checklist', 'Проверка готовности команды к notices, records, programme updates and evidence file.', '/tools/claim-readiness'],
      ['Claim File Template', 'Шаблон claim file: notice control, chronology, entitlement map, contemporary records, programme evidence, quantum and appendices.', '/tools/claim-file-template'],
      ['Notice Deadline Calculator', 'Расчет ключевых дат для claim notice и последующих submissions.', '/tools/notice-deadline'],
      ['FIDIC Book Selector', 'Выбор подходящей формы FIDIC по procurement, design и risk allocation.', '/tools/book-selector'],
      ['Pre-Bid Review', 'Экспертный review tender documents, Particular Conditions, securities, notices and claims workflow.', '/services/pre-bid-review'],
    ],
    pageItems: [
      ['База знаний', 'Статьи по FIDIC, EPC, claims, DAAB and MDB projects.', '/knowledge'],
      ['Серия FIDIC', 'Интерактивная радужная серия FIDIC и выбор книги.', '/#suite'],
      ['Сертификация', 'Подготовка к FCCE, FCCP и FIDIC certification.', '/certification'],
      ['Глоссарий FIDIC', 'Ключевые термины контрактов FIDIC простым языком.', '/glossary'],
    ],
  },
  en: {
    tools: 'Tools',
    glossary: 'Glossary',
    pages: 'Page',
    toolItems: [
      ['FIDIC Tender Risk Lab', 'Tender package risk screening: Contract Data, securities, ESHS, notices, DAAB, payment and design responsibility.', '/tools/tender-risk-lab'],
      ['Tender Clarification Generator', 'Generate clarification-stage questions and commercial assumptions for tender risks.', '/tools/tender-clarification-generator'],
      ['Claim Readiness Checklist', 'Check readiness for notices, records, programme updates and evidence file.', '/tools/claim-readiness'],
      ['Claim File Template', 'Build a claim file structure: notice control, chronology, entitlement map, contemporary records, programme evidence, quantum and appendices.', '/tools/claim-file-template'],
      ['Notice Deadline Calculator', 'Calculate key dates for claim notices and follow-up submissions.', '/tools/notice-deadline'],
      ['FIDIC Book Selector', 'Select the right FIDIC form by procurement, design and risk allocation.', '/tools/book-selector'],
      ['Pre-Bid Review', 'Expert review of tender documents, Particular Conditions, securities, notices and claims workflow.', '/services/pre-bid-review'],
    ],
    pageItems: [
      ['Knowledge Hub', 'Articles on FIDIC, EPC, claims, DAAB and MDB projects.', '/knowledge'],
      ['FIDIC Suite', 'Interactive FIDIC rainbow suite and book selection.', '/#suite'],
      ['Certification', 'Preparation for FCCE, FCCP and FIDIC certification.', '/certification'],
      ['FIDIC Glossary', 'Key FIDIC contract terms in plain language.', '/glossary'],
    ],
  },
  uz: {
    tools: 'Vositalar',
    glossary: 'Lug‘at',
    pages: 'Sahifa',
    toolItems: [
      ['FIDIC Tender Risk Lab', 'Tender package risk screening: Contract Data, securities, ESHS, notices, DAAB, payment va design responsibility.', '/tools/tender-risk-lab'],
      ['Tender Clarification Generator', 'Tender risklari uchun clarification questions va commercial assumptions yaratish.', '/tools/tender-clarification-generator'],
      ['Claim Readiness Checklist', 'Notices, records, programme updates va evidence file uchun jamoa tayyorgarligini tekshirish.', '/tools/claim-readiness'],
      ['Claim File Template', 'Claim file strukturasi: notice control, chronology, entitlement map, contemporary records, programme evidence, quantum va appendices.', '/tools/claim-file-template'],
      ['Notice Deadline Calculator', 'Claim notices va follow-up submissions uchun asosiy sanalarni hisoblash.', '/tools/notice-deadline'],
      ['FIDIC Book Selector', 'Procurement, design va risk allocation bo‘yicha mos FIDIC formasini tanlash.', '/tools/book-selector'],
      ['Pre-Bid Review', 'Tender documents, Particular Conditions, securities, notices va claims workflow ekspert review.', '/services/pre-bid-review'],
    ],
    pageItems: [
      ['Bilimlar bazasi', 'FIDIC, EPC, claims, DAAB va XTB loyihalari bo‘yicha maqolalar.', '/knowledge'],
      ['FIDIC seriyasi', 'Interaktiv FIDIC rainbow suite va kitob tanlash.', '/#suite'],
      ['Sertifikatsiya', 'FCCE, FCCP va FIDIC certificationga tayyorgarlik.', '/certification'],
      ['FIDIC lug‘ati', 'FIDIC shartnomalari asosiy atamalari oddiy tilda.', '/glossary'],
    ],
  },
} as const;

export async function GET() {
  const articles = await getCollection('articles');
  const items: SearchItem[] = [];

  for (const article of articles) {
    const [lang, ...slugParts] = article.id.split('/');
    if (lang !== 'ru' && lang !== 'en' && lang !== 'uz') continue;
    const slug = slugParts.join('/').replace(/\.mdx?$/, '');
    const data = article.data;
    items.push({
      id: `article:${article.id}`,
      lang,
      type: 'article',
      title: data.title,
      description: data.description,
      url: localizePath(`/knowledge/${slug}`, lang),
      category: categoryLabel(data.category, lang),
      tags: data.tags,
      text: stripMarkdown(article.body ?? ''),
    });
  }

  for (const lang of locales) {
    const c = localized[lang];

    for (const term of getGlossary(lang)) {
      items.push({
        id: `glossary:${lang}:${term.term}`,
        lang,
        type: 'glossary',
        title: `${term.term} — ${term.label}`,
        description: term.definition,
        url: `${localizePath('/glossary', lang)}?q=${encodeURIComponent(term.term)}`,
        category: c.glossary,
        tags: [term.category, term.label, term.term],
        text: `${term.term} ${term.label} ${term.definition}`,
      });
    }

    for (const [title, description, url] of c.toolItems) {
      items.push({
        id: `tool:${lang}:${url}`,
        lang,
        type: 'tool',
        title,
        description,
        url: localizePath(url, lang),
        category: c.tools,
        tags: ['FIDIC tools', 'contract administration', title],
        text: `${title} ${description}`,
      });
    }

    for (const [title, description, url] of c.pageItems) {
      items.push({
        id: `page:${lang}:${url}`,
        lang,
        type: 'page',
        title,
        description,
        url: localizePath(url, lang),
        category: c.pages,
        tags: [title],
        text: `${title} ${description}`,
      });
    }
  }

  return new Response(JSON.stringify({ generatedAt: new Date().toISOString(), items }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
