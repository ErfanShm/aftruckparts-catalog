export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>این صفحه بارگذاری نشد</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <style>
      @font-face {
        font-family: "Anjoman Variable";
        src: url("/fonts/anjoman/Anjoman-Variable.woff") format("woff");
        font-weight: 100 900;
        font-display: swap;
      }
      body { font-family: "Anjoman Variable", "Anjoman", system-ui, sans-serif; font-size: 15px; line-height: 1.7; background: #07070a; color: #f0f0f0; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>این صفحه بارگذاری نشد</h1>
      <p>مشکلی از سمت ما پیش آمد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">تلاش مجدد</button>
        <a class="secondary" href="/">بازگشت به خانه</a>
      </div>
    </div>
  </body>
</html>`;
}
