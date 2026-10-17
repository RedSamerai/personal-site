import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 7 新式内容配置：使用 glob loader 收集 markdown 文件
// 每个文件 = 一个推荐分类（movies/music/books），frontmatter 含 items 数组
const recommendations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recommendations' }),
  schema: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        rating: z.number().min(0).max(10),
        link: z.string().optional(),
        cover: z.string().optional(),
      })
    ),
  }),
});

export const collections = { recommendations };
