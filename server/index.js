const fs = require('fs');
//const http = require('http');
//const https = require('https');
const privateKey  = fs.readFileSync('server/sslcert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('server/sslcert/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
//const express = require('express');
//const app = express();

const path = require('path');
const jsdom = require('jsdom');
const express = require('express');
const app = express();

//const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
//httpsServer.listen(8443);


const server = require('https').createServer(credentials, app);
const io = require('socket.io')(server);
const datauri = require('datauri');
const { JSDOM } = jsdom;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true
  }).then((dom) => {
    dom.window.URL.createObjectURL = (blob) => {
      if (blob){
        return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer).content;
      }
    };
    dom.window.URL.revokeObjectURL = (objectURL) => {};
    dom.window.gameLoaded = () => {
      server.listen(8443, function () {
        console.log(`Listening on ${server.address().port}`);
      });
    };
    dom.window.io = io;
  }).catch((error) => {
    console.log(error.message);
  });
}

setupAuthoritativePhaser();
