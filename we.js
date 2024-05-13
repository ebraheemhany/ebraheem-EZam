//select element 
let countspan = document.querySelector(".quiz-info .count span ");
let bulletsspancontainer = document.querySelector(".bullets .spans")
let quizarea = document.querySelector(".quiz-area");
let answersarea = document.querySelector(".answers-area")
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let theresultscontainer = document.querySelector(".results")
let countdownElement = document.querySelector(".countdown")


//set options
let currentindex = 0;
let rightanswers = 0;
let countdownInterval;



function getquestions(){
let myrequest = new XMLHttpRequest();

myrequest.onreadystatechange = function(){

if(this.readyState === 4 && this.status === 200){

let questionsobject = JSON.parse(this.responseText);
let qcount = questionsobject.length;

// create bullets + set questions count
createbullets(qcount)

//add question data
  addquestiondata(questionsobject[currentindex],qcount);

//start countdown
countdown(10,qcount)


  //chick on submit
submitButton.onclick = () => {
  //get the right answer
  let therightanswer = questionsobject[currentindex].right_answer;
 
  
  //increase index
 currentindex ++;

 //check the answer
checkanswer(therightanswer, qcount);

//remove previous question
quizarea.innerHTML = "";
answersarea.innerHTML="";

//add question data
addquestiondata(questionsobject[currentindex],qcount);

//handle bullets classes
handlebullets();

//start countdown
clearInterval(countdownInterval);
countdown(10,qcount);
//show results
showresults(qcount);


  }
}


}
myrequest.open("GET", "html_question.json ", true);
myrequest.send();

}


getquestions();


function createbullets(num) {

countspan.innerHTML = num;

//create spans
for (let i = 0; i < num ; i++) {
//create bullet
let thebullet = document.createElement("span");
//check if the frist span
if (i === 0){

thebullet.className = 'on';

}

//Append bullets to Main bullet container
bulletsspancontainer.appendChild(thebullet)

}



}






function addquestiondata(obj,count) {
if (currentindex < count) {


  // create h2 question title
let questiontitle = document.createElement("h2");

//create question text
let questiontext = document.createTextNode(obj['title']);

//append text to h2
questiontitle.appendChild(questiontext);

//append the h2 to the quiz area
quizarea.appendChild(questiontitle)

//create the answers
for (let i=1; i <= 4; i++){
 //create main answer div
let maindiv = document.createElement("div");

//add classname to div 
maindiv.className = 'answer';

//create radio input
let radioinput = document.createElement("input");

//add type + name + id + data-attribute
radioinput.name='question';
radioinput.type ='radio';
radioinput.id =`answer_${i}`;
radioinput.dataset.answer = obj[`answer_${i}`];  


//create label
let thelabel = document.createElement("label");

//add for attribute
thelabel.htmlFor = `answer_${i}`;

//create label text 
let thelabeltext = document.createTextNode(obj[`answer_${i}`]);

//add the text to label
thelabel.appendChild(thelabeltext);

//add input + label to main div
maindiv.appendChild(radioinput);
maindiv.appendChild(thelabel);

//append all divs to answers area
answersarea.appendChild(maindiv);
}



}





}

function checkanswer(ranswer,count) {
let answers = document.getElementsByName("question");
let thechoosenanswer;
for(let i =0 ;i<answers.length;i++){
  if (answers[i].checked){
    thechoosenanswer = answers[i].dataset.answer;
  }


  
}



if (ranswer === thechoosenanswer) {
  rightanswers ++;
 
}



}

function handlebullets(){
let bulletsspans = document.querySelectorAll(".bullets .spans span");
let arrayofspans = Array.from(bulletsspans);
arrayofspans.forEach((span, index) => {
if (currentindex === index){

  span.className ="on";
}



})





}

function showresults(count){
let theresults;
if (currentindex === count) {
quizarea.remove();
answersarea.remove();  
submitButton.remove();
bullets.remove();

if (rightanswers > (count / 2) && rightanswers < count){

  theresults = `<span class="good">Good</span>, ${rightanswers} from ${count} is Good`;
}else if (rightanswers === count) {
  theresults = `<span class="perfect">Perfect</span>, ${rightanswers} from ${count} is Perfect`;
} else {
  theresults = `<span class="bad">Bad</span>, ${rightanswers} from ${count} is Bad`;
}

  

theresultscontainer.innerHTML = theresults;
theresultscontainer.style.padding ="10px";
theresultscontainer.style.backgroundColor ="white";
theresultscontainer.style.marginTop ="10px";



}
  

}
function countdown(duration,count){
if (currentindex < count){
let minutes , seconds;
countdownInterval = setInterval(function(){
minutes = parseInt(duration / 60);
seconds = parseInt(duration % 60);

minutes = minutes < 10 ? `0${minutes}`:minutes;
seconds = seconds < 10 ? `0${seconds}`:seconds;

countdownElement.innerHTML = `${minutes}:${seconds}`;
if (--duration < 0) {
clearInterval(countdownInterval);
submitButton.click();
}

},1000)
}


}


















