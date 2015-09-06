/// <reference path="../managers/asset.ts" />
/*
	Description: A starry sky background that continuously scrolls off the screen to the left, displaying behind everything.
*/

module objects {
	// Stars class
	export class Stars extends createjs.Bitmap {
		public stage: createjs.Stage;
		public game: createjs.Container;
		public width: number;
		public height: number;
		public dx: number;
		public sector: number;

		// Stars constructor. Takes a reference to the stage and the game.
		constructor(stage: createjs.Stage, game: createjs.Container) {
			super(<HTMLImageElement>managers.Asset.loader.getResult("stars1"));

			this.stage = stage;
			this.game = game;

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;

			this.reset();

			this.sector = 1;
			this.dx = 2;

			this.game.addChild(this);
		}

		// Changes the stars image depending on the number passed in.
		public changeSector(sector: number) {
			this.sector = sector;
			this.image = managers.Asset.loader.getResult("stars" + sector.toString());
		}

		// Updates the stars position.
		public update() {
			this.x -= this.dx;
			if (this.x + this.width <= this.stage.canvas.width) {
				this.reset();
			}
		}

		// Resets the stars position.
		public reset() {
			this.x = 0;
		}

		// Removes the stars from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
