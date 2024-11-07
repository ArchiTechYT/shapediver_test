const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set the file path, defaulting to index.html if root is requested
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Serve the file if it exists
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve a 404 response
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // For other errors, serve a 500 response
                res.writeHead(500);
                res.end('<h1>Server Error</h1>');
            }
        } else {
            // Serve the HTML file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

// Use the PORT environment variable or default to 3000 if running locally
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});