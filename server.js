const express = require('express')
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const apiKey = 'a99f2687b4dfbb59aed4f7bba6d28515'

app.get('/', function (req, res) {
    res.render('weather', {weather_data: null, error: null});
  })

app.post('/', function(req, res) {
    var cities = [req.body.city_name1, req.body.city_name2, req.body.city_name3];

    getWeather(cities).then(function(results) {
        res.render('weather', {weather_data: results, error: null});
    });
});

async function getWeather(cities) {
    var weather_data = [];

    for (var city_obj of cities) {
        var city = city_obj;
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        var response_body = await request(url);

        var weather_json = JSON.parse(response_body);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon : weather_json.weather[0].icon
        };

        weather_data.push(weather);
    }

    return weather_data;
}

app.listen(8000, function () {
    console.log('App listening on port 8000!')
})

