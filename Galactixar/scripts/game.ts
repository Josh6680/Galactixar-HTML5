/// <reference path="constants.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/enemy.ts" />
/// <reference path="objects/pickup.ts" />
/// <reference path="objects/nebula.ts" />
/// <reference path="objects/stars.ts" />
/// <reference path="objects/ship.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="managers/collision.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/instructions.ts" />
/*
	Description: Contains the main game logic for the loading, game loop, and state machine.
*/

var stage: createjs.Stage;
var game: createjs.Container;

// The game's soundtrack!
var soundtrack: createjs.SoundInstance = null;

var stars: objects.Stars;
var warpEffect: objects.WarpEffect;
var ship: objects.Ship;
var pickup: objects.Pickup;
var enemies: objects.Enemy[] = []; // Enemy array
var nebula: objects.Nebula;
var scoreboard: objects.Scoreboard;
var projectiles: objects.Projectile[] = []; // Projectile array

var collision: managers.Collision;

var tryAgainButton: objects.Button;
var mainMenuButton: objects.Button;
var playButton: objects.Button;
var instructionsButton: objects.Button;
var backButton: objects.Button;

var currentLevel: number;
var levelLabel: objects.Label;
var wonGame: boolean = false;

var currentState: number;
var currentStateFunction: Function;

// Preload function - Loads the assets and initializes the game.
function preload(): void {
	managers.Asset.init();
	managers.Asset.loader.on("complete", init, null, true);
}

// init called after assets have been loaded.
function init(): void {
	stage = new createjs.Stage(document.getElementById("canvas"));
	stage.enableMouseOver(20);
	createjs.Ticker.setFPS(constants.GAME_FPS);
	createjs.Ticker.addEventListener("tick", gameLoop);
	optimizeForMobile();

	currentState = constants.MENU_STATE;
	changeState(currentState);
}

// Add touch support for mobile devices.
function optimizeForMobile(): void {
	if (createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage);
	}
}

// The main game loop.
function gameLoop(event: Object): void {
	currentStateFunction();
	stage.update();
}

// Changes the game state, effectively switching screens.
function changeState(state: number): void {
	// Launch Various "screens"
	switch (state) {
		case constants.MENU_STATE:
			// instantiate menu screen
			currentStateFunction = states.menuState;
			states.menu();
			break;

		case constants.PLAY_STATE:
			// instantiate play screen
			currentStateFunction = states.playState;
			states.play();
			break;

		case constants.GAME_OVER_STATE:
			currentStateFunction = states.gameOverState;
			// instantiate game over screen
			states.gameOver();
			break;

		case constants.INSTRUCTIONS_STATE:
			currentStateFunction = states.instructionsState;
			// instantiate instructions screen
			states.instructions();
			break;
	}
}
