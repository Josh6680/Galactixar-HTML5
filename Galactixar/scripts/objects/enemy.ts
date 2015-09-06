/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: The enemy's sole purpose is to EXTERMINATE you ... and be destroyed, of course.
*/

module objects {
	// Enemy class
	export class Enemy extends objects.GameObject {
		public dy: number;
		public dx: number;
		public weaponTimer: number;
		public enemyType: number; // 1 = newb, 2 = tough guy, 3 = worthy adversary, 4 = arch nemesis (aka, the boss)!
		public shipColor: string;
		public weaponFireRate: number;
		public hitPoints: number;

		// Enemy constructor. Takes a reference to the stage and game, as well as the type of enemy.
		constructor(stage: createjs.Stage, game: createjs.Container, enemyType: number) {
			this.rotation = -90;

			var rand: number = Math.floor(Math.random() * 8) + 1;
			if (enemyType === 4) {
				rand = 8;
			}
			var spriteString: string = this.getEnemySpriteString(rand);
			super(managers.Asset.spaceships, spriteString, stage, game);

			this.enemyType = enemyType;
			if (enemyType === 2) {
				this.shipColor = "yellowish";
				this.weaponFireRate = 60;
			} else if (enemyType === 3) {
				this.shipColor = "yellowish";
				this.scaleX = 1.5;
				this.scaleY = 1.5;
				this.weaponFireRate = 35;
			} else if (enemyType === 4) {
				this.shipColor = "yellowish";
				this.scaleX = 5;
				this.scaleY = 5;
				this.weaponFireRate = 25;
			} else {
				this.shipColor = "redish";
				this.weaponFireRate = 50;
			}

			this.weaponTimer = 40;

			this.reset();

			this.game.addChildAt(this, 4);
		}

		// Updates the enemy position and weapon fire timer. Resets the enemy if it goes off screen.
		public update() {
			this.y += this.dy;
			if (this.enemyType === 4) {
				if (this.x > stage.canvas.width - 55) {
					this.x -= this.dx;
				}
			} else {
				this.x -= this.dx;
			}
			if (this.x + this.width * 0.5 < 0) {
				this.reset();
			}
			this.weaponTimer++;
			if (this.weaponTimer > this.weaponFireRate) {
				this.weaponTimer = 0;
				this.dischargeWeapon();
			}

			if (ship.y > this.y) {
				this.dy = 0.5;
			} else {
				this.dy = -0.5;
			}
		}

		// Fires the enemy's weapon.
		public dischargeWeapon() {
			switch (this.enemyType) {
				case 2:
					projectiles.push(new Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser5", 2, true));
					projectiles.push(new Projectile(this.stage, this.game, this.x, this.y + 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser5", 2, true));
					break;
				case 3:
					projectiles.push(new Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser4", 2, true));
					break;
				case 4:
					projectiles.push(new Projectile(this.stage, this.game, this.x, this.y - 10, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser6", 2, true));
					break;
				case 1:
				default:
					projectiles.push(new Projectile(this.stage, this.game, this.x, this.y, -constants.SHIP_LASER_SPEED, 0, 90, "redlaser2", 2, true));
					break;
			}
		}

		// Resets the enemy position and makes it look like an entirely new enemy, but it's really just being recycled.
		public reset() {
			this.y = Math.floor(Math.random() * this.stage.canvas.height);
			this.dx = Math.floor(Math.random() * 3 + 4);
			this.dy = 0; //Math.floor(Math.random() * -1) + Math.floor(Math.random() * 3);

			this.x = this.stage.canvas.width + this.width * 0.5;
			this.weaponTimer = 0;

			var rand: number = Math.floor(Math.random() * 8) + 1;
			if (this.enemyType === 4) {
				rand = 8;
			}
			this.gotoAndStop(this.getEnemySpriteString(rand));

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;
			this.regX = this.width * 0.5;
			this.regY = this.height * 0.5;

			if (this.enemyType === 2) {
				this.hitPoints = 1;
			} else if (this.enemyType === 3) {
				this.hitPoints = 2;
			} else if (this.enemyType === 4) {
				this.hitPoints = 20;
			} else {
				this.hitPoints = 1;
			}
		}

		// Utility function - returns the sprite name associated with the ship number.
		public getEnemySpriteString(enemyShipNumber: number): string {
			switch (enemyShipNumber) {
				case 1:
					return this.shipColor + "/ship1";
				case 2:
					return this.shipColor + "/ship2";
				case 4:
					return this.shipColor + "/ship4";
				case 5:
					return this.shipColor + "/ship5";
				case 3:
				case 6:
					return this.shipColor + "/ship6";
				case 7:
					return this.shipColor + "/ship7";
				case 8:
					return this.shipColor + "/ship8";
				default:
					return this.shipColor + "/ship6";
			}
		}

		// Takes one hit point from the enemy. Returns true if enemy is out of hit points, else returns false.
		public takeHit(): boolean {
			this.hitPoints--;
			if (this.hitPoints <= 0) {
				return true;
			} else {
				return false;
			}
		}

		// Removes the enemy from the game.
		public destroy() {
			this.game.removeChild(this);
		}
	}
}
