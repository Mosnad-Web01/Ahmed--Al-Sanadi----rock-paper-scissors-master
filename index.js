const gameIcons = document.querySelectorAll(".general-icon-container");
const scoreNumber = document.querySelector(".score-number");
const computerChoiceImg = document.getElementById("computer-choice-img");
const palyerChoiceImg = document.getElementById("palyer-choice-img");
const resultText = document.getElementById("result-text");
const playAgainButton = document.querySelector(".play-again-button");
const computerChoiceContainer = document.querySelector(
	".computer-choice-container"
);
const playerChoiceContainer = document.querySelector(
	".player-choice-container"
);
const choices = ["spock", "scissors", "paper", "lizard", "rock"];
let score = 12;

const rules = {
	spock: ["scissors", "rock"],
	scissors: ["paper", "lizard"],
	paper: ["rock", "spock"],
	lizard: ["spock", "paper"],
	rock: ["lizard", "scissors"],
};

function determineWinner(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) {
		return "draw";
	} else if (rules[playerChoice].includes(computerChoice)) {
		return "win";
	} else {
		return "lose";
	}
}

function playGame(playerChoice) {
	const computerChoice = choices[Math.floor(Math.random() * choices.length)];

	// Update the images based on the choices
	computerChoiceImg.src = `images/icon-${computerChoice}.svg`;
	computerChoiceImg.alt =
		computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

	palyerChoiceImg.src = `images/icon-${playerChoice}.svg`;
	palyerChoiceImg.alt =
		playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);

	// Reveal the choice containers
	computerChoiceContainer.style.display = "block";
	playerChoiceContainer.style.display = "block";

	const result = determineWinner(playerChoice, computerChoice);

	// Display result
	if (result === "win") {
		resultText.textContent = "You Win!";
		score++;
	} else if (result === "lose") {
		resultText.textContent = "You Lose!";
		score--;
	} else {
		resultText.textContent = "It's a Draw!";
	}

	scoreNumber.textContent = score;

	// Show the play again button
	playAgainButton.style.display = "inline-block";

	// Hide the other game icons
	gameIcons.forEach((icon) => (icon.style.display = "none"));

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
		const playerChoice = icon.classList[1].split("-")[0];
		playGame(playerChoice);
	});
});

//  play again button
playAgainButton.addEventListener("click", resetGame);
