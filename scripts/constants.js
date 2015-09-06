/*
    Description: Provides named constants that are used throughout the rest of the code.
*/
var constants;
(function (constants) {
    constants.MENU_STATE = 0;
    constants.PLAY_STATE = 1;
    constants.GAME_OVER_STATE = 2;
    constants.INSTRUCTIONS_STATE = 3;
    constants.GAME_VERSION = "v0.4.2.1";
    constants.GAME_FPS = 60;
    constants.ENEMY_NUM = [2, 3, 4, 5];
    constants.LABEL_FONT = "35px Consolas";
    constants.INSTRUCTIONS_FONT = "20px Consolas";
    constants.VERSION_FONT = "12px Consolas";
    constants.LABEL_COLOUR = "#00FF00";
    constants.PLAYER_LIVES = 4;
    constants.SHIP_LASER_TYPE = "greenlaser1";
    constants.SHIP_LASER_SPEED = 10;
    constants.SHIP_LASER_SOUNDTYPE = 1;
    constants.CURSOR_DEFAULT = "url('assets/images/cursors/default.png'), default";
    constants.CURSOR_POINTER = "url('assets/images/cursors/pointer.png'), pointer";
})(constants || (constants = {}));
//# sourceMappingURL=constants.js.map