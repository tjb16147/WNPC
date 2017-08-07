//main RFC function.



var RFC = function RFC() {

//start stopwatch
console.log("Start Random Forest Classifier: \n");
var start = new Date();
var hrstart = process.hrtime();


var fs = require('fs'),
    RandomForestClassifier = require('random-forest-classifier').RandomForestClassifier;


//1.data that want to be sampled.
var testdata=require('./data/json/subtype.json');

//2.training data use for prediction.
var data = require('./data/json/trainingdata.json');

//3.Throughput data use to calculate for a throughput
var tdata = require('./data/json/throughputdata.json');




//count number of entry to forward to estimators (JSON)
var count = Object.keys(testdata).length;

//************************Throughput estimation function*********************

function throughput() {
//convert from string to number
var mnt = Number(tdata[0].count);
var ctrl = Number(tdata[1].count);
var dat = Number(tdata[2].count);

var congest_result = dat/(mnt+ctrl+dat);

var through = congest_result.toFixed(3);


console.log("Throughput of the network is:  %d \n",through);

if(through<0.1)
{
console.log("data congestion: Low \n");
}

if(through>0.5)
{
console.log("data congestion: High \n");
}



if(through>0.1&&through<0.5)
{
console.log("data congestion: Moderate \n");
}


}


//********************************************************************************



//***************************Core function, RFC******************************************************
var rf = new RandomForestClassifier({

//maximum number of entry available in the field,
//one tree per entry
    n_estimators: count
});


//determine a column that need to be predicted as a result. In this case, we named it "Traffic"

//rf.fit(data, features, target, function(err, trees){})

/*

data = input data
feature, default =null, else declare array
target, what to observe


*/

const feature = ["Probe Request","Probe Response","Beacon","RTS","CTS","ACK","Data","QoS data"]


  rf.fit(data, feature, "Traffic", function(err, trees){



  //console.log(JSON.stringify(trees, null, 4));
  var pred = rf.predict(testdata, trees);


//********************print prediction result to console************************

//count unit in prediction. (count array)
console.log("number of trees:   "+pred.length+"\n");
console.log("prediction result: \n");
//check loop c-1 or c from 1 to 10
for(var c=1; c<=count;c++)
{
console.log(c+". "+pred[c-1]+"\n");
}

//****************************************************************************



//**********************function of voted ensemble****************************

//we use pred as an input.
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
console.log("Final result:   "+mode(pred)+"\n");
});
//****************************************************************************

//time converter
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}



//************************************************************************************************



//end stopwatch
setTimeout(function (argument) {
    // execution time simulated with setTimeout function
    var end = new Date() - start,
        hrend = process.hrtime(hrstart);

	
	console.log("Execution time:    "+millisToMinutesAndSeconds(end));


    //console.info("Execution time: %dms", end);
    //console.info("Execution time (hr): %ds %dms", hrend[0]/3600, hrend[1]/1000000);
}, 1);


};
module.exports.RFC=RFC;

