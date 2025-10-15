exports.handler = async function (event, context) {
  // SPA fallback: отдаём index.html
  const fs = require('fs');
  const path = require('path');
  const indexPath = path.join(__dirname, '../../frontend/dist/index.html');
  try {
    const html = fs.readFileSync(indexPath, 'utf8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (e) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }
};
