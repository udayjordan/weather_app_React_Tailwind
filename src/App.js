import hotBg from "./assets/sam-schooler-E9aetBe2w40-unsplash.jpg";
import rainBg from "./assets/jonathan-bowers-BqKdvJ8a5TI-unsplash.jpg";
import coldBg from "./assets/erin-mckenna-QjTUB3TMmLM-unsplash.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function App() {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [loader, setLoader] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  useEffect(() => {
    setLoader(true);
    setCityNotFound(false);

    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);

      if(data){
      setTimeout(() => {
        setWeather(data);
        setLoader(false);
      }, 1000);

      const threshold = units === "metric" ? 10 : 50;

      if (data.temp <= threshold) setBg(coldBg);
      else if (data.temp >= threshold && data.humidity > 65) setBg(rainBg);
      else setBg(hotBg);
    }
    else{
      setLoader(false);
      setCityNotFound(true);
    }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div
      className="bg-cover bg-center sm:h-screen h-full w-full"
      style={{ backgroundImage: `url(${bg})` }}
    >
    
      <div>
        {weather ? (
          <div className="p-4 h-full flex justify-center items-center  flex-col max-w-[800px] m-auto">
            <div className="section section_inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City or ZIP Code"
              />
              <button
                className="text-black "
                onClick={(e) => handleUnitsClick(e)}
              >
                °F
              </button>
            </div>
            {loader ? (
              <div className="h-[70vh] w-full flex justify-center items-center m-auto">
                <ImSpinner2 className=" text-5xl animate-spin text-white" />
              </div>
            ) : (
              <div>
              {cityNotFound ? (
                
                <p style={{ fontWeight: "bold", fontSize: "24px" }}>City not found</p>
                ) : (
                  <div>
                  <div className=" p-4 rounded-2xl text-white w-full section_temperature">
                  <div className="flex flex-col items-center justify-center">
                    <h3>{`${weather.name},${weather.country}`}</h3>
                    <img src={weather.iconURL} alt="weatherIcon" />
                    <h3>{weather.description}</h3>
                  </div>
                  <div className="text-[60px] ml-20">
                    <h1>{`${weather.temp.toFixed()} °${
                      units === "metric" ? "C" : "F"
                    }`}</h1>
                  </div>
                </div>
                <Descriptions weather={weather} units={units} />
                </div>
                )}

              
    
                
              </div>
            )}
          </div>
        ) : (
          <div className=" w-full h-[90vh] flex justify-center text-center align-middle items-center ">
            <div>
              <ImSpinner2 className="text-5xl animate-spin text-white "></ImSpinner2>
            </div>
          </div>
        )}
      
      </div>
      <div className="absolute bottom-2 right-2 text-white text-center">
  <p style={{ fontWeight: "bold" }}>
    Made with <span className="animate-heartBeat"><FaHeart color="red" /> </span> by Uday
  </p>
</div>
    </div>
  );
}

export default App;
