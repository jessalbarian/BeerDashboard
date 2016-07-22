/*
 *   Get data from Firebase and transfer to Google Charts
 */



// Shortcuts to DOM elements
var total_beers = document.getElementById('total_beers');
var beer_name1 = document.getElementById('beer_name1');
var beer_name2 = document.getElementById('beer_name2');
var tap1Number = document.getElementById('tap1Number');
var tap2Number = document.getElementById('tap2Number');
var total_hours = document.getElementById('total_hours');
var total_minutes = document.getElementById('total_minutes');
var total_seconds = document.getElementById('total_seconds');

var tap1Num = 0;
var tap2Num = 0;

var beer_name_text1 = ""
var beer_name_text2 = ""

var start_time = "";

var hoursArray = [];
var gethours = [];
var hoursCounter = []; // create an empty array
var hour = 0;

var times;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDHZV87dHoRq7iYnhfYLIvp9H1Bw2ljro8",
    authDomain: "madesensors.firebaseapp.com",
    databaseURL: "https://madesensors.firebaseio.com",
    storageBucket: "madesensors.appspot.com",
};
firebase.initializeApp(config);

//Sensor1 Data
var refTap1 = firebase.database().ref('tap1/');
var refTap2 = firebase.database().ref('tap2/');

var starttimeArray1 = [];
var stoptimeArray1 = [];
//---------------
// Get tap 1 data
//---------------
refTap1.on("value", function (snapshot) {
    starttimeArray1 = [];
    stoptimeArray1 = [];
    hour = 0;
    var taps = snapshot.val();
    for (var key in taps) {
        if (key == 'name') {
            beer_name1.innerHTML = taps[key] + 's';
            beer_name_text1 = taps[key] + 's';
        } else if (key == 'times') {
            tap1Num = taps[key].length - 1
            tap1Number.innerHTML = tap1Num;
            for (var each in taps[key]) {

                for (var start in taps[key][each]) {
                    if (start == 'start_time') {
                        starttimeArray1.push(taps[key][each][start]);
                        hoursArray.push(taps[key][each][start]);
                    } else if (start == 'stop_time'){
                        stoptimeArray1.push(taps[key][each][start]);
                    }
                }
            }
        }
    }
    // Google Charts call
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    start_time = starttimeArray1[0];
    getSeconds();
    // end_time1 = timestampArray1[timestampArray1.length - 1];

    //---------------------
    // Set total # of beers
    //---------------------
    total_beers.innerHTML = tap2Num + tap1Num;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    // Set number of tap1 beers
    tap1Number.innerHTML = "Calculating";
    total_beers.innerHTML = "Calculating";
});




var starttimeArray2 = [];
var stoptimeArray2 = [];
//---------------
// Get tap 2 data
//---------------
refTap2.on("value", function (snapshot) {
    starttimeArray2 = [];
    stoptimeArray2 = [];

    var taps2 = snapshot.val();
    for (var keys in taps2) {
        if (keys == 'name') {
            beer_name2.innerHTML = taps2[keys] + 's';
            beer_name_text2 = taps2[keys] + 's';
        } else if (keys == 'times') {
            tap2Num = taps2[keys].length - 1
            tap2Number.innerHTML = tap2Num;
            for (var each2 in taps2[keys]) {

                for (var start2 in taps2[keys][each2]) {
                    if (start2 == 'start_time') {
                        starttimeArray2.push(taps2[keys][each2][start2]);
                        hoursArray.push(taps2[keys][each2][start2]);
                    } else if (start2 == 'stop_time') {
                        stoptimeArray2.push(taps2[keys][each2][start2]);
                    }

                }
            }
        }
    }
    // Google Charts call
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    parseTimes();
    getSeconds();
    //---------------------
    // Set total # of beers
    //---------------------
    total_beers.innerHTML = tap2Num + tap1Num;

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    // Set number of tap2 beers
    tap2Number.innerHTML = "Calculating";
    total_beers.innerHTML = "Calculating";
});



var getSeconds = function () {
    var tap1Seconds = (starttimeArray1.length)*6;
    var tap2Seconds = (starttimeArray2.length)*6;
    var tap1Minutes = (starttimeArray1.length)/60;
    var tap2Minutes = (starttimeArray2.length)/60;

    var tapTotalMinutes = tap1Minutes + tap2Minutes;
    var tapTotalSeconds = tap1Seconds + tap2Seconds;
    var tapTotalHours = (tap1Seconds/3600) + (tap2Seconds/3600);
    total_hours.innerHTML = tapTotalHours.toFixed(1);
    total_minutes.innerHTML = tapTotalMinutes.toFixed(1);
    total_seconds.innerHTML = tapTotalSeconds.toFixed(0);
};

//------------
// Parse Times
//------------

var parseTimes = function(){
    for (var each in starttimeArray1) {
        hour = new Date(starttimeArray1[each]).getHours();
        gethours.push(hour);
    }
// TODO: Add second starttimearray2 to this
    gethours.sort();
    var current = null;
    var cnt = 0;
    for (var i = 0; i < gethours.length; i++) {
        console.log(gethours[i]);
        if (gethours[i] != current) {
            if (cnt > 0) {
                console.log(current + ' comes ' +cnt + ' times');
                hoursCounter.push({
                    current:   current,
                    count: cnt
                });
            }
            current = gethours[i];
            cnt = 1;
        } else {
            cnt++;
        }
        hoursCounter.sort()
    }

};

//---------------------------
// Google Charts
// Load the Visualization API
// and the corechart package.
//---------------------------

google.charts.load('current', {'packages': ['corechart']});


google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawPieChart);



//-------------
// Create chart
//-------------
function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Times');
    data.addColumn('number', 'Beers Per Hour');
    var date;

    for (var key in hoursCounter) {
        var num = 0;
        // console.log(hoursCounter[key]);
        for (var current in hoursCounter[key]) {
            if (current == 'current') {
                console.log(hoursCounter[key][current]);
                if (hoursCounter[key][current] >= 12) {
                    date = hoursCounter[key][current] + ':00 PM';
                } else {
                    date = hoursCounter[key][current] + ':00 AM';
                }
            } else
                {
                    num = hoursCounter[key][current];
                }
                data.addRows([
                    [date, num]
                ]);
        }
    }


    // Set chart options
    var options = {

        legend: {position: 'none'},
        backgroundColor: {fill: 'transparent'},
        textStyle: {color: '#000'},
        titleTextStyle: {
            color: '#000'
        },
        vAxis: {
            textStyle: {
                color: '#000'
            }
        },
        hAxis: {
            textStyle: {
                color: '#000'
            }
        }
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    // hoursArray = [];
}


function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
        ['Name', 'Number of Beers'],
        [beer_name_text1, tap1Num],
        [beer_name_text2, tap2Num]
    ]);

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data);
}


