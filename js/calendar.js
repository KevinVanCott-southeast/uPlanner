const calendarArea = document.getElementById('calendar');

const monthLongLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthShortLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const dayOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date(); //stays todays date
const todayDay = today.getDate();
const todayMonth = today.getMonth(); //index;
const todayYear = today.getFullYear();

var currentDay = new Date(); //user cycles to new dates
var dd = currentDay.getDate();
var mm = currentDay.getMonth() + 1;
var yyyy = currentDay.getFullYear();

var currentDayYear = currentDay.getFullYear();
var currentDayMonth = currentDay.getMonth(); //index
var currentDayDay = currentDay.getDate();

var currentDayMonthWord = monthLongLabels[currentDayMonth];

var currentView = "year";

(function () {

  showView();

})();

function showView(){
  if(currentView == "year"){
    showYearView();
  } else if(currentView == "month"){
    showMonthView();
  } else if(currentView == "week"){
    showWeekView();
  } else if(currentView == "day"){
    showDayView();
  }
}

function showYearView() {
  calendarArea.innerHTML = createYearSkelaton();
}

function showMonthView() {
  calendarArea.innerHTML = createMonthSkelaton();
}

function showWeekView() {
  calendarArea.innerHTML = createWeekSkelaton();
}

function showDayView() {
  calendarArea.innerHTML = createDaySkelaton();
}

function createYearSkelaton() {
  let html = //html
  `    
    <table class="view-year">
      <tr>
        <th class="year-previous">
          <button id="year-previous"><</button>
        </th>
        <th id="year">${currentDayYear}</th>
        <th class="year-next">
          <button id="year-next">></button>
        </th>
      </tr>
    </table>
    <table class="view-year">
      <tr>
        <td>
  `;

  let monthOfYear = 0;

  monthShortLabels.forEach( function(monthLabel){

    if(monthOfYear == currentDayMonth && todayYear == currentDayYear){
      html += //html
      `
        <div class="this-month">
      `;
    }
    else if(monthOfYear % 2 == 0){
      html += //html
      `
        <div class="odd-month">
      `;
    } else {
      html += //html
      `
        <div class="even-month">
      `;
    }

    html += //html
    `
        <div class="month-label">
          ${monthLabel}
        </div>
      </div>
    `;
    monthOfYear++;
  });

  html += //html
  `
        </td>
      </tr>
    </table>
  `;

  html += /*html*/ `</table>`;

  return html;
}

function createMonthSkelaton() {
  updateShortDates();
  let html = //html
    `
      <table class="view-month">
        <tr>
          <th class="year-previous">
            <button id="year-previous"><</button>
          </th>
          <th id="year">
            ${currentDayYear}
          </th>
          <th class="year-next">
            <button id="year-next">></button>
          </th>
        </tr>
        <tr>
          <th class="month-previous">
            <button id="month-previous"><</button>
          </th>
          <th id="month">
            ${currentDayMonthWord}
          </th>
          <td class="month-next">
            <button id="month-next">></button>
          </td>
        </tr>
      </table>
      <table class="view-month">
        <tr>
    `;
  dayOfWeekLabels.forEach(function (dayLabel) {
    html += //html
      `
        <td class="day-of-week-label">${dayLabel}</td>
      `;
  });
  html += /*html*/ `</tr>`

  let dayOfMonth = 1 - new Date(currentDayYear + "-" + currentDayMonthWord + "-01").getDay();
  let daysInMonth = calcDaysInMonth(currentDayYear, currentDayMonth + 1);

  let numWeeksToPrint = 0;
  if (daysInMonth == 28 && dayOfMonth == 1) {
    numWeeksToPrint = 4;
  } else if ((daysInMonth == 31 && dayOfMonth >= -3) || (daysInMonth == 30 && dayOfMonth >= -4) || (daysInMonth == 29 && dayOfMonth >= -5) || (daysInMonth == 28 && dayOfMonth >= -6)) {
    numWeeksToPrint = 5;
  } else {
    numWeeksToPrint = 6;
  }

  for (let week = 1; week <= numWeeksToPrint; week++) {
    html += /*html*/ `<tr>`;
    for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
      if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
        if (dayOfMonth == currentDayDay && currentDayMonth == todayMonth && currentDayYear == todayYear) {
          html += /*html*/ `<td class="to-day"><div class="day-label">${dayOfMonth++}</div></td>`;
        } else if (dayOfMonth % 2 == 1) {
          html += /*html*/ `<td class="odd-day"><div class="day-label">${dayOfMonth++}</div></td>`;
        } else {
          html += /*html*/ `<td class="even-day"><div class="day-label">${dayOfMonth++}</div></td>`;
        }
      } else {
        html += /*html*/ `<td class="blank-day"></td>`;
        dayOfMonth++;
      }

    }
    html += /*html*/ `</tr>`;
  }
  html += /*html*/ `</table>`
  return html;
}

function createWeekSkelaton() {
  let html = /*html*/ `<table class="view-week">`;
  dayOfWeekLabels.forEach(function (dayLabel) {
    html += //html
      `
        <tr>
          <th class="day-of-week-label">${dayLabel}</th>
          <td></td>
        </tr>
      `;
  });

  html += /*html*/ `</table>`;

  return html;
}

function createDaySkelaton() {
  let html = //html
    `
      <table class="view-day">
        <tr>
          <th>Date</th>
        </tr>
        <tr>
          <td>
          
          </td>
        </tr>
      </table>
    `;
  return html;
}

$(document).on('click', '#year-previous', function (e) {
  e.preventDefault();
  currentDayYear--;
  showView();
});

$(document).on('click', '#year-next', function (e) {
  e.preventDefault();
  currentDayYear++;
  showView();
});

$(document).on('click', '#month-previous', function (e) {
  e.preventDefault();
  if (currentDayMonth == 0) {
    currentDayMonth = 11;
    currentDayMonthWord = monthLongLabels[currentDayMonth];
    currentDayYear--;
  } else {
    currentDayMonthWord = monthLongLabels[--currentDayMonth];
  }
  showView();
});

$(document).on('click', '#month-next', function (e) {
  e.preventDefault();
  if (currentDayMonth == 11) {
    currentDayMonth = 0;
    currentDayMonthWord = monthLongLabels[currentDayMonth];
    currentDayYear++;
  } else {
    currentDayMonthWord = monthLongLabels[++currentDayMonth];
  }
  showView();
});

function updateShortDates() {
  dd = currentDay.getDate();
  mm = currentDay.getMonth() + 1;
  yyyy = currentDay.getFullYear();
}

function calcDaysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}