const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
//const { createDomStream } = require('htmlparser2');

function getMatch(link){
    request(link,cb);
}
function cb(error, response, data){
    parseData(data);
}
function parseData(html){
    let ch=cheerio.load(html);
    let bothInnings = ch('.match-scorecard-page .Collapsible');
    for(let i=0;i<bothInnings.length;i++){
        let inning=ch(bothInnings[i+""]);
        let teamName=inning.find("h5").text();
        //teamName=teamName.split("INNINGS")[0].trim();
        teamName = teamName.split("INNINGS")[0].trim(); 
        console.log(teamName);
        //let batsmanTable=
        let allTrs=inning.find(".table.batsman tbody tr");

        for(let j=0;j<allTrs.length-1;j+=2){
            let allTds=ch(allTrs[j+""]).find("td");
            let batsmanName=ch(allTds['0']).text().trim();
            let runs=ch(allTds['2']).text().trim();
            let balls = ch(allTds['3']).text().trim();
            let fours = ch(allTds['5']).text().trim();
            let sixes = ch(allTds['6']).text().trim();
            
            processLeaderboard(teamName,batsmanName,runs,balls,fours,sixes);
        }
    }
}

function processLeaderboard(teamName,batsmanName,runs,balls,fours,sixes){
    let data=fs.readFileSync("./leaderboard.json");
    if(data == ""){
        let leaderBoard=[];
        let obj={
            TeamName: teamName,
            BatsmanName:batsmanName,
            Runs:Number(runs),
            Balls:Number(balls),
            Fours:Number(fours),
            Sixes:Number(sixes)
        };    
        leaderBoard.push(obj);
        fs.writeFileSync("./leaderboard.json",JSON.stringify(leaderBoard));
        return;
    }
    else{
        let ndata=JSON.parse(data);
        let found=false;
        for(let i=0;i<ndata.length;i++){
            if(ndata[i].TeamName==teamName && ndata[i].BatsmanName==batsmanName){
                found = true;
                let obj=ndata[i];
                obj.Runs += Number(runs);
                obj.Balls += Number(balls);
                obj.Fours += Number(fours);
                obj.Sixes += Number(sixes);
                fs.writeFileSync("./leaderboard.json",JSON.stringify(ndata));
                return;
            }
        }
    }
    let ndata=JSON.parse(data);
    let obj={
        TeamName: teamName,
        BatsmanName:batsmanName,
        Runs:Number(runs),
            Balls:Number(balls),
            Fours:Number(fours),
            Sixes:Number(sixes)
    };    
    ndata.push(obj);
    fs.writeFileSync("./leaderboard.json",JSON.stringify(ndata));
    return;

}


module.exports=getMatch;