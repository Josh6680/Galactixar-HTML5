/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: A shield effect representing the ship (player) is invulnerable. Currently only works with the player's ship, but could be extended to work with enemies as well.
*/

module objects {
	// Shield class
	export class Shield extends objects.GameObject {
		public ship: objects.Ship;

		// Shield constructor. Takes a reference to the stage and game, and the ship it's protecting.
		constructor(stage: createjs.Stage, game: createjs.Container, ship: objects.Ship) {
			super(managers.Asset.shields, "shield7", stage, game);

			this.deactivate();

			this.ship = ship;

			this.rotation = ship.rotation;
			this.x = ship.x;
			this.y = ship.y;

			this.game.addChild(this);
		}

		// Updates the shield position to follow the ship.
		public update() {
			this.x = ship.x;
			this.y = ship.y;
		}

		// Activates (turns on) the shield.
		public activate() {
			this.visible = true;
		}

		// Deactivates (turns off) the shield.
		public deactivate() {
			this.visible = false;
		}

		// Sets the active state of the shield.
		public setActive(state: boolean) {
			if (state) {
				this.activate();
			} else {
				this.deactivate();
			}
		}

		// Returns if the shield is active or not.
		public isActive(): boolean {
			return this.visible;
		}

		// Removes the shield from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
