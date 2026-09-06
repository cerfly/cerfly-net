export function onRequest() {
  return new Response("functions-active", {
    headers: { "x-functions-debug": "alive" },
  });
}