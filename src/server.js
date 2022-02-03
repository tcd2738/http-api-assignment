const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonxmlHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonxmlHandler.success,
    '/badRequest': jsonxmlHandler.badRequest,
    '/unauthorized': jsonxmlHandler.unauthorized,
    '/forbidden': jsonxmlHandler.forbidden,
    '/internal': jsonxmlHandler.internal,
    '/notImplemented': jsonxmlHandler.notImplemented,
    notFound: jsonxmlHandler.notFound
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');

  console.dir(request.method);
  console.dir(parsedUrl);

  if (urlStruct && urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
