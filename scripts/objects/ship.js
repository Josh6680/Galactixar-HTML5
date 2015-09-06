/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: The player's ship, controlled by the mouse. It can fire projectiles to destroy things, get upgrades, be destroyed by enemies, etc.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Ship = (function (_super) {
        __extends(Ship, _super);
        function Ship(stage, game) {
            _super.call(this, managers.Asset.spaceships, "greenish/ship3", stage, game);
            this.x = this.stage.canvas.width * 0.5;
            this.y = this.stage.canvas.height * 0.3;
            this.rotation = 90;
            this.plerpX = 7;
            this.nlerpX = 4;
            this.lerpY = 6;
            this.weaponFireRate = 60;
            this.weaponRechargeRate = 0.5;
            this.weaponCooldownRate = 10;
            this.weaponCooldown = 0;
            this.weaponEnergyCost = 15;
            this.weaponCharge = this.weaponFireRate;
            this.weaponType = 1;
            this.invulnerableLifetime = constants.GAME_FPS * 2;
            this.game.addChild(this);
            this.shield = new objects.Shield(stage, game, this);
        }
        Ship.prototype.update = function () {
            var deltaY = this.y - this.stage.mouseY;
            if (deltaY > -this.lerpY && deltaY < this.lerpY) {
                this.y = this.stage.mouseY;
            }
            else if (deltaY < 0) {
                this.y += this.lerpY;
            }
            else {
                this.y -= this.lerpY;
            }
            var deltaX = this.x - this.stage.mouseX;
            if (deltaX > -this.plerpX && deltaX < this.nlerpX) {
                this.x = this.stage.mouseX;
            }
            else if (deltaX < 0) {
                this.x += this.plerpX;
            }
            else {
                this.x -= this.nlerpX;
            }
            if (this.x > this.stage.canvas.width * 0.75) {
                this.x = this.stage.canvas.width * 0.75;
            }
            if (this.weaponCharge < this.weaponFireRate) {
                this.weaponCharge += this.weaponRechargeRate;
            }
            if (this.weaponCooldown > 0) {
                this.weaponCooldown--;
            }
            if (this.invulnerable) {
                if (this.invulnerableTimer <= 0) {
                    this.setInvulnerable(false);
                }
                else {
                    this.invulnerableTimer--;
                }
            }
            this.shield.update();
        };
        Ship.prototype.dischargeWeapon = function () {
            if (this.weaponCharge >= this.weaponEnergyCost && this.weaponCooldown <= 0) {
                this.weaponCharge -= this.weaponEnergyCost;
                this.weaponCooldown = this.weaponCooldownRate;
                switch (this.weaponType) {
                    case 2:
                        projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, constants.SHIP_LASER_SPEED * 0.5, -67.5, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
                        projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, -(constants.SHIP_LASER_SPEED * 0.5), 67.5, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
                    case 1:
                        projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, 0, 90, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
                        break;
                }
            }
        };
        Ship.prototype.setInvulnerable = function (invulnerable) {
            this.shield.setActive(invulnerable);
            if (invulnerable) {
                this.invulnerableTimer = this.invulnerableLifetime;
            }
            else {
                this.invulnerableTimer = 0;
            }
            this.invulnerable = invulnerable;
        };
        Ship.prototype.destroy = function () {
            this.shield.destroy();
            this.game.removeChild(this);
        };
        return Ship;
    })(objects.GameObject);
    objects.Ship = Ship;
})(objects || (objects = {}));
//# sourceMappingURL=ship.js.map