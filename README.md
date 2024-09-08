# Weather App

An App to show the weather report of different cities.


## API Reference

#### Get All Cities

```http
  GET https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offset}&page=${page}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | number | **Required** |
|  `limit` | number | **Required** |
| `offset` | number | **Required** |

#### Get City Details

```http
  GET https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiId}
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `Api_key`   | `string` | **Required** |
| `city-name` | `string` | **Required** |



## Installation

Install weather app project using React.js

```bash
  npm create vite@latest
  npm install
  npm run dev
```
    

## Dependencies

react-router-dom -- used for changing routes

react-icons -- used to import react icons


## Documentation

### This app consist of two pages 

#### CitiesTable Page

    In this table an api request is fetched and the response is stored in the state.
    The response is shown in the table format.
    When one column(cityname) is clicked it redirects to the weather page.

#### Weather Page

    The weather report of the city is shown in this page


## Features

    An autocomplete search input.
    City names with timezone and coordinates.
    Weather report of the city.
    Dynamic background images.
    Dynamic react icons
    Responsive Layout


## Frameworks

    Tailwind CSS