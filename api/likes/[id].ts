import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  // CORS safe (même si pas strictement nécessaire en same-origin)
  const ORIGIN =
    process.env.NODE_ENV === 'production'
      ? 'https://www.samuel-lecomte.fr'
      : 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Préflight / HEAD -> pas d'erreur 405
  if (req.method === 'OPTIONS' || req.method === 'HEAD') return res.status(204).end();

  const id = Array.isArray(req.query?.id) ? req.query.id[0] : req.query?.id;
  if (!id) return res.status(400).json({ error: 'Invalid article id' });

  const keyCount = `likes:count:${id}`;
  const keySet = `likes:set:${id}`;

  try {
    if (req.method === 'GET') {
      const count = (await kv.get<number>(keyCount)) ?? 0;
      return res.status(200).json({ count });
    }

    if (req.method === 'POST') {
      // anti-double-like (empreinte ultra simple)
      const fp = `${req.headers['x-forwarded-for'] ?? ''}:${req.headers['user-agent'] ?? ''}`.slice(0, 160);
      const added = await kv.sadd(keySet, fp);

      let count = (await kv.get<number>(keyCount)) ?? 0;
      if (added === 1) count = await kv.incr(keyCount);

      return res.status(200).json({ count, liked: added === 1 });
    }

    return res.status(405).json({ error: 'Method not allowed', method: req.method });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
