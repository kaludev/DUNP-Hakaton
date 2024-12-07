const {readFileSync,writeFileSync} = require('fs');

const express = require('express');
require('express-async-errors')
const http = require('http')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const puppeteer = require('puppeteer');
const convert = require('cyrillic-to-latin')
const app = express();
const server = http.createServer(app);

const mysql = require('./database/connect');


app.use(express.static('public'))
app.use(express.json())


app.use(helmet()) 
app.use(cors())
app.use(xss())
app.use(cookieParser())

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({
            headless: false,  // Set to false to see the browser window
            defaultViewport: null  // Use the default viewport size
        });

        // Open a new page
        const page = await browser.newPage('https://moj.esdnevnik.rs');

        // Navigate to the website
        await page.goto('https://moj.esdnevnik.rs');

        // Wait for the page to load (optional, based on the page's loading)
        await page.waitForSelector('body');  // This waits until the body element is loaded

        await page.type('#username', username);
        await page.type('#password', password);
        await page.click('[type="submit"]');
        await page.waitForSelector('.student-name',{timeout:60000});
        let name = await page.$eval('.student-name', el => el.textContent);
        name = convert(name);
        console.log(name);
        const counter = await page.$eval(".counter",el=>el.textContent)
        console.log(counter)
        //console.log(parseInt(counter))
        await page.focus((await page.$$eval(".has-dropdown"))[1])
        await page.keyboard.type('\n');
        await page.click(".has-dropdown");
        console.log(await (await (await page.$('[name="schools"] ul')).$$("li"))[1].evaluate(el=>el.textContent))
        await (await (await page.$('[name="schools"] ul')).$$("li"))[1].click()
        await page.screenshot({ path: 'screenshot.png' });

        //await browser.close();
        return res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000
server.listen(PORT,() =>{
    console.log(`app slusa na portu ${PORT}`)
})