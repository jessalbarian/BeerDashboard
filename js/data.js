/*
 *   Get data from Firebase and transfer to Google Charts
 */




// Shortcuts to DOM elements
var total_beers = document.getElementById('total_beers');
var ipa = document.getElementById('ipa');
var porter = document.getElementById('porter');
var datesArray = [];
var numberOfBeersArray = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRkKBPzNhp_rMC7WSvF1ZNAuw46e9qN24",
    authDomain: "tiltsensorarduino.firebaseapp.com",
    databaseURL: "https://tiltsensorarduino.firebaseio.com",
    storageBucket: "tiltsensorarduino.appspot.com",
};
firebase.initializeApp(config);


//Sensor1 Data
var ref = firebase.database().ref('beers/');


// Get total beers data
ref.on("value", function (snapshot) {
    var beers = snapshot.val();
    var ipas = 0;
    var porters = 0;
    for (var key in beers) {
        // console.log(key);
        if (key == 'Sensor1') {
            for (var key2 in beers[key]) {
                for (var key3 in beers[key][key2]) {
                    if (key3 == 'beersPerDay') {
                        ipas = ipas + beers[key][key2][key3];
                        numberOfBeersArray.push(ipas);
                    }
                    if (key3 == 'datetime') {
                        var dates = beers[key][key2][key3];
                        datesArray.push(dates);
                    }
                }
            }
        }
        if (key == 'Sensor2') {
            for (var key4 in beers[key]) {
                for (var key5 in beers[key][key4]) {
                    if (key5 == 'beersPerDay') {
                        porters = porters + beers[key][key4][key5];
                        numberOfBeersArray.push(porters);
                    }
                    if (key5 == 'datetime') {
                        var dates2 = beers[key][key4][key5];
                        datesArray.push(dates2);
                    }

                }

            }
        }
    }
    porter.innerHTML = porters;
    ipa.innerHTML = ipas;
    total_beers.innerHTML = beers.total_beers;
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    ipa.innerHTML = "Calculating";
    porter.innerHTML = "Calculating";
    total_beers.innerHTML = "Calculating";
});


// Google Charts
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
window.setTimeout(drawChart, 1000);

function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Beers Per Day');

    for (var i = 0; i < datesArray.length; i++) {
        var date = datesArray[i];
        var yearValue = date.substring(0, 4);
        var monthValue = date.substring(5, 7);
        var dayValue = date.substring(8, 10);
        console.log(dayValue);
        var num = numberOfBeersArray[i];
        data.addRows([
            [new Date(yearValue, monthValue, dayValue), num]
        ]);
    }


    // Set chart options
    var options = {
        'title': 'Number of Beers Poured Per Day',
        'width': 400,
        'height': 300,
        legend: {position: 'none'},
        backgroundColor: {fill: 'transparent'},
        textStyle: {color: '#FFF'},
        titleTextStyle: {
            color: '#000'
        },
        vAxis: {
            textStyle: {
                color: '#FFF'
            }
        },
        hAxis: {
            textStyle: {
                color: '#FFF'
            }
        }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}





