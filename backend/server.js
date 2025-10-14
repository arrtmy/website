const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Отдача статических файлов фронта
app.use(
  express.static(path.join(__dirname, '../frontend/dist'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    },
  }),
);

// API-заглушка
app.get('/api', (req, res) => {
  res.json({ message: 'API работает!' });
});

// SPA fallback для React Router

app.get(/.*/, (req, res) => { res.sendFile(path.resolve(__dirname, "frontend", "index.html")); });

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
