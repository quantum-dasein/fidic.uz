import { site } from '../data/site';

export const prerender = true;

const commands = [
  {
    command: '/ld',
    title: 'LD vs cap',
    description: 'Check liquidated damages against the contractual cap.',
    url: '/tools/calculators/liquidated-damages/',
  },
  {
    command: '/eot',
    title: 'EOT delay',
    description: 'Estimate delay, EOT window and critical dates.',
    url: '/tools/calculators/eot-delay/',
  },
  {
    command: '/notice',
    title: 'Notice deadlines',
    description: 'Calculate 28-day notices and follow-up submissions.',
    url: '/tools/notice-deadline/',
  },
  {
    command: '/claim',
    title: 'Claim readiness',
    description: 'Check notices, records, programme updates and evidence file readiness.',
    url: '/tools/claim-readiness/',
  },
  {
    command: '/book',
    title: 'Book selector',
    description: 'Select the most suitable FIDIC form by procurement, design and risk allocation.',
    url: '/tools/book-selector/',
  },
  {
    command: '/risk',
    title: 'Tender risk',
    description: 'Map tender package risk before pricing.',
    url: '/tools/tender-risk-lab/',
  },
  {
    command: '/score',
    title: 'Contract Risk Score',
    description: 'Combine tender, LD, EOT, payment, claims and MDB signals into one risk index.',
    url: '/tools/contract-risk-score/',
  },
];

export function GET() {
  return new Response(JSON.stringify({
    name: 'FIDIC.uz Telegram command map',
    handle: site.contacts.telegramHandle,
    updated: '2026-07-04',
    note: 'Use these commands as the public contract for a future Telegram bot webhook.',
    commands: commands.map((item) => ({
      ...item,
      absoluteUrl: `${site.url}${item.url}`,
    })),
  }, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
