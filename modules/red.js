function printRed() {
    console.log('red');
}
var blue = require('./modules/blue.js');
exports.printRed = printRed;
exports.printBlue = blue.printBlue;