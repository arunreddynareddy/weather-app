import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { IoSunnySharp } from "react-icons/io5";
import { BsFillCloudsFill } from "react-icons/bs";
import { IoRainySharp } from "react-icons/io5";
import sunnyImage from "../assets/sunny.jpg";
import cloudyImage from "../assets/cloudy.jpg";
import rainyImage from "../assets/rainy.jpg";
import normalImage from "../assets/normal.jpg";

const Weather = () => {
    const [cityDetails, setCityDetails] = useState({});
    const [error, setError] = useState(false);
    const [image, setImage] = useState();

    const {cityname} = useParams();

    const apiId ="9bb52a9d63a8112912189066d0bf61e2"

    useEffect(() => {
      const getCityDetails = async () => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiId}`)
        .then((response) => response.json())
        .then((data) => {
            const updatedData = ({
              feelsLike : data.main.feels_like,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              temp: data.main.temp,
              name: data.name,
              weatherMain : data.weather[0].main,
              windSpeed : data.wind.speed
            })
            setCityDetails(updatedData)
        })
        .catch(() => setError(true))
      };
      getCityDetails();
    }, [])

    useEffect(() => {
      const weatherCondition = cityDetails.weatherMain;
      console.log(weatherCondition)
      switch (weatherCondition) {
        case "Clear":
            return setImage(sunnyImage)
        case "Clouds":
            return setImage(cloudyImage)
        case "Rainy":
            return setImage(rainyImage)    
        default:
            return setImage(normalImage)
      }
    }, [cityDetails])

  return (
    <div className="w-screen min-h-screen bg-cover" style= {{backgroundImage: `url(${image})`}}>
      {error ? (
        <div className='flex justify-center items-center min-h-screen'>
          <h1 className='text-lime-800 text-xl md:text-2xl lg:text-3xl font-bold'>City/Weather Report is Not Found</h1>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center min-h-screen'>
          <div className='flex items-center bg-neutral-200 p-5 rounded-full'>
            <FaLocationDot size={24} color="#4d79ff" />
            <h1 className='text-cyan-500 pl-3 text-xl md:text-2xl lg:text-3xl font-bold'>{cityDetails.name}</h1>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center w-3/4 mt-12'>
            <div className='flex items-center bg-neutral-400 p-5 rounded-xl'>
              <CiTempHigh size={28} color="#660000"/>
              <div className='flex items-center pl-2'>
                <h3 className='text-orange-900 font-bold text-lg md:text-xl lg:text-2xl'>{Math.floor(cityDetails.temp - 273.15)}</h3>
                <TbTemperatureCelsius className='text-orange-900 font-bold text-2xl' />
              </div>
              <h1 className='ml-2 mr-2'>|</h1>
              <div className='flex items-center'>
                <h3 className='text-orange-900 font-bold text-lg md:text-xl lg:text-2xl'>{Math.floor(9/5 * (cityDetails.temp - 273.15) + 32)}</h3>
                <TbTemperatureFahrenheit className='text-orange-900 font-bold text-2xl' />
              </div>
            </div>
            <div className='flex items-center mt-6 md:mt-0 bg-neutral-400 p-5 rounded-xl'>
              <h3 className='text-orange-800 font-bold text-base md:text-lg lg:text-xl'>Feels Like - {Math.ceil(cityDetails.temp - 273.15)}</h3>
              <TbTemperatureCelsius className='text-orange-800 font-bold text-xl' />
            </div>
          </div> 
          <div className='flex flex-col md:flex-row justify-between items-center w-3/4 mt-12'>
            <div className='flex flex-col bg-sky-200 px-10 py-6 rounded-xl'>
              <h1 className='font-bold text-base text-lime-500'>Weather - <span className='text-white font-semibold text-4xl'>{cityDetails.weatherMain}</span></h1>
              <p className='text-white text-sm mt-6'>Humidity - <span className='text-xl font-semibold text-rose-400'>{cityDetails.humidity} %</span></p>
              <p className='text-white text-sm mt-2'>Wind Speed - <span className='text-xl font-semibold text-rose-400'>{cityDetails.windSpeed} m/s</span></p>
              <p className='text-white text-sm mt-2'>Pressure - <span className='text-xl font-semibold text-rose-400'>{Math.ceil(cityDetails.pressure * 0.000987)} atm</span></p>
            </div>
            <div className='mt-6 md:mt-0'>
              <h1>{cityDetails.weatherMain === "Clear" && <IoSunnySharp size={160} color='#800000' />}</h1>
              <h1>{cityDetails.weatherMain === "Clouds" && <BsFillCloudsFill size={160} color="#99ddff" />}</h1>
              <h1>{cityDetails.weatherMain === "Rainy" && <IoRainySharp size={160} color='#c2c2a3'  />}</h1>
            </div>   
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather
