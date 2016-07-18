/*Calendar by JQuery*/
var	month 		= ["January", "February", "March", "April", "May", "June", "Juy", "August", "September", "October", "November", "December"],
	day			= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	now			= new Date(),
	idToDay,
	toDay		= now.getDate(),
	thisMonth	= now.getMonth(),
	thisYear	= now.getFullYear(),
	currentMonth	= thisMonth,
	currentYear		= thisYear;


function drawCalendarTable() {
	var	Table		= $("<table></table>"),
		buttonBar	= $("<tr></tr>"),
		dayBar		= $("<tr></tr>");
		
	var prevMonthBtn 	= $("<button></button>").text("<"),
		prevYearBtn		= $("<button></button>").text("<<"),
		nextMonthBtn	= $("<button></button>").text(">"),
		nextYearBtn		= $("<button></button>").text(">>");
		
	var	monthSelect	= $("<select></select>"),
		yeatInput 	= $("<input></input>"),
		dateResult	= $("<input></input>");
	
	$("body").append(dateResult);
	dateResult.attr("id", "date");
	prevMonthBtn.attr("onClick", "displayMonthCustoms(0, -1)");
	prevYearBtn.attr("onClick","displayMonthCustoms(-1, 0)");
	nextMonthBtn.attr("onClick", "displayMonthCustoms(0, 1)");
	nextYearBtn.attr("onClick","displayMonthCustoms(1, 0)");
	
	monthSelect.attr("id","monthSelect");
	monthSelect.attr("onchange", "displayByMonth(value)");
	yeatInput.attr("id","yeatInput");
	yeatInput.attr("onblur", "displayByYear(value)");

	for (i = 0; i < 12; i++) {
		tmp = $("<option></option>").text(month[i]);
		tmp.attr("value", i);
		monthSelect.append(tmp);
	}
	merge2Col = $("<th></th>").attr("colspan", "2");
	buttonBar.append($("<th></th>").append(prevYearBtn));
	buttonBar.append($("<th></th>").append(prevMonthBtn));
	buttonBar.append(merge2Col.append(monthSelect));
	buttonBar.append($("<th></th>").append(yeatInput));
	buttonBar.append($("<th></th>").append(nextMonthBtn));
	buttonBar.append($("<th></th>").append(nextYearBtn));
	Table.append(buttonBar);
	for (i = 0; i < 7; i++) {
		dayBar.append($("<th></th>").text(day[i]));
	}
	Table.append(dayBar);
	for (i = 0; i < 42; i++) {
		if (!(i % 7)) {
			weeki = $("<tr></tr>");
		}
		dayi = $("<td></td>");
		dayi.attr("id", i);
		dayi.attr("onmouseover", "changeTitleColor(id, 1)");
		dayi.attr("onmouseout", "changeTitleColor(id, 2)");
		dayi.attr("onClick", "setDate(id)");
		weeki.append(dayi);
		if (!((i + 8) % 7)) {
			Table.append(weeki);
		}
	}
	$("body").append(Table);
	displayMonth();
}

/*
Display calendar by month in year
*/
function displayMonth() {
	clearTable();
    check();
    var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    var numberDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (i = 0; i < numberDays; i++) {
         var dayy = i + 1;
         var id = i + firstDay;
         $("#" + id).html(dayy);
    };
    if (currentMonth == thisMonth && currentYear == thisYear) {
        idToDay = toDay + firstDay - 1;
		$("#" + idToDay).css({"color": "#009900", "fontWeight": "bold"});
    }
	else {
		$("#" + idToDay).css({"color": "black", "fontWeight": "normal"});
    };
	$("#monthSelect").val(currentMonth);
	$("#yeatInput").val(currentYear);
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
    if (currentYear >= 200000 || currentYear <= -200000) {
        alert("Year not valid , (-200000 < year < 200000)");
        currentYear = thisYear;
    };
    displayMonth();
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
        $("#" + i).html(null);
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
        $("#" + id).css("background-color", "#80ff80");
    } else {
        $("#" + id).css("background-color", "white");
    };
}

/*
Function set date to input form
*/
function setDate(id) {
    var day = $("#" + id).html();
    if (day != "") {
        $("#date").val(day + "/" + Number(currentMonth + 1) + "/" + currentYear);
    } else {
        $("#date").val(null);
    };
}