const Service = require('node-windows').Service;

const svc = new Service({
  name:'ITDLatte DB Backup Apps',
  description: 'DB Backup for all system of ITDlatte',
  script: require('path').join(__dirname,'app.js'),
});

svc.on('install',function(){
  svc.start();
});

svc.install();