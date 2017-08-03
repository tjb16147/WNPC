

//recall a csvtojson function to import a necessary data.
//input data, import data from WNA, for training data it is located in local folder.
const csvFilePath1='../WNA/view/data/subtype.csv'
const csvFilePath2='./data/training data/trainingdata.csv'

var callconv = require("./csvtojson.js");
var callRFC = require("./RFC.js");
var sleep = require('sleep');
const delay = require('delay');

callconv.csvconverter(csvFilePath1, 1);
callconv.csvconverter(csvFilePath2, 2);


//because nodejs is async function, need to find delay function to hold the process for x seconds.
	
delay(200)

delay(200)
    .then(() => {
        callRFC.RFC();
    });
