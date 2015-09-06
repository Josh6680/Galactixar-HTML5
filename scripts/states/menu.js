/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
    Description: The main menu screen of the game. Has buttons to play the game and view the instructions. Also has some nice effects from the game in the background.
*/
var states;
(function (states) {
    function playButtonClicked(event) {
        stage.removeChild(game);
        ship.destroy();
        playButton.destroy();
        instructionsButton.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.playButtonClicked = playButtonClicked;
    function instructionsButtonClicked(event) {
        stage.removeChild(game);
        ship.destroy();
        playButton.destroy();
        instructionsButton.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.INSTRUCTIONS_STATE;
        changeState(currentState);
    }
    states.instructionsButtonClicked = instructionsButtonClicked;
    function menuState() {
        stars.update();
        nebula.update();
    }
    states.menuState = menuState;
    function menu() {
        game = new createjs.Container();
        if (stars == null) {
            stars = new objects.Stars(stage, game);
        }
        else {
            game.addChild(stars);
        }
        if (stars.sector !== 1) {
            stars.changeSector(1);
        }
        ship = new objects.Ship(stage, game);
        nebula = new objects.Nebula(stage, game);
        stage.cursor = constants.CURSOR_DEFAULT;
        var gameNameLabel = new objects.Label(stage.canvas.width / 2, 40, "Galactixar", constants.LABEL_FONT);
        game.addChild(gameNameLabel);
        var gameVersionLabel = new objects.Label(30, stage.canvas.height - 20, constants.GAME_VERSION, constants.VERSION_FONT);
        game.addChild(gameVersionLabel);
        playButton = new objects.Button(stage.canvas.width / 2, 250, "playgame");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);
        instructionsButton = new objects.Button(stage.canvas.width / 2, 350, "instructions");
        game.addChild(instructionsButton);
        instructionsButton.addEventListener("click", instructionsButtonClicked);
        stage.addChild(game);
        if (soundtrack == null) {
            soundtrack = createjs.Sound.play("soundtrack", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        else {
            soundtrack.setVolume(1);
        }
    }
    states.menu = menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map