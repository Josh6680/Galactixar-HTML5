/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: A shield effect representing the ship (player) is invulnerable. Currently only works with the player's ship, but could be extended to work with enemies as well.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Shield = (function (_super) {
        __extends(Shield, _super);
        function Shield(stage, game, ship) {
            _super.call(this, managers.Asset.shields, "shield7", stage, game);
            this.deactivate();
            this.ship = ship;
            this.rotation = ship.rotation;
            this.x = ship.x;
            this.y = ship.y;
            this.game.addChild(this);
        }
        Shield.prototype.update = function () {
            this.x = ship.x;
            this.y = ship.y;
        };
        Shield.prototype.activate = function () {
            this.visible = true;
        };
        Shield.prototype.deactivate = function () {
            this.visible = false;
        };
        Shield.prototype.setActive = function (state) {
            if (state) {
                this.activate();
            }
            else {
                this.deactivate();
            }
        };
        Shield.prototype.isActive = function () {
            return this.visible;
        };
        Shield.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return Shield;
    })(objects.GameObject);
    objects.Shield = Shield;
})(objects || (objects = {}));
//# sourceMappingURL=shield.js.map