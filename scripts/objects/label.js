/// <reference path="../constants.ts" />
/*
    Description: A UI label that displays text on the screen to provide information to the user.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(x, y, labelText, labelFont) {
            _super.call(this, labelText, labelFont, constants.LABEL_COLOUR);
            this.regX = this.getBounds().width / 2;
            this.regY = 0;
            this.x = x;
            this.y = y;
        }
        return Label;
    })(createjs.Text);
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map