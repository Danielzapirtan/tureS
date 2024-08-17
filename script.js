const nps = 1;

const yearSelector = document.getElementById("yearSelector");
yearSelector.value = new Date().getFullYear();
const monthSelector = document.getElementById("monthSelector");
monthSelector.value = new Date().getMonth() + 1;
generateCalendar();

function generateCalendar() {
  let year = Math.floor(document.getElementById("yearSelector").value);
  let month = Math.floor(document.getElementById("monthSelector").value) - 1;
  if (year < 2024 || year > 2037 || !year) {
    year = new Date().getFullYear();
    yearSelector.value = year;
  }
  if ((month + 1 < 1) || (month + 1 > 12) || !monthSelector.value) {
    month = new Date().getMonth();
    monthSelector.value = month + 1;
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let tura = 4;

  if (nps < 1) {
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
  const date1 = new Date(year, month, 1);
  const date0 = new Date(2024, 0, 1);
  let doy = Math.ceil((date1 - date0) / 86400000);

  let calendarHTML = `<table><tr><th>dum</th><th>lun</th><th>mar</th><th>mie</th><th>joi</th><th>vin</th><th>sâm</th></tr><tr>`;

  let dayCount = 1;

  for (let i = 0; i < 42; i++) {
    let doyClass = `doy${(doy + tura) % 4}`;
    if (i >= firstDay && dayCount <= daysInMonth) {
      if (nps == 1) {
        if (i % 7 === 5) if ((doy + tura) % 4 === 3) doyClass = `doy2`;
        if (i % 7 === 6) if ((doy + tura) % 4 === 2) doyClass = `doy3`;
      }
      calendarHTML += `<td class="${doyClass}">${dayCount}</td>`;
      doy++;
      dayCount++;
    } else {
      calendarHTML += `<td></td>`;
    }

    if (i % 7 === 6 && dayCount <= daysInMonth) {
      calendarHTML += `</tr><tr>`;
    }

    if (dayCount > daysInMonth && i % 7 == 6) {
      break;
    }
  }

  calendarHTML += `</tr></table>`;
  document.getElementById("calendarContainer").innerHTML = calendarHTML;
}
