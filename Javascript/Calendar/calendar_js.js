/*Calendar JS*/

var toDay = new Date();
var year = toDay.getFullYear();
var month = toDay.getMonth();
var currentDay = toDay, currentYear = year, currentMonth = month;

/*
Display calendar by month in year
*/
function displayMonth(year, month) {
    var firstDay = new Date(year, month, 1).getDay();
    var numberDays = new Date(year, month + 1, 0).getDate();

    for (i = 0; i < numberDays; i++) {
         var day = i + 1;
         var id = i + firstDay;
         document.getElementById("day" + id).innerHTML = day;
    };
}

/*
Display previous or next month and year.
valueMonth and valueYear can be negative value.
previous (-1), next (+1)
*/
function displayMonthCustoms(valueYear, valueMonth) {
    clearTable();
    currentYear += valueYear;
    currentMonth += valueMonth;
    check(currentMonth);
    displayMonth(currentYear, currentMonth);
    monthForDisplay = currentMonth + 1;
    document.getElementById("time").innerHTML = currentYear + "/" + monthForDisplay;
}


function clearTable() {
    for (i = 0; i < 42; i++) {
         document.getElementById("day" + i).innerHTML = null;
    };
}


function check(month) {
    if (month > 11) {
        currentMonth = 0;
        currentYear += 1;
    } else if (month <0) {
        currentMonth = 11;
        currentYear -= 1;
    };
}