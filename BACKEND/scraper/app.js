const {readFileSync,writeFileSync} = require('fs');

const express = require('express');
require('express-async-errors')
const http = require('http')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/user')

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const app = express();
const server = http.createServer(app);

const mysql = require('./database/connect');


app.use(express.static('public'))
app.use(express.json())



app.use(helmet()) 
app.use(cors())
app.use(xss())
app.use(cookieParser())

app.use("/api/users",userRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT,() =>{
    console.log(`app slusa na portu ${PORT}`)
})