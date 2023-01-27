"use strict";

Date.prototype.yyyyMMddHHmmss = function () {
    var date = this;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return "" + year +
        (month < 10 ? "0" + month : month) +
        (day < 10 ? "0" + day : day) +
        (hh < 10 ? "0" + hh : hh) +
        (mm < 10 ? "0" + mm : mm) +
        (ss < 10 ? "0" + ss : ss);
};

const puppeteer = require('puppeteer');

(async () => {

    var dateNow = new Date();
    var dateNowString = dateNow.yyyyMMddHHmmss();
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set viewport width and height
    await page.setViewport({ width: 1280, height: 720 });

    const website_url = 'http://127.0.0.1:8080';

    // Open URL in current page
    await page.goto(website_url, { waitUntil: 'networkidle0' });

    // Capture screenshot
    await page.screenshot({
        path: 'screenshot_'+ dateNowString +'.jpg',
    });

    // Close the browser instance
    await browser.close();
})();