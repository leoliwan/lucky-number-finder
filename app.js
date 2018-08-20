// Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

// Assigning
const   game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessInput = document.querySelector('#guess-input'),
        guessBtn = document.querySelector('#guess-btn'),
        winMessage = document.querySelector('.message'),
        errorMessage = document.querySelector('.error-message'),
        winGif = document.querySelector('#win-gif');
        overlay = document.querySelector('.overlay');

// Hide winGIF
winGif.style.display = 'none';

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})
// Listen to Guess Button Click
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate Input
    if(isNaN(guess) || guess < min || guess > max) {
        setErrorMessage(`Number must be between ${min} and ${max}`);
        
        //remove error message after 2 seconds
        setTimeout(setErrorMessage, 2000);
    } else {

    // Check if Won
    if(guess === winningNum) {

        gameOver(true, `Congrats! ${guess} is your lucky number`, 'white');
      
        //Display Win Gif
        winGif.style.display = 'block';
        overlay.style.backgroundColor = 'rgba(30, 83, 37, 0.9)';
    } else {
        // Wrong Guess. Subtract GuessesLeft
        guessesLeft -= 1;
        
        if(guessesLeft === 0) {
            // Game Over 
            gameOver(false, `Ooh! Your lucky number is ${winningNum}`, 'yellow')
          
            overlay.style.backgroundColor = 'rgba(129, 27, 27, 0.9)';
        } else {
            setTimeout(clearInput, 2000);
            setWinMessage(`${guess} is not your Lucky Number. Try again. You have ${guessesLeft} chance/s left to find out`, 'white')
            setTimeout(setErrorMessage, 2000);
        }
    }
}
    
});
function gameOver(won, winmsg) {
        let color;
        won === true ? color = 'rgba(43, 255, 43, 0.7)' : color = 'red';
        // Disable input
        guessInput.disabled = true;
        //Change Border Color to Green
        guessInput.style.borderColor = color;
        winMessage.style.color = color;
        //Display Win Message
        setWinMessage(winmsg);

        // Play Again
        guessBtn.value = 'Play Again';
        // Append a new class in the Submit Button
        guessBtn.className += 'play-again';
}
function clearInput() {
    guessInput.value = '';
}
function setErrorMessage(errmsg) {
    errorMessage.textContent = errmsg;
    
}
function setWinMessage(winmsg, color) {
    winMessage.style.color = color;
    winMessage.textContent = winmsg;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}



