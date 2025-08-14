export const GET = () =>
  new Response(
    `User-agent: *\nAllow: /\nSitemap: https://withlia.example/sitemap-index.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );