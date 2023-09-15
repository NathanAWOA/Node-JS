var somaFunc = require("./soma");
var subFunc = require("./sub");
var divFunc = require("./div");
var multiFunc = require("./multi");

console.log(
    `
    2 + 4 = ${somaFunc(2,4)},
    2 - 4 = ${subFunc(2,4)},
    2 * 4 = ${multiFunc(2,4)},
    2 / 4 = ${divFunc(2,4)}
    `
    );