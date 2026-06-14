import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Серия FIDIC', 'Claims & споры', 'Проекты МФО', 'Сертификация', 'Практика']),
    readingTime: z.number().default(6),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('Bridge Consult'),
  }),
});

export const collections = { articles };
