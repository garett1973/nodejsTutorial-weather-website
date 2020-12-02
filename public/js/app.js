const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');
const info = document.querySelector('.info');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    info.textContent = '';
    const searchString = `/weather?address=${searchValue.value}`;
    fetch(searchString).then((response) => {
        response.json().then((data) => {
            if(data.error){
            //console.log('Wrong address: ', data.error);
            info.textContent = 'Wrong address: ' + data.error;
            searchValue.value = '';
            }else{
            info.innerHTML =
            'Country: ' + data.country + '</br>' +
            'Region: ' + data.region + '</br>' +
            'Location: ' + data.location + '</br>' +
            'Temperature: ' + data.temperature + '</br>' +
            'Description: ' + data.description + '</br>' +
            'Humidity: ' + data.humidity + '</br>' +
            'Wind speed: '  + data.wind_speed;  
            //console.log('Data: ', data);
            }
            searchValue.value = '';
        });
    });
});