import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const CitiesTable = () => {
    const [cities, setCities] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [cityName, setCityname] = useState();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const citiesDetails = async () => {
        await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offset}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
            const updatedData = data.results.map(eachCity => ({
                latCoordinate : eachCity.coordinates.lat,
                lonCoordinate: eachCity.coordinates.lon,
                countryName : eachCity.cou_name_en,
                geonameId: eachCity.geoname_id,
                name: eachCity.name,
                population: eachCity.population,
                timezone: eachCity.timezone
            }));
            setLoading(false)
            setCities(prev => [...prev, ...updatedData]);
        })
        .catch(() => setError(true))
    }

    useEffect(() => {
        citiesDetails()
    }, [page])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setLimit((prev)=> prev + 0)
            setOffset((prev) => prev + 20)
            setPage((prev) => prev + 1)
            setLoading(true)
        }
    }

    useEffect(()=> {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

   
   useEffect(() => {
    if (cityName !== "") {
        const filteredNames = cities.filter((cityDetails) => {
            return cityDetails.name.toLowerCase().includes(cityName.toLowerCase())
        })
        setSearchData(filteredNames)
    }else {
        setSearchData([])
    }
    
   }, [cityName])
   
   const searchOnclick = () => {
        if (cityName) {
            const filteredData = cities.filter((cityDetails) => {
                return cityDetails.name.toLowerCase().includes(cityName.toLowerCase())
            })
            setCities(filteredData)
            setLoading(false)
        }
        else if (cityName === "") {
            window.location.reload();
            setLoading(true)
        }
   }
        

  return (
            <div className='min-h-screen w-screen flex flex-col items-center bg-gradient-to-r from-sky-500 to-indigo-500 p-4'>
                <h1 className='text-lg md:text-xl lg:text-2xl font-bold text-red-900 m-3'>Name of the Cities</h1>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col md:flex-row justify-center items-center'>
                        <input type="text" value={cityName} placeholder='Enter The City Name' onChange={(e) => setCityname(e.target.value)} className='bg-slate-200 px-2 text-lg text-red-800 outline-none rounded-md' />
                        <button type="button" className='text-white font-semibold bg-red-900 ml-2 mt-2 md:mt-0 px-3 py-0.5 rounded-lg' onClick={() => {searchOnclick()}}>Search</button>
                    </div>
                    <div className='relative'>
                        {
                            cityName === undefined ? "" : (
                                <div className='w-52 h-40 overflow-y-auto absolute top-0'>
                                    {searchData.map((eachCityName) => {
                                        return (
                                                <h1 className='text-gray-100 font-normal text-base bg-neutral-700' key={eachCityName.geonameId} value={eachCityName} onClick={() => {setCityname(eachCityName.name), setSearchData([])}}>{eachCityName.name}</h1>                                
                                        )
                                    })}
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    error ? (
                        <div className='flex flex-col justify-center items-center mt-10'>
                            <h1 className='text-white text-xl font-bold'>Something went wrong</h1>
                            <button type="button" className='text-white text-lg bg-slate-800 rounded-lg px-3 py-1' onClick={() => citiesDetails}>Retry</button>
                        </div>
                    ) : (
                        <>
                        <table className='border-collapse border border-slate-400 mt-5'>
                            <thead>
                                <tr>
                                    <th className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-orange-200 bg-cyan-800 px-3 py-3'>City Name</th>
                                    <th className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-orange-200 bg-cyan-800 px-3 py-3'>Country Name</th>
                                    <th className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-orange-200 bg-cyan-800 px-3 py-3'>Population</th>
                                    <th className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-orange-200 bg-cyan-800 px-3 py-3'>Time Zone</th>
                                    <th className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-orange-200 bg-cyan-800 px-3 py-3'>Coordinates</th>
                                </tr>
                            </thead>
                            <tbody className='items-center'>
                                {
                                    cities.map((item) =>{
                                        return (
                                            <tr key={item.geonameId} className='justify-center' >
                                                <td className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-neutral-700 p-3'><Link to={`/weather/${item.name}`}>{item.name}</Link></td>
                                                <td className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-neutral-700 p-3'>{item.countryName}</td>
                                                <td className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-neutral-700 p-3'>{item.population}</td>
                                                <td className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-neutral-700 p-3'>{item.timezone}</td>
                                                <td className='border border-slate-300 text-center text-sm md:text-base lg:text-lg font-medium text-neutral-700 p-3'>{item.lonCoordinate}, {item.latCoordinate}</td>
                                            </tr>
                                        )
                                    } )
                                }
                            </tbody>
                        </table>
                        {loading && <h1 className='text-green-600 text-2xl font-medium'>Loading...</h1>}
                        </>
                    )
                }
            </div>
  )
}

export default CitiesTable
