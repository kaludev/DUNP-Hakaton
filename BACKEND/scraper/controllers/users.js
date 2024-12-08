const BadRequestError = require('../errors/BadRequestError');
const ValidateEmail = require('../utils/EmailValidator')
const {uid} = require('uid')
const {StatusCodes} = require('http-status-codes')
const hashPassword = require('../utils/hashPassword')
const attachCookies = require('../utils/addCookies');
const errorWrapper = require('../middleware/ErrorWrapper')
const path = require('path');
const fs = require('fs');
const mysql = require('../database/connect');
const puppeteer = require('puppeteer');
const convert = require('cyrillic-to-latin')
const UnauthenticatedError = require('../errors/UnauthenticatedError');
const comparePasswords = require('../utils/comparePassword');


const login = async (req,res) =>{
    const {username,password} = req.body;

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

        let databasedata;
        try{
            await mysql.connect();
            databasedata =await mysql.query('SELECT * FROM ucenici WHERE email = ?', [username]);
        }catch (e) {
            console.error(e);
            throw new BadRequestError('Something went wrong')
        }

        if(databasedata.length === 0) {
            console.log('no user')
            const id= uid(20)
            const hashedPassword = await hashPassword(password);
            databasedata= await mysql.query('INSERT INTO ucenici (id, ime, email, password) VALUES (?, ?, ?, ?)', [id, name, username, hashedPassword]);
        }else{
            const isPasswordCorrect = await comparePasswords(password,databasedata[0].password);
            if(!isPasswordCorrect) throw new UnauthenticatedError('Password is incorect')
        }
        for( let key in averages){
            let id;
            let data1 = await mysql.query("SELECT * FROM predmet WHERE naziv = ?",[key]);
            if(data1.length === 0){
                const data2= await mysql.query("INSERT INTO predmet(naziv) VALUES (?)",[key]);
                console.log(data2)
                console.log(id)
                console.log(data2.insertId)
                id= data2.insertId;

            }else{
                console.log(data1)
                id = data1[0].predmet_id;
            }
            const ocena = averages[key];
            const predmetId = id;
            const exist = await mysql.query("SELECT * FROM ocena WHERE ucenik_id = ? AND predmet_id = ?",[databasedata[0].id,id]);
            if(exist.length == 0){
                console.log(databasedata)
                let data = await mysql.query("INSERT INTO ocena(ucenik_id,predmet_id,ocena) VALUES (?,?,?)",[databasedata[0].id,predmetId,ocena])
            }else{
                const data = await mysql.query("UPDATE ocena SET ocena = ? WHERE ucenik_id = ? AND predmet_id = ?", [ocena,databasedata[0].id,predmetId])
            }

        }

        console.log(databasedata[0])

        res.status(StatusCodes.OK).json({
            ok:true,
            message:'Logged in successfully',
            user:{
                id:databasedata[0].id,
                email:databasedata[0].email,
                username: databasedata[0].username,
                token:attachCookies(res,{id:databasedata[0].id,username:name})
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

}

const showMe = async (req,res) =>{
    const id = req.user.userId;
    const data = await mysql.query('SELECT * FROM ucenici WHERE id = ?', [id]);
    console.log(data)
    if(data.length === 0) throw new UnauthenticatedError("User with provided id doesn't exists")

    res.status(StatusCodes.OK).json({
        ok:true,
        user:{
            id:id,
            email:data[0].email,
            username:data[0].username
        }
    });
}

    const profile = async (req,res) =>{
        const id = req.user.userId;
        const data = await mysql.query('SELECT * FROM ucenici WHERE id = ?', [id]);
        console.log(data)
        if(data.length === 0) throw new UnauthenticatedError("User with provided id doesn't exists")

        const grades = await mysql.query('SELECT * FROM ocena o INNER JOIN predmet p ON o.predmet_id = p.predmet_id INNER JOIN profesor pr ON p.profesor_id = pr.id  WHERE ucenik_id = ?', [id]);

        res.status(StatusCodes.OK).json({
            ok:true,
            user:{
                id:id,
                email:data[0].email,
                ime:data[0].ime
            },
            grades:grades
        });
    }

const logout = (req, res) => {
    res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
	});
	res.status(StatusCodes.OK).json({ ok: true });
}


module.exports = {login,showMe,profile,logout};