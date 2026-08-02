import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    /**
     * Shorter title for <title> only; the H1 keeps `title`. Google truncates
     * around 65 characters, and a heading that reads well on the page is often
     * longer than that — without this the informative half is what gets cut.
     * Set it only where `title` exceeds the limit.
     */
    seoTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    // Last substantive revision. Feeds schema.org dateModified so Google sees a
    // freshness signal distinct from first publication.
    updated: z.coerce.date().optional(),
    category: z.enum(['suite', 'claims', 'mdb', 'certification', 'practice']),
    readingTime: z.number().default(6),
    tags: z.array(z.string()).default([]),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('Bridge Consult'),
    /** Key into src/data/authors.ts; unset falls back to the firm's principal. */
    authorSlug: z.string().optional(),
  }),
});

export const collections = { articles };
