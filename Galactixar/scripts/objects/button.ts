/// <reference path="../constants.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: A UI button that displays as a sprite and can be clicked to perform an action.
*/

module objects {

	// Button class
	export class Button extends createjs.Sprite {
		// Button constructor. Takes x and y position, and the button spritesheet identifier.
		constructor(x: number, y: number, buttonIdString: string) {
			super(managers.Asset.buttons, buttonIdString);
			this.regX = this.getBounds().width / 2;
			this.regY = this.getBounds().height / 2;
			this.x = x;
			this.y = y;
			this.setButtonListeners();
		}

		// Sets listeners for mouse over and out.
		public setButtonListeners() {
			//this.cursor = "pointer";
			this.on("rollover", this.onButtonOver);
			this.on("rollout", this.onButtonOut);
		}

		// Mouse over event, changes cursor and makes the button slightly transparent.
		public onButtonOver() {
			stage.cursor = constants.CURSOR_POINTER;
			this.alpha = 0.8;
		}

		// Mouse out event, changes the cursor and makes the button fully opaque again.
		public onButtonOut() {
			if (stage.cursor !== "none") {
				stage.cursor = constants.CURSOR_DEFAULT;
			}
			this.alpha = 1;
		}

		// Removes all the event listeners from the button.
		public destroy() {
			this.removeAllEventListeners();
		}
	}
} 