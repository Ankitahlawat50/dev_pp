let fs=require("fs");

let f1kadata=fs.promises.readFile("./f1.txt");
let f2kadata=fs.promises.readFile("./f2.txt");
let f3kadata=fs.promises.readFile("./f3.txt");


f1kadata.then(function(data){
    console.log(data+"");
});
f1kadata.catch(function(error){
    console.log(error);
});

f2kadata.then(function(data){
    console.log(data+"");
});
f2kadata.catch(function(error){
    console.log(error);
});

f3kadata.then(function(data){
    console.log(data+"");
});
f3kadata.catch(function(error){
    console.log(error);
});