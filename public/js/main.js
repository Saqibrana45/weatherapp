const submitBtn = document.querySelector("#submitBtn");
const cityName = document.querySelector("#cityName");
const city_name = document.querySelector(".city_name");

const temp = document.querySelector("#temp");
const temp_status = document.querySelector("#temp_status");
const dataHide = document.querySelector(".middle_layer");



const getInfo = async(event) => {
    event.preventDefault();
    const cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerHTML = "Please Enter Correct City Name";
        dataHide.classList.add("data_hide");
    }else{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=0ab39f210457be572b67f2d19a9f62cc`
            const res = await fetch(url);
            const data = await res.json();
            const arrData = [data]

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            // temp.innerText = arrData[0].main.temp;
            let kelvinTemp = parseInt(arrData[0].main.temp, 10);
            let celsiusTemp = Math.round((kelvinTemp - 273.15));
    
            temp.innerText = `${celsiusTemp}°C`;

            const tempMod = arrData[0].weather[0].main;
            if (tempMod == "Clear") {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68'></i>"
            }else if (tempMod == "Clouds") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud" style='color: #f1f2f6'></i>`
            }else if (tempMod == "Rain") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-rain" style='color: #f1f2f6'></i>`
            }else if (tempMod == "Snow") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-meatball" style='color: #a4b0be'></i>`
            }
            console.log(arrData);
            dataHide.classList.remove("data_hide")
            
        } catch{
            city_name.innerText = `Please enter the city Name Properply`;
            dataHide.classList.add("data_hide")
        }    
    }
    
}

submitBtn.addEventListener("click", getInfo)