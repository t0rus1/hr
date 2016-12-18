var fs = require('fs');

// send404
// Requires a response object
// Will send a 404 header
exports.send404 = function (response) {
  console.error("Resource not found");
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.end('');
};

exports.sendJson = function (data, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
};

// send500
// Requires an error and a response object
// Will send a 500 header plus error message
exports.send500 = function (data, response) {
  console.error(data.red);
  response.writeHead(500, {'Content-Type': 'text/plain' });
  response.end(data);
};

// staticFile
// Requires a 'mount path' (staticPath)
// Returns a function, for later use. 
// When this function is eventually called 
// (with '/home' or '/home.html' and a response object)
// it will pipe the contents of home.html to the response
exports.staticFile = function (staticPath) {
  return function(data, response) {
    var readStream;
    // Fix so routes to /home and /home.html both work
    data = data.replace(/^(\/home)(.html)?$/i, '$1.html');
    data = '.' + staticPath + data;
    
    console.log(data);
    
    fs.stat(data, function (error, stats) {
      if (error || stats.isDirectory()) {
        return exports.send404(response);
      }
      
      readStream = fs.createReadStream(data);
      
      return readStream.pipe(response);
      
    });
    
  }
};