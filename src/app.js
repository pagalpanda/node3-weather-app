const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const chalk = require('chalk')
const { response } = require('express')


const app = express()


// console.log(__dirname) // Path to current dir
// console.log(__filename) // Path to current file
const publicDirPath = path.join(__dirname, '../public') // Using path core module
app.use(express.static(publicDirPath)) //set up static content path


app.set('view engine', 'hbs') // set hbs as view engine for express
const hbsDirPath = path.join(__dirname, '../templates/views')
app.set('views', hbsDirPath)

//set up partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amit Panda'
    }) // index view to be used
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amit Panda'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amit Panda',
        description: 'Reach out to 111.amit.p@gmail.com for help!'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {})=> {
        if(error) {
            console.log('>>>>' + error)
            return res.send({error: error})
        }
        
        weather(latitude, longitude, (error, {description, temperature, feelslike} = {})=> {
            if(error) {
                console.log('Error', error)
                return res.send({error}) 
            }
            console.log(chalk.green(location))
            const forecast = description + ' Temparature '+ temperature + 
            ' Feels like ' + feelslike
            console.log(chalk.inverse.italic(forecast))
            res.send({
                forecast,
                address,
                location
            })
        })
    })
    
})

//404 page for help
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 404,
        error: 'Help article not found!',
        name: 'Amit Panda'
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        error: 'Page not found buddy',
        name: 'Amit Panda'
    })
})

app.listen(3000, () => {
    console.log('Server Started at 3000')
})