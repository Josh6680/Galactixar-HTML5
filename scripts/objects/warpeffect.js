/// <reference path="../managers/asset.ts" />
/*
    Description: A warp effect that fades in then out whenever the level changes.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var WarpEffect = (function (_super) {
        __extends(WarpEffect, _super);
        function WarpEffect(stage, game) {
            _super.call(this, managers.Asset.loader.getResult("warpoverlay"));
            this.stage = stage;
            this.game = game;
            this.regX = 0;
            this.regY = 0;
            this.x = 0;
            this.y = 0;
            this.visible = false;
            this.alpha = 0;
            this.warping = false;
            this.game.addChild(this);
        }
        WarpEffect.prototype.update = function () {
            if (this.warping) {
                if (this.alpha >= 1) {
                    this.warping = false;
                    for (var i = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
                        enemies[i].reset();
                    }
                    for (var j = 0; j < projectiles.length; j++) {
                        projectiles[j].destroy();
                    }
                    if (nebula.visible) {
                        nebula.reset();
                    }
                    stars.changeSector(currentLevel + 1);
                }
                else {
                    this.alpha += 0.025;
                }
            }
            else {
                if (this.alpha > 0) {
                    this.alpha -= 0.025;
                }
                else {
                    this.visible = false;
                }
            }
        };
        WarpEffect.prototype.performWarp = function () {
            this.warping = true;
            this.visible = true;
        };
        WarpEffect.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return WarpEffect;
    })(createjs.Bitmap);
    objects.WarpEffect = WarpEffect;
})(objects || (objects = {}));
//# sourceMappingURL=warpeffect.js.map