/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: A projectile that fires off in a given direction, damaging the enemy or player on collision, depending on if it was fired by the player or not.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    function destroyProjectile(projectile) {
        var index = projectiles.indexOf(projectile);
        projectiles.splice(index, 1);
    }
    var Projectile = (function (_super) {
        __extends(Projectile, _super);
        function Projectile(stage, game, x, y, xvel, yvel, rotation, lasertype, soundtype, isEnemy) {
            _super.call(this, managers.Asset.projectiles, lasertype, stage, game);
            this.x = x;
            this.y = y;
            this.xvel = xvel;
            this.yvel = yvel;
            this.isEnemy = isEnemy;
            this.rotation = rotation;
            this.game.addChildAt(this, 1);
            createjs.Sound.play("laser" + soundtype.toString(), createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.5, 0);
        }
        Projectile.prototype.update = function () {
            this.x += this.xvel;
            this.y += this.yvel;
            if (this.x + this.width * 0.5 < 0
                || this.x - this.width * 0.5 > this.stage.canvas.width
                || this.y + this.height * 0.5 < 0
                || this.y - this.height * 0.5 > this.stage.canvas.height) {
                this.destroy();
            }
        };
        Projectile.prototype.destroy = function () {
            this.game.removeChild(this);
            destroyProjectile(this);
        };
        return Projectile;
    })(objects.GameObject);
    objects.Projectile = Projectile;
})(objects || (objects = {}));
//# sourceMappingURL=projectile.js.map