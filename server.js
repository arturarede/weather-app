const express = require('express')
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const apiKey = 'a99f2687b4dfbb59aed4f7bba6d28515'

app.get('/', function (req, res) {
    res.render('weather', {weather: null, error: null});
  })

app.post('/', function(req, res) {
    let city = req.body.city_name1;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(error, response, body){
        if(error){
            res.render('weather', {weather: null, error: 'Error, please try again'});
        } else {
            var weather_json = JSON.parse(body);

            if(weather_json.main == undefined){
                res.render('weather', {weather: null, error: 'Error, please try again'});
            } else {
                var weather_data = {
                    city : city,
                    temperature : Math.round(weather_json.main.temp),
                    description : weather_json.weather[0].description, 
                    icon : weather_json.weather[0].icon
                };
                res.render('weather', {weather: weather_data, error: null});
            }
        }

    });

});


app.listen(8000, function () {
    console.log('App listening on port 8000!')
})