/// <reference path="../managers/asset.ts" />
/*
	Description: A random nebula effect that passes over the screen once in a while, somewhat hiding objects underneath it.
*/

module objects {
	// Nebula class
	export class Nebula extends createjs.Bitmap {
		public stage: createjs.Stage;
		public game: createjs.Container;
		public width: number;
		public height: number;
		public dx: number;
		public resetTimer: number;
		public resetTimerDefault: number;

		// Nebula constructor. Takes a reference to the stage and game.
		constructor(stage: createjs.Stage, game: createjs.Container) {
			var rand: number = Math.floor(Math.random() * 3) + 1;
			super(this.getNebulaImage(rand));

			this.stage = stage;
			this.game = game;

			this.regX = 0;

			this.dx = 5;
			this.resetTimerDefault = constants.GAME_FPS * 2;
			this.resetTimer = 0;

			this.reset();

			this.game.addChild(this);
		}

		// Updates the nebula position. Resets it if it goes off screen and the reset timer reaches zero.
		public update() {
			if (this.visible) {
				this.x -= this.dx;
				if (this.x <= -this.width) {
					this.visible = false;
				}
			} else {
				if (this.resetTimer <= 0) {
					this.reset();
				} else {
					this.resetTimer--;
				}
			}
		}

		// Resets the position of the nebula and chooses a new nebula image.
		public reset() {
			this.resetTimer = this.resetTimerDefault;

			var rand: number = Math.floor(Math.random() * 3) + 1;
			this.image = this.getNebulaImage(rand);

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;

			this.regY = this.height * 0.5;

			this.x = this.stage.canvas.width;
			this.y = Math.floor(Math.random() * (this.stage.canvas.height + (this.height * 0.5) - -this.height * 0.5 + 1)) + -this.height * 0.5;

			this.visible = true;
		}

		// Utility function - gets the nebula image associated with the nebula number.
		public getNebulaImage(nebulaNumber: number): HTMLImageElement {
			switch (nebulaNumber) {
				case 1:
					return <HTMLImageElement>managers.Asset.loader.getResult("nebula1");
				case 2:
					return <HTMLImageElement>managers.Asset.loader.getResult("nebula2");
				case 3:
					return <HTMLImageElement>managers.Asset.loader.getResult("nebula3");
				default:
					return <HTMLImageElement>managers.Asset.loader.getResult("nebula1");
			}
		}

		// Removes the nebula from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
