/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
	Description: The instructions screen. Tells the player how to play the game using text and some non-updating sprites.
*/

module states {
	// When the back button is clicked, goes back to the main menu screen.
	export function backButtonClicked(event: MouseEvent) {
		stage.removeChild(game);
		ship.destroy();
		backButton.destroy();
		game.removeAllChildren();
		game.removeAllEventListeners();
		currentState = constants.MENU_STATE;
		changeState(currentState);
	}

	// Extended game loop while in the instructions state.
	export function instructionsState() {
		stars.update();
	}

	// Initializes the instructions state.
	export function instructions() {
		var instructionsLabel: objects.Label;
		var panel: createjs.Bitmap;

		// Lower the soundtrack volume so the player can focus on reading the instructions ;)
		soundtrack.setVolume(0.25);

		// Declare new Game Container
		game = new createjs.Container();

		// Instantiate Game Objects
		if (stars == null) {
			stars = new objects.Stars(stage, game);
		} else {
			game.addChild(stars);
		}

		// Instantiate and add instructions panel.
		panel = new createjs.Bitmap(<HTMLImageElement>managers.Asset.loader.getResult("panel-1"));
		panel.regX = panel.getBounds().width * 0.5;
		panel.regY = panel.getBounds().height * 0.5;
		panel.x = stage.canvas.width * 0.5;
		panel.y = stage.canvas.height * 0.5;
		game.addChild(panel);

		// Instantiate Game Objects that will not be updated,
		// they're merely just for looks.
		ship = new objects.Ship(stage, game);
		ship.x = (stage.canvas.width * 0.5);

		enemies[0] = new objects.Enemy(stage, game, 1);
		enemies[0].x = (stage.canvas.width * 0.5) + 142;
		enemies[0].y = (stage.canvas.height * 0.5) - 68;

		pickup = new objects.Pickup(stage, game, 1);
		pickup.x = (stage.canvas.width * 0.5) + 21;
		pickup.y = (stage.canvas.height * 0.5) - 42;
		pickup.visible = true;

		// Show Cursor
		stage.cursor = constants.CURSOR_DEFAULT;

		// Display Game Over
		var instructions: string = "Instructions:\n\n" +
			"\nFly your ship  (      ) through space,\n\n" +
			"destroy the red enemy ships (      )\n\n" +
			"Collect powerups (      ) to get\n\n" +
			"more points and powerful upgrades.\n\n" +
			"\nFly using your mouse, click to shoot.\n\n" +
			"\nGood luck!";
		instructionsLabel = new objects.Label(stage.canvas.width * 0.5, stage.canvas.height * 0.20, instructions, constants.INSTRUCTIONS_FONT);
		game.addChild(instructionsLabel);

		// Display Play Again Button
		backButton = new objects.Button(stage.canvas.width * 0.5, 350, "back");
		game.addChild(backButton);
		backButton.addEventListener("click", backButtonClicked);

		stage.addChild(game);
	}
} 