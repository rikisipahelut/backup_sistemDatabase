const moment = require('moment')

const year = moment().format('YYYY')
const month = moment().format('MM')
const day = moment().format('DD')
const hour = moment().format('hh')
const minute = moment().format('mm')
console.log(year, month, day, hour, minute)