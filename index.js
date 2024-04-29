// buttonColours array.
const buttonColours = ["red", "blue", "green", "yellow"]; // Array Variable containing the text of the button ID's so can be easily pulled and implemented within the code.


// Game and User pattern variables.
let gamePattern = []; // Default game array starting at 0 (empty). Used to store the random game pattern created in the 'nextSequence()' function.
let userClickedPattern = []; // Default user array starting at 0 (empty). Used to store the users game pattern created in the '$(.btn").click' function.


// Game state Variable.
let bStarted = false; // Boolean Variable used to detect whether the game has started. Default value is 'false'.
let level = 0; // Numeric variable to store the Level of the game. Default is '0'. Game started at Level 1 as the Level is increased in the 'nextSequence()' and '$(document).keypress) functions.


// Timeout Variables
const nextSequenceTimeout = 1000; // Determines the value of the Timeout function called in 'nextSequence()'. Currently set to 1000 milliseconds.
const gameOverTimeout = 200; // Determines the value of the Timeout function called in 'gameOver()'. Currently set to 200 milliseconds.
const pressedAnimationTimeout = 100; // Determines the value of the Timeout function called in 'animatePress()'. Currently set to 100 milliseconds.


$("body").on("touchstart", function (e) {
    if (!bStarted) { // Use consistent variable name
        setTimeout(nextSequence, 2500);
        bStarted = true; // Use consistent variable name
    }
});

// button touch detection
var allButtons = document.querySelectorAll(".btn");
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("touchstart", function () {
        if (started === true) {
            var userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);
            buttonAnimation(userChosenColour);
            playAudio(userChosenColour);
            console.log(userClickedPattern);
            checkAnswer(userClickedPattern.length - 1);
        }
    });
}

// Event Listener for button clicks.
$(".btn").click(function () {

    let userChosenColour = $(this).attr("id"); // Variable created 'userChosenColour' and it's value is set to the 'id' of which button was pressed.
    userClickedPattern.push(userChosenColour); // The value of the 'userChosenColour' is pushed on to the 'userClickedPattern' array.

    playSound(userChosenColour); // Calls the 'playSound()' function with the parameter's value set to 'userChosenColour' so that the right sound is played for each button.
    animatePress(userChosenColour); // Calls the 'animatePress()' function with the parameter's value set to 'userChosenColour' so that the class "pressed" is added to the correct button.
    checkAnswer(userClickedPattern.length - 1); // Calls the 'checkAnswer()' function with the parameter's value set to the last value pushed on the 'userClickedPattern' array.
});


// checkAnswer() function with the parameter 'current level'.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Checks if both 'gamePattern' and 'userClickedPattern' have the same values.

        if (userClickedPattern.length === gamePattern.length) { // Checks if both 'gamePattern' and 'userClickedPattern' have the same array length.

            setTimeout(function () { // Timeout function.
                nextSequence();  // Calls the 'nextSequence()' function and the game continue's.
            }, nextSequenceTimeout);
        }
    } else { // If'gamePattern' and 'userClickedPattern' array length aren't the same or the value's aren't then the game ends in this code is run.

        playSound("wrong"); // Calls the 'playSound()' function with a parameter of 'wrong' to play the 'wrong.mp3' sound.

        $("h1").text("Game Over, Press Any Key to Restart"); // Changes the 'h1' text.

        $("body").addClass("game-over"); // Adds the class 'game-over' to the 'body'.
        setTimeout(function () { // Timeout function.
            $("body").removeClass("game-over"); // Removed the class 'game-over' from the 'body'.
        }, gameOverTimeout);

        startOver(); // Calls the 'startOver()' function.

    }
}


// nextSequence() function.
function nextSequence() {

    userClickedPattern = []; // Resets the 'userClickedPattern' array to it's default state (empty).

    level++; // Increases the value of the 'level' variable by 1.

    $("#level-title").text("Level " + level); // Changes the 'h1' by using it's 'id' to "Level + the value of the variable 'level'" to show the user the current level.

    let randomNumber = Math.floor(Math.random() * 4); // Variable created named 'randomNumber'. It's value is set to a random number between 1 - 4.
    let randomChosenColour = buttonColours[randomNumber]; // Variable created named 'randomChosenColour'. It's value is set to an item from the 'buttonColours' variable dependent on the random number generated in the 'randomNumber' variable.

    gamePattern.push(randomChosenColour); // Pushes new item into the 'gamePattern' array.


    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () { // Timeout function.
            animatePress(gamePattern[i]);
            playSound(gamePattern[i]);
        }, gamePatternRepeatTimeout * i); // Delay each iteration by i * gamePatternRepeatTimeout milliseconds.
    }

}


// playSound() function with the parameter of 'name'.
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3"); // New variable declared 'audio'. The value is set using the 'name' parameter. Which is accepted to create a string value to the file path of a button. So the right sound matches the right button.
    audio.play(); // Plays button sound.
}



// animatePress function with a parameter of 'currentColour'.
function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed"); // Adds the class 'pressed' to the selected button.
    setTimeout(function () { // Timeout function.
        $("#" + currentColour).removeClass("pressed"); // Removes the 'pressed' class from the selected button.
    }, pressedAnimationTimeout);
}


// startOver() function. To determine what should happen when the game is to start over.
function startOver() {

    level = 0; // Resets the 'level' variable to it's default value of '0'.
    gamePattern = []; // Resets the 'gamePattern' array to it's default value of '[]'(empty).
    bStarted = false; // Resets the 'started' variable to it's default value of 'false'.
}
