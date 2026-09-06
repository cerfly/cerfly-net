export async function onRequest({ request, next }) {
  const response = await next();
  if (response.status === 404) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/404")) {
      const page = await fetch(new URL("/404", url));
      return new Response(await page.text(), {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }
  return response;
}