let content=process.argv.slice(2);
const fs=require("fs");
console.log(content);

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

// flags x
// for files output
let filekadata="";

for(let i=0;i<files.length;i++)
{
    filekadata+= fs.readFileSync(files[i]);
    filekadata+=" ";
}
console.log(filekadata);
