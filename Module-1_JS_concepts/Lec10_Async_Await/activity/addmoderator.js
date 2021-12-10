const puppeteer = require("puppeteer");
const id = "xifov12632@aramidth.com";
const pw = "123456789";

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    // delay
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeATag = bothATags[1];
    await manageChallengeATag.click();

    // moderator Add ka code comes here
    await addModerators(browser , tab); // faith => it will add all the moderators on all the pages !!!!
})();   


async function addModerators(browser, tab){
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allATags = await tab.$$(".backbone.block-center");
    // [<a />,<a />,<a />,<a />,<a />,<a /> ]
    let allLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let aTag = allATags[i];
        let link = await tab.evaluate( function(elem){
            return elem.getAttribute("href");
        }   , aTag );
        allLinks.push(link);
    }
    let completeLinks = allLinks.map( function(link){
        return "https://www.hackerrank.com"+link;
    });

    for(let i=0;i<completeLinks.length;i++){
        await addModeratorToQuestion(completeLinks[i],browser);
    }

    let allLi=await tab.$$('.pagination li');
    let nextpg=allLi[allLi.length-2];

    let isDisables=await tab.evaluate(function(elem){ return elem.classList.contains("disabled"); } , nextpg);
    if(isDisables){
        return;
    }
    else{
        await nextpg.click();
        await addModerators(browser, tab);
    }

}

async function addModeratorToQuestion(qLink,browser){
    let newtab=await browser.newPage();
    await newtab.goto(qLink);

    await newtab.waitForSelector('li[data-tab="moderators"]', {visible:true});
    await newtab.waitForTimeout(1000);
    await newtab.click('li[data-tab="moderators"]');

    await newtab.waitForSelector('#moderator', {visible:true});
    await newtab.type('#moderator',"Amit");

    await newtab.click('.btn.moderator-save');
    await newtab.click('.save-challenge.btn.btn-green');
    await newtab.close();
}


