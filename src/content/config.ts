import { defineCollection, z } from 'astro:content';

const releases = defineCollection({
  type: 'content',
  schema: z.object({
    version: z.string(),
    date: z.date(),
    title: z.string(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { releases };
