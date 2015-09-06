/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: The enemy's sole purpose is to EXTERMINATE you ... and be destroyed, of course.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(stage, game, enemyType) {
            this.rotation = -90;
            var rand = Math.floor(Math.random() * 8) + 1;
            if (enemyType === 4) {
                rand = 8;
            }
            var spriteString = this.getEnemySpriteString(rand);
            _super.call(this, managers.Asset.spaceships, spriteString, stage, game);
            this.enemyType = enemyType;
            if (enemyType === 2) {
                this.shipColor = "yellowish";
                this.weaponFireRate = 60;
            }
            else if (enemyType === 3) {
                this.shipColor = "yellowish";
                this.scaleX = 1.5;
                this.scaleY = 1.5;
                this.weaponFireRate = 35;
            }
            else if (enemyType === 4) {
                this.shipColor = "yellowish";
                this.scaleX = 5;
                this.scaleY = 5;
                this.weaponFireRate = 25;
            }
            else {
                this.shipColor = "redish";
                this.weaponFireRate = 50;
            }
            this.weaponTimer = 40;
            this.reset();
            this.game.addChildAt(this, 4);
        }
        Enemy.prototype.update = function () {
            this.y += this.dy;
            if (this.enemyType === 4) {
                if (this.x > stage.canvas.width - 55) {
                    this.x -= this.dx;
                }
            }
            else {
                this.x -= this.dx;
            }
            if (this.x + this.width * 0.5 < 0) {
                this.reset();
            }
            this.weaponTimer++;
            if (this.weaponTimer > this.weaponFireRate) {
                this.weaponTimer = 0;
                this.dischargeWeapon();
            }
            if (ship.y > this.y) {
                this.dy = 0.5;
            }
            else {
                this.dy = -0.5;
            }
        };
        Enemy.prototype.dischargeWeapon = function () {
            switch (this.enemyType) {
                case 2:
                    projectiles.push(new objects.Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser5", 2, true));
                    projectiles.push(new objects.Projectile(this.stage, this.game, this.x, this.y + 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser5", 2, true));
                    break;
                case 3:
                    projectiles.push(new objects.Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser4", 2, true));
                    break;
                case 4:
                    projectiles.push(new objects.Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser6", 2, true));
                    break;
                case 1:
                default:
                    projectiles.push(new objects.Projectile(this.stage, this.game, this.x, this.y, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser2", 2, true));
                    break;
            }
        };
        Enemy.prototype.reset = function () {
            this.y = Math.floor(Math.random() * this.stage.canvas.height);
            this.dx = Math.floor(Math.random() * 3 + 4);
            this.dy = 0;
            this.x = this.stage.canvas.width + this.width * 0.5;
            this.weaponTimer = 0;
            var rand = Math.floor(Math.random() * 8) + 1;
            if (this.enemyType === 4) {
                rand = 8;
            }
            this.gotoAndStop(this.getEnemySpriteString(rand));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            if (this.enemyType === 2) {
                this.hitPoints = 1;
            }
            else if (this.enemyType === 3) {
                this.hitPoints = 2;
            }
            else if (this.enemyType === 4) {
                this.hitPoints = 20;
            }
            else {
                this.hitPoints = 1;
            }
        };
        Enemy.prototype.getEnemySpriteString = function (enemyShipNumber) {
            switch (enemyShipNumber) {
                case 1:
                    return this.shipColor + "/ship1";
                case 2:
                    return this.shipColor + "/ship2";
                case 4:
                    return this.shipColor + "/ship4";
                case 5:
                    return this.shipColor + "/ship5";
                case 3:
                case 6:
                    return this.shipColor + "/ship6";
                case 7:
                    return this.shipColor + "/ship7";
                case 8:
                    return this.shipColor + "/ship8";
                default:
                    return this.shipColor + "/ship6";
            }
        };
        Enemy.prototype.takeHit = function () {
            this.hitPoints--;
            if (this.hitPoints <= 0) {
                return true;
            }
            else {
                return false;
            }
        };
        Enemy.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map