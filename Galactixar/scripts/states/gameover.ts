/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
	Description: The game over screen. Shows up when the player was destroyed and had no more lives. Has buttons to try again or go back to the main menu.
*/

module states {
	// Extended game loop while in the game over state.
	export function gameOverState() {
		stars.update();
	}

	// When the try again button is clicked, restart the game in play state.
	export function tryAgainButtonClicked(event: MouseEvent) {
		stage.removeChild(game);
		tryAgainButton.destroy();
		mainMenuButton.destroy();
		game.removeAllChildren();
		game.removeAllEventListeners();
		currentState = constants.PLAY_STATE;
		changeState(currentState);
	}

	// When the main menu button is clicked, goes back to the main menu state.
	export function mainMenuButtonClicked(event: MouseEvent) {
		stage.removeChild(game);
		tryAgainButton.destroy();
		mainMenuButton.destroy();
		game.removeAllChildren();
		game.removeAllEventListeners();
		currentState = constants.MENU_STATE;
		changeState(currentState);
	}

	// Initializes the game over state.
	export function gameOver() {
		// Turn off the soundtrack.
		soundtrack.stop();
		soundtrack = null;

		// Declare new Game Container
		game = new createjs.Container();

		// Instantiate Game Objects
		if (stars == null) {
			stars = new objects.Stars(stage, game);
		} else {
			game.addChild(stars);
		}

		// Show Cursor
		stage.cursor = constants.CURSOR_DEFAULT;

		// Display Game Over
		var gameOverText: string;
		var endGameText: string;
		if (wonGame) {
			gameOverText = "VICTORY!";
			endGameText = "You have successfully defeated the enemy flagship.\n\nNo doubt ensuring victory for your fleet.";
			wonGame = false;
		} else {
			gameOverText = "GAME OVER";
			endGameText = "Whats left of your ship drifts off into deep space...";
		}

		var gameOverLabel: objects.Label = new objects.Label(stage.canvas.width * 0.5, 30, gameOverText, constants.LABEL_FONT);
		game.addChild(gameOverLabel);

		var endGameLabel: objects.Label = new objects.Label(stage.canvas.width * 0.5, 70, endGameText, constants.INSTRUCTIONS_FONT);
		game.addChild(endGameLabel);

		// Display Final Score Label
		var finalScoreLabel: objects.Label = new objects.Label(stage.canvas.width / 2, 130, "FINAL SCORE", constants.LABEL_FONT);
		game.addChild(finalScoreLabel);

		// Display Final Score
		var finalScore: objects.Label = new objects.Label(stage.canvas.width / 2, 170, scoreboard.score.toString(), constants.LABEL_FONT);
		game.addChild(finalScore);

		// Display Try Again Button
		tryAgainButton = new objects.Button(stage.canvas.width / 2, 250, "tryagain");
		game.addChild(tryAgainButton);
		tryAgainButton.addEventListener("click", tryAgainButtonClicked);

		// Display Main Menu Button
		mainMenuButton = new objects.Button(stage.canvas.width / 2, 350, "mainmenu");
		game.addChild(mainMenuButton);
		mainMenuButton.addEventListener("click", mainMenuButtonClicked);

		stage.addChild(game);
	}
}
