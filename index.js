const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  let store = url.parse(req.url, true);
  let pathname =
    store.pathname === "/" ? "/index.html" : store.pathname + ".html"; // Default to index.html
  let filename = "." + pathname.replace("//", "/"); // Ensure clean path

  fs.readFile(filename, function (err, data) {
    if (err) {
      fs.readFile("404.html", function (err, data2) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("Error");
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data2);
          res.end();
        }
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

server.listen(8080);
