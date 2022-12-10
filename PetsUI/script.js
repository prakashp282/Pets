//#region Declaring consts and variables 
//Pet variables
var  age = 0, hunger = 0, happiness = 100, health = 100;
//Time variables 
var dayDuration = 1, nextEventTime = 5;
//pet status
var petAlive = true;

const nameText = document.querySelector('#name');
const ageText = document.querySelector('#age');

const eventTitle = document.querySelector('#eventTitle');
const eventDescription = document.querySelector('#eventDescription');

const cleanButton = document.querySelector('#btnClean');
const feedButton = document.querySelector('#btnFeed');
const playButton = document.querySelector('#btnPlay');

const startButton = document.querySelector('#btnStart');
const resetButton = document.querySelector('#btnReset');

//Containers 
const startUpContainer = document.querySelector('#startUp');
const mainContainer = document.querySelector('#main');
const eventContainer = document.querySelector('#event');
const characterContainer = document.querySelector('.Character');

const interactionsContainer = document.querySelector('#interactions');
const EndMessageText = document.querySelector('#EndMessage');



//#endregion


//#region Event listeners for all buttons
startButton.addEventListener('click', function(){
  //Initial SetUp.
  petAlive = true;
  dayDuration = document.querySelector('#inputSpeedControl').value ? document.querySelector('#inputSpeedControl').value : 1;
  nameText.innerHTML = document.querySelector('#inputName').value ? document.querySelector('#inputName').value : "PET";
  ageText.innerHTML = age;
  updatePogress();

  //wait for initial 5 sec and then fetch event.
  setTimeout(fetchEvent, nextEventTime * dayDuration * 1000);
  setTimeout(dayUpdate,  dayDuration * 1000);
  startUpContainer.style.display = "none";
  EndMessageText.style.display = "none";
  mainContainer.style.display = "flex";
  characterContainer.style.display = "flex";
  interactionsContainer.style.display = "flex";

})

resetButton.addEventListener('click', resetGame)

cleanButton.addEventListener('click', function(){
  if(petAlive){
    health = limitVariables(health + (5 - ( Math.floor((100 - happiness) * 0.02) + Math.floor(hunger * 0.02) + 2)));
    updatePogress();
  }
})

playButton.addEventListener('click', function(){
  if(petAlive){
    health = limitVariables(health + ( 5 - ( Math.floor((100 - happiness) * 0.04) + Math.floor(hunger * 0.04) + 1)));
    happiness = limitVariables(happiness + ( 5 - (Math.floor(hunger * 0.05) + 1)));
    updatePogress();
  }
})

feedButton.addEventListener('click', function(){
  if(petAlive){    
    hunger = limitVariables(hunger - (5 - (Math.floor((100 - happiness) * 0.05) + 1 )));
    updatePogress();
  }
})

//#endregion

//#region funtions 
//Run a parallel thread and fetch Random Events.
async function fetchEvent(){
  if(!petAlive){
    //break the loop.
    return;
  }

  fetch('https://pets-beta.vercel.app/event').then(data => data.json()).then(function(data){
    if(data.type === 'Error'){
      //Somehow the request failed so we ignore it and wait till next event time.
      console.log('Request Failed', data);
      setTimeout(fetchEvent, nextEventTime * dayDuration * 1000);
      }
    else {
      console.log ('Request Successfull :', data);
      nextEventTime = data.NextEvent;
      health = limitVariables(health + data.Impact.Health);
      hunger = limitVariables(hunger + data.Impact.Hunger);
      happiness = limitVariables(happiness + data.Impact.Happiness);
      updatePogress();
      showEvent(data);
      setTimeout(fetchEvent, nextEventTime *dayDuration * 1000);
    }
  });

}


async function dayUpdate(){
  if(health <= 0 ) {
    petAlive = false;
    characterContainer.style.display = "none";
    interactionsContainer.style.display = "none";
    EndMessageText.style.display = "block";
  }

  if(!petAlive){
    return;
  }

  age = age + 1;
  
  //advnace logic assumption - 
  // health per day can decrease between 1-5 : depending on happiness and hunger.
  // if happ and not hunger - 1 , then increase 1 each time it drops by 20 percent.

  //happiness depends on hunger


  //hunger depends on happiness

  health = limitVariables(health -( Math.floor((100 - happiness) * 0.04) + Math.floor(hunger * 0.04) + 1));
  hunger = limitVariables(hunger + (Math.floor((100 - happiness) * 0.05) + 1 ));
  //reduction between 1 - 5 - if hunger is less than 20 reduce 1, less than 40 reduce 2, and so increase 1 in sets of 20
  happiness = limitVariables(happiness - (Math.floor(hunger * 0.05) + 1));
  ageText.innerHTML =age;
  updatePogress(); 

  setTimeout(dayUpdate,  dayDuration * 1000);
}


function resetGame(){

  //clearing Input fields
  document.querySelector('#inputSpeedControl').value = "";
  document.querySelector('#inputName').value = "";

  petAlive = false;
  age = 0;
  happiness = 100;
  health = 100;
  hunger =0;
  mainContainer.style.display = "none";
  startUpContainer.style.display = "flex";
}

function showEvent(data){
  eventContainer.style.display = "flex";

  eventTitle.innerHTML = data.Title;
  eventDescription.innerHTML = data.Description;

  setTimeout(function(){eventContainer.style.display = "none";},   3 * 1000);
}

function limitVariables(data){
  if (data >= 0 && data <= 100)
	    return data;
	 else if (data > 100)
	    return 100;
	else
	    return 0;

}

function updatePogress() {
  updatePogressbar('Health', health);
  updatePogressbar('Hunger', hunger);
  updatePogressbar('Happiness', happiness);
}

function updatePogressbar(bar, width){
    var elem = document.getElementById(bar);
      if (width > 100) {
        // do nothing.
      } else {
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
}
//#endregion