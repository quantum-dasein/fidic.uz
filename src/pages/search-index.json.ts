import { getCollection } from 'astro:content';
import { getGlossary } from '../data/glossary';
import { type Lang, locales, localizePath, categoryLabel } from '../i18n/ui';

export const prerender = true;

interface SearchItem {
  id: string;
  lang: Lang;
  type: 'article' | 'tool' | 'glossary' | 'page' | 'resource';
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
      ['Contract Risk Score', 'Единый индекс риска контракта: tender package, LD cap, EOT evidence, payment, claims readiness and MDB compliance.', '/tools/contract-risk-score'],
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
      ['Сравнение редакций 1999 → 2017 → 2022', 'Постатейная разница между изданиями FIDIC: claims, споры, роль Инженера, структура.', '/knowledge/editions-1999-2017-2022'],
      ['FIDIC и право Узбекистана', 'Как свести стандарт FIDIC с местным правом: применимое право, валюта, арбитраж, форс-мажор, налоги и гарантии.', '/knowledge/fidic-and-uzbek-law'],
      ['Кейсы проектов МФО', 'Контрактные профили проектов МФО в Центральной Азии: A-380 (CAREC), водоснабжение Самарканда.', '/mdb-project-cases'],
      ['FIDIC Claims Playbook', 'PDF-ready playbook по notice, records, EOT, quantum, DAAB и структуре claim file.', '/resources/fidic-claims-playbook'],
      ['5 писем про claims', 'Email-серия о claim notice, records, EOT, quantum и DAAB.', '/resources/claims-email-series'],
    ],
  },
  en: {
    tools: 'Tools',
    glossary: 'Glossary',
    pages: 'Page',
    toolItems: [
      ['Contract Risk Score', 'One contract risk index covering tender package, LD cap, EOT evidence, payment, claims readiness and MDB compliance.', '/tools/contract-risk-score'],
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
      ['Editions compared 1999 → 2017 → 2022', 'Clause-by-clause differences between FIDIC editions: claims, disputes, the Engineer’s role, structure.', '/knowledge/editions-1999-2017-2022'],
      ['FIDIC and Uzbek law', 'How to reconcile the FIDIC standard with local law: governing law, currency, arbitration, force majeure, taxes and guarantees.', '/knowledge/fidic-and-uzbek-law'],
      ['MDB project cases', 'Contract profiles of MDB projects in Central Asia: A-380 (CAREC), Samarkand water supply.', '/mdb-project-cases'],
      ['FIDIC Claims Playbook', 'PDF-ready playbook for notice, records, EOT, quantum, DAAB and claim file structure.', '/resources/fidic-claims-playbook'],
      ['5 emails on claims', 'Email series on claim notice, records, EOT, quantum and DAAB.', '/resources/claims-email-series'],
    ],
  },
  uz: {
    tools: 'Vositalar',
    glossary: 'Lug‘at',
    pages: 'Sahifa',
    toolItems: [
      ['Contract Risk Score', 'Tender package, LD cap, EOT evidence, payment, claims readiness va MDB compliance bo‘yicha yagona contract risk indeksi.', '/tools/contract-risk-score'],
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
      ['Nashrlar taqqoslovi 1999 → 2017 → 2022', 'FIDIC nashrlari orasidagi band-band farqlar: claims, nizolar, Muhandis roli, tuzilma.', '/knowledge/editions-1999-2017-2022'],
      ['FIDIC va Oʻzbekiston huquqi', 'FIDIC standartini mahalliy huquq bilan moslashtirish: amaldagi huquq, valyuta, arbitraj, fors-major, soliqlar va kafolatlar.', '/knowledge/fidic-and-uzbek-law'],
      ['XTB loyiha keyslari', 'Markaziy Osiyodagi XTB loyihalarining shartnoma profillari: A-380 (CAREC), Samarqand suv taʼminoti.', '/mdb-project-cases'],
      ['FIDIC Claims Playbook', 'Notice, records, EOT, quantum, DAAB va claim file strukturasi bo‘yicha PDF-ready playbook.', '/resources/fidic-claims-playbook'],
      ['Claims bo‘yicha 5 xat', 'Claim notice, records, EOT, quantum va DAAB bo‘yicha email seriya.', '/resources/claims-email-series'],
    ],
  },
} as const;

const resourceItems = {
  ru: {
    category: 'Материалы',
    items: [
      ['Бесплатные материалы FIDIC.uz', 'Чеклисты, регистры и практические инструменты для claims, tender review, notices and risk register.', '/resources'],
      ['FIDIC Claims Playbook', 'PDF-ready playbook по notice, records, EOT, quantum, DAAB и структуре claim file.', '/resources/fidic-claims-playbook'],
      ['Чеклист готовности FIDIC-claim', 'Бесплатный чеклист из 12 пунктов перед подачей claim: notices, records, causation, delay analysis and quantum.', '/resources/claim-checklist'],
      ['Проверка сертификата Bridge Consult', 'Проверка сертификата по QR-коду или регистрационному номеру в публичном реестре.', '/verify/'],
    ],
  },
  en: {
    category: 'Resources',
    items: [
      ['Free FIDIC.uz resources', 'Checklists, registers and practical tools for claims, tender review, notices and risk register.', '/resources'],
      ['FIDIC Claims Playbook', 'PDF-ready playbook for notice, records, EOT, quantum, DAAB and claim file structure.', '/resources/fidic-claims-playbook'],
      ['FIDIC claim readiness checklist', 'A free 12-point checklist before submitting a claim: notices, records, causation, delay analysis and quantum.', '/resources/claim-checklist'],
      ['Bridge Consult certificate verification', 'Verify a certificate by QR code or registry number in the public certificate register.', '/verify/'],
    ],
  },
  uz: {
    category: 'Materiallar',
    items: [
      ['Bepul FIDIC.uz materiallari', 'Claims, tender review, notices va risk register uchun cheklistlar va amaliy vositalar.', '/resources'],
      ['FIDIC Claims Playbook', 'Notice, records, EOT, quantum, DAAB va claim file strukturasi bo‘yicha PDF-ready playbook.', '/resources/fidic-claims-playbook'],
      ['FIDIC claim tayyorgarligi cheklisti', 'Claim topshirishdan oldin 12 punktli bepul cheklist: notices, records, causation, delay analysis va quantum.', '/resources/claim-checklist'],
      ['Bridge Consult sertifikatini tekshirish', 'QR kod yoki reestr raqami orqali sertifikatni ommaviy reestrda tekshirish.', '/verify/'],
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

    for (const [title, description, url] of resourceItems[lang].items) {
      items.push({
        id: `resource:${lang}:${url}`,
        lang,
        type: 'resource',
        title,
        description,
        url: url === '/verify/' ? url : localizePath(url, lang),
        category: resourceItems[lang].category,
        tags: ['FIDIC resources', 'checklist', 'template', title],
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
