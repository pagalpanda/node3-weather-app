const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=962df42e1c552e6ccfd05c8786661877&query='+lat+','+long
    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else {
            if(body.error) {
                callback('Unable to find location', undefined)
            } else {
                const current = body.current
                callback(undefined, {
                    description: current.weather_descriptions[0],
                    temperature: current.temperature,
                    feelslike: current.feelslike,
                    humidity: current.humidity
                })
            }
        }
    })
}

module.exports=weather