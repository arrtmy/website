import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Отдача статических файлов фронта
app.use(express.static(path.join(__dirname, 'dist')));

// Простейший API-заглушка
app.get('/api', (req, res) => {
  res.json({ message: 'API работает' });
});

// SPA fallback: если запрос ожидает HTML, отдать index.html (без использования route patterns)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const accept = req.headers.accept || '';
  if (!accept.includes('text/html')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => console.log(`Server started on http://${HOST}:${PORT}`));
