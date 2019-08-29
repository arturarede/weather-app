# RESTful API using Node.js and Express

[![Build Status](https://travis-ci.com/Ryyk/weather-app.svg?branch=master)](https://travis-ci.com/Ryyk/weather-app)

> API + Website to compare weather between different cities

## Requirements:

This requires following software:

1. Node Js 10.16.3

## Project Setup:

1. Run:

    ```sh
    $ cd weather-app
    $ npm install
    $ npm start
    ```
2. Visit: http://localhost:8000

## Assumptions:

1. All three cities are required in order to do the comparison

## API:

- **GET**     /weather/:city - **Get a city by name**
> { "city", "temperature", "description", "icon", "lat", "lon" }
- **GET**     /suntime/:lat,:lon - **Get the sunset and sunrise times for coords**
> { "sunrise", "sunset"}

## Notes:

1. It is possible to call the API, for instance "http://localhost:8000/weather/Lisbon". The request will return a JSON object with the response required.

### Logging

- The logging is done to a file called "default.log". It includes the timestamps of the request and the internal api call.

### Sorting

- It is possible to sort the table by column.