
//package dependencies
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')
const port = process.env.PORT || 8080

const app = express()

//connect to database
const db_url = (process.env.NODE_ENV === "production") ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL;
mongoose.connect(db_url)

//set up express app
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(cors({credentials: true, origin: true}))

app.use(express.static('frontend/dist'))

// load routes and pass in app
require('./routes.js')(app)

//configuring server to handle real URLs. See https://github.com/ReactTraining/react-router/blob/v3/docs/guides/Histories.md#browserhistory
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/dist', 'index.html'))
})

app.listen(port, () => console.log(`app listening on port ${port}`))
