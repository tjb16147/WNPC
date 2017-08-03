
//build new input from subtype.
/*
var csv = 
'Category,Total,Under $1000\n' +
'Music,14744,1434,3450\n' +
'Art,12796,1216,7748\n';
*/


//read file
var fs = require('fs'); 
var parse = require('csv-parse');
const path = './subtype.csv';

var csvData=[];
var csvrow=[];

fs.createReadStream(path)
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow1) {
        //console.log(csvrow);
        //do something with csvrow
	
	//this thing still in array.
	//console.log(csvrow);

	//csvrow = removeColumn(csvrow1,0);
        

	csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
	
 
      //console.log(csvData);
    });





// Made it a function to make it reusable!
function removeColumn(data, colIndex) {
    var temp = data.split("\n");
    for(var i = 0; i < temp.length; ++i) {
        temp[i] = temp[i].split(",");
        temp[i].splice(colIndex,1);
        temp[i] = temp[i].join(","); // comment this if you want a 2D array
    }
    return temp.join("\n");     // returns CSV
    return temp;                // returns 2D array
    return d3.csv.parse(temp);  // returns a parsed object
}


//call function to remove first column.
//console.log(removeColumn(csvData,0));



//export csv as subtype_modified.



