const http = require('http');
const url = require('url');

function generateHTMLPage(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple HTTP Server</title>
    </head>
    <body>
      <h1>${content}</h1>
    </body>
    </html>
  `;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET') {
    if (parsedUrl.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(generateHTMLPage('Home Page'));
      return;
    } else if (parsedUrl.pathname === '/about') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(generateHTMLPage('About Page'));
      return;
    } else if (parsedUrl.pathname === '/contact') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(generateHTMLPage('Contact Page'));
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  } else if (req.method === 'POST') {
    if (parsedUrl.pathname === '/submit') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        console.log('Received data:', data);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Data received');
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
