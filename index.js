const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let highscore = 0;
let helpPlaying = false;


function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);
  randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$("body").keydown(function() {
  if (gameStarted) {
  } else {
    $("h1").text("Level 0");
    gameStarted = true;
    nextSequence();
  }
})

$(".btn").click(function(event) {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour)
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor) {
  $("#"+ currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+ currentColor).removeClass("pressed");
  }, 100)
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function endGame() {
  playSound("wrong");
  if (highscore < level) {
    highscore = level;
    $("title").text("Highscore: " + highscore);
  }
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
  level = 0;
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer(lastColor) {
  if (userClickedPattern[lastColor] === gamePattern[lastColor]) {
    if(gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    endGame();
  }
}


function showHelp() {
  if (gameStarted === false) return;
  i = 0;
  let interval = setInterval(function() {
    playSound(gamePattern[i]);
    animatePress(gamePattern[i]);
    i++;
    if (i === gamePattern.length) {
      clearInterval(interval);
    }
  }, 1000);
}

$("button").click(function() {
  if (helpPlaying) return;
  if (!helpPlaying) {
    showHelp();
    helpPlaying = true;
    setTimeout(function () {
      helpPlaying = false;
    }, gamePattern.length * 1000);
  }
})
