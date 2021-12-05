let puppeteer=require("puppeteer");
const id="vadafa5095@erpipo.com";
const pw="123456789";
let tab;
let idx;
let Gcode;
//all all funtions of pupeeteer promisified => gives you a pending promise initially

let browserOpenPromise=puppeteer.launch({headless: false, defaultViewport:null, args: ["--start-maximized"]});

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
// .then(function(){
//     console.log("id and pw typed");
//     let loginPromise=tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
//     return loginPromise;
// })
// wait for the page to completely load coz after it is completely load only we can perform any operation on it 
// if we search for an element in the when the page hasn't been loaded we get an error that "no node found for the __ so and so class"

// .then(function(){
//     let waitPromise=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.recommended-prep-kit-card-cta.ui-btn-link.ui-btn-styled');
//     return waitPromise;
// })
//this above  fucntion waits for the DOM to load first
// .then(function(){
//     let startPrep=tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.recommended-prep-kit-card-cta.ui-btn-link.ui-btn-styled');
//     return startPrep;
// })
.then(function(){
    let loginPromise=waitandclick('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.then(function(){
    let startPrepPRomise=waitandclick('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    return startPrepPRomise;
    
})
.then(function(){
    let waitPromise=tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled',{visible:true});
    return waitPromise;
})
.then(function(){
    let allQuesTags=tab.$$('.ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled');
    return allQuesTags;
})
.then(function(allQuesTags){
    let allLinksPromises=[];

    for(let i=0;i<allQuesTags.length;i++){
        let atag=allQuesTags[i];
        let linkPromises=tab.evaluate(function(elem){
            return elem.getAttribute("href");// the function you want to perform on DOM
        } , atag);
        allLinksPromises.push(linkPromises);
    }
    //console.log(allLinksPromises)
    return Promise.all(allLinksPromises);
})
.then(function(allLinks){
    let completeLinks=allLinks.map(function(link){
        return "https://www.hackerrank.com"+link;
    });
    //console.log(completeLinks);
    let oneQuesSolvePromise=solveQuestion(completeLinks[0]);
    
    for(let i=2;i<completeLinks.length;i++){
        oneQuesSolvePromise=oneQuesSolvePromise.then(function(){
            let nextQuestionSolvePromise=solveQuestion(completeLinks[i]);
            return nextQuestionSolvePromise;
        })
    }
    return oneQuesSolvePromise;
})
.then(function(data){
    console.log("all questions solved !!");
})
.catch(function (error) {
    console.log(error);
});

function getCode(){
    return new Promise(function(resolve,reject){
        let WaitPromise=tab.waitForSelector('.hackdown-content h3');
        WaitPromise.then(function(){
            let allCodeElementPRomise=tab.$$('.hackdown-content h3');
            return allCodeElementPRomise;
        })
        .then(function(allCodeNameElement){
            // [ <h3>C++</h3> , <h3>Python</h3> , <h3>Java</h3>  ]
            let allCodeNAmePRomises=[];
            for(let i=0;i<allCodeNameElement.length;i++){
                let codeNamePromise=tab.evaluate( function(elem){return elem.textContent;} , allCodeNameElement[i])
                allCodeNAmePRomises.push(codeNamePromise); 
            }
            // allCodeNamesPromise = [  Promise<Pending> , Promise<Pending> , Promise<Pending> ];
            let sbkaPromise=Promise.all(allCodeNAmePRomises);
            return sbkaPromise;
        })
        .then(function(codeNames){
            for (let i = 0; i < codeNames.length; i++) {
                if (codeNames[i] == "C++") {
                  idx = i;
                  break;
                }
              }
              let allCodeDivPromise = tab.$$(".hackdown-content .highlight");
              return allCodeDivPromise; // Promise<Pending>
        })
        .then(function(allCodeDivs){
            let codeDiv=allCodeDivs[idx];
            let codePromise=tab.evaluate( function(elem){ return elem.textContent; } , codeDiv);
            return codePromise;
        })
        .then(function(code){
            Gcode=code;
            console.log(Gcode);
            resolve();
        })
        .catch(function(error){
            reject();
        })
    })
}

function pasteCode(){
    return new Promise(function(resolve,reject){
        let problemClickPromise=tab.click('#tab-1-item-0');
        problemClickPromise.then(function(){
            let checkboxClickPromise=waitandclick(".checkbox-input");
            return checkboxClickPromise;
        })
        .then(function () {

            let waitForTextBoxPromise = tab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypePromise=tab.type('.custominput',Gcode);
            return codeTypePromise;
        })
        .then(function(){
            let controlDownPromise=tab.keyboard.down("Control");
            return controlDownPromise;
        })
        .then(function(){
            let selectAllPromise=tab.keyboard.press("A");
            return selectAllPromise;
        })
        .then(function(){
            let cutPromise=tab.keyboard.press("X");
            return cutPromise;
        })
        .then(function(){
            let clickedOnCodeBoxPromise = tab.click('.monaco-editor.no-user-select.vs');
            return clickedOnCodeBoxPromise;
        })
        .then(function(){
            let aKeyPressPromise = tab.keyboard.press("A");
            return aKeyPressPromise;
          })
          .then(function () {
            let vKeyPressPromise = tab.keyboard.press("V");
            return vKeyPressPromise;
          })
          .then(function () {
            let controlKeyUpPromise = tab.keyboard.up("Control");
            return controlKeyUpPromise;
          }).then(function(){
            resolve();
          })
          .catch(function(error){
            reject(error);
          })


    })
}
function handleLock(){
    
    return new Promise( function(resolve , reject){
        let waitPromise = tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled' , {visible:true , timeout:5000});
        waitPromise.then(function(){
          let lockBtnPromise = tab.$('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
          return lockBtnPromise;
        })
        .then(function(lockBtn){
          // console.log(lockBtn);
          let lockBtnClickPromise = lockBtn.click();
          return lockBtnClickPromise;
        })
        .then(function(){
          // clicked on lock btn
          // lock btn found
          console.log("lock btn found !!!");
          resolve();
        })
        .catch(function(error){
          // lock btn not found
          console.log("lock btn not found !!!");
          resolve();
        })
    
      })
}

function solveQuestion(qLink){
    return new Promise(function (resolve, reject) {
        let gotoPromise = tab.goto(qLink);
        gotoPromise.then(function () {
            console.log("go to editorial");
            let waitAndClickPromise = waitandclick('a[data-attr2="Editorial"]');
            return waitAndClickPromise;
        })

        .then(function(data){
            let lockbtnPromise=handleLock();
            return lockbtnPromise;
        })
        
        .then(function () {
            // this function will get code of c++ and set in gCode variable
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            
            //paste code in the editor form Gcode
            let PastePromise=pasteCode();
            return PastePromise;
        })
        .then(function(){
            let submitPromise=tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
            return submitPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}

function waitandclick(selector){
    return new Promise(function(resolve, reject){
        let waitPromise=tab.waitForSelector(selector, {visible:true});
        waitPromise.then(function(){
            let clickPromise=tab.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}