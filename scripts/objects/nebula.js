/// <reference path="../managers/asset.ts" />
/*
    Description: A random nebula effect that passes over the screen once in a while, somewhat hiding objects underneath it.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Nebula = (function (_super) {
        __extends(Nebula, _super);
        function Nebula(stage, game) {
            var rand = Math.floor(Math.random() * 3) + 1;
            _super.call(this, this.getNebulaImage(rand));
            this.stage = stage;
            this.game = game;
            this.regX = 0;
            this.dx = 5;
            this.resetTimerDefault = constants.GAME_FPS * 2;
            this.resetTimer = 0;
            this.reset();
            this.game.addChild(this);
        }
        Nebula.prototype.update = function () {
            if (this.visible) {
                this.x -= this.dx;
                if (this.x <= -this.width) {
                    this.visible = false;
                }
            }
            else {
                if (this.resetTimer <= 0) {
                    this.reset();
                }
                else {
                    this.resetTimer--;
                }
            }
        };
        Nebula.prototype.reset = function () {
            this.resetTimer = this.resetTimerDefault;
            var rand = Math.floor(Math.random() * 3) + 1;
            this.image = this.getNebulaImage(rand);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regY = this.height * 0.5;
            this.x = this.stage.canvas.width;
            this.y = Math.floor(Math.random() * (this.stage.canvas.height + (this.height * 0.5) - -this.height * 0.5 + 1)) + -this.height * 0.5;
            this.visible = true;
        };
        Nebula.prototype.getNebulaImage = function (nebulaNumber) {
            switch (nebulaNumber) {
                case 1:
                    return managers.Asset.loader.getResult("nebula1");
                case 2:
                    return managers.Asset.loader.getResult("nebula2");
                case 3:
                    return managers.Asset.loader.getResult("nebula3");
                default:
                    return managers.Asset.loader.getResult("nebula1");
            }
        };
        Nebula.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return Nebula;
    })(createjs.Bitmap);
    objects.Nebula = Nebula;
})(objects || (objects = {}));
//# sourceMappingURL=nebula.js.map