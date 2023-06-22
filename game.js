var gamePattern = [];
var buttonColours = [ "red", "blue", "green", "yellow"];
var userClickedPattern=[];

var started=false;
var level=0;

$("#orange").click(function() {
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
        $("#orange").hide();

    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Orange Button to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
      $("#orange").show();
    }
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    
    
}

function playSound(name) {
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }

