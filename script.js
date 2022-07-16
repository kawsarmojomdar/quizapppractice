 const mybtn = document.querySelector(".mybtn button");
 const rulesbox = document.querySelector(".rulesbox")

 const continuebtn = document.querySelector(".continuebtn")
 const exitbtn = document.querySelector(".exitbtn")
 const questionbox = document.querySelector(".questionbox")

 const optionlist = document.querySelector(".myoption");
 const timecount = document.querySelector(".timecount .seconds");
 const timeline = document.querySelector(".timelines");


 mybtn.onclick = () => {
   rulesbox.classList.add("activeinfo")
 }

 exitbtn.onclick = () => {
   rulesbox.classList.remove("activeinfo")
 }

 continuebtn.onclick = () => {
   rulesbox.classList.remove("activeinfo");
   questionbox.classList.add("activequiz");
   showquestion(0);
   timerstart(15);

   startcounterline(0)
 }

 let que_count = 0;

 const nextbtn = document.querySelector(".nextbtn");
 const resultbox = document.querySelector(".resultbox");
 const restart = document.querySelector(".resultbox .replay");
 
 restart.onclick=()=>{
   rulesbox.classList.remove("activeinfo");
   questionbox.classList.add("activequiz");
   showquestion(0);
   timerstart(15);
   
   startcounterline(0)
 }
 
 const quitquiz = document.querySelector(".resultbox .quit");
 
 quitquiz.onclick=()=> {
   window.location.reload()
 }
 
const scoretext = document.querySelector(".scoretext");
 let counter;
 let timevalue = 15;
 let counterline;
 let widthvalue = 0;
let userscore = 0;

 nextbtn.onclick = () => {

   nextbtn.style.display = "none";
   if (que_count < questions.length - 1) {
     
     que_count++;
     showquestion(que_count)
     clearInterval(counter);
     timerstart(timevalue)
     clearInterval(counterline)
     startcounterline(widthvalue)
   } else {
     showresultbox()
     
     console.log('ok.completed')
   }


 }

 function showquestion(index) {
   const quetext = document.querySelector(".text2");
   const myoption = document.querySelector(".myoption");

   let optiontag = '<div class="options"><span>' + questions[index].options[0] + '</span></div>'

     +
     '<div class="options"><span>' + questions[index].options[1] + '</span></div>'

     +
     '<div class="options"><span>' + questions[index].options[2] + '</span></div>' +
     '<div class="options"><span>' + questions[index].options[3] + '</span></div>'


   let quetag = "<span>" + questions[index].numb + '. ' + questions[index].question + "</span>";
   quetext.innerHTML = quetag;

   myoption.innerHTML = optiontag;


   const totalqus = document.querySelector(".totalqus");
   let totaltag = '<p>' + questions[index].numb + 'of 5' + '</p>';
   totalqus.innerHTML = totaltag;


   const option = optionlist.querySelectorAll(".options")

   for (let i = 0; i < option.length; i++) {
     option[i].setAttribute("onclick", "optionseleted(this)");

   }
 }

 let tick = '<div class="tick"> <i class="fa-solid fa-circle-check"></i></div>'

 let cross = ' <div class="cross"> <i class="fa-solid fa-circle-xmark"></i></div>'




 function optionseleted(answer) {
   clearInterval(counter);
   clearInterval(counterline);
   let alloptions = optionlist.children.length;
   let userans = answer.textContent;
   let correctAns = questions[que_count].answer;
   if (userans == correctAns) {
      userscore+=1;
     console.log(userscore)
     answer.classList.add("correct");
     answer.insertAdjacentHTML("beforeend", tick);
     console.log('answer is correct')
   } else {
     answer.insertAdjacentHTML("beforeend", cross);
     answer.classList.add("incorrect");
     for (let i = 0; i < alloptions; i++) {
       if (optionlist.children[i].textContent == correctAns) {
         optionlist.children[i].setAttribute("class", "options correct");
         optionlist.children[i].insertAdjacentHTML("beforeend", tick);
       }
     }
     console.log("answer is wrong")
   }
   console.log(alloptions)
   for (let i = 0; i < alloptions; i++) {
     optionlist.children[i].classList.add("disabaled")
     nextbtn.style.display = "block"
   }

 }

 function showresultbox(){
   rulesbox.classList.remove("activeinfo");
   questionbox.classList.remove("activequiz");
   resultbox.classList.add("activeresult");
   
   if(userscore>3){
     let  scoretag = '<span>Congratulations ✌️ you got  <p>' +userscore + '</p>out of <p>'+questions.length+'</p></span>';
   scoretext.innerHTML= scoretag;
   }else if (userscore> 1){
     let  scoretag = '<span>Carry on 👍 you got  <p>' +userscore + '</p>out of <p>'+questions.length+'</p></span>';
   scoretext.innerHTML= scoretag;

   }else{
     let  scoretag = '<span>I am sorry 😢 you got  <p>' +userscore + '</p>out of <p>'+questions.length+'</p></span>';
   scoretext.innerHTML= scoretag;

   }
   
   }
   
    


 function timerstart(time) {
   counter = setInterval(timer, 1000)

   function timer() {
     timecount.textContent = time;
     time--;
     if (time < 9) {
       let addzero = timecount.textContent;
       timecount.textContent = 0 + addzero;
     }
     if (time < 0) {
       clearInterval(counter);
       timecount.textContent = "00";

     }
   }

 }

 function startcounterline(time) {
   counterline = setInterval(timer, 50);

   function timer() {
     time += 1;
     timeline.style.width = time + 'px';
     if (time > 319) {
       clearInterval(counterline)
     }
   }
 }