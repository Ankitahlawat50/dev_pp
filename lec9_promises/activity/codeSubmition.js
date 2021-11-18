let puppeteer=require("puppeteer");
const id="vadafa5095@erpipo.com";
const pw="123456789";
let tab;
//all all funtions of pupeeteer promisified => gives you a pending promise initially

let browserOpenPromise=puppeteer.launch({headless: false, defaultViewport:null, args: ["--start-maximized"], slowMo: 100});

browserOpenPromise.then(function(browser){
    console.log("browser opened");
    //console.log(browser);
    let allPagesOpened=browser.pages();
    return allPagesOpened
})
.then(function(pages){
    tab=pages[0];
    let PageOnePromised=tab.goto("https://www.hackerrank.com/auth/login");
    return PageOnePromised;
})
.then(function(data){
   let idTypePromise=tab.type("#input-1",id);
   return idTypePromise
})
.then(function(data){
    let pwTypePromise=tab.type("#input-2",pw);
    return pwTypePromise
})
.then(function(){
    console.log("id and pw typed");
    let loginPromise=tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.then(function(){

})




// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();