import { kv } from '@vercel/kv';

type Comment = { id: string; author: string; content: string; date: string };

function isComment(v: any): v is Comment {
  return v && typeof v.id === 'string' && typeof v.author === 'string'
    && typeof v.content === 'string' && typeof v.date === 'string';
}

export default async function handler(req: any, res: any) {
  const { id } = req.query || {};
  if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid article id' });

  const key = `comments:list:${id}`;

  try {
    if (req.method === 'GET') {
      const raw = (await kv.lrange<any>(key, 0, -1)) ?? [];
      const items: Comment[] = [];

      for (const entry of raw) {
        // Cas 1: on a stocké une string JSON => parse
        if (typeof entry === 'string') {
          try {
            const obj = JSON.parse(entry);
            if (isComment(obj)) items.push(obj);
          } catch {
            // entrée corrompue (ex: "[object Object]") -> on ignore
            continue;
          }
        } else {
          // Cas 2: on a stocké un objet (pas recommandé) -> on tente de le valider tel quel
          if (isComment(entry)) items.push(entry);
        }
      }

      return res.status(200).json({ items });
    }

    if (req.method === 'POST') {
      // body peut être string si pas parsé; on normalise
      const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});
      const author = (body.author ?? '').toString();
      const content = (body.content ?? '').toString();

      if (!author.trim() || !content.trim()) {
        return res.status(400).json({ error: 'Author and content required' });
      }

      const comment: Comment = {
        id: Date.now().toString(),
        author: author.trim().slice(0, 80),
        content: content.trim().slice(0, 2000),
        date: new Date().toISOString()
      };

      // IMPORTANT: on stocke **toujours** une string JSON
      await kv.lpush(key, JSON.stringify(comment));
      await kv.ltrim(key, 0, 499);

      return res.status(201).json({ item: comment });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
