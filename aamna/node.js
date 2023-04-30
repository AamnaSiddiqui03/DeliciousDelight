const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Set the Content-Type header to HTML
    res.setHeader('Content-Type', 'text/html');

    // Read the index.html file
    fs.readFile(path.join(__dirname, 'findex.html'), (err, data) => {
      if (err) {
        // If there's an error reading the file, send a 500 error response
        res.statusCode = 500;
        res.end(`Error reading index.html: ${err.message}`);
      } else {
        // If the file is read successfully, send it as the response
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    // If the request URL is not "/", send a 404 error response
    res.statusCode = 404;
    res.end('Not found');
  }
});

// Handle server errors
server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

