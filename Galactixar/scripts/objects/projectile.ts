/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: A projectile that fires off in a given direction, damaging the enemy or player on collision, depending on if it was fired by the player or not.
*/

module objects {
	// Utility function to destroy projectiles. Deletes the projectile from the projectiles array.
	function destroyProjectile(projectile: objects.Projectile) {
		var index: number = projectiles.indexOf(projectile);
		projectiles.splice(index, 1);
	}

	// Projectile class
	export class Projectile extends objects.GameObject {
		public xvel: number;
		public yvel: number;
		public isEnemy: boolean;

		// Projectile constructor. Takes a reference to stage and game, x and y position, x velocity and y velocity, rotation angle, laser type sprite string, sound type, and is it an enemy projectile or not.
		constructor(stage: createjs.Stage, game: createjs.Container, x: number, y: number, xvel: number, yvel: number, rotation: number, lasertype: string, soundtype: number, isEnemy: boolean) {
			super(managers.Asset.projectiles, lasertype, stage, game);

			this.x = x;
			this.y = y;
			this.xvel = xvel;
			this.yvel = yvel;
			this.isEnemy = isEnemy;
			this.rotation = rotation;

			this.game.addChildAt(this, 1);

			createjs.Sound.play("laser" + soundtype.toString(), createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.5, 0);
		}

		// Updates the position. Destroys the projectile if it goes off screen.
		public update() {
			this.x += this.xvel;
			this.y += this.yvel;
			if (this.x + this.width * 0.5 < 0
				|| this.x - this.width * 0.5 > this.stage.canvas.width
				|| this.y + this.height * 0.5 < 0
				|| this.y - this.height * 0.5 > this.stage.canvas.height) {
				this.destroy();
			}
		}

		// Removes the projectile from the game and calls the destroyProjectile() utility function.
		public destroy() {
			this.game.removeChild(this);
			destroyProjectile(this);
		}
	}
}
