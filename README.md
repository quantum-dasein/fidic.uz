# FIDIC.uz — infrastructure contracts knowledge platform

An independent knowledge platform for FIDIC contracts, EPC, claims, DAAB and
MDB-funded projects in Uzbekistan and Central Asia. A Bridge Consult project.

**Live:** <https://fidic.uz> · Russian, English, Uzbek · 421 URLs in the sitemap

Built with Astro, Tailwind CSS 4 and MDX. Dark editorial design — "Blueprint &
Brass" (Fraunces + Inter + IBM Plex Mono) — with a Three.js hero scene, Lenis
smooth scrolling, a custom cursor and tilt cards, all of which stay on the home
page so the other 400 pages load without them.

---

## What is on it

| Section | Path | What it does |
|---|---|---|
| Knowledge base | `/knowledge/`, `/knowledge/[slug]/` | **39 articles per language, 117 in total**, as MDX with category filtering |
| The rainbow suite | `/#suite` | The nine FIDIC books as an interactive shelf — risk profile, key clauses, applicability in Uzbekistan |
| Clause reference | `/clauses/` | 27 clauses with practice notes |
| Tools | `/tools/` | Nine interactive tools: contract map, book selector and comparison, risk scoring, claim readiness, notice deadlines, tender risk lab, clarification generator, claim-file template |
| Calculators | `/tools/calculators/` | Five: EOT delay, time bar, DAAB timeline, interim payment, liquidated damages |
| Resources | `/resources/` | Six downloadables — claims playbook, notice register (28/84), decision tree, MDB tender checklist, claim checklist, an email series |
| Tenders | `/tenders/` | A live snapshot of Central Asia / Caucasus notices from the World Bank Procurement Notices API |
| Certification | `/certification/` | FCCE/FCCP guidance and an interactive mock test |
| Certificate registry | `/verify/[id]/` | Every training certificate issued by the Academy, verifiable by QR. Force-noindexed, so personal data never reaches search results |
| MDB project cases | `/mdb-project-cases/` | Real project casework |
| Glossary | `/glossary/` | 26 FIDIC terms with live search |
| Ask FIDIC AI | `/#ask` | A FIDIC assistant, streamed from `api/ask.js` |
| Summer School | `/ka/` | The Georgia programme landing page |

Feeds and machine endpoints: `/rss.xml`, `/search-index.json`,
`/telegram-commands.json`.

## Languages

Russian at the root, English under `/en/`, Uzbek under `/uz/`. The header
switcher keeps the scroll position rather than jumping to the top.

- Every interface string is in one dictionary, `src/i18n/ui.ts`, in all three
  languages — no section can quietly forget a language.
- The data — books, clauses, glossary, quiz, FAQ, the DAAB dispute ladder — is
  translated in all three.
- Articles live in `src/content/articles/{ru,en,uz}/`. Each language shows only
  its own, so languages never mix on a page.
- On an article, the switcher goes to the translation when there is one and to
  that language's knowledge base when there is not. It never 404s.
- Article categories are stored as neutral keys (`suite`, `claims`, `mdb`,
  `certification`, `practice`) and translated at render time.

To add a translation, create a file with the same name under
`src/content/articles/en/` or `/uz/`.

## Serverless functions

`api/` holds three Vercel functions. Astro does not build them; Vercel picks
them up.

| Function | What it does |
|---|---|
| `api/ask.js` | The AI assistant. A paid public endpoint — see the guard rails below. |
| `api/lead.js` | Form submissions → Telegram |
| `api/og.js` | Social cards, rendered on demand with `@vercel/og` |

### Environment

The site works fully without any of these: the assistant shows a polite "write
to us on Telegram" message, and the form falls back to a pre-filled `mailto:`.
Set them in **Vercel → Settings → Environment Variables** to switch the rest on.

| Variable | Used by | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | `api/ask.js` | Required for the assistant |
| `FIDIC_AI_MODEL` | `api/ask.js` | Optional. Start with a small, fast model on a public endpoint and raise it if the answers need it. |
| `TELEGRAM_BOT_TOKEN` | `api/lead.js` | From @BotFather |
| `TELEGRAM_CHAT_ID` | `api/lead.js` | Recipient id — @userinfobot will tell you yours |

`api/ask.js` already caps message length and history depth. Keep those caps:
this endpoint is public and every call is billable.

## Running it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → ./dist
npm run preview
```

Node 22.12+.

| Command | What it does |
|---|---|
| `npm run tenders:refresh` | Pulls a fresh tender snapshot from the World Bank API into `src/data/tenders.json` |
| `npm run audit:seo` | Performance and SEO pass over the built output |
| `npm run check:og` | Renders every real page title and flags OG cards where it truncates |
| `npm run indexnow` | Pings IndexNow with changed URLs |
| `node scripts/issue-cert.mjs` | Issues a certificate into the registry |
| `node scripts/changed-urls.mjs` | Maps changed source files to the public URLs they render — feeds IndexNow |

> `package.json` pins `"overrides": { "vite": "7.3.5" }`. **Leave it.** Without
> it `@tailwindcss/vite` pulls vite 8, which does not agree with the vite 7
> inside Astro 6, and the build fails. The pin is deliberate.

## SEO

- Unique title, description and keywords per URL; canonical and hreflang across
  all three languages.
- JSON-LD: `WebSite`, `Organization`, `Article` and `BreadcrumbList` on articles,
  `FAQPage` on the home page.
- Auto-generated `sitemap-index.xml`, `robots.txt`, OG/Twitter tags, geo meta.
- IndexNow submission wired to the changed-URL map, so a deploy tells the search
  engines which pages moved rather than resubmitting the whole site.

## Structure

```
fidic.uz/
├── api/                    # Vercel serverless — ask, lead, og
├── docs/
├── public/
├── scripts/                # tenders, IndexNow, OG check, certificates, SEO audit
├── src/
│   ├── components/
│   ├── content/articles/   # {ru,en,uz}/*.mdx
│   ├── data/               # books, clauses, glossary, quiz, tenders, certificates, …
│   ├── i18n/ui.ts          # one dictionary, three languages
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
└── vercel.json
```

Facts live in `src/data/`, not in markup: correcting a clause or a book means
editing one file, not hunting through templates.

---

FIDIC® is a registered mark of the Fédération Internationale des Ingénieurs-
Conseils. This site is informational and not affiliated with FIDIC.
