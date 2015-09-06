/// <reference path="../constants.ts" />
/// <reference path="../game.ts" />
/*
    Description: The instructions screen. Tells the player how to play the game using text and some non-updating sprites.
*/
var states;
(function (states) {
    function backButtonClicked(event) {
        stage.removeChild(game);
        ship.destroy();
        backButton.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }
    states.backButtonClicked = backButtonClicked;
    function instructionsState() {
        stars.update();
    }
    states.instructionsState = instructionsState;
    function instructions() {
        var instructionsLabel;
        var panel;
        soundtrack.setVolume(0.25);
        game = new createjs.Container();
        if (stars == null) {
            stars = new objects.Stars(stage, game);
        }
        else {
            game.addChild(stars);
        }
        panel = new createjs.Bitmap(managers.Asset.loader.getResult("panel-1"));
        panel.regX = panel.getBounds().width * 0.5;
        panel.regY = panel.getBounds().height * 0.5;
        panel.x = stage.canvas.width * 0.5;
        panel.y = stage.canvas.height * 0.5;
        game.addChild(panel);
        ship = new objects.Ship(stage, game);
        ship.x = (stage.canvas.width * 0.5);
        enemies[0] = new objects.Enemy(stage, game, 1);
        enemies[0].x = (stage.canvas.width * 0.5) + 142;
        enemies[0].y = (stage.canvas.height * 0.5) - 68;
        pickup = new objects.Pickup(stage, game, 1);
        pickup.x = (stage.canvas.width * 0.5) + 21;
        pickup.y = (stage.canvas.height * 0.5) - 42;
        pickup.visible = true;
        stage.cursor = constants.CURSOR_DEFAULT;
        var instructions = "Instructions:\n\n" +
            "\nFly your ship  (      ) through space,\n\n" +
            "destroy the red enemy ships (      )\n\n" +
            "Collect powerups (      ) to get\n\n" +
            "more points and powerful upgrades.\n\n" +
            "\nFly using your mouse, click to shoot.\n\n" +
            "\nGood luck!";
        instructionsLabel = new objects.Label(stage.canvas.width * 0.5, stage.canvas.height * 0.20, instructions, constants.INSTRUCTIONS_FONT);
        game.addChild(instructionsLabel);
        backButton = new objects.Button(stage.canvas.width * 0.5, 350, "back");
        game.addChild(backButton);
        backButton.addEventListener("click", backButtonClicked);
        stage.addChild(game);
    }
    states.instructions = instructions;
})(states || (states = {}));
//# sourceMappingURL=instructions.js.map