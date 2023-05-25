const  API_KEY=
'03746b843c984c40ad6085b983cb9f10';

const makeIconURL=(iconId)=>`https://api.openweathermap.org/img/w/${iconId}.png`;

const getFormattedWeatherData=async(city,units='metric')=>{

    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data=await fetch(URL)
    .then((res) => res.json())
    .then((data)=>data)
    .catch((error) => {
        console.error('Error fetching weather data:', error);
        return null;
      });

    if (!data || data.cod === '404') {
        console.error('City not found');
        return null;
      }
    const {
        weather,
        main: {temp, feels_like,temp_min,temp_max,pressure,
            humidity},
        wind:{speed},
         sys:{country},
         name, 
}=data;

const {description,icon}=weather[0];
return {
description,
iconURL:makeIconURL(icon),
temp,
feels_like,
temp_min,
temp_max,
pressure,
humidity,
speed,
country,
name,
};
};

export {getFormattedWeatherData};