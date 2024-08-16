const nps = 1;

const yearSelector = document.getElementById("yearSelector");
const defaultYear = 1970;
const maxYear = 9999;

function getCurrentYear() {
  let currentYear;
  try {
    currentYear = new Date().getFullYear();
  } catch {
    currentYear = defaultYear;
  }
  if (currentYear > maxYear) {
    currentYear = defaultYear;
  }
  return currentYear;
}

const startYear = getCurrentYear();
const countYears = 14;
const endYear = Math.min(startYear + countYears - 1, maxYear);

function populateYears() {
  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelector.appendChild(option);
  }
}

populateYears();
generateCalendar();

function generateCalendar() {
  const year = Math.floor(document.getElementById("yearSelector").value);
  const month = Math.floor(document.getElementById("monthSelector").value);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let tura = 4;

  if (nps < 2) {
    if (urlParams.has("tura")) {
      const turaValue = urlParams.get("tura");
      if (
        !isNaN(turaValue) &&
        parseInt(turaValue) >= 1 &&
        parseInt(turaValue) <= 4
      ) {
        tura = parseInt(turaValue);
        if (tura % 2 == 0) tura = 6 - tura;
      }
    }
  } else {
    tura = 4;
  }
  var date1 = new Date(year, month, 1);
  var date0 = new Date(2024, 0, 1);
  var doy = Math.ceil((date1 - date0) / 86400000);

  let calendarHTML =
    "<table><tr><th>dum</th><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th></tr><tr>";

  let dayCount = 1;

  for (let i = 0; i < 42; i++) {
    let doyClass = `doy${(doy + tura) % 4}`;
    if (i >= firstDay && dayCount <= daysInMonth) {
      if (nps < 2) {
        if (i % 7 === 5) if ((doy + tura) % 4 === 3) doyClass = `doy2`;
        if (i % 7 === 6) if ((doy + tura) % 4 === 2) doyClass = `doy3`;
      }
      calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
      doy++;
      dayCount++;
    } else {
      calendarHTML += "<td></td>";
    }

    if (i % 7 === 6 && dayCount <= daysInMonth) {
      calendarHTML += "</tr><tr>";
    }

    if (dayCount > daysInMonth && i % 7 == 6) {
      break;
    }
  }

  calendarHTML += "</tr></table>";
  document.getElementById("calendarContainer").innerHTML = calendarHTML;
}
