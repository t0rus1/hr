var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

http.createServer(function(req, res) {
  
  if (req.url === '/favicon.ico') {
    return res.end();
  }
  // A parsed url to work with in case there are parameters
  var _url;
  
  // In case the client uses lower case for methods.
  req.method = req.method.toUpperCase();
  
  // report we only support GET verbs and exit if reqd
  if (req.method !== 'GET') {
    res.writeHead(501, { 'Content-Type': 'text/plain' });
    return res.end(req.method + ' is not implemented by this server.');
  }

  console.log('req.url = ' + req.url);

  // handle routes
  if (_url = /^\/employees$/i.exec(req.url)) {
    // return a list of employees
    employeeService.getEmployees(function (error,data) {
      if (error) {
        // send a 500 error
        return responder.send500(error, res);
      }
      // send the data with a 200 status code
      return responder.sendJson(data, res);
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    //find employee by id in the route
    employeeService.getEmployee(_url[1], function(error, data) {
      if (error) {
        // send a 500 error
      }
      if (!data) {
        // send a 404 error
        return responder.send404(res);
      }
      // send the data with a 200 status code
      return responder.sendJson(data,res);
    });
  } else {
    // try to send the static file
    res.writeHead(200);
    //res.end(staticFile(req.url, res));
    staticFile(req.url, res)
  }

}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://'+ process.env.PORT + ':' + process.env.IP + '/');
