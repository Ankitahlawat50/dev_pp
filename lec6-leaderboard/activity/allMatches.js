const request = require("request")
const cheerio = require("cheerio");
const getMatch= require("./match");

function getAllMatches(link){
    request(link,cb);
}

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let ch=cheerio.load(html);
    let allaTag=ch('a[data-hover="Scorecard"]');
    for(let i=0;i<allaTag.length;i++){
        let aTag=allaTag[i+""];
        //console.log(aTag);
        let link=ch(aTag).attr("href");
        let completelink="https://www.espncricinfo.com"+link;
        getMatch(completelink);
    }
}

module.exports=getAllMatches;