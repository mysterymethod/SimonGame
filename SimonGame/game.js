//Global variables
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var gameStarted = false;

//All helper function (playSound, animatePress)

//User Click button sounds play.
const playSound = (id) => {
  const audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
}
//Animation on pressing the button class add and remove.
const animatePress = (id) => {
  $(`#${id}`).addClass('pressed');
  setTimeout(() => {
    $(`#${id}`).removeClass('pressed');
  },200);
}


//StartOver
const startOver = () => {
  level = 0;
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
}

//Answer Checker function
const checkAns = (indexOfLastAnswer) => {
  // const currentLevel =
  console.log(`GamePattern = ${gamePattern}`);
  console.log(`UserPattern = ${userClickedPattern}`);
  if (gamePattern[indexOfLastAnswer] === userClickedPattern[indexOfLastAnswer]) {
    console.log('Success');

    //check if the user has finished the pattern or not.
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('Fail');
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    },200);

    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

//Click Event
$(`.btn`).click((e) => {
  var id = e.target.id;
  userClickedPattern.push(id);
  playSound(id);
  animatePress(id);

  checkAns(userClickedPattern.length - 1);
});








const nextSequence = () => {

  userClickedPattern = [];

  const randomNumber = Math.floor(Math.random() * 3);

  const randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  console.log(gamePattern);

  $(`.${randomColor}`).fadeOut(100).fadeIn(100);

  level++;
  $(`h1`).text(`Level ${level}`);
}



//Keypress handler
$(document).keydown(() => {

  if(!gameStarted) {
    gameStarted = true;
    $(`h1`).text(`Level ${level}`);
    nextSequence();
  }
});
