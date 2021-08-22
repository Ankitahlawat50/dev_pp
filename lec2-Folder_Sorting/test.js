// let a=10;
// console.log(a);
// function change2(){
//     console.log(a);
// }
// function change(){
//     a=20;
//     change2();
// }
// change();
// console.log(a);

let b='folder';

function change3(){
    console.log(b);
}
function change3x(b){
    console.log(b);
}
let i=0;
function change4(b){
    i++;
    if(i>1){

    }else{
        b=`${b}/abc`;
        change4(b);
    }
    
    //change3();
    change3x(b)
}
change4(b);
console.log(b);