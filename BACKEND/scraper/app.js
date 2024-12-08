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
            headless: true,
            args: [
                '--disable-web-security',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
                '--disable-setuid-sandbox',
                '--enable-webgl',
                '--disable-dev-shm-usage',
            ],
        });

        // Open a new page
        const page = await browser.newPage('https://moj.esdnevnik.rs');
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );
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
        await page.$eval( ".filter-bar ul li.has-dropdown", elem => elem.click())
        await page.keyboard.press('Enter');
        await page.click(".has-dropdown");
        await page.waitForSelector(".cloud-left-grade",{timeout:60000});
        let grades = await page.$$eval(".cloud",el=>el.map(n=>{if(n.querySelector('.cloud-left-grade')?.textContent )return {name:n.querySelector('.cloud-header').textContent.trim(),grade:n.querySelector('.cloud-left-grade').textContent.trim()}}))
        grades = grades.filter(n => n!=null)
        console.log(grades)
        const sums = {}
        const counts = {}
        for(let i=0;i<grades.length;i++){
            const {name,grade} = grades[i];
            const namelatin= convert(name)
            if(!sums[namelatin])sums[namelatin]=0;
            sums[namelatin]+=parseInt(grades[i].grade);
            counts[namelatin] = counts[namelatin]? counts[namelatin]+1:1;
        }
        console.log(sums)
        console.log(counts)
        const averages = {};
        for(let key in sums){
            averages[key] = sums[key]/counts[key]
        }
        console.log(averages)
        const data = {}
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