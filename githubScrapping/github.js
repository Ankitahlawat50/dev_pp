let cheerio=require('cheerio');
let request=require('request');
let fs=require('fs');

request("https://github.com/topics",parseData);

function parseData(error, response, data){
    let ch=cheerio.load(data);
    let allAtags=ch('.topic-box a');
    for(let i=0;i<allAtags.length;i++){
        let topicLink=ch(allAtags[i]).attr("href");
        //console.log(topicLink);
        let completelink="https://github.com"+topicLink;
        getIssuesOfTheLink(completelink);
    }
}

function getIssuesOfTheLink(html){
    request(html,parseTopic);
}

function parseTopic(error, response, data){
    let ch=cheerio.load(data);
    let topicName=ch('.h1').text().trim();
    console.log(topicName);
    if(!fs.existsSync(`./${topicName}`)){
        fs.mkdirSync(`./${topicName}`);
    }
    let projectList=ch('.text-bold.wb-break-word');
    
    for(let i=0;i<5;i++){
        //let projectName=ch('.text-bold.wb-break-word').text().trim();
        let projectName=ch(projectList[i]).text().trim();
        if(!fs.existsSync(`./${topicName}/${projectName}`)){
            fs.mkdirSync(`./${topicName}/${projectName}`);
        }
        let ProjectPath=ch(projectList[i]).attr("href");
        let completeIssuePath="https://github.com"+ProjectPath+"/issues";
        console.log(completeIssuePath);
        request(completeIssuePath,parseProject);
    }
    function parseProject(error,response,data){

        let ch=cheerio.load(data);
        let allAofIssues=ch('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
        let projectName=ch('strong a').text().trim();
        let obj=[];
        for(let i=0;i<allAofIssues.length;i++){
            let issueName=ch(allAofIssues[i]).text().trim();
            let issuePath=ch(allAofIssues[i]).attr("href");
            let completeIssuePath="https://github.com"+issuePath;
            let val={
                "issue_no.":Number(i)+1,
                "issue":issueName,
                "issue-Path":completeIssuePath
            };
            obj.push(val);
        }
        let jsonString=JSON.stringify(obj);
        fs.writeFileSync(`./${topicName}/${projectName}/issues.json`,jsonString);
    
    }
}


