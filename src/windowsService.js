const Service = require('node-windows').Service;

const svc = new Service({
  name: 'MoCo-Test-Protokoll',
  description:
    'The app is a Node server that process a protocol form for the MoCo electric board. The server works with a REST API that connects to React app on the client.',
  script: require('path').join(__dirname, 'index.js'),
});

svc.on('install', function () {
  svc.start();
});

svc.install();
