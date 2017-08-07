//main RFC function.

//This line use to declare that this whole script is exported to use in another script (main.js)
var RFC = function RFC() {


//********************Variable segments*******************************************************************************

console.log("Start Random Forest Classifier: \n");

//variable for stopwatch function.
var start = new Date();
var hrstart = process.hrtime();


//variable for RFC function.
var fs = require('fs'),
    RandomForestClassifier = require('random-forest-classifier').RandomForestClassifier;


/*
Import 3 data from different path
1.subtype = data that need to be observed.
2.training data = data set uses for prediction.
3.Throughput data use to calcuate for congestion.
*/

var testdata=require('./data/json/subtype.json');
var data = require('./data/json/trainingdata.json');
var tdata = require('./data/json/throughputdata.json');


//************************Throughput estimation function**************************************************************

function throughput() {
//convert from string to number
var mnt = Number(tdata[0].count);
var ctrl = Number(tdata[1].count);
var dat = Number(tdata[2].count);


//calculation part, generate result in 3 decimals.
var congest_result = dat/(mnt+ctrl+dat);
var through = congest_result.toFixed(3);


console.log("Throughput of the network is:  %d \n",through);
if(through<0.1)
{
console.log("Congestion result: Low \n");
}

if(through>0.5)
{
console.log("Congestion result: High \n");
}

if(through>0.1&&through<0.5)
{
console.log("Congestion result: Moderate \n");
}


}


//***************************Core function, RFC***********************************************************************

//count data set amount of the input.
var count = Object.keys(testdata).length;


//function to construct trees
var rf = new RandomForestClassifier({
//maximum number of entry available in the field, one tree per entry
    n_estimators: count
});


/* default codeline with explaination for further modification.
rf.fit(data, features, target, function(err, trees){})
data = input data.
feature = attribute we want to put in. default = use every attribute to construct RFC.
target= class we want to observe.
*/


//We pick all attributes that are mainly affected a network pattern based on our experiment. If we want more or less attributes, we can modify on this array.
const feature = ["Probe Request","Probe Response","Beacon","RTS","CTS","ACK","Data","QoS data"]
//const feature = null;

//function to construct a forest
  rf.fit(data, feature, "Traffic", function(err, trees){


//Generate result.
  var pred = rf.predict(testdata, trees);


//print out result to a console.

console.log("number of trees:   "+pred.length+"\n");
console.log("prediction result on each frame: \n");

//check loop c-1 or c from 1 to 10, count unit in prediction. (count array)
// this function is implemented to use in acurracy test.
for(var c=1; c<=count;c++)
{
console.log(c+". "+pred[c-1]);
}



//**********************Voted ensemble function********************************************************************

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

//output voting ensemble
console.log("\n"+"Traffic result:   "+mode(pred)+"\n");
});


//*************************Time converter (millisec to min&sec)*****************************************************

//time converter
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


//*************************Time log function**************************************************************************
setTimeout(function (argument) {
    // execution time simulated with setTimeout function
    var end = new Date() - start,
        hrend = process.hrtime(hrstart);

	
	throughput();
	console.log("Execution time:    "+millisToMinutesAndSeconds(end));
	

    //console.info("Execution time: %dms", end);
    //console.info("Execution time (hr): %ds %dms", hrend[0]/3600, hrend[1]/1000000);
}, 1);



};
//function call to export module.
module.exports.RFC=RFC;

