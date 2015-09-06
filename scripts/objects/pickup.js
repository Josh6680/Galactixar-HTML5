/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: An object which the player can touch to pick it up. Gives upgrades or items that the player can use depending on the pickup type.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Pickup = (function (_super) {
        __extends(Pickup, _super);
        function Pickup(stage, game, pickupType) {
            _super.call(this, managers.Asset.pickups, "pickup" + pickupType.toString(), stage, game);
            this.pickupType = pickupType;
            this.dx = 8;
            this.resetTimerDefault = constants.GAME_FPS * 20;
            this.resetTimer = this.resetTimerDefault;
            this.goAway();
            this.game.addChild(this);
        }
        Pickup.prototype.update = function () {
            if (this.visible) {
                this.x -= this.dx;
                if (this.x + this.width * 0.5 < 0) {
                    this.goAway();
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
        Pickup.prototype.reset = function () {
            this.resetTimer = this.resetTimerDefault;
            this.visible = true;
            this.y = Math.floor(Math.random() * this.stage.canvas.height);
            this.x = this.stage.canvas.width + this.width * 0.5;
        };
        Pickup.prototype.goAway = function () {
            this.visible = false;
            this.x = this.stage.canvas.width * 2;
        };
        Pickup.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return Pickup;
    })(objects.GameObject);
    objects.Pickup = Pickup;
})(objects || (objects = {}));
//# sourceMappingURL=pickup.js.map