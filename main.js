//main page script, use to call function from 2 scripts only.


//data file path 1.raw data, 2.training data, 3. throughput data
const csvFilePath1='../WNA/view/data/subtype.csv'
const csvFilePath2='./data/training data/trainingdata.csv'
const csvFilePath3='../WNA/view/data/type_all.csv'

//script file path
var callconv = require("./csvtojson.js");
var callRFC = require("./RFC.js");

//call a delay function, need delay npm.
const delay = require('delay');


//call converter first
callconv.csvconverter(csvFilePath1, 1);
callconv.csvconverter(csvFilePath2, 2);
callconv.csvconverter(csvFilePath3, 3);


//because nodejs is async function, need to find delay function to hold the process for x seconds.
	
delay(1000)
    .then(() => {
        callRFC.RFC();
    });
