/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
	Description: The main menu screen of the game. Has buttons to play the game and view the instructions. Also has some nice effects from the game in the background.
*/

module states {
	// When the play button is clicked, goes to the play game screen.
	export function playButtonClicked(event: MouseEvent) {
		stage.removeChild(game);
		ship.destroy();
		playButton.destroy();
		instructionsButton.destroy();
		game.removeAllChildren();
		game.removeAllEventListeners();
		currentState = constants.PLAY_STATE;
		changeState(currentState);
	}

	// When the instructions button is clicked, goes to the instructions screen.
	export function instructionsButtonClicked(event: MouseEvent) {
		stage.removeChild(game);
		ship.destroy();
		playButton.destroy();
		instructionsButton.destroy();
		game.removeAllChildren();
		game.removeAllEventListeners();
		currentState = constants.INSTRUCTIONS_STATE;
		changeState(currentState);
	}

	// Extended game loop while in the menu state.
	export function menuState() {
		stars.update();
		nebula.update();
	}

	// Initializes the menu state.
	export function menu() { // Declare new Game Container
		game = new createjs.Container();

		// Instantiate Game Objects
		if (stars == null) {
			stars = new objects.Stars(stage, game);
		} else {
			game.addChild(stars);
		}
		if (stars.sector !== 1) {
			stars.changeSector(1);
		}

		ship = new objects.Ship(stage, game);
		
		// The nebula appears above the ships.
		nebula = new objects.Nebula(stage, game);

		// Show Cursor
		stage.cursor = constants.CURSOR_DEFAULT;

		// Display Game Title
		var gameNameLabel: objects.Label = new objects.Label(stage.canvas.width / 2, 40, "Galactixar", constants.LABEL_FONT);
		game.addChild(gameNameLabel);

		// Display Game Version
		var gameVersionLabel: objects.Label = new objects.Label(30, stage.canvas.height - 20, constants.GAME_VERSION, constants.VERSION_FONT);
		game.addChild(gameVersionLabel);

		// Display Play Again Button
		playButton = new objects.Button(stage.canvas.width / 2, 250, "playgame");
		game.addChild(playButton);
		playButton.addEventListener("click", playButtonClicked);

		// Display Instructions Button
		instructionsButton = new objects.Button(stage.canvas.width / 2, 350, "instructions");
		game.addChild(instructionsButton);
		instructionsButton.addEventListener("click", instructionsButtonClicked);

		stage.addChild(game);

		// Start the soundtrack if it's not already playing.
		if (soundtrack == null) {
			soundtrack = createjs.Sound.play("soundtrack", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
		} else {
			soundtrack.setVolume(1);
		}
	}
} 