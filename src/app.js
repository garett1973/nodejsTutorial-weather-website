const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather')

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handelebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Virgis'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Virgis'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Virgis'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    };

geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({
            error
        });
    };
    weather(latitude, longitude, (error, {temperature, description, wind_speed} = {}) => {
        if(error){
            return res.send({
                error
            });
        };
        res.send({
            location,
            temperature,
            description,
            wind_speed
        });

    });
});
});

//getting search data from browser// Using return res.send() instead of else{...} - result is the same

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    };
        console.log(req.query.search);
        res.send({
        products: []
                }); 
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        author: 'Virgis'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - page not found',
        author: 'Virgis'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});