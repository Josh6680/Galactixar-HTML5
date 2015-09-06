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
var stage;
var game;
var soundtrack = null;
var stars;
var warpEffect;
var ship;
var pickup;
var enemies = [];
var nebula;
var scoreboard;
var projectiles = [];
var collision;
var tryAgainButton;
var mainMenuButton;
var playButton;
var instructionsButton;
var backButton;
var currentLevel;
var levelLabel;
var wonGame = false;
var currentState;
var currentStateFunction;
function preload() {
    managers.Asset.init();
    managers.Asset.loader.on("complete", init, null, true);
}
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(constants.GAME_FPS);
    createjs.Ticker.addEventListener("tick", gameLoop);
    optimizeForMobile();
    currentState = constants.MENU_STATE;
    changeState(currentState);
}
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}
function gameLoop(event) {
    currentStateFunction();
    stage.update();
}
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            currentStateFunction = states.menuState;
            states.menu();
            break;
        case constants.PLAY_STATE:
            currentStateFunction = states.playState;
            states.play();
            break;
        case constants.GAME_OVER_STATE:
            currentStateFunction = states.gameOverState;
            states.gameOver();
            break;
        case constants.INSTRUCTIONS_STATE:
            currentStateFunction = states.instructionsState;
            states.instructions();
            break;
    }
}
//# sourceMappingURL=game.js.map