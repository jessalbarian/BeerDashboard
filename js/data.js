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
var topbeer = document.getElementById('topbeer');
var ounces = document.getElementById('ounces');
var bread = document.getElementById('bread');

var tap1Num = 0;
var tap2Num = 0;

var beer_name_text1 = ""
var beer_name_text2 = ""

var start_time = "";

var hoursArray = [];
var hoursCounter = [];
var daysCounter = [];
var daysNumberObject = {};
var gethours = [];
var getyears = [];
var getmonths = [];
var getdays = [];
var hour = 0;
var hour2 = 0;

var year = 0;
var month = 0;
var day = 0;

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
var times = [];
//---------------
// Get tap 1 data
//---------------
refTap1.on("value", function (snapshot) {
    starttimeArray1 = [];
    stoptimeArray1 = [];
    gethours = [];
    year = 0;
    hoursCounter = [];
    daysCounter = [];
    getyears = [];
    getmonths = [];
    getdays = [];
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
    getTimes();
    parseTimes();
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    setTimeout(drawCalendarChart, 1000);
    topBeer();
    start_time = starttimeArray1[0];

    // parseTimes();
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
    gethours = [];
    hoursCounter = [];
    daysCounter = [];
    getyears = [];
    getmonths = [];
    getdays = [];
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
    parseTimes();
    getTimes();
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    setTimeout(drawCalendarChart, 1000);
    topBeer();
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



var topBeer = function() {
    if (tap1Num > tap2Num){
        topbeer.innerHTML = "Most Poured Beer: IPA";
        ounces.innerHTML = String(tap1Num*16) + " ounces";
    } else {
        topbeer.innerHTML = "Most Poured Beer: Porter";
        ounces.innerHTML = String(tap2Num*16) + " ounces";
    }
};



//---------------------------------------
// Get Hours, Minutes, Seconds of pouring
//---------------------------------------
var getTimes = function() {
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



//--------------------------------------------
// Parse Times to get number of beers per hour
//--------------------------------------------
var parseTimes = function(){


    // Add hours from tap 1
    for (var each in starttimeArray1) {
        hour = new Date(starttimeArray1[each]).getHours();

        year = new Date(starttimeArray1[each]).getUTCFullYear()
        if (year == 116){
            year = 2016;
        }

        month = new Date(starttimeArray1[each]).getMonth();
        // month = month + 1; // Adding to fix month being off by 1

        day = new Date(starttimeArray1[each]).getUTCDate();

        gethours.push(hour);
        getyears.push(year);
        getmonths.push(month);
        getdays.push(day);
    }


    // Add hours from tap 2
    for (var each2 in starttimeArray2){
        hour2 = new Date(starttimeArray2[each2]).getHours();

        year = new Date(starttimeArray2[each2]).getYear();
        if (year == 116){
            year = 2016;
        }

        month = new Date(starttimeArray2[each2]).getMonth();
        // month = month + 1;

        day = new Date(starttimeArray2[each2]).getUTCDate();

        gethours.push(hour2);
        getyears.push(year);
        getmonths.push(month);
        getdays.push(day);
    }

    // Sort gethours Array
    gethours.sort();

    for (var i = 0; i < getdays.length; i++) {
        daysCounter[getdays[i]] = (daysCounter[getdays[i]] + 1) || 1;
        daysNumberObject = {
            day: getdays[i],
            number: daysCounter[getdays[i]]
        };
    }

    // Filter out duplicates and count them
    for (var i = 0; i < gethours.length; i++) {
        hoursCounter[gethours[i]] = (hoursCounter[gethours[i]] + 1) || 1;
    }

};

//---------------------------
// Google Charts
// Load the Visualization API
// and the corechart package.
//---------------------------

google.charts.load('current', {'packages': ['corechart', 'calendar']});


google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawCalendarChart);
google.charts.setOnLoadCallback(drawCheeseChart);
google.charts.setOnLoadCallback(drawCheese2Chart);
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

        if (key >= 12) {
            date = key + ':00 PM';
        } else {
            date = key + ':00 AM';
        }

        num = hoursCounter[key];

        data.addRows([
            [date, num]
        ]);
        // 'color: #66cc33'
    }

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
        },
        colors: ['#ff3333'],
        outlineColor: ['#000']
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}


function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
        ['Name', 'Number of Beers'],
        [beer_name_text1, tap1Num],
        [beer_name_text2, tap2Num]
    ]);

    var options = {
        slices: {
            0: { color: 'lightgrey' },
            1: { color: 'red' }
        },
        is3D: true,
        pieSliceTextStyle: {
            color: 'black',
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}


//--------------------
// Draw Calendar Chart
//--------------------
function drawCalendarChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date'});
    dataTable.addColumn({ type: 'number', id: 'Beer Count'});

    var num2;
    for (var item in daysCounter) {
        num2 = daysCounter[item];
    }

    for (var each in getyears) {
        dataTable.addRows([
            [new Date(getyears[each], getmonths[each], getdays[each]), num2]
        ]);
    }

    var options = {
        noDataPattern: {
            backgroundColor: '#ff3333',
            color: '#ff3333'
        },
        calendar: {
            cellColor: {
                stroke: '#fff',
                strokeOpacity: 0.5,
                strokeWidth: 1,
            },
            focusedCellColor: {
                stroke: '#ff3333',
                strokeOpacity: 1,
                strokeWidth: 1
            },
            monthOutlineColor: {
                stroke: '#000',
                strokeWidth: 2
            },
            unusedMonthOutlineColor: {
                stroke: '#fff',
                strokeWidth: 1
            }
        }

    };

    var chart = new google.visualization.Calendar(document.getElementById('calendar'));
    chart.draw(dataTable, options);
}


//--------------------
// Cheese Column Chart
//--------------------
function drawCheeseChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Times');
    data.addColumn('number', 'Grilled Cheese\'s Per Hour');

        data.addRows([
            ['9:00', 2],
            ['11:00', 5],
            ['12:00', 15],
            ['1:00', 20],
            ['2:00', 16],
            ['3:00', 7],
            ['4:00', 10]
        ]);


    var options = {
        legend: {position: 'none'},
        backgroundColor: {fill: 'transparent'},
        textStyle: {color: '#000'},
        titleTextStyle: {
            color: '#000'
        },
        vAxis: {
            title: "Number of Beers",
            textStyle: {
                color: '#000'
            }
        },
        hAxis: {
            title: "Time",
            textStyle: {
                color: '#000'
            }
        },
        colors: ['#ff3333'],
        outlineColor: ['#000']
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('cheesechart_div'));
    chart.draw(data, options);
}



//--------------------
// Cheese Column 2 Chart
//--------------------
function drawCheese2Chart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Times in Seconds');
    data.addColumn('number', 'Grilled Cheese\'s Cook Time');

    data.addRows([
        [30, 2],
        [60, 15],
        [90, 35],
        [120, 3],
        [150, 15]
    ]);

    bread.innerHTML = "That's " + String(75*2) + " pieces of bread!";

    var options = {
        legend: {position: 'none'},
        backgroundColor: {fill: 'transparent'},
        textStyle: {color: '#000'},
        titleTextStyle: {
            color: '#000'
        },
        vAxis: {
            title: "Number of Sandwiches",
            textStyle: {
                color: '#000'
            }
        },
        hAxis: {
            title: "Seconds",
            textStyle: {
                color: '#000'
            }
        },
        colors: ['#ff3333'],
        outlineColor: ['#000']
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('cheese2chart_div'));
    chart.draw(data, options);
}
