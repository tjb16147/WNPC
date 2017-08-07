

//recall a csvtojson function to import a necessary data.
//input data, import data from WNA, for training data it is located in local folder.

const csvFilePath1='../WNA/view/data/subtype.csv'
const csvFilePath2='./data/training data/trainingdata.csv'
const csvFilePath3='../WNA/view/data/type_all.csv'





var callconv = require("./csvtojson.js");
var callRFC = require("./RFC.js");

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
