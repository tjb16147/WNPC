


// require csvtojson npm
var csv = require("csvtojson");
var jsonfile = require('jsonfile');
var fs = require('fs');

//input data, import data from WNA, for training data it is located in local folder.
//const csvFilePath1='../WNA/view/data/subtype.csv'
//const csvFilePath2='./data/training data/trainingdata.csv'


//const jsonFilePath1='./subtype.json'
//const jsonFilePath2='./trainingdata.json'



//This function is a csvtojson converter to feed the input into RFC function.



//make sure to call event in csv to exclude first column "time" because we don't need time to be fed in RFC


var csvconverter = function csvconverter(csvFilePath, Pathnumber){

// require csvtojson npm
var csv = require("csvtojson");
var jsonfile = require('jsonfile');
var fs = require('fs');

//ignore first column option.
csv({ignoreColumns: [0]})



//load an input based on filepath declaration above
.fromFile(csvFilePath)


//converter function.
.on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
     


//to write file out, need a jsonfile nodejs. Find on a download site.
		
		
		//two condition to export out into a data folder.
		if(Pathnumber==1){
			jsonoutput = './data/json/subtype.json';
			console.log("Data imported");
			}
		if(Pathnumber==2){
			jsonoutput = './data/json/trainingdata.json';
			console.log("Training data imported");
			}

		jsonfile.writeFile(jsonoutput, jsonArrayObj, function(err) {
		    if(err) {
			return console.log(err);
		    }

		    
		}); 


   })

};
 
//csvconverter(csvFilePath1);
//csvconverter(csvFilePath2);



//function usage, it is executed two times 1.subtype.csv as a data, 2.data.csv as a training data


module.exports.csvconverter = csvconverter;


