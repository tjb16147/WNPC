

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var csvData=[];
fs.createReadStream('./subtype.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })



var newCsv = csvData.split('\n').map(function(line) {
    var columns = line.split(','); // get the columns
    columns.splice(1, 1); // remove total column
    return columns;
}).join('\n'); // join on newlines

console.log(newCsv);


