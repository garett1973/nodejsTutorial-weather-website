const request = require('postman-request');
const chalk = require('chalk');

const mapboxToken = 'pk.eyJ1IjoiZ2FyZXR0MTk3MyIsImEiOiJja2kzaHlheGkwMHN1MnJzNGp6OHY3bjR0In0.bE8eDKEuw-4kmzWXAGQjpQ';
const geocode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1`;

            request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to mapbox application...', undefined);
        }else if(body.features.length === 0) {
            callback('Unable to find location', undefined);
        }else{
            const coordinates = {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            };
            callback(error, coordinates);  

        };
    });
};

module.exports = geocode;