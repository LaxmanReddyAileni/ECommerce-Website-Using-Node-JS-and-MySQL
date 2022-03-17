// // var fs=require('fs');
// // fs.writeFileSync('hello.txt','Naruto Uzimaki');

// const name="Laxman";
// let age=23;
// const weight=62;
// age=22;

// const profile=(username,userage,userweight)=>{
//     return(console.log(username+" "+userage+" "+userweight));
// }
// console.log(profile(name,age,weight));

// const persons={
//     name:"Laxman",
//     age:23,
//     char:['A', 'B'],
//     greet(){
//         console.log("Hi i am "+this.name+this.char);
//     }
// };

// const printname=({name,age})=>{//Object Destructing
//     console.log(name+age);
// }
// printname(persons);

// const {name,age}=persons;console.log(name,age);
// const hobbies=['sports','Music'];
// const [hobby1,hobby2]=hobbies;
// console.log(hobby1,hobby2);//Array Destructing


// persons.greet();

// //Arrays and For  
// const hobbies=['sports','Music'];
// hobbies.push('Cricket');
// // for(let hobby of hobbies){
// //     console.log(hobby);
// // }
// console.log(hobbies.map(hobby=>'Hobby: '+ hobby));
// console.log(hobbies);

// // const copied=hobbies.slice();
// //const copied=[hobbies];//New array is created inside the array [[1,2]] 
// const copied=[...hobbies];//Spread Operator
// console.log(copied);

// const copi=(...args)=>{// ... Rest operator 
//     return(args);//Any number of args 
// }
// console.log(copi(1,2,3));


//Async Functions
const fetchData=callback=>{
const promise=new Promise((resolve,reject)=>{
setTimeout(()=>{
    callback('Done')
},1500);
});}
setTimeout(()=>{
    console.log("Time is Up")
    fetchData(text=>{console.log(text);});
},2000);
console.log("Hello");
console.log("Hi");