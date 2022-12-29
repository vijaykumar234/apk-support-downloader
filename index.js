const Express = require('express');
const app = Express();
const port = process.env.PORT || 2000;
const http = require("http");
const https = require("https");
const puppeteer = require('puppeteer');

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);




app.get("/package", async(req, res) => {
    const name = req.query.name
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://apk.support/download-app/" + name)
    // await page.$eval("#atload")
    // await page.document.getElementById("atload");
    // await page.click("#apksubmit")
    // await page.waitForSelector(".bdlinks")

    const hrefLink = await page.evaluate(
        () => Array.from(
            document.querySelectorAll('div#atload > a[rel]'),
        a => a.getAttribute('href')
        
        )
    );
    console.log(hrefLink)
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({hrefLink})
  }) 
  


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By vijay */
});