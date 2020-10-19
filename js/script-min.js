const time=document.getElementById("time"),greeting=document.getElementById("greeting"),name=document.getElementById("name"),focus=document.getElementById("focus"),swither=document.getElementById("swither"),quote=document.getElementById("quote"),author=document.getElementById("author"),refresh=document.getElementById("refresh-quote"),dateNow=document.getElementById("dateNow"),wrapper=document.querySelector(".wrapper"),weatherIcon=document.querySelector(".weather-icon"),temperature=document.querySelector(".temperature"),weatherDescription=document.querySelector(".weather-description"),city=document.querySelector(".city"),showAmPm=!0,images=["01.jpg","02.jpg","03.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg"];let timeZone="";function getTime(){let e=new Date,t=e.getHours(),n=e.getMinutes(),o=e.getSeconds();const a=t>=12?"PM":"AM";time.textContent=`${t}:${addZero(n)}:${addZero(o)} ${a}`,setTimeout(getTime,1e3)}function getTimeZone(){let e=(new Date).getHours();e>=6&&e<12&&(timeZone="Morning"),e>=12&&e<18&&(timeZone="Day"),e>=18&&e<24&&(timeZone="Evening"),e>=0&&e<6&&(timeZone="Nigth"),greeting.textContent="Good "+timeZone}function addZero(e){return(parseInt(e,10)<10?"0":"")+e}function getDateNow(){let e=new Date,t=e.getDay(),n=e.getDate(),o=e.getMonth(),a="",r="";["Sunday","Moday","Tuesday","Wednesday","Thursday","Friday","Saturday"].forEach((e,n)=>{if(n===t)return a=e}),["January","February","March","April","May","June","July","August","September","October","November","December"].forEach((e,t)=>{if(t===o)return r=e}),dateNow.textContent=`${a}, ${n} ${r} `}function setBackgroundImage(){let e=images[Math.floor(Math.random()*images.length)];wrapper.style.backgroundImage=`url('../momentum/img/${timeZone}/${e}')`,setTimeout(setBackgroundImage,36e5)}function getQuote(){fetch("https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en").then(e=>e.json()).then(e=>renderQuoteToText(e)).catch(e=>{})}function renderQuoteToText(e){""!==e.quoteText&&""!==e.quoteAuthor&&(quote.textContent=e.quoteText,author.textContent=e.quoteAuthor)}function getName(){null===localStorage.getItem("name")?name.textContent="[Enter Name]":name.textContent=localStorage.getItem("name")}function setName(e){"keypress"===e.type?13!=e.which&&13!=e.keyCode||(localStorage.setItem("name",e.target.innerText),name.blur()):localStorage.setItem("name",e.target.innerText)}function getFocus(){null===localStorage.getItem("focus")?focus.textContent="[Enter Focus]":focus.textContent=localStorage.getItem("focus")}function setFocus(e){"keypress"===e.type?13!=e.which&&13!=e.keyCode||(localStorage.setItem("focus",e.target.innerText),focus.blur()):localStorage.setItem("focus",e.target.innerText)}async function getWeather(){const e=`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=09614ed9c1f7f523fb5ce134d47fc2a4&units=metric`,t=await fetch(e),n=await t.json();weatherIcon.className="weather-icon owf",weatherIcon.classList.add("owf-"+n.weather[0].id),temperature.textContent=n.main.temp.toFixed(0)+"°C",weatherDescription.textContent=n.weather[0].description}function setCity(e){"Enter"===e.code&&(getWeather(),city.blur())}getTime(),getTimeZone(),getDateNow(),setBackgroundImage(),getQuote(),getName(),getFocus(),document.addEventListener("DOMContentLoaded",renderQuoteToText),document.addEventListener("DOMContentLoaded",setBackgroundImage),document.addEventListener("DOMContentLoaded",getWeather),name.addEventListener("keypress",setName),name.addEventListener("blur",setName),focus.addEventListener("keypress",setFocus),focus.addEventListener("blur",setFocus),city.addEventListener("keypress",setCity),swither.addEventListener("click",()=>{setBackgroundImage()}),refresh.addEventListener("click",()=>{refresh.classList.toggle("active"),setTimeout(getQuote,200)});