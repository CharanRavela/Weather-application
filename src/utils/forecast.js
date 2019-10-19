const request = require('request')

const forecast = (latitude,longitude,callback) =>
{
    const url = 'https://api.darksky.net/forecast/038dd2b5e7310e2dbb0b6ad6d19ba8b1/' + latitude + ',' + longitude 
    request({ url,json: true},(error, {body }) =>{
        if(error)
        {
            callback('Unable to connect to the weather services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast

