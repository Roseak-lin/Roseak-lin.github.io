var count = 0, best = Infinity, sumOfTimes = 0, attempts = 0;
var start, end;

// set up table
function buildTable() {
    let html = "<table style='border: 1px solid black'><tr>";
    // button id
    let bID = 0;
    for (let i = 0; i < 4; i++) {
        let used = false;
        for (let j = 0; j < 4; j++) {
            bID++;
            let n = Math.random() * 10;
            if (j == 3 && !used) {
                html += "<td><button id='" + bID + "' onclick='tileClick(1, " + bID + ")' class='red-btn'/></td>"
                break;
            }
            // 30% chance of creating the red tile
            if (n < 3 && !used) {
                html += "<td><button id='" + bID + "' onclick='tileClick(1, " + bID + ")' class='red-btn'/></td>"
                used = true;
            } else {
                html += "<td><button id='" + bID + "' onclick='tileClick(0, " + bID + ")' class='blue-btn'/></td>"
            }
        }
        html += "</tr><tr>";
    }
    html += "<tr><table>";
    document.getElementById("grid").innerHTML = html;
}

// handle button clicks
function tileClick(x, y) {
    // prevent user from repeatedly clicking the same button
    document.getElementById(y).disabled = true;
    // make button invisible
    document.getElementById(y).setAttribute("style", "background-color: white; height: 150px; width: 150px");
    console.log(x);
    let html = "";
    // if the button clicked was red
    if (x == 1) {
        count++;
        if (count == 4) {
            end = performance.now();
            attempts++;
            sumOfTimes += ((end - start)) - 0.0005;
            best = Math.min(best, ((end - start)) - 0.0005);
            html += "Your last attempt was " + ((end - start)).toFixed(0) + " ms<br><br>";
            html += "<b>Your best time so far is: " + best.toFixed(0) + " ms</b><br>";
            html += "<b>Your average time is: " + (sumOfTimes/attempts).toFixed(0) + " ms</b>";
            document.getElementById("HighScore").innerHTML = html;

            // disable buttons 
            let blue = document.getElementsByClassName("blue-btn");
            for (let i = 0; i < blue.length; i++) {
                blue[i].disabled = true;
            }
            // reset counter
            count = 0;
        }
    }
}


function countdown() {
    // disable to prevent multiple countdowns from starting
    document.getElementsByClassName("start")[0].disabled = true;
    // placeholder for grid
    let html = "<table>";
    for (let i = 0; i < 4; i++) {
        html += "<tr style='height: 150px'/>";
    }
    html += "</table>";
    document.getElementById("grid").innerHTML = html;

    // placeholder because of 1 second delay
    document.getElementById("countdown").innerHTML = 3;

    // countdown function
    let seconds = 2;
    var x = setInterval(function () {
        document.getElementById("countdown").innerHTML = seconds;
        seconds -= 1;
        if (seconds < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "GO";
            start = performance.now();
            buildTable();
            document.getElementsByClassName("start")[0].disabled = false;
        }
    }, 1000);
}

function turnOffOverlay() {
    document.getElementById("overlay").style.display = "none";
}

function turnOnOverlay() {
    document.getElementById("overlay").style.display = "block";
}