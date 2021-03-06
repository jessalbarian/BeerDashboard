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
var total_hours2 = document.getElementById('total_hours2');
var total_minutes2 = document.getElementById('total_minutes2');
var total_seconds2 = document.getElementById('total_seconds2');
var topbeer = document.getElementById('topbeer');
var ounces2 = document.getElementById('ounces2');
var bread = document.getElementById('bread');

var tap1Num = 0;
var tap2Num = 0;

var tap1_name_text = ""
var tap2_name_text = ""

var start_time = "";

var hoursArray = [];
var hoursCounter = [];
var hoursCounter2 = [];
var daysCounter = [];
var daysCounter2 = [];
var daysNumberObject = {};
var daysNumberObject2 = {};
var gethours = [];
var getyears = [];
var getmonths = [];
var getdays = [];
var gethours2 = [];
var getyears2 = [];
var getmonths2 = [];
var getdays2 = [];

var hour = 0;
var hour2 = 0;
var start1 = 0;
var stop1 = 0;
var start2 = 0;
var stop2 = 0;

var year = 0;
var month = 0;
var day = 0;
var year2 = 0;
var month2 = 0;
var day2 = 0;

var gallons = 0;
var gallons2 = 0;

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
var starttimeArray2 = [];
var stoptimeArray2 = [];

var otherstarttimes1 = [];
var otherstarttimes2 = [];
var otherstoptimes1 = [];
var otherstoptimes2 = [];
var times = [];




//---------------
// Get tap 1 data
//---------------
refTap1.on("value", function (snapshot) {
    starttimeArray1 = [];
    stoptimeArray1 = [];
    otherstarttimes1 = [];
    otherstoptimes1 = [];
    gethours = [];
    gethours2 = [];
    hoursCounter = [];
    hoursCounter2 = [];
    daysCounter = [];
    daysCounter2 = [];
    getyears = [];
    getmonths = [];
    getdays = [];
    getyears2 = [];
    getmonths2 = [];
    getdays2 = [];
    var taps = snapshot.val();
    for (var key in taps) {
        if (key == 'name') {
            beer_name1.innerHTML = taps[key] + 's';
            tap1_name_text = taps[key];
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
        } else if (key == 'alltimes'){
            for (var each2 in taps[key]){
                for (var start2 in taps[key][each2]){
                    if (start2 == 'start_time') {
                        otherstarttimes1.push(taps[key][each2][start2]);
                        // hoursArray.push(taps[key][each2][start2]);
                    } else if (start2 == 'stop_time'){
                        otherstoptimes1.push(taps[key][each2][start2]);
                    }
                }
            }
        } else if (key == 'current_keg'){
            for (var each3 in taps[key]) {
                if (each3 == 'amount') {
                    gallons = taps[key][each3];
                }
            }
        }
    }
    // Google Charts call
    getTimes();
    parseTimes();
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    setTimeout(drawChart2, 1000)
    // setTimeout(drawCalendarChart, 1000);
    topBeer();
    amount();
    start_time = starttimeArray1[0];

    // parseTimes();
    // end_time1 = timestampArray1[timestampArray1.length - 1];

    //---------------------
    // Set total # of beers
    //---------------------
    total_beers.innerHTML = tap1Num;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    // Set number of tap1 beers
    tap1Number.innerHTML = "Calculating";
    total_beers.innerHTML = "Calculating";
});





//---------------
// Get tap 2 data
//---------------
refTap2.on("value", function (snapshot) {
    starttimeArray2 = [];
    stoptimeArray2 = [];
    otherstarttimes2 = [];
    otherstoptimes2 = [];
    gethours = [];
    gethours2 = [];
    hoursCounter = [];
    hoursCounter2 = [];
    daysCounter = [];
    daysCounter2 = [];
    getyears = [];
    getmonths = [];
    getdays = [];
    getyears2 = [];
    getmonths2 = [];
    getdays2 = [];
    var taps2 = snapshot.val();
    for (var keys in taps2) {
        if (keys == 'name') {
            beer_name2.innerHTML = taps2[keys] + 's';
            tap2_name_text = taps2[keys];
        } else if (keys == 'times') {
            tap2Num = taps2[keys].length - 1
            tap2Number.innerHTML = tap2Num;
            for (var each3 in taps2[keys]) {

                for (var start3 in taps2[keys][each3]) {
                    if (start3 == 'start_time') {
                        starttimeArray2.push(taps2[keys][each3][start3]);
                        hoursArray.push(taps2[keys][each3][start3]);
                    } else if (start3 == 'stop_time') {
                        stoptimeArray2.push(taps2[keys][each3][start3]);
                    }

                }
            }
        } else if (keys == 'alltimes'){
            for (var each4 in taps2[keys]){
                for (var start4 in taps2[keys][each4]){
                    if (start4 == 'start_time') {
                        otherstarttimes2.push(taps2[keys][each4][start4]);
                        // hoursArray.push(taps2[keys][each4][start4]);
                    }else if (start4 == 'stop_time') {
                        otherstoptimes2.push(taps2[keys][each4][start4]);
                    }
                }
            }
        } else if (keys == 'current_keg'){
            for (var each5 in taps2[keys]) {
                if (each5 == 'amount') {
                    gallons2 = taps2[keys][each5];
                }
            }
        }
    }
    // Google Charts call
    parseTimes();
    getTimes();
    setTimeout(drawPieChart, 1000);
    setTimeout(drawChart, 1000);
    setTimeout(drawChart2, 1000);
    // setTimeout(drawCalendarChart, 1000);
    topBeer();
    amount();
    //---------------------
    // Set total # of beers
    //---------------------
    total_beers.innerHTML = tap1Num;

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    // Set number of tap2 beers
    tap2Number.innerHTML = "Calculating";
    total_beers.innerHTML = "Calculating";
});


//--------------
// Get Top Drink
//--------------
var topBeer = function() {
    if (tap1Num > tap2Num){
        topbeer.innerHTML = "Most Poured Drink: " + tap1_name_text;
        ounces2.innerHTML = String(tap2Num*12);
    } else {
        topbeer.innerHTML = "Most Poured Drink: " + tap2_name_text;
        ounces2.innerHTML = String(tap2Num*12);
    }
};


//----------------------------
// How much is left in the keg
//----------------------------
var amount = function(){
    //128oz in 1 gallon
    //TODO: get date keg was inserted and get number of beers poured after that date
}





//---------------------------------------
// Get Hours, Minutes, Seconds of pouring
//---------------------------------------
var getTimes = function() {
    var tap1Seconds = (starttimeArray1.length)*6;
    var tap2Seconds = (starttimeArray2.length)*6;

    var tap1Minutes = (starttimeArray1.length)/60;
    var tap2Minutes = (starttimeArray2.length)/60;

    var tap1Hours = (tap1Seconds/3600);
    var tap2Hours = (tap2Seconds/3600);

    total_hours.innerHTML = tap1Hours.toFixed(1);
    total_minutes.innerHTML = tap1Minutes.toFixed(1);
    total_seconds.innerHTML = tap1Seconds.toFixed(0);

    total_hours2.innerHTML = tap2Hours.toFixed(1);
    total_minutes2.innerHTML = tap2Minutes.toFixed(1);
    total_seconds2.innerHTML = tap2Seconds.toFixed(0);
};



//--------------------------------------------
// Parse Times to get number of beers per hour
//--------------------------------------------
var parseTimes = function(){


    // Add times from tap 1
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


    // Add times from tap 2
    for (var each2 in starttimeArray2){
        hour2 = new Date(starttimeArray2[each2]).getHours();

        year2 = new Date(starttimeArray2[each2]).getUTCFullYear();
        if (year == 116){
            year = 2016;
        }

        month2 = new Date(starttimeArray2[each2]).getMonth();
        // month = month + 1;

        day2 = new Date(starttimeArray2[each2]).getUTCDate();

        gethours2.push(hour2);
        getyears2.push(year2);
        getmonths2.push(month2);
        getdays2.push(day2);
    }

    // Sort gethours Array
    gethours.sort();
    gethours2.sort();

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

    for (var j = 0; j < getdays2.length; j++) {
        daysCounter2[getdays2[j]] = (daysCounter2[getdays2[j]] + 1) || 1;
        daysNumberObject2 = {
            day: getdays2[j],
            number: daysCounter2[getdays2[j]]
        };
    }

    // Filter out duplicates and count them
    for (var j = 0; j < gethours2.length; j++) {
        hoursCounter2[gethours2[j]] = (hoursCounter2[gethours2[j]] + 1) || 1;
    }

};

//---------------------------
// Google Charts
// Load the Visualization API
// and the corechart package.
//---------------------------

google.charts.load('current', {'packages': ['corechart', 'calendar']});


google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawPieChart);
// google.charts.setOnLoadCallback(drawCalendarChart);
google.charts.setOnLoadCallback(drawCheeseChart);
google.charts.setOnLoadCallback(drawCheese2Chart);

//-------------
// Create chart
//-------------
function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Times');
    data.addColumn('number', 'Drinks per Hour');
    var date;


    for (var key in hoursCounter) {
        var num = 0;

        if (key >= 12) {
            date = key + ':00';
        } else {
            date = key + ':00';
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
        colors: ['#4cae4c'],
        outlineColor: ['#000']
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}



//-------------
// Create chart
//-------------
function drawChart2() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Times');
    data.addColumn('number', 'Coffees per Hour');
    var date;


    for (var key in hoursCounter2) {
        var num = 0;

        if (key >= 12) {
            date = key + ':00';
        } else {
            date = key + ':00';
        }

        num = hoursCounter2[key];

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
            title: "Number of Coffees",
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
        colors: ['#2E0854'],
        outlineColor: ['#000']
    };


    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
}




function drawPieChart() {

    var data = google.visualization.arrayToDataTable([
        ['Name', 'Number of Drinks'],
        [tap1_name_text, tap1Num],
        [tap2_name_text, tap2Num]
    ]);

    var options = {
        slices: {
            0: { color: 'green' },
            1: { color: 'lightgreen' }
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
            title: "Number of Grilled Cheese",
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
            title: "Number of Grilled Cheese",
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
