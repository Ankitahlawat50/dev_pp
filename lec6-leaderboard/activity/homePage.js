const request=require('request');
const cheerio=require('cheerio');
const getAllMatches=require("./allMatches")


request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);

function cb(error, response,data){
    parseData(data);
}

function parseData(html){
    let ch=cheerio.load(html);
    let atag=ch('a[data-hover="View All Results"]');
    //console.log(atag);
    let link=atag['0']['attribs']['href'];
    
    let completelink="https://www.espncricinfo.com"+link;
    //console.log(completelink);
    getAllMatches(completelink);
}