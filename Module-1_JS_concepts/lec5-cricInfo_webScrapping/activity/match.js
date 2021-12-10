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
            let strikeRate = ch(allTds['7']).text().trim();
            
            processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }
}

function checkTeamFolder(teamName){
    let teamPath=`./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName,batsmanName){
    let batsmanPath=`./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanPath=`./IPL/${teamName}/${batsmanName}.json`;
    let stringifiedData=fs.readFileSync(batsmanPath);
    let batsmanfile=JSON.parse(stringifiedData);
    let inning={
        Runs:runs,
        Balls:balls,
        Fours:fours,
        Sixes:sixes,
        StrikeRate:strikeRate
    };
    batsmanfile.push(inning);
    fs.writeFileSync(batsmanPath,JSON.stringify(batsmanfile));
} 

function createBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanPath=`./IPL/${teamName}/${batsmanName}.json`;
    let batsmanData=[];
    let innings={
        Runs:runs,
        Balls:balls,
        Fours:fours,
        Sixes:sixes,
        StrikeRate:strikeRate
    };
    batsmanData.push(innings);
    let stringifyData=JSON.stringify(batsmanData);
    fs.writeFileSync(batsmanPath,stringifyData);
}

function createTeamFolder(teamName){
    let teamPath=`./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let isTeam=checkTeamFolder(teamName);
    if(isTeam){
        let isBatsman=checkBatsmanFile(teamName,batsmanName);
        if(isBatsman){
            updateBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
        else{
            createBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }
}


module.exports=getMatch;