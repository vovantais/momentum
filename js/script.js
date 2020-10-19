const time = document.getElementById('time'),
	greeting = document.getElementById('greeting'),
	name = document.getElementById('name'),
	focus = document.getElementById('focus'),
	swither = document.getElementById('swither'),
	quote = document.getElementById('quote'),
	author = document.getElementById('author'),
	refresh = document.getElementById('refresh-quote'),
	dateNow = document.getElementById('dateNow'),
	wrapper = document.querySelector('.wrapper'),
	weatherIcon = document.querySelector('.weather-icon'),
	temperature = document.querySelector('.temperature'),
	weatherDescription = document.querySelector('.weather-description'),
	city = document.querySelector('.city'),
	showAmPm = true,
	images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

let timeZone = '';

function getTime() {
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds();

	const amPm = hour >= 12 ? 'PM' : 'AM';

	time.textContent = `${hour}:${addZero(min)}:${addZero(sec)} ${showAmPm ? amPm : ''}`;

	setTimeout(getTime, 1000);
}
getTime();

function getTimeZone() {
	let today = new Date(),
		hour = today.getHours();
	if (hour >= 6 && hour < 12) {
		timeZone = 'Morning';
	}
	if (hour >= 12 && hour < 18) {
		timeZone = 'Day';
	}
	if (hour >= 18 && hour < 24) {
		timeZone = 'Evening';
	}
	if (hour >= 0 && hour < 6) {
		timeZone = 'Nigth';
	}
	greeting.textContent = `Good ${timeZone}`;
}
getTimeZone();

function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getDateNow() {
	const days = ['Sunday', 'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let DateNow = new Date(),
		day = DateNow.getDay(),
		date = DateNow.getDate(),
		month = DateNow.getMonth(),
		currentDay = '',
		currentMonth = '';
	days.forEach((item, index) => {
		if (index === day) {
			return currentDay = item;
		}
	})
	months.forEach((item, index) => {
		if (index === month) {
			return currentMonth = item;
		}
	})
	dateNow.textContent = `${currentDay}, ${date} ${currentMonth} `;
}
getDateNow();

function setBackgroundImage() {
	let randomImg = images[Math.floor(Math.random() * images.length)];
	wrapper.style.backgroundImage = `url('../momentum/img/${timeZone}/${randomImg}')`;
	setTimeout(setBackgroundImage, 3600000);
}
setBackgroundImage();

function getQuote() {
	const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
	fetch(url)
		.then(res => res.json())
		.then(result => renderQuoteToText(result))
		.catch(err => console.log(err.message))
}
getQuote();
function renderQuoteToText(res) {
	if (res.quoteText !== '' && res.quoteAuthor !== '') {
		quote.textContent = res.quoteText;
		author.textContent = res.quoteAuthor;
	}
}

function getName() {
	if (localStorage.getItem('name') === null) {
		name.textContent = '[Enter Name]';
	} else {
		name.textContent = localStorage.getItem('name');
	}
}
getName();

function setName(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('name', e.target.innerText);
			name.blur();
		}
	} else {
		localStorage.setItem('name', e.target.innerText);
	}
}

function getFocus() {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[Enter Focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}
getFocus();
function setFocus(e) {
	if (e.type === 'keypress') {
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('focus', e.target.innerText);
			focus.blur();
		}
	} else {
		localStorage.setItem('focus', e.target.innerText);
	}
}
async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=09614ed9c1f7f523fb5ce134d47fc2a4&units=metric`;
	const req = await fetch(url);
	const data = await req.json();

	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
	weatherDescription.textContent = data.weather[0].description;
}

function setCity(e) {
	if (e.code === 'Enter') {
		getWeather();
		city.blur();
	}
}


document.addEventListener('DOMContentLoaded', renderQuoteToText);
document.addEventListener('DOMContentLoaded', setBackgroundImage);
document.addEventListener('DOMContentLoaded', getWeather);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('keypress', setCity);

swither.addEventListener('click', () => {
	setBackgroundImage();
})
refresh.addEventListener('click', () => {
	refresh.classList.toggle('active');
	setTimeout(getQuote, 200);
});
