/// <reference path="../managers/asset.ts" />
/*
	Description: A warp effect that fades in then out whenever the level changes.
*/

module objects {
	// WarpEffect class
	export class WarpEffect extends createjs.Bitmap {
		public stage: createjs.Stage;
		public game: createjs.Container;
		public warping: boolean;

		// WarpEffect constructor. Takes a reference to the stage and the game.
		constructor(stage: createjs.Stage, game: createjs.Container) {
			super(<HTMLImageElement>managers.Asset.loader.getResult("warpoverlay"));

			this.stage = stage;
			this.game = game;

			this.regX = 0;
			this.regY = 0;
			this.x = 0;
			this.y = 0;

			this.visible = false;
			this.alpha = 0;
			this.warping = false;

			this.game.addChild(this);
		}

		// Updates the warp effect.
		public update() {
			if (this.warping) {
				if (this.alpha >= 1) {
					this.warping = false;
					for (var i: number = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
						enemies[i].reset();
					}
					for (var j = 0; j < projectiles.length; j++) {
						projectiles[j].destroy();
					}
					if (nebula.visible) {
						nebula.reset();
					}
					stars.changeSector(currentLevel + 1);
				} else {
					this.alpha += 0.025;
				}
			} else {
				if (this.alpha > 0) {
					this.alpha -= 0.025;
				} else {
					this.visible = false;
				}
			}
		}

		public performWarp() {
			this.warping = true;
			this.visible = true;
		}

		// Removes the warp effect from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
