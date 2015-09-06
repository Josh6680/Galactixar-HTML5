/// <reference path="../game.ts" />
/*
	Description: Checks and handles collisions between objects every time update() is called.
*/

module managers {
	// Collision manager class
	export class Collision {
		// class variables
		private plane: objects.Ship;
		private pickup: objects.Pickup;
		private enemies: objects.Enemy[] = [];
		private projectiles: objects.Projectile[] = [];
		private scoreboard: objects.Scoreboard;
		private projectilesToDelete: objects.Projectile[] = [];

		// Collision manager constructor. Takes references to ship, pickup, enemies array, projectiles array, and scoreboard, to create local references.
		constructor(ship: objects.Ship, pickup: objects.Pickup, enemies: objects.Enemy[], projectiles: objects.Projectile[], scoreboard: objects.Scoreboard) {
			this.plane = ship;
			this.pickup = pickup;
			this.enemies = enemies;
			this.projectiles = projectiles;
			this.scoreboard = scoreboard;
		}

		// Utility method - Distance calculation between two points.
		private distance(p1: createjs.Point, p2: createjs.Point): number {
			var xPoints: number = p2.x - p1.x;
			xPoints = xPoints * xPoints;

			var yPoints: number = p2.y - p1.y;
			yPoints = yPoints * yPoints;

			var result: number = Math.sqrt(xPoints + yPoints);

			return result;
		}

		// Check collision between ship and any enemies.
		private shipAndEnemies(enemy: objects.Enemy) {
			var p1: createjs.Point = new createjs.Point();
			var p2: createjs.Point = new createjs.Point();
			p1.x = this.plane.x;
			p1.y = this.plane.y;
			p2.x = enemy.x;
			p2.y = enemy.y;
			if (this.distance(p1, p2) < ((this.plane.height * 0.5) + (enemy.height * 0.5))) {
				createjs.Sound.play("explode1");
				createjs.Sound.play("explode2");
				this.scoreboard.lives -= 1;
				enemy.reset();
				ship.setInvulnerable(true);
			}
		}

		// Check collision between projectiles and any enemies.
		private projectilesAndEnemies(projectile: objects.Projectile, enemy: objects.Enemy) {
			if (!projectile.isEnemy) {
				var p1: createjs.Point = new createjs.Point();
				var p2: createjs.Point = new createjs.Point();
				p1.x = projectile.x;
				p1.y = projectile.y;
				p2.x = enemy.x;
				p2.y = enemy.y;
				if (this.distance(p1, p2) < ((projectile.height * 0.5) + (enemy.height * enemy.scaleY * 0.5))) {
					if (enemy.takeHit()) {
						createjs.Sound.play("explode2");
						if (enemy.enemyType === 4) {
							// 4000 points for destroying the boss
							this.scoreboard.score += 4000;
							// Lives remaining bonus (1000 points times number of lives)
							this.scoreboard.score += 1000 * this.scoreboard.lives;
							// This will end the game.
							wonGame = true;
							enemy.destroy();
						} else {
							this.scoreboard.score += enemy.enemyType * 100;
							enemy.reset();
						}
					} else {
						createjs.Sound.play("explode1");
						createjs.Sound.play("explode1");
						this.scoreboard.score += 50;
					}
					this.projectilesToDelete.push(projectile);
				}
			}
		}

		// Check collision between projectiles and player ship.
		private projectilesAndShip(projectile: objects.Projectile): boolean {
			if (projectile.isEnemy) {
				var p1: createjs.Point = new createjs.Point();
				var p2: createjs.Point = new createjs.Point();
				p1.x = projectile.x;
				p1.y = projectile.y;
				p2.x = ship.x;
				p2.y = ship.y;
				if (this.distance(p1, p2) < ((projectile.height * 0.5) + (ship.height * 0.5))) {
					createjs.Sound.play("explode1");
					createjs.Sound.play("explode2");
					this.scoreboard.lives -= 1;
					ship.setInvulnerable(true);
					ship.weaponType = 1;
					this.projectilesToDelete.push(projectile);
					return true;
				}
			}
			return false;
		}

		// Check collision between ship and pickup.
		private shipAndPickup() {
			var p1: createjs.Point = new createjs.Point();
			var p2: createjs.Point = new createjs.Point();
			p1.x = this.plane.x;
			p1.y = this.plane.y;
			p2.x = this.pickup.x;
			p2.y = this.pickup.y;
			if (this.distance(p1, p2) < ((this.plane.height / 2) + (this.pickup.height / 2))) {
				createjs.Sound.play("powerup");
				ship.setInvulnerable(true);
				ship.weaponType = 2;
				this.scoreboard.score += 1000;
				this.pickup.goAway();
			}
		}

		// Checks/rechecks collisions and handles them appropriately.
		public update() {
			if (!ship.invulnerable) {
				for (var count: number = 0; count < constants.ENEMY_NUM[currentLevel]; count++) {
					this.shipAndEnemies(this.enemies[count]);
				}
				for (var p: number = 0; p < this.projectiles.length; p++) {
					if (this.projectilesAndShip(this.projectiles[p])) {
						break;
					}
				}
			}
			if (pickup.visible) {
				this.shipAndPickup();
			}
			for (var i: number = 0; i < constants.ENEMY_NUM[currentLevel]; i++) {
				for (var j: number = 0; j < this.projectiles.length; j++) {
					this.projectilesAndEnemies(this.projectiles[j], this.enemies[i]);
				}
				if (this.projectilesToDelete.length > 0) {
					for (var k in this.projectilesToDelete) {
						var index: number = projectiles.indexOf(this.projectilesToDelete[k]);
						if (index !== -1) {
							projectiles[index].destroy();
						}
					}
				}
			}
		}
	}
}
