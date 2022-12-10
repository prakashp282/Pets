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

//Intrations are mapped here. 
cleanButton.addEventListener('click', function(){
  if(petAlive){
    // health depends on happiness and hunger and would update as a factor of both.
    health = limitVariables(health + (5 - ( Math.floor((100 - happiness) * 0.02) + Math.floor(hunger * 0.02) + 2)));
    updatePogress();
  }
})

playButton.addEventListener('click', function(){
  if(petAlive){
    health = limitVariables(health + ( 5 - ( Math.floor((100 - happiness) * 0.04) + Math.floor(hunger * 0.04) + 1)));
    // hapiness is dependent on hunger and pets hungeier the happiness interation becomes less effective.
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
      //fetch the data from even api and update the stats accordingly.
      health = limitVariables(health + data.Impact.Health);
      hunger = limitVariables(hunger + data.Impact.Hunger);
      happiness = limitVariables(happiness + data.Impact.Happiness);
      updatePogress();
      showEvent(data);
      //if health becomes 0 the pet dies.
        if(health <= 0 ) {
          death();
        }
      setTimeout(fetchEvent, nextEventTime *dayDuration * 1000);
    }
  });

}

//Each day age and other factors should update.
async function dayUpdate(){
  if(!petAlive){
    return;
  }

  age = age + 1;
  
  //advnace logic assumption - 
  // health per day can decrease between 1-5 : depending on happiness and hunger.
  // if happ and not hunger - 1 , then increase 1 each time it drops by 20 percent.
  health = limitVariables(health -( Math.floor((100 - happiness) * 0.04) + Math.floor(hunger * 0.04) + 1));
  //hunger depends on happiness
  hunger = limitVariables(hunger + (Math.floor((100 - happiness) * 0.05) + 1 ));
  //RANDOM 1-5 was removed from here on purpose.
  //reduction between 1 - 5 - if hunger is less than 20 reduce 1, less than 40 reduce 2, and so increase 1 in sets of 20
  happiness = limitVariables(happiness - (Math.floor(hunger * 0.05) + 1));
  ageText.innerHTML =age;
  updatePogress(); 
  //if health becomes 0 the pet dies.
  if(health <= 0 ) {
    death();
  }
  setTimeout(dayUpdate,  dayDuration * 1000);
}

function death(){
  petAlive = false;
  characterContainer.style.display = "none";
  interactionsContainer.style.display = "none";
  EndMessageText.style.display = "block";
}

//We need to reset the game as soon as we press the reset button
function resetGame(){

  //clearing Input fields
  document.querySelector('#inputSpeedControl').value = "";
  document.querySelector('#inputName').value = "";

  //the values are set to default.
  petAlive = false;
  age = 0;
  happiness = 100;
  health = 100;
  hunger =0;
  mainContainer.style.display = "none";
  startUpContainer.style.display = "flex";
}

//the banner is made visible when we hit the fetch event api.
function showEvent(data){
  eventContainer.style.display = "flex";

  eventTitle.innerHTML = data.Title;
  eventDescription.innerHTML = data.Description;

  setTimeout(function(){eventContainer.style.display = "none";},   3 * 1000);
}


//at any given time the values can only be in range of 0 to 100 this function checks and ensures that.
function limitVariables(data){
  if (data >= 0 && data <= 100)
	    return data;
	 else if (data > 100)
	    return 100;
	else
	    return 0;

}

// we update the progress bar for all there fators.
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