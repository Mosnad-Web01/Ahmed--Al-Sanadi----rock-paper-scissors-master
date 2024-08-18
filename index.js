const gameIcons = document.querySelectorAll(".general-icon-container"); // to add event listner to by forEach () line 107
const scoreNumber = document.querySelector(".score-number"); // to update its value
const playerChoiceContainerColor = document.querySelector(
	".player-choice-color"
);
const computerChoiceContainerColor = document.querySelector(
	".computer-choice-color"
);
// to update the src according to the computer choice :
const computerChoiceImg = document.getElementById("computer-choice-img");
// to update the src according to the player choice :
const palyerChoiceImg = document.getElementById("palyer-choice-img");
// to write the value on it (win , lose , draw)
const resultText = document.getElementById("result-text");
//to show the play again button
const playAgainButton = document.querySelector(".play-again-button");
// to display it because its hidden
const computerChoiceContainer = document.querySelector(
	".computer-choice-container"
);
// to display it because its hidden
const playerChoiceContainer = document.querySelector(
	".player-choice-container"
);
// to create random choices for computer
const choices = ["spock", "scissors", "paper", "lizard", "rock"];

let score = 0;
// to define rules each object has an arry of things it can win against

const rules = {
	spock: ["scissors", "rock"],
	scissors: ["paper", "lizard"],
	paper: ["rock", "spock"],
	lizard: ["spock", "paper"],
	rock: ["lizard", "scissors"],
};

// this function determine who is the winner and it will be called in playGame() function
// and it will be saved in var called result in line 43
function determineWinner(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return "draw";
	} else if (rules[playerChoice].includes(computerChoice)) {
		return "win";
	} else {
		return "lose";
	}
}

// this function do the following :
/* 1- create random choices for computerChoice and its stored in computerChoice variable
	 2-calls the functiondetermineWinner(playerChoice, computerChoice) 
		 that determines the winner by comparing playerChoice and computerChoice and stored in result var
     3- increase or decrease the value of score according to the result (win(+1) , lose(-1), draw)
     4-  Hide the other game icons to show only computer choice div and playerChoice div
     5- shows the hidden <div>s that will clarify player choice and computer choice 
     6 - update the img of computerChoice and PlayerChoice by src
     Note : this function will be called when user clicks om any icon so that 
      addEventlistener wiil target this function as a callback function .*/

function playGame(playerChoice) {
	const computerChoice = choices[Math.floor(Math.random() * choices.length)];
	const result = determineWinner(playerChoice, computerChoice);

	// Display result
	if (result === "win") {
		resultText.style.color = "#5bb411";
		resultText.textContent = "You Win!";
		playerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #32CD32, #7FFF00)"; //green
		computerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #FF4500, #FF6347)";
		score++;
	} else if (result === "lose") {
		resultText.style.color = "red";
		resultText.textContent = "You Lose!";
		playerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #FF4500, #FF6347)"; //loser
		computerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #32CD32, #7FFF00)"; //green
		score--;
	} else {
		resultText.style.color = "gray";
		resultText.textContent = "It's a Draw!";
		playerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #A9A9A9, #D3D3D3)"; //gray
		computerChoiceContainerColor.style.borderImageSource =
			"linear-gradient(45deg, #A9A9A9, #D3D3D3)"; //gray
	}

	scoreNumber.textContent = score;
	// Hide the other game icons
	gameIcons.forEach((icon) => (icon.style.display = "none"));
	// show the choice containers (hidden)
	computerChoiceContainer.style.display = "block";
	playerChoiceContainer.style.display = "block";
	// Show the play again button
	playAgainButton.style.display = "inline-block";

	// Update the images based on the choices
	computerChoiceImg.src = `images/icon-${computerChoice}.svg`;
	computerChoiceImg.alt =
		computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

	palyerChoiceImg.src = `images/icon-${playerChoice}.svg`;
	palyerChoiceImg.alt =
		playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);

	console.log(
		`You chose ${playerChoice}. Computer chose ${computerChoice}. Result: ${result}`
	);
}

function resetGame() {
	// Reset the game state
	gameIcons.forEach((icon) => (icon.style.display = "flex"));

	playAgainButton.style.display = "none";
	resultText.textContent = "";

	// Hide the choice containers
	computerChoiceContainer.style.display = "none";
	playerChoiceContainer.style.display = "none";

	// Clear images
	computerChoiceImg.src = "";
	palyerChoiceImg.src = "";
}

// Add event listeners to the game icons
gameIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		const playerChoice = icon.classList[1].split("-")[0]; // this will go to second class and divide class name
		// into two words and take the first word before the (-)
		// rock-container  =rock , paper-container = paper
		// this word will be passed through the palyerGame() func
		playGame(playerChoice);
	});
});

//  play again button
playAgainButton.addEventListener("click", resetGame);
