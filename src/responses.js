const respond = (request, response, status, content, type) => {
    const headers = {
      'Content-Type': type
    };
  
    response.writeHead(status, headers);
    response.write(content);
    response.end();
  };

const notFound = (request, response, acceptedTypes) => {
  console.log(acceptedTypes[0]);
  if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>The page you are looking for was not found.</message>';
      responseXML += '<id>notFound</id>';
      responseXML += '</response>';
  
      return respond(request, response, 404, responseXML, 'text/xml');
  } else {
      const responseJSON = {
          message: 'The page you are looking for was not found.',
          id: 'notFound',
      };
      
      const jsonString = JSON.stringify(responseJSON);
      return respond(request, response, 404, jsonString, 'application/json');
  }
};

  module.exports = {
      notFound
  }