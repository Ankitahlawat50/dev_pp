//function body
function sayHi(name){
    console.log(name + " in function says hi");
    return 10;
}


//functions are variables
// let sayHi=function(){
//     console.log("i'm a function stored in sayhi");
// }

//function call
// sayHi();
//sayHi();

//console.log(sayHi()); // funciton call hui uski wajah se print hua. lein ye console.log expect kar rha tha kuch value aayegi iske paas jo ye return kare lekin kuch return nahi hua toh undefined. agar function kuch return kar rha hota toh wu returned element print hota;
let value=sayHi("ankit");
console.log(value);