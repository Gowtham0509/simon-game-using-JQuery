// alert("working");

var buttonColors  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = false;
var level = 0;

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown",function(event){
        if(!toggle){
            $("#level-title").text("Level "+level);
            nextSequence();
            toggle = true;
        }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // var audio = new Audio("./sounds/blue.mp3");
    // audio.play();
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
  
}

function playSound(name){
    
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
       //console.log("Failed");
       startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    toggle = false;
}

// console.log(userClickedPattern);
// console.log(gamePattern);

