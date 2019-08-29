const express = require('express')
const request = require('request');
const requestP = require('request-promise');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const apiKey = 'a99f2687b4dfbb59aed4f7bba6d28515'

app.get('/', function (req, res) {
    res.render('weather', {cities_data: null, error: null});
})

app.post('/', function(req, res) {
    var cities = [req.body.city_name1, req.body.city_name2, req.body.city_name3];

    getCitiesData(cities).then(function(results) {
        res.render('weather', {cities_data: results, error: null});
    });
});

app.get("/weather/:city", function(req, res) {
    var city = req.params.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(error, response, body){
        if(error){
            res.send(error);
            res.status(response.statusCode).end()
          } else {
            var weather_json = JSON.parse(body);
            if(weather_json.main == undefined){
                res.send(weather_json);
                res.status(response.statusCode).end()
            } else {
                var weather = {
                    city : city,
                    temperature : Math.round(weather_json.main.temp),
                    description : weather_json.weather[0].description,
                    icon : weather_json.weather[0].icon,
                    lat : weather_json.coord.lat,
                    lon : weather_json.coord.lon
                };
                res.send(weather);
                res.status(response.statusCode).end()
            }
        }
    });
});


app.get("/suntime/:lat,:lon", function(req, res) {
    var lat = req.params.lat;
    var lon = req.params.lon;
    var url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`

    request(url, function(error, response, body){
        if(error){
            res.send(error);
            res.status(response.statusCode).end()
          } else {
            var sun_json = JSON.parse(body);
            if(sun_json.results == undefined){
                res.send(sun_json);
                res.status(response.statusCode).end()
            } else {
                var suntime = {
                    sunrise : sun_json.results.sunrise,
                    sunset : sun_json.results.sunset
                };
                res.send(suntime);
                res.status(response.statusCode).end()
            }
        }
    });
});

async function getCitiesData(cities) {
    var cities_data = [];

    for (var city_obj of cities) {
        var city = city_obj;
        var url_weather = `http://localhost:8000/weather/${city}`;
        var response_body_weather = await requestP(url_weather);
        var weather_json = JSON.parse(response_body_weather);

        var lat = weather_json.lat
        var lon = weather_json.lon
        var url_suntime = `http://localhost:8000/suntime/${lat},${lon}`;
        var response_body_suntime = await requestP(url_suntime);
        var suntime_json = JSON.parse(response_body_suntime);
        

        var city = {
            name : weather_json.city,
            temperature : Math.round(weather_json.temperature),
            description : weather_json.description,
            icon : weather_json.icon,
            sunrise : suntime_json.sunrise,
            sunset : suntime_json.sunset
        };

        cities_data.push(city);
    }
    return cities_data;
}

app.listen(8000, function () {
    console.log('App listening on port 8000!')
})

