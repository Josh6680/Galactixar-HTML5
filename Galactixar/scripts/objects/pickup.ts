/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: An object which the player can touch to pick it up. Gives upgrades or items that the player can use depending on the pickup type.
*/

module objects {
	// Pickup class
	export class Pickup extends objects.GameObject {
		public dx: number;
		public pickupType: number;
		public resetTimer: number;
		public resetTimerDefault: number;

		// Pickup constructor. Takes a stage and game refence, and the type of pickup.
		constructor(stage: createjs.Stage, game: createjs.Container, pickupType: number) {
			super(managers.Asset.pickups, "pickup" + pickupType.toString(), stage, game);

			this.pickupType = pickupType;

			this.dx = 8;
			this.resetTimerDefault = constants.GAME_FPS * 20;
			this.resetTimer = this.resetTimerDefault;

			this.goAway();

			this.game.addChild(this);
		}

		// Updates the pickup position. Resets it if it goes off screen and the reset timer hits zero.
		public update() {
			if (this.visible) {
				this.x -= this.dx;
				if (this.x + this.width * 0.5 < 0) {
					this.goAway();
				}
			} else {
				if (this.resetTimer <= 0) {
					this.reset();
				} else {
					this.resetTimer--;
				}
			}
		}

		// Resets the pickup position, redisplays the pickup.
		public reset() {
			this.resetTimer = this.resetTimerDefault;

			this.visible = true;

			this.y = Math.floor(Math.random() * this.stage.canvas.height);
			this.x = this.stage.canvas.width + this.width * 0.5;
		}

		// Makes the pickup go away (invisible and far off screen).
		public goAway() {
			this.visible = false;
			this.x = this.stage.canvas.width * 2;
		}

		// Removes the pickup from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
