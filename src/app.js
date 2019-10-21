const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define  paths for Express config
const pathPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and viewss location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pathPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'charan Ravela'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Charan Ravela'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'In this application you can get the details of Weather in your area........!!!',
        contact: 'Contact mail id: redpoje.1@gmail.com',
        title: 'Help',
        name:'Charan Ravela'
    })
})

app.get('/weather',  (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {icon, units, summary}) => {
                  if(error){
                      return res.send({error})
                  }

                  res.send({
                      summary,
                      icon,
                      location,
                      address: req.query.address
                  })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Charan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'charan',
        errorMessage:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})