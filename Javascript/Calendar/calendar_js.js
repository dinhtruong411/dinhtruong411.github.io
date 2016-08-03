/*Calendar JS*/
var idToDay;     // var mark today position
var Now = new Date();
var toDay = Now.getDate();
var thisYear = Now.getFullYear();
var thisMonth = Now.getMonth();
var currentMonth = thisMonth, currentYear = thisYear;
/*
Display calendar by month in year
*/
function displayMonth() {
    clearTable();
    check();
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var numberDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (i = 0; i < numberDays; i++) {
         var day = i + 1;
         var id = i + firstDay;
         document.getElementById("day" + id).innerHTML = day;
    };
    if (currentMonth == thisMonth && currentYear == thisYear) {
        idToDay = toDay + firstDay - 1;
        document.getElementById("day" + idToDay).style.color = "#009900";
        document.getElementById("day" + idToDay).style.fontWeight = "bold"
    } else {
        document.getElementById("day" + idToDay).style.color = "black";
        document.getElementById("day" + idToDay).style.fontWeight = "normal"
    };
    document.getElementById("month").value = currentMonth;
    document.getElementById("year").value = currentYear;

}

/*
Action when month has been selected
*/
function displayByMonth(month) {
    currentMonth = Number(month);
    displayMonth();
}

/*
Action when year has been selected
*/
function displayByYear(year) {
    currentYear = Number(year);
    displayMonth();
}


function createYearSelect() {
    var yearLocal = document.getElementById("year_local");
    var yearSelect = document.createElement("select");
    yearSelect.setAttribute("id", "year");
    yearSelect.setAttribute("onchange", "displayByYear(value)");
    for (i = 2050; i >= 1302; i--) {
        var option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = i;
        yearSelect.appendChild(option);
    }
    yearLocal.appendChild(yearSelect);
}

/*
Display previous or next month and year.
valueMonth and valueYear can be negative value.
previous (-1), next (+1)
*/
function displayMonthCustoms(valueYear, valueMonth) {
    currentYear += valueYear;
    currentMonth += valueMonth;
    displayMonth();
}


function clearTable() {
    for (i = 0; i < 42; i++) {
         document.getElementById("day" + i).innerHTML = null;
    };
}

/*
Function check valid month
*/
function check() {
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    };
}

/*
Function change title background color when mouse over or out
*/
function changeTitleColor(id, Switch) {
    if (Switch == 1) {
        document.getElementById("day" + id).style.backgroundColor = "#80ff80";
    } else {
        document.getElementById("day" + id).style.backgroundColor = "white";
    };
}

/*
Function set date to input form
*/
function setDate(id) {
    var day = document.getElementById("day" + id).innerHTML;
    if (day != "") {
        document.getElementById("date").value = day + "/" + Number(currentMonth + 1) + "/" + currentYear;
        
    } else {
        document.getElementById("date").value = null;
    };
}