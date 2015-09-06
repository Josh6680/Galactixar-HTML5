/*
    Description: Preloads the graphics and sound assets used by the game and exposes them to other classes.
*/
var managers;
(function (managers) {
    var assetManifest = [
        { id: "cursor_default", src: "assets/images/cursors/default.png" },
        { id: "cursor_pointer", src: "assets/images/cursors/pointer.png" },
        { id: "stars1", src: "assets/images/backdrops/Stars1.png" },
        { id: "stars2", src: "assets/images/backdrops/Stars2.png" },
        { id: "stars3", src: "assets/images/backdrops/Stars3.png" },
        { id: "stars4", src: "assets/images/backdrops/Stars4.png" },
        { id: "nebula1", src: "assets/images/backdrops/Nebula1.png" },
        { id: "nebula2", src: "assets/images/backdrops/Nebula2.png" },
        { id: "nebula3", src: "assets/images/backdrops/Nebula3.png" },
        { id: "warpoverlay", src: "assets/images/overlays/warpoverlay.png" },
        { id: "panel-1", src: "assets/images/panels/panel-1.png" },
        { id: "laser1", src: "assets/sounds/Laser1.wav", data: 8 },
        { id: "laser2", src: "assets/sounds/Laser2.wav", data: 8 },
        { id: "explode1", src: "assets/sounds/Explosion.wav", data: 8 },
        { id: "explode2", src: "assets/sounds/Explosion2.wav", data: 8 },
        { id: "powerup", src: "assets/sounds/Powerup.wav", data: 2 },
        { id: "soundtrack", src: "assets/sounds/Afterburner-Soundtrack-by-copyc4t.ogg", data: 1 }
    ];
    var pickupsSheet = {
        "images": ["assets/images/pickups_sheet.png"],
        "frames": [
            [2, 2, 47, 41]
        ],
        "animations": {
            "pickup1": [0]
        }
    };
    var spaceshipsSheet = {
        "images": ["assets/images/spaceships_sheet.png"],
        "frames": [
            [887, 2, 43, 33],
            [776, 2, 35, 34],
            [2, 2, 41, 47],
            [530, 2, 43, 36],
            [314, 2, 35, 41],
            [425, 2, 33, 39],
            [665, 2, 35, 35],
            [131, 2, 59, 42],
            [932, 2, 43, 33],
            [813, 2, 35, 34],
            [45, 2, 41, 47],
            [575, 2, 43, 36],
            [351, 2, 35, 41],
            [460, 2, 33, 39],
            [702, 2, 35, 35],
            [192, 2, 59, 42],
            [977, 2, 43, 33],
            [850, 2, 35, 34],
            [88, 2, 41, 47],
            [620, 2, 43, 36],
            [388, 2, 35, 41],
            [495, 2, 33, 39],
            [739, 2, 35, 35],
            [253, 2, 59, 42]
        ],
        "animations": {
            "greenish/ship1": [0],
            "greenish/ship2": [1],
            "greenish/ship3": [2],
            "greenish/ship4": [3],
            "greenish/ship5": [4],
            "greenish/ship6": [5],
            "greenish/ship7": [6],
            "greenish/ship8": [7],
            "redish/ship1": [8],
            "redish/ship2": [9],
            "redish/ship3": [10],
            "redish/ship4": [11],
            "redish/ship5": [12],
            "redish/ship6": [13],
            "redish/ship7": [14],
            "redish/ship8": [15],
            "yellowish/ship1": [16],
            "yellowish/ship2": [17],
            "yellowish/ship3": [18],
            "yellowish/ship4": [19],
            "yellowish/ship5": [20],
            "yellowish/ship6": [21],
            "yellowish/ship7": [22],
            "yellowish/ship8": [23]
        }
    };
    var projectilesSheet = {
        "images": ["assets/images/projectiles_sheet.png"],
        "frames": [
            [2, 30, 17, 33],
            [43, 30, 18, 24],
            [24, 107, 21, 19],
            [2, 100, 20, 26],
            [44, 56, 17, 21],
            [2, 2, 22, 26],
            [21, 58, 21, 21],
            [24, 81, 18, 24],
            [2, 65, 17, 33],
            [21, 30, 20, 26],
            [44, 79, 17, 21],
            [26, 2, 22, 26]
        ],
        "animations": {
            "greenlaser1": [0],
            "greenlaser2": [1],
            "greenlaser3": [2],
            "greenlaser4": [3],
            "greenlaser5": [4],
            "greenlaser6": [5],
            "redlaser1": [6],
            "redlaser2": [7],
            "redlaser3": [8],
            "redlaser4": [9],
            "redlaser5": [10],
            "redlaser6": [11]
        }
    };
    var buttonsSheet = {
        "images": ["assets/images/buttons_sheet.png"],
        "frames": [
            [2, 2, 153, 53],
            [157, 2, 153, 53],
            [312, 2, 153, 53],
            [467, 2, 153, 53],
            [622, 2, 153, 53]
        ],
        "animations": {
            "back": [0],
            "instructions": [1],
            "mainmenu": [2],
            "playgame": [3],
            "tryagain": [4]
        }
    };
    var shieldsSheet = {
        "images": ["assets/images/shields_sheet.png"],
        "frames": [
            [2, 2, 57, 47],
            [61, 2, 49, 48],
            [112, 2, 49, 49],
            [163, 2, 57, 50],
            [2, 54, 47, 53],
            [51, 54, 49, 55],
            [102, 54, 73, 56],
            [177, 54, 55, 61]
        ],
        "animations": {
            "shield4": [0],
            "shield1": [1],
            "shield2": [2],
            "shield6": [3],
            "shield3": [4],
            "shield5": [5],
            "shield8": [6],
            "shield7": [7]
        }
    };
    var Asset = (function () {
        function Asset() {
        }
        Asset.init = function () {
            createjs.LoadQueue.loadTimeout = 600000;
            createjs.Sound.initializeDefaultPlugins();
            this.loader = new createjs.LoadQueue(false);
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            this.pickups = new createjs.SpriteSheet(pickupsSheet);
            this.buttons = new createjs.SpriteSheet(buttonsSheet);
            this.spaceships = new createjs.SpriteSheet(spaceshipsSheet);
            this.projectiles = new createjs.SpriteSheet(projectilesSheet);
            this.shields = new createjs.SpriteSheet(shieldsSheet);
        };
        return Asset;
    })();
    managers.Asset = Asset;
})(managers || (managers = {}));
//# sourceMappingURL=asset.js.map