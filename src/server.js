const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonxmlHandler = require('./jsonxmlResponses.js');

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
  notFound: jsonxmlHandler.notFound,
};

const onRequest = (request, response) => {
  // grab all the necessary elements from the request
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  console.dir(request.method);
  console.dir(parsedUrl);

  if (urlStruct[parsedUrl.pathname]) {
    // not sure if it's considered "correct" coding to just
    // slap params on the end so that all URLs can just use this one line?
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
