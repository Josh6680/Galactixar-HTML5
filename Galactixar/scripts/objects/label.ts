/// <reference path="../constants.ts" />
/*
	Description: A UI label that displays text on the screen to provide information to the user.
*/

module objects {
	// Label class
	export class Label extends createjs.Text {
		// Label constructor. Takes x and y position, label text and label font. Sets up default registry points and label color.
		constructor(x: number, y: number, labelText: string, labelFont: string) {
			super(labelText, labelFont, constants.LABEL_COLOUR);
			this.regX = this.getBounds().width / 2;
			this.regY = 0;
			this.x = x;
			this.y = y;
		}
	}
} 
