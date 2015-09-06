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
var states;
(function (states) {
    var shootButtonPressed = false;
    var levelTicker;
    function playState() {
        stars.update();
        if (warpEffect.visible) {
            warpEffect.update();
        }
        pickup.update();
        ship.update();
        nebula.update();
        for (var i = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
            enemies[i].update();
        }
        for (var j = 0; j < projectiles.length; j++) {
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
        }
        else {
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
            }
            else {
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
    states.playState = playState;
    function shootButtonDown(event) {
        ship.dischargeWeapon();
        shootButtonPressed = true;
    }
    states.shootButtonDown = shootButtonDown;
    function shootButtonUp(event) {
        shootButtonPressed = false;
    }
    states.shootButtonUp = shootButtonUp;
    function play() {
        game = new createjs.Container();
        stage.cursor = "none";
        currentLevel = 0;
        levelTicker = 0;
        projectiles = [];
        if (stars == null) {
            stars = new objects.Stars(stage, game);
        }
        else {
            game.addChild(stars);
        }
        if (stars.sector !== 1) {
            stars.changeSector(1);
        }
        pickup = new objects.Pickup(stage, game, 1);
        ship = new objects.Ship(stage, game);
        ship.setInvulnerable(true);
        for (var count = 0; count < constants.ENEMY_NUM[currentLevel]; count++) {
            enemies[count] = new objects.Enemy(stage, game, 1);
        }
        if (nebula == null) {
            nebula = new objects.Nebula(stage, game);
        }
        else {
            game.addChild(nebula);
        }
        warpEffect = new objects.WarpEffect(stage, game);
        game.addChild(warpEffect);
        scoreboard = new objects.Scoreboard(stage, game);
        levelLabel = new objects.Label(stage.canvas.width * 0.5, stage.canvas.height * 0.5, "Level " + (currentLevel + 1).toString(), constants.INSTRUCTIONS_FONT);
        levelLabel.alpha = 2;
        game.addChild(levelLabel);
        collision = new managers.Collision(ship, pickup, enemies, projectiles, scoreboard);
        stage.addEventListener("stagemousedown", shootButtonDown);
        stage.addEventListener("stagemouseup", shootButtonUp);
        stage.addChild(game);
        if (soundtrack == null) {
            soundtrack = createjs.Sound.play("soundtrack", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        else {
            soundtrack.setVolume(1);
        }
    }
    states.play = play;
})(states || (states = {}));
//# sourceMappingURL=play.js.map