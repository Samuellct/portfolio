import { kv } from '@vercel/kv';

type Comment = { id: string; author: string; content: string; date: string };
const isComment = (v: any): v is Comment =>
  v && typeof v.id === 'string' && typeof v.author === 'string' &&
  typeof v.content === 'string' && typeof v.date === 'string';

export default async function handler(req: any, res: any) {
  const ORIGIN =
    process.env.NODE_ENV === 'production'
      ? 'https://www.samuel-lecomte.fr'
      : 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS' || req.method === 'HEAD') return res.status(204).end();

  const id = Array.isArray(req.query?.id) ? req.query.id[0] : req.query?.id;
  if (!id) return res.status(400).json({ error: 'Invalid article id' });

  const key = `comments:list:${id}`;

  try {
    if (req.method === 'GET') {
      const raw = (await kv.lrange<any>(key, 0, -1)) ?? [];
      const items: Comment[] = [];
      for (const entry of raw) {
        let obj = entry;
        if (typeof entry === 'string') {
          try { obj = JSON.parse(entry); } catch { continue; }
        }
        if (isComment(obj)) items.push(obj);
      }
      return res.status(200).json({ items });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});
      const author = (body.author ?? '').toString().trim();
      const content = (body.content ?? '').toString().trim();
      if (!author || !content) return res.status(400).json({ error: 'Author and content required' });

      const comment: Comment = {
        id: Date.now().toString(),
        author: author.slice(0, 80),
        content: content.slice(0, 2000),
        date: new Date().toISOString(),
      };

      await kv.lpush(key, JSON.stringify(comment));
      await kv.ltrim(key, 0, 499);

      return res.status(201).json({ item: comment });
    }

    return res.status(405).json({ error: 'Method not allowed', method: req.method });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
