async function handleRes(res) {
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.error?.message || payload.message || "Okänt fel");

  return payload;
}

export async function PostAsync(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  return handleRes(response);
}

export async function GetAsync(url, options = {}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`, {
    ...options,
  });

  return handleRes(response);
}

export async function apiGet(path) {
  const res = await fetch(path);

  return handleRes(res);
}

export async function apiPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleRes(res);
}

export async function apiDelete(path) {
  const res = await fetch(path, {
    method: "DELETE",
  });

  return handleRes(res);
}
