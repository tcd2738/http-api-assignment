const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': acceptedTypes[0]});
  response.write(index);
  response.end();
};

const getCSS = (request, response, acceptedTypes) => {
  response.writeHead(200, { 'Content-Type': acceptedTypes[0]});
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
};
