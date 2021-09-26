const request= require("request");
const cheerio= require("cheerio");
//const { last } = require("cheerio/lib/api/traversing");
let lastComm="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let mostWicket="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(lastComm, function cb(error,response,body){
    parseDatacomm(body);
});
request(mostWicket,function(error,response,body){
    parseDataWicket(body);
});
function parseDatacomm(html){
    let ch=cheerio.load(html);
    let comm=ch('div[itemprop="articleBody"] p');
    let c=ch(comm[0]).text();
    console.log(c);

}

function parseDataWicket(html){
    let ch =cheerio.load(html);
    let wt=ch('.table.bowler tbody tr .cursor-pointer.bowler-wicket');
    let max=0;
    for(let i=0;i<wt.length;i++){
        let t=ch(wt[0]).text();
        if(t>max){
            max=t;
        }
    }
    console.log(max);
}


