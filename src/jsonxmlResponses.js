const respond = (request, response, status, content, type) => {
  const headers = {
    'Content-Type': type,
  };

  response.writeHead(status, headers);
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response.</message>';
    responseXML += '</response>';

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'This is a successful response.',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  // if necessary param is found
  if (params.valid === 'true') {
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>This request has the required parameters.</message>';
      responseXML += '</response>';

      return respond(request, response, 200, responseXML, 'text/xml');
    }
    const responseJSON = {
      message: 'This request has the required parameters.',
    };

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 200, jsonString, 'application/json');
  }

  // if necessary param is not found
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>Missing valid query parameter set to true.</message>';
    responseXML += '<id>badRequest</id>';
    responseXML += '</response>';

    return respond(request, response, 400, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Missing valid query parameter set to true.',
    id: 'badRequest',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 400, jsonString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  // if necessary param is found
  if (params.loggedIn === 'yes') {
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>You have successfully viewed the content.</message>';
      responseXML += '</response>';

      return respond(request, response, 200, responseXML, 'text/xml');
    }
    const responseJSON = {
      message: 'You have successfully viewed the content.',
    };

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 200, jsonString, 'application/json');
  }

  // if necessary param is not found
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>Missing loggedIn query parameter set to yes.</message>';
    responseXML += '<id>unauthorized</id>';
    responseXML += '</response>';

    return respond(request, response, 401, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes.',
    id: 'unauthorized',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 401, jsonString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>You do not have access to this content.</message>';
    responseXML += '<id>forbidden</id>';
    responseXML += '</response>';

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 403, jsonString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>Internal server error. Something went wrong.</message>';
    responseXML += '<id>internalError</id>';
    responseXML += '</response>';

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Internal server error. Something went wrong.',
    id: 'internalError',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 500, jsonString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>';
    responseXML += '<id>notImplemented</id>';
    responseXML += '</response>';

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 501, jsonString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>The page you are looking for was not found.</message>';
    responseXML += '<id>notFound</id>';
    responseXML += '</response>';

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 404, jsonString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  notFound,
  notImplemented,
  internal,
  forbidden,
};
