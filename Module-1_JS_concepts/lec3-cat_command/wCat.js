#!/usr/bin/env node
//makes global ommand run under node


let content=process.argv.slice(2);
const fs=require("fs");
//console.log(content);

let files=[];
let flags=[];

for(let i=0;i<content.length;i++){
    if(content[i].startsWith("-")){
        flags.push(content[i]);
    }
    else{
        files.push(content[i]);
    }
}
// console.log(flags);
// console.log(files);

// for files output

let filekadata="";
for(let i=0;i<files.length;i++)
{
    
    filekadata+= fs.readFileSync(files[i]);
    if(i<files.length-1){
    filekadata+="\r\n";
    }
}
//console.log(filekadata);

let data=filekadata.split("\r\n");

console.log(data);
// flags x
if(flags.includes("-s")){
    data=removeextraspaces(data);
    
}

if(flags.includes("-n") && flags.includes("-b")){
    if(flags.indexOf("-n") < flags.indexOf("-b")){
        
        addnumbertoalllines(data);
        
    }
    else{
        data=addlinenumbertoempty(data);
    }
}
else if(flags.includes("-n")){
    addnumbertoalllines(data);
}
else if(flags.includes("-b")){
    data=addlinenumbertoempty(data);
}




function removeextraspaces(data){
    let removedspaces=[];
    let first=false;
    for(let i=0;i<data.length;i++){
        
        if(data[i]=="" && first==false){
            first=true;
            removedspaces.push(data[i]);
        }
        else if(data[i]!=""){
            first=false;
            removedspaces.push(data[i]);
        }
        
    }

    //joinedstring=removedspaces.join("\n");
    return removedspaces;
    
}

function addnumbertoalllines(data){
    for(let i=0;i<data.length;i++){
        data[i] = `${i+1}. ${data[i]}`;
    }
    console.log(data);
    //let addedLineNumber = data.join("\n");
    
    
}

function addlinenumbertoempty(data){
    
    let count=1;
    let addedlinenumber=[];
    for(let i=0;i<data.length;i++){
        if(data[i]!=""){
            addedlinenumber.push(`${count}. ${data[i]}`);
            count++;
        }
        else{
            addedlinenumber.push(data[i]);
        }
    }
    return addedlinenumber;
    
    
} 
let joinedstring=data.join("\n");
console.log(joinedstring);
//console.log(data);