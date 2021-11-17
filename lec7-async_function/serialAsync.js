let files=["./f1.txt","./f2.txt","./f3.txt"];

let fs= require('fs');

function getFilesInOrder(idx){
    if(idx==files.length){
        return;
    }
    fs.readFile(files[idx],function(err,data){
        console.log(data+"");
        getFilesInOrder(idx+1);
    })
}

getFilesInOrder(0);