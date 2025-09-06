import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid article id' });
  }

  const keyCount = `likes:count:${id}`;
  const keySet = `likes:set:${id}`; // pour éviter les double-like

  try {
    if (req.method === 'GET') {
      const count = (await kv.get<number>(keyCount)) ?? 0;
      return res.status(200).json({ count });
    }

    if (req.method === 'POST') {
      // Empêcher le double-like par fingerprint simple
      const fingerprint =
        req.headers['x-forwarded-for']?.toString().split(',')[0] +
        ':' +
        (req.headers['user-agent'] ?? 'unknown');

      const added = await kv.sadd(keySet, fingerprint);
      let count = (await kv.get<number>(keyCount)) ?? 0;

      if (added === 1) {
        count = await kv.incr(keyCount);
      }

      return res.status(200).json({ count, liked: added === 1 });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}