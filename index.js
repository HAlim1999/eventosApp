const express = require('express')
require('dotenv').config();
const {connectDB} = require('./db')
const cors = require('cors')




const app = express()
connectDB()


app.use(cors())

//Direcorio Publico

app.use(express.static('public'))

//lectura y parseo del body

app.use(express.json())

//Rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))


app.listen(process.env.PORT, () => {
    console.log(`Server listening ${process.env.PORT}`)
})