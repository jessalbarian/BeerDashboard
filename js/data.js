/*
*   Get data from Firebase and transfer to Google Charts
 */




// Shortcuts to DOM elements
var total_beers = document.getElementById('total_beers');
var ipa = document.getElementById('ipa');
var porter = document.getElementById('porter');
var beersPerDayS1Arr = [];
var datesArrayS1 = [];
var beersPerDayS2Arr = [];
var datesArrayS2 = [];
var sensor1Data = [];
var numberOfIPAsS1 = 0;
var numberOfportersS2 = 0;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRkKBPzNhp_rMC7WSvF1ZNAuw46e9qN24",
    authDomain: "tiltsensorarduino.firebaseapp.com",
    databaseURL: "https://tiltsensorarduino.firebaseio.com",
    storageBucket: "tiltsensorarduino.appspot.com",
};
firebase.initializeApp(config);

//Sensor1 Data
var ref1 = firebase.database().ref('beers/Sensor1');
var ref2 = firebase.database().ref('beers/Sensor2');
var ref = firebase.database().ref('beers/');


// Get total beers data
ref.on("value", function(snapshot) {
    var beers = snapshot.val();
    total_beers.innerHTML = beers.total_beers;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    total_beers.innerHTML = "Calculating";
});


// Get number of IPAs
ref.on("value", function(snapshot) {
    var beers = snapshot.val();
    ipa.innerHTML = beers.total_beers - numberOfportersS2;
    porter.innerHTML = beers.total_beers - numberOfIPAsS1;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    ipa.innerHTML = "Calculating";
    porter.innerHTML = "Calculating";
});


// Sensor 1 Data: India Pale Ale
ref1.on("child_added", function(snapshot, prevChildKey) {
    var newPostS1 = snapshot.val();
    var beersPerDayS1 = newPostS1.beersPerDay;
    var datesS1 = newPostS1.datetime;

    beersPerDayS1Arr.push(beersPerDayS1);
    datesArrayS1.push(datesS1);
});


// Sensor 2 Data: Chocolate Porter
ref2.on("child_added", function(snapshot, prevChildKey) {
    var newPosts2 = snapshot.val();
    var beersPerDayS2 = newPosts2.beersPerDay;
    var datesS2 = newPosts2.datetime;

    beersPerDayS2Arr.push(beersPerDayS2);
    datesArrayS2.push(datesS2);
});




// Load the Visualization API and the corechart package.
//        google.charts.load('current', {'packages':['corechart']});
//
//        // Set a callback to run when the Google Visualization API is loaded.
//        google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.

//        function drawChart(){
//            var data = new google.visualization.DataTable();
//            data.addColumn('date', 'Date');
//            data.addColumn('number', 'Beers');
//
//            var options = {
//                title: 'Beers Poured Per Day',
//                hAxis: {
//                    title: 'Date',
//                    format: 'yy-mm-dd',
//                },
//                vAxis: {
//                    title: 'Number of Beers'
//                },
//                legend: {
//                    position: 'none'
//                },
//                timeline: {
//                    groupByRowLabel: true
//                }
//            };
//
////            sensor1data.push(['Ti', 'Beers', { role: 'style' } ]);
//
//            for (var i = 0; i < beersPerDayS1.length; i++) {
////                    sensor1Data.push([datesArray[i], parseInt(beersPerDayArray[i]), 'stroke-color: #009933; stroke-opacity: 0.6; stroke-width: 8; fill-color: #fff; fill-opacity: 0.2']);
//                data.addRows([
//                        [new Date(2000, 8, 5), beersPerDayS1[i]]
//                ]);
//            }
//
//
//            var chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));
//            chart.draw(data, options);
//        }

