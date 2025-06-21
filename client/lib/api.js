const base = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Helper that automatically JSON-serialises body and checks non-2xx.
 */
export async function api(path, options = {}) {
  const opts = { headers: { 'Content-Type': 'application/json' }, ...options };
  if (opts.body && typeof opts.body !== 'string') opts.body = JSON.stringify(opts.body);

  const res = await fetch(`${base}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }
  return res.json();
}

export const Starship = {
  list: ()        => api('/starships'),
  get:  (id)      => api(`/starships/${id}`),
  create: (data)  => api('/starships',     { method: 'POST', body: data }),
  update: (id,d)  => api(`/starships/${id}`, { method: 'PUT',  body: d }),
  remove: (id)    => api(`/starships/${id}`, { method: 'DELETE' })
};
