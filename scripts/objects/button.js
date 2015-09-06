/// <reference path="../constants.ts" />
/// <reference path="../managers/asset.ts" />
/*
    Description: A UI button that displays as a sprite and can be clicked to perform an action.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, buttonIdString) {
            _super.call(this, managers.Asset.buttons, buttonIdString);
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }
        Button.prototype.setButtonListeners = function () {
            this.on("rollover", this.onButtonOver);
            this.on("rollout", this.onButtonOut);
        };
        Button.prototype.onButtonOver = function () {
            stage.cursor = constants.CURSOR_POINTER;
            this.alpha = 0.8;
        };
        Button.prototype.onButtonOut = function () {
            if (stage.cursor !== "none") {
                stage.cursor = constants.CURSOR_DEFAULT;
            }
            this.alpha = 1;
        };
        Button.prototype.destroy = function () {
            this.removeAllEventListeners();
        };
        return Button;
    })(createjs.Sprite);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map