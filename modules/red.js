function printRed() {
    console.log('red');
    //console.log(require)
}
var blue = require('./modules/blue.js');
//module.exports = printRed;
exports.printRed = printRed;
exports.printBlue = blue.printBlue;