const { exec } = require('child_process');
const fs = require('fs');
const moment = require('moment');

const backupDb = (apps) => {
	const year = moment().format('YYYY')
	const month = moment().format('MM')
	const day = moment().format('DD')
	const hour = moment().format('HH')
	const minute = moment().format('mm')

	apps.forEach((app, i) => {
		console.log(`[${moment().format('YYYY-MM-DD, HH:mm')}] Start exporting ${app.database}...`);
		
		let dir = `./backup_files/${app.database}/${year}_${month}/${day}`;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		exec(`mysqldump -u${app.user} -p${app.password} -h${app.host} --single-transaction --quick --skip-lock-tables --triggers --routines --events ${app.database} | xz.exe > ${dir}/${app.database}_${hour}_${minute}.sql.xz`, (err, stdout, stderr) => {
			if (err) {
				console.error(`[${moment().format('YYYY-MM-DD, HH:mm')}] exec error: ${err}`);
			}
			console.log(`[${moment().format('YYYY-MM-DD, HH:mm')}] The exporting ${app.database} has finished`);
		});
	});
}

const apps = require('./database.json');
const numberInterval = 1000*60*10; //10 minute

backupDb(apps);
setInterval(() => {
	backupDb(apps);
}, numberInterval);
