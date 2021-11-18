let puppeteer=require("puppeteer");
//all all funtions of pupeeteer promisified => gives you a pending promise initially

let browserOpenPromise=puppeteer.launch({headless: false});

browserOpenPromise.then(function(browser){
    console.log("browser opened");
    console.log(browser);
    let allPagesOpened=browser.pages();
    return allPagesOpened
})
.then(function(pages){
    let tab=pages[0];
    let PageOnePromised=tab.goto("https://www.google.com");
    return PageOnePromised;
})
.then(function(data){
    console.log("google homepage opened");
})


// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();