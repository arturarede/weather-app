var express = require('express')
var request = require('request');

var app = express();

app.set('view engine', 'ejs');

var city = 'Lisbon';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a99f2687b4dfbb59aed4f7bba6d28515`;

app.get('/', function(req, res) {

    request(url, function(error, response, body){
        weather_json = JSON.parse(body);
        console.log(weather_json);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description, 
            icon : weather_json.weather[0].icon
        };

        var weather_data = {weather : weather};

        res.render('weather', weather_data);
    });

});

app.listen(8000);