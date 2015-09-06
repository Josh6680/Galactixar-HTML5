/// <reference path="gameobject.ts" />
/// <reference path="../managers/asset.ts" />
/*
	Description: The player's ship, controlled by the mouse. It can fire projectiles to destroy things, get upgrades, be destroyed by enemies, etc.
*/

module objects {
	// Ship class
	export class Ship extends objects.GameObject {
		public plerpX: number;
		public nlerpX: number;
		public lerpY: number;
		public invulnerable: boolean;
		public invulnerableTimer: number;
		public invulnerableLifetime: number;
		public weaponFireRate: number;
		public weaponRechargeRate: number;
		public weaponCooldownRate: number;
		public weaponCooldown: number;
		public weaponEnergyCost: number;
		public weaponCharge: number;
		public weaponType: number;
		public shield: objects.Shield;

		// Ship constructor. Takes a reference for the stage and game.
		constructor(stage: createjs.Stage, game: createjs.Container) {
			super(managers.Asset.spaceships, "greenish/ship3", stage, game);

			this.x = this.stage.canvas.width * 0.5;
			this.y = this.stage.canvas.height * 0.3;

			this.rotation = 90;

			this.plerpX = 7;
			this.nlerpX = 4;
			this.lerpY = 6;

			this.weaponFireRate = 60;
			this.weaponRechargeRate = 0.5;
			this.weaponCooldownRate = 10;
			this.weaponCooldown = 0;
			this.weaponEnergyCost = 15;
			this.weaponCharge = this.weaponFireRate;
			this.weaponType = 1;

			this.invulnerableLifetime = constants.GAME_FPS * 2;

			this.game.addChild(this);
			this.shield = new objects.Shield(stage, game, this);
		}

		// Updates the ship's position and internal timers. Updates the shield as well.
		public update() {
			var deltaY: number = this.y - this.stage.mouseY;
			if (deltaY > -this.lerpY && deltaY < this.lerpY) {
				this.y = this.stage.mouseY;
			} else if (deltaY < 0) {
				this.y += this.lerpY;
			} else {
				this.y -= this.lerpY;
			}

			var deltaX: number = this.x - this.stage.mouseX;
			if (deltaX > -this.plerpX && deltaX < this.nlerpX) {
				this.x = this.stage.mouseX;
			} else if (deltaX < 0) {
				this.x += this.plerpX;
			} else {
				this.x -= this.nlerpX;
			}

			if (this.x > this.stage.canvas.width * 0.75) {
				this.x = this.stage.canvas.width * 0.75;
			}

			if (this.weaponCharge < this.weaponFireRate) {
				this.weaponCharge += this.weaponRechargeRate;
			}
			if (this.weaponCooldown > 0) {
				this.weaponCooldown--;
			}

			if (this.invulnerable) {
				if (this.invulnerableTimer <= 0) {
					this.setInvulnerable(false);
				} else {
					this.invulnerableTimer--;
				}
			}

			this.shield.update();
		}

		// Fires the weapons, making sure that there's enough energy to do so.
		public dischargeWeapon() {
			if (this.weaponCharge >= this.weaponEnergyCost && this.weaponCooldown <= 0) {
				this.weaponCharge -= this.weaponEnergyCost;
				this.weaponCooldown = this.weaponCooldownRate;
				switch (this.weaponType) {
					case 2:
						projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, constants.SHIP_LASER_SPEED * 0.5, -67.5, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
						projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, -(constants.SHIP_LASER_SPEED * 0.5), 67.5, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
					case 1:
						projectiles.push(new objects.Projectile(stage, game, ship.x, ship.y, constants.SHIP_LASER_SPEED, 0, 90, constants.SHIP_LASER_TYPE, constants.SHIP_LASER_SOUNDTYPE, false));
						break;
				}
			}
		}

		// Sets the invulnerable state of the ship (enables/disables the shield appropriately).
		public setInvulnerable(invulnerable: boolean) {
			this.shield.setActive(invulnerable);
			if (invulnerable) {
				this.invulnerableTimer = this.invulnerableLifetime;
			} else {
				this.invulnerableTimer = 0;
			}
			this.invulnerable = invulnerable;
		}

		// Removes the ship (and the shield) from the game.
		public destroy() {
			this.shield.destroy();
			this.game.removeChild(this);
		}
	}
} 
