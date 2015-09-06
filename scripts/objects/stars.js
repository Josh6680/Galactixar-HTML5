/// <reference path="../managers/asset.ts" />
/*
    Description: A starry sky background that continuously scrolls off the screen to the left, displaying behind everything.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Stars = (function (_super) {
        __extends(Stars, _super);
        function Stars(stage, game) {
            _super.call(this, managers.Asset.loader.getResult("stars1"));
            this.stage = stage;
            this.game = game;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.reset();
            this.sector = 1;
            this.dx = 2;
            this.game.addChild(this);
        }
        Stars.prototype.changeSector = function (sector) {
            this.sector = sector;
            this.image = managers.Asset.loader.getResult("stars" + sector.toString());
        };
        Stars.prototype.update = function () {
            this.x -= this.dx;
            if (this.x + this.width <= this.stage.canvas.width) {
                this.reset();
            }
        };
        Stars.prototype.reset = function () {
            this.x = 0;
        };
        Stars.prototype.destroy = function () {
            this.game.removeChild(this);
        };
        return Stars;
    })(createjs.Bitmap);
    objects.Stars = Stars;
})(objects || (objects = {}));
//# sourceMappingURL=stars.js.map