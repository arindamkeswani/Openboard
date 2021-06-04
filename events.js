let nav = 0; //to navigate through months. Default Current month
let clicked = null; //to set value of a date to clicked
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; //if events exist in local storage, return them, else ereturn empty array

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) { //input user selected date
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked); //check if an event already exists on a date

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date(); //date object

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav); //set the month to the navigates value
  }

  const day = dt.getDate();
  const month = dt.getMonth(); //month index starts from 0
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate(); //3rd parameter gets last date of prev month. To calc number of squares to be rendered on the screen
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-GB', { //en-GB is local for UK time format which is DD-MM-YYYY
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); //this gets first day of the month for padding purposes. Padding days=Number of extra days from previous month which need to be accounted for during rendering

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-GB', { month: 'long' })} ${year}`; //to display selected month and year

  calendar.innerHTML = ''; //clearing the current rendered month to make space for navigated month

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) { //render a normal date square
      daySquare.innerText = i - paddingDays; //add actual date 
      const eventForDay = events.find(e => e.date === dayString);  //check if there is an event on the date in dayString

      if (i - paddingDays === day && nav === 0) {  //highlight current day
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else { //render padding day
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);  //add day to calendar rendering  
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();