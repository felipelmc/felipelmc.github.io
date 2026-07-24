import rss from '@astrojs/rss';
import { news } from '../data/news';

export function GET(context) {
  return rss({
    title: 'Felipe Lamarca – News',
    description: 'Research updates from Felipe Lamarca, computational political scientist (IESP-UERJ).',
    site: context.site,
    trailingSlash: false,
    items: news.map((item) => ({
      title: item.text.en,
      description: item.text.en,
      pubDate: new Date(item.date),
      // The date fragment keeps each item's guid unique — several items share
      // the same target page, and feed readers dedupe by guid.
      link: `${item.href ?? '/'}#news-${item.date}`,
    })),
  });
}
