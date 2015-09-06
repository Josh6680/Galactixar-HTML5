/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
    Description: The game over screen. Shows up when the player was destroyed and had no more lives. Has buttons to try again or go back to the main menu.
*/
var states;
(function (states) {
    function gameOverState() {
        stars.update();
    }
    states.gameOverState = gameOverState;
    function tryAgainButtonClicked(event) {
        stage.removeChild(game);
        tryAgainButton.destroy();
        mainMenuButton.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.tryAgainButtonClicked = tryAgainButtonClicked;
    function mainMenuButtonClicked(event) {
        stage.removeChild(game);
        tryAgainButton.destroy();
        mainMenuButton.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }
    states.mainMenuButtonClicked = mainMenuButtonClicked;
    function gameOver() {
        soundtrack.stop();
        soundtrack = null;
        game = new createjs.Container();
        if (stars == null) {
            stars = new objects.Stars(stage, game);
        }
        else {
            game.addChild(stars);
        }
        stage.cursor = constants.CURSOR_DEFAULT;
        var gameOverText;
        var endGameText;
        if (wonGame) {
            gameOverText = "VICTORY!";
            endGameText = "You have successfully defeated the enemy flagship.\n\nNo doubt ensuring victory for your fleet.";
            wonGame = false;
        }
        else {
            gameOverText = "GAME OVER";
            endGameText = "Whats left of your ship drifts off into deep space...";
        }
        var gameOverLabel = new objects.Label(stage.canvas.width * 0.5, 30, gameOverText, constants.LABEL_FONT);
        game.addChild(gameOverLabel);
        var endGameLabel = new objects.Label(stage.canvas.width * 0.5, 70, endGameText, constants.INSTRUCTIONS_FONT);
        game.addChild(endGameLabel);
        var finalScoreLabel = new objects.Label(stage.canvas.width / 2, 130, "FINAL SCORE", constants.LABEL_FONT);
        game.addChild(finalScoreLabel);
        var finalScore = new objects.Label(stage.canvas.width / 2, 170, scoreboard.score.toString(), constants.LABEL_FONT);
        game.addChild(finalScore);
        tryAgainButton = new objects.Button(stage.canvas.width / 2, 250, "tryagain");
        game.addChild(tryAgainButton);
        tryAgainButton.addEventListener("click", tryAgainButtonClicked);
        mainMenuButton = new objects.Button(stage.canvas.width / 2, 350, "mainmenu");
        game.addChild(mainMenuButton);
        mainMenuButton.addEventListener("click", mainMenuButtonClicked);
        stage.addChild(game);
    }
    states.gameOver = gameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map