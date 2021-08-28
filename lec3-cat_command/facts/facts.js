let fs=require("fs");
let f1kadata=fs.readFileSync("./f1.txt");
f1kadata+="";

// -s => removes extra spaces

let data=f1kadata.split("\r\n");

console.log(data);



// function removeextraspaces(data){
//     let str="";
//     for(let i=0;i<data.length;i++)
//     {
//         if(data[i]!="" && i!=data.length-1){
//             str+=data[i]+"\n";
//             //str+="\n";
//         }
//         else if(data[i]!=""){
//             str+=data[i];
//         }
//     }
//     console.log(str);
// }

// -s 
let removedspaces=[];
function removeextraspaces(data){
    let first=false;
    for(let i=0;i<data.length;i++){
        if(data[i]=="" && first==false){
            first=true;
            removedspaces.push(data[i]);
        }
        else if(data[i]!=""){
            removedspaces.push(data[i]);
        }
    }

    let joinedstring=removedspaces.join("\n");
    console.log(joinedstring);
}

removeextraspaces(data);

// -b add line number

let count=1;
let addedlinenumber=[]
function addlinenumbertoempty(data){
    for(let i=0;i<data.length;i++){
        if(data[i]!=""){
            addedlinenumber.push(`${count}. ${data[i]}`);
            count++;
        }
        else{
            addedlinenumber.push(data[i]);
        }
    }
    let joinedstring=addedlinenumber.join("\n");
    console.log(joinedstring);
} 
addlinenumbertoempty(data);

//-n -> add number to all lines

function addnumbertoalllines(data){
    for(let i=0;i<data.length;i++){
        data[i] = `${i+1}. ${data[i]}`;
    }
    let addedLineNumber = data.join("\n");
    console.log(addedLineNumber);
}

addnumbertoalllines(data);




