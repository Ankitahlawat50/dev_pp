const { Console } = require("console");
const fs=require("fs");

function myPromisifiedfunction(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath,function(error,data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    });
}

let pendingPromise=myPromisifiedfunction("./f1.txt");

pendingPromise.then(function(data){
    console.log(data+"");
})
pendingPromise.catch(function(error){
    console.log(error);
})