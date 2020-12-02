const request = require('postman-request');
const chalk = require('chalk');

const weatherForLocation = (latitude, longitude, callback) => {
    url = `http://api.weatherstack.com/current?access_key=6e084f90d6cd717379f6f515c567cc19&query=${longitude}, ${latitude}&units=m`;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(chalk.redBright('Unable to connect to weather application...'), undefined); 
        }else if(body.error){
            callback(chalk.redBright('Unable to find location'), undefined);
        }else{
            console.log(body);
            const weatherData = {
                country: body.location.country,
                region: body.location.region,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
                wind_speed: body.current.wind_speed,
                humidity: body.current.humidity};
            callback(error, weatherData);
            };
    });
};

module.exports = weatherForLocation;
