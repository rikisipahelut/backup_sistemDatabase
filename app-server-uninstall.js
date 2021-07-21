const Service = require('node-windows').Service;

const svc = new Service({
  name:'ITDLatte DB Backup Apps',
  description: 'DB Backup for all system of ITDlatte',
  script: require('path').join(__dirname,'app.js'),
});

svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

svc.uninstall();