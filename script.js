const nps = 1;
const currentYear = new Date().getFullYear();
let year = currentYear;
let month = new Date().getMonth();
const yearButtons = document.querySelectorAll('.year-buttons button');
let iear = currentYear;
yearButtons.forEach(button => {
	button.textContent = iear;
	iear++;
});
const monthNames = [
	"ian",
	"feb",
	"mar",
	"apr",
	"mai",
	"iun",
	"iul",
	"aug",
	"sep",
	"oct",
	"noi",
	"dec"
];

function highlight(button1) {
	button1.classList.add("highlight");
}

function lowlight(buttons) {
	buttons.forEach(button1 => {
		button1.classList.remove("highlight");
	});
}

const monthButtons = document.querySelectorAll('.month-buttons button');
const monthName = monthNames[month];
monthButtons.forEach(button => {
	if (monthName === button.textContent) {
		lowlight(monthButtons);
		highlight(button);
	}
});

yearButtons.forEach(button => {
	const year1 = parseInt(button.textContent);
	if (year1 == currentYear) {
		lowlight(yearButtons);
		highlight(button);
	}
});

monthButtons.forEach(button => {
	button.addEventListener('click', () => {
		const monthName = button.textContent;
		let ix = 0;
		monthNames.forEach(currMonthName => {
			if (monthName == currMonthName) {
				month = ix;
			}
			ix++;
		});
		lowlight(monthButtons);
		highlight(button);
		updateCalendar();
	});
});

yearButtons.forEach(button => {
	button.addEventListener('click', () => {
		year = parseInt(button.textContent);
		lowlight(yearButtons);
		highlight(button);
		updateCalendar();
	});
});

updateCalendar();

function updateCalendar() {
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
