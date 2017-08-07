//main converter function.

//********************Variable segments*******************************************************************************

var csv = require("csvtojson");
var jsonfile = require('jsonfile');
var fs = require('fs');


/* Old line code, remark as a memo
	input data, import data from WNA, for training data it is located in local folder.
	const csvFilePath1='../WNA/view/data/subtype.csv'
	const csvFilePath2='./data/training data/trainingdata.csv'
	const jsonFilePath1='./subtype.json'
	const jsonFilePath2='./trainingdata.json'
*/


//This function is a csvtojson converter to feed the input into RFC function.
//*******************************Core funtion, converter***************************************************************

var csvconverter = function csvconverter(csvFilePath, Pathnumber){
var csv = require("csvtojson");
var jsonfile = require('jsonfile');
var fs = require('fs');


//function used to identify two conditions, because throughput does not need to remove first element
var ignore_cond;
if(Pathnumber==1||Pathnumber==2)
{
ignore_cond={ignoreColumns: [0]};
}
if(Pathnumber==3)
{
ignore_cond="";
}

//function to handle an optional case.
csv(ignore_cond)


//load an input based on filepath declaration above
.fromFile(csvFilePath)


//converter function.
.on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
     

//Save file as json output to use them in RFC function.
		
	if(Pathnumber==1){
		jsonoutput = './data/json/subtype.json';
		console.log("Data imported");
			}
	if(Pathnumber==2){
		jsonoutput = './data/json/trainingdata.json';
		console.log("Training data imported");
			}
	if(Pathnumber==3){
		jsonoutput = './data/json/throughputdata.json';
		console.log("Throughput data imported");
			}

	jsonfile.writeFile(jsonoutput, jsonArrayObj, function(err) {
		if(err) {
			return console.log(err);
		}

	}); 


   })

};
 
//function call to export module.
module.exports.csvconverter = csvconverter;


