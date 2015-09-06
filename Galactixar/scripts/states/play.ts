/// <reference path="../objects/button.ts" />
/// <reference path="../objects/enemy.ts" />
/// <reference path="../objects/pickup.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/stars.ts" />
/// <reference path="../objects/ship.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />
/*
	Description: The main game screen, the actual game logic happens here.
*/

module states {
	var shootButtonPressed: boolean = false;

	var levelTicker: number;

	// Extended game loop while in the play state.
	export function playState() {
		stars.update();
		if (warpEffect.visible) {
			warpEffect.update();
		}
		pickup.update();
		ship.update();
		nebula.update();

		for (var i: number = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
			enemies[i].update();
		}
		for (var j: number = 0; j < projectiles.length; j++) {
			if (projectiles[j] != null) {
				projectiles[j].update();
			}
		}

		if (shootButtonPressed) {
			ship.dischargeWeapon();
		}

		collision.update();
		scoreboard.update();

		if (levelLabel.visible && levelLabel.alpha > 0) {
			levelLabel.alpha -= 0.01;
		} else {
			levelLabel.visible = false;
			levelLabel.alpha = 2;
		}

		if (currentLevel < 3) {
			if (levelTicker > 1500) {
				levelTicker = 0;
				currentLevel++;
				levelLabel.text = "Level " + (currentLevel + 1).toString();
				levelLabel.visible = true;
				enemies[constants.ENEMY_NUM[currentLevel - 1]] = new objects.Enemy(stage, game, currentLevel + 1);
				warpEffect.performWarp();
				ship.setInvulnerable(true);
			} else {
				levelTicker++;
			}
		}

		if (scoreboard.lives <= 0 || wonGame) {
			stage.removeChild(game);
			ship.destroy();
			game.removeAllChildren();
			game.removeAllEventListeners();
			stage.removeEventListener("stagemousedown", shootButtonDown);
			stage.removeEventListener("stagemousedown", shootButtonUp);
			currentState = constants.GAME_OVER_STATE;
			changeState(currentState);
		}
	}

	// When the shoot button is pressed down, fire the ship weapons and enable auto fire.
	export function shootButtonDown(event: MouseEvent) {
		ship.dischargeWeapon();
		shootButtonPressed = true;
	}
	// When the shoot button is released, disable auto fire.
	export function shootButtonUp(event: MouseEvent) {
		shootButtonPressed = false;
	}

	// Initializes the play state.
	export function play(): void {
		// Declare new Game Container
		game = new createjs.Container();

		// Hide Cursor
		stage.cursor = "none";

		// Start on level 1
		currentLevel = 0;
		levelTicker = 0;

		// Reset projectiles array
		projectiles = [];

		// Instantiate Game Objects
		if (stars == null) {
			stars = new objects.Stars(stage, game);
		} else {
			game.addChild(stars);
		}
		if (stars.sector !== 1) {
			stars.changeSector(1);
		}

		pickup = new objects.Pickup(stage, game, 1);
		ship = new objects.Ship(stage, game);
		ship.setInvulnerable(true);

		// Create multiple enemies
		for (var count: number = 0; count < constants.ENEMY_NUM[currentLevel]; count++) {
			enemies[count] = new objects.Enemy(stage, game, 1);
		}

		// The nebula appears above the ships.
		if (nebula == null) {
			nebula = new objects.Nebula(stage, game);
		} else {
			game.addChild(nebula);
		}

		warpEffect = new objects.WarpEffect(stage, game);
		game.addChild(warpEffect);

		// Display Scoreboard
		scoreboard = new objects.Scoreboard(stage, game);

		// Display level number
		levelLabel = new objects.Label(stage.canvas.width * 0.5, stage.canvas.height * 0.5, "Level " + (currentLevel + 1).toString(), constants.INSTRUCTIONS_FONT);
		levelLabel.alpha = 2;
		game.addChild(levelLabel);

		// Instantiate Collision Manager
		collision = new managers.Collision(ship, pickup, enemies, projectiles, scoreboard);

		// Add mouse event listeners for shooting.
		stage.addEventListener("stagemousedown", shootButtonDown);
		stage.addEventListener("stagemouseup", shootButtonUp);

		stage.addChild(game);

		// Start the soundtrack if it's not already playing.
		if (soundtrack == null) {
			soundtrack = createjs.Sound.play("soundtrack", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
		} else {
			soundtrack.setVolume(1);
		}
	}
}
